'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionHead } from '@/components/Hero';
import { ToolPageStyles } from '../_components/styles';

type Developer = { value: string; label: string; velocity: 'HIGH' | 'MED' | 'LOW'; uplift: number };

const DEVELOPERS: Developer[] = [
  { value: 'emaar', label: 'Emaar Properties', velocity: 'HIGH', uplift: 0.32 },
  { value: 'damac', label: 'Damac Properties', velocity: 'HIGH', uplift: 0.28 },
  { value: 'sobha', label: 'Sobha Realty', velocity: 'HIGH', uplift: 0.30 },
  { value: 'nakheel', label: 'Nakheel', velocity: 'MED', uplift: 0.26 },
  { value: 'meraas', label: 'Meraas', velocity: 'HIGH', uplift: 0.31 },
  { value: 'dubai-properties', label: 'Dubai Properties', velocity: 'MED', uplift: 0.22 },
  { value: 'aldar', label: 'Aldar', velocity: 'MED', uplift: 0.24 },
  { value: 'binghatti', label: 'Binghatti', velocity: 'MED', uplift: 0.25 },
  { value: 'select-group', label: 'Select Group', velocity: 'HIGH', uplift: 0.27 },
  { value: 'ellington', label: 'Ellington Properties', velocity: 'MED', uplift: 0.23 },
  { value: 'azizi', label: 'Azizi Developments', velocity: 'LOW', uplift: 0.18 },
  { value: 'omniyat', label: 'Omniyat', velocity: 'HIGH', uplift: 0.34 },
];

const AED = (n: number) => 'AED ' + Math.round(n).toLocaleString('en-US');
const monthsBetween = (a: Date, b: Date) =>
  Math.max(0, (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()));

type DataPoint = { m: number; pct: number; prob: number; score: number };

type ResultData = {
  developer: string;
  velocity: 'HIGH' | 'MED' | 'LOW';
  totalUplift: number;
  tower: string;
  purchase: Date;
  handover: Date;
  monthsToHandover: number;
  price: number;
  downPct: number;
  postPct: number;
  data: DataPoint[];
  bestStart: number;
  bestEnd: number;
  winAvg: number;
  winProb: number;
};

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
function plus2YearsStr() {
  const d = new Date();
  return new Date(d.getFullYear() + 2, d.getMonth(), d.getDate()).toISOString().slice(0, 10);
}

export default function FlipWindowClient() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [developer, setDeveloper] = useState('emaar');
  const [tower, setTower] = useState('Beach Vista');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [handoverDate, setHandoverDate] = useState('');
  const [totalPrice, setTotalPrice] = useState('2400000');
  const [downPct, setDownPct] = useState('20');
  const [postPct, setPostPct] = useState('40');
  const [result, setResult] = useState<ResultData | null>(null);
  const [bDate, setBDate] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    setBDate(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    setPurchaseDate(todayStr());
    setHandoverDate(plus2YearsStr());
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const p = new URLSearchParams(window.location.search);
    const setIf = (key: string, setter: (v: string) => void) => {
      const v = p.get(key);
      if (v != null) setter(v);
    };
    setIf('dev', setDeveloper);
    setIf('tower', setTower);
    setIf('purchase', setPurchaseDate);
    setIf('handover', setHandoverDate);
    setIf('price', setTotalPrice);
    setIf('down', setDownPct);
    setIf('post', setPostPct);
    if (p.get('auto') === '1') {
      setTimeout(() => {
        formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }, 200);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const dev = DEVELOPERS.find((d) => d.value === developer)!;
    const purchase = new Date(purchaseDate);
    const handover = new Date(handoverDate);
    const price = parseFloat(totalPrice) || 0;
    const downPct_ = parseFloat(downPct) || 20;
    const postPct_ = parseFloat(postPct) || 0;
    if (!price || isNaN(handover.getTime()) || isNaN(purchase.getTime())) {
      alert('Fill in dates and price.');
      return;
    }
    const today = new Date();
    const monthsToHandover = monthsBetween(today, handover);
    const monthsTotal = 36;
    const data: DataPoint[] = [];
    for (let m = 0; m <= monthsTotal; m++) {
      let pct: number;
      if (m <= monthsToHandover) {
        const t = monthsToHandover === 0 ? 1 : m / monthsToHandover;
        pct = Math.pow(t, 2.0) * dev.uplift;
      } else {
        const post = m - monthsToHandover;
        if (post <= 6) pct = dev.uplift + (post / 6) * 0.04;
        else if (post <= 12) pct = dev.uplift + 0.04 - ((post - 6) / 6) * 0.02;
        else pct = dev.uplift + 0.02 - ((post - 12) / 24) * 0.06;
      }
      let prob: number;
      if (m < 3) prob = 0.20;
      else if (m < monthsToHandover - 2) prob = 0.45 + (m / monthsToHandover) * 0.30;
      else if (m <= monthsToHandover + 2) prob = 0.85;
      else if (dev.velocity === 'HIGH') prob = 0.78;
      else if (dev.velocity === 'MED') prob = 0.55 - (m - monthsToHandover) * 0.01;
      else prob = 0.40 - (m - monthsToHandover) * 0.015;
      prob = Math.max(0.10, Math.min(0.95, prob));
      data.push({ m, pct, prob, score: pct * prob });
    }
    let bestStart = 0;
    let bestSum = -1;
    for (let i = 0; i <= monthsTotal - 3; i++) {
      let sum = 0;
      for (let j = 0; j < 4; j++) sum += data[i + j].score;
      if (sum > bestSum) { bestSum = sum; bestStart = i; }
    }
    const bestEnd = bestStart + 3;
    const winAvg = (data[bestStart].pct + data[bestStart + 1].pct + data[bestStart + 2].pct + data[bestStart + 3].pct) / 4;
    const winProb = (data[bestStart].prob + data[bestStart + 1].prob + data[bestStart + 2].prob + data[bestStart + 3].prob) / 4;

    setResult({
      developer: dev.label,
      velocity: dev.velocity,
      totalUplift: dev.uplift,
      tower: tower || 'Tower',
      purchase, handover, monthsToHandover,
      price, downPct: downPct_, postPct: postPct_,
      data, bestStart, bestEnd, winAvg, winProb,
    });
    setDrawerOpen(false);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  }

  const r = result;

  function buildRewards(): string[] {
    if (!r) return [];
    const rewards: string[] = [];
    if (r.bestEnd < r.monthsToHandover) {
      const diff = r.monthsToHandover - r.bestEnd;
      rewards.push(`Peak window falls ${diff} month${diff === 1 ? '' : 's'} before handover — pre-handover liquidity is strong for ${r.developer}.`);
    } else if (r.bestStart > r.monthsToHandover) {
      const diff = r.bestStart - r.monthsToHandover;
      rewards.push(`Peak window falls ${diff} month${diff === 1 ? '' : 's'} after handover — typical for ${r.developer}.`);
    }
    rewards.push(`${r.developer} historically delivers ${(r.totalUplift * 100).toFixed(0)}% launch-to-handover uplift on comparable launches.`);
    if (r.velocity === 'HIGH') rewards.push(`${r.tower} is in a high-velocity tower — secondary listings clear in under 90 days.`);
    if (r.postPct > 30) rewards.push(`Your ${r.postPct}% post-handover plan adds flexibility — hold past handover without exhausting capital.`);
    return rewards;
  }

  function buildRisks(): string[] {
    if (!r) return [];
    const risks: string[] = [];
    if (r.velocity === 'LOW') risks.push(`${r.tower} has lower secondary velocity — list closer to peak with 5–8% headroom for negotiation.`);
    if (r.downPct < 20) risks.push(`${r.downPct}% down payment leaves you highly leveraged — peak window matters more.`);
    risks.push('Selling outside the highlighted window historically captures 30–50% less of the peak uplift.');
    return risks;
  }

  function renderSparkBars() {
    if (!r) return null;
    const scores = r.data.slice(0, 36).map((d) => d.score);
    const w = 320, h = 64, pad = 4, n = scores.length;
    const bw = (w - pad * 2) / n;
    const max = Math.max(...scores);
    return (
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        {scores.map((v, i) => {
          const x = pad + i * bw;
          const bh = (v / max) * (h - pad * 2);
          const y = h - pad - bh;
          const peak = i >= r.bestStart && i <= r.bestEnd;
          return <rect key={i} x={x} y={y} width={bw - 0.5} height={bh} fill={peak ? '#c4f542' : 'rgba(196,245,66,0.25)'} rx="0.5" />;
        })}
      </svg>
    );
  }

  function renderMonthChart() {
    if (!r) return null;
    const w = 600, h = 240, pad = 28, n = 36;
    const bw = (w - pad * 2) / n;
    const max = Math.max(...r.data.slice(0, n).map((d) => d.score));
    return (
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        {Array.from({ length: n }, (_, i) => {
          const v = r.data[i].score;
          const x = pad + i * bw;
          const bh = (v / max) * (h - pad * 2);
          const y = h - pad - bh;
          const isPeak = i >= r.bestStart && i <= r.bestEnd;
          const isHigh = v >= max * 0.7;
          const fill = isPeak ? '#c4f542' : isHigh ? 'rgba(196,245,66,0.45)' : 'rgba(196,245,66,0.18)';
          return (
            <rect key={i} x={x} y={y} width={bw - 1.5} height={bh} fill={fill} rx="1.5">
              <title>M+{i}: +{(r.data[i].pct * 100).toFixed(1)}% × {(r.data[i].prob * 100).toFixed(0)}% prob</title>
            </rect>
          );
        })}
        {[0, 12, 24, 36].map((m) => {
          const x = pad + m * bw;
          return <text key={m} x={x} y={h - 8} fontFamily="Geist Mono, monospace" fontSize="9" fill="currentColor" opacity="0.5" textAnchor="middle">+{m}mo</text>;
        })}
      </svg>
    );
  }

  return (
    <>
      <div className="container">
        <section className="tool-banner">
          <div className="tool-banner-crumbs"><a href="/">Tools</a><span className="sep">/</span><span>Off-Plan</span><span className="sep">/</span><span>Flip Window Calculator</span></div>
          <div className="tool-banner-grid">
            <div className="tool-banner-left">
              <div className="tool-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="tool-banner-info">
                <h1>Flip Window Calculator</h1>
                <div className="b-sub">Off-Plan · Tower Velocity · Handover Curves</div>
                <div className="b-cap">Month-by-month probability · 36-month projection</div>
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
                <span className="b-stat-now" style={{ color: r ? 'var(--accent)' : undefined }}>{r ? `M+${r.bestStart}→M+${r.bestEnd}` : '—'}</span>
                <span className="b-stat-target"><span className="pill-tgt">PEAK</span><span>{r ? ` +${(r.winAvg * 100).toFixed(1)}%` : ' —'}</span></span>
                <span className="b-stat-delta">{r ? `${AED(r.price * r.winAvg)} profit` : '—'}</span>
              </div>
              <div className="b-spark">{renderSparkBars()}</div>
              <div className="b-trend-row">
                <span className="trend">Tower vel <strong>{r ? r.velocity : '—'}</strong></span>
                <span className="trend">Probability <strong>{r ? `${(r.winProb * 100).toFixed(0)}%` : '—'}</strong></span>
                <span className="trend">Months to handover <strong>{r ? r.monthsToHandover : '—'}</strong></span>
              </div>
            </div>
          </div>
          <div className="tool-banner-bottom">
            {r ? (
              <>
                <span className="query-chip"><span className="qk">DEVELOPER</span><span className="qv">{r.developer}</span></span>
                <span className="query-chip"><span className="qk">TOWER</span><span className="qv">{r.tower}</span></span>
                <span className="query-chip"><span className="qk">PURCHASE</span><span className="qv">{r.purchase.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span></span>
                <span className="query-chip"><span className="qk">HANDOVER</span><span className="qv">{r.handover.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span></span>
                <span className="query-chip"><span className="qk">PRICE</span><span className="qv">{AED(r.price)}</span></span>
                <span className="query-chip"><span className="qk">DOWN</span><span className="qv">{r.downPct}%</span></span>
                <span className="query-chip"><span className="qk">POST-HANDOVER</span><span className="qv">{r.postPct}%</span></span>
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
              <div className="field"><label>Tower / Project</label><input type="text" value={tower} onChange={(e) => setTower(e.target.value)} /></div>
              <div className="field"><label>Purchase Date</label><input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} /></div>
              <div className="field"><label>Handover Date</label><input type="date" value={handoverDate} onChange={(e) => setHandoverDate(e.target.value)} /></div>
              <div className="field"><label>Purchase Price (AED)</label><input type="number" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} min={100000} /></div>
              <div className="field"><label>Down Payment (%)</label><input type="number" value={downPct} onChange={(e) => setDownPct(e.target.value)} min={5} max={100} /></div>
              <div className="field full"><label>Post-Handover Plan (%)</label><input type="number" value={postPct} onChange={(e) => setPostPct(e.target.value)} min={0} max={80} /></div>
              <div className="field full">
                <button className="run-btn" type="submit">Compute Flip Window &rarr;</button>
              </div>
            </div>
          </form>
        </section>

        {r && (
          <section className="tool-results-grid" style={{ display: 'grid' }}>
            <div>
              <div className="detail-panel">
                <div>
                  <h2>{r.tower} · {r.developer}</h2>
                  <div className="summary">
                    Sell between <strong style={{ color: 'var(--accent)' }}>M+{r.bestStart}</strong> and <strong style={{ color: 'var(--accent)' }}>M+{r.bestEnd}</strong> for the highest probability-weighted profit. Estimated <strong>+{(r.winAvg * 100).toFixed(1)}%</strong> uplift, <strong>{(r.winProb * 100).toFixed(0)}%</strong> sale probability, ~<strong>{AED(r.price * r.winAvg)}</strong> in profit.
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
                    {buildRisks().map((t, i) => (
                      <div key={i} className="signal-row">
                        <div className="signal-icon warn">!</div>
                        <div className="signal-text">{t}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="chart-panel">
                <div className="chart-panel-head">
                  <h3>Month-by-Month Probability</h3>
                  <span className="pill-tag">36 MO</span>
                </div>
                <div className="chart-main">{renderMonthChart()}</div>
                <div className="chart-legend">
                  <div className="lg"><span className="lg-dot" style={{ background: 'var(--accent)' }} />Peak window</div>
                  <div className="lg"><span className="lg-dot" style={{ background: 'rgba(196,245,66,0.4)' }} />High probability</div>
                </div>
                <div className="chart-summary">
                  <h4>M+{r.bestStart} → M+{r.bestEnd}</h4>
                  <p>Peak 4-month window with <strong>+{(r.winAvg * 100).toFixed(1)}%</strong> avg uplift and <strong>{(r.winProb * 100).toFixed(0)}%</strong> sale probability.</p>
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
          <SectionHead title="How" titleAccent="Flip Window" titleAfter="works." sub="Off-plan price curves are non-linear. Alpha models the curve from purchase to handover and beyond — then ranks each month by probability-weighted profit." />
          <div className="how-grid">
            <div className="how-card"><div className="how-num">01</div><h3>Map the curve</h3><p>Off-plan units appreciate slowly first, accelerate 6–12 months before handover, peak at or shortly after handover, then plateau. Alpha fits the curve to your tower&apos;s developer.</p></div>
            <div className="how-card"><div className="how-num">02</div><h3>Score each month</h3><p>Alpha multiplies projected uplift by secondary-market velocity for each of the next 36 months. Tight inventory + peak appreciation = highest-probability exit.</p></div>
            <div className="how-card"><div className="how-num">03</div><h3>Surface the window</h3><p>The 4-month window with the highest probability-weighted profit is your flip window. Selling earlier leaves money on the table; later runs into resale supply pressure.</p></div>
          </div>
        </div>
      </section>

      <ToolPageStyles />
    </>
  );
}
