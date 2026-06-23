"use client";

import { IconArrowRight, IconDownload, IconMail, IconPhone } from "@tabler/icons-react";
import { useScrollAnimation } from "../_hooks/useScrollAnimation";

const faqItems = [
  {
    q: "중대재해처벌법이란 무엇인가요?",
    a: "중대재해처벌법은 사업장에서 발생하는 중대산업재해와 중대시민재해를 예방하기 위해 경영책임자의 안전보건 확보 의무를 규정한 법률입니다.",
  },
  {
    q: "새임 서비스는 어떤 기업이 이용하나요?",
    a: "건설업, 제조업 등 안전관리가 필요한 모든 업종의 기업이 이용할 수 있습니다. 특히 50인 이상 사업장에서 많이 도입하고 있습니다.",
  },
  {
    q: "도입 절차는 어떻게 되나요?",
    a: "무료 상담 신청 후, 기업 맞춤 컨설팅을 거쳐 시스템을 구축합니다. 도입부터 운영까지 전담 매니저가 지원합니다.",
  },
];

const Contacts = () => {
  const animRef = useScrollAnimation();

  return (
    <div ref={animRef}>
      {/* FAQ Section */}
      <div className="bg-white py-24 md:py-32">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="scroll-animate text-mint-600 text-sm font-bold tracking-widest uppercase mb-3">
              FAQ
            </p>
            <h2 className="scroll-animate scroll-animate-delay-1 text-[32px] md:text-[40px] font-extrabold text-gray-900">
              자주 묻는 질문
            </h2>
            <p className="scroll-animate scroll-animate-delay-2 mt-4 text-gray-500 text-lg">
              궁금하신 점을 모았습니다
            </p>
          </div>

          <div className="scroll-animate scroll-animate-delay-3 max-w-[760px] mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                  <span className="text-[16px] font-semibold text-gray-900">
                    {item.q}
                  </span>
                  <IconArrowRight
                    size={20}
                    className="text-gray-400 transition-transform group-open:rotate-90 shrink-0 ml-4"
                  />
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-gray-500 text-[15px] leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-24 md:py-28">
        <div className="max-w-[1140px] mx-auto px-6 text-center">
          <div className="scroll-animate">
            <h2 className="text-[32px] md:text-[44px] font-extrabold text-white leading-tight">
              지금 바로
              <br />
              <span className="text-mint-400">새임</span>과 시작하세요
            </h2>
          </div>

          <p className="scroll-animate scroll-animate-delay-1 mt-6 text-gray-400 text-lg max-w-[480px] mx-auto">
            무료 상담을 통해 우리 기업에 맞는 최적의 안전관리 체계를 구축해 보세요.
          </p>

          <div className="scroll-animate scroll-animate-delay-2 mt-10 flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-mint-500 text-white text-[16px] font-bold rounded-2xl hover:bg-mint-600 transition-all hover:shadow-lg hover:shadow-mint-500/25 cursor-pointer">
              <IconMail size={20} />
              무료 상담 신청
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white text-[16px] font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
              <IconDownload size={20} />
              회사소개서 다운로드
            </button>
          </div>

          <div className="scroll-animate scroll-animate-delay-3 mt-12 flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
            <a href="tel:02-990-1019" className="inline-flex items-center gap-2 hover:text-white transition-colors">
              <IconPhone size={16} />
              02-990-1019
            </a>
            <a href="mailto:biz@seiim.co.kr" className="inline-flex items-center gap-2 hover:text-white transition-colors">
              <IconMail size={16} />
              biz@seiim.co.kr
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
