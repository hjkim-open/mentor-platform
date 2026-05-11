import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState({
    name: '',
    company: '',
    stage: '',
    goal: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const stages = ['아이디어 단계', '프리시드', '시드', 'Series A', 'Series B+'];
  const goals = [
    '투자 유치',
    '기술 전략',
    '그로스/마케팅',
    '프로덕트 전략',
    '팀 빌딩',
    '글로벌 진출',
    '운영 최적화',
    '엑싯 전략',
  ];

  return (
    <section id="contact" className="py-24 bg-[#080810]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-5">
            코칭멘토 매칭 신청
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            지금 바로 시작하세요
          </h2>
          <p className="text-gray-400 text-lg">
            간단한 정보를 입력하시면 24시간 내에 담당자가 연락드립니다.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-16 bg-[#1a1a1a] rounded-2xl border border-white/8">
            <CheckCircle size={56} className="text-green-400 mx-auto mb-5" />
            <h3 className="text-white text-2xl font-bold mb-3">신청이 완료되었습니다!</h3>
            <p className="text-gray-400">
              영업일 기준 24시간 내에{' '}
              <span className="text-green-400 font-medium">{form.email}</span>로 연락드리겠습니다.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-8 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">이름 *</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">회사/서비스명 *</label>
                <input
                  required
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="(주) 스타트업"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">현재 단계 *</label>
              <div className="flex flex-wrap gap-2">
                {stages.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setForm({ ...form, stage: s })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      form.stage === s
                        ? 'bg-green-500 text-white border border-green-500'
                        : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">코칭 받고 싶은 분야 * (복수 선택 가능)</label>
              <div className="flex flex-wrap gap-2">
                {goals.map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => {
                      const list = form.goal.split(',').filter(Boolean);
                      const exists = list.includes(g);
                      const next = exists ? list.filter((x) => x !== g) : [...list, g];
                      setForm({ ...form, goal: next.join(',') });
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      form.goal.includes(g)
                        ? 'bg-green-500 text-white border border-green-500'
                        : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">이메일 *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="hello@startup.kr"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-green-500 hover:bg-indigo-500 text-white font-semibold text-base transition-all duration-200 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            >
              <Send size={18} />
              매칭 신청하기
            </button>

            <p className="text-center text-gray-600 text-xs">
              제출 시 개인정보 처리방침에 동의하는 것으로 간주됩니다.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
