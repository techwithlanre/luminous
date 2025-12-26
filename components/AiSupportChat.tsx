import React, { useEffect, useRef, useState } from 'react';
import { Loader2, MessageCircle, Send, X } from 'lucide-react';
import { askAiSupport, type ChatMessage } from '../src/lib/aiSupport';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: 'assistant',
    content:
      "Hi — I'm Cloudom Systems AI Support. Ask me about services, pricing, the blog, or careers.",
  },
];

function formatAssistantText(text: string): string {
  let out = String(text ?? '');
  out = out.replace(/\r\n/g, '\n');
  out = out.replace(/\b(based on|from)\s+(the\s+)?(provided\s+)?context\b[:,]?\s*/gi, '');
  out = out.replace(/\b(based on|from)\s+our\s+context\b[:,]?\s*/gi, '');
  out = out.replace(/\b(in|from)\s+this\s+context\b[:,]?\s*/gi, '');
  out = out.replace(/\*\*(.+?)\*\*/g, '$1');
  out = out.replace(/`{1,3}([^`]+?)`{1,3}/g, '$1');
  out = out.replace(/^\s*[-*]\s+/gm, '• ');
  out = out.replace(/^\s*(\d+)[.)]\s+/gm, '$1. ');
  out = out.replace(/\n{3,}/g, '\n\n');
  return out.trim();
}

const AiSupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isSending, setIsSending] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const requestSeq = useRef(0);

  useEffect(() => {
    if (!isOpen) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [isOpen, messages.length]);

  const send = async () => {
    const text = input.trim();
    if (!text || isSending) return;

    const nextMessages = [...messages, { role: 'user', content: text } as ChatMessage];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);

    const seq = ++requestSeq.current;
    try {
      const reply = await askAiSupport({ messages: nextMessages, pageUrl: window.location.href });
      if (requestSeq.current !== seq) return;
      setMessages((prev) => [...prev, { role: 'assistant', content: formatAssistantText(reply) }]);
    } catch (e: any) {
      if (requestSeq.current !== seq) return;
      const fallback =
        typeof e?.message === 'string' && e.message.trim()
          ? e.message.trim()
          : 'AI support is temporarily unavailable.';
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: formatAssistantText(`${fallback} You can also reach us at hello@cloudomsystems.com.`),
        },
      ]);
    } finally {
      if (requestSeq.current === seq) setIsSending(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-[120] w-[92vw] max-w-sm h-[520px] bg-black/75 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
          role="dialog"
          aria-modal="false"
          aria-label="AI Support Chat"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/30">
            <div className="min-w-0">
              <div className="text-sm font-bold text-white font-heading truncate">AI Support</div>
              <div className="text-xs text-gray-400 truncate">Ask about Cloudom Systems</div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={listRef} className="h-[392px] overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-2 text-[13px] leading-6 border break-words whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-primary/20 border-primary/30 text-white'
                      : 'bg-white/5 border-white/10 text-gray-100'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-2 text-sm border bg-white/5 border-white/10 text-gray-200 flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  <span>Thinking…</span>
                </div>
              </div>
            )}
          </div>

          <div className="px-3 py-3 border-t border-white/10 bg-black/30">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                placeholder="Type your question…"
                className="flex-1 resize-none rounded-2xl bg-surface border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/60"
                rows={1}
                aria-label="Message"
              />
              <button
                type="button"
                onClick={() => void send()}
                disabled={isSending || !input.trim()}
                className="shrink-0 h-11 w-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-2 text-[11px] text-gray-500 px-1">
              Press Enter to send, Shift+Enter for a new line
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[120] h-12 w-12 rounded-full bg-primary text-white shadow-[0_16px_40px_rgba(255,77,0,0.35)] hover:bg-primary-dark transition-colors flex items-center justify-center"
        aria-label={isOpen ? 'Close AI Support chat' : 'Open AI Support chat'}
      >
        <MessageCircle size={22} />
      </button>
    </>
  );
};

export default AiSupportChat;
