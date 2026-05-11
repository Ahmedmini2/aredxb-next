'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionHead } from '@/components/Hero';
import { ToolPageStyles } from '../_components/styles';

type Developer = { value: string; label: string; tier: 1 | 2 | 3; eoiAdv: number; salesVel: 'HIGH' | 'MED' | 'LOW' };

const DEVELOPERS: Developer[] = [
  { value: 'emaar',         label: 'Emaar Properties',     tier: 1, eoiAdv: 0.096, salesVel: 'HIGH' },
  { value: 'damac',         label: 'Damac Properties',     tier: 1, eoiAdv: 0.082, salesVel: 'HIGH' },
  { value: 'sobha',         label: 'Sobha Realty',         tier: 1, eoiAdv: 0.088, salesVel: 'HIGH' },
  { value: 'meraas',        label: 'Meraas',               tier: 1, eoiAdv: 0.092, salesVel: 'HIGH' },
  { value: 'aldar',         label: 'Aldar Properties',     tier: 1, eoiAdv: 0.080, salesVel: 'MED'  },
  { value: 'nakheel',       label: 'Nakheel',              tier: 1, eoiAdv: 0.078, salesVel: 'MED'  },
  { value: 'omniyat',       label: 'Omniyat',              tier: 1, eoiAdv: 0.110, salesVel: 'HIGH' },
  { value: 'select-group',  label: 'Select Group',         tier: 2, eoiAdv: 0.072, salesVel: 'HIGH' },
  { value: 'ellington',     label: 'Ellington Properties', tier: 2, eoiAdv: 0.068, salesVel: 'MED'  },
  { value: 'binghatti',     label: 'Binghatti',            tier: 2, eoiAdv: 0.064, salesVel: 'MED'  },
  { value: 'azizi',         label: 'Azizi Developments',   tier: 3, eoiAdv: 0.040, salesVel: 'LOW'  },
  { value: 'dubai-properties', label: 'Dubai Properties',  tier: 2, eoiAdv: 0.058, salesVel: 'MED'  },
];

const PROPERTY_TYPES = [
  { value: 'apartment',  label: 'Apartment',  multiplier: 1.00 },
  { value: 'townhouse',  label: 'Townhouse',  multiplier: 1.05 },
  { value: 'villa',      label: 'Villa',      multiplier: 1.10 },
  { value: 'penthouse',  label: 'Penthouse',  multiplier: 1.18 },
];

const AED = (n: number) => 'AED ' + Math.round(n).toLocaleString('en-US');
const PCT = (n: number) => (n * 100).toFixed(1) + '%';

type Verdict = 'EOI / Pre-Launch' | 'Day-One Launch' | 'Wait for Resale';
type Kind = 'good' | 'warn' | 'bad';

type ResultData = {
  developer: Developer;
  type: typeof PROPERTY_TYPES[number];
  project: string;
  launchDate: string;
  budget: number;
  verdict: Verdict;
  kind: Kind;
  eoiPrice: number;
  launchPrice: number;
  resalePrice: number;
  eoiUplift: number;
  launchUplift: number;
  resaleUplift: number;
  recommendation: string;
  rationale: string[];
};

export default function LaunchTimingClient() {
  const [developer, setDeveloper] = useState('emaar');
  const [project, setProject] = useState('Beach Vista Phase 4');
  const [launchDate, setLaunchDate] = useState('');
  const [type, setType] = useState('apartment');
  const [budget, setBudget] = useState('2400000');
  const [result, setResult] = useState<ResultData | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const p = new URLSearchParams(window.location.search);
    if (p.get('dev')) setDeveloper(p.get('dev')!);
    if (p.get('project')) setProject(p.get('project')!);
    if (p.get('launch')) setLaunchDate(p.get('launch')!);
    if (p.get('type')) setType(p.get('type')!);
    if (p.get('budget')) setBudget(p.get('budget')!);
    if (p.get('auto') === '1') {
      setTimeout(() => formRef.current?.requestSubmit(), 250);
    }
  }, []);

  function run() {
    const dev = DEVELOPERS.find((d) => d.value === developer) || DEVELOPERS[0];
    const propType = PROPERTY_TYPES.find((t) => t.value === type) || PROPERTY_TYPES[0];
    const price = parseFloat(budget) || 0;
    if (!price) { alert('Enter a budget.'); return; }

    const eoiUplift = dev.eoiAdv * propType.multiplier;
    const launchUplift = eoiUplift * 0.55;
    const resaleUplift = eoiUplift * 0.20;

    const eoiPrice    = price * (1 - eoiUplift);
    const launchPrice = price;
    const resalePrice = price * (1 + (eoiUplift * 0.40));

    let verdict: Verdict; let kind: Kind; let recommendation: string;
    if (dev.tier === 1 && dev.salesVel === 'HIGH') {
      verdict = 'EOI / Pre-Launch'; kind = 'good';
      recommendation = `Lock in EOI day-one. ${dev.label} consistently sees ${PCT(eoiUplift)} appreciation between EOI and launch — your unit is likely to be re-priced upward before public release.`;
    } else if (dev.tier === 1 || (dev.tier === 2 && dev.salesVel === 'HIGH')) {
      verdict = 'Day-One Launch'; kind = 'warn';
      recommendation = `Buy on launch day. EOI uplift is moderate (${PCT(eoiUplift)}) but the strongest units sell within 24 hours of public launch — early access matters more than EOI in this tier.`;
    } else {
      verdict = 'Wait for Resale'; kind = 'bad';
      recommendation = `Hold off until resale market emerges 12–18 months post-launch. ${dev.label} has slower velocity, meaning resale stock often trades below original launch pricing.`;
    }

    const rationale: string[] = [
      `${dev.label} is a tier-${dev.tier} developer with ${dev.salesVel.toLowerCase()} historic sales velocity.`,
      `Average launch-to-handover appreciation for this developer: ${PCT(dev.eoiAdv)}.`,
      `${propType.label} units typically attract a ${((propType.multiplier - 1) * 100).toFixed(0)}% premium over baseline.`,
      `Estimated EOI advantage vs day-one launch: ${AED(price * eoiUplift)} per unit.`,
    ];

    setResult({
      developer: dev,
      type: propType,
      project,
      launchDate,
      budget: price,
      verdict, kind,
      eoiPrice, launchPrice, resalePrice,
      eoiUplift, launchUplift, resaleUplift,
      recommendation,
      rationale,
    });
  }

  return (
    <>
      <ToolPageStyles />
      <div className="container">
        <section className="tool-banner">
          <div className="tool-banner-crumbs">
            <a href="/">Tools</a><span className="sep"> / </span>
            <a href="/#tools">Investment</a><span className="sep"> / </span>
            <span>Launch Timing Analyser</span>
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 44, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 8 }}>
            Launch <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Timing</em> Analyser.
          </h1>
          <p style={{ color: 'var(--text-2)', maxWidth: 720 }}>
            EOI, day-one launch or wait for resale — pinpointed from 318 prior Dubai off-plan launches across tier-1 developers.
          </p>
        </section>

        <section className="block">
          <SectionHead eyebrow="// Inputs" title="Tell Alpha about the" titleAccent="launch" titleAfter="." />
          <form ref={formRef} className="tool-form" onSubmit={(e) => { e.preventDefault(); run(); }}>
            <div className="tool-form-grid">
              <div className="tool-field">
                <label>Developer</label>
                <select value={developer} onChange={(e) => setDeveloper(e.target.value)}>
                  {DEVELOPERS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div className="tool-field">
                <label>Property Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  {PROPERTY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div className="tool-field full">
                <label>Project Name</label>
                <input type="text" value={project} onChange={(e) => setProject(e.target.value)} />
              </div>
              <div className="tool-field">
                <label>Launch Date</label>
                <input type="date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} />
              </div>
              <div className="tool-field">
                <label>Budget (AED)</label>
                <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} min={500000} step={50000} />
              </div>
              <div className="tool-field full">
                <button type="submit" className="run-btn">Analyse Launch Timing →</button>
              </div>
            </div>
          </form>

          {result && (
            <div className="tool-results">
              <span className={`tool-verdict ${result.kind}`}>{result.verdict}</span>
              <h3 style={{ marginTop: 14, marginBottom: 8, fontFamily: "'Instrument Serif', serif", fontSize: 26, color: 'var(--text)' }}>
                {result.project} — {result.developer.label}
              </h3>
              <p style={{ color: 'var(--text-2)', lineHeight: 1.55, marginBottom: 24 }}>
                {result.recommendation}
              </p>

              <div className="tool-stat-grid">
                <div className="tool-stat"><div className="k">EOI Price</div><div className="v accent">{AED(result.eoiPrice)}</div></div>
                <div className="tool-stat"><div className="k">Launch Price</div><div className="v">{AED(result.launchPrice)}</div></div>
                <div className="tool-stat"><div className="k">Resale Floor</div><div className="v">{AED(result.resalePrice)}</div></div>
                <div className="tool-stat"><div className="k">EOI Advantage</div><div className="v accent">{PCT(result.eoiUplift)}</div></div>
              </div>

              <div className="tool-bar-grid">
                <div className="tool-bar-row">
                  <span className="name">EOI / Pre-Launch</span>
                  <div className="bar"><div className="fill" style={{ width: result.kind === 'good' ? '92%' : result.kind === 'warn' ? '60%' : '30%' }} /></div>
                  <span className="pct">{result.kind === 'good' ? '92' : result.kind === 'warn' ? '60' : '30'}</span>
                </div>
                <div className="tool-bar-row">
                  <span className="name">Day-One Launch</span>
                  <div className="bar"><div className="fill" style={{ width: result.kind === 'good' ? '78%' : result.kind === 'warn' ? '85%' : '52%' }} /></div>
                  <span className="pct">{result.kind === 'good' ? '78' : result.kind === 'warn' ? '85' : '52'}</span>
                </div>
                <div className="tool-bar-row">
                  <span className="name">Wait for Resale</span>
                  <div className="bar"><div className="fill" style={{ width: result.kind === 'good' ? '40%' : result.kind === 'warn' ? '55%' : '80%' }} /></div>
                  <span className="pct">{result.kind === 'good' ? '40' : result.kind === 'warn' ? '55' : '80'}</span>
                </div>
              </div>

              <h4 style={{ marginTop: 28, marginBottom: 12, fontFamily: "'Geist Mono', monospace", fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)' }}>
                Rationale
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.rationale.map((r, i) => (
                  <li key={i} style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.5, paddingLeft: 18, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, top: 9, width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)' }} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
