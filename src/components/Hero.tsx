import { ArrowRight, Star, Users, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#0a0a0f]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          대한민국 TOP 20 창업 코칭 멘토
        </div>

        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
          당신의 스타트업,
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            검증된 멘토와 함께
          </span>
        </h1>

        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
          유니콘 창업자, 글로벌 대기업 리더, 시리얼 엔트레프레너까지.
          <br className="hidden sm:block" />
          한국 최고의 코칭 멘토 20명이 당신의 창업 여정을 함께합니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#mentors"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg transition-all duration-200 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            멘토 둘러보기
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#program"
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 hover:border-white/30 text-gray-300 hover:text-white font-semibold text-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            프로그램 안내
          </a>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {[
            { icon: Users, value: '500+', label: '누적 멘티 창업자' },
            { icon: TrendingUp, value: '$2.3B', label: '멘티 기업 누적 투자유치' },
            { icon: Star, value: '4.9', label: '평균 멘토링 만족도' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/15 flex items-center justify-center">
                <Icon size={20} className="text-indigo-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gray-600 to-transparent" />
      </div>
    </section>
  );
}
