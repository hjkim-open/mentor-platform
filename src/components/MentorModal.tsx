import { useEffect } from 'react';
import { X, Award, Users, Clock, ExternalLink } from 'lucide-react';
import type { Mentor } from '../data/mentors';

interface Props {
  mentor: Mentor;
  onClose: () => void;
}

export default function MentorModal({ mentor, onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all"
          aria-label="닫기"
        >
          <X size={18} />
        </button>

        {/* Top accent gradient */}
        <div className={`h-1 w-full rounded-t-2xl bg-gradient-to-r ${mentor.avatarColor}`} />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${mentor.avatarColor} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <span className="text-white font-bold text-2xl">{mentor.initials}</span>
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <h2 className="text-white font-bold text-xl mb-1">{mentor.name}</h2>
              <p className="text-green-400 text-sm font-medium">{mentor.title}</p>
              <p className="text-gray-500 text-sm">{mentor.company}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-green-400 text-xs font-medium">
                {mentor.category}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-6 p-4 rounded-xl bg-white/4 border border-white/8">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={15} className="text-green-400" />
              <span className="text-sm">{mentor.yearsExp}년 경력</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Users size={15} className="text-green-400" />
              <span className="text-sm">멘티 {mentor.menteeCount}명</span>
            </div>
          </div>

          {/* Expertise tags */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">전문 분야</p>
            <div className="flex flex-wrap gap-1.5">
              {mentor.expertise.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">소개</p>
            <p className="text-gray-300 text-sm leading-relaxed">{mentor.bio}</p>
          </div>

          {/* Achievements */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">주요 성과</p>
            <div className="space-y-2">
              {mentor.achievements.map((ach) => (
                <div key={ach} className="flex items-start gap-2">
                  <Award size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{ach}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available for */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">코칭 가능 분야</p>
            <div className="space-y-2">
              {mentor.availableFor.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-green-500 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            매칭 신청하기
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
