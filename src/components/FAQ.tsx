import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const faqs = [
  {
    question: '코칭멘토링은 어떤 방식으로 진행되나요?',
    answer:
      '화상 통화(Zoom, Google Meet 등)를 통해 1:1로 진행됩니다. 첫 세션에서 목표를 설정하고, 이후 정기 세션에서 진행 상황을 점검하며 실질적인 조언을 받습니다. 세션 빈도와 기간은 코칭멘토와 협의하여 결정합니다.',
  },
  {
    question: '코칭멘토 매칭까지 얼마나 걸리나요?',
    answer:
      '신청서 제출 후 영업일 기준 24시간 내에 담당자가 연락드립니다. 이후 코칭멘토 후보를 추천해드리며, 최종 매칭까지는 보통 3~5영업일이 소요됩니다.',
  },
  {
    question: '어떤 분야의 코칭멘토링을 받을 수 있나요?',
    answer:
      '투자 유치, 기술 전략, 그로스 마케팅, 프로덕트 전략, 팀 빌딩, 글로벌 진출, 운영 최적화, 엑싯 전략 등 스타트업 성장의 모든 단계를 커버합니다. 신청 시 원하는 분야를 복수 선택할 수 있습니다.',
  },
  {
    question: '창업 초기 단계(아이디어 단계)에도 지원 가능한가요?',
    answer:
      '네, 가능합니다. 아이디어 검증부터 PMF 탐색, 초기 팀 구성까지 창업의 가장 초기 단계부터 함께합니다. 오히려 초기일수록 코칭멘토링의 효과가 크다고 저희는 믿습니다.',
  },
  {
    question: '코칭멘토링 비용은 얼마인가요?',
    answer:
      '코칭멘토와 세션 횟수에 따라 비용이 달라집니다. 매칭 신청 후 담당자가 맞춤형 플랜과 비용을 안내해드립니다. 첫 30분 탐색 세션은 무료로 제공됩니다.',
  },
  {
    question: '코칭멘토는 어떻게 선발되나요?',
    answer:
      '모든 코칭멘토는 실제 창업 경험 또는 스타트업 생태계에서의 핵심 역할(투자, 전략, 기술 등) 보유자를 대상으로 서류 심사와 인터뷰를 거쳐 선발됩니다. 현재 500명 이상의 검증된 코칭멘토풀을 운영하고 있습니다.',
  },
  {
    question: '코칭멘토가 기대에 맞지 않으면 어떻게 하나요?',
    answer:
      '첫 세션 후 매칭이 맞지 않는다고 느끼시면 언제든지 재매칭을 요청할 수 있습니다. 멘티 만족도를 최우선으로 생각하며, 불만족 시 추가 비용 없이 새로운 코칭멘토를 찾아드립니다.',
  },
  {
    question: '법인이나 팀 단위로도 신청할 수 있나요?',
    answer:
      '네, 공동창업팀이나 스타트업 전체를 위한 그룹 코칭멘토링 프로그램도 운영합니다. 팀 규모와 니즈에 맞는 맞춤형 프로그램을 제안해드리니 문의 양식에 팀 단위 신청임을 남겨주세요.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-24 bg-[#141414]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-14 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-5">
            자주 묻는 질문
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            FAQ
          </h2>
          <p className="text-gray-400 text-lg">
            궁금하신 점을 미리 확인해보세요.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] border border-white/8 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-white font-medium text-sm sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-green-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-6 pb-5 text-gray-400 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
