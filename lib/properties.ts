// Server-side XML parser for the PropertyFinder feed at public/xml/properties.xml
// Returns a normalized JSON shape identical to what the legacy /datafeed
// endpoint produced, so all card / filter logic ports 1:1 from the legacy site.

import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { parseStringPromise } from 'xml2js';

export type PropertyAgent = { name: string; phone: string; email: string; photo?: string };
export type Property = {
  reference_number: string;
  permit_number: string;
  title: string;
  title_en: string;
  description_en: string;
  price: number;
  geopoints: string;
  lat: number;
  lng: number;
  city: string;
  community: string;
  sub_community: string;
  tower_name: string;
  bedroom: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  area: number;
  property_type: string;
  offering_type: 'RS' | 'RR';
  rental_period?: string;
  features: string[];
  furnished: boolean;
  off_plan: boolean;
  photo: { url: { _: string }[] };
  agent: PropertyAgent;
};

let cache: Property[] | null = null;
let cacheBuiltAt = 0;
const TTL_MS = 10 * 60 * 1000; // 10 min

function asArray<T>(v: T | T[] | undefined): T[] {
  if (v === undefined || v === null) return [];
  return Array.isArray(v) ? v : [v];
}
function s(v: any): string {
  if (v === undefined || v === null) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'object' && '_' in v) return String((v as any)._ || '');
  return String(v);
}
function n(v: any): number {
  const num = parseFloat(s(v));
  return isFinite(num) ? num : 0;
}

async function parseXML(): Promise<Property[]> {
  const xmlPath = path.resolve(process.cwd(), 'public/xml/properties.xml');
  if (!fs.existsSync(xmlPath)) return [];
  const xml = fs.readFileSync(xmlPath, 'utf8');
  const json = await parseStringPromise(xml, { explicitArray: false });
  const rows = asArray<any>(json?.Properties?.Property);

  return rows.map((r): Property => {
    const images = asArray<any>(r.Images?.Image).map(s).filter(Boolean);
    const photoUrls = images.length ? images.map((u) => ({ _: u })) : [{ _: '' }];

    const features = asArray(r.Features?.Feature).map(s).filter(Boolean);
    const isRental = s(r.Property_purpose) === 'Rent' || !!s(r.Rent_Frequency);
    const propertyType = s(r.Property_Type).toLowerCase();
    const lat = n(r.Latitude);
    const lng = n(r.Longitude);
    const bedroom = parseInt(s(r.Bedrooms)) || 0;
    const bathrooms = parseInt(s(r.Bathrooms)) || 0;
    const size = n(r.Property_Size);

    const out: Property = {
      reference_number: s(r.Property_Ref_No) || s(r.Permit_Number),
      permit_number: s(r.Permit_Number) || s(r.Property_Ref_No),
      title: s(r.Property_Title),
      title_en: s(r.Property_Title),
      description_en: s(r.Property_Description),
      price: n(r.Price),
      geopoints: `${lng},${lat}`,
      lat,
      lng,
      city: s(r.City),
      community: s(r.Locality),
      sub_community: s(r.Sub_Locality) || s(r.Tower_Name),
      tower_name: s(r.Tower_Name),
      bedroom,
      bedrooms: bedroom,
      bathrooms,
      size,
      area: size,
      property_type: propertyType,
      offering_type: isRental ? 'RR' : 'RS',
      features,
      furnished: s(r.Furnished).toLowerCase() === 'yes',
      off_plan: s(r.Off_plan).toLowerCase() === 'yes',
      photo: { url: photoUrls },
      agent: {
        name: s(r.Listing_Agent) || 'Allegiance Real Estate',
        phone: s(r.Listing_Agent_Phone),
        email: s(r.Listing_Agent_Email),
        photo: s(r.Listing_Agent_Photo),
      },
    };
    if (isRental) out.rental_period = s(r.Rent_Frequency) || 'yearly';
    return out;
  });
}

export async function getProperties(): Promise<Property[]> {
  if (cache && Date.now() - cacheBuiltAt < TTL_MS) return cache;
  cache = await parseXML();
  cacheBuiltAt = Date.now();
  return cache;
}

export async function getProperty(ref: string): Promise<Property | undefined> {
  const all = await getProperties();
  const target = decodeURIComponent(ref).toLowerCase();
  return all.find(
    (p) =>
      p.reference_number.toLowerCase() === target ||
      p.permit_number.toLowerCase() === target
  );
}
