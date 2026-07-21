"use client";

import { ChangeEvent, ComponentType, ReactNode, useMemo, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  IconActivityHeartbeat,
  IconArrowLeft,
  IconBrain,
  IconChevronLeft,
  IconClipboardCheck,
  IconDownload,
  IconEye,
  IconFirstAidKit,
  IconHistory,
  IconMessageChatbot,
  IconPhotoUp,
  IconPrinter,
  IconSearch,
  IconShieldCheck,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { baseFeatures, BRAND, contentHistoryItems, Feature, FeatureThumb, HistoryItem, lawLinks, sampleSummary } from "../_data";

type Stage = "input" | "analyzed" | "editing" | "confirmed" | "output";

const stageLabels: Stage[] = ["input", "analyzed", "editing", "confirmed", "output"];

const historyItems = [
  {
    id: "hist-001",
    title: "에폭시 프라이머 MSDS 경고표지",
    type: "MSDS 경고표지",
    date: "2026.07.22",
    status: "인쇄 대기",
    summary: "물질명, 신호어, 유해위험 문구, 예방조치, 응급조치 항목을 추출해 A4 게시용 경고표지 초안을 생성했습니다.",
    detail: "에폭시 프라이머 취급 작업 기준으로 인화성 액체, 피부 자극, 흡입 유해 항목을 반영했습니다. 현장 게시 전 물질명과 제조사 정보를 확인해야 합니다.",
  },
  {
    id: "hist-002",
    title: "개구부 주변 이동 작업 법령 검색",
    type: "안전작업 법령",
    date: "2026.07.21",
    status: "검토 완료",
    summary: "개구부, 추락방지, 안전난간, 출입통제 관련 법령과 점검항목을 검색했습니다.",
    detail: "산업안전보건기준에 관한 규칙의 추락 방지 조치, 개구부 덮개 및 안전난간 관련 기준을 우선 검토 대상으로 추천했습니다.",
  },
  {
    id: "hist-003",
    title: "희석제 소분 작업 위험성평가",
    type: "위험성평가",
    date: "2026.07.20",
    status: "초안 생성",
    summary: "환기 부족, 보호구 미착용, 소분 용기 표시 누락을 주요 위험요인으로 평가했습니다.",
    detail: "발생가능성은 중간, 중대성은 높음으로 분류했습니다. 방독마스크 착용, 환기팬 배치, 소분 용기 라벨 부착을 개선대책으로 제안했습니다.",
  },
];

function getStageTitle(stage: Stage) {
  return {
    input: "입력",
    analyzed: "분석",
    editing: "수정",
    confirmed: "컨펌",
    output: "결과",
  }[stage];
}

export default function FeatureDetailPage() {
  const params = useParams<{ featureId: string }>();
  const feature = useMemo(() => {
    if (params.featureId === "custom") {
      return {
        id: "custom",
        title: "추가 기능",
        desc: "추후 연결할 AI 기능의 준비 화면입니다.",
        icon: IconShieldCheck,
        tone: "bg-slate-50 text-slate-700 border-slate-200",
        accent: "#475569",
        kind: "custom" as const,
      };
    }
    return baseFeatures.find((item) => item.id === params.featureId);
  }, [params.featureId]);

  const [stage, setStage] = useState<Stage>("input");
  const [previewUrl, setPreviewUrl] = useState("");
  const [textInput, setTextInput] = useState("");
  const [summary, setSummary] = useState(feature ? sampleSummary[feature.kind] : "");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<HistoryItem | null>(null);
  const featureHistoryItems = useMemo(
    () => (feature ? contentHistoryItems.filter((item) => item.kind === feature.kind) : []),
    [feature],
  );

  if (!feature) notFound();

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
  };

  const runAnalysis = () => {
    setStage("analyzed");
    setSummary(sampleSummary[feature.kind]);
  };

  const startEdit = () => setStage("editing");
  const confirmSummary = () => {
    setConfirmed(true);
    setStage("confirmed");
  };
  const generateOutput = () => setStage("output");

  return (
    <main className="min-h-screen bg-[#f6fbfb] text-slate-950">
      <section className="border-b border-teal-100 bg-white/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 md:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => window.history.back()} className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition hover:bg-slate-50">
              <IconChevronLeft size={18} /> 이전 페이지
            </button>
            <Link href="/svc-open-innovation/demo" className="inline-flex h-10 items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 text-sm font-black transition hover:bg-white" style={{ color: BRAND }}>
              <IconArrowLeft size={18} /> 기능 목록
            </Link>
          </div>
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700 ring-1 ring-teal-100">
            Function Detail
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="svc-animate-up overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-xl shadow-teal-900/5">
          <div className="h-2" style={{ background: `linear-gradient(90deg, ${feature.accent}, ${BRAND})` }} />
          <div className="grid gap-5 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-7">
            <div className="flex min-w-0 items-start gap-4">
              <FeatureThumb feature={feature} compact />
              <div className="min-w-0">
                <p className="text-xs font-black tracking-[0.16em] text-teal-700">ACTIVE FUNCTION</p>
                <h1 className="mt-1 text-2xl font-black text-slate-950 md:text-3xl">{feature.title}</h1>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">{feature.desc}</p>
              </div>
            </div>
            {feature.kind !== "chatbot" && (
              <button onClick={() => window.print()} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-teal-200 bg-white px-5 text-sm font-black text-teal-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-50">
                <IconPrinter size={17} /> 인쇄
              </button>
            )}
          </div>

          {feature.kind !== "chatbot" && (
            <ProcessNavigator stage={stage} />
          )}
        </div>

        <div className="mt-6">
          {feature.kind === "chatbot" ? (
            <ChatbotPreview />
          ) : (
            <WorkflowPanel
              feature={feature}
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
        </div>

        <HistoryList items={featureHistoryItems} featureTitle={feature.title} onSelect={setSelectedHistory} />
      </section>
      {selectedHistory && <HistoryModal item={selectedHistory} onClose={() => setSelectedHistory(null)} />}
    </main>
  );
}

function ProcessNavigator({ stage }: { stage: Stage }) {
  const currentIndex = stageLabels.indexOf(stage);

  return (
    <div className="border-t border-slate-100 bg-white px-4 py-5 md:px-7">
      <div className="relative">
        <div className="absolute left-[10%] right-[10%] top-5 h-1 rounded-full bg-slate-100" />
        <div className="absolute left-[10%] top-5 h-1 rounded-full bg-teal-500 transition-all duration-700" style={{ width: `${(currentIndex / (stageLabels.length - 1)) * 80}%` }} />
        <div className="relative grid grid-cols-5 gap-2">
          {stageLabels.map((item, index) => {
            const isDone = index <= currentIndex;
            const isActive = index === currentIndex;
            return (
              <div key={item} className="grid justify-items-center gap-2 text-center">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-full border-4 text-sm font-black shadow-sm transition-all duration-500 ${
                    isDone ? "border-teal-100 bg-teal-600 text-white" : "border-white bg-slate-100 text-slate-400"
                  } ${isActive ? "svc-animate-pulse scale-105" : ""}`}
                >
                  {index + 1}
                </span>
                <span className={`text-[11px] font-black md:text-xs ${isDone ? "text-teal-700" : "text-slate-400"}`}>
                  {getStageTitle(item)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
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
      <div className="svc-animate-slide rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="text-xl font-black text-slate-950">{getInputTitle(feature.kind)}</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{getInputDesc(feature.kind)}</p>
        <div className="mt-5 grid gap-4">
          <UploadBox feature={feature} previewUrl={previewUrl} onUpload={onUpload} />
          {feature.kind !== "msds" && (
            <textarea
              value={textInput}
              onChange={(event) => onTextChange(event.target.value)}
              placeholder={getPlaceholder(feature.kind)}
              className="min-h-32 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 outline-none transition focus:border-teal-400 focus:bg-white focus:shadow-lg focus:shadow-teal-900/5"
            />
          )}
        </div>
        <button onClick={onAnalyze} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-white shadow-lg shadow-teal-700/15 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-700/20" style={{ backgroundColor: BRAND }}>
          <IconBrain size={18} /> 분석 실행
        </button>
      </div>

      <div className="grid gap-5">
        <div className="svc-animate-up svc-delay-2 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <p className="text-xs font-black tracking-[0.16em] text-teal-700">AI SUMMARY</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">핵심내용 요약</h2>
          {stage === "editing" ? (
            <textarea value={summary} onChange={(event) => onSummaryChange(event.target.value)} className="mt-4 min-h-40 w-full resize-none rounded-2xl border border-teal-200 bg-teal-50/40 p-4 text-sm font-semibold leading-6 outline-none" />
          ) : (
            <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-7 text-slate-600">
              {stage === "input" ? "입력 데이터를 넣고 분석을 실행하면 핵심 요약이 표시됩니다." : summary}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={onEdit} disabled={stage === "input"} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">
              수정
            </button>
            <button onClick={onConfirm} disabled={stage === "input"} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">
              컨펌
            </button>
            <button onClick={onGenerate} disabled={!confirmed} className="rounded-xl px-4 py-2 text-sm font-black text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40" style={{ backgroundColor: BRAND }}>
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
      <div className="group grid min-h-[260px] place-items-center rounded-3xl border-2 border-dashed border-teal-200 bg-teal-50/50 p-5 text-center transition hover:border-teal-400 hover:bg-white hover:shadow-lg hover:shadow-teal-900/5">
        {previewUrl && acceptsImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="업로드 미리보기" className="max-h-[260px] w-full rounded-xl object-cover" />
        ) : (
          <div>
            {feature.kind === "msds" ? <IconUpload className="mx-auto text-teal-700 transition group-hover:scale-110" size={42} /> : <IconPhotoUp className="mx-auto text-teal-700 transition group-hover:scale-110" size={42} />}
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
  if (stage !== "output") {
    return (
      <div className="svc-animate-scale rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <p className="text-xs font-black tracking-[0.16em] text-slate-400">RESULT</p>
        <h2 className="mt-1 text-xl font-black text-slate-950">결과 미리보기</h2>
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
    <div className="svc-animate-scale rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <h2 className="text-xl font-black text-slate-950">추가 기능 결과</h2>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{summary}</p>
    </div>
  );
}

function MsdsOutput({ summary }: { summary: string }) {
  return (
    <div className="svc-animate-scale rounded-3xl border-4 border-slate-950 bg-white p-5 shadow-sm md:p-6">
      <div className="flex items-start justify-between gap-4 border-b-4 border-slate-950 pb-4">
        <div>
          <p className="text-sm font-black tracking-[0.2em] text-red-600">MSDS WARNING LABEL</p>
          <h2 className="mt-1 text-3xl font-black text-slate-950">에폭시 프라이머</h2>
          <p className="mt-1 text-sm font-bold text-slate-500">AI 분석 기반 현장 게시용 표지</p>
        </div>
        <div className="rounded-xl bg-red-600 px-4 py-2 text-xl font-black text-white">위험</div>
      </div>
      <InfoBlock title="핵심 요약" text={summary} />
      <button onClick={() => window.print()} className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
        <IconDownload size={17} /> 경고표지 인쇄
      </button>
    </div>
  );
}

function LawOutput({ summary }: { summary: string }) {
  return (
    <div className="svc-animate-scale rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <h2 className="flex items-center gap-2 text-xl font-black text-slate-950"><IconSearch size={22} className="text-blue-700" /> 법령 검색 및 링크</h2>
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
    </ReportShell>
  );
}

function AedOutput({ summary }: { summary: string }) {
  return (
    <ReportShell title="AED 규격 및 사용자 교육자료" icon={IconFirstAidKit}>
      <InfoBlock title="검색 결과" text={summary} />
    </ReportShell>
  );
}

function ErgonomicOutput({ summary }: { summary: string }) {
  return (
    <ReportShell title="인간공학적 정밀평가 및 개선대책 보고서" icon={IconActivityHeartbeat}>
      <InfoBlock title="AI 분석 결과" text={summary} />
    </ReportShell>
  );
}

function ChatbotPreview() {
  return (
    <div className="svc-animate-up rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5 md:p-6">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-black tracking-[0.16em] text-teal-700">CHATBOT PREVIEW</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">AI 안전보건 챗봇 연결 화면</h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-500">
            현재 MVP에서는 챗봇 UI 이미지만 보여줍니다. 추후에는 SafeBuddy RAG, 법령 검색, MSDS 정보 조회, 교육자료 생성 기능과 연결할 수 있습니다.
          </p>
        </div>
        <div className="svc-animate-scale svc-delay-2 rounded-[28px] bg-slate-950 p-3">
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
    <div className="svc-animate-scale rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <h2 className="flex items-center gap-2 text-xl font-black text-slate-950">
        <Icon size={22} className="text-teal-700" /> {title}
      </h2>
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

function HistoryList({ items, featureTitle, onSelect }: { items: HistoryItem[]; featureTitle: string; onSelect: (item: HistoryItem) => void }) {
  return (
    <section className="svc-animate-up svc-delay-3 mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black tracking-[0.16em] text-teal-700">CONTENT HISTORY</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">{featureTitle} 생성 이력</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
            현재 기능에서 생성한 콘텐츠 이력만 모아 보여줍니다. 전체 이력은 기능 목록 페이지에서 필터링해 확인할 수 있습니다.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-xs font-black text-slate-500 ring-1 ring-slate-200">
          <IconHistory size={16} /> {items.length}건
        </span>
      </div>

      <div className="mt-5 grid gap-3">
        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm font-bold text-slate-500">
            아직 이 기능으로 생성된 콘텐츠 이력이 없습니다.
          </div>
        )}
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="group grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50/40 hover:shadow-lg hover:shadow-teal-900/5 md:grid-cols-[1fr_auto] md:items-center"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-black text-teal-700 ring-1 ring-teal-100">{item.type}</span>
                <span className="text-xs font-bold text-slate-400">{item.date}</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black text-slate-500">{item.status}</span>
              </div>
              <h3 className="mt-3 text-base font-black text-slate-950">{item.title}</h3>
              <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">{item.summary}</p>
            </div>
            <span className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition group-hover:border-teal-300 group-hover:text-teal-700">
              <IconEye size={17} /> 상세보기
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function HistoryModal({ item, onClose }: { item: HistoryItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="svc-animate-scale max-h-[90vh] w-full max-w-2xl overflow-auto rounded-3xl bg-white shadow-2xl shadow-slate-950/20">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5 md:p-6">
          <div>
            <p className="text-xs font-black tracking-[0.16em] text-teal-700">HISTORY DETAIL</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{item.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700 ring-1 ring-teal-100">{item.type}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">{item.date}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">{item.status}</span>
            </div>
          </div>
          <button onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50">
            <IconX size={18} />
          </button>
        </div>
        <div className="p-5 md:p-6">
          <InfoBlock title="요약" text={item.summary} />
          <InfoBlock title="상세내용" text={item.detail} />
          <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-white">
            <p className="text-xs font-black text-teal-200">다음 연결 예정</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
              실제 저장소와 연결되면 생성 파일, 편집 이력, 인쇄 여부, 담당자 피드백을 이 모달에서 함께 확인할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
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
