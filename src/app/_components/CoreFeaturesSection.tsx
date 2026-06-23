"use client";

import React, { useRef, useEffect } from "react";

/* ──────────────────────── scroll animation hook ──────────────────────── */
function useScrollFade() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ──────────────────────── CoreFeaturesSection ──────────────────────── */
/**
 * "Core Features / 핵심 기능" 섹션 컴포넌트
 *
 * ai-edu-content 페이지의 첫 번째 섹션(id="features")만 독립 추출한 파일입니다.
 * 개발자에게 전달하거나 다른 페이지에 임포트해 사용할 수 있습니다.
 *
 * 사용 예:
 *   import CoreFeaturesSection from "@/app/_components/CoreFeaturesSection";
 *   ...
 *   <CoreFeaturesSection />
 */
export default function CoreFeaturesSection() {
  const ref = useScrollFade();

  return (
    <div ref={ref}>
      {/* ══════════ SECTION 1 ══════════ */}
      {/* ── 핵심 기능 ── */}
      <section id="features" className="bg-white py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <p
              className="fade-up text-violet-600 text-sm font-bold tracking-widest uppercase mb-3"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease" }}
            >
              Core Features
            </p>
            <h2
              className="fade-up text-[32px] md:text-[42px] font-extrabold text-gray-900"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s" }}
            >
              핵심 기능
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

            {/* ── Card 1: RAG 기반 고품질 콘텐츠 생성 ── */}
            <div
              className="fade-up group bg-white rounded-3xl overflow-hidden border border-[#00B7AF]/20 shadow-sm hover:shadow-xl hover:shadow-[#00B7AF]/10 hover:-translate-y-1 transition-all flex flex-col"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}
            >
              {/* Hero */}
              <div
                className="relative px-6 pt-6 pb-6 overflow-hidden flex-1 flex flex-col"
                style={{ backgroundColor: "rgb(249,250,251)" }}
              >
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                  style={{ backgroundColor: "rgba(0,183,175,0.08)" }}
                />
                <div
                  className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full blur-2xl pointer-events-none"
                  style={{ backgroundColor: "rgba(0,160,153,0.06)" }}
                />

                <h3 className="relative font-extrabold text-[17px] mb-4" style={{ color: "#00B7AF" }}>
                  RAG 기반 고품질 콘텐츠 생성
                </h3>

                <div className="relative flex flex-col gap-4 flex-1 justify-between">

                  {/* ① Knowledge Base */}
                  <div className="w-full">
                    <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: "#00A099" }}>
                      Knowledge Base
                    </p>
                    <div className="flex gap-1.5">
                      {[
                        {
                          label: "법규·규정",
                          svg: (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                            </svg>
                          ),
                        },
                        {
                          label: "안전 지침서",
                          svg: (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                          ),
                        },
                        {
                          label: "작업 매뉴얼",
                          svg: (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                            </svg>
                          ),
                        },
                        {
                          label: "업종별 가이드",
                          svg: (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                            </svg>
                          ),
                        },
                      ].map((src) => (
                        <div
                          key={src.label}
                          className="flex-1 flex flex-col items-center gap-2 bg-white rounded-xl px-2 py-3 border"
                          style={{ borderColor: "rgba(0,183,175,0.2)" }}
                        >
                          <span className="flex-shrink-0" style={{ color: "#00B7AF" }}>{src.svg}</span>
                          <span className="text-[12px] font-semibold text-center leading-tight text-gray-700">{src.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ② RAG 시스템 4대 구성요소 */}
                  <div
                    className="w-full bg-white rounded-2xl overflow-hidden border"
                    style={{ borderColor: "rgba(0,183,175,0.2)" }}
                  >
                    {/* 헤더 */}
                    <div
                      className="flex items-center justify-between px-4 py-3 border-b"
                      style={{ borderColor: "rgba(0,183,175,0.15)", backgroundColor: "rgba(0,183,175,0.05)" }}
                    >
                      <span className="text-[13px] font-bold text-gray-800">RAG 시스템 구성</span>
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
                          style={{ backgroundColor: "#00B7AF" }}
                        />
                        <span className="text-[10px] font-bold" style={{ color: "#00A099" }}>
                          4단계 파이프라인 → 콘텐츠 수준 향상
                        </span>
                      </div>
                    </div>

                    {/* 1줄 가로 배치 */}
                    <div className="p-3 flex gap-2">
                      {[
                        { num: "①", label: "데이터 수집·전처리", desc: "법규·매뉴얼 정제" },
                        { num: "②", label: "Hybrid DB 구축", desc: "벡터+키워드" },
                        { num: "③", label: "공종 분류 모델", desc: "LVLM 기반" },
                        { num: "④", label: "검색·생성 모듈", desc: "정확도 향상" },
                      ].map((item) => (
                        <div
                          key={item.num}
                          className="flex-1 flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3"
                          style={{ backgroundColor: "rgba(0,183,175,0.06)", borderColor: "rgba(0,183,175,0.2)" }}
                        >
                          <span className="text-[12px] font-black" style={{ color: "#00B7AF" }}>{item.num}</span>
                          <span className="text-gray-800 text-[11px] font-bold leading-tight text-center">{item.label}</span>
                          <span className="text-gray-500 text-[10px] leading-tight text-center">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-600 text-[14px] leading-relaxed mb-4">
                  법규·지침·매뉴얼 기반의 RAG 시스템이 관련 근거를 검색·추출해 LLM에 제공, 정확하고 완성도 높은 교육 콘텐츠를 생성합니다.
                </p>
                <div className="flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                  {["📄 문서 정확도 ↑", "⚖️ 법규 기반 생성", "✨ 완성도 최적화"].map((tag) => (
                    <span
                      key={tag}
                      className="flex-shrink-0 px-3 py-1.5 text-[12px] font-semibold rounded-lg whitespace-nowrap"
                      style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00A099" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Card 2: PDF → AI → 영상 교육자료 ── */}
            <div
              className="fade-up group bg-white rounded-3xl overflow-hidden border border-sky-100 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1 transition-all flex flex-col"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.1s" }}
            >
              {/* Hero: PDF → AI → 영상 교육자료 */}
              <div className="relative bg-gradient-to-br from-sky-500 to-cyan-600 px-6 pt-6 pb-6 overflow-hidden flex-1 flex flex-col">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-4 left-0 w-24 h-24 bg-cyan-300/20 rounded-full blur-xl pointer-events-none" />

                <h3 className="relative text-white font-extrabold text-[17px] mb-2">다국어 자막·나레이션 영상 자동 생성</h3>
                <p className="relative text-sky-200 text-[10px] font-bold uppercase tracking-widest mb-4">
                  PDF 자료 → AI 분석 → 영상 교육자료
                </p>

                <div className="relative flex items-center gap-3 flex-1">

                  {/* INPUT: PDF 아이콘 */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-20 bg-white/20 border border-white/30 rounded-2xl flex flex-col items-center justify-center gap-1.5 shadow-md relative">
                      {/* PDF 문서 모양 — 접힌 모서리 */}
                      <div
                        className="absolute top-0 right-0 w-0 h-0"
                        style={{ borderLeft: "10px solid transparent", borderBottom: "10px solid rgba(255,255,255,0.3)" }}
                      />
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <span className="text-white font-extrabold text-[11px] tracking-wide">PDF</span>
                    </div>
                    <span className="text-sky-200 text-[10px] font-semibold text-center leading-tight">
                      어떤<br />자료든
                    </span>
                  </div>

                  {/* Arrow + AI */}
                  <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                    <svg className="w-4 h-4 text-sky-200/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-2xl animate-ping opacity-30" />
                      <div className="relative w-12 h-12 bg-white/25 border border-white/35 rounded-2xl flex items-center justify-center shadow-xl">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-sky-200 text-[9px] font-bold">AI 분석</span>
                    <svg className="w-4 h-4 text-sky-200/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>

                  {/* OUTPUT: 미니 영상 플레이어 */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-900/70 rounded-xl overflow-hidden border border-white/20 shadow-xl">
                      {/* 영상 화면 */}
                      <div
                        className="relative bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
                        style={{ aspectRatio: "16/9" }}
                      >
                        {/* 재생 버튼 */}
                        <div className="w-9 h-9 bg-white/20 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        {/* 진행 바 */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                          <div className="h-full bg-sky-400 w-2/5 rounded-full" />
                        </div>
                      </div>
                      {/* 자막 바 */}
                      <div className="bg-black/60 px-3 py-1.5 flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-sky-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>
                        <span className="text-white text-[9px] font-medium truncate">작업 전 안전장비를 반드시 착용하세요</span>
                      </div>
                      {/* 나레이션 파형 */}
                      <div className="bg-black/40 px-3 py-1.5 flex items-center gap-2">
                        <svg className="w-3 h-3 text-cyan-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                        <div className="flex items-end gap-px flex-1">
                          {[2, 5, 8, 4, 9, 6, 3, 7, 5, 8, 4, 6, 3, 7, 5].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-cyan-400/70 rounded-px animate-pulse"
                              style={{ height: `${h}px`, animationDelay: `${i * 60}ms`, animationDuration: "1s" }}
                            />
                          ))}
                        </div>
                        <span className="text-cyan-300 text-[8px] font-bold flex-shrink-0">나레이션</span>
                      </div>
                      {/* 언어 선택 */}
                      <div className="bg-black/30 px-3 py-1.5 flex items-center gap-1">
                        {[
                          { code: "kr", active: true },
                          { code: "us", active: false },
                          { code: "cn", active: false },
                          { code: "vn", active: false },
                          { code: "jp", active: false },
                        ].map((lang, i) => (
                          <span key={i} className={`flex-shrink-0 px-1 py-0.5 rounded ${lang.active ? "bg-sky-400/40" : ""}`}>
                            <img src={`https://flagcdn.com/w20/${lang.code}.png`} alt={lang.code} width={16} height={12} className="rounded-sm" />
                          </span>
                        ))}
                        <span className="text-white/50 text-[8px] font-bold ml-auto flex-shrink-0">+20</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-600 text-[14px] leading-relaxed mb-4">
                  어떤 PDF 자료든 AI가 내용을 분석해 자막과 나레이션이 포함된 영상 교육자료로 자동 변환합니다. 20개 이상의 언어로 즉시 제공됩니다.
                </p>
                {/* 언어 배지 */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { code: "kr", active: true },
                    { code: "us", active: false },
                    { code: "cn", active: false },
                    { code: "vn", active: false },
                    { code: "jp", active: false },
                    { code: "th", active: false },
                    { code: "id", active: false },
                    { code: "es", active: false },
                    { code: "fr", active: false },
                    { code: "de", active: false },
                  ].map((lang, i) => (
                    <span key={i} className={`px-1.5 py-1 rounded-lg ${lang.active ? "bg-sky-100" : ""}`}>
                      <img src={`https://flagcdn.com/w20/${lang.code}.png`} alt={lang.code} width={20} height={15} className="rounded-sm" />
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-cyan-600 text-white text-[11px] font-bold rounded-lg whitespace-nowrap">
                    +20개 이상
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
