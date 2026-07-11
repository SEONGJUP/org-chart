import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-mint-50">
      <div className="max-w-[800px] mx-auto px-6 py-20 w-full">
        {/* Title */}
        <div className="text-center mb-14">
          <h1 className="text-[40px] md:text-[52px] font-extrabold text-gray-900 leading-tight tracking-tight">
            <span className="text-mint-600">SEIIM</span> Sections
          </h1>
          <p className="mt-4 text-gray-500 text-lg">
            원하는 섹션을 선택해 주세요
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-5">
          <Link
            href="/seiim-ir"
            className="group relative flex items-center gap-6 bg-gray-950 rounded-2xl border border-gray-800 hover:border-mint-400 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-mint-500/20 hover:-translate-y-0.5 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,183,175,0.22),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.18),transparent_30%)] opacity-90" />
            <div className="relative w-14 h-14 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-mint-400/20 transition-colors">
              <svg className="w-7 h-7 text-mint-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125C16.5 3.504 17.004 3 17.625 3h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <div className="relative flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-extrabold text-white group-hover:text-mint-100 transition-colors">
                  SEIIM IR
                </h2>
                <span className="rounded-full bg-mint-400/15 px-2.5 py-1 text-[11px] font-bold text-mint-200 border border-mint-300/20">
                  NEW
                </span>
              </div>
              <p className="mt-1 text-gray-300 text-[15px]">
                새임 IR 자료 제작을 위한 성장 지표, 추정손익, 시각화 콘텐츠 페이지
              </p>
            </div>
            <svg className="relative w-6 h-6 text-gray-500 group-hover:text-mint-300 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/seiim-rnd"
            className="group relative flex items-center gap-6 bg-white rounded-2xl border border-cyan-200 hover:border-cyan-400 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-0.5 overflow-hidden"
          >
            <div className="absolute inset-y-0 right-0 w-1/3 bg-[linear-gradient(135deg,rgba(6,182,212,0.12),rgba(0,183,175,0.06))]" />
            <div className="relative w-14 h-14 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-100 transition-colors">
              <svg className="w-7 h-7 text-cyan-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5A2.5 2.5 0 015.5 5h7A2.5 2.5 0 0115 7.5v9a2.5 2.5 0 01-2.5 2.5h-7A2.5 2.5 0 013 16.5v-9zM15 10l4.2-2.52A1.2 1.2 0 0121 8.51v6.98a1.2 1.2 0 01-1.8 1.03L15 14v-4z" />
              </svg>
            </div>
            <div className="relative flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-cyan-700 transition-colors">
                  SEIIM R&D
                </h2>
                <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-bold text-cyan-700 border border-cyan-100">
                  R&D
                </span>
              </div>
              <p className="mt-1 text-gray-500 text-[15px]">
                영상 원본 비의존형 산업안전 상황이벤트 추론 및 법적 정합성 검증형 문서자동화 엔진
              </p>
            </div>
            <svg className="relative w-6 h-6 text-gray-300 group-hover:text-cyan-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/half-year-inspection"
            className="group relative flex items-center gap-6 bg-white rounded-2xl border border-blue-200 hover:border-blue-400 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-0.5"
          >
            <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6m4 6V7m4 10v-4M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-blue-700 transition-colors">
                  반기별이행점검
                </h2>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700 border border-blue-100">
                  PROTOTYPE
                </span>
              </div>
              <p className="mt-1 text-gray-500 text-[15px]">
                SafeBuddy 반기별 안전보건 의무 이행 현황 통계·입력·수정 대시보드
              </p>
            </div>
            <svg className="w-6 h-6 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* 1. 새임 홈페이지 */}
          <Link
            href="/homepage"
            className="group relative flex items-center gap-6 bg-white rounded-2xl border border-gray-200 hover:border-mint-400 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-mint-500/10 hover:-translate-y-0.5"
          >
            <div className="w-14 h-14 rounded-xl bg-mint-100 flex items-center justify-center flex-shrink-0 group-hover:bg-mint-200 transition-colors">
              <svg className="w-7 h-7 text-mint-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-mint-700 transition-colors">
                새임 홈페이지
              </h2>
              <p className="mt-1 text-gray-500 text-[15px]">
                중대재해처벌법 컴플라이언스 No.1 · 서비스 소개 · 고객 리뷰 · FAQ
              </p>
            </div>
            <svg className="w-6 h-6 text-gray-300 group-hover:text-mint-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/org-chart"
            className="group relative flex items-center gap-6 bg-white rounded-2xl border border-teal-200 hover:border-teal-400 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-0.5"
          >
            <div className="w-14 h-14 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors">
              <svg className="w-7 h-7 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v4m0 0H7m5 0h5M7 7v5m0 0H4m3 0h3m6-5v5m0 0h-3m3 0h3M12 7v10m0 0H9m3 0h3" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-teal-700 transition-colors">조직도</h2>
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-teal-700 border border-teal-100">EDITOR</span>
              </div>
              <p className="mt-1 text-gray-500 text-[15px]">조직·팀의 상하위 구조를 만들고, 그룹과 조직명을 관리하는 편집 화면</p>
            </div>
            <svg className="w-6 h-6 text-gray-300 group-hover:text-teal-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Service Sub-buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 -mt-1 ml-0 md:ml-20">
            <Link
              href="/safe-buddy"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-mint-50 rounded-xl border border-mint-200 hover:border-mint-400 hover:bg-mint-100 transition-all text-[13px] md:text-[14px] font-semibold text-mint-700 hover:shadow-md"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              세이프버디
            </Link>
            <Link
              href="/saiif-edu"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-sky-50 rounded-xl border border-sky-200 hover:border-sky-400 hover:bg-sky-100 transition-all text-[13px] md:text-[14px] font-semibold text-sky-700 hover:shadow-md"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              세이프에듀
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-violet-50 rounded-xl border border-violet-200 hover:border-violet-400 hover:bg-violet-100 transition-all text-[13px] md:text-[14px] font-semibold text-violet-700 hover:shadow-md"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.59.659H9.06a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V5a2 2 0 00-2-2h-1" />
              </svg>
              AI 센터
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-50 rounded-xl border border-amber-200 hover:border-amber-400 hover:bg-amber-100 transition-all text-[13px] md:text-[14px] font-semibold text-amber-700 hover:shadow-md"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              스마트 관제/CCTV
            </Link>
          </div>

          {/* 2. 글로벌청년창업사관학교 영어발표 */}
          <Link
            href="/global-presentation"
            className="group relative flex items-center gap-6 bg-white rounded-2xl border border-gray-200 hover:border-sky-400 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-0.5"
          >
            <div className="w-14 h-14 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-200 transition-colors">
              <svg className="w-7 h-7 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-sky-700 transition-colors">
                글로벌청년창업사관학교 영어발표
              </h2>
              <p className="mt-1 text-gray-500 text-[15px]">
                How It Works · Global Expansion · Roadmap · Benefits · Financial Plan
              </p>
            </div>
            <svg className="w-6 h-6 text-gray-300 group-hover:text-sky-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* 3. SEEDLIVE */}
          <Link
            href="/seedlive"
            className="group relative flex items-center gap-6 bg-white rounded-2xl border border-gray-200 hover:border-emerald-400 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-0.5"
          >
            <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
              <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-emerald-700 transition-colors">
                SEEDLIVE
              </h2>
              <p className="mt-1 text-gray-500 text-[15px]">
                휴대폰 사진 한 장으로 시작하는 AI 작물 생육 분석·예측·관리
              </p>
            </div>
            <svg className="w-6 h-6 text-gray-300 group-hover:text-emerald-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* 4. AI 교육 콘텐츠 생성 */}
          <Link
            href="/ai-edu-content"
            className="group relative flex items-center gap-6 bg-white rounded-2xl border border-gray-200 hover:border-violet-400 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-0.5"
          >
            <div className="w-14 h-14 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-200 transition-colors">
              <svg className="w-7 h-7 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.59.659H9.06a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V5a2 2 0 00-2-2h-1" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-violet-700 transition-colors">
                AI 교육 콘텐츠 생성
              </h2>
              <p className="mt-1 text-gray-500 text-[15px]">
                LLM 기반 산업안전 교육자료 자동 생성 · 다국어 TTS · 현대건설 POC 검증
              </p>
            </div>
            <svg className="w-6 h-6 text-gray-300 group-hover:text-violet-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* 5. 초격차 스타트업 AX 프로젝트 */}
          <Link
            href="/ax-project"
            className="group relative flex items-center gap-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-400 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-0.5"
          >
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-blue-700 transition-colors">
                초격차 스타트업 AX 프로젝트
              </h2>
              <p className="mt-1 text-gray-500 text-[15px]">
                산업현장 AI 혁신 · RAG 파이프라인 · VARCO LLM · 에이전틱 AI 솔루션
              </p>
            </div>
            <svg className="w-6 h-6 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* 6. 관광 특화 AI 다국어 숏폼 및 영상 홍보자료 생성 */}
          <Link
            href="/tourism-shortform"
            className="group relative flex items-center gap-6 bg-white rounded-2xl border border-gray-200 hover:border-teal-400 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-0.5"
          >
            <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors">
              <svg className="w-7 h-7 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-teal-600 transition-colors">
                관광 특화 AI 다국어 숏폼 및 영상 홍보자료 생성
              </h2>
              <p className="mt-1 text-gray-500 text-[15px]">
                원클릭 다국어 숏폼 · RAG 기반 관광 콘텐츠 · 20개국어 TTS 나레이션
              </p>
            </div>
            <svg className="w-6 h-6 text-gray-300 group-hover:text-teal-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
