import { useState } from 'react';
import { Users, Clock, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import type { Mentor } from '../data/mentors';

const CARD_ACCENTS = [
  'bg-orange-500', 'bg-yellow-400', 'bg-emerald-400', 'bg-pink-400',
  'bg-cyan-400', 'bg-violet-500', 'bg-rose-400', 'bg-teal-400',
  'bg-amber-400', 'bg-green-500', 'bg-blue-400', 'bg-fuchsia-500',
  'bg-red-400', 'bg-sky-400', 'bg-lime-400', 'bg-purple-400',
  'bg-indigo-400', 'bg-orange-400', 'bg-pink-500', 'bg-emerald-500',
];

interface Props {
  mentor: Mentor;
  onOpenModal: () => void;
  delay?: number;
  searchQuery?: string;
}

function highlight(text: string, query: string) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-400 text-black rounded-sm px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function MentorCard({ mentor, onOpenModal, delay = 0, searchQuery = '' }: Props) {
  const [expanded, setExpanded] = useState(false);
  const accentBg = CARD_ACCENTS[(mentor.id - 1) % CARD_ACCENTS.length];

  return (
    <div
      className="group relative bg-[#1a1a1a] border border-white/8 rounded-2xl hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/8 hover:-translate-y-1 flex flex-col"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Top accent strip */}
      <div className={`h-1 rounded-t-2xl ${accentBg} opacity-60 group-hover:opacity-100 transition-opacity`} />

      <div className="p-5 flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-3.5 mb-4">
          <button
            onClick={onOpenModal}
            aria-label={`${mentor.name} 프로필 보기`}
            className={`relative w-14 h-14 rounded-2xl ${accentBg} flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform`}
          >
            <span className="text-white/30 font-bold text-xl select-none">{mentor.initials}</span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#1a1a1a]" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-0.5">
              <button onClick={onOpenModal}
                className="text-white font-bold text-base leading-tight hover:text-green-400 transition-colors text-left">
                {highlight(mentor.name, searchQuery)}
              </button>
              <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-white/5 text-gray-500 text-[10px] font-medium border border-white/8">
                {mentor.category}
              </span>
            </div>
            <p className="text-yellow-400 text-xs font-medium truncate">{highlight(mentor.title, searchQuery)}</p>
            <p className="text-gray-600 text-xs mt-0.5 truncate">{mentor.company}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {mentor.expertise.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-lg bg-white/[0.04] border border-white/8 text-gray-500 text-xs">
              {highlight(tag, searchQuery)}
            </span>
          ))}
          {mentor.expertise.length > 3 && (
            <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-gray-600 text-xs">+{mentor.expertise.length - 3}</span>
          )}
        </div>

        {/* Bio */}
        <p className="text-gray-500 text-sm leading-relaxed mb-3">
          {expanded ? mentor.bio : `${mentor.bio.slice(0, 90)}...`}
        </p>

        {expanded && (
          <div className="mb-3 space-y-1.5">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">주요 성과</p>
            {mentor.achievements.map((a) => (
              <div key={a} className="flex items-start gap-2">
                <span className="text-yellow-400 text-xs mt-0.5 flex-shrink-0">◆</span>
                <span className="text-gray-400 text-xs">{a}</span>
              </div>
            ))}
          </div>
        )}

        {expanded && (
          <div className="mb-3 space-y-1.5">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">코칭 가능 분야</p>
            {mentor.availableFor.map((a) => (
              <div key={a} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-green-500 flex-shrink-0" />
                <span className="text-gray-400 text-xs">{a}</span>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 pt-3 border-t border-white/[0.06] mb-3">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Clock size={12} />
            <span className="text-xs">{mentor.yearsExp}년</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Users size={12} />
            <span className="text-xs">{mentor.menteeCount}명</span>
          </div>
          <div className="ml-auto flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xs">★</span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button onClick={() => setExpanded(!expanded)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-gray-500 hover:text-white text-xs font-medium transition-all">
            {expanded ? <><ChevronUp size={13} />접기</> : <><ChevronDown size={13} />더 보기</>}
          </button>
          <a href="#contact"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-green-500/90 hover:bg-green-500 text-white text-xs font-bold transition-all">
            매칭 신청
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
