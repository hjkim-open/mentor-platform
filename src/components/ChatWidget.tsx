import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, MessageCircle, Bot, ChevronDown } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `당신은 MentorConnect의 AI 코칭멘토 매칭 상담사입니다. 대한민국 스타트업 창업자들이 자신에게 맞는 코칭멘토를 찾을 수 있도록 전문적으로 도와주세요.

[플랫폼 정보]
- 20명의 검증된 전문 코칭멘토 (각 분야 대한민국 최고 전문가)
- 코칭멘토 분야: 투자/VC, B2B SaaS, 마케팅/그로스, CTO/기술, 글로벌 진출, 법무/세무, 조직문화/HR, 커머스, 핀테크 등
- 제공 서비스: 1:1 코칭, IR 피칭 덱 리뷰, 전략 자문, VC/파트너 네트워크 연결
- 프로세스: 신청서 제출 → 48시간 내 매칭 → 첫 코칭 세션
- 누적 멘티 500+, 평균 평점 4.9, 멘티 재등록률 94%

[상담 방식]
1. 창업 단계(아이디어/MVP/성장/스케일업)와 주요 고민을 파악하세요
2. 필요한 도움의 종류(자금조달/기술/마케팅/팀빌딩/해외진출 등)를 확인하세요
3. 적합한 코칭멘토 카테고리와 상담 방향을 추천하세요
4. 신청 유도 시 자연스럽게 페이지 상단의 '코칭멘토 매칭 신청' 버튼을 안내하세요

한국어로 친근하고 전문적으로 답변하세요. 답변은 2-4문장으로 간결하게 해주세요.`;

const QUICK_REPLIES = [
  '투자 유치가 막막해요',
  '기술 팀 구성이 필요해요',
  '해외 진출을 준비 중이에요',
  '마케팅 전략이 필요해요',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '안녕하세요! MentorConnect AI 상담사입니다 👋\n어떤 분야의 코칭멘토링이 필요하신가요? 창업 단계와 고민을 말씀해 주시면 딱 맞는 코칭멘토를 찾아드릴게요.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, minimized]);

  const send = useCallback(async (text?: string) => {
    const userMsg = (text ?? input).trim();
    if (!userMsg || loading) return;
    setInput('');
    const next: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'MentorConnect',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...next,
          ],
          max_tokens: 400,
          temperature: 0.7,
        }),
      });
      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content ??
        '죄송합니다, 잠시 후 다시 시도해 주세요.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '연결에 문제가 생겼어요. 잠시 후 다시 시도해 주세요.' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, messages, loading]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const showQuickReplies = messages.length === 1;

  return (
    <>
      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-5 z-50 w-[360px] flex flex-col rounded-2xl bg-[#141414] border border-white/10 shadow-2xl shadow-black/60 transition-all duration-300 origin-bottom-right ${
          open ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-90 opacity-0 pointer-events-none'
        } ${minimized ? 'h-[60px]' : 'h-[520px]'}`}
        style={{ maxHeight: 'calc(100vh - 120px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 bg-green-500 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-300 rounded-full border-2 border-green-500" />
            </div>
            <div>
              <div className="text-white font-bold text-[13px] leading-tight">AI 코칭멘토 상담</div>
              <div className="text-green-100 text-[11px]">보통 즉시 응답</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMinimized((v) => !v)}
              className="w-7 h-7 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors text-white/80 hover:text-white"
            >
              <ChevronDown size={16} className={`transition-transform ${minimized ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors text-white/80 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!minimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mb-0.5">
                      <Bot size={12} className="text-green-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-green-500 text-white rounded-2xl rounded-br-md'
                        : 'bg-[#202020] text-gray-300 border border-white/8 rounded-2xl rounded-bl-md'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Quick replies */}
              {showQuickReplies && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-green-500/30 text-green-400 text-[11px] font-medium hover:bg-green-500/10 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {loading && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot size={12} className="text-green-400" />
                  </div>
                  <div className="bg-[#202020] border border-white/8 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '120ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '240ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-white/8 flex-shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 bg-[#1e1e1e] border border-white/10 rounded-xl px-4 py-2.5 text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 transition-colors"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-xl bg-green-500 hover:bg-green-400 disabled:bg-white/10 disabled:text-gray-600 flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <Send size={15} className="text-white" />
                </button>
              </div>
              <p className="text-center text-gray-700 text-[10px] mt-2">Powered by MentorConnect AI</p>
            </div>
          </>
        )}
      </div>

      {/* Floating button */}
      <button
        onClick={() => {
          setOpen((v) => !v);
          setMinimized(false);
        }}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 shadow-xl shadow-green-500/30 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <div className="relative">
          {open ? (
            <X size={22} className="text-white" />
          ) : (
            <>
              <MessageCircle size={22} className="text-white" />
              {hasUnread && (
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-green-500" />
              )}
            </>
          )}
        </div>
      </button>
    </>
  );
}
