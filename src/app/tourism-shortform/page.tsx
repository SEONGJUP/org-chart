"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";

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
      { threshold: 0.1 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── SafeBuddy 대표 색상 ── */
const C = {
  main:    "#00B7AF",
  dark:    "#0d9488",
  deep:    "#0f766e",
  bg:      "rgba(0,183,175,0.08)",
  border:  "rgba(0,183,175,0.22)",
  light:   "#f0fdfa",
  lighter: "#ccfbf1",
};

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <p className="fade-up" style={{
      color: C.main, fontSize: "0.75rem", fontWeight: 700,
      letterSpacing: "0.12em", textTransform: "uppercase",
      marginBottom: "0.75rem", opacity: 0,
      transform: "translateY(20px)", transition: "all 0.5s ease",
    }}>
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="fade-up" style={{
      fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800,
      color: "#111827", lineHeight: 1.2, marginBottom: "1rem",
      opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s",
    }}>
      {children}
    </h2>
  );
}

function fd(delay = 0): React.CSSProperties {
  return { opacity: 0, transform: "translateY(24px)", transition: `all 0.6s ease ${delay}s` };
}

/* ── 4가지 콘텐츠 유형 데이터 ── */
const CONTENT_TYPES = [
  {
    num: "TYPE 01",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "1페이지 홍보자료",
    subtitle: "이미지 형태 · 즉시 공유용",
    accent: C.main,
    accentBg: C.bg,
    accentBorder: C.border,
    steps: [
      { label: "입력", value: "관광지 사진 또는 홍보 텍스트" },
      { label: "AI 생성", value: "레이아웃·카피 자동 구성" },
      { label: "이미지 완성", value: "고해상도 홍보 이미지 1장 출력" },
      { label: "배포", value: "인스타그램·카카오톡·카드뉴스 즉시 공유" },
    ],
    effect: "빠른 정보 전달 효과 제고",
    effectDesc: "단 한 장으로 핵심 매력을 전달, SNS 카드뉴스·현장 인쇄물로 즉시 활용",
  },
  {
    num: "TYPE 02",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347A1.125 1.125 0 015.25 18.347V5.653z" />
        <rect x="2" y="2" width="20" height="20" rx="4" strokeWidth={1.5} />
      </svg>
    ),
    title: "숏폼 홍보영상",
    subtitle: "15~60초 · SNS 최적화",
    accent: "#0284c7",
    accentBg: "rgba(2,132,199,0.08)",
    accentBorder: "rgba(2,132,199,0.22)",
    steps: [
      { label: "입력", value: "관광지 사진 또는 홍보 텍스트" },
      { label: "AI 생성", value: "관광 매력 분석 → 숏폼 스크립트 자동 작성" },
      { label: "원클릭 완성", value: "SNS 최적화 숏폼 영상 자동 생성" },
      { label: "배포", value: "유튜브 쇼츠·인스타 릴스·틱톡 즉시 업로드" },
    ],
    effect: "관광지 인지도 급속 확산",
    effectDesc: "알고리즘 최적화 숏폼으로 국내외 잠재 관광객에게 빠르게 도달",
  },
  {
    num: "TYPE 03",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
      </svg>
    ),
    title: "롱폼 다국어 홍보영상",
    subtitle: "2~5분 · TTS 나레이션 · 20개국어",
    accent: "#7c3aed",
    accentBg: "rgba(124,58,237,0.08)",
    accentBorder: "rgba(124,58,237,0.22)",
    steps: [
      { label: "입력", value: "관광지 사진 또는 홍보 텍스트" },
      { label: "다국어 변환", value: "자동 번역 + TTS 음성 나레이션 20개국어 생성" },
      { label: "영상 완성", value: "나레이션 포함 다국어 홍보 영상 자동 완성" },
      { label: "다운로드·배포", value: "관광 안내소·공식 채널·유튜브 즉시 활용" },
    ],
    effect: "외국인 관광객 유치 효과 제고",
    effectDesc: "TTS 나레이션으로 언어 장벽 해소 — 전 세계 여행객 대상 시청각 홍보",
  },
  {
    num: "TYPE 04",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "슬라이드 PDF 자료",
    subtitle: "프레젠테이션 · 인쇄 배포용",
    accent: "#d97706",
    accentBg: "rgba(217,119,6,0.08)",
    accentBorder: "rgba(217,119,6,0.22)",
    steps: [
      { label: "입력", value: "관광지 사진 또는 홍보 텍스트" },
      { label: "AI 구성", value: "슬라이드 구조·디자인 자동 생성" },
      { label: "PDF 완성", value: "프레젠테이션·인쇄용 PDF 자동 완성" },
      { label: "활용", value: "여행사·관광청 제안서·현장 배포 즉시 사용" },
    ],
    effect: "전문 홍보 자료 품질 확보",
    effectDesc: "B2B 제안·기관 협력용 고품질 슬라이드를 수작업 없이 즉시 완성",
  },
];

export default function TourismShortformPage() {
  const ref = useScrollFade();

  return (
    <div ref={ref} style={{ minHeight: "100vh", background: "#fff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans KR', sans-serif", color: "#1f2937" }}>

      {/* ── Nav ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", gap: "1rem", padding: "0.8rem 2rem", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid #e5e7eb" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.35rem 0.9rem", borderRadius: "9999px", border: "1.5px solid #d1d5db", color: "#6b7280", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", transition: "all 0.18s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.main; (e.currentTarget as HTMLElement).style.color = C.main; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db"; (e.currentTarget as HTMLElement).style.color = "#6b7280"; }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          메인으로
        </Link>
        <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827" }}>관광 특화 AI 다국어 숏폼 및 영상 홍보자료 생성</span>
      </nav>

      {/* ── Hero ── */}
      <section style={{ position: "relative", overflow: "hidden", background: `linear-gradient(150deg, ${C.light} 0%, ${C.lighter} 45%, ${C.light} 100%)`, padding: "6rem 1.5rem 5rem", textAlign: "center" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 560, height: 560, background: `${C.main}18`, borderRadius: "50%", filter: "blur(80px)", transform: "translate(30%, -40%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 380, height: 380, background: `${C.dark}12`, borderRadius: "50%", filter: "blur(60px)", transform: "translate(-30%, 40%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
          <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1.1rem", background: `${C.main}18`, border: `1px solid ${C.main}33`, borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 700, color: C.dark, marginBottom: "1.5rem", ...fd(0) }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.main, display: "inline-block" }} />
            관광 특화 AI 홍보 콘텐츠 솔루션
          </div>
          <h1 className="fade-up" style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, lineHeight: 1.15, marginBottom: "1.5rem", color: "#111827", ...fd(0.1) }}>
            관광지 사진 한 장으로<br />
            <span style={{ color: C.main }}>다국어 숏폼·홍보영상</span>을<br />
            원클릭으로 만드세요
          </h1>
          <p className="fade-up" style={{ fontSize: "1.1rem", color: "#6b7280", maxWidth: 580, margin: "0 auto 2.5rem", lineHeight: 1.7, ...fd(0.2) }}>
            AI가 관광지 특성·매력을 분석해 SNS 숏폼, 다국어 홍보 영상을<br />
            자동 생성합니다. 언어 장벽 없이 전 세계 관광객에게 도달하세요.
          </p>
          <div className="fade-up" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem", ...fd(0.3) }}>
            {[
              { label: "95% 이상", sub: "제작 비용 절감" },
              { label: "20개국어", sub: "TTS 나레이션 지원" },
              { label: "4가지 유형", sub: "콘텐츠 자동 생성" },
            ].map((b) => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: `${C.main}15`, border: `1px solid ${C.main}30`, borderRadius: "0.75rem", padding: "0.6rem 1.2rem", fontSize: "0.9rem", fontWeight: 600 }}>
                <span style={{ color: C.main }}>{b.label}</span>
                <span style={{ color: "#374151" }}>{b.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-feature Banner ── */}
      <div style={{ background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.25rem 1.5rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {[
              { icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>, label: "RAG 기반 관광 콘텐츠 생성", desc: "관광지 정보·문화 데이터 기반 정확하고 매력적인 홍보 콘텐츠 자동 생성" },
              { icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>, label: "원클릭 4가지 콘텐츠 자동 생성", desc: "이미지·숏폼·롱폼·슬라이드 4가지 유형을 동일 입력으로 즉시 제작" },
              { icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>, label: "다국어 나레이션 자동 변환", desc: "20개 이상 언어 자막·TTS 나레이션 즉시 변환으로 언어 장벽 완전 해소" },
            ].map((item, i) => (
              <div key={i} style={{ flex: "1 1 260px", display: "flex", alignItems: "center", gap: "0.75rem", background: "#fff", borderRadius: "0.75rem", padding: "0.75rem 1rem", border: `1px solid ${C.border}` }}>
                <div style={{ width: 34, height: 34, borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", background: C.bg, color: C.main, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.82rem", color: "#111827" }}>{item.label}</p>
                  <p style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: 2 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ SECTION 1: Core Features ══════════ */}
      <section id="features" style={{ background: "#fff", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionTag>Core Features</SectionTag>
            <SectionTitle>핵심 기능</SectionTitle>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))", gap: "1.5rem", alignItems: "stretch" }}>

            {/* Card 1: RAG */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#111827", marginBottom: "0.75rem", paddingLeft: "0.25rem" }}>RAG 기반 고품질 콘텐츠 생성</h3>
            <div className="fade-up" style={{ flex: 1, background: "#f9fafb", borderRadius: "1.5rem", overflow: "hidden", border: `1px solid ${C.border}`, ...fd(0) }}>
              <div style={{ padding: "1.75rem", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, background: C.bg, borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />
                <div style={{ background: "#fff", borderRadius: "1rem", padding: "1rem 1.25rem", border: "1px solid #e5e7eb", marginBottom: "1.25rem", position: "relative" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Knowledge Base</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    {["관광지 정보", "지역 문화·특색", "홍보 가이드라인", "관광 트렌드 데이터"].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "#374151", fontWeight: 500 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.main, flexShrink: 0 }} />{item}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#fff", borderRadius: "1rem", padding: "1rem 1.25rem", border: "1px solid #e5e7eb", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#374151" }}>RAG 시스템 구성</p>
                    <span style={{ fontSize: "0.68rem", color: C.main, fontWeight: 600, background: C.bg, padding: "0.2rem 0.5rem", borderRadius: "9999px" }}>4단계 파이프라인 → 콘텐츠 수준 향상</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                    {[
                      { num: "①", title: "데이터 수집·전처리", sub: "관광 정보 정제" },
                      { num: "②", title: "Hybrid DB 구축", sub: "벡터+키워드" },
                      { num: "③", title: "관광지 분류 모델", sub: "LVLM 기반" },
                      { num: "④", title: "검색·생성 모듈", sub: "정확도 향상" },
                    ].map((s) => (
                      <div key={s.num} style={{ background: "#f9fafb", borderRadius: "0.6rem", padding: "0.6rem 0.75rem", border: "1px solid #e5e7eb" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.2rem" }}>
                          <span style={{ color: C.main, fontWeight: 800, fontSize: "0.8rem" }}>{s.num}</span>
                          <span style={{ fontWeight: 700, fontSize: "0.78rem", color: "#111827" }}>{s.title}</span>
                        </div>
                        <p style={{ fontSize: "0.7rem", color: "#6b7280" }}>{s.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: "0.82rem", color: "#6b7280", lineHeight: 1.6, marginBottom: "1rem", position: "relative" }}>
                  관광지 정보·문화·트렌드 기반의 RAG 시스템이 관련 데이터를 검색·추출해 LLM에 제공, <strong style={{ color: "#374151" }}>정확하고 매력적인 홍보 콘텐츠</strong>를 생성합니다.
                </p>
                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", position: "relative" }}>
                  {[{ icon: "🎥", text: "영상 완성도 ↑" }, { icon: "🌏", text: "관광 정보 기반 생성" }, { icon: "✨", text: "홍보 효과 최적화" }].map((item) => (
                    <span key={item.text} style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", fontWeight: 600, color: C.dark, background: C.bg, border: `1px solid ${C.border}`, borderRadius: "9999px", padding: "0.3rem 0.7rem" }}>
                      {item.icon} {item.text}
                    </span>
                  ))}
                </div>

                {/* 3-feature boxes — Card 1 하단 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem", marginTop: "1rem", position: "relative" }}>
                  {/* TTS 나레이션 */}
                  <div style={{ background: "#fff", borderRadius: "0.85rem", padding: "0.85rem 0.75rem", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.45rem" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "0.6rem", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 1px 6px ${C.main}20` }}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={C.main} strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: C.dark, lineHeight: 1.4 }}>TTS 나레이션<br />20개국어 동시 지원</p>
                  </div>
                  {/* 자동 자막 */}
                  <div style={{ background: "#fff", borderRadius: "0.85rem", padding: "0.85rem 0.75rem", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.45rem" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "0.6rem", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 1px 6px ${C.main}20` }}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={C.main} strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                      </svg>
                    </div>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: C.dark, lineHeight: 1.4 }}>자동 자막 생성<br />AI 번역 기반 정확도</p>
                  </div>
                  {/* 원클릭 생성 */}
                  <div style={{ background: "#fff", borderRadius: "0.85rem", padding: "0.85rem 0.75rem", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.45rem" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "0.6rem", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 1px 6px ${C.main}20` }}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={C.main} strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      </svg>
                    </div>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: C.dark, lineHeight: 1.4 }}>원클릭 생성<br />입력 즉시 영상 출력</p>
                  </div>
                </div>
              </div>
            </div>
            </div>{/* /Card 1 wrapper */}

            {/* Card 2: 다국어 영상 */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#111827", marginBottom: "0.75rem", paddingLeft: "0.25rem" }}>다국어 자막·나레이션 영상 자동 생성</h3>
            <div className="fade-up" style={{ flex: 1, background: "#f9fafb", borderRadius: "1.5rem", overflow: "hidden", border: `1px solid ${C.border}`, ...fd(0.15) }}>
              <div style={{ padding: "1.25rem 1.75rem 0.75rem" }}>

                {/* Flow visualization */}
                <div style={{ background: "#fff", borderRadius: "1rem", padding: "1rem 0.75rem", border: "1px solid #e5e7eb", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "0.2rem", flexWrap: "nowrap" }}>

                    {/* Step 1: 카메라 */}
                    <div style={{ textAlign: "center", flex: "0 0 auto" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "0.85rem", background: `linear-gradient(135deg, ${C.light}, ${C.lighter})`, border: `1.5px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.4rem", boxShadow: `0 2px 8px ${C.main}18` }}>
                        <svg width="21" height="21" fill="none" viewBox="0 0 24 24" stroke={C.main} strokeWidth={1.7}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                          <circle cx="18.5" cy="9.5" r="1" fill={C.main} stroke="none" />
                        </svg>
                      </div>
                      <p style={{ fontSize: "0.58rem", color: "#6b7280", fontWeight: 700, lineHeight: 1.3, whiteSpace: "nowrap" }}>관광지 사진/텍스트</p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginTop: "0.85rem", flex: "0 0 auto" }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={C.main} strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </div>

                    {/* Step 2: AI */}
                    <div style={{ textAlign: "center", flex: "0 0 auto" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "0.85rem", background: "linear-gradient(135deg, #eff6ff, #dbeafe)", border: "1.5px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.4rem", boxShadow: "0 2px 8px rgba(37,99,235,0.12)" }}>
                        <svg width="21" height="21" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth={1.7}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                        </svg>
                      </div>
                      <p style={{ fontSize: "0.58rem", color: "#6b7280", fontWeight: 700, lineHeight: 1.3, whiteSpace: "nowrap" }}>AI 분석</p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginTop: "0.85rem", flex: "0 0 auto" }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={C.main} strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </div>

                    {/* Step 3: 다국어 */}
                    <div style={{ textAlign: "center", flex: "0 0 auto" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "0.85rem", background: `linear-gradient(135deg, ${C.light}, ${C.lighter})`, border: `1.5px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.4rem", boxShadow: `0 2px 8px ${C.main}18` }}>
                        <svg width="21" height="21" fill="none" viewBox="0 0 24 24" stroke={C.main} strokeWidth={1.7}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                        </svg>
                      </div>
                      <p style={{ fontSize: "0.58rem", color: "#6b7280", fontWeight: 700, lineHeight: 1.3, whiteSpace: "nowrap" }}>다국어 변환</p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginTop: "0.85rem", flex: "0 0 auto" }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={C.main} strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </div>

                    {/* Step 4: 영상 완성 */}
                    <div style={{ textAlign: "center", flex: "0 0 auto" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "0.85rem", background: "linear-gradient(135deg, #faf5ff, #f3e8ff)", border: "1.5px solid #e9d5ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.4rem", boxShadow: "0 2px 8px rgba(124,58,237,0.12)", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "5px 0", background: "#f3e8ff" }}>
                          {[0,1,2].map(i => <div key={i} style={{ width: 4, height: 3, background: "#c4b5fd", borderRadius: 1, margin: "0 auto" }} />)}
                        </div>
                        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 6, display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "5px 0", background: "#f3e8ff" }}>
                          {[0,1,2].map(i => <div key={i} style={{ width: 4, height: 3, background: "#c4b5fd", borderRadius: 1, margin: "0 auto" }} />)}
                        </div>
                        <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#7c3aed" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
                        </svg>
                      </div>
                      <p style={{ fontSize: "0.58rem", color: "#6b7280", fontWeight: 700, lineHeight: 1.3, whiteSpace: "nowrap" }}>홍보 영상 완성</p>
                    </div>

                  </div>
                </div>

                {/* ── Output Preview: 모바일 + 유튜브 썸네일 ── */}
                <div style={{ background: "#fff", borderRadius: "1rem", padding: "1rem 1.25rem", border: "1px solid #e5e7eb", marginBottom: "1.25rem" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>Output Preview — 생성 결과 예시</p>

                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flexWrap: "wrap" }}>

                    {/* ── 모바일 영상 플레이어 ── */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
                      {/* phone body */}
                      <div style={{ width: 100, height: 176, borderRadius: "1.3rem", background: "#1a1a2e", border: "2.5px solid #374151", position: "relative", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.22), inset 0 0 0 1.5px #4b5563" }}>
                        {/* notch */}
                        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 28, height: 6, background: "#111827", borderRadius: "0 0 6px 6px", zIndex: 10 }} />
                        {/* screen */}
                        <div style={{ position: "absolute", inset: "8px 3px 10px 3px", borderRadius: "1rem", overflow: "hidden", background: "linear-gradient(160deg, #0ea5e9 0%, #0284c7 30%, #047857 65%, #065f46 100%)" }}>
                          {/* scene: sky + mountains */}
                          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(180deg, #047857 0%, #065f46 100%)" }} />
                          {/* mountain silhouette */}
                          <svg style={{ position: "absolute", bottom: "38%", left: 0, width: "100%" }} viewBox="0 0 100 30" preserveAspectRatio="none">
                            <polygon points="0,30 18,8 32,18 50,2 68,15 80,6 100,20 100,30" fill="#065f46" />
                          </svg>
                          {/* sun */}
                          <div style={{ position: "absolute", top: 10, right: 14, width: 12, height: 12, borderRadius: "50%", background: "#fde68a", boxShadow: "0 0 8px #fbbf24" }} />
                          {/* overlay gradient for video effect */}
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.45) 100%)" }} />
                          {/* play button */}
                          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -60%)", width: 26, height: 26, borderRadius: "50%", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(4px)", border: "1.5px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z" /></svg>
                          </div>
                          {/* title overlay */}
                          <div style={{ position: "absolute", bottom: 18, left: 6, right: 6 }}>
                            <p style={{ fontSize: "0.42rem", fontWeight: 700, color: "#fff", lineHeight: 1.3, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>제주 한라산 관광 홍보영상</p>
                          </div>
                          {/* progress bar */}
                          <div style={{ position: "absolute", bottom: 8, left: 6, right: 6 }}>
                            <div style={{ height: 2, background: "rgba(255,255,255,0.3)", borderRadius: 1 }}>
                              <div style={{ width: "35%", height: "100%", background: C.main, borderRadius: 1 }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                              <span style={{ fontSize: "0.32rem", color: "rgba(255,255,255,0.7)" }}>0:43</span>
                              <span style={{ fontSize: "0.32rem", color: "rgba(255,255,255,0.7)" }}>2:05</span>
                            </div>
                          </div>
                          {/* lang badge */}
                          <div style={{ position: "absolute", top: 10, left: 6, background: C.main, borderRadius: "3px", padding: "1px 4px", display: "flex", alignItems: "center", gap: 2 }}>
                            <span style={{ fontSize: "0.3rem", fontWeight: 800, color: "#fff" }}>KR</span>
                            <svg width="5" height="5" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                            <span style={{ fontSize: "0.3rem", fontWeight: 800, color: "#fff" }}>EN</span>
                          </div>
                        </div>
                        {/* home bar */}
                        <div style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: 24, height: 2.5, background: "#4b5563", borderRadius: 2 }} />
                      </div>
                      <p style={{ fontSize: "0.65rem", color: "#6b7280", fontWeight: 600, textAlign: "center" }}>모바일 영상 시청</p>
                    </div>

                    {/* ── 유튜브 썸네일 스타일 ── */}
                    <div style={{ flex: 1, minWidth: 170, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {/* thumbnail */}
                      <div style={{ borderRadius: "0.65rem", overflow: "hidden", position: "relative", aspectRatio: "16/9", background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 35%, #0d9488 65%, #065f46 100%)" }}>
                        {/* bg scene */}
                        <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }} viewBox="0 0 160 45" preserveAspectRatio="none">
                          <polygon points="0,45 22,14 38,26 60,5 82,20 104,10 128,22 160,12 160,45" fill="rgba(6,95,70,0.7)" />
                          <polygon points="0,45 10,28 26,38 44,20 62,32 80,18 96,28 120,16 140,30 160,22 160,45" fill="rgba(5,150,105,0.5)" />
                        </svg>
                        {/* sun */}
                        <div style={{ position: "absolute", top: 10, right: 24, width: 18, height: 18, borderRadius: "50%", background: "#fde68a", boxShadow: "0 0 12px #fbbf24" }} />
                        {/* vignette */}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.55) 100%)" }} />
                        {/* play icon center */}
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)", border: "2px solid rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z" /></svg>
                        </div>
                        {/* title on image */}
                        <div style={{ position: "absolute", bottom: 8, left: 10, right: 30 }}>
                          <p style={{ fontSize: "0.6rem", fontWeight: 800, color: "#fff", lineHeight: 1.3, textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>🇰🇷 제주도 여행 완벽 가이드 | Jeju Island Travel Guide 2026</p>
                        </div>
                        {/* duration badge */}
                        <div style={{ position: "absolute", bottom: 8, right: 6, background: "rgba(0,0,0,0.8)", borderRadius: "3px", padding: "1px 5px" }}>
                          <span style={{ fontSize: "0.58rem", fontWeight: 700, color: "#fff" }}>4:32</span>
                        </div>
                        {/* lang badges top-right */}
                        <div style={{ position: "absolute", top: 7, right: 7, display: "flex", gap: 3 }}>
                          {["KR","EN","JP","CN"].map(l => (
                            <span key={l} style={{ fontSize: "0.42rem", fontWeight: 800, color: "#fff", background: l === "KR" ? C.main : "rgba(0,0,0,0.55)", borderRadius: "2px", padding: "1px 3px" }}>{l}</span>
                          ))}
                        </div>
                      </div>
                      {/* meta info */}
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: `linear-gradient(135deg, ${C.main}, ${C.dark})`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" /></svg>
                        </div>
                        <div>
                          <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>제주도 여행 완벽 가이드 | 20개국어 자막</p>
                          <p style={{ fontSize: "0.6rem", color: "#9ca3af", marginTop: 1 }}>SEIIM Tourism AI · 조회수 1.2만회 · 3일 전</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Language tags — flagcdn.com 국기 이미지 */}
                <div style={{ background: "#fff", borderRadius: "1rem", padding: "1rem 1.25rem", border: "1px solid #e5e7eb", marginBottom: "1.25rem" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#374151", marginBottom: "0.7rem" }}>지원 언어 (20개국어 이상)</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {[
                      { lang: "한국어",   cc: "kr" },
                      { lang: "영어",     cc: "us" },
                      { lang: "일본어",   cc: "jp" },
                      { lang: "중국어",   cc: "cn" },
                      { lang: "프랑스어", cc: "fr" },
                      { lang: "스페인어", cc: "es" },
                      { lang: "독일어",   cc: "de" },
                      { lang: "아랍어",   cc: "sa" },
                      { lang: "태국어",   cc: "th" },
                      { lang: "베트남어", cc: "vn" },
                    ].map(({ lang, cc }) => (
                      <span key={lang} style={{ display: "inline-flex", alignItems: "center", gap: "0.38rem", fontSize: "0.72rem", fontWeight: 600, color: C.dark, background: C.bg, border: `1px solid ${C.border}`, borderRadius: "9999px", padding: "0.2rem 0.6rem 0.2rem 0.28rem" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://flagcdn.com/20x15/${cc}.png`}
                          width={20} height={15} alt={lang}
                          style={{ borderRadius: "2px", flexShrink: 0, display: "block" }}
                        />
                        {lang}
                      </span>
                    ))}
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.38rem", fontSize: "0.72rem", fontWeight: 600, color: C.dark, background: C.bg, border: `1px solid ${C.border}`, borderRadius: "9999px", padding: "0.2rem 0.6rem 0.2rem 0.4rem" }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={C.main} strokeWidth={2} style={{ flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                      +10개 이상
                    </span>
                  </div>
                </div>

              </div>
            </div>
            </div>{/* /Card 2 wrapper */}
          </div>
        </div>
      </section>

      {/* ══════════ SECTION 2: How It Works ══════════ */}
      <section id="how-it-works" style={{ background: "#f9fafb", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionTag>How It Works</SectionTag>
            <SectionTitle>작동 원리</SectionTitle>
            <p className="fade-up" style={{ color: "#6b7280", fontSize: "1rem", marginTop: "0.5rem", opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.2s" }}>
              사진 또는 텍스트를 입력하면 AI가 관광지 맞춤형 홍보 자료를 자동 생성합니다
            </p>
          </div>

          {/* 5-step */}
          <div className="fade-up" style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap", gap: "0.75rem", marginBottom: "3rem", ...fd(0) }}>
            {[
              {
                icon: (
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={1.7}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                    <circle cx="18.5" cy="9.5" r="1" fill="#fff" stroke="none" />
                  </svg>
                ),
                label: "입력", sub: "관광지 사진 또는 텍스트", color: C.main,
              },
              null,
              {
                icon: (
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={1.7}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                  </svg>
                ),
                label: "AI 분석", sub: "관광지 특성·매력 자동 인식", color: "#2563eb",
              },
              null,
              {
                icon: (
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={1.7}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
                label: "콘텐츠 생성", sub: "맞춤형 홍보자료 생성", color: "#0891b2",
              },
              null,
              {
                icon: (
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={1.7}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                  </svg>
                ),
                label: "다국어 변환", sub: "번역 & TTS 음성 적용", color: "#7c3aed",
              },
              null,
              {
                icon: (
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={1.7}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: "완료", sub: "관리자 승인 및 완료", color: "#059669",
              },
            ].map((item, i) =>
              item === null ? (
                <div key={i} style={{ display: "flex", alignItems: "center", marginTop: "0.9rem", color: "#d1d5db" }}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </div>
              ) : (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.5rem" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "1.1rem", background: item.color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 16px ${item.color}40` }}>
                    {item.icon}
                  </div>
                  <p style={{ fontWeight: 800, fontSize: "0.88rem", color: "#111827" }}>{item.label}</p>
                  <p style={{ fontSize: "0.72rem", color: "#9ca3af", whiteSpace: "nowrap" }}>{item.sub}</p>
                </div>
              )
            )}
          </div>

          {/* Content type mini cards */}
          <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em" }}>생성 콘텐츠 유형</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.9rem" }}>
            {[
              { num: "01", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" /></svg>, title: "1페이지 홍보자료", sub: "이미지 형태", color: C.main, bg: C.bg, border: C.border },
              { num: "02", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347A1.125 1.125 0 015.25 18.347V5.653z" /><rect x="2" y="2" width="20" height="20" rx="4" strokeWidth={1.4} /></svg>, title: "숏폼 홍보영상", sub: "SNS 최적화", color: "#0284c7", bg: "rgba(2,132,199,0.08)", border: "rgba(2,132,199,0.22)" },
              { num: "03", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="7" y="2" width="10" height="20" rx="2.5" /><circle cx="12" cy="18.5" r="0.75" fill="currentColor" stroke="none" /><path strokeLinecap="round" d="M10 5h4" /></svg>, title: "롱폼 다국어 홍보영상", sub: "20개국어 TTS", color: "#7c3aed", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.22)" },
              { num: "04", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>, title: "슬라이드 PDF 자료", sub: "프레젠테이션·인쇄용", color: "#d97706", bg: "rgba(217,119,6,0.08)", border: "rgba(217,119,6,0.22)" },
            ].map((card) => (
              <div key={card.num} className="fade-up" style={{ background: "#fff", borderRadius: "1.1rem", padding: "1.1rem 1.2rem", border: `1px solid ${card.border}`, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: "0.65rem", background: card.bg, color: card.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{card.icon}</div>
                <div>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, color: card.color, marginBottom: "0.1rem" }}>{card.num}</p>
                  <p style={{ fontWeight: 800, fontSize: "0.88rem", color: "#111827" }}>{card.title}</p>
                  <p style={{ fontSize: "0.7rem", color: "#9ca3af" }}>{card.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SECTION 3: 4가지 콘텐츠 유형 상세 ══════════ */}
      <section id="content-detail" style={{ background: "#fff", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "0.75rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", fontWeight: 700, color: C.main, background: C.bg, border: `1px solid ${C.border}`, borderRadius: "9999px", padding: "0.3rem 0.9rem", marginBottom: "1rem" }}>
              ✦ Step 3 · 콘텐츠 생성
            </span>
            <h2 className="fade-up" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#111827", marginBottom: "0.75rem", opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease" }}>
              목적에 따라 4가지 유형으로 생성
            </h2>
            <p className="fade-up" style={{ color: "#6b7280", fontSize: "0.95rem", opacity: 0, transform: "translateY(20px)", transition: "all 0.5s ease 0.1s" }}>
              동일한 입력으로 이미지·숏폼·롱폼 영상·슬라이드 PDF를 선택 생성할 수 있습니다
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))", gap: "1.25rem", marginTop: "3rem" }}>
            {CONTENT_TYPES.map((ct, idx) => (
              <div key={ct.num} className="fade-up" style={{ borderRadius: "1.5rem", overflow: "hidden", border: `1.5px solid ${ct.accentBorder}`, ...fd(idx * 0.08) }}>
                {/* Header */}
                <div style={{ background: ct.accent, padding: "1.1rem 1.4rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "0.75rem", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                    {ct.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: "0.1rem" }}>{ct.num}</p>
                    <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "#fff" }}>{ct.title}</h3>
                    <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.8)" }}>{ct.subtitle}</p>
                  </div>
                </div>
                {/* Body */}
                <div style={{ background: "#fff", padding: "1.35rem 1.4rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.1rem" }}>
                    {ct.steps.map((step) => (
                      <div key={step.label} style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start" }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: ct.accent, marginTop: "0.45rem", flexShrink: 0 }} />
                        <div>
                          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: ct.accent, textTransform: "uppercase", letterSpacing: "0.05em" }}>{step.label} </span>
                          <span style={{ fontSize: "0.82rem", color: "#374151" }}>{step.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: ct.accentBg, borderRadius: "0.75rem", padding: "0.8rem 1rem", border: `1px solid ${ct.accentBorder}` }}>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: ct.accent, marginBottom: "0.15rem" }}>{ct.effect}</p>
                    <p style={{ fontSize: "0.73rem", color: ct.accent, opacity: 0.8 }}>{ct.effectDesc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SECTION 4: Expected Effects ══════════ */}
      <section id="impact" style={{ background: "#f9fafb", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionTag>Expected Effects</SectionTag>
            <SectionTitle>기대효과</SectionTitle>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
            {[
              { value: "95%+절감", label: "제작 시간·비용 절감", desc: "기존 수작업 대비 홍보 콘텐츠 제작 시간과 비용을 95% 이상 단축, 관광 운영자의 마케팅 부담을 대폭 해소", color: C.main, delay: 0 },
              { value: "100%반영", label: "관광 정보·매력 자동 반영", desc: "최신 관광지 정보와 지역 문화 특색이 자동 반영된 홍보 콘텐츠로 콘텐츠 신뢰도와 매력을 동시에 향상", color: C.dark, delay: 0.08 },
              { value: "20+개국어", label: "외국인 관광객 유치 효과", desc: "20개 이상 언어의 자막·TTS 나레이션 자동 생성으로 외국인 관광객과의 언어 장벽을 해소하고 방문 유도", color: "#0284c7", delay: 0.16 },
              { value: "↑향상", label: "관광지 인지도·방문율 향상", desc: "관광지 특성 맞춤형 홍보 콘텐츠로 실질적인 관광 인지도를 높여 방문율 향상 및 지역 경제 활성화 기여", color: "#7c3aed", delay: 0.24 },
              { value: "4가지유형", label: "다양한 홍보 채널 지원", desc: "이미지·숏폼·롱폼·슬라이드 PDF 4가지 유형을 동일 입력으로 자동 생성, 목적에 맞게 즉시 활용 가능", color: "#d97706", delay: 0.32 },
              { value: "선진관광\n브랜딩", label: "브랜드 가치 및 관광 경쟁력 강화", desc: "지속 가능한 선진 관광 브랜딩을 구축해 지역·관광지의 경쟁력을 제고하고 글로벌 관광 시장에서 차별화된 입지 확보", color: "#e11d48", delay: 0.4 },
            ].map((card) => (
              <div key={card.label} className="fade-up" style={{ background: "#fff", borderRadius: "1.25rem", padding: "1.5rem", border: "1px solid #e5e7eb", ...fd(card.delay) }}>
                <p style={{ fontSize: "1.6rem", fontWeight: 900, color: card.color, lineHeight: 1.1, marginBottom: "0.4rem", whiteSpace: "pre-line" }}>{card.value}</p>
                <p style={{ fontWeight: 700, color: "#111827", fontSize: "0.9rem", marginBottom: "0.5rem" }}>{card.label}</p>
                <p style={{ fontSize: "0.78rem", color: "#6b7280", lineHeight: 1.6 }}>{card.desc}</p>
              </div>
            ))}
          </div>
          {/* DX Banner */}
          <div className="fade-up" style={{ background: `linear-gradient(135deg, ${C.light} 0%, #f0fdfa 100%)`, borderRadius: "1.25rem", padding: "2rem", border: `1px solid ${C.border}`, ...fd(0.2) }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
              <div style={{ width: 48, height: 48, borderRadius: "1rem", background: C.main, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
              </div>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: "1.05rem", color: "#111827", marginBottom: "0.5rem" }}>관광의 디지털 전환(DX) 선도</h3>
                <p style={{ fontSize: "0.85rem", color: "#6b7280", lineHeight: 1.7, maxWidth: 820 }}>
                  관광지·지자체·관광청은 이번 솔루션 도입을 통해 관광 홍보 효율화와 외국인 방문객 증대를 동시에 달성하고, 지속 가능한 선진 관광 브랜딩을 구축하여 지역 경쟁력을 제고하는 비즈니스 성과를 기대할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SECTION 5: Roadmap ══════════ */}
      <section id="roadmap" style={{ background: "#fff", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionTag>Roadmap</SectionTag>
            <SectionTitle>추진 로드맵</SectionTitle>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { phase: "Phase 1", title: "기획 및 시스템 기반 구축", color: C.main, bg: C.bg, border: C.border, items: ["서비스 기획 및 요구사항 정의", "RAG 시스템 아키텍처 설계", "관광 데이터 수집·전처리 파이프라인 구축", "Hybrid DB 및 LVLM 모델 초기 구성"], delay: 0 },
              { phase: "Phase 2", title: "시범 적용", color: "#0284c7", bg: "rgba(2,132,199,0.07)", border: "rgba(2,132,199,0.2)", items: ["파일럿 관광지 선정 및 시범 운영", "숏폼·영상 홍보 콘텐츠 생성 실증", "다국어 TTS 나레이션 적용 테스트", "관광 업계 피드백 수렴 및 개선"], delay: 0.1 },
              { phase: "Phase 3", title: "성능 검증 및 피드백 반영", color: "#7c3aed", bg: "rgba(124,58,237,0.07)", border: "rgba(124,58,237,0.2)", items: ["콘텐츠 품질 및 홍보 효과 정량 평가", "관광지 정보 반영률 검증", "사용자 만족도 조사 및 개선 반영", "상용화 전환 및 확장 전략 수립"], delay: 0.2 },
            ].map((phase, idx) => (
              <div key={phase.phase} className="fade-up" style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", ...fd(phase.delay) }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: phase.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1.1rem", boxShadow: `0 4px 16px ${phase.color}40` }}>{idx + 1}</div>
                  {idx < 2 && <div style={{ width: 2, height: 40, background: "#e5e7eb", margin: "0.5rem 0" }} />}
                </div>
                <div style={{ flex: 1, background: "#f9fafb", borderRadius: "1.25rem", padding: "1.5rem", border: `1px solid ${phase.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: phase.color, background: phase.bg, border: `1px solid ${phase.border}`, borderRadius: "9999px", padding: "0.25rem 0.75rem" }}>{phase.phase}</span>
                    <h3 style={{ fontWeight: 800, fontSize: "1.02rem", color: "#111827" }}>{phase.title}</h3>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem" }}>
                    {phase.items.map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.82rem", color: "#374151" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={phase.color} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12" /></svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#0f172a", padding: "2rem 1.5rem", textAlign: "center" }}>
        <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
          © 2026 SEIIM. 관광 특화 AI 다국어 숏폼 및 영상 홍보자료 생성 기술
        </p>
        <Link href="/" style={{ color: C.main, fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
          ← 메인페이지로 돌아가기
        </Link>
      </footer>
    </div>
  );
}
