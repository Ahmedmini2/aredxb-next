// Shared CSS for the 5 calculator tool pages.
// Renders a single <style> block with banner / drawer / results layout
// adapted from public/css/aa-tools.css. All colors use CSS vars so light
// and dark themes (body.light) just work.

export function ToolPageStyles() {
  return (
    <style>{`
      .container { max-width: 1240px; margin: 0 auto; padding: 0 32px; }

      /* ===== Tool banner ===== */
      .tool-banner {
        background: var(--bg-2);
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 28px 32px;
        position: relative;
        overflow: hidden;
        margin-top: 28px;
      }
      .tool-banner::after {
        content: '';
        position: absolute;
        right: -10%; top: -50%;
        width: 65%; height: 200%;
        background: radial-gradient(circle, rgba(196,245,66,0.10), transparent 60%);
        pointer-events: none;
      }
      body.light .tool-banner::after { background: radial-gradient(circle, rgba(132,204,22,0.10), transparent 60%); }
      .tool-banner-crumbs { font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 22px; position: relative; z-index: 2; }
      .tool-banner-crumbs a { color: var(--text-3); }
      .tool-banner-crumbs a:hover { color: var(--accent); }
      .tool-banner-crumbs .sep { margin: 0 8px; opacity: 0.5; }

      .tool-banner-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 32px; align-items: center; position: relative; z-index: 2; }

      .tool-banner-left { display: flex; gap: 20px; align-items: flex-start; }
      .tool-icon { width: 84px; height: 84px; background: var(--accent); border-radius: 16px; display: grid; place-items: center; flex-shrink: 0; color: #0a0a0b; box-shadow: 0 8px 30px -6px rgba(196,245,66,0.4); }
      .tool-icon svg { width: 40px; height: 40px; }
      body.light .tool-icon { box-shadow: 0 8px 30px -6px rgba(132,204,22,0.5); }
      .tool-banner-info h1 { font-family: 'Instrument Serif', serif; font-weight: 400; font-size: clamp(28px, 3.4vw, 40px); line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 4px; color: var(--text); }
      .tool-banner-info .b-sub { font-size: 14px; color: var(--text-2); margin-bottom: 6px; }
      .tool-banner-info .b-cap { font-family: 'Geist Mono', monospace; font-size: 12px; color: var(--text-3); }
      .tool-banner-actions { display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap; }

      .btn-mini { padding: 7px 13px; font-size: 12px; border-radius: 7px; background: var(--bg-3); border: 1px solid var(--line); color: var(--text); display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-family: inherit; transition: all 0.15s; }
      .btn-mini:hover { border-color: var(--accent); color: var(--accent); }
      .btn-mini.btn-edit { background: var(--accent); color: #0a0a0b; border-color: var(--accent); font-weight: 600; }
      .btn-mini.btn-edit:hover { background: #d2ff52; color: #0a0a0b; }
      body.light .btn-mini.btn-edit { background: #84cc16; border-color: #84cc16; color: #0a0a0b; }
      body.light .btn-mini.btn-edit:hover { background: #a3e635; color: #0a0a0b; }

      .tool-banner-right { display: flex; flex-direction: column; gap: 10px; }
      .b-meta-row { display: flex; justify-content: space-between; font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--text-3); }
      .b-meta-row .live-mark { display: inline-flex; align-items: center; gap: 6px; }
      .b-meta-row .live-mark > span:first-child { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); animation: aa-blink 2s infinite; }
      @keyframes aa-blink { 50% { opacity: 0.4; } }
      .b-stats-row { display: flex; gap: 18px; align-items: baseline; }
      .b-stat-now { font-family: 'Instrument Serif', serif; font-size: 30px; line-height: 1; color: var(--text); }
      .b-stat-target { font-family: 'Geist Mono', monospace; font-size: 12px; color: var(--text-2); display: inline-flex; align-items: center; gap: 6px; }
      .b-stat-target .pill-tgt { display: inline-flex; align-items: center; padding: 2px 6px; border: 1px solid var(--line); border-radius: 4px; font-size: 10px; }
      .b-stat-delta { font-family: 'Geist Mono', monospace; font-size: 12px; padding: 3px 9px; border-radius: 5px; background: rgba(74,222,128,0.12); color: var(--good); }
      .b-stat-delta.down { background: rgba(255,107,107,0.12); color: var(--warn); }
      .b-spark { height: 64px; }
      .b-spark svg { width: 100%; height: 100%; display: block; }
      .b-trend-row { display: flex; gap: 18px; font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--text-3); flex-wrap: wrap; }
      .b-trend-row strong { color: var(--good); margin-left: 4px; font-weight: 500; }
      .b-trend-row strong.down { color: var(--warn); }

      .tool-banner-bottom { margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--line); display: flex; flex-wrap: wrap; gap: 8px; position: relative; z-index: 2; }
      .query-chip { padding: 6px 12px; background: var(--bg-3); border: 1px solid var(--line); border-radius: 7px; font-size: 12px; color: var(--text-2); display: inline-flex; gap: 6px; align-items: center; font-family: 'Geist', sans-serif; }
      .query-chip .qk { font-family: 'Geist Mono', monospace; font-size: 10px; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.06em; }
      .query-chip .qv { color: var(--text); font-weight: 500; }
      .query-chip-empty { color: var(--text-3); font-size: 12px; padding: 6px 12px; font-style: italic; }

      /* ===== Form drawer ===== */
      .form-drawer { background: var(--bg-2); border: 1px solid var(--line); border-radius: 16px; margin-top: 22px; max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.2s ease, opacity 0.2s ease; opacity: 0; padding: 0 28px; }
      .form-drawer.open { max-height: 1600px; padding: 28px; opacity: 1; }
      .form-drawer .head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--line); }
      .form-drawer .head h3 { font-family: 'Geist', sans-serif; font-size: 15px; font-weight: 500; color: var(--text); }
      .form-drawer .close-btn { background: var(--bg-3); border: 1px solid var(--line); color: var(--text-2); width: 30px; height: 30px; border-radius: 6px; cursor: pointer; }
      .form-drawer .close-btn:hover { color: var(--text); }
      .form-drawer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      .form-drawer .full { grid-column: 1 / -1; }

      /* ===== Field controls ===== */
      .field { display: flex; flex-direction: column; gap: 6px; }
      .field label { font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--text-3); letter-spacing: 0.06em; text-transform: uppercase; }
      .field input[type="text"], .field input[type="number"], .field input[type="url"], .field input[type="date"], .field input[type="email"], .field select, .field textarea {
        background: var(--bg-3); border: 1px solid var(--line); color: var(--text);
        padding: 10px 12px; border-radius: 8px; font-family: inherit; font-size: 14px;
        transition: border-color 0.15s, box-shadow 0.15s;
      }
      .field input:focus, .field select:focus, .field textarea:focus {
        outline: none; border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(196, 245, 66, 0.12);
      }
      .field input::placeholder, .field textarea::placeholder { color: var(--text-3); }

      .run-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; height: 44px; border-radius: 10px; background: var(--accent); color: #0a0a0b; border: 0; cursor: pointer; font-family: inherit; font-size: 14px; font-weight: 600; margin-top: 8px; transition: background 0.15s; }
      .run-btn:hover { background: #d2ff52; }
      body.light .run-btn { background: #84cc16; color: #0a0a0b; }
      body.light .run-btn:hover { background: #a3e635; }

      /* ===== Two-column results layout ===== */
      .tool-results-grid { display: grid; grid-template-columns: 1.45fr 1fr; gap: 22px; align-items: start; margin-top: 28px; }

      .detail-panel { background: var(--bg-2); border: 1px solid var(--line); border-radius: 16px; padding: 28px; display: flex; flex-direction: column; gap: 22px; }
      .detail-panel h2 { font-family: 'Instrument Serif', serif; font-weight: 400; font-size: 28px; line-height: 1.1; letter-spacing: -0.02em; color: var(--text); }
      .detail-panel .summary { font-size: 16px; line-height: 1.55; color: var(--text); }
      .detail-panel .summary-meta { font-size: 13px; color: var(--text-2); }
      .detail-panel .summary-meta a { color: var(--accent); }

      .signal-block { display: flex; flex-direction: column; gap: 14px; }
      .signal-block h3 { font-family: 'Geist Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-3); }
      .signal-row { display: flex; gap: 12px; align-items: flex-start; padding: 6px 0; }
      .signal-icon { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0; font-size: 11px; }
      .signal-icon.good { background: rgba(74,222,128,0.15); color: var(--good); }
      .signal-icon.warn { background: rgba(255,200,60,0.15); color: #ffc83c; }
      .signal-icon.bad  { background: rgba(255,107,107,0.15); color: var(--warn); }
      .signal-text { flex: 1; font-size: 14px; color: var(--text); line-height: 1.5; }
      .signal-text small { color: var(--text-3); font-size: 12px; display: block; margin-top: 4px; }

      .chart-panel { background: var(--bg-2); border: 1px solid var(--line); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 16px; position: sticky; top: 80px; }
      .chart-panel-head { display: flex; justify-content: space-between; align-items: center; }
      .chart-panel-head h3 { font-family: 'Geist', sans-serif; font-size: 14px; font-weight: 500; color: var(--text); }
      .chart-panel-head .pill-tag { font-family: 'Geist Mono', monospace; font-size: 10px; padding: 2px 8px; border: 1px solid var(--line); border-radius: 4px; color: var(--text-3); letter-spacing: 0.06em; }
      .chart-main { height: 240px; }
      .chart-main svg { width: 100%; height: 100%; display: block; }
      .chart-radar { height: 280px; display: flex; align-items: center; justify-content: center; }
      .chart-radar svg { width: 100%; height: 100%; max-width: 280px; }
      .chart-legend { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .chart-legend .lg { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-2); }
      .chart-legend .lg-dot { width: 8px; height: 8px; border-radius: 50%; }
      .chart-summary { padding-top: 14px; border-top: 1px solid var(--line); }
      .chart-summary h4 { font-family: 'Geist', sans-serif; font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 6px; }
      .chart-summary p { font-size: 13px; color: var(--text-2); line-height: 1.5; }
      .chart-actions { display: flex; gap: 8px; padding-top: 8px; }

      /* Comparable transactions table */
      .comp-table { width: 100%; border-collapse: collapse; }
      .comp-table th, .comp-table td { padding: 10px 8px; text-align: left; font-size: 12px; border-bottom: 1px solid var(--line); }
      .comp-table th { font-family: 'Geist Mono', monospace; font-size: 10px; color: var(--text-3); letter-spacing: 0.08em; text-transform: uppercase; font-weight: 500; }
      .comp-table td { color: var(--text-2); }
      .comp-table td.up { color: var(--good); font-family: 'Geist Mono', monospace; }
      .comp-table td.down { color: var(--warn); font-family: 'Geist Mono', monospace; }

      /* "How it works" cards */
      .how-section { padding: 100px 0; border-top: 1px solid var(--line); background: var(--bg-2); }
      .how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 32px; }
      .how-card { background: var(--bg); border: 1px solid var(--line); border-radius: 14px; padding: 24px; }
      .how-num { font-family: 'Instrument Serif', serif; font-size: 48px; line-height: 1; color: var(--accent); margin-bottom: 14px; }
      .how-card h3 { font-size: 17px; font-weight: 500; margin-bottom: 10px; letter-spacing: -0.01em; color: var(--text); font-family: 'Geist', sans-serif; }
      .how-card p { color: var(--text-2); font-size: 13px; line-height: 1.6; }

      @media (max-width: 1000px) {
        .tool-banner-grid { grid-template-columns: 1fr; }
        .tool-results-grid { grid-template-columns: 1fr; }
        .form-drawer-grid { grid-template-columns: 1fr; }
        .chart-panel { position: static; }
        .how-grid { grid-template-columns: 1fr; }
      }
    `}</style>
  );
}
