import { useState } from 'react';
import { Lock } from 'lucide-react';

const ADMIN_PASSWORD = 'mentor2025';

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', '1');
      onLogin();
    } else {
      setError(true);
      setPw('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30">
            <Lock size={24} className="text-white" />
          </div>
        </div>
        <h1 className="text-white text-2xl font-bold text-center mb-2">어드민 로그인</h1>
        <p className="text-gray-500 text-sm text-center mb-8">MentorConnect 관리자 전용</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              placeholder="비밀번호 입력"
              autoFocus
              className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-gray-600 text-sm focus:outline-none transition-colors ${
                error ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-indigo-500/60'
              }`}
            />
            {error && <p className="text-red-400 text-xs mt-2">비밀번호가 올바르지 않습니다.</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/25"
          >
            로그인
          </button>
        </form>
        <p className="text-gray-700 text-xs text-center mt-6">힌트: mentor2025</p>
      </div>
    </div>
  );
}
