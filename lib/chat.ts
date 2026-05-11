// Client for the Ask Alpha Python backend.
// All chat persistence lives on the backend — this module is stateless.

export const CHAT_API_BASE =
  process.env.NEXT_PUBLIC_CHAT_API_URL || 'http://localhost:8000';

export type ProjectListItem = {
  id: number;
  name: string;
  developer: string | null;
  city: string | null;
  region: string | null;
  district: string | null;
  country: string | null;
  sale_status: string | null;
  status: string | null;
  completion_quarter: string | null;
  min_price: number | null;
  max_price: number | null;
  currency: string | null;
  short_description: string | null;
  units_count: number | null;
  cover_image_url?: string | null;
};

export type ProjectListCard = {
  type: 'project_list';
  items: ProjectListItem[];
};

export type ProjectDetailCard = {
  type: 'project_detail';
  project: ProjectListItem & {
    description?: string | null;
    cover_image_url?: string | null;
    units_summary?: Array<{
      unit_type?: string | null;
      bedrooms?: number | null;
      size?: number | null;
      price?: number | null;
      layout_name?: string | null;
      status?: string | null;
    }> | null;
  };
};

export type DocumentQuotesCard = {
  type: 'document_quotes';
  [k: string]: unknown;
};

export type ChatCard = ProjectListCard | ProjectDetailCard | DocumentQuotesCard;

export type ChatTurn = {
  reply: string;
  model: string;
  channel: 'website';
  conversation_id: string;
  message_id: number;
  cards?: ChatCard[];
};

export type StoredMessage = {
  id: number;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  cards: ChatCard[] | null;
  created_at: string;
};

export type ConversationRow = {
  id: string;
  user_id: string | null;
  title: string | null;
  project_id: number | null;
  created_at: string;
  updated_at: string;
};

export async function sendChat(args: {
  message: string;
  conversationId?: string | null;
  userId?: string | null;
  signal?: AbortSignal;
}): Promise<ChatTurn> {
  const r = await fetch(`${CHAT_API_BASE}/v1/chat`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      message: args.message,
      conversation_id: args.conversationId ?? null,
      user_id: args.userId ?? null,
      channel: 'website',
    }),
    signal: args.signal,
  });
  if (!r.ok) {
    const text = await r.text().catch(() => '');
    throw new Error(`Chat API ${r.status}: ${text || r.statusText}`);
  }
  return r.json();
}

export async function fetchConversationMessages(
  conversationId: string,
  signal?: AbortSignal,
): Promise<StoredMessage[]> {
  const r = await fetch(
    `${CHAT_API_BASE}/v1/conversations/${encodeURIComponent(conversationId)}/messages`,
    { signal },
  );
  if (!r.ok) {
    if (r.status === 404) return [];
    throw new Error(`Get messages ${r.status}`);
  }
  return r.json();
}

export async function listConversations(
  userId: string,
  signal?: AbortSignal,
): Promise<ConversationRow[]> {
  const r = await fetch(
    `${CHAT_API_BASE}/v1/conversations?user_id=${encodeURIComponent(userId)}`,
    { signal },
  );
  if (!r.ok) throw new Error(`List conversations ${r.status}`);
  return r.json();
}
