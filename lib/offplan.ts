// Server-only module that reads the Supabase `projects` table and walks the
// AWS S3 bucket `assets-allegiance` for project assets.
// Used by /app/api/offplan/* routes — never imported into client code.

import 'server-only';
import axios from 'axios';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const SUPA_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/+$/, '');
const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const TABLE = process.env.SUPABASE_PROJECTS_TABLE || 'projects';
const REGION = process.env.AWS_REGION || '';
const BUCKET = process.env.AWS_S3_BUCKET || '';
const PUBLIC_BASE = (process.env.AWS_S3_PUBLIC_BASE_URL || '').replace(/\/+$/, '')
  || `https://${BUCKET}.s3.${REGION}.amazonaws.com`;

const s3 = (REGION && BUCKET) ? new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
}) : null;

export type AssetIndexEntry = { dev: string; proj: string; images: string[]; floorPlans: { url: string; name: string }[]; brochures: string[] };

const S3_INDEX_TTL_MS = 30 * 60 * 1000;
const SUMMARY_TTL_MS = 10 * 60 * 1000;

let s3Cache: Record<string, AssetIndexEntry> = {};
let s3CacheBuiltAt = 0;
let s3BuildPromise: Promise<Record<string, AssetIndexEntry>> | null = null;
// dev-slug -> developer logo URL (any of: {dev-slug}/logo.{png|jpg|jpeg|webp|svg})
let devLogoCache: Record<string, string> = {};

let summaryCache: ProjectSummary[] | null = null;
let summaryCacheBuiltAt = 0;
let summaryBuildPromise: Promise<ProjectSummary[]> | null = null;

export function slugify(s: string): string {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function pricify(n: number | string): string {
  const num = parseFloat(String(n));
  if (!isFinite(num) || num <= 0) return '';
  if (num >= 1e6) return 'AED ' + (num / 1e6).toFixed(num >= 1e7 ? 1 : 2).replace(/\.0+$/, '') + 'M';
  if (num >= 1e3) return 'AED ' + Math.round(num / 1e3) + 'K';
  return 'AED ' + num.toLocaleString();
}

function publicUrl(key: string): string {
  return PUBLIC_BASE + '/' + key.split('/').map(encodeURIComponent).join('/');
}

async function buildS3Index(): Promise<Record<string, AssetIndexEntry>> {
  if (!s3) return {};
  const idx: Record<string, AssetIndexEntry> = {};
  const logos: Record<string, string> = {};
  let token: string | undefined;
  let page = 0;
  do {
    const r = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET, MaxKeys: 1000, ContinuationToken: token }));
    (r.Contents || []).forEach((obj) => {
      const key = obj.Key || '';
      const parts = key.split('/');
      const filename = parts[parts.length - 1] || '';
      const isImage = /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(filename);
      if (!filename) return;

      // Developer-logo lookup. Actual bucket convention is
      //   {dev-slug}/_brand/logo.{ext}
      // A few legacy / fallback conventions are also accepted.
      if (isImage) {
        if (parts.length >= 3 && parts[1] === '_brand' && /^logo\.(jpe?g|png|webp|svg)$/i.test(parts[2])) {
          logos[parts[0]] ||= publicUrl(key);
        } else if (parts.length === 2 && /^logo\.(jpe?g|png|webp|svg)$/i.test(parts[1])) {
          logos[parts[0]] ||= publicUrl(key);
        } else if (parts.length >= 3 && parts[1].toLowerCase() === 'logo') {
          logos[parts[0]] ||= publicUrl(key);
        }
      }

      // Project assets — original logic.
      if (parts.length < 4) return;
      const dev = parts[0], proj = parts[1], sub = parts[2];
      const projKey = dev + '/' + proj;
      if (!idx[projKey]) idx[projKey] = { dev, proj, images: [], floorPlans: [], brochures: [] };
      const url = publicUrl(key);
      const isPdf = /\.pdf$/i.test(filename);
      if (sub === 'images' && isImage) idx[projKey].images.push(url);
      else if (sub === 'floor-plans') {
        const cleanName = filename.replace(/-[a-f0-9]{6,}\.[^.]+$/i, '').replace(/[-_]+/g, ' ').replace(/\.(pdf|png|jpe?g)$/i, '').trim() || 'Floor plan';
        idx[projKey].floorPlans.push({ url, name: cleanName });
      } else if (sub === 'brochures' && isPdf) idx[projKey].brochures.push(url);
    });
    token = r.IsTruncated ? r.NextContinuationToken : undefined;
    page++;
  } while (token && page < 100);
  devLogoCache = logos;
  return idx;
}

export async function getDeveloperLogo(developerName: string): Promise<string | null> {
  if (!developerName) return null;
  await ensureS3Index(); // populates devLogoCache as a side effect
  const slug = slugify(developerName);
  if (devLogoCache[slug]) return devLogoCache[slug];
  // Last resort: scan for any key in the logo cache that contains the slug
  // (handles e.g. "damac-properties" vs "damac")
  const hit = Object.keys(devLogoCache).find((k) => k.includes(slug) || slug.includes(k));
  return hit ? devLogoCache[hit] : null;
}

export async function ensureS3Index(): Promise<Record<string, AssetIndexEntry>> {
  if (Object.keys(s3Cache).length && Date.now() - s3CacheBuiltAt < S3_INDEX_TTL_MS) return s3Cache;
  if (s3BuildPromise) return s3BuildPromise;
  s3BuildPromise = (async () => {
    s3Cache = await buildS3Index();
    s3CacheBuiltAt = Date.now();
    s3BuildPromise = null;
    return s3Cache;
  })();
  return s3BuildPromise;
}

async function supaSelect<T = any>(table: string, query: string): Promise<T[]> {
  const url = `${SUPA_URL}/rest/v1/${table}?${query}`;
  const r = await axios.get(url, {
    headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}`, Accept: 'application/json' },
    timeout: 30000,
  });
  return Array.isArray(r.data) ? r.data : [];
}

async function supaSelectAll<T = any>(table: string, baseQuery: string): Promise<T[]> {
  const PAGE = 1000;
  const all: T[] = [];
  for (let offset = 0, page = 0; page < 50; page++, offset += PAGE) {
    const url = `${SUPA_URL}/rest/v1/${table}?${baseQuery}&limit=${PAGE}&offset=${offset}`;
    const r = await axios.get(url, {
      headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}`, Accept: 'application/json' },
      timeout: 60000,
    });
    const rows = Array.isArray(r.data) ? r.data : [];
    all.push(...rows);
    if (rows.length < PAGE) break;
  }
  return all;
}

export type ProjectSummary = {
  id: number | string;
  slug: string;
  name: string;
  developer: string;
  image: string;
  handover: string;
  priceFrom: string;
  priceFromRaw: number;
  community: string;
  subCommunity: string;
  city: string;
  propertyTypes: string;
};

async function buildSummary(): Promise<ProjectSummary[]> {
  const idx = await ensureS3Index();
  const rows = await supaSelectAll<any>(TABLE, 'select=id,slug,name,developer_id,country,region,district,sector,min_price,currency,completion_quarter,completion_date,property_types,is_published,short_description&is_published=eq.true&order=name.asc');
  const devIds = [...new Set(rows.map((r) => r.developer_id).filter(Boolean))];
  const devNameById: Record<number, string> = {};
  if (devIds.length) {
    const devs = await supaSelect<any>('developers', `select=id,name&id=in.(${devIds.join(',')})`);
    devs.forEach((d) => { devNameById[d.id] = d.name; });
  }
  return rows.map((r) => {
    const slug = r.slug || slugify(r.name);
    const dev = devNameById[r.developer_id] || '';
    const devSlug = slugify(dev);
    const assets = (devSlug && idx[devSlug + '/' + slug]) || Object.values(idx).find((v) => v.proj === slug) || null;
    const cover = assets && assets.images[0] ? assets.images[0] : '';
    return {
      id: r.id,
      slug,
      name: r.name || '',
      developer: dev,
      image: cover,
      handover: r.completion_quarter || (r.completion_date ? String(r.completion_date).slice(0, 10) : ''),
      priceFrom: pricify(r.min_price),
      priceFromRaw: parseFloat(r.min_price) || 0,
      community: r.district || r.region || '',
      subCommunity: r.sector || '',
      city: r.region || 'Dubai',
      propertyTypes: Array.isArray(r.property_types) ? r.property_types.join(', ') : (r.property_types || ''),
    };
  });
}

export async function getProjectsSummary(): Promise<ProjectSummary[]> {
  if (summaryCache && Date.now() - summaryCacheBuiltAt < SUMMARY_TTL_MS) return summaryCache;
  if (summaryBuildPromise) return summaryBuildPromise;
  summaryBuildPromise = (async () => {
    summaryCache = await buildSummary();
    summaryCacheBuiltAt = Date.now();
    summaryBuildPromise = null;
    return summaryCache;
  })();
  return summaryBuildPromise;
}

export async function getProjectDetail(id: string) {
  const idx = await ensureS3Index();
  const rows = await supaSelect<any>(TABLE, `select=*&or=(id.eq.${encodeURIComponent(id)},slug.eq.${encodeURIComponent(id)})&limit=1`);
  const row = rows[0];
  if (!row) return null;
  let dev = '';
  if (row.developer_id) {
    const d = await supaSelect<any>('developers', `select=name&id=eq.${row.developer_id}&limit=1`);
    dev = (d[0] && d[0].name) || '';
  }
  if (!dev && row.raw && row.raw.developer) dev = row.raw.developer;
  const slug = row.slug || slugify(row.name);
  const devSlug = slugify(dev);
  const assets = (devSlug && idx[devSlug + '/' + slug]) || Object.values(idx).find((v) => v.proj === slug) || { images: [], floorPlans: [], brochures: [] };
  const r = row.raw || {};
  const typicalUnits = Array.isArray(r.typical_units) ? r.typical_units : [];
  const paymentPlans = Array.isArray(r.payment_plans) ? r.payment_plans : [];
  const projectAmenities = Array.isArray(r.project_amenities) ? r.project_amenities : [];

  return {
    id: row.id,
    slug,
    name: row.name || '',
    developer: dev,
    developerSlug: devSlug,
    image: assets.images[0] || '',
    gallery: assets.images,
    floorPlans: assets.floorPlans,
    brochures: assets.brochures,
    handover: row.completion_quarter || (row.completion_date ? String(row.completion_date).slice(0, 10) : ''),
    priceFrom: pricify(row.min_price),
    priceFromRaw: parseFloat(row.min_price) || 0,
    priceMax: pricify(row.max_price),
    currency: row.currency || 'AED',
    bedrooms: typicalUnits.length
      ? [...new Set(typicalUnits.map((u: any) => u.bedrooms).filter((b: any) => b !== undefined && b !== null))].sort().join(', ')
      : '',
    propertyTypes: Array.isArray(row.property_types) ? row.property_types.join(', ') : (row.property_types || ''),
    community: row.district || row.region || '',
    subCommunity: row.sector || '',
    city: row.region || 'Dubai',
    country: row.country || '',
    location: { lat: row.lat, lng: row.lng, address: [row.sector, row.district, row.region, row.country].filter(Boolean).join(', ') },
    paymentPlan: paymentPlans[0] ? (paymentPlans[0].name || '') : '',
    paymentPlans: paymentPlans.map((p: any) => ({
      name: p.name || '',
      eoi: p.eoi || null,
      isHandover: !!p.is_handover,
      steps: Array.isArray(p.steps) ? p.steps : [],
    })),
    description: row.description || r.overview || row.short_description || '',
    shortDescription: row.short_description || '',
    amenities: projectAmenities.map((a: any) => {
      if (!a) return '';
      if (typeof a === 'string') return a;
      // Reelly shape: { id, icon, amenity: { id, icon, name } }
      if (a.amenity && typeof a.amenity === 'object') return String(a.amenity.name || a.amenity.title || '');
      return String(a.name || a.title || '');
    }).filter(Boolean),
    units: typicalUnits.map((u: any) => ({
      bedrooms: typeof u.bedrooms === 'object' ? '' : (u.bedrooms ?? ''),
      type: typeof u.unit_type === 'string' ? u.unit_type
        : typeof u.type === 'string' ? u.type
        : (u.bedrooms !== undefined && u.bedrooms !== null && typeof u.bedrooms !== 'object')
            ? `${u.bedrooms}-Bedroom`
            : '',
      size: u.from_size_sqft ? `${u.from_size_sqft}${u.to_size_sqft ? '–' + u.to_size_sqft : ''}` : (u.from_size_m2 ? `${u.from_size_m2}${u.to_size_m2 ? '–' + u.to_size_m2 : ''} m²` : ''),
      price: pricify(u.from_price_aed) || pricify(u.from_price_usd),
    })),
    buildingsCount: row.building_count || 0,
    unitsCount: row.units_count || 0,
    serviceCharge: row.service_charge || '',
    furnishing: row.furnishing || '',
    saleStatus: row.sale_status || '',
    status: row.status || '',
  };
}
