"use client";

import { ChangeEvent, ComponentType, ReactNode, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  IconActivityHeartbeat,
  IconArrowLeft,
  IconBrain,
  IconChevronRight,
  IconClipboardCheck,
  IconDownload,
  IconFileAlert,
  IconFileDescription,
  IconFirstAidKit,
  IconGavel,
  IconMessageChatbot,
  IconMicroscope,
  IconPhotoUp,
  IconPlus,
  IconPrinter,
  IconSearch,
  IconShieldCheck,
  IconSparkles,
  IconUpload,
} from "@tabler/icons-react";

const BRAND = "#008C8C";
const STORAGE_KEY = "svc-open-innovation-custom-features";

type Feature = {
  id: string;
  title: string;
  desc: string;
  icon: ComponentType<{ size?: number; stroke?: number; className?: string }>;
  tone: string;
  kind: "msds" | "law" | "risk" | "aed" | "ergonomic" | "chatbot" | "custom";
};

type Stage = "input" | "analyzed" | "editing" | "confirmed" | "output";

const baseFeatures: Feature[] = [
  {
    id: "msds-label",
    title: "MSDS 경고표지 만들기",
    desc: "MSDS 물질자료 업로드 후 분석, 요약, 수정, 컨펌, 경고표지 인쇄",
    icon: IconFileAlert,
    tone: "bg-red-50 text-red-700 border-red-100",
    kind: "msds",
  },
  {
    id: "law-search",
    title: "안전작업 법령 검색하기",
    desc: "사진 또는 텍스트로 현장 상황을 입력하고 관련 법령 링크 검색",
    icon: IconGavel,
    tone: "bg-blue-50 text-blue-700 border-blue-100",
    kind: "law",
  },
  {
    id: "chemical-risk",
    title: "화학물질 위험성평가",
    desc: "현장 데이터 분석 후 위험성평가 문서 초안 생성",
    icon: IconMicroscope,
    tone: "bg-amber-50 text-amber-700 border-amber-100",
    kind: "risk",
  },
  {
    id: "aed-edu",
    title: "AED 종류검색 및 사용자 교육",
    desc: "AED 사진 또는 명칭으로 장비 규격과 사용법 안내자료 조회",
    icon: IconFirstAidKit,
    tone: "bg-rose-50 text-rose-700 border-rose-100",
    kind: "aed",
  },
  {
    id: "ergonomic-analysis",
    title: "근골격계 증상조사 AI 분석",
    desc: "작업 자세와 증상 데이터를 분석해 인간공학적 개선대책 보고서 생성",
    icon: IconActivityHeartbeat,
    tone: "bg-violet-50 text-violet-700 border-violet-100",
    kind: "ergonomic",
  },
  {
    id: "safety-chatbot",
    title: "AI 안전보건 챗봇",
    desc: "안전보건 질문을 대화형으로 해결하는 챗봇 연결 화면",
    icon: IconMessageChatbot,
    tone: "bg-teal-50 text-teal-700 border-teal-100",
    kind: "chatbot",
  },
];

const sampleSummary: Record<Feature["kind"], string> = {
  msds: "업로드된 MSDS 자료에서 물질명, 신호어, 주요 유해위험 문구, 예방조치, 응급조치, 보관방법을 추출했습니다. 현장 게시용 A4 경고표지에 바로 반영할 수 있습니다.",
  law: "입력된 현장 상황은 사다리 작업, 개구부 주변 이동, 보호구 착용 확인이 필요한 작업으로 추정됩니다. 산업안전보건기준에 관한 규칙과 KOSHA 가이드 기반 점검항목 검색이 필요합니다.",
  risk: "현장 내 화학물질 취급, 환기 상태, 보호구 착용, 소분 용기 표시 여부를 중심으로 위험성을 평가했습니다. 발생가능성은 중간, 중대성은 높음으로 우선 개선 조치가 필요합니다.",
  aed: "입력된 AED 장비는 자동심장충격기 교육대상 장비로 분류됩니다. 패드 부착 위치, 음성 안내 준수, 심폐소생술 병행, 정기 점검 항목 확인이 필요합니다.",
  ergonomic: "반복 작업, 허리 굴곡, 손목 편위, 중량물 취급 가능성이 관찰됩니다. 작업대 높이 조정, 보조도구 사용, 순환근무, 증상 설문 추가 확인이 권장됩니다.",
  chatbot: "AI 안전보건 챗봇은 현장 질문, 법령 검색, 안전보건 문서 초안 작성, 교육자료 추천 기능으로 확장될 예정입니다.",
  custom: "추가된 기능의 입력, 분석, 요약, 컨펌, 결과 생성 프로세스를 연결할 수 있는 준비 화면입니다.",
};

const lawLinks = [
  { title: "산업안전보건법", href: "https://www.law.go.kr/법령/산업안전보건법", desc: "사업주 안전보건 조치, 교육, 관리체계 기본 법령" },
  { title: "산업안전보건기준에 관한 규칙", href: "https://www.law.go.kr/법령/산업안전보건기준에관한규칙", desc: "사다리, 비계, 개구부, 화기작업 등 작업 기준 검색" },
  { title: "화학물질의 분류·표시 및 물질안전보건자료에 관한 기준", href: "https://www.law.go.kr/행정규칙/화학물질의분류·표시및물질안전보건자료에관한기준", desc: "MSDS, GHS 표시, 경고표지 관련 기준" },
];

const stageLabels: Stage[] = ["input", "analyzed", "editing", "confirmed", "output"];

function getStageTitle(stage: Stage) {
  return {
    input: "입력",
    analyzed: "분석",
    editing: "수정",
    confirmed: "컨펌",
    output: "결과",
  }[stage];
}

function Diamond({ label }: { label: string }) {
  return (
    <div className="grid h-14 w-14 rotate-45 place-items-center border-[4px] border-red-600 bg-white">
      <span className="-rotate-45 text-xs font-black text-slate-950">{label}</span>
    </div>
  );
}

export default function SvcOpenInnovationDemoPage() {
  const [customFeatures, setCustomFeatures] = useState<Feature[]>([]);
  const [activeId, setActiveId] = useState(baseFeatures[0].id);
  const [stage, setStage] = useState<Stage>("input");
  const [previewUrl, setPreviewUrl] = useState("");
  const [textInput, setTextInput] = useState("");
  const [summary, setSummary] = useState(sampleSummary.msds);
  const [confirmed, setConfirmed] = useState(false);

  const features = useMemo(() => [...baseFeatures, ...customFeatures], [customFeatures]);
  const active = features.find((feature) => feature.id === activeId) ?? baseFeatures[0];

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as Array<{ id: string; title: string; desc: string }>;
      setCustomFeatures(
        parsed.map((item) => ({
          ...item,
          icon: IconSparkles,
          tone: "bg-slate-50 text-slate-700 border-slate-200",
          kind: "custom",
        })),
      );
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const selectFeature = (feature: Feature) => {
    setActiveId(feature.id);
    setStage("input");
    setPreviewUrl("");
    setTextInput("");
    setConfirmed(false);
    setSummary(sampleSummary[feature.kind]);
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
  };

  const addFeature = () => {
    const name = window.prompt("추가할 AI 기능 이름을 입력하세요.");
    const trimmed = name?.trim();
    if (!trimmed) return;

    const next = [
      ...customFeatures,
      {
        id: `custom-${Date.now()}`,
        title: trimmed,
        desc: "추후 연결할 AI 기능입니다. 같은 규격의 기능 버튼으로 저장됩니다.",
        icon: IconSparkles,
        tone: "bg-slate-50 text-slate-700 border-slate-200",
        kind: "custom" as const,
      },
    ];
    setCustomFeatures(next);
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(next.map(({ id, title, desc }) => ({ id, title, desc }))),
    );
  };

  const runAnalysis = () => {
    setStage("analyzed");
    setSummary(sampleSummary[active.kind]);
  };

  const startEdit = () => setStage("editing");
  const confirmSummary = () => {
    setConfirmed(true);
    setStage("confirmed");
  };
  const generateOutput = () => setStage("output");
  const printOutput = () => window.print();

  return (
    <main className="min-h-screen bg-[#f6fbfb] text-slate-950">
      <section className="border-b border-teal-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5 md:px-8">
          <Link href="/svc-open-innovation" className="inline-flex items-center gap-2 text-sm font-black" style={{ color: BRAND }}>
            <IconArrowLeft size={18} /> SVC 오픈이노베이션
          </Link>
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700 ring-1 ring-teal-100">
            AI Function Lab
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black tracking-[0.16em] text-teal-700">SAMPLE FUNCTION EXPERIENCE</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">AI 안전보건 기능 체험</h1>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-500 md:text-base">
              공동과제에서 확장할 AI 기능들을 버튼형 허브로 구성했습니다. 각 기능은 입력, 분석, 핵심 요약, 수정, 컨펌, 결과 생성 흐름을 프론트 MVP로 체험할 수 있습니다.
            </p>
          </div>
          <button onClick={addFeature} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/10">
            <IconPlus size={18} /> 기능 추가
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-2">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => selectFeature(feature)}
                  className={`min-h-[154px] rounded-2xl border bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${
                    activeId === feature.id ? "border-teal-400 ring-2 ring-teal-100" : "border-slate-200"
                  }`}
                >
                  <FeatureThumb feature={feature} />
                  <p className="mt-3 text-sm font-black leading-5 text-slate-950">{feature.title}</p>
                  <p className="mt-1 hidden text-xs font-semibold leading-5 text-slate-500 sm:block">{feature.desc}</p>
                </button>
              ))}

              <button onClick={addFeature} className="min-h-[154px] rounded-2xl border-2 border-dashed border-slate-300 bg-white p-3 text-left transition hover:border-teal-300 hover:bg-teal-50/50">
                <div className="grid aspect-[4/3] place-items-center rounded-xl bg-slate-50 text-slate-400">
                  <IconPlus size={34} />
                </div>
                <p className="mt-3 text-sm font-black text-slate-700">추가하기</p>
                <p className="mt-1 hidden text-xs font-semibold leading-5 text-slate-400 sm:block">새로운 기능 이름을 저장합니다.</p>
              </button>
            </div>
          </aside>

          <section className="grid gap-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <FeatureThumb feature={active} compact />
                  <div>
                    <p className="text-xs font-black tracking-[0.16em] text-teal-700">ACTIVE FUNCTION</p>
                    <h2 className="mt-1 text-2xl font-black text-slate-950">{active.title}</h2>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">{active.desc}</p>
                  </div>
                </div>
                {active.kind !== "chatbot" && (
                  <button onClick={printOutput} className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-white px-4 py-3 text-sm font-black text-teal-700 shadow-sm">
                    <IconPrinter size={17} /> 인쇄
                  </button>
                )}
              </div>

              {active.kind !== "chatbot" && (
                <div className="mt-6 grid grid-cols-5 gap-2">
                  {stageLabels.map((item, index) => {
                    const currentIndex = stageLabels.indexOf(stage);
                    const isDone = index <= currentIndex;
                    return (
                      <div key={item} className={`rounded-xl px-2 py-3 text-center text-xs font-black ${isDone ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                        {getStageTitle(item)}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {active.kind === "chatbot" ? (
              <ChatbotPreview />
            ) : (
              <WorkflowPanel
                feature={active}
                stage={stage}
                previewUrl={previewUrl}
                textInput={textInput}
                summary={summary}
                confirmed={confirmed}
                onUpload={handleUpload}
                onTextChange={setTextInput}
                onAnalyze={runAnalysis}
                onEdit={startEdit}
                onSummaryChange={setSummary}
                onConfirm={confirmSummary}
                onGenerate={generateOutput}
              />
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

function FeatureThumb({ feature, compact = false }: { feature: Feature; compact?: boolean }) {
  const Icon = feature.icon;

  return (
    <div className={`${compact ? "h-16 w-16" : "aspect-[4/3] w-full"} grid place-items-center rounded-xl border ${feature.tone}`}>
      <Icon size={compact ? 31 : 42} stroke={1.7} />
    </div>
  );
}

function WorkflowPanel({
  feature,
  stage,
  previewUrl,
  textInput,
  summary,
  confirmed,
  onUpload,
  onTextChange,
  onAnalyze,
  onEdit,
  onSummaryChange,
  onConfirm,
  onGenerate,
}: {
  feature: Feature;
  stage: Stage;
  previewUrl: string;
  textInput: string;
  summary: string;
  confirmed: boolean;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onTextChange: (value: string) => void;
  onAnalyze: () => void;
  onEdit: () => void;
  onSummaryChange: (value: string) => void;
  onConfirm: () => void;
  onGenerate: () => void;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-xl font-black text-slate-950">{getInputTitle(feature.kind)}</h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{getInputDesc(feature.kind)}</p>

        <div className="mt-5 grid gap-4">
          <UploadBox feature={feature} previewUrl={previewUrl} onUpload={onUpload} />
          {feature.kind !== "msds" && (
            <div>
              <label className="text-xs font-black tracking-[0.12em] text-slate-400">텍스트 입력</label>
              <textarea
                value={textInput}
                onChange={(event) => onTextChange(event.target.value)}
                placeholder={getPlaceholder(feature.kind)}
                className="mt-2 min-h-32 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 outline-none transition focus:border-teal-400 focus:bg-white"
              />
            </div>
          )}
          {feature.kind === "aed" && (
            <input
              value={textInput}
              onChange={(event) => onTextChange(event.target.value)}
              placeholder="예: CU-SP1, NF1200, 현장 AED 명칭"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-teal-400 focus:bg-white"
            />
          )}
        </div>

        <button onClick={onAnalyze} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-white shadow-lg shadow-teal-700/15" style={{ backgroundColor: BRAND }}>
          <IconBrain size={18} /> 분석 실행
        </button>
      </div>

      <div className="grid gap-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black tracking-[0.16em] text-teal-700">AI SUMMARY</p>
              <h3 className="mt-1 text-xl font-black text-slate-950">핵심내용 요약</h3>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-black ${stage === "input" ? "bg-slate-100 text-slate-400" : "bg-teal-50 text-teal-700"}`}>
              {stage === "input" ? "분석 전" : "분석 완료"}
            </span>
          </div>

          {stage === "editing" ? (
            <textarea
              value={summary}
              onChange={(event) => onSummaryChange(event.target.value)}
              className="mt-4 min-h-40 w-full resize-none rounded-2xl border border-teal-200 bg-teal-50/40 p-4 text-sm font-semibold leading-6 outline-none"
            />
          ) : (
            <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-7 text-slate-600">
              {stage === "input" ? "입력 데이터를 넣고 분석을 실행하면 핵심 요약이 표시됩니다." : summary}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={onEdit} disabled={stage === "input"} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">
              수정
            </button>
            <button onClick={onConfirm} disabled={stage === "input"} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-40">
              컨펌
            </button>
            <button onClick={onGenerate} disabled={!confirmed} className="rounded-xl px-4 py-2 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-40" style={{ backgroundColor: BRAND }}>
              결과 생성
            </button>
          </div>
        </div>

        <OutputPanel feature={feature} stage={stage} summary={summary} />
      </div>
    </div>
  );
}

function UploadBox({ feature, previewUrl, onUpload }: { feature: Feature; previewUrl: string; onUpload: (event: ChangeEvent<HTMLInputElement>) => void }) {
  const acceptsImage = feature.kind !== "msds";
  const label = feature.kind === "msds" ? "MSDS 물질자료 업로드" : feature.kind === "aed" ? "AED 사진 촬영 또는 업로드" : "사진촬영 또는 사진업로드";

  return (
    <label className="block cursor-pointer">
      <input type="file" accept={acceptsImage ? "image/*" : ".pdf,.doc,.docx,.png,.jpg,.jpeg"} capture={acceptsImage ? "environment" : undefined} onChange={onUpload} className="sr-only" />
      <div className="grid min-h-[240px] place-items-center rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/50 p-5 text-center">
        {previewUrl && acceptsImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="업로드 미리보기" className="max-h-[260px] w-full rounded-xl object-cover" />
        ) : (
          <div>
            {feature.kind === "msds" ? <IconUpload className="mx-auto text-teal-700" size={42} /> : <IconPhotoUp className="mx-auto text-teal-700" size={42} />}
            <p className="mt-4 text-lg font-black text-slate-950">{label}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
              {feature.kind === "msds" ? "PDF, 이미지, 문서 파일을 선택해 분석 흐름을 시작합니다." : "모바일에서는 카메라 촬영 또는 갤러리 선택이 가능합니다."}
            </p>
          </div>
        )}
      </div>
    </label>
  );
}

function OutputPanel({ feature, stage, summary }: { feature: Feature; stage: Stage; summary: string }) {
  const isReady = stage === "output";

  if (!isReady) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-black tracking-[0.16em] text-slate-400">RESULT</p>
        <h3 className="mt-1 text-xl font-black text-slate-950">결과 미리보기</h3>
        <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-500">
          컨펌 후 결과 생성을 누르면 이 영역에 기능별 출력물이 표시됩니다.
        </p>
      </div>
    );
  }

  if (feature.kind === "msds") return <MsdsOutput summary={summary} />;
  if (feature.kind === "law") return <LawOutput summary={summary} />;
  if (feature.kind === "risk") return <RiskOutput summary={summary} />;
  if (feature.kind === "aed") return <AedOutput summary={summary} />;
  if (feature.kind === "ergonomic") return <ErgonomicOutput summary={summary} />;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">추가 기능 결과</h3>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{summary}</p>
    </div>
  );
}

function MsdsOutput({ summary }: { summary: string }) {
  return (
    <div className="rounded-2xl border-4 border-slate-950 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b-4 border-slate-950 pb-4">
        <div>
          <p className="text-sm font-black tracking-[0.2em] text-red-600">MSDS WARNING LABEL</p>
          <h3 className="mt-1 text-3xl font-black text-slate-950">에폭시 프라이머</h3>
          <p className="mt-1 text-sm font-bold text-slate-500">AI 분석 기반 현장 게시용 표지</p>
        </div>
        <div className="rounded-xl bg-red-600 px-4 py-2 text-xl font-black text-white">위험</div>
      </div>
      <div className="mt-5 flex flex-wrap gap-5">
        {["FL", "!", "ENV"].map((item) => <Diamond key={item} label={item} />)}
      </div>
      <div className="mt-6 grid gap-4">
        <InfoBlock title="핵심 요약" text={summary} />
        <div>
          <h4 className="text-lg font-black text-slate-950">유해·위험 문구</h4>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {["인화성 액체", "피부 자극", "흡입 유해", "수생환경 유해"].map((item) => (
              <p key={item} className="rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-800">{item}</p>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-black text-slate-950">예방조치</h4>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {["화기 엄금", "보호장갑·보안경 착용", "환기 확보", "누출 시 흡착포로 회수"].map((item) => (
              <p key={item} className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-bold text-amber-900">{item}</p>
            ))}
          </div>
        </div>
        <button onClick={() => window.print()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
          <IconDownload size={17} /> 경고표지 인쇄
        </button>
      </div>
    </div>
  );
}

function LawOutput({ summary }: { summary: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="flex items-center gap-2 text-xl font-black text-slate-950"><IconSearch size={22} className="text-blue-700" /> 법령 검색 및 링크</h3>
      <InfoBlock title="분석 요약" text={summary} />
      <div className="mt-4 grid gap-3">
        {lawLinks.map((item) => (
          <a key={item.title} href={item.href} target="_blank" rel="noreferrer" className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 transition hover:border-blue-300 hover:bg-white">
            <p className="font-black text-blue-800">{item.title}</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{item.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

function RiskOutput({ summary }: { summary: string }) {
  return (
    <ReportShell title="위험성평가 문서 생성" icon={IconClipboardCheck}>
      <InfoBlock title="평가 개요" text={summary} />
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          ["위험성", "높음"],
          ["발생가능성", "중간"],
          ["개선 우선순위", "즉시 조치"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-amber-50 p-4">
            <p className="text-xs font-black text-amber-700">{label}</p>
            <p className="mt-2 text-xl font-black text-slate-950">{value}</p>
          </div>
        ))}
      </div>
    </ReportShell>
  );
}

function AedOutput({ summary }: { summary: string }) {
  return (
    <ReportShell title="AED 규격 및 사용자 교육자료" icon={IconFirstAidKit}>
      <InfoBlock title="검색 결과" text={summary} />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {["패드 부착 위치 확인", "음성 안내에 따라 쇼크 버튼 사용", "심폐소생술과 병행", "배터리·패드 유효기간 점검"].map((item) => (
          <p key={item} className="rounded-xl bg-rose-50 p-4 text-sm font-bold text-rose-900">{item}</p>
        ))}
      </div>
    </ReportShell>
  );
}

function ErgonomicOutput({ summary }: { summary: string }) {
  return (
    <ReportShell title="인간공학적 정밀평가 및 개선대책 보고서" icon={IconActivityHeartbeat}>
      <InfoBlock title="AI 분석 결과" text={summary} />
      <div className="mt-4 grid gap-3">
        {["작업대 높이 조정", "중량물 취급 보조도구 배치", "반복작업 순환근무 편성", "증상 호소자 정밀 설문 연계"].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-xl bg-violet-50 p-4">
            <IconShieldCheck size={18} className="text-violet-700" />
            <p className="text-sm font-bold text-violet-950">{item}</p>
          </div>
        ))}
      </div>
    </ReportShell>
  );
}

function ChatbotPreview() {
  return (
    <div className="rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-black tracking-[0.16em] text-teal-700">CHATBOT PREVIEW</p>
          <h3 className="mt-2 text-3xl font-black text-slate-950">AI 안전보건 챗봇 연결 화면</h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-500">
            현재 MVP에서는 챗봇 UI 이미지만 보여줍니다. 추후에는 SafeBuddy RAG, 법령 검색, MSDS 정보 조회, 교육자료 생성 기능과 연결할 수 있습니다.
          </p>
        </div>
        <div className="rounded-[28px] bg-slate-950 p-3">
          <div className="overflow-hidden rounded-[22px] bg-white">
            <div className="flex items-center gap-3 bg-teal-600 px-5 py-4 text-white">
              <IconMessageChatbot size={24} />
              <div>
                <p className="text-sm font-black">SEIIM Safety AI</p>
                <p className="text-xs font-semibold text-teal-50">현장 안전보건 상담</p>
              </div>
            </div>
            <div className="space-y-3 p-5">
              <div className="max-w-[82%] rounded-2xl bg-slate-100 p-4 text-sm font-semibold leading-6 text-slate-700">
                오늘 작업 전 확인해야 할 MSDS와 보호구 기준을 알려줘.
              </div>
              <div className="ml-auto max-w-[88%] rounded-2xl bg-teal-600 p-4 text-sm font-semibold leading-6 text-white">
                취급 물질명 또는 MSDS 파일을 입력하면 유해위험성, 보호구, 응급조치, 게시 표지 항목을 요약해 드릴게요.
              </div>
              <div className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-400">
                메시지를 입력하세요...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportShell({ title, icon: Icon, children }: { title: string; icon: ComponentType<{ size?: number; className?: string }>; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="flex items-center gap-2 text-xl font-black text-slate-950">
        <Icon size={22} className="text-teal-700" /> {title}
      </h3>
      {children}
    </div>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-4 rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-black tracking-[0.14em] text-slate-400">{title}</p>
      <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function getInputTitle(kind: Feature["kind"]) {
  if (kind === "msds") return "MSDS 물질자료 입력";
  if (kind === "aed") return "AED 장비 데이터 입력";
  return "현장상황 데이터 입력";
}

function getInputDesc(kind: Feature["kind"]) {
  if (kind === "msds") return "파일 업로드 후 분석, 핵심내용 요약, 수정, 컨펌, 내용 확인, 경고표지 인쇄 흐름으로 진행합니다.";
  if (kind === "aed") return "AED 사진 또는 장비 명칭을 입력하면 규격과 사용자 교육자료를 찾아보는 흐름을 제공합니다.";
  return "사진촬영, 사진업로드 또는 텍스트 입력으로 현장 상황을 분석할 수 있는 데이터를 입력합니다.";
}

function getPlaceholder(kind: Feature["kind"]) {
  if (kind === "law") return "예: 3m 높이 사다리 작업, 개구부 주변 이동, 안전난간 일부 미설치";
  if (kind === "risk") return "예: 방수 작업 중 희석제 소분 사용, 환기 부족, 일부 작업자 방독마스크 미착용";
  if (kind === "ergonomic") return "예: 하루 6시간 반복 포장 작업, 허리 숙임, 손목 통증 호소";
  if (kind === "aed") return "예: 현장 사무실 입구 AED, CU-SP1 모델로 추정";
  return "추가 기능에 필요한 현장 데이터를 입력하세요.";
}
