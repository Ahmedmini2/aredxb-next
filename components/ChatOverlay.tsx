'use client';

import { useEffect, useRef, useState } from 'react';
import { useChat, type UIMessage } from './ChatContext';
import ChatProjectCard from './ChatProjectCard';
import type { ChatCard } from '@/lib/chat';

export default function ChatOverlay() {
  const { mode } = useChat();
  return (
    <>
      {(mode === 'full' || mode === 'widget') && <ChatSurface variant={mode} />}
      {mode === 'minimized' && <DockedIcon />}
    </>
  );
}

function DockedIcon() {
  const { openWidget } = useChat();
  return (
    <button type="button" className="aa-chat-dock" aria-label="Open Ask Alpha" onClick={openWidget}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
      <span className="aa-chat-dock-label">Ask Alpha</span>
    </button>
  );
}

function ChatSurface({ variant }: { variant: 'full' | 'widget' }) {
  const { messages, sending, send, minimize, close, newChat, open, openWidget } = useChat();
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Autoscroll to bottom on new messages.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length, sending]);

  // Focus the input when surface mounts.
  useEffect(() => {
    inputRef.current?.focus();
  }, [variant]);

  // ESC minimizes from full view.
  useEffect(() => {
    if (variant !== 'full') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') minimize();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [variant, minimize]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    setDraft('');
    void send(text);
  }

  const isFull = variant === 'full';
  const isEmpty = messages.length === 0;

  return (
    <div className={`aa-chat-shell aa-chat-${variant}`} role="dialog" aria-modal={isFull} aria-label="Ask Alpha">
      <header className="aa-chat-head">
        <div className="aa-chat-head-title">
          <span className="aa-chat-dot" />
          <span>Ask Alpha</span>
        </div>
        <div className="aa-chat-head-actions">
          <button type="button" className="aa-chat-icon-btn" onClick={newChat} title="New chat" aria-label="New chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          {isFull ? (
            <button type="button" className="aa-chat-icon-btn" onClick={openWidget} title="Pop into corner" aria-label="Switch to widget">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17v4h4M21 7V3h-4M14 10l7-7M10 14l-7 7" />
              </svg>
            </button>
          ) : (
            <button type="button" className="aa-chat-icon-btn" onClick={() => open()} title="Fullscreen" aria-label="Fullscreen">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7V3h4M21 7V3h-4M3 17v4h4M21 17v4h-4" />
              </svg>
            </button>
          )}
          <button type="button" className="aa-chat-icon-btn" onClick={minimize} title="Minimize" aria-label="Minimize">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
            </svg>
          </button>
          <button type="button" className="aa-chat-icon-btn" onClick={close} title="Close" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </header>

      <div className="aa-chat-scroll" ref={scrollRef}>
        {isEmpty ? (
          <EmptyState variant={variant} onPick={(t) => { setDraft(t); inputRef.current?.focus(); }} />
        ) : (
          <div className="aa-chat-list">
            {messages.map((m) => <MessageRow key={m.id} m={m} />)}
            {sending && messages[messages.length - 1]?.role === 'user' && <TypingBubble />}
          </div>
        )}
      </div>

      <form className="aa-chat-composer" onSubmit={onSubmit}>
        <textarea
          ref={inputRef}
          className="aa-chat-input"
          rows={1}
          placeholder="Ask Alpha anything about Dubai property…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSubmit(e as unknown as React.FormEvent);
            }
          }}
        />
        <button type="submit" className="aa-chat-send" disabled={!draft.trim() || sending} aria-label="Send">
          {sending ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="9" opacity="0.3" /><path d="M21 12a9 9 0 0 0-9-9"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.9s" repeatCount="indefinite" /></path></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}

function EmptyState({ variant, onPick }: { variant: 'full' | 'widget'; onPick: (s: string) => void }) {
  const suggestions = [
    'Find me 1BR off-plan units in JVC under AED 900K',
    'Compare 5-year capital appreciation between Marina and Business Bay',
    'Best beachfront units under AED 5M with net yield above 7%',
    'What\'s the ideal exit window for a 2BR Sobha Hartland unit bought in 2024?',
  ];
  return (
    <div className={`aa-chat-empty aa-chat-empty-${variant}`}>
      <h2>Ask Alpha anything.</h2>
      <p>Live Dubai inventory, comps, yields and capital-appreciation curves — one conversation away.</p>
      <div className="aa-chat-suggest">
        {suggestions.map((s, i) => (
          <button key={i} type="button" className="aa-chat-suggest-btn" onClick={() => onPick(s)}>{s}</button>
        ))}
      </div>
    </div>
  );
}

function MessageRow({ m }: { m: UIMessage }) {
  return (
    <div className={`aa-msg aa-msg-${m.role}`}>
      <div className="aa-msg-avatar">{m.role === 'user' ? 'You' : 'α'}</div>
      <div className="aa-msg-body">
        {m.pending ? <TypingDots /> : <div className="aa-msg-text">{m.content}</div>}
        {m.cards && m.cards.length > 0 && <CardStack cards={m.cards} />}
      </div>
    </div>
  );
}

function CardStack({ cards }: { cards: ChatCard[] }) {
  // Collect every project across all cards in this message into one row.
  const projects = cards.flatMap((c) => {
    if (c.type === 'project_list') return c.items;
    if (c.type === 'project_detail') return [c.project];
    return [];
  });
  const others = cards.filter((c) => c.type !== 'project_list' && c.type !== 'project_detail');

  return (
    <>
      {projects.length > 0 && (
        <div className="aa-card-row">
          {projects.map((p, i) => <ChatProjectCard key={(p.id ?? i) + '-' + i} project={p} />)}
        </div>
      )}
      {others.length > 0 && (
        <div className="aa-msg-cards">
          {others.map((c, i) => (
            <div key={i} className="aa-msg-card">
              <div className="aa-msg-card-type">{c.type.replace(/_/g, ' ')}</div>
              <pre>{JSON.stringify(c, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function TypingBubble() {
  return (
    <div className="aa-msg aa-msg-assistant">
      <div className="aa-msg-avatar">α</div>
      <div className="aa-msg-body"><TypingDots /></div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="aa-typing"><span /><span /><span /></div>
  );
}
