'use client';

import Link from 'next/link';
import { useState } from 'react';

type Tool = { href: string; tag: string; tag2: string; vis: 'snowflake' | 'exit' | 'fit' | 'flip' | 'launch'; title: string; desc: string };
type Prompt = { rank: string; runs: string; text: string };
type Project = { name: string; meta: string; community: string; type: string; beds: number; area: number; price: number; yield: string; entry: string };
type Launch = { dev: string; devLabel: string; project: string; launchDate: string; launchLabel: string; type: string; budget: number; community: string };

const TOOLS: Tool[] = [
  { href: '/tools/off-plan-analyzer', tag: 'OFF-PLAN ANALYZER', tag2: '◎ Tool', vis: 'snowflake', title: 'Off-Plan Analyzer', desc: 'Score any off-plan unit on 5 pillars: Location, Developer, Comps, Payment, Price/sqft.' },
  { href: '/tools/exit-strategy', tag: 'EXIT STRATEGY', tag2: '◎ Tool', vis: 'exit', title: 'Exit Strategy', desc: 'When to flip, refinance or hold — modeled across Dubai freehold comps.' },
  { href: '/tools/property-fit', tag: 'PROPERTY FIT', tag2: '◎ Tool', vis: 'fit', title: 'Is this the right property for you?', desc: 'Paste a Bayut or PropertyFinder link. Get a buy/watch/skip verdict in 90 seconds.' },
  { href: '/tools/flip-window-calculator', tag: 'FLIP WINDOW', tag2: '◎ Tool', vis: 'flip', title: 'Flip Window Calculator', desc: 'The optimal months to sell an off-plan unit, by tower velocity and historic curves.' },
  { href: '/tools/launch-timing-analyser', tag: 'LAUNCH TIMING', tag2: '◎ Tool', vis: 'launch', title: 'Launch Timing Analyser', desc: 'EOI, day-one launch or wait for resale — pinpointed from 318 prior launches.' },
];

const PROMPTS: Prompt[] = [
  { rank: '01', runs: '8,142', text: 'Find me 1BR off-plan units in JVC under AED 900K with handover before 2027.' },
  { rank: '02', runs: '6,327', text: 'Compare 5-year capital appreciation between Dubai Marina and Business Bay.' },
  { rank: '03', runs: '5,890', text: 'Which Damac Lagoons clusters have the strongest secondary-market velocity?' },
  { rank: '04', runs: '4,612', text: 'Best beachfront units under AED 5M with projected net yield above 7%.' },
  { rank: '05', runs: '3,755', text: 'Show me studios in Downtown with service charges below AED 18 per sqft.' },
  { rank: '06', runs: '3,410', text: "What's the ideal exit window for a 2BR Sobha Hartland unit bought in 2024?" },
];

const PROJECTS: Project[] = [
  { name: 'Emaar Beachfront', meta: 'Emaar · Beachfront', community: 'emaar-beachfront', type: 'apartment', beds: 2, area: 1400, price: 4500000, yield: '6.1%', entry: '3.8M' },
  { name: 'Sobha Hartland', meta: 'Sobha · MBR City', community: 'sobha-hartland', type: 'apartment', beds: 2, area: 1300, price: 2700000, yield: '6.9%', entry: '1.9M' },
  { name: 'Damac Lagoons', meta: 'Damac · Lagoons', community: 'damac-lagoons', type: 'townhouse', beds: 3, area: 2400, price: 3950000, yield: '7.5%', entry: '2.4M' },
  { name: 'Dubai Hills Estate', meta: 'Emaar · Hills', community: 'dubai-hills', type: 'apartment', beds: 2, area: 1250, price: 2550000, yield: '6.4%', entry: '1.6M' },
  { name: 'Bluewaters Residences', meta: 'Meraas · Bluewaters', community: 'palm-jumeirah', type: 'apartment', beds: 2, area: 1450, price: 4900000, yield: '5.8%', entry: '3.2M' },
  { name: 'Business Bay', meta: 'Multiple · Bay', community: 'business-bay', type: 'apartment', beds: 1, area: 850, price: 1450000, yield: '6.8%', entry: '900K' },
];

const LAUNCHES: Launch[] = [
  { dev: 'emaar', devLabel: 'Emaar Properties', project: 'Beach Vista Phase 4', launchDate: '2026-08-15', launchLabel: 'AUG 2026', type: 'apartment', budget: 2400000, community: 'Emaar Beachfront' },
  { dev: 'damac', devLabel: 'Damac Properties', project: 'Damac Lagoons Sun Bay', launchDate: '2026-06-20', launchLabel: 'JUN 2026', type: 'townhouse', budget: 3100000, community: 'Damac Lagoons' },
  { dev: 'sobha', devLabel: 'Sobha Realty', project: 'Sobha Reserve Phase 2', launchDate: '2026-09-10', launchLabel: 'SEP 2026', type: 'apartment', budget: 1800000, community: 'MBR City' },
  { dev: 'aldar', devLabel: 'Aldar Properties', project: 'Reem Hills Phase 3', launchDate: '2026-07-05', launchLabel: 'JUL 2026', type: 'villa', budget: 4500000, community: 'Reem Island' },
  { dev: 'meraas', devLabel: 'Meraas', project: 'Bluewaters Residence II', launchDate: '2026-09-25', launchLabel: 'SEP 2026', type: 'apartment', budget: 3800000, community: 'Bluewaters' },
  { dev: 'omniyat', devLabel: 'Omniyat', project: 'ORLA at Palm', launchDate: '2027-01-15', launchLabel: 'Q1 2027', type: 'penthouse', budget: 12000000, community: 'Palm Jumeirah' },
  { dev: 'binghatti', devLabel: 'Binghatti', project: 'Binghatti Crystal', launchDate: '2026-08-30', launchLabel: 'AUG 2026', type: 'apartment', budget: 950000, community: 'JVC' },
  { dev: 'ellington', devLabel: 'Ellington Properties', project: 'Ellington Bay Villas', launchDate: '2026-11-10', launchLabel: 'NOV 2026', type: 'villa', budget: 5200000, community: 'Dubai Islands' },
  { dev: 'select-group', devLabel: 'Select Group', project: 'Six Senses Marina', launchDate: '2026-10-20', launchLabel: 'OCT 2026', type: 'apartment', budget: 6500000, community: 'Dubai Marina' },
  { dev: 'nakheel', devLabel: 'Nakheel', project: 'Palm Jebel Ali Front', launchDate: '2026-12-05', launchLabel: 'DEC 2026', type: 'villa', budget: 18000000, community: 'Palm Jebel Ali' },
];

function VisSnowflake() {
  const cx = 150, cy = 80, R = 56, n = 5;
  const scores = [85, 92, 70, 78, 88];
  const rings = [];
  for (let r = 0.33; r <= 1; r += 0.33) {
    const pts = scores.map((_, i) => { const a = -Math.PI / 2 + (i / n) * Math.PI * 2; return (cx + Math.cos(a) * R * r) + ',' + (cy + Math.sin(a) * R * r); }).join(' ');
    rings.push(<polygon key={r} points={pts} fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />);
  }
  const axes = scores.map((_, i) => { const a = -Math.PI / 2 + (i / n) * Math.PI * 2; return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * R} y2={cy + Math.sin(a) * R} stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />; });
  const pts = scores.map((v, i) => { const a = -Math.PI / 2 + (i / n) * Math.PI * 2; const r = (v / 100) * R; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; });
  let blob = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length; i++) { const p0 = pts[i]; const p1 = pts[(i + 1) % pts.length]; const mx = (p0[0] + p1[0]) / 2; const my = (p0[1] + p1[1]) / 2; blob += ` Q${p0[0].toFixed(1)},${p0[1].toFixed(1)} ${mx.toFixed(1)},${my.toFixed(1)}`; }
  blob += ' Z';
  const labels = ['LOC', 'DEV', 'COMP', 'PMT', 'VAL'];
  return (
    <div className="vis-snowflake">
      <svg viewBox="0 0 300 160" style={{ maxHeight: 160 }}>
        {rings}{axes}
        <path d={blob} fill="rgba(196,245,66,0.4)" stroke="#c4f542" strokeWidth="1.8" strokeLinejoin="round" />
        {labels.map((l, i) => { const a = -Math.PI / 2 + (i / n) * Math.PI * 2; const x = cx + Math.cos(a) * (R + 12); const y = cy + Math.sin(a) * (R + 12); return <text key={i} x={x} y={y} fontFamily="Geist Mono, monospace" fontSize="7" fill="currentColor" textAnchor="middle" dominantBaseline="middle">{l}</text>; })}
      </svg>
    </div>
  );
}

function VisExit() {
  return (
    <div className="vis-exit">
      <svg viewBox="0 0 300 160" preserveAspectRatio="none">
        <defs>
          <linearGradient id="g-exit" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#c4f542" stopOpacity="0.4" />
            <stop offset="1" stopColor="#c4f542" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,130 L40,120 L80,105 L120,98 L160,82 L200,60 L240,38 L300,18 L300,160 L0,160 Z" fill="url(#g-exit)" />
        <path d="M0,130 L40,120 L80,105 L120,98 L160,82 L200,60 L240,38 L300,18" stroke="#c4f542" strokeWidth="2" fill="none" />
        <circle cx="200" cy="60" r="4" fill="#c4f542" />
      </svg>
      <span className="label">PEAK Y3 → SELL</span>
    </div>
  );
}

function VisFit() {
  return (
    <div className="vis-fit">
      <div className="verdict">BUY</div>
      <div className="lines">
        <div className="ln"><span>net_yield</span><span className="ok">7.4%</span></div>
        <div className="ln"><span>service_charges</span><span className="ok">OK</span></div>
        <div className="ln"><span>comps_check</span><span className="ok">+62</span></div>
        <div className="ln"><span>thesis_match</span><span className="ok">94%</span></div>
      </div>
    </div>
  );
}

function VisFlip() {
  const heights = [12, 18, 22, 30, 40, 55, 80, 95, 70, 45, 28, 16];
  return (
    <div className="vis-flip">
      <h3>FLIP<br />WINDOW</h3>
      <div className="sub">M+18 → M+22 &nbsp;•&nbsp; +27% est uplift</div>
      <div className="months">
        {heights.map((h, i) => <div key={i} className="m" style={{ height: h + '%', background: h >= 70 ? '#c4f542' : 'var(--bg-3)' }} />)}
      </div>
    </div>
  );
}

function VisLaunch() {
  return (
    <div className="vis-launch">
      <svg viewBox="0 0 300 160" preserveAspectRatio="none">
        <defs>
          <linearGradient id="g-launch" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#c4f542" stopOpacity="0.45" />
            <stop offset="1" stopColor="#c4f542" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,140 L30,135 L60,120 L90,90 L120,70 L150,55 L180,48 L210,45 L240,42 L270,40 L300,38 L300,160 L0,160 Z" fill="url(#g-launch)" />
        <path d="M0,140 L30,135 L60,120 L90,90 L120,70 L150,55 L180,48 L210,45 L240,42 L270,40 L300,38" stroke="#c4f542" strokeWidth="2" fill="none" />
        <circle cx="60" cy="120" r="5" fill="#c4f542" stroke="#0a0a0b" strokeWidth="2" />
      </svg>
    </div>
  );
}

function visFor(name: Tool['vis']) {
  if (name === 'snowflake') return <VisSnowflake />;
  if (name === 'exit') return <VisExit />;
  if (name === 'fit') return <VisFit />;
  if (name === 'flip') return <VisFlip />;
  if (name === 'launch') return <VisLaunch />;
  return null;
}

function ToolCardCarousel({ data }: { data: Tool[] }) {
  return <>{data.map((c, i) => (
    <Link key={i} href={c.href} className="case-card">
      <span className="cc-tag">{c.tag}</span>
      <span className="cc-tag2">{c.tag2}</span>
      <div className="cc-vis">{visFor(c.vis)}</div>
      <div className="cc-foot"><h4>{c.title}</h4><p>{c.desc}</p></div>
    </Link>
  ))}</>;
}

function PromptCardsCarousel({ data }: { data: Prompt[] }) {
  return <>{data.map((c, i) => (
    <Link key={i} href="/" className="case-card prompt-variant">
      <span className="cc-tag">#{c.rank}</span>
      <span className="cc-tag2"><span className="runs">{c.runs}</span>&nbsp;runs</span>
      <div className="cc-vis"><div className="prompt-quote">{c.text}</div></div>
      <div className="cc-foot"><h4>Run on Alpha &rarr;</h4><p>Top of the trending board this month</p></div>
    </Link>
  ))}</>;
}

function ProjectCardsCarousel({ data }: { data: Project[] }) {
  return <>{data.map((c, i) => {
    const url = `/tools/property-fit?type=${encodeURIComponent(c.type)}&community=${encodeURIComponent(c.community)}&beds=${c.beds}&area=${c.area}&price=${c.price}&thesis=appreciation&auto=1`;
    return (
      <Link key={i} href={url} className="case-card project-variant">
        <span className="cc-tag">FEATURED</span>
        <span className="cc-tag2">Top Project</span>
        <div className="cc-vis">
          <div className="proj-meta">{c.meta}</div>
          <div className="proj-name">{c.name}</div>
          <div className="ps-row">
            <div className="ps-tile"><div className="k">Yield</div><div className="v">{c.yield}</div></div>
            <div className="ps-tile"><div className="k">Entry</div><div className="v">{c.entry}</div></div>
          </div>
        </div>
        <div className="cc-foot"><h4>Analyze with Property Fit &rarr;</h4><p>Compare against community comps in seconds.</p></div>
      </Link>
    );
  })}</>;
}

function LaunchCardsCarousel({ data }: { data: Launch[] }) {
  return <>{data.map((c, i) => {
    const url = `/tools/launch-timing-analyser?dev=${encodeURIComponent(c.dev)}&project=${encodeURIComponent(c.project)}&launch=${c.launchDate}&type=${encodeURIComponent(c.type)}&budget=${c.budget}&auto=1`;
    return (
      <Link key={i} href={url} className="case-card launch-variant">
        <span className="cc-tag">{c.launchLabel}</span>
        <span className="cc-tag2">{c.devLabel}</span>
        <div className="cc-vis">
          <div className="launch-meta">{c.community}</div>
          <div className="launch-name">{c.project}</div>
          <div className="launch-stat-row">
            <span className="launch-pill">{c.type.toUpperCase()}</span>
            <span className="launch-pill">From {(c.budget / 1000000).toFixed(2)}M AED</span>
          </div>
        </div>
        <div className="cc-foot">
          <div className="analyze-btn">⚡ Analyze with Alpha &rarr;</div>
        </div>
      </Link>
    );
  })}</>;
}

export default function HomeCarousel() {
  const [tab, setTab] = useState<'tools' | 'prompts' | 'projects' | 'launches'>('tools');

  function track() {
    if (tab === 'tools') return <><ToolCardCarousel data={TOOLS} /><ToolCardCarousel data={TOOLS} /></>;
    if (tab === 'prompts') return <><PromptCardsCarousel data={PROMPTS} /><PromptCardsCarousel data={PROMPTS} /></>;
    if (tab === 'projects') return <><ProjectCardsCarousel data={PROJECTS} /><ProjectCardsCarousel data={PROJECTS} /></>;
    return <><LaunchCardsCarousel data={LAUNCHES} /><LaunchCardsCarousel data={LAUNCHES} /></>;
  }

  return (
    <>
      <div className="filter-row">
        <div className="filter-tabs">
          <button className={`filter-tab ${tab === 'tools' ? 'active' : ''}`} onClick={() => setTab('tools')}><span className="dot-sm" />Investor Tools</button>
          <button className={`filter-tab ${tab === 'prompts' ? 'active' : ''}`} onClick={() => setTab('prompts')}><span className="dot-sm" />Trending Investors Prompts</button>
          <button className={`filter-tab ${tab === 'projects' ? 'active' : ''}`} onClick={() => setTab('projects')}><span className="dot-sm" />Top Projects</button>
          <button className={`filter-tab ${tab === 'launches' ? 'active' : ''}`} onClick={() => setTab('launches')}><span className="dot-sm" />Recent Launches</button>
        </div>
        <div className="users-count"><span className="live" />Used by <strong style={{ color: 'var(--text)' }}>18,420</strong>&nbsp;investors</div>
      </div>

      <div className="carousel-mask">
        <div className="carousel-track" key={tab}>{track()}</div>
      </div>
    </>
  );
}
