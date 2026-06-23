"use client";

import { useState } from "react";
import PhoneMockup from "./PhoneMockup";
import AdminPreview from "./AdminPreview";

const ChatbotDemo = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleComplete = (userAnswers: Record<string, string>) => {
    setAnswers(userAnswers);
    setIsCompleted(true);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      {/* Left Side */}
      <div className="flex-1 w-full order-2 lg:order-1">
        {!isCompleted ? (
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-mint-50 border border-mint-200 rounded-full mb-5">
              <span className="w-2 h-2 rounded-full bg-mint-500 animate-pulse" />
              <span className="text-mint-700 text-xs font-semibold">체험 진행 중</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
              AI 챗봇으로
              <br />
              <span className="text-mint-600">3분 만에</span> 문서 완성
            </h3>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-6 max-w-[400px] mx-auto lg:mx-0">
              세이프버디 챗봇이 질문하고, 답변을 선택하면
              <br />
              신규채용자 관리대장이 자동으로 작성됩니다.
            </p>
            <div className="space-y-3 max-w-[340px] mx-auto lg:mx-0">
              {[
                "추천 답변을 선택하거나 직접 입력",
                "모든 단계 완료 시 문서 자동 생성",
                "관리자 페이지에서 출력까지",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-mint-100 flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#00b7af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-gray-600 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="transition-all duration-700 ease-out"
            style={{
              animation: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full mb-5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-green-700 text-xs font-semibold">작성 완료</span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight mb-4">
              관리자 페이지에서
              <br />
              문서를 확인하세요
            </h3>
            <AdminPreview answers={answers} />
          </div>
        )}
      </div>

      {/* Right Side - Phone */}
      <div className="order-1 lg:order-2 flex-shrink-0">
        <PhoneMockup onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default ChatbotDemo;
