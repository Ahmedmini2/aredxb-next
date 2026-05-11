'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionHead } from '@/components/Hero';
import { ToolPageStyles } from '../_components/styles';

type Community = { value: string; label: string; app: number };

const COMMUNITIES: Community[] = [
  { value: 'dubai-marina', label: 'Dubai Marina', app: 0.072 },
  { value: 'downtown', label: 'Downtown Dubai', app: 0.068 },
  { value: 'palm-jumeirah', label: 'Palm Jumeirah', app: 0.082 },
  { value: 'business-bay', label: 'Business Bay', app: 0.075 },
  { value: 'jvc', label: 'JVC', app: 0.085 },
  { value: 'dubai-hills', label: 'Dubai Hills Estate', app: 0.078 },
  { value: 'damac-lagoons', label: 'Damac Lagoons', app: 0.092 },
  { value: 'emaar-beachfront', label: 'Emaar Beachfront', app: 0.095 },
  { value: 'sobha-hartland', label: 'Sobha Hartland', app: 0.080 },
  { value: 'arabian-ranches', label: 'Arabian Ranches', app: 0.062 },
];

const AED = (n: number) => 'AED ' + Math.round(n).toLocaleString('en-US');
const PCT = (n: number) => (n * 100).toFixed(1) + '%';
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type Scenario = {
  key: 'flip' | 'refi' | 'hold';
  name: string;
  years: number;
  finalValue: number;
  totalReturn: number;
  irr: number;
  detail: string;
};

type Comp = { unit: string; sold: string; price: number; delta: number };

type ResultData = {
  best: Scenario;
  scenarios: Scenario[];
  netAnnual: number;
  appRate: number;
  hold: number;
  price: number;
  rent: number;
  charges: number;
  targetIrr: number;
  propType: string;
  communityLabel: string;
  community: string;
  valueAt: (y: number) => number;
  comps: Comp[];
};

function generateComps(community: string, _type: string, ref: number): Comp[] {
  const seedRand = (() => {
    let s = 0;
    for (let i = 0; i < community.length; i++) s = (s * 31 + community.charCodeAt(i)) | 0;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  })();
  const towers = ['Tower A', 'Tower B', 'The Residences', 'Park Heights', 'Marina Vista', 'Bay Square', 'Beach Vista', 'Aura'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return Array.from({ length: 5 }, () => {
    const t = towers[Math.floor(seedRand() * towers.length)];
    const beds = Math.floor(seedRand() * 3) + 1 + 'BR';
    const m = months[Math.floor(seedRand() * months.length)] + ' 26';
    const variance = 0.85 + seedRand() * 0.35;
    const p = ref * variance;
    const delta = -0.05 + seedRand() * 0.18;
    return { unit: `${t} · ${beds}`, sold: m, price: p, delta };
  });
}

export default function ExitStrategyClient() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [propType, setPropType] = useState('apartment');
  const [community, setCommunity] = useState('dubai-marina');
  const [price, setPrice] = useState('2700000');
  const [hold, setHold] = useState('5');
  const [rent, setRent] = useState('190000');
  const [charges, setCharges] = useState('24000');
  const [targetIrr, setTargetIrr] = useState('11');
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
    setIf('community', setCommunity);
    setIf('price', setPrice);
    setIf('hold', setHold);
    setIf('rent', setRent);
    setIf('charges', setCharges);
    setIf('targetIrr', setTargetIrr);
    if (p.get('auto') === '1') {
      setTimeout(() => {
        formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }, 200);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const com = COMMUNITIES.find((c) => c.value === community)!;
    const price_ = parseFloat(price) || 0;
    const hold_ = parseInt(hold) || 5;
    const rent_ = parseFloat(rent) || 0;
    const charges_ = parseFloat(charges) || 0;
    const target_ = parseFloat(targetIrr) || 10;
    if (!price_) {
      alert('Enter an acquisition price.');
      return;
    }
    const valueAt = (y: number) => price_ * Math.pow(1 + com.app, y);
    const netAnnual = rent_ - charges_;
    const cumulativeNet = (y: number) => netAnnual * y;

    function scenarioIRR(years: number) {
      const finalValue = valueAt(years);
      const totalReturn = finalValue - price_ + cumulativeNet(years);
      const irr = Math.pow((totalReturn + price_) / price_, 1 / years) - 1;
      return { years, finalValue, totalReturn, irr };
    }

    const flipS = scenarioIRR(1);
    const refiS = scenarioIRR(3);
    const refiUplift = valueAt(3) * 0.70 * 0.07 * (hold_ - 3);
    refiS.totalReturn += refiUplift;
    refiS.irr = Math.pow((refiS.totalReturn + price_) / price_, 1 / hold_) - 1;
    const holdS = scenarioIRR(hold_);

    const scenarios: Scenario[] = [
      { key: 'flip', name: 'Flip at Y1', ...flipS, detail: 'Sell after 1 year' },
      { key: 'refi', name: 'Refinance Y3', ...refiS, detail: 'Release equity Y3, redeploy' },
      { key: 'hold', name: `Hold to Y${hold_}`, ...holdS, detail: 'Cash flow + appreciation' },
    ];
    const best = scenarios.slice().sort((a, b) => b.irr - a.irr)[0];

    setResult({
      best,
      scenarios,
      netAnnual,
      appRate: com.app,
      hold: hold_,
      price: price_,
      rent: rent_,
      charges: charges_,
      targetIrr: target_,
      propType,
      communityLabel: com.label,
      community: com.value,
      valueAt,
      comps: generateComps(com.label, propType, price_),
    });
    setDrawerOpen(false);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  }

  const r = result;

  function buildRewards(): string[] {
    if (!r) return [];
    const rewards: string[] = [];
    if (r.best.irr * 100 >= r.targetIrr) rewards.push(`${r.best.name} clears your IRR target by ${(r.best.irr * 100 - r.targetIrr).toFixed(1)} percentage points.`);
    if (r.appRate >= 0.07) rewards.push(`${r.communityLabel} community appreciation (${PCT(r.appRate)}/yr) outperforms the Dubai average.`);
    rewards.push(`Net rental yield of ${PCT(r.netAnnual / r.price)} compounds meaningfully over the hold period.`);
    rewards.push(`Projected sale value at Y${r.hold}: ${AED(r.valueAt(r.hold))} — ${PCT((r.valueAt(r.hold) - r.price) / r.price)} above acquisition.`);
    return rewards;
  }

  function buildRisks(): string[] {
    if (!r) return [];
    const risks: string[] = [];
    if (r.best.irr * 100 < r.targetIrr) risks.push(`No scenario clears your ${r.targetIrr}% IRR target — revisit acquisition price or community.`);
    if (r.charges / Math.max(1, r.rent) > 0.15) risks.push(`Service charges (${AED(r.charges)}) eat ${((r.charges / Math.max(1, r.rent)) * 100).toFixed(0)}% of gross rent.`);
    if (r.appRate < 0.065) risks.push(`${r.communityLabel} appreciation (${PCT(r.appRate)}) trails Dubai average — appreciation thesis is weaker here.`);
    if (risks.length === 0) risks.push('No major risks flagged for this query.');
    return risks;
  }

  function renderSpark() {
    if (!r) return null;
    const w = 320, h = 64, pad = 4;
    const points: [number, number, number][] = [];
    for (let y = 0; y <= r.hold; y++) {
      const x = pad + (y / r.hold) * (w - pad * 2);
      points.push([x, r.valueAt(y), y]);
    }
    const minV = Math.min(...points.map((p) => p[1]));
    const maxV = Math.max(...points.map((p) => p[1]));
    const ys = points.map((p) => h - pad - ((p[1] - minV) / (maxV - minV || 1)) * (h - pad * 2));
    const path = points.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + ys[i].toFixed(1)).join(' ');
    const lastX = points[points.length - 1][0];
    const lastY = ys[ys.length - 1];
    return (
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <path d={path} stroke="#c4f542" strokeWidth="1.5" fill="none" />
        <circle cx={lastX} cy={lastY} r="2.5" fill="#c4f542" />
      </svg>
    );
  }

  function renderValueChart() {
    if (!r) return null;
    const w = 600, h = 240, pad = 36;
    const minV = r.price * 0.92;
    const maxV = r.valueAt(r.hold) * 1.08;
    const points: [number, number, number, number][] = [];
    for (let y = 0; y <= r.hold; y++) {
      const x = pad + (y / r.hold) * (w - pad * 2);
      const v = r.valueAt(y);
      const yp = h - pad - ((v - minV) / (maxV - minV)) * (h - pad * 2);
      points.push([x, yp, v, y]);
    }
    const path = points.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    const area = path + ` L${points[points.length - 1][0]},${h - pad} L${points[0][0]},${h - pad} Z`;
    const baselineY = h - pad - ((r.price - minV) / (maxV - minV)) * (h - pad * 2);
    return (
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="g-val" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#c4f542" stopOpacity="0.4" />
            <stop offset="1" stopColor="#c4f542" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1={pad} y1={baselineY} x2={w - pad} y2={baselineY} stroke="currentColor" strokeDasharray="3,4" strokeWidth="1" opacity="0.3" />
        <text x={w - pad} y={baselineY - 6} fontFamily="Geist Mono, monospace" fontSize="9" fill="currentColor" opacity="0.5" textAnchor="end">Acquisition</text>
        <path d={area} fill="url(#g-val)" />
        <path d={path} stroke="#c4f542" strokeWidth="2" fill="none" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p[0]} cy={p[1]} r="3" fill="#c4f542" stroke="#0a0a0b" strokeWidth="2" />
            <text x={p[0]} y={p[1] - 12} fontFamily="Geist Mono, monospace" fontSize="9" fill="currentColor" textAnchor="middle" opacity="0.6">Y{i}</text>
          </g>
        ))}
      </svg>
    );
  }

  return (
    <>
      <div className="container">
        <section className="tool-banner">
          <div className="tool-banner-crumbs">
            <a href="/">Tools</a><span className="sep">/</span><span>Investment</span><span className="sep">/</span><span>Exit Strategy</span>
          </div>
          <div className="tool-banner-grid">
            <div className="tool-banner-left">
              <div className="tool-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 17 9 11 13 15 21 7" />
                  <polyline points="14 7 21 7 21 14" />
                </svg>
              </div>
              <div className="tool-banner-info">
                <h1>Exit Strategy</h1>
                <div className="b-sub">Dubai Freehold · Scenario Modeling Tool</div>
                <div className="b-cap">3 scenarios · DLD comparable transactions · IRR ranked</div>
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
                <span className="b-stat-now">{r ? PCT(r.best.irr) : '—'}</span>
                <span className="b-stat-target"><span className="pill-tgt">TGT</span><span>{r ? ` ${PCT(r.targetIrr / 100)} IRR target` : ' — IRR'}</span></span>
                <span className={`b-stat-delta${r && r.best.irr - r.targetIrr / 100 < 0 ? ' down' : ''}`}>{r ? `${r.best.irr - r.targetIrr / 100 >= 0 ? '+' : ''}${((r.best.irr - r.targetIrr / 100) * 100).toFixed(1)}% vs target` : '+0.0%'}</span>
              </div>
              <div className="b-spark">{renderSpark()}</div>
              <div className="b-trend-row">
                <span className="trend">Y1 <strong>{r ? PCT(r.scenarios[0].irr) : '—'}</strong></span>
                <span className="trend">Y3 <strong>{r ? PCT(r.scenarios[1].irr) : '—'}</strong></span>
                <span className="trend">Y{r ? Math.min(5, r.hold) : '5'} <strong>{r ? PCT(Math.pow((r.valueAt(Math.min(5, r.hold)) - r.price + r.netAnnual * Math.min(5, r.hold) + r.price) / r.price, 1 / Math.min(5, r.hold)) - 1) : '—'}</strong></span>
              </div>
            </div>
          </div>
          <div className="tool-banner-bottom">
            {r ? (
              <>
                <span className="query-chip"><span className="qk">TYPE</span><span className="qv">{cap(r.propType)}</span></span>
                <span className="query-chip"><span className="qk">COMMUNITY</span><span className="qv">{r.communityLabel}</span></span>
                <span className="query-chip"><span className="qk">PRICE</span><span className="qv">{AED(r.price)}</span></span>
                <span className="query-chip"><span className="qk">HOLD</span><span className="qv">{r.hold} yrs</span></span>
                <span className="query-chip"><span className="qk">NET RENT</span><span className="qv">{AED(r.rent - r.charges)}/yr</span></span>
                <span className="query-chip"><span className="qk">TARGET IRR</span><span className="qv">{r.targetIrr}%</span></span>
              </>
            ) : (
              <span className="query-chip-empty">No query yet — fill in your inputs to get started.</span>
            )}
          </div>
        </section>

        <section className={`form-drawer${drawerOpen ? ' open' : ''}`}>
          <div className="head">
            <h3>Inputs</h3>
            <button type="button" className="close-btn" onClick={() => setDrawerOpen(false)} aria-label="Close">&times;</button>
          </div>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-drawer-grid">
              <div className="field">
                <label>Property Type</label>
                <select value={propType} onChange={(e) => setPropType(e.target.value)}>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>
              <div className="field">
                <label>Community</label>
                <select value={community} onChange={(e) => setCommunity(e.target.value)}>
                  {COMMUNITIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="field"><label>Acquisition Price (AED)</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min={100000} /></div>
              <div className="field"><label>Hold Period (years)</label><input type="number" value={hold} onChange={(e) => setHold(e.target.value)} min={1} max={15} /></div>
              <div className="field"><label>Annual Net Rent (AED)</label><input type="number" value={rent} onChange={(e) => setRent(e.target.value)} min={0} /></div>
              <div className="field"><label>Service Charges (AED/yr)</label><input type="number" value={charges} onChange={(e) => setCharges(e.target.value)} min={0} /></div>
              <div className="field"><label>Target IRR (%)</label><input type="number" value={targetIrr} onChange={(e) => setTargetIrr(e.target.value)} min={0} max={40} step={0.1} /></div>
              <div className="field full">
                <button className="run-btn" type="submit">Run Exit Analysis &rarr;</button>
              </div>
            </div>
          </form>
        </section>

        {r && (
          <section className="tool-results-grid" style={{ display: 'grid' }}>
            <div>
              <div className="detail-panel">
                <div>
                  <h2>{r.communityLabel} {cap(r.propType)} Overview</h2>
                  <div className="summary">
                    Alpha recommends <strong style={{ color: 'var(--accent)' }}>{r.best.name}</strong> with a projected IRR of <strong>{PCT(r.best.irr)}</strong> — {r.best.irr * 100 >= r.targetIrr ? 'above' : 'below'} your {r.targetIrr}% target. Total projected return across the hold period is <strong>{AED(r.best.totalReturn)}</strong>.
                  </div>
                </div>
                <div className="signal-block">
                  <h3>Rewards</h3>
                  <div>
                    {buildRewards().map((t, i) => (
                      <div key={i} className="signal-row">
                        <div className="signal-icon good">✓</div>
                        <div className="signal-text" dangerouslySetInnerHTML={{ __html: t }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="signal-block">
                  <h3>Risks to Watch</h3>
                  <div>
                    {buildRisks().map((t, i) => {
                      const kind = r.best.irr * 100 < r.targetIrr ? 'bad' : 'warn';
                      const icon = kind === 'bad' ? '✕' : '!';
                      return (
                        <div key={i} className="signal-row">
                          <div className={`signal-icon ${kind}`}>{icon}</div>
                          <div className="signal-text" dangerouslySetInnerHTML={{ __html: t }} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="signal-block">
                  <h3>Comparable Transactions (DLD)</h3>
                  <table className="comp-table">
                    <thead>
                      <tr><th>Tower / Unit</th><th>Sold</th><th>Price (AED)</th><th>Δ vs launch</th></tr>
                    </thead>
                    <tbody>
                      {r.comps.map((c, i) => (
                        <tr key={i}>
                          <td>{c.unit}</td>
                          <td>{c.sold}</td>
                          <td>{AED(c.price)}</td>
                          <td className={c.delta >= 0 ? 'up' : 'down'}>{c.delta >= 0 ? '+' : ''}{(c.delta * 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div>
              <div className="chart-panel">
                <div className="chart-panel-head">
                  <h3>Projected Value Curve</h3>
                  <span className="pill-tag">SCENARIO</span>
                </div>
                <div className="chart-main">{renderValueChart()}</div>
                <div className="chart-legend">
                  <div className="lg"><span className="lg-dot" style={{ background: 'var(--accent)' }} />Projected value</div>
                  <div className="lg"><span className="lg-dot" style={{ background: 'var(--text-3)' }} />Acquisition basis</div>
                </div>
                <div className="chart-summary">
                  <h4>{r.best.name}</h4>
                  <p>Optimal exit at <strong>Year {r.best.years}</strong> with <strong>{PCT(r.best.irr)}</strong> IRR. {r.scenarios.length} scenarios modeled across {r.hold} years of community appreciation data.</p>
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
          <SectionHead title="How" titleAccent="Exit Strategy" titleAfter="works." sub="Alpha doesn't guess. Every scenario runs against real DLD transaction data, RERA service-charge registers and 7-year community-level appreciation curves." />
          <div className="how-grid">
            <div className="how-card"><div className="how-num">01</div><h3>Project the value curve</h3><p>Alpha pulls historic appreciation for the community and unit type, then projects three exit windows: Year 1 (flip), Year 3 (refinance) and full hold-period (yield).</p></div>
            <div className="how-card"><div className="how-num">02</div><h3>Run the IRR math</h3><p>Each scenario combines projected sale value, cumulative net rent (after service charges) and your stated target. The IRR for each path is computed and ranked.</p></div>
            <div className="how-card"><div className="how-num">03</div><h3>Recommend the exit</h3><p>The scenario with the highest IRR above your target is flagged. If none clear the bar, Alpha says hold. Comparable DLD transactions are surfaced to back the call.</p></div>
          </div>
        </div>
      </section>

      <ToolPageStyles />
    </>
  );
}
