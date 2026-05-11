export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-white/[0.06] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold font-syne text-sm">M</span>
            </div>
            <span className="text-white font-bold font-syne text-lg">KVMCC 코칭멘토</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <a href="#mentors" className="hover:text-gray-400 transition-colors">멘토 소개</a>
            <a href="#program" className="hover:text-gray-400 transition-colors">프로그램</a>
            <a href="#faq" className="hover:text-gray-400 transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-gray-400 transition-colors">문의하기</a>
            <span className="text-gray-800">|</span>
            <a href="#" className="hover:text-gray-400 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-gray-400 transition-colors">이용약관</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-700">
          <p>© 2025 MentorConnect. All rights reserved.</p>
          <p>대한민국 창업자를 위한 최고의 코칭 멘토 플랫폼</p>
        </div>
      </div>
    </footer>
  );
}
