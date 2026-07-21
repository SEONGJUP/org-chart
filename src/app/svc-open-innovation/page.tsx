import Link from "next/link";
import {
  IconArrowLeft,
  IconChevronRight,
  IconFileDescription,
  IconLanguage,
  IconQrcode,
  IconShieldCheck,
  IconSparkles,
} from "@tabler/icons-react";

const BRAND = "#008C8C";

const milestones = [
  { month: "2026.07", text: "KOSHA MSDS 데이터 수집·정제 및 GHS 표준화" },
  { month: "2026.08", text: "RAG 아키텍처와 자연어 검색·QA 핵심 기능 개발" },
  { month: "2026.09", text: "AI 경고표지 자동 생성 엔진과 다국어 변환 구현" },
  { month: "2026.10", text: "QR 연계 조회 시스템과 파일럿 현장 환경 구축" },
  { month: "2026.11", text: "현장 파일럿 운영, 사용성 검증, 피드백 반영" },
];

export default function SvcOpenInnovationPage() {
  return (
    <main className="min-h-screen bg-[#f7fbfb] text-slate-950">
      <section className="border-b border-teal-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5 md:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black" style={{ color: BRAND }}>
            <IconArrowLeft size={18} /> 목록으로
          </Link>
          <span className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">
            SVC Seoul Open Innovation
          </span>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-8 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-black text-white" style={{ backgroundColor: BRAND }}>
              <IconSparkles size={15} /> 공동과제 트랙 MVP
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-5xl">
              AI 기반 MSDS 경고표지<br />
              자동 생성 플랫폼
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
              산업현장 사진과 MSDS 데이터를 기반으로 화학물질 정보를 구조화하고, 현장 게시용 경고표지와 관련 안전기준을 빠르게 생성하는 오픈이노베이션 과제입니다.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/svc-open-innovation/demo" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white shadow-lg shadow-teal-700/15" style={{ backgroundColor: BRAND }}>
                샘플 기능 체험 <IconChevronRight size={17} />
              </Link>
              <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700">
                목표 처리시간 30분 이내
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-teal-100 bg-[#f4fbfb] p-5 shadow-xl shadow-teal-900/5">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["70%+", "표지 제작 시간 단축"],
                ["80%+", "현장 MSDS 디지털 전환"],
                ["85%+", "AI 정보 조회 정확도 목표"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl bg-white p-4 ring-1 ring-teal-100">
                  <p className="text-3xl font-black" style={{ color: BRAND }}>{value}</p>
                  <p className="mt-2 text-sm font-bold leading-5 text-slate-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-white p-5 ring-1 ring-teal-100">
              <p className="text-xs font-black tracking-[0.16em] text-teal-700">CORE SUMMARY</p>
              <h2 className="mt-2 text-xl font-black text-slate-950">현장 담당자가 즉시 활용하는 안전보건 AI</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                KOSHA MSDS 데이터, OCR/LLM 문서 파싱, GHS 16개 항목 표준화, QR 연계 조회, 다국어 표지 생성, 사진 기반 위험요인 인식과 법령·점검항목 매칭을 하나의 모바일 활용 체계로 묶습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-4 lg:grid-cols-4">
          {[
            { icon: IconFileDescription, title: "MSDS 구조화", text: "공공 API와 업로드 문서를 파싱해 물질명, 위험성, 취급·보관 정보를 표준화합니다." },
            { icon: IconShieldCheck, title: "경고표지 생성", text: "현장 게시용 A4 요약 표지와 GHS 핵심 경고요소를 자동 배치합니다." },
            { icon: IconLanguage, title: "다국어 안내", text: "외국인 근로자도 이해할 수 있도록 한국어·영어·중국어·베트남어 확장을 전제로 설계합니다." },
            { icon: IconQrcode, title: "QR 상세 조회", text: "게시 표지에서 원문 MSDS와 상세 안전기준으로 연결되는 운영 모델을 제공합니다." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-teal-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <div className="mb-5">
            <p className="text-xs font-black tracking-[0.16em] text-teal-700">ROADMAP</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">공동과제 추진 일정</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            {milestones.map((item) => (
              <article key={item.month} className="rounded-2xl border border-slate-200 bg-[#f7fbfb] p-4">
                <p className="text-sm font-black" style={{ color: BRAND }}>{item.month}</p>
                <p className="mt-3 text-sm font-bold leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
