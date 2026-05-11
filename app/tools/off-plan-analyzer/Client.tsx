'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionHead } from '@/components/Hero';
import { ToolPageStyles } from '../_components/styles';

type Developer = { value: string; label: string; strength: number; uplift: number };
type Community = { value: string; label: string; loc: number; app: number; sqft: number };

const DEVELOPERS: Developer[] = [
  { value: 'emaar', label: 'Emaar Properties', strength: 95, uplift: 0.32 },
  { value: 'sobha', label: 'Sobha Realty', strength: 92, uplift: 0.30 },
  { value: 'omniyat', label: 'Omniyat', strength: 92, uplift: 0.34 },
  { value: 'meraas', label: 'Meraas', strength: 88, uplift: 0.31 },
  { value: 'aldar', label: 'Aldar Properties', strength: 88, uplift: 0.24 },
  { value: 'damac', label: 'Damac Properties', strength: 85, uplift: 0.28 },
  { value: 'nakheel', label: 'Nakheel', strength: 82, uplift: 0.26 },
  { value: 'select-group', label: 'Select Group', strength: 80, uplift: 0.27 },
  { value: 'ellington', label: 'Ellington Properties', strength: 78, uplift: 0.23 },
  { value: 'dubai-properties', label: 'Dubai Properties', strength: 78, uplift: 0.22 },
  { value: 'binghatti', label: 'Binghatti', strength: 75, uplift: 0.25 },
  { value: 'bloom', label: 'Bloom Holding', strength: 75, uplift: 0.22 },
  { value: 'arada', label: 'Arada', strength: 75, uplift: 0.24 },
  { value: 'mag', label: 'MAG Property Development', strength: 70, uplift: 0.20 },
  { value: 'azizi', label: 'Azizi Developments', strength: 60, uplift: 0.18 },
];

const COMMUNITIES: Community[] = [
  { value: 'downtown', label: 'Downtown Dubai', loc: 95, app: 0.068, sqft: 2700 },
  { value: 'difc', label: 'DIFC', loc: 95, app: 0.075, sqft: 3000 },
  { value: 'palm-jumeirah', label: 'Palm Jumeirah', loc: 92, app: 0.082, sqft: 3800 },
  { value: 'dubai-marina', label: 'Dubai Marina', loc: 90, app: 0.072, sqft: 2300 },
  { value: 'emaar-beachfront', label: 'Emaar Beachfront', loc: 88, app: 0.095, sqft: 3200 },
  { value: 'bluewaters', label: 'Bluewaters Island', loc: 88, app: 0.080, sqft: 3400 },
  { value: 'city-walk', label: 'City Walk', loc: 87, app: 0.075, sqft: 2900 },
  { value: 'jbr', label: 'JBR', loc: 87, app: 0.060, sqft: 2200 },
  { value: 'business-bay', label: 'Business Bay', loc: 85, app: 0.075, sqft: 1900 },
  { value: 'dubai-creek-harbour', label: 'Dubai Creek Harbour', loc: 82, app: 0.080, sqft: 2400 },
  { value: 'sobha-hartland', label: 'Sobha Hartland', loc: 80, app: 0.080, sqft: 2000 },
  { value: 'dubai-hills', label: 'Dubai Hills Estate', loc: 78, app: 0.078, sqft: 2100 },
  { value: 'mina-rashid', label: 'Mina Rashid', loc: 78, app: 0.075, sqft: 2200 },
  { value: 'mbr-city', label: 'MBR City', loc: 75, app: 0.075, sqft: 2000 },
  { value: 'jlt', label: 'JLT', loc: 75, app: 0.060, sqft: 1500 },
  { value: 'arabian-ranches', label: 'Arabian Ranches', loc: 70, app: 0.062, sqft: 1600 },
  { value: 'tilal-al-ghaf', label: 'Tilal Al Ghaf', loc: 68, app: 0.085, sqft: 1700 },
  { value: 'damac-lagoons', label: 'Damac Lagoons', loc: 65, app: 0.092, sqft: 1700 },
  { value: 'jvc', label: 'JVC', loc: 60, app: 0.085, sqft: 1100 },
  { value: 'dubai-south', label: 'Dubai South', loc: 55, app: 0.068, sqft: 900 },
  { value: 'town-square', label: 'Town Square', loc: 55, app: 0.072, sqft: 950 },
];

const AED = (n: number) => 'AED ' + Math.round(n).toLocaleString('en-US');
const PCT = (n: number) => (n * 100).toFixed(1) + '%';
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type Pillar = { key: string; name: string; short: string; score: number };

type ResultData = {
  pillars: Pillar[];
  overall: number;
  verdict: 'BUY' | 'WATCH' | 'SKIP';
  verdictColor: string;
  developer: string;
  devUplift: number;
  project: string;
  communityLabel: string;
  type: string;
  beds: number;
  price: number;
  sqftPrice: number;
  commSqft: number;
  sqftRatio: number;
  commApp: number;
  downPct: number;
  constrPct: number;
  phpPct: number;
  phpYears: number;
  upfrontPct: number;
  handover: Date;
};

function defaultHandover(): string {
  const today = new Date();
  return new Date(today.getFullYear() + 2, today.getMonth(), today.getDate()).toISOString().slice(0, 10);
}

export default function OffPlanAnalyzerClient() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [developer, setDeveloper] = useState('emaar');
  const [project, setProject] = useState('Beach Vista Phase 4');
  const [community, setCommunity] = useState('downtown');
  const [propType, setPropType] = useState('apartment');
  const [beds, setBeds] = useState('2');
  const [area, setArea] = useState('1300');
  const [price, setPrice] = useState('2700000');
  const [handover, setHandover] = useState('');
  const [downPct, setDownPct] = useState('20');
  const [constrPct, setConstrPct] = useState('40');
  const [phpPct, setPhpPct] = useState('40');
  const [phpYears, setPhpYears] = useState('3');
  const [result, setResult] = useState<ResultData | null>(null);
  const [bDate, setBDate] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    setBDate(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    setHandover(defaultHandover());
  }, []);

  // URL query-string param prefill
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const p = new URLSearchParams(window.location.search);
    const setIf = (key: string, setter: (v: string) => void) => {
      const v = p.get(key);
      if (v != null) setter(v);
    };
    setIf('dev', setDeveloper);
    setIf('project', setProject);
    setIf('community', setCommunity);
    setIf('type', setPropType);
    setIf('beds', setBeds);
    setIf('area', setArea);
    setIf('price', setPrice);
    setIf('handover', setHandover);
    setIf('down', setDownPct);
    setIf('constr', setConstrPct);
    setIf('php', setPhpPct);
    setIf('phpYears', setPhpYears);
    if (p.get('auto') === '1') {
      setTimeout(() => {
        formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }, 200);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const dev = DEVELOPERS.find((d) => d.value === developer)!;
    const com = COMMUNITIES.find((c) => c.value === community)!;
    const beds_ = parseInt(beds);
    const area_ = parseFloat(area) || 1000;
    const price_ = parseFloat(price) || 0;
    const downPct_ = parseFloat(downPct) || 20;
    const constrPct_ = parseFloat(constrPct) || 40;
    const phpPct_ = parseFloat(phpPct) || 0;
    const phpYears_ = parseFloat(phpYears) || 0;

    if (!price_) {
      alert('Enter the asking price.');
      return;
    }
    const totalPlan = downPct_ + constrPct_ + phpPct_;
    if (Math.abs(totalPlan - 100) > 2) {
      if (!confirm(`Payment plan totals ${totalPlan}%, not 100%. Continue anyway?`)) return;
    }

    const sqftPrice = price_ / area_;
    const sqftRatio = sqftPrice / com.sqft;

    const locationScore = clamp(com.loc, 0, 100);
    const developerScore = clamp(dev.strength, 0, 100);
    let comparisonScore = 70 - (sqftRatio - 1) * 90 + com.app * 200;
    comparisonScore = clamp(comparisonScore, 0, 100);
    const upfrontPct = downPct_ + constrPct_;
    let paymentScore = 110 - upfrontPct * 1.0;
    if (phpYears_ >= 3) paymentScore += 12;
    if (phpYears_ >= 5) paymentScore += 8;
    if (downPct_ <= 10) paymentScore += 8;
    paymentScore = clamp(paymentScore, 0, 100);
    let valueScore = 110 - sqftRatio * 80;
    valueScore = clamp(valueScore, 0, 100);

    const pillars: Pillar[] = [
      { key: 'location', name: 'Location', short: 'LOC', score: locationScore },
      { key: 'developer', name: 'Developer', short: 'DEV', score: developerScore },
      { key: 'comparison', name: 'Comparison', short: 'COMP', score: comparisonScore },
      { key: 'payment', name: 'Payment Plan', short: 'PMT', score: paymentScore },
      { key: 'value', name: 'Price/Sqft', short: 'VAL', score: valueScore },
    ];

    const overall = pillars.reduce((s, p) => s + p.score, 0) / pillars.length;
    const verdict: 'BUY' | 'WATCH' | 'SKIP' = overall >= 75 ? 'BUY' : overall >= 55 ? 'WATCH' : 'SKIP';
    const verdictColor = verdict === 'BUY' ? 'var(--accent)' : verdict === 'WATCH' ? '#ffc83c' : 'var(--warn)';

    setResult({
      pillars,
      overall,
      verdict,
      verdictColor,
      developer: dev.label,
      devUplift: dev.uplift,
      project,
      communityLabel: com.label,
      type: propType,
      beds: beds_,
      price: price_,
      sqftPrice,
      commSqft: com.sqft,
      sqftRatio,
      commApp: com.app,
      downPct: downPct_,
      constrPct: constrPct_,
      phpPct: phpPct_,
      phpYears: phpYears_,
      upfrontPct,
      handover: new Date(handover),
    });
    setDrawerOpen(false);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  }

  const r = result;
  const delta = r ? r.overall - 75 : 0;

  function strongestWeakest(pillars: Pillar[]) {
    const sorted = pillars.slice().sort((a, b) => b.score - a.score);
    const best = sorted[0];
    const worst = sorted[sorted.length - 1];
    return (
      <>
        Strongest pillar: <strong style={{ color: 'var(--accent)' }}>{best.name} ({best.score.toFixed(0)})</strong>. Weakest:{' '}
        <strong style={{ color: worst.score < 50 ? 'var(--warn)' : '#ffc83c' }}>
          {worst.name} ({worst.score.toFixed(0)})
        </strong>
        .
      </>
    );
  }

  function pillarReason(p: Pillar): string {
    if (!r) return '';
    if (p.key === 'location') {
      return p.score >= 85 ? `${r.communityLabel} — Tier-1 Dubai address.` : `${r.communityLabel} — proximity to CBD/beach/metro factored.`;
    }
    if (p.key === 'developer') return `${r.developer} — brand strength + delivery track record.`;
    if (p.key === 'comparison') {
      return r.sqftRatio < 0.95
        ? `Below community avg by ${((1 - r.sqftRatio) * 100).toFixed(1)}%.`
        : r.sqftRatio > 1.10
        ? `Above community avg by ${((r.sqftRatio - 1) * 100).toFixed(1)}%.`
        : `In line with community comps.`;
    }
    if (p.key === 'payment') {
      return `${r.downPct}/${r.constrPct}/${r.phpPct}${r.phpYears > 0 ? ' · ' + r.phpYears + 'yr PHP' : ''} — ${r.downPct + r.constrPct <= 50 ? 'high leverage retained.' : 'capital-heavy upfront.'}`;
    }
    if (p.key === 'value') {
      return `AED ${Math.round(r.sqftPrice).toLocaleString()}/sqft vs community avg ${Math.round(r.commSqft).toLocaleString()}.`;
    }
    return '';
  }

  function buildRewards(): string[] {
    if (!r) return [];
    const rewards: string[] = [];
    const loc = r.pillars.find((p) => p.key === 'location')!.score;
    const dev = r.pillars.find((p) => p.key === 'developer')!.score;
    const pay = r.pillars.find((p) => p.key === 'payment')!.score;
    if (loc >= 85) rewards.push(`${r.communityLabel} is a Tier-1 Dubai location — the address itself defends value through cycles.`);
    if (dev >= 88) rewards.push(`${r.developer} is a top-tier Dubai developer with a strong delivery track record (~${(r.devUplift * 100).toFixed(0)}% historic launch-to-handover uplift).`);
    if (r.sqftRatio < 0.95) rewards.push(`Asking AED ${Math.round(r.sqftPrice).toLocaleString()}/sqft is ${((1 - r.sqftRatio) * 100).toFixed(1)}% below ${r.communityLabel} average — an entry-price edge.`);
    if (pay >= 75) rewards.push(`Payment plan (${r.downPct}/${r.constrPct}/${r.phpPct} with ${r.phpYears}-yr PHP) preserves capital and lets you ride the appreciation curve.`);
    if (r.commApp >= 0.08) rewards.push(`${r.communityLabel} appreciation has averaged ${PCT(r.commApp)}/yr — well above the Dubai freehold mean.`);
    if (rewards.length === 0) rewards.push(`No standout reward signals — verdict driven by other pillars.`);
    return rewards;
  }

  function buildRisks(): string[] {
    if (!r) return [];
    const risks: string[] = [];
    const loc = r.pillars.find((p) => p.key === 'location')!.score;
    const dev = r.pillars.find((p) => p.key === 'developer')!.score;
    if (loc < 65) risks.push(`${r.communityLabel} ranks lower on location score — appreciation depends on a single thesis (e.g., infrastructure or community maturity).`);
    if (dev < 75) risks.push(`${r.developer} carries execution risk relative to Tier-1 names — factor a 5–10% delivery risk premium.`);
    if (r.sqftRatio > 1.10) risks.push(`Asking is ${((r.sqftRatio - 1) * 100).toFixed(1)}% above ${r.communityLabel} average — there's a launch premium baked in that may not hold.`);
    if (r.upfrontPct > 70) risks.push(`${r.upfrontPct}% of price due before handover — that's heavy capital deployment with limited flexibility.`);
    if (r.phpYears < 2) risks.push(`Short or no post-handover plan — limits hold flexibility through the appreciation peak.`);
    if (r.verdict === 'SKIP') risks.push(`Aggregate snowflake (${r.overall.toFixed(0)}/100) is below the conviction threshold.`);
    if (risks.length === 0) risks.push(`No major risks flagged.`);
    return risks;
  }

  function renderRadar(pillars: Pillar[]) {
    const labels = pillars.map((p) => p.short);
    const vals = pillars.map((p) => p.score);
    const cx = 160, cy = 160, R = 110, n = labels.length;
    const rings: { points: string }[] = [];
    for (let r0 = 0.25; r0 <= 1.0001; r0 += 0.25) {
      const pts = labels.map((_, i) => {
        const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
        return cx + Math.cos(a) * R * r0 + ',' + (cy + Math.sin(a) * R * r0);
      }).join(' ');
      rings.push({ points: pts });
    }
    const axes = labels.map((_, i) => {
      const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
      return { x2: cx + Math.cos(a) * R, y2: cy + Math.sin(a) * R };
    });
    const pts = vals.map((v, i) => {
      const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
      const r0 = (v / 100) * R;
      return [cx + Math.cos(a) * r0, cy + Math.sin(a) * r0];
    });
    let blob = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length; i++) {
      const p0 = pts[i];
      const p1 = pts[(i + 1) % pts.length];
      const mx = (p0[0] + p1[0]) / 2;
      const my = (p0[1] + p1[1]) / 2;
      blob += ` Q${p0[0].toFixed(1)},${p0[1].toFixed(1)} ${mx.toFixed(1)},${my.toFixed(1)}`;
    }
    blob += ' Z';
    const fullLabels: Record<string, string> = { LOC: 'LOCATION', DEV: 'DEVELOPER', COMP: 'COMPARISON', PMT: 'PAYMENT', VAL: 'VALUE' };
    return (
      <svg viewBox="0 0 320 320">
        {rings.map((r0, i) => (
          <polygon key={i} points={r0.points} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.18" />
        ))}
        {axes.map((a, i) => (
          <line key={i} x1={cx} y1={cy} x2={a.x2} y2={a.y2} stroke="currentColor" strokeWidth="1" opacity="0.18" />
        ))}
        <path d={blob} fill="rgba(196,245,66,0.4)" stroke="#c4f542" strokeWidth="2" strokeLinejoin="round" />
        {labels.map((l, i) => {
          const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
          const x = cx + Math.cos(a) * (R + 22);
          const y = cy + Math.sin(a) * (R + 22);
          return (
            <text key={i} x={x} y={y} fontFamily="Geist Mono, monospace" fontSize="10" fill="currentColor" textAnchor="middle" dominantBaseline="middle" opacity="0.7" letterSpacing="1">
              {fullLabels[l] || l}
            </text>
          );
        })}
      </svg>
    );
  }

  function renderSparkBars(scores: number[]) {
    const w = 320, h = 64, pad = 4, n = scores.length, gap = 8;
    const bw = (w - pad * 2 - gap * (n - 1)) / n;
    const max = 100;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        {scores.map((v, i) => {
          const x = pad + i * (bw + gap);
          const bh = (v / max) * (h - pad * 2);
          const y = h - pad - bh;
          const color = v >= 70 ? '#c4f542' : v >= 50 ? '#ffc83c' : '#ff6b6b';
          return <rect key={i} x={x} y={y} width={bw} height={bh} fill={color} rx="2" />;
        })}
      </svg>
    );
  }

  return (
    <>
      <div className="container">
        <section className="tool-banner">
          <div className="tool-banner-crumbs">
            <a href="/">Tools</a>
            <span className="sep">/</span>
            <span>Off-Plan</span>
            <span className="sep">/</span>
            <span>Off-Plan Analyzer</span>
          </div>
          <div className="tool-banner-grid">
            <div className="tool-banner-left">
              <div className="tool-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                  <polyline points="12 22 12 12" />
                  <polyline points="22 8.5 12 12 2 8.5" />
                </svg>
              </div>
              <div className="tool-banner-info">
                <h1>Off-Plan Analyzer</h1>
                <div className="b-sub">Snowflake Analysis · 5-Pillar Scoring</div>
                <div className="b-cap">Location · Developer · Comparison · Payment Plan · Value</div>
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
                <span className="b-stat-target"><span className="pill-tgt">SCORE</span><span>{r ? ` ${r.overall.toFixed(0)}/100` : ' — /100'}</span></span>
                <span className={`b-stat-delta${r && delta < 0 ? ' down' : ''}`}>{r ? `${delta >= 0 ? '+' : ''}${delta.toFixed(0)} vs BUY` : '—'}</span>
              </div>
              <div className="b-spark">{r && renderSparkBars(r.pillars.map((p) => p.score))}</div>
              <div className="b-trend-row">
                <span className="trend">Loc <strong>{r ? r.pillars[0].score.toFixed(0) : '—'}</strong></span>
                <span className="trend">Dev <strong>{r ? r.pillars[1].score.toFixed(0) : '—'}</strong></span>
                <span className="trend">Comp <strong>{r ? r.pillars[2].score.toFixed(0) : '—'}</strong></span>
                <span className="trend">Pmt <strong>{r ? r.pillars[3].score.toFixed(0) : '—'}</strong></span>
                <span className="trend">Val <strong>{r ? r.pillars[4].score.toFixed(0) : '—'}</strong></span>
              </div>
            </div>
          </div>
          <div className="tool-banner-bottom">
            {r ? (
              <>
                <span className="query-chip"><span className="qk">DEVELOPER</span><span className="qv">{r.developer}</span></span>
                <span className="query-chip"><span className="qk">PROJECT</span><span className="qv">{r.project}</span></span>
                <span className="query-chip"><span className="qk">COMMUNITY</span><span className="qv">{r.communityLabel}</span></span>
                <span className="query-chip"><span className="qk">TYPE</span><span className="qv">{r.beds === 0 ? 'Studio' : r.beds + 'BR ' + cap(r.type)}</span></span>
                <span className="query-chip"><span className="qk">PRICE</span><span className="qv">{AED(r.price)}</span></span>
                <span className="query-chip"><span className="qk">AED/SQFT</span><span className="qv">{Math.round(r.sqftPrice).toLocaleString()}</span></span>
                <span className="query-chip"><span className="qk">PAYMENT</span><span className="qv">{r.downPct}/{r.constrPct}/{r.phpPct}{r.phpYears > 0 ? ' · ' + r.phpYears + 'yr PHP' : ''}</span></span>
                <span className="query-chip"><span className="qk">HANDOVER</span><span className="qv">{r.handover.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span></span>
              </>
            ) : (
              <span className="query-chip-empty">No query yet — fill in your off-plan unit details to get started.</span>
            )}
          </div>
        </section>

        <section className={`form-drawer${drawerOpen ? ' open' : ''}`}>
          <div className="head">
            <h3>Off-Plan Unit Inputs</h3>
            <button type="button" className="close-btn" onClick={() => setDrawerOpen(false)} aria-label="Close">&times;</button>
          </div>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-drawer-grid">
              <div className="field">
                <label>Developer</label>
                <select value={developer} onChange={(e) => setDeveloper(e.target.value)}>
                  {DEVELOPERS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Project Name</label>
                <input type="text" value={project} onChange={(e) => setProject(e.target.value)} />
              </div>
              <div className="field full">
                <label>Community</label>
                <select value={community} onChange={(e) => setCommunity(e.target.value)}>
                  {COMMUNITIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
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
              <div className="field"><label>Area (sqft)</label><input type="number" value={area} onChange={(e) => setArea(e.target.value)} min={200} /></div>
              <div className="field"><label>Asking Price (AED)</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min={100000} /></div>
              <div className="field"><label>Handover Date</label><input type="date" value={handover} onChange={(e) => setHandover(e.target.value)} /></div>
              <div className="field"><label>Down Payment (%)</label><input type="number" value={downPct} onChange={(e) => setDownPct(e.target.value)} min={5} max={100} /></div>
              <div className="field"><label>During Construction (%)</label><input type="number" value={constrPct} onChange={(e) => setConstrPct(e.target.value)} min={0} max={95} /></div>
              <div className="field"><label>Post-Handover (%)</label><input type="number" value={phpPct} onChange={(e) => setPhpPct(e.target.value)} min={0} max={80} /></div>
              <div className="field"><label>Post-Handover Plan (years)</label><input type="number" value={phpYears} onChange={(e) => setPhpYears(e.target.value)} min={0} max={10} /></div>
              <div className="field full">
                <button className="run-btn" type="submit">Run Snowflake Analysis &rarr;</button>
              </div>
            </div>
          </form>
        </section>

        {r && (
          <section className="tool-results-grid" style={{ display: 'grid' }}>
            <div>
              <div className="detail-panel">
                <div>
                  <h2>{r.project} · {r.communityLabel}</h2>
                  <div className="summary">
                    Snowflake says <strong style={{ color: r.verdictColor }}>{r.verdict}</strong> with <strong>{r.overall.toFixed(0)}/100</strong> conviction. {strongestWeakest(r.pillars)}
                  </div>
                </div>
                <div className="signal-block">
                  <h3>The 5 Pillars</h3>
                  <div>
                    {r.pillars.map((p) => {
                      const cls = p.score >= 70 ? 'good' : p.score >= 50 ? 'warn' : 'bad';
                      const color = p.score >= 70 ? 'var(--accent)' : p.score >= 50 ? '#ffc83c' : 'var(--warn)';
                      return (
                        <div key={p.key} className="signal-row" style={{ alignItems: 'center' }}>
                          <div className={`signal-icon ${cls}`} style={{ width: 28, height: 28, fontSize: 11, fontFamily: 'Geist Mono, monospace' }}>{p.short}</div>
                          <div className="signal-text" style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'baseline' }}>
                              <strong>{p.name}</strong>
                              <span style={{ fontFamily: 'Geist Mono, monospace', color }}>{p.score.toFixed(0)}/100</span>
                            </div>
                            <div style={{ background: 'var(--bg)', borderRadius: 999, height: 5, overflow: 'hidden', border: '1px solid var(--line)' }}>
                              <div style={{ height: '100%', width: `${p.score}%`, background: color, borderRadius: 999, transition: 'width 0.6s ease' }} />
                            </div>
                            <small>{pillarReason(p)}</small>
                          </div>
                        </div>
                      );
                    })}
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
              </div>
            </div>
            <div>
              <div className="chart-panel">
                <div className="chart-panel-head">
                  <h3>Snowflake Analysis</h3>
                  <span className="pill-tag">5 PILLARS</span>
                </div>
                <div className="chart-radar">{renderRadar(r.pillars)}</div>
                <div className="chart-summary">
                  <h4>{r.verdict} · {r.overall.toFixed(0)}/100</h4>
                  <p>
                    {r.verdict === 'BUY'
                      ? 'Strong, balanced snowflake — all pillars carrying weight.'
                      : r.verdict === 'WATCH'
                      ? 'Mixed snowflake — some pillars weak. Negotiate price or adjust payment plan.'
                      : 'Weak snowflake — multiple pillars below threshold.'}{' '}
                    Tier-{r.pillars[1].score >= 88 ? '1' : r.pillars[1].score >= 78 ? '2' : '3'} developer in a Tier-{r.pillars[0].score >= 85 ? '1' : r.pillars[0].score >= 70 ? '2' : '3'} location.
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
          <SectionHead title="The" titleAccent="5 Pillars" titleAfter="." sub="Each pillar is scored 0–100 from real Dubai data — then combined into the snowflake. The bigger and more balanced the snowflake, the stronger the off-plan thesis." />
          <div className="how-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="how-card"><div className="how-num">01</div><h3>Location</h3><p>How premium is the address? Alpha scores by proximity to the CBD (DIFC, Downtown), the beach, the Metro, top schools and lifestyle anchors. Palm Jumeirah and DIFC top the chart; far-suburb communities rank lower because they depend on a single appreciation driver.</p></div>
            <div className="how-card"><div className="how-num">02</div><h3>Developer Strength</h3><p>Brand equity, on-time delivery rate, build quality and after-handover demand. Tier-1 names like Emaar, Sobha, Omniyat carry a premium that holds value in resale; weaker developers introduce execution risk that compresses peak uplift.</p></div>
            <div className="how-card"><div className="how-num">03</div><h3>Comparison</h3><p>How is the unit priced versus comparable launches and recent DLD transactions in the same community? A unit launching at 5–10% above comps is a yellow flag; 5–15% below comps is the entry investors should fight for.</p></div>
            <div className="how-card"><div className="how-num">04</div><h3>Payment Plan</h3><p>The structure of your capital deployment determines flip potential. A 20/40/40 plan with a 3+ year post-handover stretch lets you hold for the appreciation curve without exhausting capital. An 80/20 front-loaded plan kills the leverage math.</p></div>
            <div className="how-card" style={{ gridColumn: '1 / -1' }}><div className="how-num">05</div><h3>Price per Sqft</h3><p>The cleanest &quot;value&quot; signal. Alpha compares your AED/sqft to the community moving average and the last 6 launches in the same district. Below-average price-per-sqft on a Tier-1 developer is the cheat code most retail buyers miss.</p></div>
          </div>
        </div>
      </section>

      <ToolPageStyles />
    </>
  );
}
