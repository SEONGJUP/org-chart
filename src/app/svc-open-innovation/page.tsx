"use client";

import { ChangeEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconCamera,
  IconCheck,
  IconChevronRight,
  IconDownload,
  IconFileDescription,
  IconFlame,
  IconLanguage,
  IconPhotoUp,
  IconQrcode,
  IconShieldCheck,
  IconSparkles,
} from "@tabler/icons-react";

const BRAND = "#008C8C";

const chemicals = [
  {
    id: "epoxy",
    name: "에폭시 프라이머",
    signal: "위험",
    hazards: ["인화성 액체", "피부 자극", "흡입 유해", "수생환경 유해"],
    precautions: ["화기 엄금", "보호장갑·보안경 착용", "환기 확보", "누출 시 흡착포로 회수"],
    firstAid: "흡입 시 신선한 공기가 있는 곳으로 이동하고, 피부 접촉 시 오염 의복을 제거한 뒤 물로 세척하세요.",
    storage: "밀폐 용기에 보관하고 직사광선, 열원, 산화제와 분리하세요.",
    pictograms: ["불꽃", "느낌표", "환경"],
  },
  {
    id: "thinner",
    name: "희석제",
    signal: "위험",
    hazards: ["고인화성", "졸음·현기증 유발", "피부 건조·갈라짐"],
    precautions: ["정전기 방지", "방폭 설비 사용", "마스크 착용", "밀폐공간 사용 금지"],
    firstAid: "눈에 들어간 경우 수 분간 물로 조심스럽게 씻고 콘택트렌즈가 있으면 제거하세요.",
    storage: "서늘하고 통풍이 잘 되는 곳에 잠금 보관하세요.",
    pictograms: ["불꽃", "건강", "느낌표"],
  },
  {
    id: "cement",
    name: "시멘트계 보수재",
    signal: "경고",
    hazards: ["피부 부식·자극", "눈 손상", "분진 흡입 주의"],
    precautions: ["방진마스크 착용", "보호장갑 착용", "작업 후 손 세척", "습기 차단"],
    firstAid: "눈 접촉 시 즉시 물로 충분히 씻고 이상 증상이 지속되면 의학적 조치를 받으세요.",
    storage: "건조한 장소에 보관하고 파손된 포대는 즉시 밀봉하세요.",
    pictograms: ["부식", "느낌표"],
  },
];

const fieldRisks = [
  "화학물질 소분 용기",
  "현장 게시 표지 미부착",
  "환기 부족 가능성",
  "보호구 착용 확인 필요",
];

const milestones = [
  { month: "2026.07", text: "KOSHA MSDS 데이터 수집·정제 및 GHS 표준화" },
  { month: "2026.08", text: "RAG 아키텍처와 자연어 검색·QA 핵심 기능 개발" },
  { month: "2026.09", text: "AI 경고표지 자동 생성 엔진과 다국어 변환 구현" },
  { month: "2026.10", text: "QR 연계 조회 시스템과 파일럿 현장 환경 구축" },
  { month: "2026.11", text: "현장 파일럿 운영, 사용성 검증, 피드백 반영" },
];

function Diamond({ label }: { label: string }) {
  const icon = label === "불꽃" ? "FL" : label === "환경" ? "ENV" : label === "부식" ? "COR" : label === "건강" ? "HTH" : "!";

  return (
    <div className="grid h-16 w-16 rotate-45 place-items-center border-[5px] border-red-600 bg-white">
      <span className="-rotate-45 text-sm font-black text-slate-950">{icon}</span>
    </div>
  );
}

export default function SvcOpenInnovationPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [selectedId, setSelectedId] = useState(chemicals[0].id);
  const [language, setLanguage] = useState("한국어");
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const selected = useMemo(() => chemicals.find((item) => item.id === selectedId) ?? chemicals[0], [selectedId]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageUrl(URL.createObjectURL(file));
    setIsAnalyzed(true);
  };

  const handlePrint = () => {
    window.print();
  };

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
              <a href="#demo" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white shadow-lg shadow-teal-700/15" style={{ backgroundColor: BRAND }}>
                샘플 기능 체험 <IconChevronRight size={17} />
              </a>
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
                KOSHA MSDS 데이터, OCR/LLM 문서 파싱, GHS 16개 항목 표준화, QR 연계 조회, 다국어 표지 생성, 사진 기반 위험요인 인식과 법령·점검항목 매칭을 하나의 모바일 흐름으로 묶습니다.
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

      <section id="demo" className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black tracking-[0.16em] text-teal-700">MOBILE MVP</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">사진 업로드 기반 MSDS 경고표지 생성 체험</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-500">
              현재 버전은 실제 AI 서버 연동 전 단계의 프론트 MVP입니다. 사진 업로드 후 물질 후보를 선택하면 현장 게시용 경고표지를 즉시 생성합니다.
            </p>
          </div>
          <button onClick={handlePrint} className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-white px-4 py-3 text-sm font-black text-teal-700 shadow-sm">
            <IconDownload size={17} /> 표지 인쇄
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[390px_minmax(0,1fr)]">
          <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-3 shadow-2xl shadow-slate-900/15">
            <div className="overflow-hidden rounded-[22px] bg-white">
              <div className="flex items-center justify-between bg-slate-950 px-5 py-3 text-white">
                <span className="text-xs font-black">SEIIM MSDS CAM</span>
                <IconCamera size={18} />
              </div>
              <label className="block cursor-pointer p-4">
                <input type="file" accept="image/*" capture="environment" onChange={handleUpload} className="sr-only" />
                <div className="grid min-h-[310px] place-items-center rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/60 p-5 text-center">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imageUrl} alt="업로드한 현장 사진" className="max-h-[300px] w-full rounded-xl object-cover" />
                  ) : (
                    <div>
                      <IconPhotoUp className="mx-auto text-teal-700" size={42} />
                      <p className="mt-4 text-lg font-black text-slate-950">현장 사진 업로드</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">모바일에서는 카메라 촬영 또는 갤러리 선택이 가능합니다.</p>
                    </div>
                  )}
                </div>
              </label>

              <div className="space-y-3 px-4 pb-5">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-black tracking-[0.14em] text-slate-400">AI 분석 후보</p>
                  <div className="mt-3 grid gap-2">
                    {chemicals.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedId(item.id);
                          setIsAnalyzed(true);
                        }}
                        className={`flex items-center justify-between rounded-xl border px-3 py-3 text-left text-sm font-black transition ${
                          selectedId === item.id ? "border-teal-400 bg-teal-50 text-teal-800" : "border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {item.name}
                        {selectedId === item.id && <IconCheck size={17} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-black tracking-[0.14em] text-slate-400">표지 언어</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {["한국어", "English", "中文", "Tiếng Việt"].map((item) => (
                      <button
                        key={item}
                        onClick={() => setLanguage(item)}
                        className={`rounded-xl border px-3 py-2 text-xs font-black ${language === item ? "border-teal-400 bg-teal-50 text-teal-800" : "border-slate-200 bg-white text-slate-500"}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-black tracking-[0.16em] text-teal-700">RECOGNIZED FIELD RISKS</p>
              <h3 className="mt-2 text-xl font-black text-slate-950">사진 기반 인식 결과</h3>
              <div className="mt-5 space-y-3">
                {(isAnalyzed ? fieldRisks : ["사진을 업로드하면 분석 후보가 표시됩니다."]).map((risk, index) => (
                  <div key={risk} className="flex items-center gap-3 rounded-xl border border-teal-100 bg-teal-50/70 px-4 py-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-sm font-black text-teal-700">{index + 1}</span>
                    <p className="text-sm font-black text-slate-700">{risk}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-black tracking-[0.16em] text-slate-400">PROCESS</p>
                <div className="mt-3 space-y-3">
                  {["사진/OCR 입력", "물질 후보 매칭", "GHS 위험성 요약", "경고표지 자동 생성"].map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="grid h-7 w-7 place-items-center rounded-full text-xs font-black text-white" style={{ backgroundColor: BRAND }}>{index + 1}</span>
                      <p className="text-sm font-bold text-slate-600">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-4 border-slate-950 bg-white p-5 shadow-sm print:border-2">
              <div className="flex items-start justify-between gap-4 border-b-4 border-slate-950 pb-4">
                <div>
                  <p className="text-sm font-black tracking-[0.2em] text-red-600">MSDS WARNING LABEL</p>
                  <h3 className="mt-1 text-3xl font-black text-slate-950">{selected.name}</h3>
                  <p className="mt-1 text-sm font-bold text-slate-500">표시 언어: {language}</p>
                </div>
                <div className="rounded-xl bg-red-600 px-4 py-2 text-xl font-black text-white">{selected.signal}</div>
              </div>

              <div className="mt-5 flex flex-wrap gap-5">
                {selected.pictograms.map((item) => (
                  <div key={item} className="grid gap-3 text-center">
                    <Diamond label={item} />
                    <span className="text-xs font-black text-slate-500">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4">
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-black text-slate-950"><IconFlame size={20} className="text-red-600" /> 유해·위험 문구</h4>
                  <ul className="mt-2 grid gap-2">
                    {selected.hazards.map((item) => (
                      <li key={item} className="rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-800">{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-black text-slate-950">예방조치</h4>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {selected.precautions.map((item) => (
                      <p key={item} className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-bold text-amber-900">{item}</p>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 p-3">
                    <p className="text-xs font-black tracking-[0.12em] text-slate-400">응급조치</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{selected.firstAid}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-3">
                    <p className="text-xs font-black tracking-[0.12em] text-slate-400">보관방법</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{selected.storage}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-950 p-4 text-white">
                  <div>
                    <p className="text-xs font-black text-teal-200">QR 상세조회</p>
                    <p className="mt-1 text-sm font-semibold text-slate-300">원문 MSDS, 다국어 안내, 조치 이력으로 연결 예정</p>
                  </div>
                  <div className="grid h-16 w-16 place-items-center rounded-lg bg-white text-slate-950">
                    <IconQrcode size={44} />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
