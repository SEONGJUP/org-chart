"use client";

import { useEffect, useRef, useState } from "react";
import { downloadAIDocGenHtml } from "../_utils/aiDocEmailTemplate";

const DOCUMENTS = [
  {
    title: "위험성평가문서",
    color: "from-red-500 to-orange-400",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M12 18v-6" />
        <path d="M9 15l3 3 3-3" />
      </svg>
    ),
    rows: [
      { left: "유해위험요인", right: "비계 상부 추락" },
      { left: "현재안전조치", right: "안전대 착용" },
      { left: "위험도", right: "상 (3×5)" },
      { left: "개선대책", right: "안전난간 설치" },
    ],
  },
  {
    title: "점검 체크리스트",
    color: "from-blue-500 to-cyan-400",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    rows: [
      { left: "안전난간 설치 상태", check: true },
      { left: "안전모 착용 여부", check: true },
      { left: "작업발판 고정 상태", check: true },
      { left: "안전네트 설치 여부", check: false },
    ],
  },
  {
    title: "다국어 TBM 교육자료",
    color: "from-mint-500 to-green-400",
    iconBg: "bg-mint-100",
    iconColor: "text-mint-600",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    rows: [
      { lang: "KO", text: "고소작업 시 안전대 착용" },
      { lang: "EN", text: "Wear harness for work at height" },
      { lang: "VN", text: "Đeo dây an toàn khi làm việc trên cao" },
      { lang: "ZH", text: "高处作业时佩戴安全带" },
    ],
  },
];

function PhoneWithPhoto({ visible }: { visible: boolean }) {
  return (
    <div
      className="relative mx-auto w-[180px] md:w-[220px] transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
      }}
    >
      {/* Phone frame */}
      <div className="rounded-[28px] border-[5px] border-gray-800 bg-gray-800 shadow-xl overflow-hidden">
        <div className="relative bg-gray-800 h-5 flex items-center justify-center">
          <div className="w-14 h-4 bg-gray-900 rounded-b-xl" />
        </div>

        {/* Photo area - construction site illustration */}
        <div className="bg-gradient-to-b from-sky-300 to-sky-100 h-[240px] md:h-[280px] relative overflow-hidden">
          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-200" />

          {/* Sun */}
          <div className="absolute top-6 right-8 w-10 h-10 rounded-full bg-yellow-300 shadow-[0_0_20px_rgba(253,224,71,0.5)]" />

          {/* Clouds */}
          <div className="absolute top-10 left-4 w-16 h-5 bg-white/70 rounded-full" />
          <div className="absolute top-8 left-8 w-10 h-4 bg-white/60 rounded-full" />

          {/* Crane */}
          <div className="absolute bottom-[80px] left-[30%]">
            <div className="w-1.5 h-[100px] bg-yellow-600" />
            <div className="absolute top-0 left-[-20px] w-[60px] h-1.5 bg-yellow-600" />
            <div className="absolute top-0 right-[-2px] w-0.5 h-[30px] bg-gray-500" />
          </div>

          {/* Buildings */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1.5 px-3">
            <div className="w-8 h-[60px] bg-gray-500 rounded-t-sm">
              <div className="grid grid-cols-2 gap-0.5 p-1 pt-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-2 h-1.5 bg-yellow-200/60 rounded-[1px]" />
                ))}
              </div>
            </div>
            <div className="w-10 h-[90px] bg-gray-600 rounded-t-sm">
              <div className="grid grid-cols-2 gap-0.5 p-1 pt-2">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-2.5 h-1.5 bg-yellow-200/50 rounded-[1px]" />
                ))}
              </div>
            </div>
            <div className="w-12 h-[70px] bg-orange-700/80 rounded-t-sm">
              <div className="grid grid-cols-3 gap-0.5 p-1 pt-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2 h-1.5 bg-yellow-200/40 rounded-[1px]" />
                ))}
              </div>
            </div>
            <div className="w-8 h-[50px] bg-gray-400 rounded-t-sm">
              <div className="grid grid-cols-2 gap-0.5 p-1 pt-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-1.5 bg-yellow-200/50 rounded-[1px]" />
                ))}
              </div>
            </div>
          </div>

          {/* Scaffold/Fence at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[14px] bg-amber-700/50 flex items-center justify-around px-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-0.5 h-full bg-amber-800/60" />
            ))}
          </div>

          {/* Camera viewfinder overlay */}
          <div className="absolute inset-3 border-2 border-white/40 rounded-lg pointer-events-none">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white rounded-tl-md" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white rounded-tr-md" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white rounded-bl-md" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white rounded-br-md" />
          </div>

          {/* Shutter button area */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
            <div className="w-10 h-10 rounded-full border-[3px] border-white/80 flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-white/90" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-gray-900 h-4 flex items-center justify-center">
          <div className="w-16 h-1 bg-gray-600 rounded-full" />
        </div>
      </div>

      {/* Upload label */}
      <div className="mt-4 text-center">
        <p className="text-[13px] font-semibold text-gray-700">현장 사진 촬영</p>
        <p className="text-[11px] text-gray-400 mt-0.5">스마트폰으로 촬영 후 업로드</p>
      </div>
    </div>
  );
}

function AIProcessingArrow({ visible }: { visible: boolean }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-6 md:py-0 transition-all duration-700 delay-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.8)",
      }}
    >
      {/* AI Badge */}
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-lg shadow-mint-500/20">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26z" />
          </svg>
        </div>
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-2xl border-2 border-mint-400/40 animate-ping" />
      </div>

      <span className="text-[12px] font-bold text-mint-600 tracking-wide">AI 분석</span>

      {/* Arrow */}
      <div className="hidden md:flex flex-col items-center gap-1">
        <div className="w-px h-4 bg-gradient-to-b from-mint-400 to-mint-300" />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1L6 6L11 1" stroke="#00b7af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Mobile arrow (horizontal) */}
      <div className="md:hidden flex items-center gap-1">
        <div className="h-px w-4 bg-gradient-to-r from-mint-400 to-mint-300" />
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
          <path d="M1 1L6 6L1 11" stroke="#00b7af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function DocumentCard({
  doc,
  index,
  visible,
}: {
  doc: (typeof DOCUMENTS)[number];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${500 + index * 200}ms`,
      }}
    >
      <div className="bg-white rounded-xl border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
        {/* Color top bar */}
        <div className={`h-1.5 bg-gradient-to-r ${doc.color}`} />

        <div className="p-4">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className={`w-8 h-8 rounded-lg ${doc.iconBg} flex items-center justify-center ${doc.iconColor}`}>
              {doc.icon}
            </div>
            <h4 className="text-[14px] font-bold text-gray-900">{doc.title}</h4>
          </div>

          {/* Content rows */}
          <div className="space-y-1.5">
            {doc.rows.map((row, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[11px] px-2.5 py-1.5 bg-gray-50 rounded-lg"
              >
                {"left" in row && "right" in row && (
                  <>
                    <span className="text-gray-400 font-medium min-w-[72px]">
                      {row.left}
                    </span>
                    <span className="text-gray-700 font-medium flex-1">
                      {row.right}
                    </span>
                  </>
                )}
                {"check" in row && (
                  <>
                    <div
                      className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${
                        row.check
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {row.check && (
                        <svg width="8" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-700 font-medium">{row.left}</span>
                  </>
                )}
                {"lang" in row && (
                  <>
                    <span className="text-[10px] font-bold text-white bg-gray-700 rounded px-1.5 py-0.5 min-w-[24px] text-center">
                      {row.lang}
                    </span>
                    <span className="text-gray-700 font-medium">{row.text}</span>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* AI generated tag */}
          <div className="mt-3 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-gray-400 font-medium">
              AI 자동생성
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const AIDocGenShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Flow: Phone → AI → Documents */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-12">
        {/* Phone */}
        <div className="shrink-0">
          <PhoneWithPhoto visible={isVisible} />
        </div>

        {/* AI Arrow - rotated for vertical on mobile */}
        <AIProcessingArrow visible={isVisible} />

        {/* Documents Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {DOCUMENTS.map((doc, i) => (
            <DocumentCard key={doc.title} doc={doc} index={i} visible={isVisible} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="text-center transition-all duration-700 delay-[1200ms]"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <a
          href="https://safebuddy.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-gray-900 text-white text-[15px] font-bold rounded-2xl hover:bg-gray-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26z" />
          </svg>
          AI 문서생성 체험하기
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </a>
        <p className="mt-3 text-[13px] text-gray-400">
          사진 한 장으로 3종 문서가 자동 생성됩니다
        </p>

        {/* Download HTML Button */}
        <button
          onClick={downloadAIDocGenHtml}
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-600 text-[13px] font-semibold rounded-xl border border-gray-200 hover:border-mint-400 hover:text-mint-600 transition-all hover:shadow-md"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          HTML로 다운로드
        </button>
      </div>
    </div>
  );
};

export default AIDocGenShowcase;
