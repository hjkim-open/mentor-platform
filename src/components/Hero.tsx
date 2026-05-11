import { useState } from 'react';
import { Search, Play } from 'lucide-react';
import { useMentors } from '../contexts/MentorContext';

const PHOTO_COLORS = [
  { bg: 'bg-orange-500',  shape: 'rounded-[2rem]',   size: 'col-span-1 row-span-2' },
  { bg: 'bg-yellow-400',  shape: 'rounded-full',     size: 'col-span-1 row-span-1' },
  { bg: 'bg-emerald-400', shape: 'rounded-[1.5rem]', size: 'col-span-1 row-span-1' },
  { bg: 'bg-pink-400',    shape: 'rounded-[2rem]',   size: 'col-span-1 row-span-2' },
  { bg: 'bg-cyan-400',    shape: 'rounded-full',     size: 'col-span-1 row-span-1' },
  { bg: 'bg-violet-500',  shape: 'rounded-[1.5rem]', size: 'col-span-1 row-span-1' },
];

export default function Hero() {
  const { mentors } = useMentors();
  const [query, setQuery] = useState('');

  const heroMentors = mentors.slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById('mentors')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#141414] pt-20">
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-green-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-yellow-400/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">

          {/* Left */}
          <div className="order-2 lg:order-1">
            {/* 토스식 label chip */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-bold mb-7 tracking-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              TOP 20 코칭 멘토
            </div>

            {/* 토스 스타일 헤딩: 두껍고 타이트한 트래킹, 무조건 sans */}
            <h1 className="text-[52px] lg:text-[64px] xl:text-[72px] font-extrabold tracking-[-0.04em] leading-[1.1] text-white mb-5">
              올바른 멘토와<br />
              <span className="text-green-400">연결하세요.</span>
            </h1>

            <p className="text-[17px] text-gray-400 leading-[1.7] mb-10 max-w-[420px] tracking-[-0.01em]">
              유니콘 창업자, 글로벌 VC, 시리얼 엔트레프레너까지.
              당신의 스타트업 여정에 꼭 맞는 멘토를 찾아드립니다.
            </p>

            {/* 토스 스타일 CTA + 검색 */}
            <form onSubmit={handleSearch} className="flex gap-2.5 mb-8 max-w-[440px]">
              {/* 토스 메인 CTA: 단색, 굵은 텍스트, 둥근 모서리, 그라디언트·아이콘 없음 */}
              <button
                type="submit"
                className="flex-shrink-0 px-6 py-3.5 rounded-2xl bg-green-500 hover:bg-green-400 active:bg-green-600 text-white font-bold text-[15px] tracking-[-0.02em] transition-colors"
              >
                멘토 찾기
              </button>
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="분야, 이름으로 검색..."
                  className="w-full pl-9 pr-4 py-3.5 rounded-2xl bg-[#202020] border border-white/8 text-white placeholder-gray-600 text-[14px] tracking-[-0.01em] focus:outline-none focus:border-green-500/40 transition-colors"
                />
              </div>
            </form>

            {/* 부가 CTA: 테두리 없는 텍스트 링크 스타일 (토스식) */}
            <button className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-[#202020] flex items-center justify-center group-hover:bg-[#2a2a2a] transition-colors">
                <Play size={14} className="text-yellow-400 ml-0.5" fill="currentColor" />
              </div>
              <div className="text-left">
                <p className="text-gray-600 text-xs tracking-tight">멘토링 프로세스</p>
                <p className="text-white text-sm font-bold tracking-[-0.02em]">영상으로 확인하기</p>
              </div>
            </button>
          </div>

          {/* Right — photo mosaic */}
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-yellow-400/10 blur-2xl animate-float pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-green-500/10 blur-2xl animate-float pointer-events-none" style={{ animationDelay: '3s' }} />

            <div className="grid grid-cols-2 gap-3 h-[520px]">
              {heroMentors.map((mentor, i) => {
                const s = PHOTO_COLORS[i % PHOTO_COLORS.length];
                return (
                  <div key={mentor.id}
                    className={`relative ${s.size} ${s.shape} ${s.bg} overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-[1.03]`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/25 text-5xl font-extrabold tracking-[-0.05em] select-none">{mentor.initials}</span>
                    </div>
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-3 text-center">
                      <p className="text-white font-bold text-sm tracking-[-0.02em]">{mentor.name}</p>
                      <p className="text-white/60 text-xs mt-0.5 line-clamp-2">{mentor.title}</p>
                      <span className="mt-2 px-2.5 py-1 rounded-xl bg-green-500 text-white text-xs font-bold tracking-tight">
                        {mentor.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating cards */}
            <div className="absolute -left-6 bottom-16 bg-[#1e1e1e] rounded-2xl px-4 py-3 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                  <span className="text-green-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white text-sm font-bold tracking-[-0.02em]">500+ 창업자</p>
                  <p className="text-gray-500 text-xs tracking-tight">누적 멘티</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 top-20 bg-[#1e1e1e] rounded-2xl px-4 py-3 shadow-2xl text-center">
              <p className="text-yellow-400 text-xl font-extrabold tracking-[-0.03em]">4.9★</p>
              <p className="text-gray-500 text-xs tracking-tight">평균 평점</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
