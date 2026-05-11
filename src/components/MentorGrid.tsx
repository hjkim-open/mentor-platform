import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { mentors, categories } from '../data/mentors';
import type { Mentor } from '../data/mentors';
import MentorCard from './MentorCard';
import MentorModal from './MentorModal';

export default function MentorGrid() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [search, setSearch] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const filtered = useMemo(() => {
    return mentors.filter((m) => {
      const matchCat = activeCategory === '전체' || m.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        m.name.includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.expertise.some((e) => e.includes(q)) ||
        m.category.includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
    {selectedMentor && (
      <MentorModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
    )}
    <section id="mentors" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-5">
            20명의 검증된 멘토
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            당신의 성장을 이끌 멘토를
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              직접 선택하세요
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            각 분야 최고의 전문가들이 1:1 코칭부터 네트워크 연결까지 실질적인 도움을 드립니다.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-lg mx-auto mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="이름, 전문 분야, 키워드로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-gray-600 text-sm mb-8">
          {filtered.length}명의 멘토를 찾았습니다
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((mentor, index) => (
              <MentorCard key={mentor.id} mentor={mentor} onOpenModal={() => setSelectedMentor(mentor)} delay={index * 50} searchQuery={search} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">검색 결과가 없습니다.</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('전체'); }}
              className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>
    </section>
    </>
  );
}
