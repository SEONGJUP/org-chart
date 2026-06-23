"use client";

import { feedbackData } from "../_data/feedbackData";
import { useScrollAnimation } from "../_hooks/useScrollAnimation";
import { downloadServiceShowcaseHtml } from "../_utils/serviceShowcaseHtml";
import ChatbotDemo from "./ChatbotDemo";
import RiskAssessmentDemo from "./RiskAssessmentDemo";
import AIDocGenShowcase from "./AIDocGenShowcase";

const MainService = () => {
  const animRef = useScrollAnimation();

  return (
    <div className="w-full" ref={animRef}>
      {/* Service Chatbot Demo Section */}
      <div className="w-full bg-white py-24 md:py-32">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="scroll-animate text-mint-600 text-sm font-bold tracking-widest uppercase mb-3">
              Service
            </p>
            <h2 className="scroll-animate scroll-animate-delay-1 text-[32px] md:text-[40px] font-extrabold text-gray-900 leading-tight">
              원스톱 안전관리 서비스
            </h2>
            <p className="scroll-animate scroll-animate-delay-2 mt-6 text-gray-500 text-lg max-w-[540px] mx-auto">
              위험성 평가부터 안전교육까지, 모든 안전관리 업무를 하나의 플랫폼에서 관리하세요.
            </p>
            <button
              onClick={downloadServiceShowcaseHtml}
              className="scroll-animate scroll-animate-delay-3 mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-600 text-[13px] font-semibold rounded-xl border border-gray-200 hover:border-mint-400 hover:text-mint-600 transition-all hover:shadow-md"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              서비스 소개 HTML 다운로드
            </button>
          </div>

          <div className="scroll-animate-scale scroll-animate-delay-3">
            <ChatbotDemo />
          </div>
        </div>
      </div>

      {/* Risk Assessment Demo Section */}
      <div className="w-full bg-gray-50 py-24 md:py-32">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="scroll-animate text-mint-600 text-sm font-bold tracking-widest uppercase mb-3">
              Risk Assessment
            </p>
            <h2 className="scroll-animate scroll-animate-delay-1 text-[32px] md:text-[40px] font-extrabold text-gray-900 leading-tight">
              위험성평가 자동화
            </h2>
            <p className="scroll-animate scroll-animate-delay-2 mt-6 text-gray-500 text-lg max-w-[540px] mx-auto">
              업종과 작업을 선택하면, AI가 위험성평가표를 자동으로 생성합니다.
            </p>
          </div>

          <div className="scroll-animate-scale scroll-animate-delay-3">
            <RiskAssessmentDemo />
          </div>
        </div>
      </div>

      {/* AI Document Generation Section */}
      <div className="w-full bg-white py-24 md:py-32">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="scroll-animate text-mint-600 text-sm font-bold tracking-widest uppercase mb-3">
              AI Document
            </p>
            <h2 className="scroll-animate scroll-animate-delay-1 text-[32px] md:text-[40px] font-extrabold text-gray-900 leading-tight">
              사진 한 장으로<br />
              <span className="text-mint-600">3종 문서</span>를 자동 생성
            </h2>
            <p className="scroll-animate scroll-animate-delay-2 mt-6 text-gray-500 text-lg max-w-[540px] mx-auto">
              현장 사진을 업로드하면 AI가 위험성평가, 점검 체크리스트,
              다국어 TBM 교육자료를 한번에 생성합니다.
            </p>
          </div>

          <div className="scroll-animate-scale scroll-animate-delay-3">
            <AIDocGenShowcase />
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="w-full bg-white py-24 md:py-32">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="scroll-animate text-mint-600 text-sm font-bold tracking-widest uppercase mb-3">
              Reviews
            </p>
            <h2 className="scroll-animate scroll-animate-delay-1 text-[32px] md:text-[40px] font-extrabold text-gray-900">
              고객이 말하는 새임
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feedbackData.map((item, index) => (
              <div
                key={index}
                className={`scroll-animate scroll-animate-delay-${index + 2} bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all`}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: item.score }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-lg font-tossface">
                      ⭐️
                    </span>
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 text-[15px] leading-relaxed mb-6">
                  &ldquo;{item.contents}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-mint-100 flex items-center justify-center">
                    <span className="text-mint-700 font-bold text-sm">
                      {item.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-[15px]">{item.name}</p>
                    <p className="text-gray-400 text-sm">
                      {item.rank}, {item.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainService;
