'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { fetchConversationMessages, sendChat, type ChatCard, type StoredMessage } from '@/lib/chat';

export type ChatMode = 'closed' | 'full' | 'widget' | 'minimized';

export type UIMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  cards?: ChatCard[] | null;
  pending?: boolean;
};

type ChatState = {
  mode: ChatMode;
  conversationId: string | null;
  messages: UIMessage[];
  sending: boolean;
  error: string | null;
};

type ChatActions = {
  open: (initialMessage?: string) => void;
  openWidget: () => void;
  minimize: () => void;
  close: () => void;
  send: (text: string) => Promise<void>;
  newChat: () => void;
};

const ChatCtx = createContext<(ChatState & ChatActions) | null>(null);

const LS_KEY = 'aa-chat-conversation-id';

function tempId() {
  return 'tmp-' + Math.random().toString(36).slice(2, 10);
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ChatMode>('closed');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Hydrate conversation id from localStorage on mount.
  useEffect(() => {
    try {
      const id = localStorage.getItem(LS_KEY);
      if (id) setConversationId(id);
    } catch {}
  }, []);

  // Persist conversation id whenever it changes.
  useEffect(() => {
    try {
      if (conversationId) localStorage.setItem(LS_KEY, conversationId);
      else localStorage.removeItem(LS_KEY);
    } catch {}
  }, [conversationId]);

  // When mode goes from 'closed' to a visible state and we have a conversationId
  // but no loaded messages, fetch the history once.
  useEffect(() => {
    if (mode === 'closed') return;
    if (!conversationId) return;
    if (messages.length > 0) return;
    const ctrl = new AbortController();
    fetchConversationMessages(conversationId, ctrl.signal)
      .then((rows: StoredMessage[]) => {
        setMessages(
          rows.map((r) => ({
            id: 'srv-' + r.id,
            role: r.role,
            content: r.content,
            cards: r.cards ?? null,
          })),
        );
      })
      .catch(() => {
        // Conversation no longer exists or backend down — start fresh.
        setConversationId(null);
      });
    return () => ctrl.abort();
  }, [mode, conversationId, messages.length]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || sending) return;
      setError(null);
      const userMsg: UIMessage = { id: tempId(), role: 'user', content: trimmed };
      const placeholder: UIMessage = { id: tempId(), role: 'assistant', content: '', pending: true };
      setMessages((m) => [...m, userMsg, placeholder]);
      setSending(true);
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        const res = await sendChat({
          message: trimmed,
          conversationId,
          userId: null, // wired in Stage 3 (auth)
          signal: ctrl.signal,
        });
        if (res.conversation_id && res.conversation_id !== conversationId) {
          setConversationId(res.conversation_id);
        }
        setMessages((m) =>
          m.map((x) =>
            x.id === placeholder.id
              ? {
                  id: 'srv-' + res.message_id,
                  role: 'assistant',
                  content: res.reply,
                  cards: res.cards ?? null,
                }
              : x,
          ),
        );
      } catch (e: any) {
        if (e?.name === 'AbortError') {
          setMessages((m) => m.filter((x) => x.id !== placeholder.id));
        } else {
          const msg = e?.message || 'Something went wrong.';
          setError(msg);
          setMessages((m) =>
            m.map((x) =>
              x.id === placeholder.id ? { ...x, content: '⚠ ' + msg, pending: false } : x,
            ),
          );
        }
      } finally {
        setSending(false);
        abortRef.current = null;
      }
    },
    [conversationId, sending],
  );

  const open = useCallback(
    (initialMessage?: string) => {
      setMode('full');
      if (initialMessage && initialMessage.trim()) {
        // Fire-and-forget — `send` handles its own state.
        void send(initialMessage);
      }
    },
    [send],
  );

  const openWidget = useCallback(() => setMode('widget'), []);
  const minimize = useCallback(() => setMode('minimized'), []);
  const close = useCallback(() => {
    abortRef.current?.abort();
    setMode('closed');
  }, []);

  const newChat = useCallback(() => {
    abortRef.current?.abort();
    setConversationId(null);
    setMessages([]);
    setError(null);
  }, []);

  const value = useMemo<ChatState & ChatActions>(
    () => ({ mode, conversationId, messages, sending, error, open, openWidget, minimize, close, send, newChat }),
    [mode, conversationId, messages, sending, error, open, openWidget, minimize, close, send, newChat],
  );

  return <ChatCtx.Provider value={value}>{children}</ChatCtx.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatCtx);
  if (!ctx) throw new Error('useChat must be used inside <ChatProvider>');
  return ctx;
}
