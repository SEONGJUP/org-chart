"use client";

import React, { useRef, useEffect, useState } from "react";

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

/* ──────────────────────── SVG icons ──────────────────────── */
const IconAI = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.59.659H9.06a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V5a2 2 0 00-2-2h-1" />
  </svg>
);
const IconTranslate = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
  </svg>
);
const IconPhoto = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
);
const IconDoc = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
const IconCheck = () => (
  <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);
const IconArrow = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

/* ──────────────────────── Floating Nav ──────────────────────── */
const NAV_SECTIONS = [
  { id: "hero",            label: "소개" },
  { id: "features",        label: "핵심 기능" },
  { id: "how-it-works",    label: "작동 원리" },
  { id: "content-types",   label: "콘텐츠 생성 유형" },
  { id: "benefits",        label: "고객 혜택" },
  { id: "differentiator",  label: "당사 차별성" },
  { id: "capabilities",    label: "보유 역량" },
  { id: "commercialization", label: "사업화 현황" },
  { id: "hoban",           label: "삼성물산 협업" },
  { id: "timeline",        label: "실증 타임라인" },
  { id: "impact",          label: "기대효과" },
  { id: "expansion",       label: "사업 확장" },
  { id: "roadmap",         label: "추진 로드맵" },
  { id: "tech-diff",       label: "기술 차별성" },
  { id: "compliance",      label: "준법 문서·교육" },
  { id: "safety",          label: "안전조치" },
  { id: "security",        label: "보안조치" },
  { id: "other-measures",  label: "그 밖의 조치" },
  { id: "market-size",     label: "시장 규모" },
  { id: "revenue-roadmap", label: "매출 성장 로드맵" },
  { id: "marketing",       label: "마케팅 전략" },
  { id: "business-model",  label: "비즈니스 모델" },
  { id: "social-impact",   label: "사회적 임팩트" },
  { id: "growth-vision",   label: "성장 비전" },
  { id: "cmk-goals",       label: "CMK 참여 목표" },
  { id: "cta",             label: "문의하기" },
];

function FloatingNav() {
  const [active, setActive] = useState("hero");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-1 hidden md:flex"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {NAV_SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="flex items-center gap-2 group"
            title={label}
          >
            {expanded && (
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "bg-white/90 text-gray-600 shadow-sm border border-gray-200"
                }`}
              >
                {label}
              </span>
            )}
            <span
              className={`block rounded-full transition-all duration-200 ${
                isActive
                  ? "w-2.5 h-2.5 bg-violet-600"
                  : "w-1.5 h-1.5 bg-gray-300 group-hover:bg-violet-400"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

/* ──────────────────────── Flow Step ──────────────────────── */
function FlowStep({ step, label, sub, color }: { step: string; label: string; sub: string; color: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-1.5">
      <div className={`w-11 h-11 rounded-2xl ${color} flex items-center justify-center text-white font-extrabold text-base shadow-md`}>
        {step}
      </div>
      <p className="font-bold text-gray-800 text-[16px] whitespace-nowrap">{label}</p>
      <p className="text-gray-500 text-[14px] whitespace-nowrap">{sub}</p>
    </div>
  );
}
function FlowArrow() {
  return (
    <div className="hidden md:flex items-center text-gray-300 mt-2">
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </div>
  );
}

/* ──────────────────────── Stat Card ──────────────────────── */
function StatCard({ value, label, sub, color }: { value: string; label: string; sub: string; color: string }) {
  return (
    <div className={`fade-up rounded-2xl p-6 border ${color} flex flex-col gap-1`} style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
      <p className="text-3xl font-extrabold text-gray-900">{value}</p>
      <p className="font-bold text-gray-700 text-[15px]">{label}</p>
      <p className="text-gray-500 text-[13px]">{sub}</p>
    </div>
  );
}

/* ──────────────────────── Diff Card ──────────────────────── */
function DiffCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="fade-up bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
      <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
        <span className="text-violet-700 font-extrabold text-lg">{num}</span>
      </div>
      <h3 className="font-bold text-gray-900 text-[17px] mb-2">{title}</h3>
      <p className="text-gray-500 text-[14px] leading-relaxed">{desc}</p>
    </div>
  );
}

/* ──────────────────────── Capability Row ──────────────────────── */
function CapRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0 text-violet-600">
        {icon}
      </div>
      <div>
        <p className="text-[13px] text-gray-400 font-semibold uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-gray-800 text-[15px] font-medium leading-relaxed">{value}</p>
      </div>
    </div>
  );
}

/* ──────────────────────── Timeline Item ──────────────────────── */
function TimelineItem({ date, title, desc, badge }: { date: string; title: string; desc: string; badge?: string }) {
  return (
    <div className="fade-up flex gap-5" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
        <div className="w-0.5 bg-violet-100 flex-1 mt-1" />
      </div>
      <div className="pb-8">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-violet-500 text-[13px] font-bold">{date}</span>
          {badge && (
            <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-[11px] font-bold rounded-full">{badge}</span>
          )}
        </div>
        <p className="font-bold text-gray-900 text-[16px] mb-1">{title}</p>
        <p className="text-gray-500 text-[14px] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════ */
export default function AiEduContentPage() {
  const ref = useScrollFade();
  const [marketTab, setMarketTab] = useState<"construction" | "all-industry">("construction");

  return (
    <div className="min-h-screen bg-white font-[Suit,sans-serif]" ref={ref}>
      <FloatingNav />

      {/* ── Hero ── */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-violet-950 via-violet-900 to-indigo-900 text-white py-28 md:py-36">
        {/* decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-[1100px] mx-auto px-6 text-center">
          <div className="fade-up inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-[13px] font-semibold tracking-wide mb-6 backdrop-blur-sm border border-white/20"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.5s ease" }}>
            <span className="w-2 h-2 rounded-full bg-violet-300 animate-pulse" />
            AI 교육 콘텐츠 생성 솔루션
          </div>
          <h1 className="fade-up text-[38px] md:text-[58px] font-extrabold leading-tight tracking-tight mb-6"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.5s ease 0.1s" }}>
            사진 한 장으로<br />
            <span className="text-violet-300">산업안전 교육자료</span>를<br />
            자동으로 만드세요
          </h1>
          <p className="fade-up text-violet-200 text-lg md:text-xl max-w-[600px] mx-auto mb-10 leading-relaxed"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.5s ease 0.2s" }}>
            LLM 기반 AI가 현장 사진·텍스트를 분석해 위험성평가서, TBM 교육자료,<br className="hidden md:block" />
            다국어 교육 영상까지 자동 생성합니다.
          </p>
          <div className="fade-up flex flex-wrap justify-center gap-4"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.5s ease 0.3s" }}>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-[15px] font-semibold backdrop-blur-sm">
              <span className="text-violet-300">95% 이상</span> 제작 시간 단축
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-[15px] font-semibold backdrop-blur-sm">
              <span className="text-violet-300">현대건설</span> POC 검증 완료
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-[15px] font-semibold backdrop-blur-sm">
              <span className="text-violet-300">다국어</span> TTS 지원
            </div>
          </div>
        </div>
      </section>

      {/* ── To-Be 솔루션 한줄 배너 ── */}
      <div style={{ backgroundColor: "rgb(249,250,251)", borderBottom: "1px solid rgba(0,183,175,0.12)" }}>
        <div className="max-w-[1100px] mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            {[
              {
                icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
                label: "AI 맞춤형 시각·영상 자료",
                desc: "생성형 AI가 현장 특성에 맞는 교육 이미지·영상을 자동 제작",
              },
              {
                icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>,
                label: "현장 데이터 기반 타겟 시나리오",
                desc: "장비·공정 데이터를 분석해 현장에 최적화된 위험 시나리오 자동 구성",
              },
              {
                icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>,
                label: "다국어 자막·TTS 실시간 변환",
                desc: "20개 이상 언어로 자막과 음성 나레이션을 즉시 자동 변환",
              },
            ].map((item, i) => (
              <div key={i} className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3 border" style={{ borderColor: "rgba(0,183,175,0.2)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-800 text-[13px] leading-tight">{item.label}</p>
                  <p className="text-gray-400 text-[11px] leading-tight mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ SECTION 1 ══════════ */}
      {/* ── 핵심 기능 ── */}
      <section id="features" className="bg-white py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="fade-up text-violet-600 text-sm font-bold tracking-widest uppercase mb-3"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease" }}>
              Core Features
            </p>
            <h2 className="fade-up text-[32px] md:text-[42px] font-extrabold text-gray-900"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s" }}>
              핵심 기능
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

            {/* ── Card 1: RAG 기반 고품질 콘텐츠 생성 ── */}
            <div className="fade-up group bg-white rounded-3xl overflow-hidden border border-[#00B7AF]/20 shadow-sm hover:shadow-xl hover:shadow-[#00B7AF]/10 hover:-translate-y-1 transition-all flex flex-col"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>

              {/* Hero */}
              <div className="relative px-6 pt-6 pb-6 overflow-hidden flex-1 flex flex-col" style={{ backgroundColor: "rgb(249,250,251)" }}>
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(0,183,175,0.08)" }} />
                <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full blur-2xl pointer-events-none" style={{ backgroundColor: "rgba(0,160,153,0.06)" }} />

                <h3 className="relative font-extrabold text-[17px] mb-4" style={{ color: "#00B7AF" }}>RAG 기반 고품질 콘텐츠 생성</h3>

                <div className="relative flex flex-col gap-4 flex-1 justify-between">

                  {/* ① Knowledge Base */}
                  <div className="w-full">
                    <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: "#00A099" }}>Knowledge Base</p>
                    <div className="flex gap-1.5">
                      {[
                        { label: "법규·규정", svg: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg> },
                        { label: "안전 지침서", svg: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg> },
                        { label: "작업 매뉴얼", svg: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg> },
                        { label: "업종별 가이드", svg: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg> },
                      ].map((src) => (
                        <div key={src.label} className="flex-1 flex flex-col items-center gap-2 bg-white rounded-xl px-2 py-3 border" style={{ borderColor: "rgba(0,183,175,0.2)" }}>
                          <span className="flex-shrink-0" style={{ color: "#00B7AF" }}>{src.svg}</span>
                          <span className="text-[12px] font-semibold text-center leading-tight text-gray-700">{src.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ② RAG 시스템 4대 구성요소 */}
                  <div className="w-full bg-white rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(0,183,175,0.2)" }}>
                    {/* 헤더 */}
                    <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(0,183,175,0.15)", backgroundColor: "rgba(0,183,175,0.05)" }}>
                      <span className="text-[13px] font-bold text-gray-800">RAG 시스템 구성</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: "#00B7AF" }} />
                        <span className="text-[10px] font-bold" style={{ color: "#00A099" }}>4단계 파이프라인 → 콘텐츠 수준 향상</span>
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
                        <div key={item.num} className="flex-1 flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3" style={{ backgroundColor: "rgba(0,183,175,0.06)", borderColor: "rgba(0,183,175,0.2)" }}>
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
                    <span key={tag} className="flex-shrink-0 px-3 py-1.5 text-[12px] font-semibold rounded-lg whitespace-nowrap" style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00A099" }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Card 2: PDF → AI → 영상 교육자료 ── */}
            <div className="fade-up group bg-white rounded-3xl overflow-hidden border border-sky-100 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1 transition-all flex flex-col"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.1s" }}>

              {/* Hero: PDF → AI → 영상 교육자료 */}
              <div className="relative bg-gradient-to-br from-sky-500 to-cyan-600 px-6 pt-6 pb-6 overflow-hidden flex-1 flex flex-col">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-4 left-0 w-24 h-24 bg-cyan-300/20 rounded-full blur-xl pointer-events-none" />

                <h3 className="relative text-white font-extrabold text-[17px] mb-2">다국어 자막·나레이션 영상 자동 생성</h3>
                <p className="relative text-sky-200 text-[10px] font-bold uppercase tracking-widest mb-4">PDF 자료 → AI 분석 → 영상 교육자료</p>

                <div className="relative flex items-center gap-3 flex-1">

                  {/* INPUT: PDF 아이콘 */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-20 bg-white/20 border border-white/30 rounded-2xl flex flex-col items-center justify-center gap-1.5 shadow-md relative">
                      {/* PDF 문서 모양 — 접힌 모서리 */}
                      <div className="absolute top-0 right-0 w-0 h-0"
                        style={{ borderLeft: "10px solid transparent", borderBottom: "10px solid rgba(255,255,255,0.3)" }} />
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <span className="text-white font-extrabold text-[11px] tracking-wide">PDF</span>
                    </div>
                    <span className="text-sky-200 text-[10px] font-semibold text-center leading-tight">어떤<br/>자료든</span>
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
                      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center" style={{ aspectRatio: "16/9" }}>
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
                            <div key={i} className="flex-1 bg-cyan-400/70 rounded-px animate-pulse"
                              style={{ height: `${h}px`, animationDelay: `${i * 60}ms`, animationDuration: "1s" }} />
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
                          <span key={i}
                            className={`flex-shrink-0 px-1 py-0.5 rounded ${lang.active ? "bg-sky-400/40" : ""}`}>
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
                    <span key={i}
                      className={`px-1.5 py-1 rounded-lg ${lang.active ? "bg-sky-100" : ""}`}>
                      <img src={`https://flagcdn.com/w20/${lang.code}.png`} alt={lang.code} width={20} height={15} className="rounded-sm" />
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-cyan-600 text-white text-[11px] font-bold rounded-lg whitespace-nowrap">+20개 이상</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 작동 원리 ── */}
      <section id="how-it-works" className="bg-gray-50 py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="fade-up text-violet-600 text-sm font-bold tracking-widest uppercase mb-3"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease" }}>
              How It Works
            </p>
            <h2 className="fade-up text-[32px] md:text-[42px] font-extrabold text-gray-900"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s" }}>
              작동 원리
            </h2>
            <p className="fade-up text-gray-500 mt-4 text-lg max-w-[520px] mx-auto"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.2s" }}>
              사진 또는 텍스트를 입력하면 AI가 현장 맞춤형 교육 자료를 자동 생성합니다
            </p>
          </div>

          {/* Flow */}
          <div className="fade-up bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <FlowStep step="1" label="입력" sub="현장 사진 또는 텍스트" color="bg-violet-500" />
              <FlowArrow />
              <FlowStep step="2" label="AI 분석" sub="작업 공종 자동 인식" color="bg-violet-600" />
              <FlowArrow />
              <FlowStep step="3" label="콘텐츠 생성" sub="맞춤형 교육 자료 생성" color="bg-indigo-600" />
              <FlowArrow />
              <FlowStep step="4" label="다국어 변환" sub="번역 & TTS 음성 적용" color="bg-indigo-700" />
              <FlowArrow />
              <FlowStep step="5" label="완료" sub="즉시 활용 가능한 자료" color="bg-violet-800" />
            </div>

            {/* Output types */}
            <div className="mt-8 pt-7 border-t border-gray-100">
              <p className="text-[11px] font-bold uppercase tracking-widest mb-4 text-gray-400">생성 콘텐츠 유형</p>
              <div className="flex gap-3">
                {[
                  {
                    num: "1",
                    label: <><strong>TBM</strong> 교육자료</>,
                    desc: "사고사례 기반 TBM 안전수칙 원시트",
                    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
                  },
                  {
                    num: "2",
                    label: <><strong>슬라이드</strong> 교육자료</>,
                    desc: "이미지·공종별 내용 포함 프레젠테이션",
                    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M12 7.5h.008v.008H12V7.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
                  },
                  {
                    num: "3",
                    label: <><strong>영상</strong> 교육자료</>,
                    desc: "다국어 자막·TTS 나레이션 포함 영상",
                    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex-1 flex items-center gap-3 rounded-2xl px-4 py-3.5 border" style={{ backgroundColor: "rgba(0,183,175,0.04)", borderColor: "rgba(0,183,175,0.18)" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(0,183,175,0.12)", color: "#00B7AF" }}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-black" style={{ color: "#00B7AF" }}>{item.num}</span>
                        <p className="font-bold text-gray-800 text-[14px] whitespace-nowrap">{item.label}</p>
                      </div>
                      <p className="text-gray-400 text-[11px] leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 콘텐츠 생성 유형 2가지 케이스 ── */}
      <section id="content-types" className="py-20 md:py-28" style={{ backgroundColor: "rgb(249,250,251)" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="fade-up text-[13px] font-bold uppercase tracking-widest mb-2" style={{ color: "#00B7AF", opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease" }}>
              Step 3 · 콘텐츠 생성
            </p>
            <h2 className="fade-up text-[26px] md:text-[34px] font-extrabold text-gray-900"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s" }}>
              목적에 따라 2가지 유형으로 생성
            </h2>
            <p className="fade-up text-gray-500 text-[15px] mt-3"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.2s" }}>
              동일한 입력으로 배포형·시청각형 교육자료를 선택 생성할 수 있습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Case 1: TBM 교육자료 (배포자료) */}
            <div className="fade-up bg-white rounded-3xl border overflow-hidden shadow-sm"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease", borderColor: "rgba(0,183,175,0.2)" }}>
              {/* 헤더 */}
              <div className="px-6 pt-6 pb-5 border-b" style={{ borderColor: "rgba(0,183,175,0.15)", backgroundColor: "rgba(0,183,175,0.04)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-black" style={{ backgroundColor: "rgba(0,183,175,0.12)", color: "#00B7AF" }}>1</div>
                  <span className="text-[18px] font-extrabold text-gray-900">TBM 교육자료 <span className="text-[14px] font-semibold text-gray-400">(배포자료)</span></span>
                </div>
                <p className="text-gray-500 text-[13px] leading-relaxed">사고사례 기반 TBM 안전수칙 원시트 자동 생성 → 카톡방 등을 통해 즉시 배포</p>
              </div>

              {/* 플로우 */}
              <div className="px-6 py-5 flex flex-col gap-3">
                {[
                  {
                    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg>,
                    step: "입력", desc: "현장 사진 또는 공종 텍스트",
                  },
                  {
                    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
                    step: "AI 생성", desc: "사고사례 기반 TBM 안전수칙 원시트 자동 작성",
                  },
                  {
                    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
                    step: "원시트 완성", desc: "1페이지 배포용 TBM 자료 생성",
                  },
                  {
                    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>,
                    step: "배포", desc: "카톡방·현장 게시판 등으로 즉시 공유",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[12px] font-bold mr-2" style={{ color: "#00B7AF" }}>{item.step}</span>
                      <span className="text-gray-600 text-[13px]">{item.desc}</span>
                    </div>
                    {i < 3 && <div className="w-px h-3 bg-gray-200 ml-1 flex-shrink-0" />}
                  </div>
                ))}

                {/* 효과 배지 */}
                <div className="mt-2 rounded-xl px-4 py-3 flex items-center gap-3" style={{ backgroundColor: "rgba(0,183,175,0.06)", border: "1px solid rgba(0,183,175,0.2)" }}>
                  <div className="flex-shrink-0" style={{ color: "#00B7AF" }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-[13px]">TBM 교육 효과 제고</p>
                    <p className="text-gray-500 text-[12px]">현장 맞춤 수칙을 근로자에게 즉시 전달·공유</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 2: 다국어 영상/슬라이드 교육자료 */}
            <div className="fade-up bg-white rounded-3xl border overflow-hidden shadow-sm"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.1s", borderColor: "rgba(14,165,233,0.2)" }}>
              {/* 헤더 */}
              <div className="px-6 pt-6 pb-5 border-b" style={{ borderColor: "rgba(14,165,233,0.15)", backgroundColor: "rgba(14,165,233,0.04)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-black bg-sky-100 text-sky-600">2</div>
                  <span className="text-[18px] font-extrabold text-gray-900">다국어 영상/슬라이드 교육자료</span>
                </div>
                <p className="text-gray-500 text-[13px] leading-relaxed">다국어 번역·TTS 나레이션이 적용된 영상·슬라이드를 자동생성하여 강의식 교육 시 활용</p>
              </div>

              {/* 플로우 */}
              <div className="px-6 py-5 flex flex-col gap-3">
                {[
                  {
                    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
                    step: "입력", desc: "현장 사진 또는 안전교육 텍스트",
                  },
                  {
                    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>,
                    step: "다국어 변환", desc: "자동 번역 + TTS 음성 나레이션 생성",
                  },
                  {
                    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>,
                    step: "콘텐츠 완성", desc: "나레이션 포함 영상 또는 슬라이드 자동 완성",
                  },
                  {
                    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>,
                    step: "다운로드 활용", desc: "강의 중 상영하거나 현장에서 즉시 배포",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-sky-50 text-sky-600">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[12px] font-bold text-sky-600 mr-2">{item.step}</span>
                      <span className="text-gray-600 text-[13px]">{item.desc}</span>
                    </div>
                    {i < 3 && <div className="w-px h-3 bg-gray-200 ml-1 flex-shrink-0" />}
                  </div>
                ))}

                {/* 효과 배지 */}
                <div className="mt-2 rounded-xl px-4 py-3 flex items-center gap-3 bg-sky-50 border border-sky-100">
                  <div className="flex-shrink-0 text-sky-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-[13px]">현장안전보건교육 효과 제고</p>
                    <p className="text-gray-500 text-[12px]">영상·슬라이드 모두 TTS 나레이션 지원 — 외국인 포함 전 근로자 대상 시청각 교육</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 고객 혜택 & 시장 현황 ── */}
      <section id="benefits" className="bg-white py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6">
          {/* 혜택 */}
          <div className="text-center mb-16">
            <p className="fade-up text-violet-600 text-sm font-bold tracking-widest uppercase mb-3"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease" }}>
              Benefits
            </p>
            <h2 className="fade-up text-[32px] md:text-[42px] font-extrabold text-gray-900"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s" }}>
              고객 제공 혜택
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <div className="fade-up rounded-3xl p-8 text-white"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease", background: "linear-gradient(135deg, #00B7AF, #00A099)" }}>
              <div className="text-[56px] font-extrabold mb-2">80<span className="text-[32px]">%</span></div>
              <p className="font-bold text-[20px] mb-3">교육 콘텐츠 제작<br />시간·비용 단축</p>
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
                기존 수작업 대비 교육자료 제작 시간과 비용을 95% 이상 절감합니다.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  "최신 산업안전 법령 자동 반영 — 항상 법적 기준에 맞는 교육자료 생성",
                  "최신 사고사례 기반 콘텐츠 — 현장 위험을 실질적으로 전달하는 교육 효과",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "rgba(255,255,255,0.9)" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-[13px] leading-snug" style={{ color: "rgba(255,255,255,0.8)" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="fade-up flex flex-col gap-4"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.1s" }}>
              {[
                {
                  icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>,
                  title: "행정 부담 해소",
                  desc: "현장 관리자의 문서 작성 부담을 AI가 대신해 실질적인 현장 관리 시간을 확보합니다.",
                },
                {
                  icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>,
                  title: "외국인 근로자 소통",
                  desc: "다국어 자동 번역과 TTS 음성으로 외국인 근로자와의 교육 소통 장벽을 제거합니다.",
                },
                {
                  icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>,
                  title: "중대재해처벌법 대응",
                  desc: "법적 요건을 충족하는 교육 증빙 자료를 자동 생성해 법규 준수 리스크를 최소화합니다.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-[16px] mb-1">{item.title}</p>
                    <p className="text-gray-500 text-[14px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 시장 현황 */}
          <div className="text-center mb-12">
            <p className="fade-up text-violet-600 text-sm font-bold tracking-widest uppercase mb-3"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease" }}>
              Market
            </p>
            <h2 className="fade-up text-[32px] md:text-[42px] font-extrabold text-gray-900"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s" }}>
              시장 현황
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            <StatCard
              value="627억+"
              label="안전관리 예산 증가"
              sub="1,000인 이상 사업장 기준, 기존 대비 27% ↑ (중대재해처벌법 시행 후)"
              color="bg-violet-50 border-violet-100"
            />
            <StatCard
              value="2022"
              label="중대재해처벌법 시행"
              sub="기업 안전관리 의무 강화 → 체계적 교육 콘텐츠 수요 급증"
              color="bg-indigo-50 border-indigo-100"
            />
            <StatCard
              value="초기 단계"
              label="AI 안전교육 솔루션 시장"
              sub="'시스템 구축'에서 '실질적 콘텐츠 활용'으로 패러다임 전환 중"
              color="bg-sky-50 border-sky-100"
            />
          </div>

          {/* 고객 타겟 */}
          <div className="fade-up bg-gray-50 rounded-3xl p-8 border border-gray-100"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
            <h3 className="font-extrabold text-gray-900 text-[20px] mb-6">고객 특성</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-6 border border-violet-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 bg-violet-600 text-white rounded-xl flex items-center justify-center text-[13px] font-extrabold flex-shrink-0">1차</span>
                  <p className="font-bold text-gray-900 text-[16px]">건설·제조·물류 중견·대기업</p>
                </div>
                <p className="text-gray-500 text-[14px] leading-relaxed">
                  법규 준수 및 체계적 안전관리가 필요한 고위험 산업군 기업. 중대재해처벌법 대응을 위한 교육 체계 구축 수요.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-indigo-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-[13px] font-extrabold flex-shrink-0">2차</span>
                  <p className="font-bold text-gray-900 text-[16px]">안전관리자 부족 중소기업</p>
                </div>
                <p className="text-gray-500 text-[14px] leading-relaxed">
                  전담 안전관리 인력이 부족한 중소기업. AI 자동화로 교육 효율화 및 법규 준수 비용 최소화 수요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SECTION 2 ══════════ */}
      {/* ── 당사 차별성 ── */}
      <section id="differentiator" className="bg-gradient-to-br from-gray-950 via-violet-950 to-indigo-950 text-white py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="fade-up text-violet-400 text-sm font-bold tracking-widest uppercase mb-3"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease" }}>
              Differentiation
            </p>
            <h2 className="fade-up text-[32px] md:text-[42px] font-extrabold"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s" }}>
              당사 차별성
            </h2>
            <p className="fade-up text-violet-300 mt-4 text-lg max-w-[520px] mx-auto"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.2s" }}>
              단순 AI 도구가 아닌, 산업현장 도메인에 특화된 신뢰할 수 있는 솔루션
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num: "①",
                title: "산업현장 맞춤형 RAG 시스템",
                desc: "건설·제조·물류 현장 도메인에 특화된 RAG 시스템 구축. 범용 AI가 아닌 산업안전 특화 생성형 AI로 정확도와 신뢰성을 보장합니다.",
              },
              {
                num: "②",
                title: "실증 데이터 기반 신뢰성",
                desc: "현대건설 POC를 통해 실제 건설 현장에서 적용·검증 완료. 현장에서 검증된 솔루션으로 도입 리스크를 최소화합니다.",
              },
              {
                num: "③",
                title: "현장 친화적 UI/UX",
                desc: "안전관리시스템 운영 경험을 바탕으로 설계된 직관적 인터페이스. 비전문가도 쉽게 사용할 수 있는 사용자 중심 설계.",
              },
            ].map((item) => (
              <div key={item.num} className="fade-up bg-white/5 backdrop-blur-sm rounded-2xl p-7 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all"
                style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
                <div className="w-10 h-10 rounded-xl bg-violet-500/30 flex items-center justify-center mb-4">
                  <span className="text-violet-300 font-extrabold text-lg">{item.num}</span>
                </div>
                <h3 className="font-bold text-white text-[17px] mb-2">{item.title}</h3>
                <p className="text-violet-200/80 text-[14px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 보유 역량 ── */}
      <section id="capabilities" className="bg-white py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="fade-up text-violet-600 text-sm font-bold tracking-widest uppercase mb-3"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease" }}>
              Capabilities
            </p>
            <h2 className="fade-up text-[32px] md:text-[42px] font-extrabold text-gray-900"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s" }}>
              보유 역량
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 팀 역량 */}
            <div className="fade-up bg-gray-50 rounded-3xl p-8 border border-gray-100"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
              <h3 className="font-extrabold text-gray-900 text-[20px] mb-2">팀 역량</h3>
              <p className="text-gray-500 text-[14px] mb-6">건설·IT 융합 전문가 팀</p>
              <CapRow
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
                label="대표이사"
                value="건설·IT 융합 경력 15년 — 산업안전과 디지털 전환 교차점 전문"
              />
              <CapRow
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                label="개발팀 (5명)"
                value="안전관리시스템 구축·개발 + LLM·멀티모달 AI 전문 인력"
              />
            </div>

            {/* 파트너십 & 투자 */}
            <div className="fade-up bg-gray-50 rounded-3xl p-8 border border-gray-100"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.1s" }}>
              <h3 className="font-extrabold text-gray-900 text-[20px] mb-2">파트너십 & 투자</h3>
              <p className="text-gray-500 text-[14px] mb-6">업계 최고 기업과의 협업</p>
              <CapRow
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                }
                label="대기업 협업"
                value="현대건설 · DL이앤씨 · 삼성물산 — 현장 실증 및 협업 진행 중"
              />
              <CapRow
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="투자 지원"
                value="삼일회계법인 (PwC) 투자 ('26년 상반기) 및 협업 예정"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 사업화 현황 ── */}
      <section id="commercialization" className="bg-gray-50 py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="fade-up text-violet-600 text-sm font-bold tracking-widest uppercase mb-3"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease" }}>
              Business Status
            </p>
            <h2 className="fade-up text-[32px] md:text-[42px] font-extrabold text-gray-900"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s" }}>
              사업화 현황
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Timeline */}
            <div className="fade-up bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
              <h3 className="font-extrabold text-gray-900 text-[18px] mb-8">진행 현황</h3>
              <TimelineItem
                date="상용화 완료"
                title="세이프에듀"
                desc="스마트 안전교육 시스템 상용화 완료. 다수 현장에서 실사용 중."
                badge="LIVE"
              />
              <TimelineItem
                date="개발 완료 · SaaS 준비"
                title="세이프버디 AI 센터"
                desc="AI 기능 개발 완료. SaaS 버전 상용화 예정."
                badge="BETA"
              />
              <TimelineItem
                date="~'26.2 완료"
                title="현대건설 POC"
                desc="AI 기반 안전교육 콘텐츠 생성 실증 완료. 건설현장 적용 검증."
                badge="검증 완료"
              />
              <TimelineItem
                date="목표"
                title="글로벌 확장"
                desc="현대건설 협업을 해외현장으로 확대 → 글로벌 시장 진출 목표."
              />
            </div>

            {/* 제품 현황 카드 */}
            <div className="flex flex-col gap-5">
              <div className="fade-up bg-white rounded-2xl p-7 border border-gray-100 shadow-sm"
                style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <p className="font-extrabold text-gray-900 text-[17px]">세이프에듀</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-[12px] font-bold rounded-full">상용화 완료</span>
                </div>
                <p className="text-gray-500 text-[14px] leading-relaxed">스마트 안전교육 시스템. 교육 이수 관리, 디지털 교육자료 제공, 수료증 발급까지 원스톱 제공.</p>
              </div>

              <div className="fade-up bg-white rounded-2xl p-7 border border-violet-100 shadow-sm"
                style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.1s" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600">
                      <IconAI />
                    </div>
                    <p className="font-extrabold text-gray-900 text-[17px]">세이프버디 AI 센터</p>
                  </div>
                  <span className="px-3 py-1 bg-violet-100 text-violet-700 text-[12px] font-bold rounded-full">SaaS 출시 예정</span>
                </div>
                <p className="text-gray-500 text-[14px] leading-relaxed mb-4">AI 기반 교육 콘텐츠 자동 생성 엔진. 현대건설 POC 검증 완료, SaaS 상용화 및 글로벌 확장 준비 중.</p>
                <div className="flex flex-wrap gap-2">
                  {["현대건설 POC 완료", "DL이앤씨 협의 중", "삼성물산 협의 중"].map((t) => (
                    <div key={t} className="flex items-center gap-1.5">
                      <IconCheck />
                      <span className="text-gray-600 text-[13px]">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="fade-up bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-7 text-white"
                style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.2s" }}>
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-6 h-6 text-violet-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <p className="font-extrabold text-[17px]">글로벌 확장 목표</p>
                </div>
                <p className="text-violet-200 text-[14px] leading-relaxed">
                  현대건설 협업을 해외 현장으로 확대하여 글로벌 시장 진출. 다국어 TTS·번역 기능을 활용한 해외 안전교육 솔루션 제공.
                </p>
                <div className="flex items-center gap-2 mt-4 text-white font-semibold text-[14px]">
                  <IconArrow />
                  해외현장 기술 실증 및 글로벌 시장 확대
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 삼성물산 협업 현황 ── */}
      <section id="hoban" className="bg-white py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="fade-up text-[13px] font-bold uppercase tracking-widest mb-3" style={{ color: "#00B7AF", opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease" }}>
              Collaboration
            </p>
            <h2 className="fade-up text-[28px] md:text-[36px] font-extrabold text-gray-900"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s" }}>
              삼성물산 협업 추진 현황
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: "🗂️",
                title: "RAG 기반 지식검색 시스템 구축",
                desc: "사내지침·규정, 산업안전 법령, 사고사례, 작업표준서를 통합한 삼성물산 최적화 RAG 지식검색·콘텐츠 생성 시스템 구축",
                tags: ["사내지침·규정", "산업안전 법령", "사고사례", "작업표준서"],
                tagColor: { bg: "rgba(0,183,175,0.08)", text: "#00A099", border: "rgba(0,183,175,0.2)" },
              },
              {
                icon: "🎬",
                title: "현장 맞춤형 교육영상 자동 생성",
                desc: "현장 사진·공정정보·작업환경 데이터를 멀티모달 AI로 분석해 작업·근로자 맞춤형 교육영상(외국어 포함) 자동 생성",
                tags: ["현장 사진", "공정정보", "작업환경 데이터", "멀티모달 AI"],
                tagColor: { bg: "rgba(0,183,175,0.08)", text: "#00A099", border: "rgba(0,183,175,0.2)" },
              },
              {
                icon: "🏗️",
                title: "국내 건설·산업현장 실증",
                desc: "삼성물산 운영 현장을 대상으로 근로자·관리자 대상 현장 실증 수행 — 교육효과 및 위험인지 향상 수준 검증",
                tags: ["현장 실증", "교육효과 측정", "위험인지 향상"],
                tagColor: { bg: "rgba(0,183,175,0.08)", text: "#00A099", border: "rgba(0,183,175,0.2)" },
              },
              {
                icon: "🌍",
                title: "외국인 근로자 대상 다국어 검증",
                desc: "다국어 자막·음성 및 국가별 작업환경 반영 기능 포함, 외국인 근로자 대상 성능 검증 추진",
                tags: ["다국어 자막·음성", "국가별 환경 반영", "성능 검증"],
                tagColor: { bg: "rgba(0,183,175,0.08)", text: "#00A099", border: "rgba(0,183,175,0.2)" },
              },
            ].map((item, i) => (
              <div key={i} className="fade-up rounded-2xl border p-6 flex flex-col gap-4"
                style={{ opacity: 0, transform: "translateY(24px)", transition: `all 0.6s ease ${i * 0.1}s`, backgroundColor: "rgb(249,250,251)", borderColor: "rgba(0,183,175,0.2)" }}>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: "rgba(0,183,175,0.1)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-[15px] leading-snug mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-[13px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg text-[12px] font-semibold border"
                      style={{ backgroundColor: item.tagColor.bg, color: item.tagColor.text, borderColor: item.tagColor.border }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 기대효과 ── */}
      <section id="impact" className="py-20 md:py-28" style={{ backgroundColor: "rgb(249,250,251)" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="fade-up text-[13px] font-bold uppercase tracking-widest mb-2" style={{ color: "#00B7AF", opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease" }}>
              Expected Effects
            </p>
            <h2 className="fade-up text-[28px] md:text-[36px] font-extrabold text-gray-900"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s" }}>
              기대효과
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                stat: "95%+",
                statUnit: "절감",
                title: "제작 시간·비용 절감",
                desc: "기존 수작업 대비 교육자료 제작 시간과 비용을 95% 이상 단축, 현장 관리자의 행정 부담을 대폭 해소",
              },
              {
                icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>,
                stat: "100%",
                statUnit: "준수",
                title: "법규·사고사례 기반 정확성",
                desc: "최신 산업안전 법령과 사고사례가 자동 반영된 교육자료로 법규 준수 리스크를 최소화하고 교육 신뢰도 향상",
              },
              {
                icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>,
                stat: "20+",
                statUnit: "개국어",
                title: "외국인 근로자 교육 효과",
                desc: "20개 이상 언어의 자막·TTS 나레이션 자동 생성으로 외국인 근로자와의 언어 장벽을 해소하고 위험인지 향상",
              },
              {
                icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
                stat: "↑",
                statUnit: "향상",
                title: "현장 위험인지 향상",
                desc: "현장 공종·작업 맞춤형 교육자료로 근로자의 실질적인 위험 인식을 높여 산업재해 예방 효과 제고",
              },
              {
                icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M12 7.5h.008v.008H12V7.5z" /></svg>,
                stat: "3가지 유형",
                statUnit: "교육콘텐츠",
                title: "다양한 교육 유형 지원",
                desc: "TBM 배포자료·슬라이드·영상 3가지 유형을 동일 입력으로 자동 생성, 교육 목적에 맞게 즉시 활용 가능",
              },
              {
                icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m2.25-18v18m13.5-18v18m2.25-18v18M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M12 3.75h.008v.008H12V3.75z" /></svg>,
                stat: "선진",
                statUnit: "안전문화",
                title: "브랜드 가치 및 안전문화 정착",
                desc: "지속 가능한 선진 안전 문화를 건설 현장에 정착시켜 기업의 안전 브랜드 가치를 제고하고 사회적 신뢰 강화",
              },
            ].map((item, i) => (
              <div key={i} className="fade-up bg-white rounded-2xl border p-6 flex flex-col gap-3"
                style={{ opacity: 0, transform: "translateY(24px)", transition: `all 0.6s ease ${i * 0.08}s`, borderColor: "rgba(0,183,175,0.18)" }}>
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-[22px] font-black" style={{ color: "#00B7AF" }}>{item.stat}</span>
                    <span className="text-[12px] font-bold text-gray-400 ml-1">{item.statUnit}</span>
                  </div>
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-[15px] mb-1">{item.title}</p>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 결론 배너 */}
          <div className="fade-up mt-6 rounded-2xl p-7 text-white"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.4s", background: "linear-gradient(135deg, #00B7AF, #00A099)" }}>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-extrabold text-white text-[17px] mb-1">안전 관리의 디지털 전환(DX) 선도</p>
                <p className="text-white/80 text-[14px] leading-relaxed">
                  삼성물산은 이번 협업을 통해 현장 안전 강화와 운영 효율화를 동시에 달성하고, 건설 현장 내 지속 가능한 선진 안전 문화를 정착시켜 브랜드 가치를 제고하는 비즈니스 성과를 기대할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 실증 타임라인 ── */}
      <section id="timeline" className="bg-gray-50 py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="fade-up text-[13px] font-bold uppercase tracking-widest mb-3" style={{ color: "#00B7AF", opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease" }}>
              Timeline
            </p>
            <h2 className="fade-up text-[28px] md:text-[36px] font-extrabold text-gray-900"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s" }}>
              실증 추진 타임라인
            </h2>
          </div>

          <div className="fade-up relative" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.2s" }}>
            {/* 데스크탑 연결선 */}
            <div className="hidden md:block absolute left-[10%] right-[10%] top-10 h-0.5" style={{ background: "linear-gradient(to right, #00B7AF40, #0284c740, #7c3aed40, #d9770640, #05966940)" }} />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-4">
              {[
                { month: "5월",   title: "실증계획 및 일정 수립",      color: "#00B7AF", num: "01" },
                { month: "6월",   title: "실무최적화 기획 및 설계",     color: "#0284c7", num: "02" },
                { month: "7~9월", title: "실증과제 진행 및 피드백",     color: "#7c3aed", num: "03" },
                { month: "10월",  title: "피드백반영 고도화\n및 최종평가", color: "#d97706", num: "04" },
                { month: "11월",  title: "실증결과 보고\n및 데모데이",   color: "#059669", num: "05" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-4 md:gap-3">
                  {/* 모바일 세로 연결선 */}
                  {i > 0 && (
                    <div className="md:hidden w-0.5 h-6 -mt-6" style={{ backgroundColor: `${item.color}40` }} />
                  )}
                  <div className="relative z-10 w-[84px] h-[84px] rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}12`, border: `2.5px solid ${item.color}40` }}>
                    <div className="w-[62px] h-[62px] rounded-full flex flex-col items-center justify-center text-white"
                      style={{ backgroundColor: item.color }}>
                      <span className="text-[10px] font-bold opacity-75 leading-none">{item.num}</span>
                      <span className="text-[15px] font-black leading-tight mt-0.5">{item.month}</span>
                    </div>
                  </div>
                  <p className="font-bold text-gray-800 text-[14px] leading-snug max-w-[140px] whitespace-pre-line">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 사업 확장 가능 영역 ── */}
      <section id="expansion" className="bg-white py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="fade-up text-[13px] font-bold uppercase tracking-widest mb-2" style={{ color: "#00B7AF", opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease" }}>
              Business Expansion
            </p>
            <h2 className="fade-up text-[28px] md:text-[36px] font-extrabold text-gray-900"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s" }}>
              사업 확장 가능 영역
            </h2>
            <p className="fade-up text-gray-500 text-[15px] mt-3"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.2s" }}>
              AI 교육 콘텐츠 생성 기술은 다양한 산업·고객·시장으로 확장 가능합니다
            </p>
          </div>

          {/* 4가지 확장 관점 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* 1. 산업군 확장 */}
            <div className="fade-up rounded-2xl border overflow-hidden"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease", borderColor: "rgba(0,183,175,0.2)" }}>
              <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: "rgba(0,183,175,0.06)", borderBottom: "1px solid rgba(0,183,175,0.15)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(0,183,175,0.15)", color: "#00B7AF" }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m2.25-18v18m13.5-18v18m2.25-18v18M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" /></svg>
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-[14px]">산업군 확장</p>
                  <p className="text-[11px]" style={{ color: "#00A099" }}>건설 → 전 산업으로 적용 범위 확대</p>
                </div>
              </div>
              <div className="p-5 grid grid-cols-2 gap-2.5">
                {[
                  { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m2.25-18v18m13.5-18v18m2.25-18v18" /></svg>, name: "건설·플랜트", tag: "현재" },
                  { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63" /></svg>, name: "제조·화학", tag: "확장" },
                  { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-4.5" /></svg>, name: "물류·운수", tag: "확장" },
                  { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>, name: "의료·복지", tag: "확장" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: item.tag === "현재" ? "rgba(0,183,175,0.12)" : "#F3F4F6", color: item.tag === "현재" ? "#00B7AF" : "#6B7280" }}>
                      {item.icon}
                    </div>
                    <span className="text-gray-700 font-semibold text-[13px]">{item.name}</span>
                    <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md" style={{ backgroundColor: item.tag === "현재" ? "rgba(0,183,175,0.12)" : "#F3F4F6", color: item.tag === "현재" ? "#00B7AF" : "#9CA3AF" }}>{item.tag}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* 2. 수요처 확장 */}
            <div className="fade-up rounded-2xl border overflow-hidden"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.1s", borderColor: "rgba(14,165,233,0.2)" }}>
              <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: "rgba(14,165,233,0.06)", borderBottom: "1px solid rgba(14,165,233,0.15)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-sky-100 text-sky-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-[14px]">수요처 확장</p>
                  <p className="text-sky-600 text-[11px]">대기업 → 공공·중견·중소기업까지</p>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-2">
                {[
                  { name: "대기업·건설사", desc: "대형 건설현장", pct: 100 },
                  { name: "중견·중소기업", desc: "산업안전 의무 대상 전 사업장", pct: 82 },
                  { name: "공공기관·지자체", desc: "안전보건공단, 공기업", pct: 65 },
                  { name: "교육기관·훈련원", desc: "직업훈련원·안전교육 전문기관", pct: 48 },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-gray-800 text-[13px]">{item.name}</span>
                      <span className="text-gray-400 text-[12px] text-right leading-tight">{item.desc}</span>
                    </div>
                    <div className="h-1.5 w-full bg-sky-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-sky-400" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. 글로벌 확장 */}
            <div className="fade-up rounded-2xl border overflow-hidden flex flex-col"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.2s", borderColor: "rgba(99,102,241,0.2)" }}>
              <div className="px-6 py-4 flex items-center gap-3 flex-shrink-0" style={{ backgroundColor: "rgba(99,102,241,0.05)", borderBottom: "1px solid rgba(99,102,241,0.15)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-100 text-indigo-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-[14px]">글로벌 시장 확장</p>
                  <p className="text-indigo-500 text-[11px]">다국어 TTS 기반 해외 현장 진출</p>
                </div>
              </div>
              <div className="p-5 grid grid-cols-3 gap-2.5 flex-1 content-start">
                {[
                  { region: "동남아", markets: ["베트남", "인도네시아", "태국"], flags: ["vn", "id", "th"] },
                  { region: "중동", markets: ["사우디", "UAE", "카타르"], flags: ["sa", "ae", "qa"] },
                  { region: "기타", markets: ["중국", "일본", "유럽"], flags: ["cn", "jp", "de"] },
                ].map((g) => (
                  <div key={g.region} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-[11px] font-bold text-indigo-500 mb-2">{g.region}</p>
                    <div className="flex flex-col gap-1.5">
                      {g.markets.map((m, i) => (
                        <div key={m} className="flex items-center gap-1.5">
                          <img src={`https://flagcdn.com/w20/${g.flags[i]}.png`} alt={m} width={14} height={11} className="rounded-sm flex-shrink-0" />
                          <span className="text-gray-600 text-[12px]">{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. 안전문서 다양화 */}
            <div className="fade-up rounded-2xl border overflow-hidden flex flex-col"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.3s", borderColor: "rgba(245,158,11,0.2)" }}>
              <div className="px-6 py-4 flex items-center gap-3 flex-shrink-0" style={{ backgroundColor: "rgba(245,158,11,0.05)", borderBottom: "1px solid rgba(245,158,11,0.15)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-100 text-amber-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-[14px]">안전문서 종류 다양화</p>
                  <p className="text-amber-600 text-[11px]">자동생성 가능한 안전문서 범위 지속 확대</p>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-4 flex-1">
                {/* 현재 제공 */}
                <div>
                  <p className="text-[11px] font-bold mb-2.5" style={{ color: "#00B7AF" }}>현재 제공</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "교육자료", sub: "TBM · 슬라이드 · 영상" },
                      { label: "위험성평가서", sub: null },
                      { label: "안전점검 체크리스트", sub: null },
                    ].map((doc) => (
                      <span key={doc.label} className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg border"
                        style={{ backgroundColor: "rgba(0,183,175,0.08)", borderColor: "rgba(0,183,175,0.25)", color: "#00897B" }}>
                        <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{ color: "#00B7AF" }}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        {doc.label}
                        {doc.sub && <span className="text-[10px] font-normal text-gray-400">{doc.sub}</span>}
                      </span>
                    ))}
                  </div>
                </div>
                {/* 확장 예정 */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <p className="text-[11px] font-bold text-gray-400 whitespace-nowrap">확장 예정</p>
                    <p className="text-[11px] text-gray-400">· 산업군별 요구 문서 유형에 맞춰 자동생성 범위를 단계적으로 확대합니다</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["작업허가서(PTW)", "안전작업계획서", "사고보고서"].map((doc) => (
                      <span key={doc} className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-400">
                        <svg className="w-3 h-3 flex-shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 추진 로드맵 ── */}
      <section id="roadmap" style={{ backgroundColor: "rgb(249,250,251)" }} className="py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="fade-up text-[13px] font-bold uppercase tracking-widest mb-2"
              style={{ color: "#00B7AF", opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease" }}>
              Roadmap
            </p>
            <h2 className="fade-up text-[28px] md:text-[36px] font-extrabold text-gray-900"
              style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s" }}>
              추진 로드맵
            </h2>
          </div>

          {/* 3-phase horizontal row */}
          <div className="fade-up relative flex flex-col md:flex-row items-stretch gap-0"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.2s" }}>

            {[
              {
                phase: "Phase 1",
                title: "기획 및 시스템 기반 구축",
                items: ["서비스 기획 및 요구사항 정의", "RAG 시스템 아키텍처 설계", "데이터 수집·전처리 파이프라인 구축", "Hybrid DB 및 LVLM 모델 초기 구성"],
                color: "#00B7AF",
                bgColor: "rgba(0,183,175,0.07)",
                borderColor: "rgba(0,183,175,0.25)",
                numBg: "rgba(0,183,175,0.12)",
              },
              {
                phase: "Phase 2",
                title: "시범 적용",
                items: ["삼성물산 건설 현장 파일럿 운영", "TBM·슬라이드·영상 콘텐츠 생성 실증", "다국어 TTS 나레이션 적용 테스트", "현장 관리자 피드백 수렴 및 개선"],
                color: "#0284c7",
                bgColor: "rgba(2,132,199,0.07)",
                borderColor: "rgba(2,132,199,0.25)",
                numBg: "rgba(2,132,199,0.12)",
              },
              {
                phase: "Phase 3",
                title: "성능 검증 및 피드백 반영",
                items: ["콘텐츠 품질 및 정확도 정량 평가", "법규·사고사례 반영률 검증", "사용자 만족도 조사 및 개선 반영", "상용화 전환 및 확장 전략 수립"],
                color: "#7c3aed",
                bgColor: "rgba(124,58,237,0.07)",
                borderColor: "rgba(124,58,237,0.25)",
                numBg: "rgba(124,58,237,0.12)",
              },
            ].map((phase, i) => (
              <div key={i} className="relative flex-1 flex flex-col rounded-none md:first:rounded-l-2xl md:last:rounded-r-2xl border"
                style={{ backgroundColor: phase.bgColor, borderColor: phase.borderColor, borderLeft: i > 0 ? "none" : undefined }}>
                {/* connector arrow (hidden on first) */}
                {i > 0 && (
                  <div className="hidden md:flex absolute -left-[1px] top-1/2 -translate-y-1/2 w-0 h-0 z-10"
                    style={{ borderTop: "14px solid transparent", borderBottom: "14px solid transparent", borderLeft: `12px solid ${["#00B7AF","#0284c7"][i-1]}33` }} />
                )}
                <div className="px-6 pt-6 pb-2 flex items-center gap-3 border-b" style={{ borderColor: phase.borderColor }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-[15px] font-black"
                    style={{ backgroundColor: phase.numBg, color: phase.color }}>
                    {i + 1}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: phase.color }}>{phase.phase}</span>
                    <p className="font-extrabold text-gray-900 text-[14px] leading-snug">{phase.title}</p>
                  </div>
                </div>
                <ul className="px-6 py-4 flex flex-col gap-2.5 flex-1">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-600 text-[13px]">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: phase.color }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 기술 차별성 ── */}
      <section id="tech-diff" className="bg-white py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6">

          {/* 헤더 */}
          <div className="fade-up text-center mb-14" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
              기술 차별성
            </span>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-gray-900 leading-tight mb-4">
              기존 기술 대비{" "}
              <span style={{ color: "#00B7AF" }}>4가지 핵심 혁신</span>
            </h2>
            <p className="text-gray-500 text-[16px] max-w-[640px] mx-auto leading-relaxed">
              CCTV 영상·이미지 기반 AI 위험인식 및 RAG 시스템에서<br className="hidden md:block" />
              기존 기술이 해결하지 못한 문제를 근본적으로 다르게 접근합니다
            </p>
          </div>

          {/* 비교 레이블 */}
          <div className="fade-up flex items-center justify-end gap-5 mb-4 px-1" style={{ opacity: 0, transform: "translateY(16px)", transition: "all 0.5s ease 0.1s" }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <span className="text-gray-400 text-[13px] font-semibold">기존 기술</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#00B7AF" }} />
              <span className="text-[13px] font-semibold" style={{ color: "#00B7AF" }}>당사 기술</span>
            </div>
          </div>

          {/* 4대 차별성 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {[
              {
                num: "01",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "멀티모달 이벤트 기반 위험 인식",
                before: "단순 객체 인식 (Object Detection)",
                after: "행동 + 상황 + 이벤트 단위 복합 인식",
                desc: "사람·장비를 감지하는 수준을 넘어, 행동 패턴·작업 상황·위험 이벤트를 복합적으로 분석해 실제 위험을 정확히 포착합니다.",
                tags: ["행동 인식", "이벤트 감지", "상황 이해"],
              },
              {
                num: "02",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m0 5.625c0 2.278 3.694 4.125 8.25 4.125s8.25-1.847 8.25-4.125" />
                  </svg>
                ),
                title: "Hybrid RAG 구조",
                before: "단일 Vector DB 유사도 검색",
                after: "Vector DB + Graph DB 결합 하이브리드",
                desc: "벡터 유사도 검색에 지식 그래프 관계 추론을 결합해, 법규·사고사례·공종 정보를 구조적으로 연결하고 정밀한 문서를 생성합니다.",
                tags: ["Vector DB", "Graph DB", "관계 추론"],
              },
              {
                num: "03",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.59.659H9.06a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V5a2 2 0 00-2-2h-1" />
                  </svg>
                ),
                title: "도메인 특화 LVLM",
                before: "범용 VLM (Vision Language Model) 활용",
                after: "공종 분류 + 위험요인 매핑 특화 모델",
                desc: "건설·제조 현장 도메인에 특화된 LVLM을 파인튜닝해 공종별 위험요인을 정밀 분류하고, 현장 문맥에 맞는 문서를 자동 생성합니다.",
                tags: ["LVLM Fine-tuning", "공종 분류", "위험요인 매핑"],
              },
              {
                num: "04",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                title: "End-to-End 자동화 파이프라인",
                before: "수동 중간 단계 필요 (영상 → 사람 → 문서)",
                after: "영상 → 이벤트 → 문서 완전 자동 연결",
                desc: "영상 입력부터 위험 이벤트 인식, 안전문서 생성, 다국어 교육콘텐츠 출력까지 사람 개입 없이 하나의 파이프라인으로 처리합니다.",
                tags: ["자동화 파이프라인", "무인 처리", "실시간 연동"],
              },
            ].map((item, i) => (
              <div key={i} className="fade-up rounded-2xl p-7 flex flex-col gap-5 bg-white hover:shadow-xl transition-all duration-300"
                style={{
                  border: "1px solid #e5e7eb",
                  opacity: 0, transform: "translateY(24px)",
                  transition: `all 0.6s ease ${0.15 + i * 0.1}s`,
                }}>
                {/* 상단: 번호 + 아이콘 + 제목 */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-black text-[14px] text-white"
                    style={{ backgroundColor: "#00B7AF" }}>
                    {item.num}
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                      {item.icon}
                    </div>
                    <p className="font-extrabold text-gray-900 text-[18px] leading-snug">{item.title}</p>
                  </div>
                </div>

                {/* Before / After 비교 */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-[14px] leading-relaxed">{item.before}</p>
                  </div>
                  <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl"
                    style={{ backgroundColor: "rgba(0,183,175,0.07)", border: "1px solid rgba(0,183,175,0.25)" }}>
                    <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: "#00B7AF" }}>
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <p className="text-[14px] font-bold leading-relaxed" style={{ color: "#008f89" }}>{item.after}</p>
                  </div>
                </div>

                {/* 설명 */}
                <p className="text-gray-500 text-[14px] leading-relaxed">{item.desc}</p>

                {/* 태그 */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map((t, j) => (
                    <span key={j} className="text-[12px] px-3 py-1 rounded-lg font-semibold text-gray-500 bg-gray-100">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* End-to-End 파이프라인 흐름도 */}
          <div className="fade-up" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.55s" }}>
            <div className="rounded-2xl p-7 md:p-10 bg-gray-50 border border-gray-200">
              <p className="text-[13px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color: "#00B7AF" }}>
                End-to-End 자동화 파이프라인 구조
              </p>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {[
                  { step: "INPUT", label: "CCTV 영상\n· 이미지", icon: "📹" },
                  { step: "DETECT", label: "멀티모달\n이벤트 인식", icon: "🔍" },
                  { step: "ANALYZE", label: "도메인 특화\nLVLM 분석", icon: "🧠" },
                  { step: "RETRIEVE", label: "Hybrid RAG\n지식 검색", icon: "🗄️" },
                  { step: "OUTPUT", label: "안전문서\n· 교육콘텐츠", icon: "📄" },
                ].map((s, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center gap-2.5 text-center flex-1">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-sm"
                        style={{
                          backgroundColor: i === 4 ? "rgba(0,183,175,0.12)" : "#ffffff",
                          border: `1.5px solid ${i === 4 ? "rgba(0,183,175,0.4)" : "#e5e7eb"}`,
                        }}>
                        {s.icon}
                      </div>
                      <span className="text-[11px] font-black tracking-widest" style={{ color: "#00B7AF" }}>{s.step}</span>
                      <p className="text-gray-700 text-[13px] font-semibold leading-snug whitespace-pre-line">{s.label}</p>
                    </div>
                    {i < 4 && (
                      <div className="hidden md:flex items-center text-gray-300 flex-shrink-0">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 준법 문서 & 교육 고도화 ── */}
      <section id="compliance" className="bg-gray-50 py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6">

          {/* 헤더 */}
          <div className="fade-up text-center mb-14" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
              문서 생성 · 교육 고도화
            </span>
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-gray-900 leading-tight mb-4">
              단순 LLM 생성을 넘어<br />
              <span style={{ color: "#00B7AF" }}>준법 기반 자동 문서 생성 시스템</span>으로
            </h2>
            <p className="text-gray-500 text-[16px] max-w-[580px] mx-auto leading-relaxed">
              법령 연동 · 이벤트 자동 매핑 · 제로클릭 생성으로 완성하는 산업안전 문서 자동화
            </p>
          </div>

          {/* 상단 2컬럼: 문서 차별성 + 교육 차별성 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* 문서 차별성 */}
            <div className="fade-up bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.1s" }}>
              <div className="px-7 pt-7 pb-5 border-b border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">차별성</p>
                  <p className="text-[18px] font-extrabold text-gray-900">준법 기반 문서 자동 생성</p>
                </div>
              </div>
              <div className="px-7 py-6 flex flex-col gap-4">
                {[
                  {
                    icon: "⚖️",
                    title: "법령 기반 RAG 연동",
                    desc: "산업안전보건법·KOSHA 기준 실시간 연동으로 법적 요건을 자동 충족하는 문서 생성",
                  },
                  {
                    icon: "🔗",
                    title: "이벤트-문서 자동 매핑",
                    desc: "CCTV 위험 이벤트 감지 즉시 해당 안전조치 문서를 자동으로 연결·생성",
                  },
                  {
                    icon: "⚡",
                    title: "제로클릭 문서 생성",
                    desc: "사람의 입력 없이 영상 → 위험인식 → 문서 완성까지 완전 자동 처리",
                  },
                ].map((row, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-gray-50 border border-gray-100">
                      {row.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-[15px] mb-0.5">{row.title}</p>
                      <p className="text-gray-500 text-[13px] leading-relaxed">{row.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 교육 차별성 */}
            <div className="fade-up bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.2s" }}>
              <div className="px-7 pt-7 pb-5 border-b border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">교육</p>
                  <p className="text-[18px] font-extrabold text-gray-900">다국어 교육콘텐츠 자동 생성</p>
                </div>
              </div>
              <div className="px-7 py-6 flex flex-col gap-4">
                {[
                  {
                    icon: "🌐",
                    title: "다국어 + TTS + 영상 자동 생성",
                    desc: "외국인 근로자 대상 한·영·중·베트남어 등 다국어 음성·영상 교육콘텐츠 완전 자동 제작",
                  },
                  {
                    icon: "🏗️",
                    title: "공종별 맞춤 콘텐츠",
                    desc: "건축·토목·설비·제조 등 공종 분류 기반으로 현장에 맞는 교육 내용을 자동 구성",
                  },
                  {
                    icon: "📊",
                    title: "법정 교육 이수 관리 연동",
                    desc: "교육 이력·이수율·시험 결과를 관리자 대시보드에 자동 집계 및 보고서 생성",
                  },
                ].map((row, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-gray-50 border border-gray-100">
                      {row.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-[15px] mb-0.5">{row.title}</p>
                      <p className="text-gray-500 text-[13px] leading-relaxed">{row.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 하단: 비목별 소요 요약 */}
          <div className="fade-up bg-white rounded-2xl border border-gray-200 p-7 md:p-8"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.3s" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: "#00B7AF" }} />
              <p className="text-[17px] font-extrabold text-gray-900">비목별 소요명세 핵심 항목</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  label: "데이터 구축 비용",
                  detail: "법령 및 교육콘텐츠 DB 구축",
                  items: ["산업안전보건법·KOSHA 법령 데이터 수집·정제", "공종별 사고사례·위험요인 학습 데이터셋", "다국어 교육콘텐츠 원문 및 번역 데이터"],
                },
                {
                  label: "AI 모델 개발 인건비",
                  detail: "연구개발 핵심 인력 운영",
                  items: ["LVLM 파인튜닝 및 Hybrid RAG 설계 인력", "멀티모달 이벤트 인식 모델 개발", "End-to-End 파이프라인 구현 및 검증"],
                },
              ].map((cost, i) => (
                <div key={i} className="rounded-xl p-5 bg-gray-50 border border-gray-100">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900 text-[15px]">{cost.label}</p>
                      <p className="text-[12px] font-semibold text-gray-400">{cost.detail}</p>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {cost.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-600 text-[13px]">
                        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#00B7AF" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 안전조치 이행계획 ── */}
      <section id="safety" className="bg-white py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6">

          {/* 헤더 */}
          <div className="fade-up text-center mb-14" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
              안전조치 이행계획
            </span>
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-gray-900 leading-tight mb-4">
              현장 데이터부터 AI 결과물까지<br />
              <span style={{ color: "#00B7AF" }}>전주기 안전관리 체계</span>
            </h2>
            <p className="text-gray-500 text-[16px] max-w-[600px] mx-auto leading-relaxed">
              연구실 안전을 넘어 현장 실증·AI 검증·교육콘텐츠 품질까지 포괄하는 실행형 안전 운영체계
            </p>
          </div>

          {/* ① 안전관리 책임체계 */}
          <div className="fade-up mb-8" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.08s" }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: "#00B7AF" }} />
              <h3 className="text-[17px] font-extrabold text-gray-800">안전관리 조직 및 책임체계</h3>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
                {[
                  { role: "총괄책임자", detail: "대표 / CTO", desc: "과제 안전총괄책임", color: "#00B7AF" },
                  { role: "과제 PM", detail: "실무 안전관리 담당", desc: "월 1회 점검회의 주관", color: "#4b5563" },
                  { role: "참여·위탁기관", detail: "기관별 1인 지정", desc: "데이터·현장·실증 단일 연락체계", color: "#6b7280" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center gap-0 flex-1 w-full md:w-auto">
                    <div className="flex flex-col items-center text-center px-6 py-5 bg-white rounded-2xl border w-full md:w-auto"
                      style={{ borderColor: i === 0 ? "rgba(0,183,175,0.35)" : "#e5e7eb", borderTopWidth: i === 0 ? 3 : 1, borderTopColor: i === 0 ? "#00B7AF" : "#e5e7eb" }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                        style={{ backgroundColor: i === 0 ? "rgba(0,183,175,0.12)" : "#f3f4f6", color: item.color }}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <p className="font-extrabold text-gray-900 text-[15px]">{item.role}</p>
                      <p className="text-[12px] font-semibold mt-0.5" style={{ color: item.color }}>{item.detail}</p>
                      <p className="text-gray-400 text-[12px] mt-1.5 leading-snug">{item.desc}</p>
                    </div>
                    {i < 2 && (
                      <div className="hidden md:flex items-center text-gray-300 flex-shrink-0 px-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                {["월 1회 안전점검 회의 정례화", "현장촬영 일정·안전조치 점검", "AI 오경보·미탐 리스크 모니터링", "교육콘텐츠 오류·오역 점검"].map((t, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#00B7AF" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ② 6대 위험요인 */}
          <div className="fade-up mb-8" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.18s" }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: "#00B7AF" }} />
              <h3 className="text-[17px] font-extrabold text-gray-800">6대 사전 위험요인 및 관리대책</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { num: "①", icon: "⛑️", title: "현장 물리적 위험", desc: "방문·촬영 시 추락·끼임·전도 등 물리적 위험", action: "보호구 착용·사전 작업계획 공유" },
                { num: "②", icon: "⚡", title: "감전·장비파손", desc: "CCTV·영상장비 설치·점검 시 감전 위험", action: "고위험 작업 현장 운영주체 동행 원칙" },
                { num: "③", icon: "🔒", title: "개인정보·민감장면", desc: "데이터 수집 과정의 개인정보·민감영상 노출", action: "사전 승인된 사업장만 수집·취급규정 준수" },
                { num: "④", icon: "🤖", title: "AI 오인식 위험", desc: "오경보·미탐으로 인한 잘못된 안전판단 유도", action: "초기 '참고용 알림' 제한·자동조치 금지" },
                { num: "⑤", icon: "📋", title: "법령 불일치 리스크", desc: "자동생성 문서의 법령·매뉴얼 불일치 준법 리스크", action: "출처 없는 문장 사용자 검토 대상 표기" },
                { num: "⑥", icon: "🌐", title: "다국어 오역 위험", desc: "교육콘텐츠 오역으로 인한 안전정보 전달 오류", action: "Human-in-the-loop 필수 검수 후 배포" },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col gap-3 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-[11px] font-black text-gray-400 tracking-widest">{item.num}</span>
                    <p className="font-extrabold text-gray-900 text-[14px]">{item.title}</p>
                  </div>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{item.desc}</p>
                  <div className="flex items-start gap-2 pt-2 border-t border-gray-100">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#00B7AF" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <p className="text-[12px] font-semibold text-gray-600 leading-relaxed">{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ③ AI 검증 + 사고 대응 2컬럼 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* AI 안전성 검증 */}
            <div className="fade-up bg-gray-50 border border-gray-200 rounded-2xl p-6"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.28s" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <p className="font-extrabold text-gray-900 text-[16px]">AI 결과물 안전성 검증</p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { label: "위험인식 AI", items: ["위험유형별 재현율", "오경보율 측정", "야간·역광·가림 환경 성능", "현장별 편차 검증"] },
                  { label: "문서생성 AI", items: ["RAG 근거문서 확보 시만 자동생성", "출처 없는 문장 검토대상 표기"] },
                  { label: "교육콘텐츠 AI", items: ["용어 정확성·번역 충실도 검수", "음성·자막 동기화 검토", "Human-in-the-loop 필수"] },
                ].map((g, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: "#00B7AF" }}>{g.label}</p>
                    <ul className="flex flex-col gap-1.5">
                      {g.items.map((it, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-600 text-[13px]">
                          <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#00B7AF" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 사고·장애 대응 4단계 */}
            <div className="fade-up bg-gray-50 border border-gray-200 rounded-2xl p-6"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.36s" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </div>
                <p className="font-extrabold text-gray-900 text-[16px]">사고·장애·민원 대응 체계</p>
              </div>
              <div className="flex flex-col gap-3 mb-5">
                {[
                  { step: "1단계", label: "즉시 보고", desc: "과제책임자·안전담당자 즉시 보고 및 관련 기능 임시 중단", icon: "🚨" },
                  { step: "2단계", label: "원인 분석", desc: "원본 로그·증적 보존 및 사고 경위 분석", icon: "🔎" },
                  { step: "3단계", label: "임시 조치", desc: "이해관계자 통지 및 피해 확산 방지 임시 대응", icon: "🛠️" },
                  { step: "4단계", label: "재발 방지", desc: "개선조치 완료 후 재가동·외부 법률·보안 자문 연계", icon: "✅" },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                    <span className="text-lg flex-shrink-0">{s.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-black tracking-widest" style={{ color: "#00B7AF" }}>{s.step}</span>
                        <p className="font-bold text-gray-900 text-[14px]">{s.label}</p>
                      </div>
                      <p className="text-gray-500 text-[12px] leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ④ 이행 증빙 6종 */}
          <div className="fade-up" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.44s" }}>
            <div className="rounded-2xl border p-6 md:p-8"
              style={{ background: "linear-gradient(135deg, rgba(0,183,175,0.05) 0%, rgba(0,183,175,0.1) 100%)", borderColor: "rgba(0,183,175,0.2)" }}>
              <p className="text-[13px] font-bold uppercase tracking-widest mb-5 text-center" style={{ color: "#00B7AF" }}>
                안전조치 이행 증빙 6종
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { doc: "안전책임자 지정서", icon: "📌" },
                  { doc: "월간 안전점검표", icon: "📅" },
                  { doc: "현장 출입·촬영 승인 기록", icon: "📷" },
                  { doc: "보호구 지급·교육 이수 기록", icon: "🦺" },
                  { doc: "위험성 사전검토표", icon: "⚠️" },
                  { doc: "사고·장애·민원 조치보고서", icon: "📝" },
                ].map((d, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-gray-200">
                    <span className="text-lg flex-shrink-0">{d.icon}</span>
                    <p className="text-gray-700 text-[13px] font-semibold leading-snug">{d.doc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 보안조치 이행계획 ── */}
      <section id="security" className="bg-gray-50 py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6">

          {/* 헤더 */}
          <div className="fade-up text-center mb-14" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
              보안조치 이행계획
            </span>
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-gray-900 leading-tight mb-4">
              데이터부터 AI 출력물까지<br />
              <span style={{ color: "#00B7AF" }}>전계층 보안 운영체계</span>
            </h2>
            <p className="text-gray-500 text-[16px] max-w-[600px] mx-auto leading-relaxed">
              최소수집 · 목적내 이용 · 접근권한 최소화 · 암호화 · 기록관리 · 검수 후 배포 원칙으로 운영
            </p>
          </div>

          {/* ① 데이터 4등급 분류 */}
          <div className="fade-up mb-8" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.08s" }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: "#00B7AF" }} />
              <h3 className="text-[17px] font-extrabold text-gray-800">데이터 보호등급 4단계 분류</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  grade: "1등급", label: "민감", color: "#dc2626", bg: "rgba(220,38,38,0.06)", border: "rgba(220,38,38,0.2)",
                  items: ["원본 CCTV 영상", "얼굴 식별 가능 이미지", "출입기록", "근로자 개인식별정보"],
                  rule: "별도 저장영역·권한 분리, 외부전송 암호화·반출승인",
                },
                {
                  grade: "2등급", label: "사내제한", color: "#ea580c", bg: "rgba(234,88,12,0.06)", border: "rgba(234,88,12,0.2)",
                  items: ["고객사 점검표·절차서", "위험성평가서", "계약문서"],
                  rule: "프로젝트별 승인 방식 접근, 퇴사자 즉시 권한 회수",
                },
                {
                  grade: "3등급", label: "개발제한", color: "#ca8a04", bg: "rgba(202,138,4,0.06)", border: "rgba(202,138,4,0.2)",
                  items: ["비식별화 학습데이터", "라벨링 데이터", "모델 평가결과"],
                  rule: "원본-가공본 분리 보관, 가명처리·마스킹 적용",
                },
                {
                  grade: "4등급", label: "일반", color: "#16a34a", bg: "rgba(22,163,74,0.06)", border: "rgba(22,163,74,0.2)",
                  items: ["홍보자료", "비식별 데모영상", "공개 교육콘텐츠"],
                  rule: "일반 접근 허용, 비식별 확인 후 활용",
                },
              ].map((g, i) => (
                <div key={i} className="fade-up rounded-2xl border p-5 flex flex-col gap-3 bg-white hover:shadow-md transition-all duration-300"
                  style={{ borderColor: g.border, opacity: 0, transform: "translateY(24px)", transition: `all 0.6s ease ${0.12 + i * 0.08}s` }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[22px] font-black" style={{ color: g.color }}>{g.grade}</span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: g.bg, color: g.color }}>{g.label}</span>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {g.items.map((it, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-gray-700 text-[13px]">
                        <span className="flex-shrink-0 mt-0.5 w-1 h-1 rounded-full inline-block" style={{ backgroundColor: g.color, marginTop: 7 }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[12px] text-gray-400 leading-relaxed border-t border-gray-100 pt-3">{g.rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ② 핵심 보안 통제 3개 영역 */}
          <div className="fade-up mb-8" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.28s" }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: "#00B7AF" }} />
              <h3 className="text-[17px] font-extrabold text-gray-800">핵심 보안 통제 영역</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  ),
                  title: "접근통제 · 계정관리",
                  items: [
                    "개인 계정 + MFA 다중인증 적용",
                    "운영·개발·테스트 환경 분리",
                    "관리자·데이터추출·모델배포 권한 분리",
                    "접속·다운로드 기록 보관·이상행위 점검",
                  ],
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                    </svg>
                  ),
                  title: "클라우드 · 네트워크 보안",
                  items: [
                    "전송구간 TLS · 저장구간 암호화",
                    "VPC/보안그룹 기반 네트워크 분리",
                    "WAF · 악성 IP 차단 · 취약점 패치",
                    "API 인증키 · 호출량 제한 · 테넌트 분리",
                  ],
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.59.659H9.06a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V5a2 2 0 00-2-2h-1" />
                    </svg>
                  ),
                  title: "LLM · RAG · 생성형 AI 보안",
                  items: [
                    "고객사별 문서 인덱스 완전 분리",
                    "검색 권한 필터링 · 시스템 프롬프트 보호",
                    "출력 전 민감정보·금칙어 필터링",
                    "외부 LLM API 원문 전송 제한 (비식별·요약 입력만)",
                  ],
                },
              ].map((area, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                      {area.icon}
                    </div>
                    <p className="font-extrabold text-gray-900 text-[16px] leading-snug">{area.title}</p>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {area.items.map((it, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-600 text-[13px]">
                        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#00B7AF" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ③ 침해사고 대응 + 증빙 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* 침해사고 대응 6단계 */}
            <div className="fade-up bg-white border border-gray-200 rounded-2xl p-6"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.36s" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <p className="font-extrabold text-gray-900 text-[16px]">침해사고 대응 절차</p>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  { step: "01", label: "계정차단 · 서비스 격리", icon: "🔴" },
                  { step: "02", label: "로그·증적 즉시 보존", icon: "💾" },
                  { step: "03", label: "영향범위 식별", icon: "🔎" },
                  { step: "04", label: "고객사 통지 · 임시조치", icon: "📢" },
                  { step: "05", label: "재발방지 패치 적용", icon: "🛠️" },
                  { step: "06", label: "사후보고서 작성", icon: "📝" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-base flex-shrink-0">{s.icon}</span>
                    <span className="text-[11px] font-black tracking-widest flex-shrink-0" style={{ color: "#00B7AF" }}>{s.step}</span>
                    <p className="text-gray-700 text-[14px] font-semibold">{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-[12px] mt-4 leading-relaxed">핵심 DB·지식베이스·모델 버전 정기 백업 · 복구 테스트 반기 1회 이상</p>
            </div>

            {/* 보안 증빙 8종 */}
            <div className="fade-up flex flex-col gap-4"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.44s" }}>
              <div className="rounded-2xl border p-6"
                style={{ background: "linear-gradient(135deg, rgba(0,183,175,0.05) 0%, rgba(0,183,175,0.1) 100%)", borderColor: "rgba(0,183,175,0.2)" }}>
                <p className="text-[12px] font-bold uppercase tracking-widest mb-4" style={{ color: "#00B7AF" }}>
                  보안조치 이행 증빙 8종
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { doc: "내부관리계획 · 보안운영지침", icon: "📋" },
                    { doc: "개인정보 처리방침 · 영상정보 운영방침", icon: "🔒" },
                    { doc: "접근권한 부여/회수 기록", icon: "🔑" },
                    { doc: "접속기록 · 점검기록", icon: "📊" },
                    { doc: "데이터 반출입 승인서", icon: "📤" },
                    { doc: "침해사고 대응보고서", icon: "🚨" },
                    { doc: "보안교육 이수대장", icon: "📚" },
                    { doc: "협력기관 NDA · 위수탁 보안조항", icon: "🤝" },
                  ].map((d, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 border border-gray-200">
                      <span className="text-base flex-shrink-0">{d.icon}</span>
                      <p className="text-gray-700 text-[13px] font-semibold">{d.doc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: "#00B7AF" }}>정기 점검 주기</p>
                <div className="flex flex-col gap-2">
                  {[
                    { period: "월 1회", item: "접속기록 이상행위 점검" },
                    { period: "반기 1회", item: "자체 보안 체크리스트 · 복구 테스트" },
                    { period: "연 1회", item: "전 임직원 개인정보보호·보안 교육" },
                    { period: "수시", item: "취약점 발견 시 즉시 패치 · 외부 자문 연계" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[11px] font-black px-2.5 py-1 rounded-lg flex-shrink-0"
                        style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>{r.period}</span>
                      <p className="text-gray-600 text-[13px]">{r.item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 그 밖의 조치사항 ── */}
      <section id="other-measures" className="bg-white py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6">

          {/* 헤더 */}
          <div className="fade-up text-center mb-14" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
              그 밖의 조치사항
            </span>
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-gray-900 leading-tight mb-4">
              법령준수 · 품질 · 사업화까지<br />
              <span style={{ color: "#00B7AF" }}>신뢰 기반 운영체계</span>
            </h2>
            <p className="text-gray-500 text-[16px] max-w-[580px] mx-auto leading-relaxed">
              기술 완성도와 함께 법적 요건·품질 신뢰성·이해관계자 신뢰까지 함께 확보합니다
            </p>
          </div>

          {/* 상단 3카드: 법령준수 · 품질관리 · 외국인 친화 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {[
              {
                num: "3-1",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
                  </svg>
                ),
                title: "법령준수 및 윤리체계",
                points: [
                  "개인정보 보호 법령·고시 준수",
                  "영상정보처리기기 운영기준 이행",
                  "산업안전보건교육 관련 기준 준수",
                  "생성형 AI 결과물 검수 원칙 명시",
                  "자동생성 문서 ≠ 법률 자문 원칙 운영",
                ],
              },
              {
                num: "3-2",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ),
                title: "품질관리 및 신뢰성 확보",
                points: [
                  "탐지 모델: 현장환경별 편향 검증",
                  "문서 모델: 누락률·연결률·수정율 KPI 관리",
                  "콘텐츠: 역번역 검토·원어민 검수 도입",
                  "배포 후 오탐·번역오류 피드백 수집",
                  "지속적 품질 개선 사이클 운영",
                ],
              },
              {
                num: "3-3",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                  </svg>
                ),
                title: "외국인 근로자 친화 운영",
                points: [
                  "쉬운 문장 + 픽토그램 병행 제작",
                  "경고/금지/주의 표현 표준화",
                  "소음환경 대비 자막 우선 제공",
                  "내국인과 동일한 안전보건교육 지원",
                  "현장형 다국어 도구로 즉시 활용 가능",
                ],
              },
            ].map((card, i) => (
              <div key={i} className="fade-up bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-300"
                style={{ opacity: 0, transform: "translateY(24px)", transition: `all 0.6s ease ${0.1 + i * 0.1}s` }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                    {card.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-widest" style={{ color: "#00B7AF" }}>{card.num}</span>
                    <p className="font-extrabold text-gray-900 text-[15px] leading-snug">{card.title}</p>
                  </div>
                </div>
                <ul className="flex flex-col gap-2">
                  {card.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-600 text-[13px]">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#00B7AF" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 하단 2카드: 문서·기록관리 + 고객사 커뮤니케이션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {[
              {
                num: "3-4",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
                title: "문서·기록 관리 원칙",
                rows: [
                  { label: "버전관리", desc: "승인자·변경이력·배포대상 통제" },
                  { label: "RAG 추적", desc: "지식원천 업데이트 이력 ↔ 생성 시점 연결" },
                  { label: "콘텐츠 관리", desc: "언어별·산업별·공정별 버전 분리, 최신판 표시" },
                ],
              },
              {
                num: "3-5",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                ),
                title: "고객사·이해관계자 커뮤니케이션",
                rows: [
                  { label: "도입 전 안내", desc: "데이터 수집항목·처리목적·보관기간·검수 책임범위 명시" },
                  { label: "운영 가이드", desc: "AI 경보 해석·오경보 신고·문서승인·콘텐츠 배포 절차 통일" },
                  { label: "단일 창구", desc: "민원·문의 대응 단일화로 현장 혼선 최소화" },
                ],
              },
            ].map((card, i) => (
              <div key={i} className="fade-up bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-300"
                style={{ opacity: 0, transform: "translateY(24px)", transition: `all 0.6s ease ${0.35 + i * 0.1}s` }}>
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                    {card.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-widest" style={{ color: "#00B7AF" }}>{card.num}</span>
                    <p className="font-extrabold text-gray-900 text-[16px]">{card.title}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {card.rows.map((r, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="flex-shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-lg mt-0.5"
                        style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>{r.label}</span>
                      <p className="text-gray-600 text-[13px] leading-relaxed pt-1">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ESG · 사업화 연계 배너 */}
          <div className="fade-up rounded-2xl p-7 md:p-8"
            style={{ background: "linear-gradient(135deg, rgba(0,183,175,0.06) 0%, rgba(0,183,175,0.12) 100%)", border: "1px solid rgba(0,183,175,0.22)", opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.5s" }}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black tracking-widest" style={{ color: "#00B7AF" }}>3-6</span>
                  <p className="text-[17px] font-extrabold text-gray-900">ESG · 사업화 연계 조치</p>
                </div>
                <p className="text-gray-500 text-[14px] leading-relaxed mb-4">
                  SaaS/API/SDK 사업화와 동시에 <strong className="text-gray-700">Security by Design / Safety by Design</strong>을 초기부터 내재화합니다.<br className="hidden md:block" />
                  고객사 실사·PoC·조달·투자유치 시 신뢰성을 높이는 핵심 요소로 작동합니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["고객사 PoC 신뢰도 제고", "공공 조달 적합성", "대기업 협업 레퍼런스", "투자유치 ESG 가산점"].map((t, i) => (
                    <span key={i} className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 grid grid-cols-2 gap-3">
                {[
                  { label: "책임자 지정", icon: "👤" },
                  { label: "체크리스트 운영", icon: "✅" },
                  { label: "승인흐름 명확화", icon: "🔀" },
                  { label: "로그·증빙 확보", icon: "📋" },
                ].map((it, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 border border-gray-200">
                    <span className="text-lg">{it.icon}</span>
                    <p className="text-gray-700 text-[13px] font-semibold">{it.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 시장 규모 추정 ── */}
      <section id="market-size" className="bg-gray-50 py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6">

          {/* 헤더 */}
          <div className="fade-up text-center mb-10" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
              시장 규모 추정
            </span>
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-gray-900 leading-tight mb-4">
              TAM · SAM · SOM 정량 산정
            </h2>
          </div>

          {/* 탭 버튼 */}
          <div className="fade-up flex justify-center mb-10" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.05s" }}>
            <div className="inline-flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
              {(["construction", "all-industry"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMarketTab(tab)}
                  className={`px-6 py-2.5 rounded-lg text-[14px] font-bold transition-all duration-200 ${
                    marketTab === tab
                      ? "text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                  style={marketTab === tab ? { backgroundColor: "#00B7AF" } : {}}
                >
                  {tab === "construction" ? "🏗 건설시장" : "🏭 전체 산업시장"}
                </button>
              ))}
            </div>
          </div>

          {/* ── 건설시장 탭 ── */}
          {marketTab === "construction" && (<>

          {/* sub-header */}
          <div className="text-center mb-10">
            <p className="text-gray-500 text-[15px] max-w-[640px] mx-auto leading-relaxed">
              건설업 사업장 수 × 현장당 평균 유료 활성 현장 수 × 연간 과금 기준 적용<br className="hidden md:block" />
              <span className="text-[13px] text-gray-400">※ 현장 수·단가는 사업화 가정치입니다. 통계치는 공식 통계를 따릅니다.</span>
            </p>
          </div>

          {/* TAM / SAM / SOM 3단 카드 */}
          <div className="fade-up grid grid-cols-1 md:grid-cols-3 gap-5 mb-8"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.1s" }}>
            {[
              {
                tag: "TAM",
                label: "전체 잠재시장",
                sites: "116,100",
                amount: "1조 1,514억",
                unit: "원/년",
                color: "#00B7AF",
                bg: "rgba(0,183,175,0.05)",
                badgeBg: "rgba(0,183,175,0.15)",
                badgeColor: "#00B7AF",
                rows: [
                  { item: "종합건설 15,861개 × 2.0 → 31,800현장", sub: "× 1,500만 원 = 4,770억 원" },
                  { item: "전문공사 73,240개 × 1.15 → 84,300현장", sub: "× 800만 원 = 6,744억 원" },
                ],
                note: "",
              },
              {
                tag: "SAM",
                label: "유효 공략시장",
                sites: "55,700",
                amount: "6,405억",
                unit: "원/년",
                color: "#111827",
                bg: "#ffffff",
                badgeBg: "#f3f4f6",
                badgeColor: "#6b7280",
                rows: [
                  { item: "종합건설 전체: 31,800현장", sub: "" },
                  { item: "전문공사 상위 25% × 1.3 → 23,900현장", sub: "" },
                  { item: "합계 55,700현장 × 1,150만 원", sub: "= 6,405억 원" },
                ],
                note: "",
              },
              {
                tag: "SOM",
                label: "실현 가능시장 (5년)",
                sites: "1,700",
                amount: "195.5억",
                unit: "원/년",
                color: "#111827",
                bg: "#f9fafb",
                badgeBg: "#f3f4f6",
                badgeColor: "#6b7280",
                rows: [
                  { item: "SAM 55,700현장 × 3% → 1,671 → 올림", sub: "= 1,700 유료 활성 현장" },
                  { item: "1,700현장 × 1,150만 원", sub: "= 195.5억 원/년" },
                ],
                note: "",
              },
            ].map((m, i) => (
              <div key={i} className="flex flex-col p-7 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: m.bg }}>
                {/* 태그 + 레이블 */}
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-block text-[14px] font-black tracking-widest px-3.5 py-1.5 rounded-lg"
                    style={{ backgroundColor: m.badgeBg, color: m.badgeColor }}>
                    {m.tag}
                  </span>
                  <span className="text-[13px] text-gray-400 font-semibold">{m.label}</span>
                </div>
                {/* 유료 활성 현장 수 */}
                <p className="text-[13px] font-semibold text-gray-400 mb-1">유료 활성 현장</p>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-[42px] font-black leading-none" style={{ color: m.color }}>{m.sites}</span>
                  <span className="text-[15px] text-gray-400 font-semibold">현장</span>
                </div>
                {/* 매출 */}
                <div className="flex items-baseline gap-1.5 mb-5 pb-5 border-b border-gray-100">
                  <span className="text-[24px] font-extrabold text-gray-700">{m.amount}</span>
                  <span className="text-[13px] text-gray-400">{m.unit}</span>
                </div>
                {/* 산정식 */}
                <div className="flex flex-col gap-3 flex-1 mb-4">
                  {m.rows.map((r, j) => (
                    <div key={j}>
                      <p className="text-gray-500 text-[13px]">{r.item}</p>
                      {r.sub && <p className="text-[13px] font-bold mt-0.5" style={{ color: m.color }}>{r.sub}</p>}
                    </div>
                  ))}
                </div>
                {m.note && <p className="text-[12px] text-gray-400 leading-relaxed border-t border-gray-100 pt-3">{m.note}</p>}
              </div>
            ))}
          </div>

          {/* 가정 전제 안내 배너 */}
          <div className="fade-up mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 flex items-start gap-3"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.18s" }}>
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>
              <p className="font-bold text-amber-800 text-[13px] mb-1">사업화 가정치 명시</p>
              <p className="text-amber-700 text-[13px] leading-relaxed">
                현장당 평균 유료 활성 현장 수(종합 2.0개 · 전문 1.15개 · SAM 전문 1.3개), 세그먼트별 단가(종합 1,500만 원 · 전문 800만 원 · SAM 평균 1,150만 원),
                SOM 3% 목표치는 <strong>공식 통계가 아닌 사업화 가정치</strong>입니다.
                공식 통계 기준치: 건설업 기업체 수 89,101개 / 종합건설 15,861개 / 전문공사 73,240개.
              </p>
            </div>
          </div>

          {/* 5개년 성장 차트 + 성장 동인 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-6">
            <div className="fade-up md:col-span-3 bg-white rounded-2xl border border-gray-200 p-7"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.25s" }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-1">5개년 시장 성장 예측</p>
                  <p className="text-[17px] font-extrabold text-gray-900">건설업 스마트 안전관리 시장 (억 원)</p>
                  <p className="text-[12px] text-gray-400 mt-1">SAM 55,700 유료 활성 현장 × 1,150만 원 기준 / 도입률 8→18% 시나리오</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-[30px] font-black" style={{ color: "#00B7AF" }}>22.5%</p>
                  <p className="text-[11px] text-gray-400 font-semibold">CAGR</p>
                </div>
              </div>
              {/* y축 + 막대 */}
              {(() => {
                const CHART_H = 180;
                const MAX = 1153;
                const SOM_Y = Math.round((195.5 / MAX) * CHART_H); // SOM 기준선 위치 (px)
                const bars = [
                  { year: "2026", value: 512,  rate: "8%" },
                  { year: "2027", value: 641,  rate: "10%" },
                  { year: "2028", value: 769,  rate: "12%" },
                  { year: "2029", value: 961,  rate: "15%" },
                  { year: "2030", value: 1153, rate: "18%" },
                ];
                const yLabels = ["1,200억", "900억", "600억", "300억", "0"];
                return (
                  <div className="flex gap-2 items-end">
                    {/* y축 */}
                    <div className="flex-shrink-0 text-right pr-1" style={{ height: CHART_H + 40 }}>
                      <div className="flex flex-col justify-between h-full pb-10">
                        {yLabels.map((l, i) => (
                          <p key={i} className="text-[10px] text-gray-300 font-semibold leading-none">{l}</p>
                        ))}
                      </div>
                    </div>
                    {/* 차트 */}
                    <div className="flex-1">
                      <div className="relative" style={{ height: CHART_H }}>
                        {/* 가이드라인 */}
                        {[0, 25, 50, 75, 100].map((p, i) => (
                          <div key={i} className="absolute w-full border-t border-gray-100"
                            style={{ bottom: `${p}%`, zIndex: 0 }} />
                        ))}
                        {/* SOM 기준선 */}
                        <div className="absolute left-0 right-0 flex items-center gap-1"
                          style={{ bottom: SOM_Y, zIndex: 3 }}>
                          <div className="flex-1 border-t-2 border-dashed" style={{ borderColor: "#00B7AF", opacity: 0.7 }} />
                          <span className="text-[9px] font-bold flex-shrink-0 px-1.5 py-0.5 rounded"
                            style={{ color: "#ffffff", backgroundColor: "#00B7AF" }}>
                            SOM 195.5억
                          </span>
                        </div>
                        {/* 막대 + 값 레이블 — z-index 2로 가이드라인 앞 레이어 */}
                        <div className="absolute bottom-0 left-0 right-0 flex gap-3 items-end" style={{ zIndex: 2 }}>
                          {bars.map((bar, i) => {
                            const barH = Math.round((bar.value / MAX) * CHART_H);
                            return (
                              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <p className="text-[11px] font-bold text-gray-700">{bar.value.toLocaleString()}억</p>
                                <div className="w-full rounded-t-xl"
                                  style={{
                                    height: barH,
                                    background: i === 4
                                      ? "linear-gradient(180deg, #00B7AF 0%, #009b95 100%)"
                                      : `rgba(0,183,175,${0.22 + i * 0.15})`,
                                    minHeight: 10,
                                  }} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {/* x축 */}
                      <div className="flex gap-3 mt-2">
                        {bars.map((bar, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <p className="text-[11px] font-semibold text-gray-500">{bar.year}</p>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                              {bar.rate}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="fade-up md:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-3"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.33s" }}>
              <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-1">시장 성장 5대 동인</p>
              {[
                { icon: "⚖️", label: "법 집행 강화", desc: "중대재해처벌법 처벌 사례 증가" },
                { icon: "💰", label: "정부 재정지원", desc: "중소사업장 스마트 안전장비 80% 보조금" },
                { icon: "⛑️", label: "사고예방 압박", desc: "원청 협력사 안전관리 의무 강화" },
                { icon: "📄", label: "문서자동화 수요", desc: "현장 행정 부담 절감 필요" },
                { icon: "🌐", label: "외국인 근로자 증가", desc: "다국어 교육콘텐츠 수요 급증" },
              ].map((d, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-lg flex-shrink-0">{d.icon}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-[13px]">{d.label}</p>
                    <p className="text-gray-400 text-[12px]">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 산정 근거 + 비목별 소요 */}
          <div className="fade-up grid grid-cols-1 md:grid-cols-2 gap-5"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.4s" }}>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-[12px] font-bold uppercase tracking-widest mb-4" style={{ color: "#00B7AF" }}>정량 산정 방법론</p>
              <div className="flex flex-col gap-3">
                {[
                  { method: "SAM 현장 기준 Bottom-Up", desc: "55,700 유료 활성 현장 × 1,150만 원 = SAM 6,405억 기반 도입률 적용" },
                  { method: "TAM/SAM/SOM 3단계", desc: "TAM 1조 1,514억 → SAM 6,405억 → SOM 195.5억 (새임 5년 목표)" },
                  { method: "정책 효과 반영", desc: "중대재해처벌법·중대재해 감축 로드맵 도입률 가속 반영" },
                  { method: "CAGR 22.5%", desc: "SAM 기준 도입률 8% → 18% 시나리오 (512억 → 1,153억)" },
                ].map((r, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#00B7AF" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <div>
                      <span className="font-bold text-gray-900 text-[13px]">{r.method}</span>
                      <span className="text-gray-500 text-[13px]"> — {r.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-6"
              style={{ background: "linear-gradient(135deg, rgba(0,183,175,0.06) 0%, rgba(0,183,175,0.12) 100%)", border: "1px solid rgba(0,183,175,0.22)" }}>
              <p className="text-[12px] font-bold uppercase tracking-widest mb-4" style={{ color: "#00B7AF" }}>비목별 소요명세 반영</p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: "🔍", label: "시장조사 및 데이터 확보 비용", desc: "건설업 사업장 수·안전사고 통계·정책 데이터 수집 및 분석" },
                  { icon: "🗂️", label: "산업 데이터 구매 및 분석 비용", desc: "연구활동비 항목 적용 — 상용 DB 및 통계청 자료 구매" },
                  { icon: "📐", label: "시장 모델링 검증 비용", desc: "TAM/SAM/SOM 산정 근거 외부 검증 및 전문가 자문" },
                ].map((r, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/70 rounded-xl px-4 py-3">
                    <span className="text-lg flex-shrink-0">{r.icon}</span>
                    <div>
                      <p className="font-bold text-gray-900 text-[13px] mb-0.5">{r.label}</p>
                      <p className="text-gray-500 text-[12px] leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          </>)}

          {/* ── 전체 산업시장 탭 ── */}
          {marketTab === "all-industry" && (<>

          {/* sub-header */}
          <div className="text-center mb-10">
            <p className="text-gray-500 text-[15px] max-w-[700px] mx-auto leading-relaxed">
              건설업은 <strong className="text-gray-700">기업체 수 × 현장 수</strong>로, 제조·운수·에너지 등은 <strong className="text-gray-700">사업체 수 = 과금 사업장</strong>으로 환산한
              <strong className="text-gray-700"> 사업장 기반 반복매출 모델</strong>입니다.
              <br /><span className="text-[13px] text-gray-400">※ 통계청 2024년 건설업조사·전국사업체조사 기준. 단가 및 현장배수는 당사 기준 시나리오 가정치입니다.</span>
            </p>
          </div>

          {/* TAM / SAM / SOM 3단 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              {
                tag: "TAM",
                label: "전체 잠재시장",
                figure: "4조 73억",
                unit: "원/년",
                color: "#00B7AF",
                bg: "rgba(0,183,175,0.05)",
                badgeBg: "rgba(0,183,175,0.15)",
                badgeColor: "#00B7AF",
                sites: "294,918",
                sitesLabel: "유료 사업장 합계",
                rows: [
                  "건설 115,948 · 제조 73,890 · 운수 85,450",
                  "전기/가스 18,661 · 수도/폐기 1,729 · 광업 240",
                  "업종별 단가 차등 적용 (900~1,800만 원)",
                ],
                note: "6개 고위험 업종 전체 유료 사업장 기준",
              },
              {
                tag: "SAM",
                label: "유효 공략시장",
                figure: "1조 5,946억",
                unit: "원/년",
                color: "#6366f1",
                bg: "#ffffff",
                badgeBg: "rgba(99,102,241,0.12)",
                badgeColor: "#6366f1",
                sites: "109,391",
                sitesLabel: "실질 공략 사업장",
                rows: [
                  "건설 55,525 · 제조 29,556 · 운수 17,090",
                  "에너지·폐기물·광업 합산 7,220",
                  "건설 全종합 + 전문 상위 25% 등 선별",
                ],
                note: "먼저 도입하는 고위험 핵심 사업장",
              },
              {
                tag: "SOM",
                label: "실현 가능시장 (5년)",
                figure: "478억",
                unit: "원/년",
                color: "#111827",
                bg: "#f9fafb",
                badgeBg: "#f3f4f6",
                badgeColor: "#6b7280",
                sites: "3,282",
                sitesLabel: "확보 목표 사업장",
                rows: [
                  "SAM 109,391개 × 3% 점유 목표",
                  "약 3,282개 유료 사업장",
                  "업종별 직판·파트너·API 복합 전략",
                ],
                note: "5년 ARR 478억 · 이후 업셀링으로 확대",
              },
            ].map((m, i) => (
              <div key={i} className="flex flex-col p-7 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: m.bg }}>
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-block text-[14px] font-black tracking-widest px-3.5 py-1.5 rounded-lg"
                    style={{ backgroundColor: m.badgeBg, color: m.badgeColor }}>
                    {m.tag}
                  </span>
                  <span className="text-[13px] text-gray-400 font-semibold">{m.label}</span>
                </div>
                <p className="text-[13px] font-semibold text-gray-400 mb-1">{m.sitesLabel}</p>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-[32px] font-black leading-none" style={{ color: m.color }}>{m.sites}</span>
                  <span className="text-[13px] text-gray-400 font-semibold">개</span>
                </div>
                <div className="flex items-baseline gap-2 mb-5 pb-5 border-b border-gray-100">
                  <span className="text-[22px] font-extrabold text-gray-800">{m.figure}</span>
                  <span className="text-[13px] text-gray-400">{m.unit}</span>
                </div>
                <div className="flex flex-col gap-2 flex-1 mb-3">
                  {m.rows.map((r, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: m.color }} />
                      <p className="text-gray-500 text-[13px]">{r}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[12px] text-gray-400 border-t border-gray-100 pt-3">{m.note}</p>
              </div>
            ))}
          </div>

          {/* 동심원 + TAM 업종별 분해 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

            {/* 동심원 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col items-center justify-center">
              <p className="text-[12px] font-bold uppercase tracking-widest mb-6 self-start" style={{ color: "#00B7AF" }}>시장 규모 구조</p>
              <div className="relative flex items-center justify-center" style={{ width: 270, height: 270 }}>
                <div className="absolute rounded-full"
                  style={{ width: 270, height: 270, backgroundColor: "rgba(0,183,175,0.07)", border: "2px solid rgba(0,183,175,0.28)" }}>
                  <div className="absolute top-2 w-full text-center">
                    <p className="text-[11px] font-bold" style={{ color: "#00B7AF" }}>TAM</p>
                    <p className="text-[13px] font-extrabold text-gray-700">4조 73억</p>
                    <p className="text-[10px] text-gray-400">294,918 사업장</p>
                  </div>
                </div>
                <div className="absolute rounded-full"
                  style={{ width: 178, height: 178, backgroundColor: "rgba(99,102,241,0.09)", border: "2px solid rgba(99,102,241,0.32)" }}>
                  <div className="absolute top-2 w-full text-center">
                    <p className="text-[11px] font-bold" style={{ color: "#6366f1" }}>SAM</p>
                    <p className="text-[13px] font-extrabold text-gray-700">1조 5,946억</p>
                    <p className="text-[10px] text-gray-400">109,391 사업장</p>
                  </div>
                </div>
                <div className="absolute rounded-full flex items-center justify-center"
                  style={{ width: 86, height: 86, backgroundColor: "rgba(17,24,39,0.06)", border: "2px solid rgba(17,24,39,0.18)" }}>
                  <div className="text-center">
                    <p className="text-[9px] font-bold text-gray-500">SOM</p>
                    <p className="text-[12px] font-extrabold text-gray-700">478억</p>
                    <p className="text-[9px] text-gray-400">3,282개</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-5 text-[11px]">
                {[
                  { color: "#00B7AF", label: "TAM · 전체 산업" },
                  { color: "#6366f1", label: "SAM · 핵심 공략" },
                  { color: "#6b7280", label: "SOM · 5년 목표" },
                ].map((l, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: l.color }} />
                    <span className="text-gray-500">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TAM 업종별 매출 기여 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-7">
              <p className="text-[12px] font-bold uppercase tracking-widest mb-5" style={{ color: "#00B7AF" }}>TAM 업종별 매출 기여</p>
              {(() => {
                const items = [
                  { name: "건설업",          rev: 20871, sites: "115,948",  price: "1,800만", color: "#00B7AF" },
                  { name: "제조업",          rev:  8867, sites:  "73,890",  price: "1,200만", color: "#0ea5e9" },
                  { name: "운수·창고업",     rev:  7691, sites:  "85,450",  price: "900만",   color: "#6366f1" },
                  { name: "전기·가스·증기",  rev:  2426, sites:  "18,661",  price: "1,300만", color: "#f59e0b" },
                  { name: "수도·하수·폐기",  rev:   190, sites:   "1,729",  price: "1,100만", color: "#10b981" },
                  { name: "광업",            rev:    29, sites:     "240",  price: "1,200만", color: "#8b5cf6" },
                ];
                const maxRev = 20871;
                return (
                  <div className="flex flex-col gap-3.5">
                    {items.map((ind, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-semibold text-gray-800">{ind.name}</span>
                            <span className="text-[10px] text-gray-400">{ind.sites}개 @{ind.price}</span>
                          </div>
                          <span className="text-[12px] font-bold" style={{ color: ind.color }}>
                            {ind.rev >= 10000 ? `${(ind.rev / 10000).toFixed(1)}조` : `${ind.rev.toLocaleString()}억`}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full"
                            style={{ width: `${Math.max((ind.rev / maxRev) * 100, 1)}%`, backgroundColor: ind.color }} />
                        </div>
                      </div>
                    ))}
                    <div className="mt-1 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-[12px] font-bold text-gray-500">총 TAM</span>
                      <span className="text-[14px] font-extrabold" style={{ color: "#00B7AF" }}>4조 73억 원/년</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* 건설업 ARPA 높은 이유 + SAM 선별 기준 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

            {/* 건설업 ARPA */}
            <div className="rounded-2xl p-6"
              style={{ background: "linear-gradient(135deg, rgba(0,183,175,0.06) 0%, rgba(0,183,175,0.12) 100%)", border: "1px solid rgba(0,183,175,0.22)" }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🏗</span>
                <p className="text-[14px] font-extrabold text-gray-900">건설업 ARPA가 가장 높은 이유</p>
              </div>
              <p className="text-[13px] text-gray-500 mb-4 leading-relaxed">
                건설업은 다현장·협력사·준법문서·교육기록 관리 수요가 복합적으로 존재하여
                제조업 대비 사업장당 ARPA를 높게 설정하였습니다.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { icon: "🔄", text: "현장 개설·종료 잦음 → 운영 복잡도 높음" },
                  { icon: "👷", text: "협력사·외국인근로자 다수 → 교육 수요 큼" },
                  { icon: "📄", text: "위험성평가·TBM·점검일지·교육기록 증빙 필수" },
                  { icon: "⚖️", text: "원청 대응 서류 → 중대재해처벌법 압박 최강" },
                ].map((it, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white/70 rounded-xl px-4 py-2.5">
                    <span className="text-base">{it.icon}</span>
                    <p className="text-gray-700 text-[13px]">{it.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SAM 선별 기준 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="text-[12px] font-bold uppercase tracking-widest mb-4" style={{ color: "#6366f1" }}>SAM 선별 기준</p>
              <div className="flex flex-col gap-3">
                {[
                  { name: "건설업", badge: "55,525개", desc: "종합건설 全체 + 전문공사 상위 25% 현장 포함" },
                  { name: "제조업", badge: "29,556개", desc: "10인 이상 제조사업장 73,890개 중 고위험·복수라인 40%" },
                  { name: "운수·창고", badge: "17,090개", desc: "물류센터·야드·창고 중심 전체 20% 선별" },
                  { name: "에너지·기타", badge: "7,220개", desc: "전기/가스·수도/폐기·광업 합산 규제강도 높은 사업장 35%" },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-gray-900 text-[13px]">{s.name}</span>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "rgba(99,102,241,0.12)", color: "#6366f1" }}>
                          {s.badge}
                        </span>
                      </div>
                      <p className="text-gray-400 text-[12px]">{s.desc}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-1 pt-3 border-t border-gray-100 flex justify-between">
                  <span className="text-[12px] font-bold text-gray-500">총 SAM 사업장</span>
                  <span className="text-[13px] font-extrabold" style={{ color: "#6366f1" }}>109,391개 · 1조 5,946억</span>
                </div>
              </div>
            </div>
          </div>

          {/* 업종별 공략 우선순위 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-7 mb-6">
            <p className="text-[12px] font-bold uppercase tracking-widest mb-5" style={{ color: "#00B7AF" }}>업종별 공략 우선순위</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { rank: "1순위", name: "건설업", icon: "🏗", color: "#00B7AF",
                  arpa: "1,800만 원", sam: "9,995억",
                  points: ["원청 1사 → 현장·협력사 확산", "문서·교육 복합 수요 최강", "중대재해처벌법 압박 가장 큼"] },
                { rank: "2순위", name: "제조업", icon: "⚙️", color: "#0ea5e9",
                  arpa: "1,200만 원", sam: "3,547억",
                  points: ["고정 사업장 · 이탈률 낮음", "CCTV·센서 연동 최적", "반복 위험행동 탐지 유리"] },
                { rank: "3순위", name: "운수·창고업", icon: "🚛", color: "#6366f1",
                  arpa: "900만 원", sam: "1,538억",
                  points: ["물류센터·야드 CCTV 탐지", "지게차·차량 시나리오 명확", "물류거점 단위 빠른 확산"] },
                { rank: "4순위", name: "전기·가스·기타", icon: "⚡", color: "#f59e0b",
                  arpa: "1,100~1,300만 원", sam: "866억",
                  points: ["규제 강도 높아 ARPA 우수", "사업장 수 적어도 객단가 큼", "레퍼런스 중심 확산"] },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <p className="text-[10px] font-black tracking-widest" style={{ color: s.color }}>{s.rank}</p>
                      <p className="text-[14px] font-extrabold text-gray-900">{s.name}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">@{s.arpa}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${s.color}18`, color: s.color }}>SAM {s.sam}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {s.points.map((pt, j) => (
                      <div key={j} className="flex items-start gap-1.5">
                        <span className="flex-shrink-0 w-1 h-1 rounded-full mt-1.5" style={{ backgroundColor: s.color }} />
                        <p className="text-gray-500 text-[12px] leading-relaxed">{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 가정치 안내 */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>
              <p className="font-bold text-amber-800 text-[13px] mb-1">통계 출처 및 가정치 명시</p>
              <p className="text-amber-700 text-[13px] leading-relaxed">
                <strong>공식 통계:</strong> 건설업 기업체 수(통계청 2024년 건설업조사) — 종합 15,861개·전문 73,240개·합계 89,101개.
                제조·운수·전기/가스·수도/폐기·광업 사업체 수는 2024년 전국사업체조사 기준.
                5인 이상 비율 12.69%는 전체 사업체 대비 산출값.
                <br /><strong>사업화 가정치:</strong> 건설업 현장 배수(종합 2.0 · 전문 1.15 / SAM 전문 1.3), 업종별 연간 단가(건설 1,800만 · 제조 1,200만 · 운수 900만 · 전기/가스 1,300만 · 수도/폐기 1,100만 · 광업 1,200만 원), SOM 3% 목표치.
              </p>
            </div>
          </div>

          </>)}

        </div>
      </section>

            {/* ── 새임 매출 성장 로드맵 ── */}
      <section id="revenue-roadmap" className="bg-white py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6">

          {/* 헤더 */}
          <div className="fade-up text-center mb-14" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
              매출 성장 로드맵
            </span>
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-gray-900 leading-tight mb-4">
              2025 실적 기반<br />
              <span style={{ color: "#00B7AF" }}>2030년까지 예상 매출 성장</span>
            </h2>
            <p className="text-gray-500 text-[15px] max-w-[560px] mx-auto leading-relaxed">
              2025년 실매출 2.1억 원을 출발점으로, B2B 업셀링 → SaaS 확장 → B2G 공공조달 → 파트너십 순으로 성장 드라이버가 단계적으로 작동합니다.<br />
              <span className="text-[13px] text-gray-400">※ 2026년 이후는 사업 계획 기반 예측치입니다.</span>
            </p>
          </div>

          {/* 메인 차트 */}
          <div className="fade-up bg-white rounded-2xl border border-gray-200 p-7 md:p-10 mb-6"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.1s" }}>

            {/* 차트 상단 요약 */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-1">새임 (SEIIM) 연간 매출 추정 (억 원)</p>
                <p className="text-[17px] font-extrabold text-gray-900">2025 실적 → 2030 목표 성장 경로</p>
              </div>
              <div className="flex gap-5">
                <div className="text-center">
                  <p className="text-[26px] font-black text-gray-700">2.1억</p>
                  <p className="text-[11px] text-gray-400 font-semibold">2025 실적</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-[26px] font-black" style={{ color: "#00B7AF" }}>155억</p>
                  <p className="text-[11px] text-gray-400 font-semibold">2030 목표</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-[26px] font-black" style={{ color: "#00B7AF" }}>~130%</p>
                  <p className="text-[11px] text-gray-400 font-semibold">예상 CAGR</p>
                </div>
              </div>
            </div>

            {/* 막대 그래프 */}
            {(() => {
              const CHART_H = 180;
              const data = [
                { year: "2025", value: 2.1,  label: "2.1억", actual: true,  driver: "실적" },
                { year: "2026", value: 8,    label: "8억",   actual: false, driver: "업셀링" },
                { year: "2027", value: 22,   label: "22억",  actual: false, driver: "SaaS" },
                { year: "2028", value: 52,   label: "52억",  actual: false, driver: "B2G" },
                { year: "2029", value: 98,   label: "98억",  actual: false, driver: "파트너십" },
                { year: "2030", value: 155,  label: "155억", actual: false, driver: "SOM" },
              ];
              const MAX = 155;
              return (
                <div className="flex gap-2">
                  {/* y축 */}
                  <div className="flex-shrink-0 flex flex-col justify-between text-right pr-2"
                    style={{ height: CHART_H + 76 }}>
                    <div />
                    {["155억","120억","80억","40억","0"].map((l, i) => (
                      <p key={i} className="text-[10px] text-gray-300 font-semibold">{l}</p>
                    ))}
                    <div />
                  </div>

                  {/* 차트 본체 */}
                  <div className="flex-1 flex flex-col gap-2">
                    {/* 막대 영역 — 값 레이블을 z-index로 가이드라인 앞에 배치 */}
                    <div className="relative" style={{ height: CHART_H + 26 }}>
                      {/* 가이드라인 — z-index 0 */}
                      {[0, 25, 50, 75, 100].map((p, i) => (
                        <div key={i} className="absolute w-full border-t border-gray-100"
                          style={{ bottom: `${(p / 100) * CHART_H}px`, zIndex: 0 }} />
                      ))}
                      {/* 막대 + 값 레이블 — z-index 2 (가이드라인 앞 레이어) */}
                      <div className="absolute bottom-0 left-0 right-0 flex gap-3 items-end" style={{ zIndex: 2 }}>
                        {data.map((bar, i) => {
                          const h = Math.max(Math.round((bar.value / MAX) * CHART_H), 6);
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                              <p className="text-[12px] font-extrabold"
                                style={{ color: bar.actual ? "#9ca3af" : "#111827" }}>
                                {bar.label}
                              </p>
                              <div className="w-full rounded-t-xl"
                                style={{
                                  height: h,
                                  background: bar.actual
                                    ? "#d1d5db"
                                    : i === 5
                                    ? "linear-gradient(180deg, #00B7AF 0%, #009b95 100%)"
                                    : `rgba(0,183,175,${0.2 + (i - 1) * 0.16})`,
                                }} />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* x축 레이블 행 */}
                    <div className="flex gap-3">
                      {data.map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <p className="text-[11px] font-bold text-gray-600">{bar.year}</p>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: bar.actual ? "#f3f4f6" : "rgba(0,183,175,0.1)",
                              color: bar.actual ? "#9ca3af" : "#00B7AF",
                            }}>
                            {bar.driver}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 단계별 성장 드라이버 */}
          <div className="fade-up grid grid-cols-2 md:grid-cols-5 gap-3 mb-6"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.2s" }}>
            {[
              { year: "2026", amount: "8억", yoy: "+280%", driver: "기존 고객 업셀링", desc: "세이프버디·세이프에듀 고객사 AI 기능 전환", color: "rgba(0,183,175,0.2)" },
              { year: "2027", amount: "22억", yoy: "+175%", driver: "SaaS 구독 확장", desc: "신규 건설사 온보딩 및 월정액 구독 본격화", color: "rgba(0,183,175,0.38)" },
              { year: "2028", amount: "52억", yoy: "+136%", driver: "B2G 공공조달", desc: "벤처나라 등록 및 공공기관 PoC 계약 확대", color: "rgba(0,183,175,0.55)" },
              { year: "2029", amount: "98억", yoy: "+88%", driver: "파트너십 확대", desc: "PwC·협회 채널 통한 영업 네트워크 확장", color: "rgba(0,183,175,0.72)" },
              { year: "2030", amount: "155억", yoy: "+58%", driver: "SOM 목표 달성", desc: "1,700현장 확보 및 API/SDK 라이선스 수익화", color: "#00B7AF" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-4 border border-gray-100 bg-gray-50 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-gray-400">{s.year}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: s.color, color: i >= 3 ? "#fff" : "#007a75" }}>
                    {s.yoy}
                  </span>
                </div>
                <p className="text-[22px] font-black text-gray-900">{s.amount}</p>
                <p className="text-[12px] font-bold text-gray-700">{s.driver}</p>
                <p className="text-[11px] text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* 하단 주석 */}
          <div className="fade-up rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 flex items-start gap-3"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.3s" }}>
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="text-amber-700 text-[13px] leading-relaxed">
              <strong className="text-amber-800">2025년 2.1억 원은 실제 매출 기준</strong>이며, 2026년 이후 수치는 B2B 업셀링·SaaS 구독·B2G 공공조달·파트너십 성과를 단계적으로 반영한 사업 계획 기반 예측치입니다.
              시장 환경·정책 변화·고객 확보 속도에 따라 실제 수치는 달라질 수 있습니다.
            </p>
          </div>

        </div>
      </section>

            {/* ── 마케팅 및 판로 전략 ── */}
      <section id="marketing" className="bg-gradient-to-b from-gray-50 to-white py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6">

          {/* 섹션 헤더 */}
          <div className="fade-up text-center mb-14" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase mb-4"
              style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
              마케팅 &amp; 판로 전략
            </span>
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-gray-900 leading-tight mb-3">
              구체적인 수요처와 판로 확보 방안
            </h2>
            <p className="text-gray-500 text-[16px] max-w-[620px] mx-auto leading-relaxed">
              B2B·B2G·SaaS 3트랙 전략과 파트너십 네트워크를 통해 건설·제조·공공 시장을 동시 공략합니다
            </p>
          </div>

          {/* ① 타겟 수요처 */}
          <div className="fade-up mb-12" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.08s" }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: "#00B7AF" }} />
              <h3 className="text-[17px] font-extrabold text-gray-800">주요 사업화 목표 수요처</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                    </svg>
                  ),
                  tag: "대형 건설사",
                  bgColor: "rgba(0,183,175,0.05)",
                  borderColor: "rgba(0,183,175,0.22)",
                  title: "현대건설 · DL이앤씨 · 삼성물산",
                  desc: "ESG 안전 경영 강화 및 스마트 현장 구축 의무 대응",
                  badges: ["안전문서 자동화", "다국어 교육콘텐츠", "ESG 보고"],
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                    </svg>
                  ),
                  tag: "중소 건설사",
                  bgColor: "#ffffff",
                  borderColor: "#e5e7eb",
                  title: "스마트 안전 의무 대응 수요",
                  desc: "중대재해처벌법·건설안전특별법 대응에 필요한 AI 기반 저비용 솔루션",
                  badges: ["법규 자동 대응", "CCTV 위험인식", "비용 절감"],
                },
                {
                  icon: (
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                    </svg>
                  ),
                  tag: "산업단지·제조",
                  bgColor: "#f9fafb",
                  borderColor: "#e5e7eb",
                  title: "산업단지 및 제조기업",
                  desc: "외국인 근로자 다국어 안전교육 수요 증가 및 안전관리 시스템 고도화",
                  badges: ["외국인 근로자 교육", "산업안전 문서화", "시스템 연계"],
                },
              ].map((item, i) => (
                <div key={i} className="fade-up rounded-2xl border p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: item.bgColor, borderColor: item.borderColor, opacity: 0, transform: "translateY(24px)", transition: `all 0.6s ease ${0.15 + i * 0.1}s` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                      {item.icon}
                    </div>
                    <p className="text-[20px] font-black text-gray-900 leading-tight">{item.tag}</p>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-semibold text-gray-500 text-[13px] mb-1.5">{item.title}</p>
                    <p className="text-gray-400 text-[13px] leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {item.badges.map((b, j) => (
                      <span key={j} className="text-[11px] px-2.5 py-1 rounded-lg font-semibold text-gray-600 bg-gray-100">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ② 3트랙 판로 전략 */}
          <div className="fade-up mb-12" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.28s" }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: "#00B7AF" }} />
              <h3 className="text-[17px] font-extrabold text-gray-800">3-Track 판로 전략</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  num: "B2B",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                  ),
                  title: "기업 직접 영업 · 업셀링",
                  sub: "세이프버디 · 세이프에듀 기반 고객 확장",
                  bg: "rgba(0,183,175,0.05)",
                  border: "rgba(0,183,175,0.22)",
                  points: [
                    "기존 고객사 신뢰 기반 빠른 도입 전환",
                    "기업 맞춤형 교육 콘텐츠로 산업 시장 공략",
                    "AI 문서 자동화 기능 추가 구독 전환",
                    "Customer Success 기반 이탈률 최소화",
                  ],
                },
                {
                  num: "B2G",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  ),
                  title: "공공기관 PoC · 벤처나라 등록",
                  sub: "화성도시공사 · 한국수자원조사기술원",
                  bg: "#ffffff",
                  border: "#e5e7eb",
                  points: [
                    "나라장터 '벤처나라' 물품등록 B2G 타겟마케팅",
                    "공공기관 협업 → 공공 안전교육 플랫폼 확장",
                    "공공 레퍼런스 확보 → 민간 신뢰도 제고",
                    "정부 R&D·조달 연계 지속 확장",
                  ],
                },
                {
                  num: "SaaS",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>
                  ),
                  title: "구독형 SaaS + API/SDK 라이선스",
                  sub: "지속적 수익 창출 구조 마련",
                  bg: "#f9fafb",
                  border: "#e5e7eb",
                  points: [
                    "월정액 구독형 SaaS (기업 규모별 티어)",
                    "API/SDK 라이선스 → 타 시스템 연계",
                    "사용량 기반 과금으로 확장성 확보",
                    "구독 기반 예측 가능한 안정 수익 구조",
                  ],
                },
              ].map((item, i) => (
                <div key={i} className="fade-up rounded-2xl border p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: item.bg, borderColor: item.border, opacity: 0, transform: "translateY(24px)", transition: `all 0.6s ease ${0.35 + i * 0.1}s` }}>
                  <div className="flex items-center gap-3">
                    <div className="px-3 h-10 rounded-2xl flex items-center justify-center font-black text-[13px] text-white tracking-wide flex-shrink-0"
                      style={{ backgroundColor: "#00B7AF" }}>
                      {item.num}
                    </div>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-900 text-[15px] mb-0.5">{item.title}</p>
                    <p className="text-[12px] font-semibold text-gray-400">{item.sub}</p>
                  </div>
                  <ul className="flex flex-col gap-2 mt-auto">
                    {item.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-600 text-[13px]">
                        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#00B7AF" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ③ 파트너십 네트워크 */}
          <div className="fade-up mb-10" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.5s" }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: "#00B7AF" }} />
              <h3 className="text-[17px] font-extrabold text-gray-800">유관기관 파트너십 네트워크</h3>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
              <p className="text-gray-500 text-[13px] mb-6 leading-relaxed">
                파트너십 기반 협력관계를 통해 고객 영업 네트워크를 확장하고, 공공·민간 시장 신뢰도를 동시에 확보합니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    org: "(사)대한중대재해예방협회",
                    role: "안전 법규 연계 및 회원사 대상 공동 마케팅",
                    type: "안전 전문기관",
                  },
                  {
                    org: "삼일회계법인 (PwC)",
                    role: "ESG 경영 및 안전 컴플라이언스 솔루션 협력",
                    type: "글로벌 컨설팅",
                  },
                  {
                    org: "대한전문건설협회",
                    role: "전문건설 회원사 교육콘텐츠 보급 · 영업 확대",
                    type: "건설 업계단체",
                  },
                ].map((p, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{p.type}</span>
                      <p className="font-extrabold text-gray-900 text-[14px] leading-snug mt-0.5 mb-1">{p.org}</p>
                      <p className="text-gray-500 text-[12px] leading-relaxed">{p.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ④ 전략 요약 배너 */}
          <div className="fade-up rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10"
            style={{ background: "linear-gradient(135deg, rgba(0,183,175,0.07) 0%, rgba(0,183,175,0.13) 100%)", border: "1px solid rgba(0,183,175,0.22)", opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.65s" }}>
            <div className="flex-1 text-center md:text-left">
              <p className="text-[12px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "#00B7AF" }}>마케팅 전략 핵심 요약</p>
              <p className="text-[19px] md:text-[21px] font-extrabold text-gray-900 leading-snug">
                B2B 업셀링 · B2G 공공조달 · SaaS 구독으로<br className="hidden md:block" /> 3트랙 동시 고객 확보
              </p>
            </div>
            <div className="flex gap-6 md:gap-10 flex-shrink-0">
              {[
                { label: "타겟 수요처", value: "3개 분야" },
                { label: "판로 트랙", value: "B2B·B2G·SaaS" },
                { label: "핵심 파트너", value: "3개 기관" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-[18px] md:text-[22px] font-black leading-none" style={{ color: "#00B7AF" }}>{stat.value}</p>
                  <p className="text-[11px] text-gray-500 font-semibold mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 비즈니스 모델 ── */}
      <section id="business-model" className="bg-white py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6">

          {/* 헤더 */}
          <div className="fade-up text-center mb-14" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
              수익모델 · 비즈니스모델
            </span>
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-gray-900 leading-tight mb-4">
              세이프버디가 만드는<br />
              <span style={{ color: "#00B7AF" }}>고객 가치와 수익 구조</span>
            </h2>
            <p className="text-gray-500 text-[16px] max-w-[600px] mx-auto leading-relaxed">
              사업장이 늘어날수록, 협력사가 연결될수록<br className="hidden md:block" />
              플랫폼 가치와 매출이 함께 성장하는 구조입니다.
            </p>
          </div>

          {/* 2열 레이아웃 */}
          <div className="fade-up grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.1s" }}>

            {/* ── 좌측: 플랫폼 구조 다이어그램 ── */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col">
              <p className="text-[12px] font-bold uppercase tracking-widest mb-6" style={{ color: "#00B7AF" }}>플랫폼 참여자 구조</p>

              {/* 다이어그램 */}
              <div className="flex-1 flex items-center justify-center">
                <div className="relative" style={{ width: 320, height: 320 }}>

                  {/* SVG 연결선 */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320" fill="none">
                    {/* 중심 → 사업주 */}
                    <line x1="160" y1="160" x2="160" y2="68" stroke="#00B7AF" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5" />
                    {/* 중심 → 안전관리자 */}
                    <line x1="160" y1="160" x2="58" y2="252" stroke="#00B7AF" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5" />
                    {/* 중심 → 근로자 */}
                    <line x1="160" y1="160" x2="262" y2="252" stroke="#00B7AF" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5" />
                    {/* 안전관리자 ↔ 근로자 */}
                    <line x1="58" y1="252" x2="262" y2="252" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                    {/* 아로헤드 */}
                    <polygon points="160,60 155,72 165,72" fill="#00B7AF" opacity="0.6" />
                    <polygon points="64,247 54,258 68,255" fill="#00B7AF" opacity="0.6" />
                    <polygon points="256,247 252,258 266,255" fill="#00B7AF" opacity="0.6" />
                  </svg>

                  {/* 중심: SafeBuddy */}
                  <div className="absolute flex items-center justify-center"
                    style={{ left: 110, top: 110, width: 100, height: 100, borderRadius: "50%",
                      background: "linear-gradient(135deg, #00B7AF 0%, #009b95 100%)",
                      boxShadow: "0 8px 32px rgba(0,183,175,0.35)" }}>
                    <div className="text-center">
                      <p className="text-white text-[11px] font-black tracking-widest leading-none">Safe</p>
                      <p className="text-white text-[11px] font-black tracking-widest leading-none">Buddy</p>
                      <div className="w-8 h-0.5 bg-white/40 mx-auto my-1" />
                      <p className="text-white/80 text-[9px] font-semibold">AI 안전플랫폼</p>
                    </div>
                  </div>

                  {/* 사업주 노드 */}
                  <div className="absolute text-center" style={{ left: 110, top: 10, width: 100 }}>
                    <div className="w-14 h-14 rounded-2xl mx-auto mb-1.5 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #f0fffe 0%, #ccfbf8 100%)", border: "2px solid rgba(0,183,175,0.4)", boxShadow: "0 4px 16px rgba(0,183,175,0.15)" }}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color: "#00B7AF" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                      </svg>
                    </div>
                    <p className="text-[12px] font-bold text-gray-800">사업주</p>
                    <p className="text-[10px] text-gray-400 leading-tight">구독료 지불</p>
                  </div>

                  {/* 안전관리자 노드 */}
                  <div className="absolute text-center" style={{ left: 6, top: 218, width: 110 }}>
                    <div className="w-14 h-14 rounded-2xl mx-auto mb-1.5 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)", border: "2px solid rgba(99,102,241,0.35)", boxShadow: "0 4px 16px rgba(99,102,241,0.12)" }}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color: "#6366f1" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <p className="text-[12px] font-bold text-gray-800">안전관리자</p>
                    <p className="text-[10px] text-gray-400 leading-tight">업무 자동화</p>
                  </div>

                  {/* 근로자 노드 */}
                  <div className="absolute text-center" style={{ left: 204, top: 218, width: 110 }}>
                    <div className="w-14 h-14 rounded-2xl mx-auto mb-1.5 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)", border: "2px solid rgba(234,179,8,0.35)", boxShadow: "0 4px 16px rgba(234,179,8,0.12)" }}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color: "#ca8a04" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <p className="text-[12px] font-bold text-gray-800">근로자</p>
                    <p className="text-[10px] text-gray-400 leading-tight">모바일 참여</p>
                  </div>

                  {/* 플로팅 라벨들 */}
                  <div className="absolute text-center" style={{ left: 164, top: 96, width: 80 }}>
                    <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: "rgba(0,183,175,0.12)", color: "#00B7AF" }}>
                      구독료 수익
                    </span>
                  </div>
                  <div className="absolute" style={{ left: -8, top: 176, width: 68 }}>
                    <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: "rgba(99,102,241,0.12)", color: "#6366f1" }}>
                      업무 자동화
                    </span>
                  </div>
                  <div className="absolute text-right" style={{ right: -8, top: 176, width: 72 }}>
                    <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: "rgba(202,138,4,0.12)", color: "#b45309" }}>
                      교육·참여
                    </span>
                  </div>
                </div>
              </div>

              {/* 협력사 확장 배너 */}
              <div className="mt-6 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{ background: "linear-gradient(90deg, rgba(0,183,175,0.08) 0%, rgba(99,102,241,0.08) 100%)", border: "1px solid rgba(0,183,175,0.18)" }}>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "#00B7AF" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <p className="text-[12px] text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">협력사 연결 시 상생관리 체계 구축</strong> —
                  원청·협력사가 같은 플랫폼을 쓸수록 안전관리 일관성이 높아지고,
                  플랫폼 가치와 매출이 함께 커집니다.
                </p>
              </div>
            </div>

            {/* ── 우측: 가치 제안 + 수익모델 카드 ── */}
            <div className="flex flex-col gap-6">

              {/* 가치 제안 헤드라인 */}
              <div className="rounded-3xl p-7"
                style={{ background: "linear-gradient(135deg, #00B7AF 0%, #0097a7 60%, #1a237e 100%)" }}>
                <p className="text-white/70 text-[12px] font-bold uppercase tracking-widest mb-3">세이프버디 도입 효과</p>
                <h3 className="text-white text-[22px] md:text-[26px] font-extrabold leading-snug mb-5">
                  경제적인 비용으로<br />
                  안전관리에 집중하고,<br />
                  <span className="text-[#7ffff4]">중대재해처벌법 대응까지.</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "💰", label: "비용 절감", desc: "문서·교육·점검 자동화로\n행정부담 80% 감소" },
                    { icon: "⚖️", label: "법 대응", desc: "중대재해처벌법\n증빙 체계 자동 구축" },
                    { icon: "🛡", label: "체계 강화", desc: "스마트 안전보건\n관리체계 구축" },
                    { icon: "📈", label: "확장성", desc: "사업장·협력사 확대 시\n비용 대비 효과 증대" },
                  ].map((v, i) => (
                    <div key={i} className="bg-white/10 rounded-2xl px-4 py-3 backdrop-blur-sm border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{v.icon}</span>
                        <p className="text-white font-bold text-[13px]">{v.label}</p>
                      </div>
                      <p className="text-white/70 text-[11px] leading-relaxed whitespace-pre-line">{v.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 수익모델 카드 2개 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* 카드 1: 구독형 */}
                <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "rgba(0,183,175,0.12)", color: "#00B7AF" }}>B2B</span>
                    <span className="text-[10px] font-semibold text-gray-400">월 구독 / 연 구독</span>
                  </div>
                  <p className="text-[17px] font-extrabold text-gray-900 mb-1">WEB 서비스 구독</p>
                  <p className="text-[12px] text-gray-400 mb-4">사업장별 월 구독형 플랜</p>
                  <div className="flex-1 flex flex-col gap-2 mb-5">
                    {[
                      "사업장 규모·업종별 맞춤 요금",
                      "건설업 > 제조업 단가 구조",
                      "Admin 계정 + 사용자 유연 확장",
                      "WEB / APP 서비스 포함",
                      "클라우드 기반 · 즉시 운영",
                      "Lite · Standard · Enterprise 단계",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#00B7AF" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <p className="text-gray-600 text-[13px]">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl py-3 px-4 text-center"
                    style={{ backgroundColor: "rgba(0,183,175,0.08)", border: "1px solid rgba(0,183,175,0.2)" }}>
                    <p className="text-[12px] font-bold" style={{ color: "#00B7AF" }}>사업장 수만큼 반복 매출 발생</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">여러 사업장 · 협력사 확산 시 ARR 성장</p>
                  </div>
                </div>

                {/* 카드 2: 구축형 */}
                <div className="flex flex-col rounded-2xl border border-gray-200 bg-gray-900 p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1.5">
                      <span className="text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full bg-white/10 text-white/80">B2B</span>
                      <span className="text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full bg-white/10 text-white/80">B2G</span>
                    </div>
                    <span className="text-[10px] font-semibold text-white/40">맞춤 협의</span>
                  </div>
                  <p className="text-[17px] font-extrabold text-white mb-1">Customized Pricing</p>
                  <p className="text-[12px] text-white/40 mb-4">구축형 · 엔터프라이즈 플랜</p>
                  <div className="flex-1 flex flex-col gap-2 mb-5">
                    {[
                      "구축기간 및 비용 별도 협의",
                      "그룹웨어 · 기존 시스템 계정 연동",
                      "고객사 전용 WEB/APP 환경 제공",
                      "전용 서버 · 별도 구축 환경 지원",
                      "API / SDK 연동 가능",
                      "맞춤형 리포트 · 대시보드 · 템플릿",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "#7ffff4" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <p className="text-white/75 text-[13px]">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl py-3 px-4 text-center"
                    style={{ backgroundColor: "rgba(127,255,244,0.08)", border: "1px solid rgba(127,255,244,0.2)" }}>
                    <p className="text-[12px] font-bold" style={{ color: "#7ffff4" }}>초기 구축비 + 운영 구독료 이중 수익</p>
                    <p className="text-[11px] text-white/40 mt-0.5">대기업 · 공공기관 · 그룹사 대상</p>
                  </div>
                </div>
              </div>

              {/* 확장형 수익 띠 */}
              <div className="rounded-2xl px-6 py-5 border border-gray-100"
                style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.05) 0%, rgba(0,183,175,0.05) 100%)" }}>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-3 text-gray-400">확장형 수익 · Add-on</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "추가 사업장 도입", "본사 통합 대시보드", "협력사 확산",
                    "다국어 교육 모듈", "리포트 고도화", "운영 컨설팅",
                    "외부 플랫폼 API/SDK",
                  ].map((tag, i) => (
                    <span key={i} className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 사회적 임팩트 ── */}
      <section id="social-impact" className="py-20 md:py-28" style={{ backgroundColor: "rgb(249,250,251)" }}>
        <div className="max-w-[1100px] mx-auto px-6">

          {/* 헤더 */}
          <div className="fade-up text-center mb-14" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
              사회 · 환경적 임팩트
            </span>
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-gray-900 leading-tight mb-4">
              매출이 늘수록<br />
              <span style={{ color: "#00B7AF" }}>보호받는 현장도 함께 늘어납니다</span>
            </h2>
            <p className="text-gray-500 text-[16px] max-w-[620px] mx-auto leading-relaxed">
              새임의 수익모델은 도입 사업장 수·교육 이수자 수·위험탐지 건수가<br className="hidden md:block" />
              매출과 함께 증가하는 임팩트 확산 구조입니다.
            </p>
          </div>

          {/* 핵심 수치 배너 */}
          <div className="fade-up grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.05s" }}>
            {[
              { value: "589명", label: "2024 산업재해 사고사망자", sub: "고용노동부 재해조사 기준", color: "#ef4444" },
              { value: "51.8세", label: "건설현장 근로자 평균연령", sub: "고령화·접근성 개선 필요", color: "#f59e0b" },
              { value: "83.3%", label: "외국인 근로자 증가 체감", sub: "다국어 교육 수요 급증", color: "#6366f1" },
              { value: "5인↑", label: "중대재해처벌법 확대 적용", sub: "2024.1.27 전체 사업장", color: "#00B7AF" },
            ].map((s, i) => (
              <div key={i} className="fade-up bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center"
                style={{ opacity: 0, transform: "translateY(24px)", transition: `all 0.5s ease ${0.1 + i * 0.07}s` }}>
                <p className="text-[30px] font-black leading-none mb-2" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[13px] font-bold text-gray-800 mb-1">{s.label}</p>
                <p className="text-[11px] text-gray-400">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* 3단계 임팩트 흐름 */}
          <div className="fade-up mb-12" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.12s" }}>
            <p className="text-center text-[12px] font-bold uppercase tracking-widest mb-7 text-gray-400">수익모델 단계별 사회적 임팩트</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 relative">
              {/* 연결선 (데스크톱) */}
              <div className="hidden md:block absolute top-10 left-[33%] right-[33%] h-0.5 bg-gradient-to-r from-teal-200 via-indigo-200 to-violet-200 z-0" />

              {[
                {
                  step: "1단계",
                  title: "구축",
                  eng: "Build",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  ),
                  color: "#00B7AF",
                  bg: "rgba(0,183,175,0.07)",
                  border: "rgba(0,183,175,0.25)",
                  social: ["안전보건관리체계 디지털 기반 구축", "분절된 문서·점검·교육 일원화", "5인 이상 중소사업장 법 준수 실현"],
                  env: ["수기 점검표·교육일지 디지털 전환", "종이 인쇄·보관 비용 절감"],
                  kpis: ["신규 구축 사업장 수", "디지털 전환 문서 수", "종이 사용량 감소량"],
                },
                {
                  step: "2단계",
                  title: "구독",
                  eng: "Subscribe",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  color: "#6366f1",
                  bg: "rgba(99,102,241,0.07)",
                  border: "rgba(99,102,241,0.25)",
                  social: ["위험요인 탐지 상시화", "안전관리자 업무부담 경감", "외국인·고령 근로자 교육 접근성 개선", "근로자 참여형 안전문화 형성"],
                  env: ["교육자료 디지털화 · 중복 인쇄 감소", "템플릿 재사용으로 중복 제작 축소"],
                  kpis: ["위험 이벤트 탐지 건수", "교육 이수율", "외국인 교육 이수자 수", "관리자 행정시간 절감률"],
                },
                {
                  step: "3단계",
                  title: "확장",
                  eng: "Expand",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  ),
                  color: "#8b5cf6",
                  bg: "rgba(139,92,246,0.07)",
                  border: "rgba(139,92,246,0.25)",
                  social: ["원청→협력사 안전관리 사각지대 축소", "공급망 전체 안전수준 균등화", "API/SDK 통해 도달 범위 확대", "그룹사 표준 안전체계 구축"],
                  env: ["본사 통합 대시보드로 중복 보고 제거", "표준 템플릿 그룹 단위 재사용"],
                  kpis: ["고객당 평균 사업장 수", "협력사 확산 계정 수", "API/SDK 연동 고객 수", "표준 템플릿 재사용률"],
                },
              ].map((stage, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center px-4 pb-6">
                  {/* 스텝 원 */}
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 border-2"
                    style={{ backgroundColor: stage.bg, borderColor: stage.border, color: stage.color, boxShadow: `0 4px 20px ${stage.color}22` }}>
                    {stage.icon}
                  </div>
                  <span className="text-[10px] font-black tracking-widest mb-1" style={{ color: stage.color }}>{stage.step}</span>
                  <p className="text-[18px] font-extrabold text-gray-900 mb-0.5">{stage.title}</p>
                  <p className="text-[12px] text-gray-400 mb-5">{stage.eng}</p>

                  {/* 사회 임팩트 */}
                  <div className="w-full rounded-2xl p-4 mb-3 text-left" style={{ backgroundColor: stage.bg, border: `1px solid ${stage.border}` }}>
                    <p className="text-[10px] font-black tracking-widest mb-2" style={{ color: stage.color }}>사회적 임팩트</p>
                    <div className="flex flex-col gap-1.5">
                      {stage.social.map((s, j) => (
                        <div key={j} className="flex items-start gap-1.5">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: stage.color }} />
                          <p className="text-gray-700 text-[12px] leading-relaxed">{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 환경 임팩트 */}
                  <div className="w-full rounded-xl px-4 py-3 mb-3 text-left bg-white border border-gray-100">
                    <p className="text-[10px] font-black tracking-widest mb-1.5 text-emerald-600">환경적 임팩트</p>
                    <div className="flex flex-col gap-1">
                      {stage.env.map((e, j) => (
                        <div key={j} className="flex items-start gap-1.5">
                          <span className="flex-shrink-0 text-emerald-500 text-[10px] mt-0.5">🌱</span>
                          <p className="text-gray-500 text-[11px] leading-relaxed">{e}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KPI 태그 */}
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {stage.kpis.map((k, j) => (
                      <span key={j} className="text-[10px] font-semibold px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-500">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SafeBuddy vs SafeEdu + 임팩트 프레임워크 */}
          <div className="fade-up grid grid-cols-1 md:grid-cols-2 gap-5 mb-8"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.2s" }}>

            {/* 세이프버디 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-black tracking-widest" style={{ color: "#00B7AF" }}>SAFEBUDDY</p>
                  <p className="text-[15px] font-extrabold text-gray-900">운영체계 · 탐지 · 문서 중심</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                {[
                  { icon: "🛡", text: "중대재해 예방 가능성 제고" },
                  { icon: "⚡", text: "안전관리자 생산성 향상" },
                  { icon: "📋", text: "사업장별 준법 체계 구축" },
                  { icon: "🔗", text: "협력사 포함 안전관리 범위 확장" },
                ].map((it, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5">
                    <span className="text-base">{it.icon}</span>
                    <p className="text-gray-700 text-[13px] font-semibold">{it.text}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(0,183,175,0.06)", border: "1px solid rgba(0,183,175,0.15)" }}>
                <p className="text-[11px] font-bold mb-2" style={{ color: "#00B7AF" }}>핵심 KPI</p>
                <div className="flex flex-wrap gap-1.5">
                  {["사업장당 위험탐지 건수", "자동문서 생성 수", "안전점검 이행률", "협력사 도입 현장 수"].map((k, i) => (
                    <span key={i} className="text-[11px] px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-500">{k}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* 세이프에듀 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(99,102,241,0.1)", color: "#6366f1" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-black tracking-widest" style={{ color: "#6366f1" }}>SAFEEDU</p>
                  <p className="text-[15px] font-extrabold text-gray-900">교육 접근성 · 다국어 · 이수관리 중심</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                {[
                  { icon: "🌍", text: "외국인 근로자 안전정보 접근성 개선" },
                  { icon: "👴", text: "고령 근로자 이해도 제고" },
                  { icon: "📱", text: "교육 사각지대 해소" },
                  { icon: "🎯", text: "현장 맞춤형 안전교육 보급" },
                ].map((it, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5">
                    <span className="text-base">{it.icon}</span>
                    <p className="text-gray-700 text-[13px] font-semibold">{it.text}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
                <p className="text-[11px] font-bold mb-2" style={{ color: "#6366f1" }}>핵심 KPI</p>
                <div className="flex flex-wrap gap-1.5">
                  {["다국어 콘텐츠 생성 건수", "외국인 교육 이수자 수", "교육 이수율", "언어별 참여 비중"].map((k, i) => (
                    <span key={i} className="text-[11px] px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-500">{k}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 임팩트 측정 프레임워크 */}
          <div className="fade-up bg-white rounded-2xl border border-gray-200 p-7"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.28s" }}>
            <p className="text-[12px] font-bold uppercase tracking-widest mb-6 text-center text-gray-400">임팩트 측정 프레임워크</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { step: "Input", label: "입력",      icon: "⚙️", color: "#6b7280", items: ["구축 고객 수", "유료 사업장 수", "다국어 콘텐츠 수", "연동 시스템 수"] },
                { step: "Activity", label: "활동",   icon: "▶", color: "#0ea5e9", items: ["위험탐지", "문서 자동생성", "교육콘텐츠 생성", "다국어 교육 제공"] },
                { step: "Output", label: "산출",     icon: "📦", color: "#6366f1", items: ["생성 문서 수", "탐지 이벤트 수", "교육 이수 인원", "운영 사업장 수"] },
                { step: "Outcome", label: "성과",    icon: "📈", color: "#00B7AF", items: ["문서 작성시간 감소", "교육 이수율 증가", "안전점검 이행률↑", "사고·아차사고 감소"] },
                { step: "Impact", label: "임팩트",   icon: "🌟", color: "#8b5cf6", items: ["중대재해 예방 기여", "안전체계 내재화", "외국인·고령 근로자 보호", "공급망 안전격차 축소"] },
              ].map((frame, i) => (
                <div key={i} className="flex flex-col rounded-2xl overflow-hidden border border-gray-100">
                  <div className="px-4 py-3 text-center" style={{ backgroundColor: `${frame.color}12` }}>
                    <p className="text-[10px] font-black tracking-widest" style={{ color: frame.color }}>{frame.step}</p>
                    <p className="text-[13px] font-extrabold text-gray-800">{frame.label}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3 flex-1 bg-gray-50">
                    {frame.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-1.5">
                        <span className="flex-shrink-0 w-1 h-1 rounded-full mt-1.5" style={{ backgroundColor: frame.color }} />
                        <p className="text-gray-600 text-[11px] leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 매출-임팩트 연동 요약 */}
            <div className="mt-6 rounded-2xl px-6 py-4"
              style={{ background: "linear-gradient(90deg, rgba(0,183,175,0.06) 0%, rgba(139,92,246,0.06) 100%)", border: "1px solid rgba(0,183,175,0.15)" }}>
              <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-3">매출 성장 = 임팩트 확산</p>
              <div className="flex flex-wrap gap-4 text-[13px]">
                {[
                  { metric: "매출 1억 원당", value: "보호 사업장 수 비례 증가" },
                  { metric: "유료 사업장 1개당", value: "평균 교육 이수자 수 누적" },
                  { metric: "협력사 확산 1건당", value: "추가 보호 근로자 발생" },
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-bold text-gray-500">{m.metric}</span>
                    <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    <span className="font-bold" style={{ color: "#00B7AF" }}>{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 성장 비전 ── */}
      <section id="growth-vision" className="bg-white py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6">

          {/* 헤더 */}
          <div className="fade-up text-center mb-14" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
              성장 철학 · 비전
            </span>
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-gray-900 leading-tight mb-4">
              산업안전 문제를 깊고 넓게 해결할수록<br />
              <span style={{ color: "#00B7AF" }}>비즈니스도 함께 성장합니다</span>
            </h2>
          </div>

          {/* 3열 핵심 카드 */}
          <div className="fade-up grid grid-cols-1 md:grid-cols-3 gap-5 mb-10"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.08s" }}>
            {[
              {
                num: "01",
                title: "성장 철학",
                color: "#00B7AF",
                bg: "rgba(0,183,175,0.06)",
                border: "rgba(0,183,175,0.2)",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                ),
                headline: "안전관리자가 현장에 집중하는 환경",
                points: [
                  "문서 작성이 아닌 현장 집중을 위한 기술",
                  "AI로 실행성과 법적 증빙을 동시에 강화",
                  "현장 중심 안전 표준 구축",
                ],
              },
              {
                num: "02",
                title: "성장 견인",
                color: "#6366f1",
                bg: "rgba(99,102,241,0.06)",
                border: "rgba(99,102,241,0.2)",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                ),
                headline: "검증된 현장 성과",
                points: [
                  "서류 작성시간 10분의 1 이하 절감",
                  "약 7,000명 근로자 사용 중",
                  "디지털약자 CS 0건 (최근 2년)",
                  "현대건설 실증 — 만족도·추천의향 우수",
                ],
              },
              {
                num: "03",
                title: "생태계 내 역할",
                color: "#8b5cf6",
                bg: "rgba(139,92,246,0.06)",
                border: "rgba(139,92,246,0.2)",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                ),
                headline: "안전 DX 생태계 촉매제",
                points: [
                  "간편하게 증빙이 따라오는 업무표준 확산",
                  "모듈형 템플릿 · 표준 API · 다국어 UI",
                  "원·하청 안전 데이터 투명성 확보",
                ],
              },
            ].map((card, i) => (
              <div key={i} className="rounded-2xl p-6 border flex flex-col"
                style={{ backgroundColor: card.bg, borderColor: card.border }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${card.color}18`, color: card.color }}>
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-widest" style={{ color: card.color }}>{card.num}</p>
                    <p className="text-[15px] font-extrabold text-gray-900">{card.title}</p>
                  </div>
                </div>
                <p className="text-[14px] font-bold text-gray-800 mb-3">{card.headline}</p>
                <div className="flex flex-col gap-2 flex-1">
                  {card.points.map((pt, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: card.color }} />
                      <p className="text-gray-600 text-[13px] leading-relaxed">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 성장 경로 타임라인 */}
          <div className="fade-up rounded-3xl p-8 md:p-10"
            style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c1a2e 100%)", opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.18s" }}>
            <p className="text-[12px] font-bold uppercase tracking-widest text-white/40 mb-8 text-center">장기 성장 경로</p>

            <div className="relative">
              {/* 연결선 */}
              <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-teal-500/30 via-indigo-500/30 to-violet-500/30" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    phase: "현재",
                    title: "현장 SaaS",
                    color: "#00B7AF",
                    desc: "사업장별 구독형\nB2B 반복매출 전환",
                    icon: "🏗",
                  },
                  {
                    phase: "단기",
                    title: "산업 확장",
                    color: "#6366f1",
                    desc: "건설→제조·운수\n고위험 산업군 확산",
                    icon: "⚙️",
                  },
                  {
                    phase: "중기",
                    title: "생태계 플랫폼",
                    color: "#8b5cf6",
                    desc: "원·하청 연결\n안전 DX 생태계 구축",
                    icon: "🔗",
                  },
                  {
                    phase: "장기",
                    title: "산업안전 OS",
                    color: "#a78bfa",
                    desc: "API/SDK 내재화\n산업안전 운영 표준화",
                    icon: "🌐",
                  },
                ].map((phase, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-xl z-10 relative"
                      style={{ backgroundColor: `${phase.color}22`, border: `2px solid ${phase.color}55` }}>
                      {phase.icon}
                    </div>
                    <span className="text-[10px] font-black tracking-widest mb-1" style={{ color: phase.color }}>{phase.phase}</span>
                    <p className="text-[15px] font-extrabold text-white mb-2">{phase.title}</p>
                    <p className="text-white/50 text-[12px] leading-relaxed whitespace-pre-line">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 핵심 한 줄 */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-white/60 text-[14px] leading-relaxed">
                <span style={{ color: "#7ffff4" }} className="font-bold">세이프버디</span>는 단순 SaaS를 넘어,
                원·하청 간 안전 데이터 투명성을 높이는{" "}
                <span style={{ color: "#7ffff4" }} className="font-bold">산업안전 운영 플랫폼</span>으로 성장합니다.
              </p>
            </div>
          </div>

          {/* 수치 하이라이트 */}
          <div className="fade-up grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.26s" }}>
            {[
              { value: "1/10", label: "서류 작성시간 절감", sub: "위험성평가·교육자료 초안 생성 기준", color: "#00B7AF" },
              { value: "7,000+", label: "현재 사용 중인 근로자 수", sub: "현장 실사용 기준", color: "#6366f1" },
              { value: "CS 0건", label: "디지털약자 사용성 이슈", sub: "최근 2년 기록 · 현대건설 실증 완료", color: "#8b5cf6" },
            ].map((s, i) => (
              <div key={i} className="fade-up bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center gap-5"
                style={{ opacity: 0, transform: "translateY(20px)", transition: `all 0.5s ease ${0.28 + i * 0.07}s` }}>
                <div className="flex-shrink-0">
                  <p className="text-[36px] font-black leading-none" style={{ color: s.color }}>{s.value}</p>
                </div>
                <div>
                  <p className="text-[14px] font-bold text-gray-900 mb-0.5">{s.label}</p>
                  <p className="text-[12px] text-gray-400">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CMK 참여 목표 ── */}
      <section id="cmk-goals" className="py-20 md:py-28" style={{ backgroundColor: "rgb(249,250,251)" }}>
        <div className="max-w-[1100px] mx-auto px-6">

          {/* 헤더 */}
          <div className="fade-up text-center mb-14" style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase mb-5"
              style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
              CMK 임팩트프러너 참여 목표
            </span>
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-gray-900 leading-tight mb-4">
              새임이 이 프로그램에서<br />
              <span style={{ color: "#00B7AF" }}>얻고자 하는 것</span>
            </h2>
            <p className="text-gray-500 text-[16px] max-w-[580px] mx-auto leading-relaxed">
              비즈니스 성장, 조직 학습, 그리고 대표 개인의 지속가능성 —<br className="hidden md:block" />
              세 가지 차원에서 실질적인 변화를 만들고자 합니다.
            </p>
          </div>

          {/* 3열 카드 */}
          <div className="fade-up grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.08s" }}>

            {/* 비즈니스 */}
            <div className="relative bg-white rounded-3xl border border-gray-100 p-7 flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ backgroundColor: "#00B7AF" }} />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(0,183,175,0.1)", color: "#00B7AF" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-black tracking-widest" style={{ color: "#00B7AF" }}>BUSINESS</p>
                  <p className="text-[17px] font-extrabold text-gray-900">비즈니스 관점</p>
                </div>
              </div>

              {/* 핵심 문장 */}
              <div className="rounded-2xl px-4 py-3 mb-5"
                style={{ backgroundColor: "rgba(0,183,175,0.06)", border: "1px solid rgba(0,183,175,0.15)" }}>
                <p className="text-[13px] font-semibold leading-relaxed" style={{ color: "#007a76" }}>
                  <span className="whitespace-nowrap">"필수 솔루션"으로 설득하는 과정이 중요한 시점,</span><br />
                  투자·멘토링·네트워크를 통해 현장 안전관리의 <strong>표준 인프라</strong>로 자리잡고 싶습니다.
                </p>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                {[
                  { icon: "💡", title: "기능형 → 표준 인프라로", desc: "세이프버디를 단순 기능 서비스가 아닌 현장 안전관리의 필수 솔루션으로 설명하는 언어 정리" },
                  { icon: "📊", title: "도입 효과·재구매 논리 명확화", desc: "고객이 실제로 체감하는 효과와 확장 가능성을 데이터로 정리해 사업의 다음 단계 기반 구축" },
                  { icon: "🤝", title: "투자 연계·전문가 연결", desc: "VC 밋업과 지원금을 통한 실질적 투자 유치 및 제품 고도화 기회" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-bold text-gray-900 text-[13px] mb-0.5">{item.title}</p>
                      <p className="text-gray-500 text-[12px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 조직 */}
            <div className="relative bg-white rounded-3xl border border-gray-100 p-7 flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ backgroundColor: "#6366f1" }} />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(99,102,241,0.1)", color: "#6366f1" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-black tracking-widest" style={{ color: "#6366f1" }}>ORGANIZATION</p>
                  <p className="text-[17px] font-extrabold text-gray-900">조직 관점</p>
                </div>
              </div>

              {/* 핵심 문장 */}
              <div className="rounded-2xl px-4 py-3 mb-5"
                style={{ backgroundColor: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
                <p className="text-[13px] font-semibold leading-relaxed" style={{ color: "#4338ca" }}>
                  정답을 얻으러 가는 자리가 아니라,<br />
                  <strong>채용·협업·의사결정·리더십 방식을<br />
                  점검하는 비교 기준</strong>이 되어줄 것입니다.
                </p>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                {[
                  { icon: "🔍", title: "미션과 실행력의 균형 관찰", desc: "사회문제를 해결하는 팀들이 성장 과정에서 어떻게 방향성과 실행력을 맞추는지 직접 보고 싶습니다" },
                  { icon: "🌱", title: "초기 조직문화 기준 세우기", desc: "빠르게 방향을 정하고 실행해야 하는 팀으로서, 일하는 방식과 문화의 기준을 함께 세워가고 싶습니다" },
                  { icon: "🔗", title: "건강한 성장을 위한 네트워크", desc: "알럼나이·동기 펠로와의 연결이 조직을 더 건강하게 키워가는 장기 자산이 되길 기대합니다" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-bold text-gray-900 text-[13px] mb-0.5">{item.title}</p>
                      <p className="text-gray-500 text-[12px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 개인 */}
            <div className="relative rounded-3xl p-7 flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              style={{ background: "linear-gradient(150deg, #003d3b 0%, #005c58 100%)", border: "1px solid rgba(0,183,175,0.35)" }}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ backgroundColor: "#00B7AF" }} />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(0,183,175,0.2)", color: "#00B7AF" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-black tracking-widest" style={{ color: "#00B7AF" }}>PERSONAL</p>
                  <p className="text-[17px] font-extrabold text-white">개인 (대표) 관점</p>
                </div>
              </div>

              {/* 핵심 문장 */}
              <div className="rounded-2xl px-4 py-3 mb-5"
                style={{ backgroundColor: "rgba(0,183,175,0.12)", border: "1px solid rgba(0,183,175,0.25)" }}>
                <p className="text-[13px] font-semibold leading-relaxed" style={{ color: "#5de8e2" }}>
                  오래 갈 수 있는 <strong className="text-white">판단력과 회복력</strong>, 그리고<br />
                  <span className="whitespace-nowrap">어려운 시기에도 <strong className="text-white">방향을 잃지 않는 내적 기준</strong>을</span><br />
                  배우고 싶습니다.
                </p>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                {[
                  { icon: "🤝", title: "비슷한 무게를 견뎌본 사람들과의 만남", desc: "선배 창업가들과 솔직하게 이야기 나누며 대표 개인의 지속가능성을 점검하고 싶습니다" },
                  { icon: "🧭", title: "흔들리지 않는 방향 감각", desc: "해결하려는 문제의 크기가 큰 만큼, 쉽게 흔들리지 않는 내적 기준과 관점을 갖추고 싶습니다" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-bold text-white text-[13px] mb-0.5">{item.title}</p>
                      <p className="text-white/55 text-[12px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 통합 메시지 배너 */}
          <div className="fade-up rounded-2xl px-7 py-6"
            style={{ background: "linear-gradient(90deg, rgba(0,183,175,0.06) 0%, rgba(99,102,241,0.06) 50%, rgba(167,139,250,0.06) 100%)", border: "1px solid rgba(0,183,175,0.15)", opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease 0.2s" }}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
              <div className="flex flex-wrap gap-2 flex-shrink-0">
                {[
                  { color: "#00B7AF", label: "표준 인프라로의 도약" },
                  { color: "#6366f1", label: "건강한 조직 기준 세우기" },
                  { color: "#00B7AF", label: "대표로서의 내적 기준" },
                ].map((tag, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: tag.color }} />
                    {tag.label}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 text-[13px] leading-relaxed md:border-l md:border-gray-200 md:pl-5">
                새임은 CMK 임팩트프러너를 통해 사업의 성장 단계뿐 아니라,
                조직과 대표 개인이 함께 <strong className="text-gray-800">오래, 건강하게 성장할 수 있는 기반</strong>을 만들고자 합니다.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" className="bg-white py-20 md:py-28">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <div className="fade-up bg-gradient-to-br from-violet-50 to-indigo-50 rounded-3xl p-12 border border-violet-100"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease" }}>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-gray-900 mb-4">
              지금 바로 도입 상담을 받아보세요
            </h2>
            <p className="text-gray-500 text-[16px] mb-8 leading-relaxed">
              현장 맞춤형 AI 교육 콘텐츠 생성 솔루션,<br />
              새임과 함께 안전관리의 패러다임을 바꾸세요.
            </p>
            <a
              href="mailto:contact@seiim.co.kr"
              className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold text-[16px] rounded-2xl transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5"
            >
              도입 문의하기
              <IconArrow />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
