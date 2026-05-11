import { FileText, UserCheck, Video, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: FileText,
    title: '신청서 제출',
    description: '창업 단계, 목표, 원하는 멘토링 분야를 간단히 작성해 신청서를 제출하세요.',
  },
  {
    number: '02',
    icon: UserCheck,
    title: '멘토 매칭',
    description: '전문 큐레이터가 신청서를 검토하고 최적의 멘토를 48시간 내에 연결해 드립니다.',
  },
  {
    number: '03',
    icon: Video,
    title: '첫 세션 시작',
    description: '멘토와 일정을 조율하고 온라인으로 첫 코칭 세션을 시작하세요.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#080810]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            프로세스
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            3단계로 당신에게 맞는 멘토를 만나보세요
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row items-start md:items-stretch gap-8 md:gap-0">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex-1 flex flex-col items-center text-center md:px-8">
                {/* Connector arrow (desktop only, between steps) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-10 right-0 translate-x-1/2 z-10 items-center justify-center">
                    <ArrowRight size={24} className="text-indigo-500/60" />
                  </div>
                )}

                {/* Step number badge */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Icon size={32} className="text-indigo-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg transition-all duration-200 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            지금 신청하기
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
