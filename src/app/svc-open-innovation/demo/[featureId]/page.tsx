"use client";

import { ChangeEvent, ComponentType, ReactNode, useMemo, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  IconActivityHeartbeat,
  IconArrowLeft,
  IconBrain,
  IconClipboardCheck,
  IconDownload,
  IconFirstAidKit,
  IconMessageChatbot,
  IconPhotoUp,
  IconPrinter,
  IconSearch,
  IconShieldCheck,
  IconUpload,
} from "@tabler/icons-react";
import { baseFeatures, BRAND, Feature, FeatureThumb, lawLinks, sampleSummary } from "../_data";

type Stage = "input" | "analyzed" | "editing" | "confirmed" | "output";

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
      <section className="border-b border-teal-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5 md:px-8">
          <Link href="/svc-open-innovation/demo" className="inline-flex items-center gap-2 text-sm font-black" style={{ color: BRAND }}>
            <IconArrowLeft size={18} /> 기능 목록
          </Link>
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700 ring-1 ring-teal-100">
            Function Detail
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <FeatureThumb feature={feature} compact />
              <div>
                <p className="text-xs font-black tracking-[0.16em] text-teal-700">ACTIVE FUNCTION</p>
                <h1 className="mt-1 text-2xl font-black text-slate-950 md:text-3xl">{feature.title}</h1>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">{feature.desc}</p>
              </div>
            </div>
            {feature.kind !== "chatbot" && (
              <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-white px-4 py-3 text-sm font-black text-teal-700 shadow-sm">
                <IconPrinter size={17} /> 인쇄
              </button>
            )}
          </div>

          {feature.kind !== "chatbot" && (
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

        <div className="mt-5">
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
      </section>
    </main>
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
        <h2 className="text-xl font-black text-slate-950">{getInputTitle(feature.kind)}</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{getInputDesc(feature.kind)}</p>
        <div className="mt-5 grid gap-4">
          <UploadBox feature={feature} previewUrl={previewUrl} onUpload={onUpload} />
          {feature.kind !== "msds" && (
            <textarea
              value={textInput}
              onChange={(event) => onTextChange(event.target.value)}
              placeholder={getPlaceholder(feature.kind)}
              className="min-h-32 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 outline-none transition focus:border-teal-400 focus:bg-white"
            />
          )}
        </div>
        <button onClick={onAnalyze} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-white shadow-lg shadow-teal-700/15" style={{ backgroundColor: BRAND }}>
          <IconBrain size={18} /> 분석 실행
        </button>
      </div>

      <div className="grid gap-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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
  if (stage !== "output") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black text-slate-950">추가 기능 결과</h2>
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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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
    <div className="rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-900/5">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-black tracking-[0.16em] text-teal-700">CHATBOT PREVIEW</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">AI 안전보건 챗봇 연결 화면</h2>
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
