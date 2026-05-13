'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { ProjectListItem } from '@/lib/chat';

function shortAED(n: number | null | undefined): string {
  if (n == null || !isFinite(n) || n <= 0) return '';
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 1 : 2).replace(/\.?0+$/, '') + 'M';
  if (n >= 1e3) return Math.round(n / 1e3) + 'K';
  return Math.round(n).toLocaleString();
}

function priceRange(p: ProjectListItem): string {
  const lo = shortAED(p.min_price);
  const hi = shortAED(p.max_price);
  const ccy = p.currency || 'AED';
  if (!lo && !hi) return 'On request';
  if (lo && hi && lo !== hi) return `${ccy} ${lo} – ${hi}`;
  return `${ccy} ${lo || hi}`;
}

function humanize(s: string | null | undefined): string {
  if (!s) return '';
  return s
    .replace(/[_-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function locationLine(p: ProjectListItem): string {
  return [p.district, p.city || p.region].filter(Boolean).join(', ');
}

// Module-level caches so re-renders / multiple cards for the same project
// or developer don't refetch.
const coverCache = new Map<string, string | null>();
const devLogoCache = new Map<string, string | null>();
function cacheKey(dev: string, proj: string) {
  return (dev || '').toLowerCase() + '|' + (proj || '').toLowerCase();
}

export default function ChatProjectCard({ project }: { project: ProjectListItem }) {
  const dev = project.developer || '';
  const name = project.name || '';
  const key = cacheKey(dev, name);

  const [img, setImg] = useState<string | null>(() => coverCache.get(key) ?? null);
  const devKey = (dev || '').toLowerCase();
  const [devLogo, setDevLogo] = useState<string | null>(() => devLogoCache.get(devKey) ?? null);

  // S3 ONLY — ignore project.cover_image_url (those are Reelly URLs).
  // Resolve the cover from our own bucket via /api/offplan/cover.
  useEffect(() => {
    if (coverCache.has(key)) {
      setImg(coverCache.get(key) ?? null);
      return;
    }
    if (!name) return;
    const ctrl = new AbortController();
    fetch(
      `/api/offplan/cover?dev=${encodeURIComponent(dev)}&proj=${encodeURIComponent(name)}`,
      { signal: ctrl.signal },
    )
      .then((r) => r.json())
      .then((j) => {
        const url: string | null = j?.url || null;
        coverCache.set(key, url);
        setImg(url);
      })
      .catch(() => {
        coverCache.set(key, null);
        setImg(null);
      });
    return () => ctrl.abort();
  }, [key, dev, name]);

  // Developer logo, also from our S3 bucket only.
  useEffect(() => {
    if (devLogoCache.has(devKey)) {
      setDevLogo(devLogoCache.get(devKey) ?? null);
      return;
    }
    if (!dev) return;
    const ctrl = new AbortController();
    fetch(`/api/developer/logo?dev=${encodeURIComponent(dev)}`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((j) => {
        const url: string | null = j?.url || null;
        devLogoCache.set(devKey, url);
        setDevLogo(url);
      })
      .catch(() => {
        devLogoCache.set(devKey, null);
        setDevLogo(null);
      });
    return () => ctrl.abort();
  }, [devKey, dev]);

  const sale = humanize(project.sale_status);
  const handover = project.completion_quarter || '';
  const status = humanize(project.status);
  const initial = (project.name || '?').slice(0, 1).toUpperCase();

  return (
    <Link href={`/offplan/project/${project.id}`} className="aa-card-proj" prefetch={false}>
      <div className="aa-card-img" style={img ? { backgroundImage: `url('${img.replace(/'/g, "\\'")}')` } : undefined}>
        {!img && <div className="aa-card-img-fallback">{initial}</div>}
        <div className="aa-card-badges">
          {sale && <span className="aa-card-badge aa-card-badge-sale">{sale}</span>}
          {handover && <span className="aa-card-badge">{handover}</span>}
        </div>
      </div>
      <div className="aa-card-body">
        <div className="aa-card-dev-row">
          {devLogo ? (
            <img className="aa-card-dev-logo" src={devLogo} alt={dev} />
          ) : (
            <span className="aa-card-dev-mark">{(project.developer || '?').slice(0, 1).toUpperCase()}</span>
          )}
          <h4 className="aa-card-name">{project.name}</h4>
        </div>
        <div className="aa-card-loc">{locationLine(project) || project.country || '—'}</div>
        <div className="aa-card-foot">
          <div className="aa-card-foot-col">
            <div className="aa-card-lbl">Price From</div>
            <div className="aa-card-val aa-card-val-price">{priceRange(project)}</div>
          </div>
          <div className="aa-card-foot-col aa-card-foot-col-right">
            <div className="aa-card-lbl">Status</div>
            <div className="aa-card-val">{status || '—'}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
