'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { ProjectSummary } from '@/lib/offplan';

const PAGE_SIZE = 12;

function splitTypes(s: string): string[] {
  return String(s || '')
    .split(/[,;|/]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function OffplanGrid({ projects }: { projects: ProjectSummary[] }) {
  const [search, setSearch] = useState('');
  const [developer, setDeveloper] = useState('');
  const [community, setCommunity] = useState('');
  const [handover, setHandover] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [price, setPrice] = useState('');
  const [page, setPage] = useState(1);

  const developers = useMemo(
    () => Array.from(new Set(projects.map((p) => p.developer).filter(Boolean))).sort(),
    [projects],
  );
  const communities = useMemo(
    () => Array.from(new Set(projects.map((p) => p.community).filter(Boolean))).sort(),
    [projects],
  );
  const handovers = useMemo(
    () => Array.from(new Set(projects.map((p) => p.handover).filter(Boolean))).sort(),
    [projects],
  );
  const propertyTypes = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => splitTypes(p.propertyTypes).forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const list = useMemo(() => {
    const q = search.trim().toLowerCase();
    const range = price ? price.split('-').map(Number) : null;
    const wantedType = propertyType.trim().toLowerCase();
    return projects.filter((p) => {
      if (developer && p.developer !== developer) return false;
      if (community && p.community !== community) return false;
      if (handover && p.handover !== handover) return false;
      if (wantedType) {
        const types = splitTypes(p.propertyTypes).map((t) => t.toLowerCase());
        if (!types.includes(wantedType)) return false;
      }
      if (q) {
        const hay = ((p.name || '') + ' ' + (p.developer || '') + ' ' + (p.community || '') + ' ' + (p.subCommunity || '')).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      if (range && p.priceFromRaw) {
        if (p.priceFromRaw < range[0] || p.priceFromRaw > range[1]) return false;
      }
      return true;
    });
  }, [projects, search, developer, community, handover, propertyType, price]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [search, developer, community, handover, propertyType, price]);

  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const pageItems = list.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const pageBtns: number[] = [];
  const pageSet = new Set<number>([1, totalPages, safePage]);
  if (safePage - 1 > 1) pageSet.add(safePage - 1);
  if (safePage + 1 < totalPages) pageSet.add(safePage + 1);
  Array.from(pageSet).sort((a, b) => a - b).forEach((n) => pageBtns.push(n));

  return (
    <>
      <div className="offplan-filter-row">
        <input
          type="search"
          placeholder="Search by name, developer or community"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={developer} onChange={(e) => setDeveloper(e.target.value)}>
          <option value="">All developers</option>
          {developers.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={handover} onChange={(e) => setHandover(e.target.value)}>
          <option value="">Any handover</option>
          {handovers.map((h) => <option key={h} value={h}>{h}</option>)}
        </select>
        <select value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="">Any price</option>
          <option value="0-1000000">Under AED 1M</option>
          <option value="1000000-2000000">AED 1M — 2M</option>
          <option value="2000000-5000000">AED 2M — 5M</option>
          <option value="5000000-10000000">AED 5M — 10M</option>
          <option value="10000000-99999999999">AED 10M+</option>
        </select>
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
          <option value="">All property types</option>
          {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={community} onChange={(e) => setCommunity(e.target.value)}>
          <option value="">All communities</option>
          {communities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="offplan-grid">
        {pageItems.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--text-3)' }}>
            No projects match your filters.
          </div>
        )}
        {pageItems.map((p) => {
          const img = p.image || '/images/offplan.webp';
          return (
            <Link key={p.id} className="offplan-card" href={`/offplan/project/${p.id}`}>
              <div className="op-img" style={{ backgroundImage: `url('${img}')` }}>
                <span className="op-tag">Off-Plan</span>
              </div>
              <div className="op-body">
                <div className="op-developer">{p.developer || 'Developer TBA'}</div>
                <h3>{p.name}</h3>
                <div className="op-location">{[p.subCommunity, p.community].filter(Boolean).join(', ') || '—'}</div>
                <div className="op-foot">
                  <div><span className="lbl">Handover</span><span className="val">{p.handover || 'TBA'}</span></div>
                  <div style={{ textAlign: 'right' }}><span className="lbl">From</span><span className="val price">{p.priceFrom || 'On request'}</span></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 ? (
        <div className="listing-pagination">
          <button className="pg-btn" disabled={safePage === 1} onClick={() => setPage(safePage - 1)}>
            <i className="fa fa-angle-left" /> Prev
          </button>
          {pageBtns.map((n, idx) => (
            <span key={idx} style={{ display: 'contents' }}>
              {idx > 0 && pageBtns[idx] - pageBtns[idx - 1] > 1 && <span className="pg-ellipsis">…</span>}
              <button className={`pg-btn ${n === safePage ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
            </span>
          ))}
          <button className="pg-btn" disabled={safePage === totalPages} onClick={() => setPage(safePage + 1)}>
            Next <i className="fa fa-angle-right" />
          </button>
          <span className="pg-info">
            {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, list.length)} of {list.length}
          </span>
        </div>
      ) : list.length > 0 ? (
        <div className="listing-pagination">
          <span className="pg-info">Showing all {list.length} project{list.length === 1 ? '' : 's'}</span>
        </div>
      ) : null}
    </>
  );
}
