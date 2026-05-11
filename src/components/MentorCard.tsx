import { useState } from 'react';
import { Award, Users, Clock, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import type { Mentor } from '../data/mentors';

interface Props {
  mentor: Mentor;
}

export default function MentorCard({ mentor }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group relative bg-[#0e0e1a] border border-white/8 rounded-2xl hover:border-indigo-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col">
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${mentor.avatarColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${mentor.avatarColor} flex items-center justify-center shadow-lg flex-shrink-0`}>
            <span className="text-white font-bold text-lg">{mentor.initials}</span>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-[#0e0e1a]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <h3 className="text-white font-bold text-lg leading-tight">{mentor.name}</h3>
              <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-medium">
                {mentor.category}
              </span>
            </div>
            <p className="text-indigo-400 text-sm font-medium truncate">{mentor.title}</p>
            <p className="text-gray-500 text-xs mt-0.5 truncate">{mentor.company}</p>
          </div>
        </div>

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {mentor.expertise.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-gray-400 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {expanded ? mentor.bio : `${mentor.bio.slice(0, 100)}...`}
        </p>

        {/* Achievements - shown when expanded */}
        {expanded && (
          <div className="mb-4 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">주요 성과</p>
            {mentor.achievements.map((ach) => (
              <div key={ach} className="flex items-start gap-2">
                <Award size={13} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{ach}</span>
              </div>
            ))}
          </div>
        )}

        {/* Available for - shown when expanded */}
        {expanded && (
          <div className="mb-4 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">코칭 가능 분야</p>
            {mentor.availableFor.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer stats */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/8 mb-3">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Clock size={13} />
            <span className="text-xs">{mentor.yearsExp}년 경력</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Users size={13} />
            <span className="text-xs">멘티 {mentor.menteeCount}명</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/10 hover:border-white/25 text-gray-400 hover:text-white text-sm font-medium transition-all duration-200"
          >
            {expanded ? (
              <>
                접기 <ChevronUp size={14} />
              </>
            ) : (
              <>
                더 보기 <ChevronDown size={14} />
              </>
            )}
          </button>
          <a
            href="#contact"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            매칭 신청
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
