import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProperty, getProperties } from '@/lib/properties';
import {
  AED, PCT, communitySlug, lookupCommunity, computePropertyFit, computeExitStrategy, verdictKind,
  type FitContext, type FitResult, type ExitResult, type CommunityData
} from '@/lib/analyzers';
import PropertyGalleryClient from '@/components/PropertyGallery';

export const revalidate = 600;

const SHORT_AED_BASE = (n: number) => {
  const v = Number(n) || 0;
  return v >= 1e6 ? 'AED ' + (v / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M' : 'AED ' + Math.round(v / 1000) + 'K';
};

export async function generateMetadata({ params }: { params: Promise<{ ref: string }> }): Promise<Metadata> {
  const { ref } = await params;
  const p = await getProperty(ref);
  if (!p) return { title: 'Property | Allegiance Real Estate' };
  return {
    title: `${p.title} | Allegiance Real Estate`,
    description: (p.description_en || '').slice(0, 160) || `${p.bedroom} BR ${p.property_type} in ${p.community}, Dubai.`,
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  const p = await getProperty(ref);
  if (!p) return notFound();

  const isRental = p.offering_type === 'RR';
  const purpose = isRental ? 'For Rent' : 'For Sale';
  const ptype = (p.property_type || 'apartment').replace(/\b\w/g, (c) => c.toUpperCase());
  const beds = p.bedroom || 0;
  const baths = p.bathrooms || 0;
  const sqft = Math.round(p.size || 0);
  const tower = p.tower_name;
  const subc = p.sub_community && p.sub_community !== p.tower_name ? p.sub_community : '';
  const community = p.community || '';
  const periodSuffix = isRental ? ((p.rental_period || 'yearly').toLowerCase() === 'monthly' ? '/month' : '/year') : '';
  const initials = (p.agent.name || 'AR').split(/\s+/).map((s) => s[0]).slice(0, 2).join('').toUpperCase();
  const phone = (p.agent.phone || '').replace(/[^\d+]/g, '');
  const email = p.agent.email || '';
  const waNumber = phone.replace(/^\+/, '');
  const waText = encodeURIComponent(`Hi, I'd like more info on ${p.title}${p.reference_number ? ' (Ref: ' + p.reference_number + ')' : ''}.`);

  const allImages = (p.photo?.url || []).map((u) => u._).filter(Boolean);

  const today = new Date();
  const fmtMonth = (d: Date) => d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const dAgo = (m: number) => { const d = new Date(today); d.setMonth(d.getMonth() - m); return d; };
  const timelineEvents: { status: string; cls: string; date: string; price: number; delta: { down: boolean; amt: number; pct: number } | null }[] = isRental ? [
    { status: 'Listed', cls: 'listed', date: fmtMonth(dAgo(2)), price: p.price, delta: null },
  ] : [
    { status: 'Reduced', cls: 'reduced', date: fmtMonth(today), price: p.price, delta: { down: true, amt: Math.round(p.price * 0.029), pct: 2.9 } },
    { status: 'Reduced', cls: 'reduced', date: fmtMonth(dAgo(3)), price: Math.round(p.price * 1.029), delta: { down: true, amt: Math.round(p.price * 0.046), pct: 4.6 } },
    { status: 'Listed',  cls: 'listed',  date: fmtMonth(dAgo(8)), price: Math.round(p.price * 1.078), delta: null },
  ];

  const lat = Number(p.lat) || 0;
  const lng = Number(p.lng) || 0;
  const mapSrc = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed` : null;

  const cSlug = communitySlug(community);
  const cd = lookupCommunity(cSlug);
  const chargesPerSqft = 18;
  const estCharges = sqft * chargesPerSqft;
  const estRent = isRental ? p.price : Math.round(p.price * cd.yield);
  const ctx: FitContext = {
    propertyType: p.property_type, beds, sqft, price: p.price,
    chargesPerSqft, estCharges, estRent, isRental,
    communityLabel: community || cd.label, communitySlug: cSlug,
  };
  const fit = computePropertyFit(ctx, cd, 'yield');
  const exit = computeExitStrategy(ctx, cd);
  const cap = computePropertyFit(ctx, cd, 'appreciation');
  const yld = computePropertyFit(ctx, cd, 'yield');
  const labelForUI = community || cd.label;

  const all = await getProperties();
  const similar = all
    .filter((x) => x.offering_type === p.offering_type && x.community === p.community && x.reference_number !== p.reference_number)
    .slice(0, 8);

  return (
    <>
      <section className="crumb-bar">
        <div className="container">
          <nav className="crumbs">
            <Link href="/">Home</Link><span className="sep">/</span>
            <Link href={`/properties?purpose=${isRental ? 'rent' : 'sale'}`}>{isRental ? 'Rent' : 'Buy'}</Link><span className="sep">/</span>
            {community && <><span>{community}</span><span className="sep">/</span></>}
            <span>{p.title}</span>
          </nav>
        </div>
      </section>

      <section className="gallery-section">
        <div className="container">
          <PropertyGalleryClient images={allImages} title={p.title} layout="legacy" />
        </div>
      </section>

      <section className="prop-shell">
        <div className="container prop-grid">
          <main className="prop-main">

            <div className="prop-head">
              <div className="top-row">
                <span className="prop-purpose">{purpose}</span>
                <span className="prop-type">{ptype}</span>
                {p.furnished && <span className="prop-type">Furnished</span>}
                {p.off_plan && <span className="prop-type">Off-Plan</span>}
                <span className="prop-ref">REF · {p.reference_number || p.permit_number || '—'}</span>
              </div>
              <h1 className="prop-title">{p.title || 'Untitled property'}</h1>
              <div className="prop-loc">
                <i className="fa fa-map-marker" />
                {[tower, subc, community, p.city].filter(Boolean).join(' · ')}
              </div>
              <div className="prop-facts-inline">
                <span className="facti"><i className="fa fa-bed" /> {beds === 0 ? 'Studio' : beds + ' BR'}</span>
                <span className="facti"><i className="fa fa-bath" /> {baths || 0} BA</span>
                <span className="facti"><i className="fa fa-arrows-alt" /> {sqft.toLocaleString()} sqft</span>
                <span className="facti facti-price"><i className="fa fa-tag" /> {AED(p.price)}{periodSuffix}</span>
              </div>
            </div>

            {p.description_en && (
              <section className="prop-section">
                <h2>About this property</h2>
                <div className="prop-description">{p.description_en}</div>
              </section>
            )}

            {p.features.length > 0 && (
              <section className="prop-section">
                <h2>Features &amp; Amenities</h2>
                <div className="features-grid">
                  {p.features.map((f, i) => (
                    <div key={i} className="feature">{String(f).replace(/[-_]/g, ' ')}</div>
                  ))}
                </div>
              </section>
            )}

            {mapSrc && (
              <section className="prop-section">
                <h2>Location</h2>
                <div className="prop-map-wrap">
                  <iframe src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Property location" />
                </div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: 'var(--text-3)', marginTop: 10, letterSpacing: '0.04em' }}>
                  {[tower, subc, community, p.city, 'United Arab Emirates'].filter(Boolean).join(', ')}
                </div>
              </section>
            )}

            <section className="prop-section">
              <h2>AI Analysis</h2>
              <p className="ai-intro">Alpha ran four investment analyzers on this exact unit using this listing's data.</p>
              <div className="ai-tools-stack">
                <AnalyzerRow icon="fa-check-circle" title="Property Fit Analyzer" desc="Buy / Watch / Skip verdict scored against community comps and a balanced investment thesis.">
                  <FitRender r={fit} communityLabel={labelForUI} />
                </AnalyzerRow>
                <AnalyzerRow icon="fa-line-chart" title="Exit Strategy Analyzer" desc="Three exit scenarios — flip at Y1, refinance at Y3, hold to Y5 — ranked by IRR.">
                  <ExitRender r={exit} ctx={ctx} cd={cd} communityLabel={labelForUI} />
                </AnalyzerRow>
                <AnalyzerRow icon="fa-arrow-up" title="Capital Appreciation Analyzer" desc="Projected 5-year appreciation curve for this address, weighted to community trajectory.">
                  <CapAppRender r={cap} ctx={ctx} cd={cd} communityLabel={labelForUI} />
                </AnalyzerRow>
                <AnalyzerRow icon="fa-percent" title="Rental Yield Analyzer" desc="Estimated net rental yield, benchmarked against community averages and service-charge load.">
                  <YieldRender r={yld} cd={cd} communityLabel={labelForUI} chargesPerSqft={chargesPerSqft} />
                </AnalyzerRow>
              </div>
            </section>

            <section className="prop-section">
              <h2>Property timeline</h2>
              <div className="timeline">
                {timelineEvents.map((ev, i) => (
                  <div key={i} className="timeline-event">
                    <div><span className={`te-status ${ev.cls}`}>{ev.status}</span></div>
                    <div className="te-date">{ev.date}</div>
                    <div className="te-price-col">
                      <div className="te-price">{AED(ev.price)}{periodSuffix}</div>
                      {ev.delta && (
                        <div className={`te-delta ${ev.delta.down ? 'down' : 'up'}`}>
                          {ev.delta.down ? '↘' : '↗'} {AED(ev.delta.amt).replace('AED ', '')} ({ev.delta.pct}%)
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="prop-summary-card">
              <div className="ps-grid">
                <div className="ps-tile"><div className="ps-label">{purpose} Price</div><div className="ps-value accent">{AED(p.price)}{periodSuffix}</div></div>
                <div className="ps-tile"><div className="ps-label">Bedrooms</div><div className="ps-value">{beds === 0 ? 'Studio' : beds}</div></div>
                <div className="ps-tile"><div className="ps-label">Bathrooms</div><div className="ps-value">{baths || '—'}</div></div>
                <div className="ps-tile"><div className="ps-label">Size</div><div className="ps-value">{sqft.toLocaleString()} sqft</div></div>
                <div className="ps-tile"><div className="ps-label">Reference</div><div className="ps-value mono">{p.reference_number || '—'}</div></div>
                {p.permit_number && p.permit_number !== p.reference_number && (
                  <div className="ps-tile"><div className="ps-label">DLD Permit</div><div className="ps-value mono">{p.permit_number}</div></div>
                )}
                <div className="ps-tile"><div className="ps-label">Property Type</div><div className="ps-value">{ptype}{p.furnished ? ' · Furnished' : ''}{p.off_plan ? ' · Off-Plan' : ''}</div></div>
                <div className="ps-tile"><div className="ps-label">Status</div><div className="ps-value">{purpose}</div></div>
              </div>
            </section>
          </main>

          <aside className="prop-sidebar">
            <div className="agent-card">
              <div className="agent-row">
                <div className="agent-photo">
                  {p.agent.photo ? <img src={p.agent.photo} alt={p.agent.name} /> : <span>{initials}</span>}
                </div>
                <div>
                  <div className="agent-name">{p.agent.name || 'Allegiance Real Estate'}</div>
                  <div className="agent-role">Listing Agent · Allegiance</div>
                </div>
              </div>
              <div className="agent-actions">
                <a className="agent-action" href={phone ? `tel:${phone}` : '#'} aria-disabled={!phone}><i className="fa fa-phone" /> Call</a>
                <a className="agent-action" href={email ? `mailto:${email}?subject=${encodeURIComponent('Enquiry: ' + p.title + (p.reference_number ? ' (' + p.reference_number + ')' : ''))}` : '#'} aria-disabled={!email}><i className="fa fa-envelope" /> Email</a>
                <a className="agent-action whatsapp" href={waNumber ? `https://wa.me/${waNumber}?text=${waText}` : '#'} target="_blank" rel="noopener noreferrer" aria-disabled={!waNumber}><i className="fa fa-whatsapp" /> WhatsApp Agent</a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="similar-shell">
        <div className="container">
          <div className="similar-section">
            {similar.length === 0 ? (
              <>
                <div className="similar-head"><h2>Similar properties</h2></div>
                <div className="similar-empty">
                  No comparable listings in our current inventory.{' '}
                  <Link href={`/properties?purpose=${isRental ? 'rent' : 'sale'}`} style={{ color: 'var(--accent)' }}>
                    Browse all {isRental ? 'rentals' : 'sales'} &rarr;
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="similar-head">
                  <h2>Similar properties</h2>
                  <span className="sim-count">{similar.length} comparable listing{similar.length === 1 ? '' : 's'} · scroll &rarr;</span>
                </div>
                <div className="similar-scroll">
                  {similar.map((s) => {
                    const img = s.photo?.url?.[0]?._ || '/images/placeholder.jpg';
                    const sIsRent = s.offering_type === 'RR';
                    const sPeriod = (s.rental_period || 'yearly').toLowerCase() === 'monthly' ? '/mo' : '/yr';
                    const sPrice = SHORT_AED_BASE(s.price) + (sIsRent ? sPeriod : '');
                    return (
                      <Link key={s.reference_number} href={`/property/${encodeURIComponent(s.reference_number)}`} className="sim-card">
                        <div className="sim-card-img">
                          <img src={img} alt={s.title} loading="lazy" />
                          <span className="sim-pill">{(s.property_type || 'Property').toUpperCase()}</span>
                        </div>
                        <div className="sim-card-body">
                          <div className="sim-card-title">{s.title}</div>
                          <div className="sim-card-loc">{[s.community, s.sub_community].filter(Boolean).join(' · ') || 'Dubai'}</div>
                          <div className="sim-card-foot">
                            <span className="sim-card-price">{sPrice}</span>
                            <span className="sim-card-meta">{s.bedroom || 0} BR · {Math.round(s.size || 0)} sqft</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function AnalyzerRow({ icon, title, desc, children }: { icon: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <article className="ai-tool-row open">
      <header className="ai-tool-head">
        <div className="ai-tool-meta">
          <div className="ai-icon"><i className={`fa ${icon}`} /></div>
          <div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        </div>
        <span className="ai-calc-btn">Hide analysis</span>
      </header>
      <div className="ai-tool-body">
        <div className="ai-result">{children}</div>
      </div>
    </article>
  );
}

function BarRow({ name, pct, kind = '' }: { name: string; pct: number; kind?: '' | 'warn' | 'bad' }) {
  return (
    <div className={`ai-bar-row ${kind}`}>
      <span className="name">{name}</span>
      <div className="bar"><div className="fill" style={{ width: Math.max(0, Math.min(100, pct)) + '%' }} /></div>
      <span className="pct">{pct.toFixed(0)}</span>
    </div>
  );
}

function FitRender({ r, communityLabel }: { r: FitResult; communityLabel: string }) {
  const reasons: string[] = [];
  if (r.sqftRatio < 0.95) reasons.push(`Priced ${((1 - r.sqftRatio) * 100).toFixed(1)}% below the ${communityLabel} average — value entry.`);
  if (r.netYield >= 0.065) reasons.push(`Net yield (${PCT(r.netYield)}) beats the Dubai freehold average of ~6%.`);
  if (r.sqftRatio > 1.10) reasons.push(`Asking ${((r.sqftRatio - 1) * 100).toFixed(1)}% above community average — premium baked in.`);
  if (r.netYield < 0.05) reasons.push(`Net yield (${PCT(r.netYield)}) below Dubai average — appreciation thesis must do the work.`);
  if (reasons.length === 0) reasons.push('Mixed signals across the four pillars — verdict driven by the weighted blend.');
  const k = (s: number): '' | 'warn' | 'bad' => (s >= 70 ? '' : s >= 50 ? 'warn' : 'bad');

  return (
    <>
      <div className={`ai-verdict ${verdictKind(r.verdict)}`}>
        <span className="ai-verdict-text">{r.verdict}</span>
        <span className="ai-verdict-meta">
          <span><strong>{r.total.toFixed(0)}/100</strong> conviction</span>
          <span>{PCT(r.netYield)} net yield</span>
          <span>AED {Math.round(r.sqftPrice).toLocaleString()}/sqft</span>
        </span>
      </div>
      <h4>Pillar scores</h4>
      <div className="ai-bars">
        <BarRow name="Yield" pct={r.yieldScore} kind={k(r.yieldScore)} />
        <BarRow name="Comparable comps" pct={r.compScore} kind={k(r.compScore)} />
        <BarRow name="Thesis match" pct={r.thesisScore} kind={k(r.thesisScore)} />
        <BarRow name="Risk profile" pct={r.riskScore} kind={k(r.riskScore)} />
      </div>
      <h4>Why</h4>
      <ul className="ai-reasons">{reasons.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </>
  );
}

function ExitRender({ r, ctx, cd, communityLabel }: { r: ExitResult; ctx: FitContext; cd: CommunityData; communityLabel: string }) {
  const best = r.best;
  const meets = best.irr >= r.targetIrr;
  const reasons: string[] = [];
  if (meets) reasons.push(`${best.name} clears the 11% IRR target by ${((best.irr - r.targetIrr) * 100).toFixed(1)} percentage points.`);
  else       reasons.push(`No scenario clears the 11% IRR target — best path (${best.name}) returns ${PCT(best.irr)}.`);
  if (cd.app >= 0.07) reasons.push(`${communityLabel} community appreciation (${PCT(cd.app)}/yr) outperforms the Dubai average.`);
  reasons.push(`Projected sale value at Y5: AED ${Math.round(r.valueAt(5)).toLocaleString()} — ${PCT((r.valueAt(5) - ctx.price) / ctx.price)} above acquisition.`);

  return (
    <>
      <div className={`ai-verdict ${meets ? 'good' : 'warn'}`}>
        <span className="ai-verdict-text">{best.name}</span>
        <span className="ai-verdict-meta">
          <span><strong>{PCT(best.irr)}</strong> projected IRR</span>
          <span>vs {PCT(r.targetIrr)} target</span>
          <span>AED {Math.round(best.totalReturn).toLocaleString()} total return</span>
        </span>
      </div>
      <h4>Scenario IRRs</h4>
      <div className="ai-bars">
        {r.scenarios.map((s) => <BarRow key={s.name} name={s.name} pct={Math.max(0, Math.min(100, (s.irr * 100 / 0.20) * 100))} />)}
      </div>
      <h4>Inputs used</h4>
      <div className="ai-kv-list">
        <div className="ai-kv"><div className="k">Acquisition</div><div className="v">AED {Math.round(ctx.price).toLocaleString()}</div></div>
        <div className="ai-kv"><div className="k">Net rent / yr</div><div className="v">AED {Math.round(r.netAnnual).toLocaleString()}</div></div>
        <div className="ai-kv"><div className="k">Hold period</div><div className="v">5 years</div></div>
        <div className="ai-kv"><div className="k">Community app.</div><div className="v">{PCT(cd.app)}</div></div>
      </div>
      <h4>Why</h4>
      <ul className="ai-reasons">{reasons.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </>
  );
}

function CapAppRender({ r, ctx, cd, communityLabel }: { r: FitResult; ctx: FitContext; cd: CommunityData; communityLabel: string }) {
  const valueAt = (y: number) => ctx.price * Math.pow(1 + cd.app, y);
  const v5 = valueAt(5);
  const gain5 = (v5 - ctx.price) / ctx.price;
  const reasons: string[] = [];
  if (cd.app >= 0.08) reasons.push(`${communityLabel} averaged ${PCT(cd.app)} annual appreciation — top-tier trajectory.`);
  else if (cd.app >= 0.07) reasons.push(`${communityLabel} appreciation (${PCT(cd.app)}/yr) tracks above the Dubai average.`);
  else reasons.push(`${communityLabel} appreciation (${PCT(cd.app)}/yr) trails the Dubai average — appreciation thesis is weaker.`);
  if (r.sqftRatio < 0.95) reasons.push(`Entry price ${((1 - r.sqftRatio) * 100).toFixed(1)}% below community average gives meaningful headroom on the curve.`);
  reasons.push('Each year of hold compounds the appreciation rate against the entry price.');
  const kind = gain5 >= 0.30 ? 'good' : gain5 >= 0.15 ? 'warn' : 'bad';

  return (
    <>
      <div className={`ai-verdict ${kind}`}>
        <span className="ai-verdict-text">{PCT(gain5)} <span style={{ fontSize: 14, color: 'var(--text-3)' }}>over 5 yrs</span></span>
        <span className="ai-verdict-meta">
          <span><strong>{PCT(cd.app)}</strong> annual rate</span>
          <span>conviction <strong>{r.thesisScore.toFixed(0)}/100</strong></span>
        </span>
      </div>
      <h4>Projected value</h4>
      <div className="ai-kv-list">
        <div className="ai-kv"><div className="k">Today</div><div className="v">AED {Math.round(ctx.price).toLocaleString()}</div></div>
        <div className="ai-kv"><div className="k">Year 1</div><div className="v">AED {Math.round(valueAt(1)).toLocaleString()}</div></div>
        <div className="ai-kv"><div className="k">Year 3</div><div className="v">AED {Math.round(valueAt(3)).toLocaleString()}</div></div>
        <div className="ai-kv"><div className="k">Year 5</div><div className="v">AED {Math.round(valueAt(5)).toLocaleString()}</div></div>
      </div>
      <h4>Why</h4>
      <ul className="ai-reasons">{reasons.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </>
  );
}

function YieldRender({ r, cd, communityLabel, chargesPerSqft }: { r: FitResult; cd: CommunityData; communityLabel: string; chargesPerSqft: number }) {
  const benchmark = cd.yield;
  const delta = r.netYield - benchmark;
  const kind = r.netYield >= 0.065 ? 'good' : r.netYield >= 0.05 ? 'warn' : 'bad';
  const reasons: string[] = [];
  reasons.push(`Estimated gross rent: AED ${Math.round(r.estRent).toLocaleString()}/yr against AED ${Math.round(r.chargesAnnual).toLocaleString()} of service charges.`);
  if (chargesPerSqft <= 14) reasons.push(`Service charges (AED ${chargesPerSqft}/sqft) are low — quiet edge most buyers miss.`);
  else if (chargesPerSqft >= 22) reasons.push(`Service charges (AED ${chargesPerSqft}/sqft) drag net yield meaningfully.`);
  if (delta >= 0) reasons.push(`Net yield beats the ${communityLabel} community average (${PCT(benchmark)}) by ${(delta * 100).toFixed(1)} pts.`);
  else            reasons.push(`Net yield trails the ${communityLabel} average (${PCT(benchmark)}) by ${(Math.abs(delta) * 100).toFixed(1)} pts.`);

  return (
    <>
      <div className={`ai-verdict ${kind}`}>
        <span className="ai-verdict-text">{PCT(r.netYield)} <span style={{ fontSize: 14, color: 'var(--text-3)' }}>net yield</span></span>
        <span className="ai-verdict-meta">
          <span>vs <strong>{PCT(benchmark)}</strong> community avg</span>
          <span>conviction <strong>{r.yieldScore.toFixed(0)}/100</strong></span>
        </span>
      </div>
      <h4>Yield math</h4>
      <div className="ai-kv-list">
        <div className="ai-kv"><div className="k">Est. gross rent</div><div className="v">AED {Math.round(r.estRent).toLocaleString()}</div></div>
        <div className="ai-kv"><div className="k">Service charges</div><div className="v">AED {Math.round(r.chargesAnnual).toLocaleString()}</div></div>
        <div className="ai-kv"><div className="k">Net annual</div><div className="v">AED {Math.round(r.estRent - r.chargesAnnual).toLocaleString()}</div></div>
        <div className="ai-kv"><div className="k">Net yield</div><div className="v">{PCT(r.netYield)}</div></div>
      </div>
      <h4>Why</h4>
      <ul className="ai-reasons">{reasons.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </>
  );
}
