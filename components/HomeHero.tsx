'use client';

import { useEffect, useRef, useState } from 'react';
import HomeCarousel from './HomeCarousel';
import { useChat } from './ChatContext';

const SEARCH_PROMPTS = [
  'Hey Alpha, find me 1BR off-plan in JVC under AED 900K…',
  'Hey Alpha, what’s the optimal exit window for my Sobha Hartland 2BR?',
  'Hey Alpha, compare net yield in Marina vs Business Bay…',
  'Hey Alpha, which Damac Lagoons clusters are flipping fastest?',
  'Hey Alpha, run the Launch Timing Analyser on the next Emaar release.',
];

const ROTOR_WORDS = ['Rental Yields', 'Off-Plan Launches', 'Service Charges', 'Capital Appreciation', 'Flip Windows', 'Exit Strategy', 'DLD Comps', 'Golden Visa Units', 'STR Income'];

const TX_ITEMS = [
  { name: 'Damac Lagoons 2BR', price: '2.7M AED', dir: 1, change: '+12.4%' },
  { name: 'Marina 1BR', price: '1.45M AED', dir: 1, change: '+3.2%' },
  { name: 'Palm Jumeirah Villa', price: '18.5M AED', dir: 1, change: '+6.8%' },
  { name: 'JVC Studio', price: '685K AED', dir: -1, change: '-1.8%' },
  { name: 'Business Bay 2BR', price: '1.95M AED', dir: 1, change: '+8.1%' },
  { name: 'Downtown Penthouse', price: '12.4M AED', dir: -1, change: '-2.4%' },
  { name: 'DAMAC Hills 4BR Villa', price: '4.85M AED', dir: 1, change: '+9.2%' },
  { name: 'Arabian Ranches Townhouse', price: '3.2M AED', dir: 1, change: '+5.4%' },
  { name: 'Sobha Hartland 1BR', price: '1.18M AED', dir: 1, change: '+4.6%' },
  { name: 'Bluewaters Penthouse', price: '14.2M AED', dir: -1, change: '-0.9%' },
  { name: 'Tilal Al Ghaf Townhouse', price: '3.95M AED', dir: 1, change: '+11.3%' },
  { name: 'Dubai South Studio', price: '420K AED', dir: 1, change: '+2.7%' },
  { name: 'Emaar Beachfront 3BR', price: '6.1M AED', dir: 1, change: '+7.5%' },
  { name: 'JLT 1BR', price: '950K AED', dir: -1, change: '-1.2%' },
  { name: 'MBR City 2BR', price: '2.35M AED', dir: 1, change: '+5.9%' },
];

export default function HomeHero() {
  const [rotor, setRotor] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Rotor (typewriter) animation
  useEffect(() => {
    const t = setTimeout(() => {
      const w = ROTOR_WORDS[idx];
      if (!deleting) {
        if (charIdx < w.length) {
          setRotor(w.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        if (charIdx > 0) {
          setRotor(w.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setIdx((i) => (i + 1) % ROTOR_WORDS.length);
        }
      }
    }, deleting ? 35 : 75);
    return () => clearTimeout(t);
  }, [charIdx, deleting, idx]);

  // Search placeholder cycle
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    let i = 0, c = 0, del = false;
    let timer: ReturnType<typeof setTimeout>;
    function tick() {
      const inp = inputRef.current;
      if (!inp) return;
      const p = SEARCH_PROMPTS[i];
      if (!del) {
        c++;
        inp.placeholder = p.slice(0, c);
        if (c === p.length) { del = true; timer = setTimeout(tick, 2000); return; }
      } else {
        c -= 2; if (c < 0) c = 0;
        inp.placeholder = p.slice(0, c);
        if (c === 0) { del = false; i = (i + 1) % SEARCH_PROMPTS.length; }
      }
      timer = setTimeout(tick, del ? 18 : 38);
    }
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  // Wire submit → open chat. Hero is an entry point — always start fresh.
  // Past chats remain reachable from the dock icon / future sidebar.
  const { open, newChat } = useChat();
  function submit() {
    const inp = inputRef.current;
    const v = (inp?.value || '').trim();
    if (!v) return;
    if (inp) inp.value = '';
    newChat();
    open(v);
  }

  // Ask Alpha hover GIF state (for slide-in)
  const askWrapRef = useRef<HTMLSpanElement | null>(null);
  const [alphaSrc, setAlphaSrc] = useState<string | undefined>(undefined);
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  function onEnter() {
    if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    setAlphaSrc('/images/alpha.gif?t=' + Date.now());
  }
  function onLeave() {
    clearTimerRef.current = setTimeout(() => setAlphaSrc(undefined), 450);
  }

  return (
    <header className="hero">
      <div className="hero-bg" />
      <div className="hero-dots" />
      <div className="container hero-inner">
        <div className="tx-ticker">
          <span className="tx-ticker-label"><span className="live-dot" />Transactions Index</span>
          <div className="tx-ticker-mask">
            <div className="tx-ticker-track">
              {TX_ITEMS.concat(TX_ITEMS).map((it, i) => (
                <span key={i} className="tx-item">
                  <span className="tx-name">{it.name}</span>{' '}
                  <span className="tx-price">{it.price}</span>{' '}
                  <span className={it.dir > 0 ? 'tx-up' : 'tx-down'}>{it.change}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <h1 className="hero-title">Find <em>winning properties</em><br />in seconds, not weeks.</h1>
        <div className="hero-rotor-line">Your AI property analyst for <strong className="rotor">{rotor}</strong></div>

        <form className="search-card" onSubmit={(e) => { e.preventDefault(); submit(); }}>
          <div className="search-input-wrap">
            <input
              ref={inputRef}
              className="search-input"
              id="searchInput"
              placeholder=""
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
            />
          </div>
          <div className="search-bottom">
            <div className="search-actions">
              <button type="button" className="icon-btn" aria-label="Voice">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4" /></svg>
              </button>
              <span className="ask-btn-wrap" ref={askWrapRef} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                <span className="alpha-mask" aria-hidden="true">
                  {alphaSrc && <img className="alpha-gif" alt="" src={alphaSrc} />}
                  {!alphaSrc && <span className="alpha-gif" />}
                </span>
                <button type="submit" className="ask-btn" aria-label="Ask Alpha">
                  Ask Alpha
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                </button>
              </span>
            </div>
          </div>
        </form>

        <HomeCarousel />
      </div>
    </header>
  );
}
