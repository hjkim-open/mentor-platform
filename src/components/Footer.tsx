export default function Footer() {
  return (
    <footer className="bg-[#060609] border-t border-white/8 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-white font-semibold text-lg">MentorConnect</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <a href="#mentors" className="hover:text-gray-400 transition-colors">멘토 소개</a>
            <a href="#program" className="hover:text-gray-400 transition-colors">프로그램</a>
            <a href="#contact" className="hover:text-gray-400 transition-colors">문의하기</a>
            <span className="text-gray-800">|</span>
            <a href="#" className="hover:text-gray-400 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-gray-400 transition-colors">이용약관</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-700">
          <p>© 2025 MentorConnect. All rights reserved.</p>
          <p>대한민국 창업자를 위한 최고의 코칭 멘토 플랫폼</p>
        </div>
      </div>
    </footer>
  );
}
