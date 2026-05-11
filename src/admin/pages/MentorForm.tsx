import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, X, ArrowLeft, Save } from 'lucide-react';
import { useMentors } from '../../contexts/MentorContext';
import { categories as categoryList } from '../../data/mentors';
import type { Mentor } from '../../data/mentors';

const AVATAR_COLORS = [
  { label: '인디고/퍼플', value: 'from-indigo-500 to-purple-600' },
  { label: '바이올렛/핑크', value: 'from-violet-500 to-pink-500' },
  { label: '시안/블루', value: 'from-cyan-500 to-blue-600' },
  { label: '에메랄드/틸', value: 'from-emerald-500 to-teal-600' },
  { label: '오렌지/레드', value: 'from-orange-500 to-red-500' },
  { label: '로즈/핑크', value: 'from-rose-500 to-pink-600' },
  { label: '블루/인디고', value: 'from-blue-600 to-indigo-700' },
  { label: '푸시아/퍼플', value: 'from-fuchsia-500 to-purple-600' },
  { label: '스카이/시안', value: 'from-sky-500 to-cyan-600' },
  { label: '앰버/오렌지', value: 'from-amber-500 to-orange-600' },
  { label: '슬레이트/그레이', value: 'from-slate-500 to-gray-600' },
  { label: '라임/그린', value: 'from-lime-500 to-green-600' },
  { label: '레드/오렌지', value: 'from-red-500 to-orange-500' },
  { label: '그린/틸', value: 'from-green-500 to-teal-600' },
  { label: '블루/시안', value: 'from-blue-500 to-cyan-600' },
  { label: '바이올렛/인디고', value: 'from-violet-500 to-indigo-600' },
  { label: '그레이/슬레이트', value: 'from-gray-500 to-slate-600' },
  { label: '로즈/레드', value: 'from-rose-400 to-red-500' },
];

type FormState = Omit<Mentor, 'id'>;

const EMPTY: FormState = {
  name: '',
  title: '',
  company: '',
  expertise: [''],
  bio: '',
  achievements: ['', '', ''],
  availableFor: ['', '', ''],
  avatarColor: 'from-indigo-500 to-purple-600',
  initials: '',
  yearsExp: 0,
  menteeCount: 0,
  category: '기술/개발',
};

export default function MentorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mentors, addMentor, updateMentor } = useMentors();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      const m = mentors.find((m) => m.id === Number(id));
      if (m) {
        const { id: _id, ...rest } = m;
        setForm({
          ...rest,
          expertise: rest.expertise.length ? rest.expertise : [''],
          achievements: rest.achievements.length >= 3 ? rest.achievements : [...rest.achievements, '', '', ''].slice(0, 3),
          availableFor: rest.availableFor.length >= 3 ? rest.availableFor : [...rest.availableFor, '', '', ''].slice(0, 3),
        });
      }
    }
  }, [id, isEdit, mentors]);

  const set = (key: keyof FormState, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const setListItem = (key: 'expertise' | 'achievements' | 'availableFor', index: number, value: string) => {
    setForm((prev) => {
      const arr = [...prev[key] as string[]];
      arr[index] = value;
      return { ...prev, [key]: arr };
    });
  };

  const addListItem = (key: 'expertise' | 'achievements' | 'availableFor') => {
    setForm((prev) => ({ ...prev, [key]: [...prev[key] as string[], ''] }));
  };

  const removeListItem = (key: 'expertise' | 'achievements' | 'availableFor', index: number) => {
    setForm((prev) => {
      const arr = (prev[key] as string[]).filter((_, i) => i !== index);
      return { ...prev, [key]: arr.length ? arr : [''] };
    });
  };

  const autoInitials = (name: string) => {
    const chars = name.trim();
    if (chars.length >= 2) return chars.slice(0, 2);
    return chars;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = '이름을 입력해주세요.';
    if (!form.title.trim()) e.title = '직책을 입력해주세요.';
    if (!form.company.trim()) e.company = '소속 회사를 입력해주세요.';
    if (!form.bio.trim()) e.bio = '자기소개를 입력해주세요.';
    if (form.expertise.every((e) => !e.trim())) e.expertise = '전문 분야를 하나 이상 입력해주세요.';
    if (form.yearsExp < 0 || form.yearsExp > 50) e.yearsExp = '0–50 사이의 숫자를 입력해주세요.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);

    const payload: FormState = {
      ...form,
      initials: form.initials || autoInitials(form.name),
      expertise: form.expertise.filter((x) => x.trim()),
      achievements: form.achievements.filter((x) => x.trim()),
      availableFor: form.availableFor.filter((x) => x.trim()),
    };

    setTimeout(() => {
      if (isEdit && id) {
        updateMentor(Number(id), payload);
      } else {
        addMentor(payload);
      }
      setSaving(false);
      navigate('/admin/mentors');
    }, 300);
  };

  const sectionClass = 'p-6 rounded-2xl bg-[#0e0e1a] border border-white/8 space-y-5';
  const labelClass = 'block text-sm font-medium text-gray-400 mb-1.5';
  const inputClass = 'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/40 transition-colors';
  const errClass = 'text-red-400 text-xs mt-1.5';

  return (
    <div>
      <div className="flex items-center gap-3 mb-7">
        <button
          onClick={() => navigate('/admin/mentors')}
          className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/8 transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-white text-2xl font-bold">{isEdit ? '멘토 수정' : '새 멘토 추가'}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{isEdit ? '멘토 정보를 수정합니다.' : '새로운 멘토를 등록합니다.'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left column - main info */}
          <div className="lg:col-span-2 space-y-6">
            {/* 기본 정보 */}
            <div className={sectionClass}>
              <h2 className="text-white font-semibold text-sm uppercase tracking-wider">기본 정보</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>이름 *</label>
                  <input
                    className={`${inputClass} ${errors.name ? 'border-red-500/50' : ''}`}
                    value={form.name}
                    onChange={(e) => {
                      set('name', e.target.value);
                      if (!form.initials) set('initials', autoInitials(e.target.value));
                    }}
                    placeholder="김도현"
                  />
                  {errors.name && <p className={errClass}>{errors.name}</p>}
                </div>
                <div>
                  <label className={labelClass}>이니셜 (2자)</label>
                  <input
                    className={inputClass}
                    value={form.initials}
                    onChange={(e) => set('initials', e.target.value.slice(0, 2))}
                    placeholder="김도 (자동 입력됨)"
                    maxLength={2}
                  />
                </div>
                <div>
                  <label className={labelClass}>직책 *</label>
                  <input
                    className={`${inputClass} ${errors.title ? 'border-red-500/50' : ''}`}
                    value={form.title}
                    onChange={(e) => set('title', e.target.value)}
                    placeholder="창업자 & 전 CTO"
                  />
                  {errors.title && <p className={errClass}>{errors.title}</p>}
                </div>
                <div>
                  <label className={labelClass}>소속 / 전 직장 *</label>
                  <input
                    className={`${inputClass} ${errors.company ? 'border-red-500/50' : ''}`}
                    value={form.company}
                    onChange={(e) => set('company', e.target.value)}
                    placeholder="테크스타트 / 前 카카오"
                  />
                  {errors.company && <p className={errClass}>{errors.company}</p>}
                </div>
                <div>
                  <label className={labelClass}>경력 (년)</label>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    className={`${inputClass} ${errors.yearsExp ? 'border-red-500/50' : ''}`}
                    value={form.yearsExp || ''}
                    onChange={(e) => set('yearsExp', Number(e.target.value))}
                    placeholder="15"
                  />
                  {errors.yearsExp && <p className={errClass}>{errors.yearsExp}</p>}
                </div>
                <div>
                  <label className={labelClass}>누적 멘티 수</label>
                  <input
                    type="number"
                    min={0}
                    className={inputClass}
                    value={form.menteeCount || ''}
                    onChange={(e) => set('menteeCount', Number(e.target.value))}
                    placeholder="42"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>카테고리</label>
                <select
                  className={`${inputClass} cursor-pointer`}
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                >
                  {categoryList.filter((c) => c !== '전체').map((c) => (
                    <option key={c} value={c} className="bg-[#0e0e1a]">{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 자기소개 */}
            <div className={sectionClass}>
              <h2 className="text-white font-semibold text-sm uppercase tracking-wider">자기소개</h2>
              <div>
                <label className={labelClass}>Bio *</label>
                <textarea
                  rows={5}
                  className={`${inputClass} resize-none ${errors.bio ? 'border-red-500/50' : ''}`}
                  value={form.bio}
                  onChange={(e) => set('bio', e.target.value)}
                  placeholder="멘토님의 경력과 코칭 철학을 자유롭게 입력해주세요..."
                />
                {errors.bio && <p className={errClass}>{errors.bio}</p>}
                <p className="text-gray-700 text-xs mt-1.5">{form.bio.length}자</p>
              </div>
            </div>

            {/* 전문 분야 */}
            <div className={sectionClass}>
              <h2 className="text-white font-semibold text-sm uppercase tracking-wider">전문 분야 태그</h2>
              {errors.expertise && <p className={errClass}>{errors.expertise}</p>}
              <div className="space-y-2">
                {form.expertise.map((tag, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className={inputClass}
                      value={tag}
                      onChange={(e) => setListItem('expertise', i, e.target.value)}
                      placeholder={`전문 분야 ${i + 1} (예: 기술 전략)`}
                    />
                    {form.expertise.length > 1 && (
                      <button type="button" onClick={() => removeListItem('expertise', i)}
                        className="p-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0">
                        <X size={15} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => addListItem('expertise')}
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
                <Plus size={15} /> 태그 추가
              </button>
            </div>

            {/* 주요 성과 */}
            <div className={sectionClass}>
              <h2 className="text-white font-semibold text-sm uppercase tracking-wider">주요 성과</h2>
              <div className="space-y-2">
                {form.achievements.map((ach, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className={inputClass}
                      value={ach}
                      onChange={(e) => setListItem('achievements', i, e.target.value)}
                      placeholder={`성과 ${i + 1} (예: Series B $30M 달성)`}
                    />
                    {form.achievements.length > 1 && (
                      <button type="button" onClick={() => removeListItem('achievements', i)}
                        className="p-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0">
                        <X size={15} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => addListItem('achievements')}
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
                <Plus size={15} /> 성과 추가
              </button>
            </div>

            {/* 코칭 가능 분야 */}
            <div className={sectionClass}>
              <h2 className="text-white font-semibold text-sm uppercase tracking-wider">코칭 가능 분야</h2>
              <div className="space-y-2">
                {form.availableFor.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className={inputClass}
                      value={item}
                      onChange={(e) => setListItem('availableFor', i, e.target.value)}
                      placeholder={`코칭 분야 ${i + 1} (예: 기술 전략 수립)`}
                    />
                    {form.availableFor.length > 1 && (
                      <button type="button" onClick={() => removeListItem('availableFor', i)}
                        className="p-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0">
                        <X size={15} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => addListItem('availableFor')}
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
                <Plus size={15} /> 분야 추가
              </button>
            </div>
          </div>

          {/* Right column - avatar + preview */}
          <div className="space-y-6">
            {/* 아바타 색상 */}
            <div className={sectionClass}>
              <h2 className="text-white font-semibold text-sm uppercase tracking-wider">아바타 색상</h2>

              {/* Preview */}
              <div className="flex justify-center py-2">
                <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${form.avatarColor} flex items-center justify-center shadow-xl`}>
                  <span className="text-white font-bold text-2xl">
                    {form.initials || autoInitials(form.name) || '?'}
                  </span>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-[#0e0e1a]" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {AVATAR_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => set('avatarColor', c.value)}
                    title={c.label}
                    className={`h-10 rounded-xl bg-gradient-to-br ${c.value} transition-all ${
                      form.avatarColor === c.value
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0e0e1a] scale-110'
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 카드 미리보기 */}
            <div className={`${sectionClass} !space-y-3`}>
              <h2 className="text-white font-semibold text-sm uppercase tracking-wider">카드 미리보기</h2>
              <div className="bg-[#080810] rounded-xl p-4 border border-white/5">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${form.avatarColor} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-sm">
                      {form.initials || autoInitials(form.name) || '?'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-bold text-sm">{form.name || '이름'}</div>
                    <div className="text-indigo-400 text-xs truncate">{form.title || '직책'}</div>
                    <div className="text-gray-600 text-xs truncate">{form.company || '회사'}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {(form.expertise.filter((e) => e.trim()) || []).slice(0, 3).map((e) => (
                    <span key={e} className="px-2 py-0.5 rounded-md bg-white/5 text-gray-500 text-xs">{e}</span>
                  ))}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                  {form.bio || '자기소개가 여기에 표시됩니다...'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 sticky top-6">
              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold transition-all shadow-lg shadow-indigo-500/20"
              >
                <Save size={16} />
                {saving ? '저장 중...' : isEdit ? '수정 저장' : '멘토 등록'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/mentors')}
                className="w-full py-3.5 rounded-xl border border-white/10 hover:border-white/25 text-gray-400 hover:text-white text-sm font-medium transition-all"
              >
                취소
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
