import { Zap, Target, BarChart3, Globe } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const programs = [
  {
    icon: Zap,
    name: '스파크 세션',
    duration: '1회 90분',
    price: '무료',
    description: '특정 문제 해결에 집중한 단발성 집중 코칭. 피칭 연습, 전략 리뷰, 빠른 의사결정 지원.',
    features: ['멘토 1:1 세션', '핵심 문제 집중 논의', '실행 가능한 액션 아이템', '사전 자료 리뷰'],
    highlight: false,
    accentColor: 'bg-orange-500',
  },
  {
    icon: Target,
    name: '런치패드',
    duration: '3개월 프로그램',
    price: '월 50만원',
    description: '초기 스타트업을 위한 집중 코칭. PMF 검증부터 첫 투자 유치까지 전 과정을 함께합니다.',
    features: ['주 1회 1:1 세션 (60분)', '멘토 직접 네트워크 연결', '투자자 IR 리뷰', '슬랙 수시 질문 지원', '월 그룹 세션 참가'],
    highlight: true,
    accentColor: 'bg-green-500',
  },
  {
    icon: BarChart3,
    name: '스케일업',
    duration: '6개월 프로그램',
    price: '월 120만원',
    description: 'Series A 이후 스타트업의 빠른 성장을 위한 전문 코칭. 조직, 전략, 해외 진출까지.',
    features: ['주 2회 1:1 세션', '멀티 멘토 접근 가능', '보드 미팅 준비 지원', '채용 후보자 레퍼런스', '글로벌 네트워크 연결'],
    highlight: false,
    accentColor: 'bg-yellow-400',
  },
  {
    icon: Globe,
    name: '글로벌 패스트트랙',
    duration: '맞춤 설계',
    price: '협의',
    description: '해외 시장 진출을 목표로 하는 스타트업을 위한 특화 프로그램. 현지 멘토와의 연결 포함.',
    features: ['해외 시장별 전문 멘토', '현지 VC/파트너 미팅', '해외 법인 설립 지원', 'JP/SEA/US 네트워크', '글로벌 액셀러레이터 연결'],
    highlight: false,
    accentColor: 'bg-cyan-400',
  },
];

export default function Program() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="program" className="py-24 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-14 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold mb-5 tracking-wider uppercase">
            코칭 프로그램
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">
            단계별 <span className="text-gradient-gold">맞춤 프로그램</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            스타트업의 성장 단계에 맞는 프로그램으로 시작하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {programs.map((prog) => {
            const Icon = prog.icon;
            return (
              <div key={prog.name}
                className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  prog.highlight
                    ? 'bg-[#1a1a1a] border-2 border-green-500/50 shadow-xl shadow-green-500/10'
                    : 'bg-[#1a1a1a] border border-white/8 hover:border-white/15'
                }`}>
                {/* Top color strip */}
                <div className={`h-1 ${prog.accentColor}`} />
                {prog.highlight && (
                  <div className="absolute top-5 right-4 px-2.5 py-1 rounded-full bg-green-500 text-white text-xs font-bold">
                    인기
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className={`w-11 h-11 rounded-xl ${prog.accentColor} flex items-center justify-center shadow-lg mb-5`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{prog.name}</h3>
                  <p className="text-gray-600 text-xs mb-3">{prog.duration}</p>
                  <p className="text-2xl font-bold text-white mb-1">
                    {prog.price}
                    {prog.price !== '무료' && prog.price !== '협의' && (
                      <span className="text-gray-600 text-sm font-normal"> / 월</span>
                    )}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{prog.description}</p>
                  <ul className="space-y-2 flex-1 mb-5">
                    {prog.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-500">
                        <span className="text-green-500 mt-0.5 flex-shrink-0 text-xs">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact"
                    className={`w-full text-center py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                      prog.highlight
                        ? 'bg-green-500 hover:bg-green-400 text-white shadow-lg shadow-green-500/20'
                        : 'border border-white/10 hover:border-white/25 text-gray-400 hover:text-white'
                    }`}>
                    시작하기
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
