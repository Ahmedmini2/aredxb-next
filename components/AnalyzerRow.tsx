'use client';

import { useState } from 'react';

export default function AnalyzerRow({
  icon,
  title,
  desc,
  children,
}: {
  icon: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  return (
    <article className={`ai-tool-row${open ? ' open' : ''}`}>
      <header className="ai-tool-head" onClick={toggle} role="button" tabIndex={0} aria-expanded={open}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}>
        <div className="ai-tool-meta">
          <div className="ai-icon"><i className={`fa ${icon}`} /></div>
          <div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        </div>
        <button type="button" className="ai-calc-btn" onClick={(e) => { e.stopPropagation(); toggle(); }}>
          {open ? 'Hide analysis' : 'Show analysis'}
        </button>
      </header>
      <div className="ai-tool-body" hidden={!open}>
        <div className="ai-result">{children}</div>
      </div>
    </article>
  );
}
