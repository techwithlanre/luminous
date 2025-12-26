import { buildContextForQuery } from './siteKnowledge';

export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

type ChatResponse = { text: string };

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed (${res.status})`);
  }
  return (await res.json()) as T;
}

export async function askAiSupport(params: {
  messages: ChatMessage[];
  pageUrl?: string;
}): Promise<string> {
  const lastUser = [...params.messages].reverse().find((m) => m.role === 'user');
  const query = lastUser?.content || '';
  const context = buildContextForQuery(query);

  const out = await postJson<ChatResponse>('/api/chat', {
    messages: params.messages,
    context,
    pageUrl: params.pageUrl || '',
  });
  return out.text;
}
