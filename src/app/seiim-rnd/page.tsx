import Link from "next/link";
import {
  IconArrowLeft,
  IconCamera,
  IconCertificate,
  IconClipboardText,
  IconDeviceDesktopAnalytics,
  IconFileCheck,
  IconGavel,
  IconRoute,
  IconShieldCheck,
  IconSparkles,
} from "@tabler/icons-react";

const BRAND = "#008C8C";
const BRAND_SUB = "#007F80";
const BRAND_TINT = "rgba(0, 140, 140, 0.08)";
const BRAND_SOFT = "rgba(0, 140, 140, 0.05)";
const BRAND_BORDER = "rgba(0, 140, 140, 0.2)";

const inputs = [
  { title: "관제화면", desc: "운영자가 보고 있는 모니터 화면을 직접 캡처", strength: 92 },
  { title: "HDMI 캡처보드", desc: "DVR/NVR 출력 신호를 표준 영상 스트림으로 변환", strength: 88 },
  { title: "웹캠", desc: "현장 모니터·작업 구역을 비접촉 방식으로 관찰", strength: 78 },
  { title: "스트리밍", desc: "브라우저·RTSP·원격 회의형 화면 입력을 수집", strength: 84 },
];

const pipeline = [
  { step: "01", title: "영상정보 획득", desc: "원본파일·제조사 API·VMS 접근 없이 화면 기반으로 입력 확보", icon: IconCamera },
  { step: "02", title: "표준화", desc: "해상도, 프레임, 타임스탬프, 작업구역 좌표를 공통 포맷으로 정규화", icon: IconRoute },
  { step: "03", title: "상황이벤트 추론", desc: "작업자, 장비, 위험구역, 보호구, 행동 패턴을 이벤트 단위로 추론", icon: IconSparkles },
  { step: "04", title: "법적 정합성 검증", desc: "산안법·중처법·현장 기준에 맞춰 누락 의무와 증빙 요건을 대조", icon: IconGavel },
  { step: "05", title: "문서자동화", desc: "점검일지, 개선조치, 교육·보고 문서를 감사 가능한 형태로 생성", icon: IconClipboardText },
];

const eventTypes = [
  "보호구 미착용",
  "위험구역 접근",
  "고소작업 상태",
  "장비·작업자 근접",
  "화기작업 징후",
  "통로 적치·낙하 위험",
];

const complianceChecks = [
  { label: "위험요인 식별", value: "상황이벤트", status: "자동 매핑" },
  { label: "개선조치 기록", value: "조치 항목", status: "증빙 연결" },
  { label: "교육 필요성", value: "반복 이벤트", status: "대상 추천" },
  { label: "보고서 정합성", value: "법정 항목", status: "누락 검증" },
];

const researchFoundations = [
  {
    title: "위험행동 인식",
    desc: "보호구 미착용, 위험구역 진입, 장비 근접, 추락·충돌 가능 행동을 감지",
    tags: ["미착용", "진입", "근접", "추락·충돌"],
  },
  {
    title: "보호장비 착용 판별",
    desc: "작업자, 보호구, 건설기계, 운반장비, 안전시설, 위험구역을 현장 객체로 식별",
    tags: ["작업자", "보호구", "장비", "위험구역"],
  },
];

const researchMethods = [
  { title: "관계 분석", desc: "작업자–장비, 작업자–위험구역, 장비–시설물 간 거리·방향·접근 관계 분석" },
  { title: "시계열 이벤트", desc: "위험상황의 발생, 지속, 반복, 해소 상태를 시간 흐름으로 구분" },
  { title: "상황 맥락 분류", desc: "장소, 공종, 작업단계, 주변환경을 고려해 이벤트 의미를 보정" },
  { title: "안전이벤트 변환", desc: "객체·행동 분석결과를 위험원인, 예상사고, 권고조치로 구조화" },
];

export default function SeiimRndPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 md:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500" style={{ color: BRAND_SUB }}>
            <IconArrowLeft size={17} /> 목록으로
          </Link>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-6 md:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(440px,1fr)] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-black text-white ring-1" style={{ backgroundColor: BRAND, borderColor: BRAND }}>
              <IconShieldCheck size={15} /> SEIIM R&D ENGINE
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-5xl">
              영상 원본 비의존형<br />
              산업안전 상황이벤트 추론 엔진
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
              영상 원본파일, CCTV 제조사 API 및 영상관리시스템에 직접 접근하지 못하는 환경에서도 관제화면, HDMI 캡처보드, 웹캠 및 스트리밍 등을 통해 영상정보를 획득 및 표준화합니다.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {["원본 비의존", "화면 기반 획득", "이벤트 추론", "법적 정합성 검증", "문서자동화"].map((item) => (
                <span key={item} className="rounded-full border px-4 py-2 text-sm font-black" style={{ borderColor: BRAND_BORDER, backgroundColor: BRAND_TINT, color: BRAND_SUB }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border bg-white p-5 shadow-2xl" style={{ borderColor: "rgba(0, 140, 140, 0.25)", boxShadow: "0 24px 48px rgba(0, 140, 140, 0.1)" }}>
            <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: BRAND }} />
            <div className="rounded-xl border p-4" style={{ borderColor: BRAND_BORDER, backgroundColor: BRAND_SOFT }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black tracking-[0.18em]" style={{ color: BRAND_SUB }}>SCREEN CAPTURE LAYER</p>
                  <h2 className="mt-1 text-xl font-black text-slate-950">비접근 환경 영상 표준화</h2>
                </div>
                <IconDeviceDesktopAnalytics size={34} color={BRAND} />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {inputs.map((input) => (
                  <div key={input.title} className="rounded-xl border bg-white p-4 shadow-sm" style={{ borderColor: "rgba(0, 140, 140, 0.15)" }}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-black text-slate-950">{input.title}</p>
                      <span className="rounded-full px-2 py-0.5 text-xs font-black text-white" style={{ backgroundColor: BRAND }}>{input.strength}%</span>
                    </div>
                    <p className="mt-2 min-h-10 text-xs font-semibold leading-5 text-slate-500">{input.desc}</p>
                    <div className="mt-3 h-2 rounded-full bg-slate-100">
                      <div className="h-2 rounded-full" style={{ width: `${input.strength}%`, backgroundColor: BRAND }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black tracking-[0.14em]" style={{ color: BRAND_SUB }}>ENGINE PIPELINE</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">획득부터 문서화까지 하나의 검증 흐름</h2>
          </div>
          <span className="rounded-full px-4 py-2 text-sm font-black ring-1" style={{ backgroundColor: BRAND_TINT, color: BRAND_SUB, borderColor: BRAND_BORDER }}>
            API/VMS 직접 접근 불필요
          </span>
        </div>

        <div className="grid gap-3 lg:grid-cols-5">
          {pipeline.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.step} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-2 py-1 text-xs font-black" style={{ backgroundColor: BRAND_TINT, color: BRAND_SUB }}>{item.step}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-xl text-white ring-1" style={{ backgroundColor: BRAND, borderColor: BRAND }}>
                    <Icon size={21} />
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-14 md:px-8 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.14em]" style={{ color: BRAND_SUB }}>EVENT INFERENCE</p>
              <h2 className="mt-1 text-xl font-black text-slate-950">산업안전 상황이벤트 분류</h2>
            </div>
            <IconCertificate size={30} color={BRAND} />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
            {eventTypes.map((event, index) => (
              <div key={event} className="rounded-xl p-4 ring-1" style={{ backgroundColor: BRAND_SOFT, borderColor: "rgba(0, 140, 140, 0.15)" }}>
                <span className="text-xs font-black" style={{ color: BRAND_SUB }}>E{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-sm font-black leading-5 text-slate-800">{event}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.14em]" style={{ color: BRAND_SUB }}>LEGAL ALIGNMENT</p>
              <h2 className="mt-1 text-xl font-black text-slate-950">법적 정합성 검증형 문서자동화</h2>
            </div>
            <IconFileCheck size={30} color={BRAND} />
          </div>
          <div className="mt-5 space-y-3">
            {complianceChecks.map((check) => (
              <div key={check.label} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border px-4 py-3" style={{ borderColor: "rgba(0, 140, 140, 0.15)", backgroundColor: BRAND_SOFT }}>
                <div>
                  <p className="text-sm font-black text-slate-800">{check.label}</p>
                  <p className="mt-0.5 text-xs font-bold text-slate-400">{check.value}</p>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-black text-white ring-1" style={{ backgroundColor: BRAND, borderColor: BRAND }}>
                  {check.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black tracking-[0.14em]" style={{ color: BRAND_SUB }}>R&D METHOD</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">객체·행동 인식 기반 안전이벤트 추론 방법</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-500">
              객체탐지와 행동 인식을 기반 입력으로 삼아, 관계·시간·맥락 분석을 거쳐 법적 문서화 가능한 안전이벤트로 변환합니다.
            </p>
          </div>
          <span className="rounded-full px-4 py-2 text-sm font-black text-white" style={{ backgroundColor: BRAND }}>
            핵심 연구개발 방법
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            {researchFoundations.map((foundation) => (
              <article key={foundation.title} className="rounded-2xl border p-5" style={{ borderColor: BRAND_BORDER, backgroundColor: BRAND_SOFT }}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-black text-slate-950">{foundation.title}</h3>
                  <span className="rounded-full px-3 py-1 text-xs font-black text-white" style={{ backgroundColor: BRAND }}>기반</span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{foundation.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {foundation.tags.map((tag) => (
                    <span key={tag} className="rounded-full border bg-white px-3 py-1 text-xs font-black" style={{ borderColor: BRAND_BORDER, color: BRAND_SUB }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="relative my-7 flex items-center justify-center">
            <div className="absolute left-0 right-0 top-1/2 h-px" style={{ backgroundColor: BRAND_BORDER }} />
            <div className="relative rounded-2xl border bg-white px-6 py-4 text-center text-lg font-black shadow-sm md:text-xl" style={{ borderColor: BRAND_BORDER, color: BRAND_SUB }}>
              객체·행동 분석 결과를 안전이벤트 추론 단계로 전환
            </div>
          </div>

          <div className="mx-auto max-w-4xl">
            {researchMethods.map((method, index) => (
              <div key={method.title} className="relative">
                <article className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[72px_1fr] md:items-center">
                  <div className="flex items-center gap-3 md:block md:text-center">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-base font-black text-white md:mx-auto" style={{ backgroundColor: BRAND }}>
                      {index + 1}
                    </span>
                    <span className="text-xs font-black md:mt-2 md:block" style={{ color: BRAND_SUB }}>
                      STEP
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-950">{method.title}</h3>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">{method.desc}</p>
                  </div>
                </article>
                {index < researchMethods.length - 1 && (
                  <div className="flex h-9 items-center justify-center" aria-hidden="true">
                    <div className="h-full w-px" style={{ backgroundColor: BRAND_BORDER }} />
                    <span className="absolute grid h-7 w-7 place-items-center rounded-full text-sm font-black text-white" style={{ backgroundColor: BRAND }}>
                      ↓
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border px-4 py-3" style={{ borderColor: BRAND_BORDER, backgroundColor: BRAND_SOFT }}>
            <p className="text-sm font-black" style={{ color: BRAND_SUB }}>출력 구조</p>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              객체 + 행동 + 관계 + 시간 + 맥락 → 위험원인·예상사고·권고조치가 포함된 안전이벤트
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
