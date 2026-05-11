import CountUp from './CountUp';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const stats = [
  { value: '500+', label: '누적 멘티 창업자', sub: '국내 각 분야 스타트업' },
  { value: '$2.3B', label: '멘티 기업 누적 투자유치', sub: '시드 ~ Series C' },
  { value: '3.2x', label: '평균 매출 성장률', sub: '코칭 6개월 후 기준' },
  { value: '94%', label: '멘티 재등록률', sub: '프로그램 만족도 기반' },
  { value: '20명', label: '전문 멘토진', sub: '각 분야 최고 전문가' },
  { value: '4.9★', label: '평균 평점', sub: '500+ 리뷰 기준' },
];

const testimonials = [
  {
    quote: '투자자 피칭을 앞두고 IR 덱을 완전히 재구성했어요. 멘토 덕분에 Series A $15M을 클로징할 수 있었습니다.',
    author: '김민준',
    role: 'B2B SaaS 창업자',
    initials: '김민',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    quote: '기술팀을 어떻게 꾸려야 할지 막막했는데, CTO 출신 멘토와 3개월 코칭으로 개발팀 10명을 성공적으로 구성했습니다.',
    author: '이채영',
    role: '핀테크 창업자',
    initials: '이채',
    color: 'from-violet-500 to-pink-500',
  },
  {
    quote: '일본 진출 전략을 세우는 데 현지 시장 경험이 풍부한 멘토의 도움이 절대적이었습니다. 파트너십 5건을 동시에 클로징했어요.',
    author: '박도현',
    role: '커머스 플랫폼 창업자',
    initials: '박도',
    color: 'from-emerald-500 to-cyan-600',
  },
];

export default function Stats() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="stats" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Stats grid */}
        <div ref={ref} className={`text-center mb-20 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-yellow-400 text-sm font-medium mb-5">
            실증된 성과
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            숫자로 증명하는 성과
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-24">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-[#0e0e1a] border border-white/8 hover:border-indigo-500/30 transition-all duration-300 text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">
                <CountUp value={stat.value} />
              </div>
              <div className="text-white text-sm font-semibold mb-1">{stat.label}</div>
              <div className="text-gray-600 text-xs">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white">멘티 후기</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="p-6 rounded-2xl bg-[#0e0e1a] border border-white/8 hover:border-white/15 transition-all duration-300"
            >
              <div className="flex mb-4 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.author}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
