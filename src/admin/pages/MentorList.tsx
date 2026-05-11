import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Edit2, Trash2, Plus } from 'lucide-react';
import { useMentors } from '../../contexts/MentorContext';

export default function MentorList() {
  const { mentors, deleteMentor } = useMentors();
  const [search, setSearch] = useState('');

  const filtered = mentors.filter((m) => {
    const q = search.toLowerCase();
    return !q || m.name.includes(q) || m.category.includes(q) || m.title.toLowerCase().includes(q);
  });

  const handleDelete = (id: number, name: string) => {
    if (confirm(`"${name}" 멘토를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`)) {
      deleteMentor(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold">멘토 관리</h1>
          <p className="text-gray-500 text-sm mt-1">총 {mentors.length}명의 멘토</p>
        </div>
        <Link
          to="/admin/mentors/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus size={16} />
          멘토 추가
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="이름, 카테고리, 직책으로 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/40 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#0e0e1a] border border-white/8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                <th className="text-left px-5 py-3.5 text-gray-500 text-xs font-semibold uppercase tracking-wider">멘토</th>
                <th className="text-left px-5 py-3.5 text-gray-500 text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">카테고리</th>
                <th className="text-left px-5 py-3.5 text-gray-500 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">경력</th>
                <th className="text-left px-5 py-3.5 text-gray-500 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">멘티 수</th>
                <th className="text-left px-5 py-3.5 text-gray-500 text-xs font-semibold uppercase tracking-wider hidden xl:table-cell">전문 분야</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.avatarColor} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">{m.initials}</span>
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold">{m.name}</div>
                        <div className="text-gray-500 text-xs">{m.title}</div>
                        <div className="text-gray-600 text-xs">{m.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium whitespace-nowrap">
                      {m.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-gray-400 text-sm">{m.yearsExp}년</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-gray-400 text-sm">{m.menteeCount}명</span>
                  </td>
                  <td className="px-5 py-4 hidden xl:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {m.expertise.slice(0, 2).map((e) => (
                        <span key={e} className="px-2 py-0.5 rounded bg-white/5 text-gray-500 text-xs">{e}</span>
                      ))}
                      {m.expertise.length > 2 && (
                        <span className="px-2 py-0.5 rounded bg-white/5 text-gray-600 text-xs">+{m.expertise.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to={`/admin/mentors/${m.id}/edit`}
                        className="p-2 rounded-lg text-gray-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                      >
                        <Edit2 size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(m.id, m.name)}
                        className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-600">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
