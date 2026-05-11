import { Users, CheckCircle, BarChart3, RefreshCw } from 'lucide-react';
import { useMentors } from '../../contexts/MentorContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { mentors, resetToDefault } = useMentors();

  const categories = [...new Set(mentors.map((m) => m.category))];
  const avgExp = Math.round(mentors.reduce((a, m) => a + m.yearsExp, 0) / (mentors.length || 1));
  const totalMentees = mentors.reduce((a, m) => a + m.menteeCount, 0);

  const stats = [
    { label: '전체 멘토', value: mentors.length, icon: Users, color: 'from-indigo-500 to-purple-600', sub: '등록된 멘토 수' },
    { label: '전문 분야', value: categories.length, icon: CheckCircle, color: 'from-emerald-500 to-teal-600', sub: '커버하는 카테고리' },
    { label: '평균 경력', value: `${avgExp}년`, icon: BarChart3, color: 'from-orange-500 to-red-500', sub: '멘토 평균 경력' },
    { label: '누적 멘티', value: totalMentees, icon: Users, color: 'from-violet-500 to-pink-500', sub: '전체 멘토 합산' },
  ];

  const catCounts = categories.map((cat) => ({
    cat,
    count: mentors.filter((m) => m.category === cat).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold">대시보드</h1>
          <p className="text-gray-500 text-sm mt-1">멘토 플랫폼 현황</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { if (confirm('기본 데이터로 초기화하시겠습니까?')) resetToDefault(); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/25 text-gray-400 hover:text-white text-sm font-medium transition-all"
          >
            <RefreshCw size={15} />
            기본값으로 초기화
          </button>
          <Link
            to="/admin/mentors/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20"
          >
            + 멘토 추가
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="p-5 rounded-2xl bg-[#0e0e1a] border border-white/8">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <s.icon size={18} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-0.5">{s.value}</div>
            <div className="text-gray-400 text-sm font-medium">{s.label}</div>
            <div className="text-gray-600 text-xs mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category breakdown */}
        <div className="p-6 rounded-2xl bg-[#0e0e1a] border border-white/8">
          <h2 className="text-white font-semibold mb-4">카테고리별 멘토 분포</h2>
          <div className="space-y-3">
            {catCounts.map(({ cat, count }) => (
              <div key={cat}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-400 text-sm">{cat}</span>
                  <span className="text-white text-sm font-medium">{count}명</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${(count / mentors.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent mentors */}
        <div className="p-6 rounded-2xl bg-[#0e0e1a] border border-white/8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">멘토 목록 (최근 5명)</h2>
            <Link to="/admin/mentors" className="text-indigo-400 hover:text-indigo-300 text-xs">전체 보기 →</Link>
          </div>
          <div className="space-y-3">
            {mentors.slice(-5).reverse().map((m) => (
              <div key={m.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${m.avatarColor} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-xs font-bold">{m.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{m.name}</div>
                  <div className="text-gray-500 text-xs truncate">{m.title}</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 text-xs flex-shrink-0">{m.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
