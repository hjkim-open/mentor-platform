import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { categories } from '../data/mentors';
import type { Mentor } from '../data/mentors';
import MentorCard from './MentorCard';
import MentorModal from './MentorModal';
import { useMentors } from '../contexts/MentorContext';

export default function MentorGrid() {
  const { mentors } = useMentors();
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
  }, [activeCategory, search, mentors]);

  return (
    <>
      {selectedMentor && (
        <MentorModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
      )}
      <section id="mentors" className="py-24 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold mb-5 tracking-wider uppercase">
              20명의 검증된 멘토
            </div>
            <h2 className="text-[40px] lg:text-[52px] font-extrabold tracking-[-0.04em] leading-[1.1] text-white mb-4">
              당신의 멘토를 <span className="text-green-400">직접 선택</span>하세요
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              각 분야 최고의 전문가들이 1:1 코칭부터 네트워크 연결까지 실질적인 도움을 드립니다.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mb-7">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="이름, 전문 분야, 키워드로 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-green-500/40 transition-colors"
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                    : 'bg-[#1a1a1a] border border-white/8 text-gray-500 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-gray-700 text-sm mb-7">{filtered.length}명의 멘토</p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((mentor, index) => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                  onOpenModal={() => setSelectedMentor(mentor)}
                  delay={index * 50}
                  searchQuery={search}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">검색 결과가 없습니다.</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('전체'); }}
                className="mt-4 text-green-400 hover:text-green-300 text-sm"
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
