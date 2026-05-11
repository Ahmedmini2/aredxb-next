'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionHead } from '@/components/Hero';
import { ToolPageStyles } from '../_components/styles';

type Community = { value: string; label: string; yield: number; app: number; sqft: number };

const COMMUNITIES: Community[] = [
  { value: 'dubai-marina', label: 'Dubai Marina', yield: 0.062, app: 0.072, sqft: 2300 },
  { value: 'downtown', label: 'Downtown Dubai', yield: 0.058, app: 0.068, sqft: 2700 },
  { value: 'palm-jumeirah', label: 'Palm Jumeirah', yield: 0.052, app: 0.082, sqft: 3800 },
  { value: 'business-bay', label: 'Business Bay', yield: 0.068, app: 0.075, sqft: 1900 },
  { value: 'jvc', label: 'JVC', yield: 0.082, app: 0.085, sqft: 1100 },
  { value: 'dubai-hills', label: 'Dubai Hills Estate', yield: 0.064, app: 0.078, sqft: 2100 },
  { value: 'damac-lagoons', label: 'Damac Lagoons', yield: 0.075, app: 0.092, sqft: 1700 },
  { value: 'emaar-beachfront', label: 'Emaar Beachfront', yield: 0.061, app: 0.095, sqft: 3200 },
  { value: 'sobha-hartland', label: 'Sobha Hartland', yield: 0.069, app: 0.080, sqft: 2000 },
  { value: 'arabian-ranches', label: 'Arabian Ranches', yield: 0.058, app: 0.062, sqft: 1600 },
];

const AED = (n: number) => 'AED ' + Math.round(n).toLocaleString('en-US');
const PCT = (n: number) => (n * 100).toFixed(1) + '%';
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type Comp = { unit: string; sold: string; price: number; sqftP: number };
type ResultData = {
  yieldScore: number;
  compScore: number;
  thesisScore: number;
  riskScore: number;
  total: number;
  verdict: 'BUY' | 'WATCH' | 'SKIP';
  verdictColor: string;
  netYield: number;
  sqftPrice: number;
  sqftRatio: number;
  commYield: number;
  commApp: number;
  commSqft: number;
  community: string;
  communityLabel: string;
  beds: number;
  area: number;
  price: number;
  chargesPerSqft: number;
  type: string;
  thesis: string;
  comps: Comp[];
};

function generateComps(community: string, beds: number, refSqft: number, area: number): Comp[] {
  const seedRand = (() => {
    let s = 0;
    for (let i = 0; i < community.length; i++) s = (s * 31 + community.charCodeAt(i)) | 0;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  })();
  const towers = ['The Residences', 'Park Heights', 'Marina Vista', 'Bay Square', 'Beach Vista', 'Aura', 'Boulevard', 'Skyview'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr'];
  return Array.from({ length: 5 }, () => {
    const t = towers[Math.floor(seedRand() * towers.length)];
    const b = beds === 0 ? 'Studio' : `${beds}BR`;
    const m = months[Math.floor(seedRand() * months.length)] + ' 26';
    const sp = refSqft * (0.88 + seedRand() * 0.30);
    const ar = area * (0.90 + seedRand() * 0.20);
    return { unit: `${t} · ${b}`, sold: m, sqftP: sp, price: sp * ar };
  });
}

export default function PropertyFitClient() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [listingUrl, setListingUrl] = useState('');
  const [propType, setPropType] = useState('apartment');
  const [beds, setBeds] = useState('2');
  const [community, setCommunity] = useState('dubai-marina');
  const [area, setArea] = useState('1300');
  const [price, setPrice] = useState('2700000');
  const [charges, setCharges] = useState('18');
  const [thesis, setThesis] = useState('yield');
  const [result, setResult] = useState<ResultData | null>(null);
  const [bDate, setBDate] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    setBDate(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const p = new URLSearchParams(window.location.search);
    const setIf = (key: string, setter: (v: string) => void) => {
      const v = p.get(key);
      if (v != null) setter(v);
    };
    setIf('type', setPropType);
    setIf('beds', setBeds);
    setIf('community', setCommunity);
    setIf('area', setArea);
    setIf('price', setPrice);
    setIf('charges', setCharges);
    setIf('thesis', setThesis);
    setIf('url', setListingUrl);
    if (p.get('auto') === '1') {
      setTimeout(() => {
        formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }, 200);
    }
  }, []);

  function inferCommunityFromUrl(url: string) {
    const u = url.toLowerCase();
    const map: Record<string, string> = {
      marina: 'dubai-marina',
      downtown: 'downtown',
      palm: 'palm-jumeirah',
      'business-bay': 'business-bay',
      jvc: 'jvc',
      'jumeirah-village-circle': 'jvc',
      'dubai-hills': 'dubai-hills',
      'damac-lagoons': 'damac-lagoons',
      'emaar-beachfront': 'emaar-beachfront',
      beachfront: 'emaar-beachfront',
      'sobha-hartland': 'sobha-hartland',
      'arabian-ranches': 'arabian-ranches',
    };
    for (const k in map) if (u.includes(k)) return map[k];
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const com = COMMUNITIES.find((c) => c.value === community)!;
    const beds_ = parseInt(beds);
    const area_ = parseFloat(area) || 1000;
    const price_ = parseFloat(price) || 0;
    const chargesPerSqft = parseFloat(charges) || 18;
    const thesis_ = thesis;
    if (!price_) {
      alert('Enter the asking price.');
      return;
    }

    const sqftPrice = price_ / area_;
    const chargesAnnual = chargesPerSqft * area_;
    const estRent = price_ * com.yield * (beds_ <= 1 ? 1.05 : beds_ >= 4 ? 0.94 : 1.0);
    const netYield = (estRent - chargesAnnual) / price_;

    const yieldScore = clamp((netYield / com.yield) * 80 + 20, 0, 100);
    const sqftRatio = sqftPrice / com.sqft;
    const compScore = clamp(70 - (sqftRatio - 1) * 100, 0, 100);

    let thesisScore: number;
    if (thesis_ === 'yield') thesisScore = clamp((netYield / 0.07) * 90, 0, 100);
    else if (thesis_ === 'appreciation') thesisScore = clamp((com.app / 0.10) * 95, 0, 100);
    else if (thesis_ === 'residence') thesisScore = clamp(75 + (com.app - 0.07) * 100, 40, 100);
    else thesisScore = clamp(60 + (['palm-jumeirah', 'downtown', 'dubai-marina', 'emaar-beachfront'].includes(com.value) ? 30 : -10), 0, 100);

    let riskScore = 70;
    if (chargesPerSqft > 22) riskScore -= 20;
    if (chargesPerSqft < 14) riskScore += 10;
    if (sqftRatio > 1.15) riskScore -= 15;
    if (sqftRatio < 0.92) riskScore += 8;
    riskScore = clamp(riskScore, 0, 100);

    const weights: Record<string, number[]> = {
      yield: [0.40, 0.20, 0.30, 0.10],
      appreciation: [0.20, 0.30, 0.30, 0.20],
      residence: [0.15, 0.30, 0.30, 0.25],
      str: [0.30, 0.25, 0.30, 0.15],
    };
    const w = weights[thesis_] || weights.yield;
    const total = yieldScore * w[0] + compScore * w[1] + thesisScore * w[2] + riskScore * w[3];
    const verdict: 'BUY' | 'WATCH' | 'SKIP' = total >= 75 ? 'BUY' : total >= 55 ? 'WATCH' : 'SKIP';
    const verdictColor = verdict === 'BUY' ? 'var(--accent)' : verdict === 'WATCH' ? '#ffc83c' : 'var(--warn)';

    setResult({
      yieldScore, compScore, thesisScore, riskScore, total, verdict, verdictColor,
      netYield, sqftPrice, sqftRatio, commYield: com.yield, commApp: com.app, commSqft: com.sqft,
      community: com.value, communityLabel: com.label,
      beds: beds_, area: area_, price: price_, chargesPerSqft, type: propType, thesis: thesis_,
      comps: generateComps(com.label, beds_, sqftPrice, area_),
    });
    setDrawerOpen(false);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  }

  const r = result;
  const delta = r ? r.total - 75 : 0;

  function buildRewards(): string[] {
    if (!r) return [];
    const rewards: string[] = [];
    if (r.sqftRatio < 0.95) rewards.push(`Priced ${((1 - r.sqftRatio) * 100).toFixed(1)}% below the ${r.communityLabel} average — value entry.`);
    if (r.netYield >= 0.065) rewards.push(`Net yield (${PCT(r.netYield)}) beats the Dubai freehold average of ~6%.`);
    if (r.chargesPerSqft < 14) rewards.push(`Low service charges (AED ${r.chargesPerSqft}/sqft) — quiet edge most buyers miss.`);
    if (r.thesis === 'appreciation' && r.commApp >= 0.08) rewards.push(`${r.communityLabel} averaged ${PCT(r.commApp)} annual appreciation — well-suited to your thesis.`);
    if (rewards.length === 0) rewards.push('No standout reward signals. Verdict is driven by other factors.');
    return rewards;
  }

  function buildRisks(): string[] {
    if (!r) return [];
    const risks: string[] = [];
    if (r.sqftRatio > 1.10) risks.push(`Asking ${((r.sqftRatio - 1) * 100).toFixed(1)}% above community average — premium baked in.`);
    if (r.netYield < 0.05) risks.push(`Net yield (${PCT(r.netYield)}) below Dubai average — appreciation thesis must do the work.`);
    if (r.chargesPerSqft > 22) risks.push(`High service charges (AED ${r.chargesPerSqft}/sqft) drag net yield meaningfully.`);
    if (r.verdict === 'SKIP') risks.push(`Aggregate score (${r.total.toFixed(0)}) is below the conviction threshold.`);
    if (risks.length === 0) risks.push('No major risks flagged for this query.');
    return risks;
  }

  function renderSparkBars(scores: number[]) {
    const w = 320, h = 64, pad = 4, n = scores.length, gap = 6;
    const bw = (w - pad * 2 - gap * (n - 1)) / n;
    const max = 100;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        {scores.map((v, i) => {
          const x = pad + i * (bw + gap);
          const bh = (v / max) * (h - pad * 2);
          const y = h - pad - bh;
          return <rect key={i} x={x} y={y} width={bw} height={bh} fill="#c4f542" rx="2" />;
        })}
      </svg>
    );
  }

  function renderRadar() {
    if (!r) return null;
    const data = { Yield: r.yieldScore, Comp: r.compScore, Thesis: r.thesisScore, Risk: r.riskScore };
    const labels = Object.keys(data);
    const vals = Object.values(data);
    const cx = 140, cy = 140, R = 100, n = labels.length;
    const rings = [] as { points: string }[];
    for (let r0 = 0.25; r0 <= 1.0001; r0 += 0.25) {
      const pts = labels.map((_, i) => {
        const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
        return cx + Math.cos(a) * R * r0 + ',' + (cy + Math.sin(a) * R * r0);
      }).join(' ');
      rings.push({ points: pts });
    }
    const dataPts = vals.map((v, i) => {
      const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
      const r0 = (v / 100) * R;
      return cx + Math.cos(a) * r0 + ',' + (cy + Math.sin(a) * r0);
    }).join(' ');
    return (
      <svg viewBox="0 0 280 280">
        {rings.map((rg, i) => <polygon key={i} points={rg.points} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.18" />)}
        {labels.map((_, i) => {
          const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
          return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * R} y2={cy + Math.sin(a) * R} stroke="currentColor" strokeWidth="1" opacity="0.18" />;
        })}
        <polygon points={dataPts} fill="rgba(196,245,66,0.3)" stroke="#c4f542" strokeWidth="2" />
        {labels.map((l, i) => {
          const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
          const x = cx + Math.cos(a) * (R + 18);
          const y = cy + Math.sin(a) * (R + 18);
          return <text key={i} x={x} y={y} fontFamily="Geist Mono, monospace" fontSize="10" fill="currentColor" textAnchor="middle" dominantBaseline="middle" opacity="0.7">{l.toUpperCase()}</text>;
        })}
      </svg>
    );
  }

  return (
    <>
      <div className="container">
        <section className="tool-banner">
          <div className="tool-banner-crumbs"><a href="/">Tools</a><span className="sep">/</span><span>Investment</span><span className="sep">/</span><span>Property Fit</span></div>
          <div className="tool-banner-grid">
            <div className="tool-banner-left">
              <div className="tool-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className="tool-banner-info">
                <h1>Property Fit</h1>
                <div className="b-sub">Bayut · PropertyFinder · Developer Brochure Analyzer</div>
                <div className="b-cap">Buy / Watch / Skip verdict · DLD comps · Thesis-weighted</div>
                <div className="tool-banner-actions">
                  <button type="button" className="btn-mini btn-edit" onClick={() => setDrawerOpen(true)}>+ Edit Inputs</button>
                  <button type="button" className="btn-mini">★ Save</button>
                  <button type="button" className="btn-mini">Share</button>
                </div>
              </div>
            </div>
            <div className="tool-banner-right">
              <div className="b-meta-row">
                <span>{bDate}</span>
                <span className="live-mark">{r ? <><span />Live · just now</> : 'Awaiting inputs'}</span>
              </div>
              <div className="b-stats-row">
                <span className="b-stat-now" style={{ color: r ? r.verdictColor : undefined }}>{r ? r.verdict : '—'}</span>
                <span className="b-stat-target"><span className="pill-tgt">SCORE</span><span>{r ? ` ${r.total.toFixed(0)}/100` : ' — /100'}</span></span>
                <span className={`b-stat-delta${r && delta < 0 ? ' down' : ''}`}>{r ? `${delta >= 0 ? '+' : ''}${delta.toFixed(0)} vs BUY` : '—'}</span>
              </div>
              <div className="b-spark">{r && renderSparkBars([r.yieldScore, r.compScore, r.thesisScore, r.riskScore])}</div>
              <div className="b-trend-row">
                <span className="trend">Yield <strong>{r ? r.yieldScore.toFixed(0) : '—'}</strong></span>
                <span className="trend">Comp <strong>{r ? r.compScore.toFixed(0) : '—'}</strong></span>
                <span className="trend">Risk <strong>{r ? r.riskScore.toFixed(0) : '—'}</strong></span>
              </div>
            </div>
          </div>
          <div className="tool-banner-bottom">
            {r ? (
              <>
                <span className="query-chip"><span className="qk">TYPE</span><span className="qv">{cap(r.type)}</span></span>
                <span className="query-chip"><span className="qk">BEDS</span><span className="qv">{r.beds === 0 ? 'Studio' : r.beds + ' BR'}</span></span>
                <span className="query-chip"><span className="qk">COMMUNITY</span><span className="qv">{r.communityLabel}</span></span>
                <span className="query-chip"><span className="qk">AREA</span><span className="qv">{r.area} sqft</span></span>
                <span className="query-chip"><span className="qk">PRICE</span><span className="qv">{AED(r.price)}</span></span>
                <span className="query-chip"><span className="qk">SVC</span><span className="qv">{r.chargesPerSqft}/sqft</span></span>
                <span className="query-chip"><span className="qk">THESIS</span><span className="qv">{cap(r.thesis)}</span></span>
              </>
            ) : (
              <span className="query-chip-empty">No query yet — fill in your inputs to get started.</span>
            )}
          </div>
        </section>

        <section className={`form-drawer${drawerOpen ? ' open' : ''}`}>
          <div className="head">
            <h3>Property Inputs</h3>
            <button type="button" className="close-btn" onClick={() => setDrawerOpen(false)} aria-label="Close">&times;</button>
          </div>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-drawer-grid">
              <div className="field full">
                <label>Listing URL (optional)</label>
                <input type="url" value={listingUrl} onChange={(e) => setListingUrl(e.target.value)} onBlur={() => {
                  const inferred = inferCommunityFromUrl(listingUrl);
                  if (inferred) setCommunity(inferred);
                }} placeholder="bayut.com/property/... or propertyfinder.ae/..." />
              </div>
              <div className="field">
                <label>Property Type</label>
                <select value={propType} onChange={(e) => setPropType(e.target.value)}>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="studio">Studio</option>
                </select>
              </div>
              <div className="field">
                <label>Bedrooms</label>
                <select value={beds} onChange={(e) => setBeds(e.target.value)}>
                  <option value="0">Studio</option>
                  <option value="1">1 BR</option>
                  <option value="2">2 BR</option>
                  <option value="3">3 BR</option>
                  <option value="4">4 BR</option>
                  <option value="5">5+ BR</option>
                </select>
              </div>
              <div className="field full">
                <label>Community</label>
                <select value={community} onChange={(e) => setCommunity(e.target.value)}>
                  {COMMUNITIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="field"><label>Area (sqft)</label><input type="number" value={area} onChange={(e) => setArea(e.target.value)} min={200} /></div>
              <div className="field"><label>Asking Price (AED)</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min={100000} /></div>
              <div className="field"><label>Service Charges (AED/sqft)</label><input type="number" value={charges} onChange={(e) => setCharges(e.target.value)} min={0} step={0.5} /></div>
              <div className="field">
                <label>Investment Thesis</label>
                <select value={thesis} onChange={(e) => setThesis(e.target.value)}>
                  <option value="yield">Net Yield</option>
                  <option value="appreciation">Capital Appreciation</option>
                  <option value="residence">Primary Residence</option>
                  <option value="str">Vacation / STR</option>
                </select>
              </div>
              <div className="field full">
                <button className="run-btn" type="submit">Get Alpha&apos;s Verdict &rarr;</button>
              </div>
            </div>
          </form>
        </section>

        {r && (
          <section className="tool-results-grid" style={{ display: 'grid' }}>
            <div>
              <div className="detail-panel">
                <div>
                  <h2>{r.beds === 0 ? 'Studio' : r.beds + 'BR'} in {r.communityLabel}</h2>
                  <div className="summary">
                    Alpha&apos;s verdict: <strong style={{ color: r.verdictColor }}>{r.verdict}</strong> with <strong>{r.total.toFixed(0)}/100</strong> conviction. Estimated net yield <strong>{PCT(r.netYield)}</strong> at <strong>{AED(r.sqftPrice)}/sqft</strong> (community avg {AED(r.commSqft)}/sqft).
                  </div>
                </div>
                <div className="signal-block">
                  <h3>Rewards</h3>
                  <div>
                    {buildRewards().map((t, i) => (
                      <div key={i} className="signal-row">
                        <div className="signal-icon good">✓</div>
                        <div className="signal-text">{t}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="signal-block">
                  <h3>Risks to Watch</h3>
                  <div>
                    {buildRisks().map((t, i) => {
                      const kind = r.verdict === 'SKIP' ? 'bad' : 'warn';
                      const icon = kind === 'bad' ? '✕' : '!';
                      return (
                        <div key={i} className="signal-row">
                          <div className={`signal-icon ${kind}`}>{icon}</div>
                          <div className="signal-text">{t}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="signal-block">
                  <h3>Comparable Transactions (DLD)</h3>
                  <table className="comp-table">
                    <thead><tr><th>Tower / Unit</th><th>Sold</th><th>Price (AED)</th><th>AED/sqft</th></tr></thead>
                    <tbody>
                      {r.comps.map((c, i) => (
                        <tr key={i}><td>{c.unit}</td><td>{c.sold}</td><td>{AED(c.price)}</td><td>{Math.round(c.sqftP).toLocaleString()}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div>
              <div className="chart-panel">
                <div className="chart-panel-head">
                  <h3>Snowflake Analysis</h3>
                  <span className="pill-tag">SCORE</span>
                </div>
                <div className="chart-radar">{renderRadar()}</div>
                <div className="chart-summary">
                  <h4>{r.verdict} · {r.total.toFixed(0)}/100</h4>
                  <p>
                    {r.verdict === 'BUY' ? 'Strong fit across all four dimensions.' : r.verdict === 'WATCH' ? 'Mixed signals — negotiate price or wait.' : "The math doesn't work for this thesis."} <strong>{cap(r.thesis)}</strong> weighting applied.
                  </p>
                </div>
                <div className="chart-actions">
                  <button type="button" className="btn-mini">Data</button>
                  <button type="button" className="btn-mini">Learn</button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <section className="how-section" style={{ marginTop: 100 }}>
        <div className="container">
          <SectionHead title="How" titleAccent="Property Fit" titleAfter="works." sub="Four scores, weighted to your thesis. The verdict is whichever bucket the weighted total lands in — backed by real DLD comps." />
          <div className="how-grid">
            <div className="how-card"><div className="how-num">01</div><h3>Score the unit</h3><p>Yield, comp pricing, thesis match and risk are each scored 0–100 based on community averages, DLD transactions and RERA service-charge data.</p></div>
            <div className="how-card"><div className="how-num">02</div><h3>Weight to thesis</h3><p>Yield buyers get yield-weighted scoring. Appreciation buyers get comp + community trajectory weighted. The weighting reflects what matters for your goal.</p></div>
            <div className="how-card"><div className="how-num">03</div><h3>Return verdict</h3><p>Above 75 = BUY. 55–75 = WATCH. Below 55 = SKIP. Comparable units in the same community surface so you can sense-check the call.</p></div>
          </div>
        </div>
      </section>

      <ToolPageStyles />
    </>
  );
}
