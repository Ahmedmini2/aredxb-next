'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Property } from '@/lib/properties';
import PropertiesMap from './PropertiesMap';

const PAGE_SIZE = 10;

const SHORT_AED_BASE = (n: number) => {
  const v = Number(n) || 0;
  return v >= 1e6 ? 'AED ' + (v / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M' : 'AED ' + Math.round(v / 1000) + 'K';
};
function priceLabel(p: Property) {
  const base = SHORT_AED_BASE(p.price);
  if (p.offering_type !== 'RR') return base;
  return base + ((p.rental_period || 'yearly').toLowerCase() === 'monthly' ? '/mo' : '/yr');
}

function getImg(p: Property): string {
  return p.photo?.url?.[0]?._ || '/images/placeholder.jpg';
}

type Props = { properties: Property[]; initialPurpose: 'sale' | 'rent' };

export default function PropertiesListing({ properties, initialPurpose }: Props) {
  const [purpose, setPurpose] = useState<'sale' | 'rent'>(initialPurpose);
  const [ready, setReady] = useState<'all' | 'ready' | 'offplan'>('all');
  const [category, setCategory] = useState<'residential' | 'commercial'>('residential');
  const [beds, setBeds] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState<'newest' | 'price-asc' | 'price-desc' | 'size-desc'>('newest');
  const [page, setPage] = useState<number>(1);

  const filtered = useMemo(() => {
    let arr = properties.slice();
    arr = arr.filter((p) => (purpose === 'rent' ? p.offering_type === 'RR' : p.offering_type === 'RS'));
    if (purpose !== 'rent' && ready !== 'all') {
      arr = arr.filter((p) => (ready === 'offplan' ? !!p.off_plan : !p.off_plan));
    }
    if (purpose === 'rent' && category === 'commercial') arr = [];
    if (beds !== '') {
      const want = parseInt(beds, 10);
      if (want === 5) arr = arr.filter((p) => (p.bedroom || 0) >= 5);
      else arr = arr.filter((p) => (p.bedroom || 0) === want);
    }
    if (price) {
      const [pmin, pmax] = price.split('-').map(Number);
      arr = arr.filter((p) => p.price >= (pmin || 0) && p.price <= (pmax || Infinity));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter((p) =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.community || '').toLowerCase().includes(q) ||
        (p.sub_community || '').toLowerCase().includes(q) ||
        (p.reference_number || '').toLowerCase().includes(q)
      );
    }
    if (sort === 'price-asc') arr.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sort === 'price-desc') arr.sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (sort === 'size-desc') arr.sort((a, b) => (b.size || 0) - (a.size || 0));
    return arr;
  }, [properties, purpose, ready, category, beds, price, search, sort]);

  // Reset to page 1 whenever filters change
  useEffect(() => { setPage(1); }, [purpose, ready, category, beds, price, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  // Build pagination button list
  const pageBtns: number[] = [];
  const pageSet = new Set<number>([1, totalPages, safePage]);
  for (let d = 1; d <= 1; d++) {
    if (safePage - d > 1) pageSet.add(safePage - d);
    if (safePage + d < totalPages) pageSet.add(safePage + d);
  }
  Array.from(pageSet).sort((a, b) => a - b).forEach((n) => pageBtns.push(n));

  const isRent = purpose === 'rent';

  return (
    <>
      {/* FILTER ROW */}
      <section className="props-filter-row">
        <div className="container props-filter-inner">
          <div className="props-filter-group">
            <select className="purpose-select" value={purpose} onChange={(e) => setPurpose(e.target.value as 'sale' | 'rent')}>
              <option value="sale">Buy</option>
              <option value="rent">Rent</option>
            </select>

            {!isRent && (
              <div className="seg-toggle">
                <button className={ready === 'all' ? 'active' : ''} onClick={() => setReady('all')}>All</button>
                <button className={ready === 'ready' ? 'active' : ''} onClick={() => setReady('ready')}>Ready</button>
                <button className={ready === 'offplan' ? 'active' : ''} onClick={() => setReady('offplan')}>Off-Plan</button>
              </div>
            )}
            {isRent && (
              <div className="seg-toggle">
                <button className={category === 'residential' ? 'active' : ''} onClick={() => setCategory('residential')}>Residential</button>
                <button className={category === 'commercial' ? 'active' : ''} onClick={() => setCategory('commercial')}>Commercial</button>
              </div>
            )}

            <select className="props-filter-select" value={beds} onChange={(e) => setBeds(e.target.value)}>
              <option value="">Any beds</option>
              <option value="0">Studio</option>
              <option value="1">1 BR</option>
              <option value="2">2 BR</option>
              <option value="3">3 BR</option>
              <option value="4">4 BR</option>
              <option value="5">5+ BR</option>
            </select>

            <select className="props-filter-select" value={price} onChange={(e) => setPrice(e.target.value)}>
              {isRent ? (
                <>
                  <option value="">Any Rent</option>
                  <option value="0-50000">Under 50K AED</option>
                  <option value="50000-100000">50K – 100K AED</option>
                  <option value="100000-200000">100K – 200K AED</option>
                  <option value="200000-500000">200K – 500K AED</option>
                  <option value="500000-999999999">500K+ AED</option>
                </>
              ) : (
                <>
                  <option value="">Any Price</option>
                  <option value="0-1000000">Under 1M AED</option>
                  <option value="1000000-2000000">1M – 2M AED</option>
                  <option value="2000000-5000000">2M – 5M AED</option>
                  <option value="5000000-10000000">5M – 10M AED</option>
                  <option value="10000000-999999999">10M+ AED</option>
                </>
              )}
            </select>

            <div className="props-search">
              <i className="fa fa-search" />
              <input type="search" placeholder="Search title, community, ref…" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          <div className="props-filter-meta">
            <span><strong>{filtered.length}</strong> results</span>
            <div className="view-toggle">
              <button className={`view-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')} aria-label="Grid view"><i className="fa fa-th" /></button>
              <button className={`view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')} aria-label="List view"><i className="fa fa-list" /></button>
            </div>
            <select className="props-filter-select" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} style={{ minWidth: 120 }}>
              <option value="newest">Newest first</option>
              <option value="price-asc">Price: low → high</option>
              <option value="price-desc">Price: high → low</option>
              <option value="size-desc">Largest first</option>
            </select>
          </div>
        </div>
      </section>

      {/* LISTING + MAP */}
      <section className="listing-shell">
        <div className="container">
          <div className="listing-grid">
            <div>
              <div className={`listing-list ${view === 'list' ? 'list-view' : ''}`} id="listingList">
            {pageItems.length === 0 && (
              <div className="listing-empty">
                <div className="empty-icon">◎</div>
                <p>No properties match your filters. Try widening the price range or clearing the search.</p>
              </div>
            )}
            {pageItems.map((p) => {
              const ref = p.reference_number;
              const phoneRaw = (p.agent.phone || '').trim();
              const phone = phoneRaw.replace(/[^\d+]/g, '');
              const email = (p.agent.email || '').trim();
              const waText = encodeURIComponent(`Hi, I'd like more info on ${p.title || 'this property'}${ref ? ' (Ref: ' + ref + ')' : ''}.`);
              const waNumber = phone.replace(/^\+/, '');
              const features = (p.features || []).slice(0, 4);
              return (
                <Link key={ref} href={`/property/${encodeURIComponent(ref)}`} className="property-card">
                  <div className="pc-img">
                    <img src={getImg(p)} alt={p.title || 'Property'} loading="lazy" />
                    <span className="type-badge">{(p.property_type || 'Property').toUpperCase()}</span>
                    <span className="price-tag">{priceLabel(p)}</span>
                  </div>
                  <div className="pc-body">
                    <div className="pc-title">{p.title || 'Untitled property'}</div>
                    <div className="pc-loc"><i className="fa fa-map-marker" />{[p.community, p.sub_community].filter(Boolean).join(' · ') || 'Dubai'}</div>
                    {features.length > 0 && (
                      <div className="pc-amenities">
                        {features.map((f, i) => <span key={i} className="amen">{String(f).replace(/[-_]/g, ' ')}</span>)}
                        {p.features.length > 4 && <span className="amen-more">+{p.features.length - 4} more</span>}
                      </div>
                    )}
                    <div className="pc-meta">
                      <span className="pcm"><i className="fa fa-bed" />{p.bedroom || 0}</span>
                      <span className="pcm"><i className="fa fa-bath" />{p.bathrooms || 0}</span>
                      <span className="pcm"><i className="fa fa-arrows-alt" />{Math.round(p.size || 0)} sqft</span>
                    </div>
                  </div>
                  <div className="pc-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className="pc-act call"
                      disabled={!phone}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (phone) window.location.href = `tel:${phone}`; }}
                    ><i className="fa fa-phone" />Call</button>
                    <button
                      type="button"
                      className="pc-act email"
                      disabled={!email}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (email) window.location.href = `mailto:${email}?subject=${encodeURIComponent('Enquiry: ' + (p.title || 'Property') + (ref ? ' (' + ref + ')' : ''))}`;
                      }}
                    ><i className="fa fa-envelope" />Email</button>
                    <button
                      type="button"
                      className="pc-act whatsapp"
                      disabled={!waNumber}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (waNumber) window.open(`https://wa.me/${waNumber}?text=${waText}`, '_blank', 'noopener,noreferrer'); }}
                    ><i className="fa fa-whatsapp" />WhatsApp</button>
                  </div>
                </Link>
              );
            })}
          </div>

              {/* PAGINATION */}
              {totalPages > 1 ? (
                <div className="listing-pagination">
                  <button className="pg-btn" disabled={safePage === 1} onClick={() => setPage(safePage - 1)}><i className="fa fa-angle-left" /> Prev</button>
                  {pageBtns.map((n, idx) => (
                    <span key={idx} style={{ display: 'contents' }}>
                      {idx > 0 && pageBtns[idx] - pageBtns[idx - 1] > 1 && <span className="pg-ellipsis">…</span>}
                      <button className={`pg-btn ${n === safePage ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
                    </span>
                  ))}
                  <button className="pg-btn" disabled={safePage === totalPages} onClick={() => setPage(safePage + 1)}>Next <i className="fa fa-angle-right" /></button>
                  <span className="pg-info">{(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length}</span>
                </div>
              ) : filtered.length > 0 ? (
                <div className="listing-pagination">
                  <span className="pg-info">Showing all {filtered.length} result{filtered.length === 1 ? '' : 's'}</span>
                </div>
              ) : null}
            </div>
            <PropertiesMap properties={filtered} />
          </div>
        </div>
      </section>
    </>
  );
}
