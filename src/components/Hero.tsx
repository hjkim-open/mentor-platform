import { useState } from 'react';
import { Search, ArrowRight, Play } from 'lucide-react';
import { useMentors } from '../contexts/MentorContext';

const PHOTO_COLORS = [
  { bg: 'bg-orange-500',   ring: 'ring-orange-400',  shape: 'rounded-[2rem]',   size: 'col-span-1 row-span-2' },
  { bg: 'bg-yellow-400',   ring: 'ring-yellow-300',  shape: 'rounded-full',     size: 'col-span-1 row-span-1' },
  { bg: 'bg-emerald-400',  ring: 'ring-emerald-300', shape: 'rounded-[1.5rem]', size: 'col-span-1 row-span-1' },
  { bg: 'bg-pink-400',     ring: 'ring-pink-300',    shape: 'rounded-[2rem]',   size: 'col-span-1 row-span-2' },
  { bg: 'bg-cyan-400',     ring: 'ring-cyan-300',    shape: 'rounded-full',     size: 'col-span-1 row-span-1' },
  { bg: 'bg-violet-500',   ring: 'ring-violet-400',  shape: 'rounded-[1.5rem]', size: 'col-span-1 row-span-1' },
];

export default function Hero() {
  const { mentors } = useMentors();
  const [query, setQuery] = useState('');

  const heroMentors = mentors.slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const el = document.getElementById('mentors');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#141414] pt-20">
      {/* Decorative blobs */}
      <div className="absolute top-24 left-8 w-12 h-12 rounded-full border-2 border-primary-500 opacity-60" />
      <div className="absolute bottom-32 right-[45%] w-8 h-8 rotate-45 border-2 border-gold-500 opacity-50" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-gold-500/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">

          {/* Left */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/25 text-primary-400 text-xs font-semibold mb-6 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
              TOP 20 코칭 멘토
            </div>

            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl leading-[1.05] mb-6">
              <span className="text-white">올바른 멘토와</span>
              <br />
              <span className="text-gradient-gold">연결하세요.</span>
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
              유니콘 창업자, 글로벌 VC, 시리얼 엔트레프레너까지.<br />
              당신의 스타트업 여정에 꼭 맞는 멘토를 찾아드립니다.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-8 max-w-lg">
              <button
                type="submit"
                className="flex-shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm transition-all glow-green"
              >
                멘토 찾기
                <ArrowRight size={16} />
              </button>
              <div className="relative flex-1">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="분야, 이름으로 검색..."
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-[#202020] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-primary-500/40 transition-colors"
                />
              </div>
            </form>

            {/* Watch demo */}
            <button className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-[#202020] border border-white/10 flex items-center justify-center group-hover:border-gold-500/40 transition-colors">
                <Play size={16} className="text-gold-400 ml-0.5" fill="currentColor" />
              </div>
              <div className="text-left">
                <p className="text-gray-500 text-xs">멘토링 프로세스</p>
                <p className="text-white text-sm font-semibold">영상으로 확인하기</p>
              </div>
            </button>
          </div>

          {/* Right — photo mosaic */}
          <div className="order-1 lg:order-2 relative">
            {/* Large floating decoration */}
            <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-gold-500/15 blur-2xl animate-float" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-primary-500/15 blur-2xl animate-float" style={{ animationDelay: '3s' }} />

            <div className="grid grid-cols-2 gap-3 h-[520px]">
              {heroMentors.map((mentor, i) => {
                const style = PHOTO_COLORS[i % PHOTO_COLORS.length];
                return (
                  <div
                    key={mentor.id}
                    className={`relative ${style.size} ${style.shape} ${style.bg} overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-[1.03]`}
                  >
                    {/* Mentor info overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <div className="text-white/30 font-display text-5xl font-bold mb-2 select-none">
                        {mentor.initials}
                      </div>
                    </div>
                    {/* Hover info */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-3 text-center">
                      <p className="text-white font-bold text-sm">{mentor.name}</p>
                      <p className="text-white/70 text-xs mt-0.5 line-clamp-2">{mentor.title}</p>
                      <span className="mt-2 px-2 py-0.5 rounded-full bg-primary-500/80 text-white text-xs font-medium">
                        {mentor.category}
                      </span>
                    </div>
                    {/* Noise texture overlay */}
                    <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Floating stat card */}
            <div className="absolute -left-6 bottom-16 bg-[#1a1a1a] border border-white/10 rounded-2xl px-4 py-3 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                  <span className="text-primary-400 text-lg font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">500+ 창업자</p>
                  <p className="text-gray-500 text-xs">누적 멘티</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 top-20 bg-[#1a1a1a] border border-white/10 rounded-2xl px-4 py-3 shadow-xl backdrop-blur-sm">
              <div className="text-center">
                <p className="text-gold-400 text-xl font-bold">4.9★</p>
                <p className="text-gray-500 text-xs">평균 평점</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
