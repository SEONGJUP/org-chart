"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useScrollAnimation } from "../_hooks/useScrollAnimation";

/* ──────────────────────────── types ──────────────────────────── */
type TabId = "analysis" | "predict" | "dashboard" | "consult" | "edu";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const TABS: Tab[] = [
  {
    id: "analysis",
    label: "AI 생육 분석",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    description: "스마트폰 촬영으로 작물 상태를 AI가 자동 분석합니다.",
  },
  {
    id: "predict",
    label: "예측 기술",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    description: "과거·현재 데이터로 1~2주 후 생육 상태를 예측합니다.",
  },
  {
    id: "dashboard",
    label: "시각적 관리",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    description: "작물 상태를 직관적인 대시보드로 한눈에 파악합니다.",
  },
  {
    id: "consult",
    label: "맞춤 컨설팅",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    description: "작물별·환경별 맞춤 재배 처방과 리포트를 제공합니다.",
  },
  {
    id: "edu",
    label: "교육 프로그램",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    description: "체계적인 농업 교육 콘텐츠를 제공합니다.",
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Screen Components — 폰 목업 내부 체험 화면
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ① AI 생육 분석 */
function AnalysisScreen() {
  const [step, setStep] = useState<"idle" | "scanning" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const startScan = useCallback(() => {
    setStep("scanning");
    setProgress(0);
    let p = 0;
    const timer = setInterval(() => {
      p += 4;
      setProgress(p);
      if (p >= 100) {
        clearInterval(timer);
        setTimeout(() => setStep("done"), 300);
      }
    }, 60);
  }, []);

  const reset = useCallback(() => {
    setStep("idle");
    setProgress(0);
  }, []);

  if (step === "idle") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <circle cx="60" cy="60" r="55" fill="#e8f5e9" />
            <path d="M60 35 C60 35, 80 20, 85 40 C90 60, 60 65, 60 65Z" fill="#66bb6a" />
            <path d="M60 35 C60 35, 40 20, 35 40 C30 60, 60 65, 60 65Z" fill="#43a047" />
            <line x1="60" y1="65" x2="60" y2="95" stroke="#4caf50" strokeWidth="3" />
          </svg>
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-green-400 animate-[spin_8s_linear_infinite]" />
        </div>
        <p className="text-xs text-gray-500 text-center">작물을 촬영하여 AI 분석을 시작하세요</p>
        <button
          onClick={startScan}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg hover:bg-green-600 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          촬영하기
        </button>
      </div>
    );
  }

  if (step === "scanning") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <circle cx="60" cy="60" r="55" fill="#e8f5e9" />
            <path d="M60 35 C60 35, 80 20, 85 40 C90 60, 60 65, 60 65Z" fill="#66bb6a" />
            <path d="M60 35 C60 35, 40 20, 35 40 C30 60, 60 65, 60 65Z" fill="#43a047" />
            <line x1="60" y1="65" x2="60" y2="95" stroke="#4caf50" strokeWidth="3" />
          </svg>
          <div
            className="absolute left-0 right-0 h-0.5 bg-green-400 shadow-[0_0_8px_rgba(76,175,80,0.6)]"
            style={{ top: `${10 + (progress / 100) * 80}%`, transition: "top 0.06s linear" }}
          />
          <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-green-500" />
          <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-green-500" />
          <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-green-500" />
          <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-green-500" />
        </div>
        <p className="text-xs font-semibold text-green-600">AI 분석 중...</p>
        <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-[10px] text-gray-400">{progress}%</p>
      </div>
    );
  }

  const results = [
    { label: "생육 상태", value: 92, color: "bg-green-500" },
    { label: "병해충", value: 5, color: "bg-yellow-500" },
    { label: "이상 징후", value: 8, color: "bg-orange-400" },
  ];

  return (
    <div className="flex flex-col h-full px-3 py-3 gap-2.5 overflow-y-auto scrollbar-none">
      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-green-800">분석 완료</p>
          <p className="text-[10px] text-green-600">종합 생육지수: 우수</p>
        </div>
      </div>
      {results.map((r) => (
        <div key={r.label} className="bg-white border border-gray-100 rounded-xl px-3 py-2.5 shadow-sm">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] font-semibold text-gray-700">{r.label}</span>
            <span className="text-[11px] font-bold text-gray-900">{r.value}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full ${r.color} rounded-full transition-all duration-700`} style={{ width: `${r.value}%` }} />
          </div>
        </div>
      ))}
      <div className="flex flex-wrap gap-1.5 mt-1">
        {["엽색 양호", "줄기 튼튼", "수분 적정"].map((t) => (
          <span key={t} className="px-2.5 py-1 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full">{t}</span>
        ))}
      </div>
      <button onClick={reset} className="mt-auto mx-auto text-[10px] text-gray-400 underline">다시 분석하기</button>
    </div>
  );
}

/* ② 예측 기술 */
function PredictScreen() {
  const [period, setPeriod] = useState<0 | 1 | 2>(0);
  const data = [
    { label: "현재", height: 45, growth: "32cm", health: "양호", leafColor: "#43a047" },
    { label: "1주 후", height: 60, growth: "38cm", health: "우수", leafColor: "#66bb6a" },
    { label: "2주 후", height: 78, growth: "45cm", health: "최상", leafColor: "#81c784" },
  ];
  const current = data[period];

  return (
    <div className="flex flex-col h-full px-3 py-3 gap-3">
      <div className="flex bg-gray-100 rounded-xl p-0.5">
        {data.map((d, i) => (
          <button
            key={i}
            onClick={() => setPeriod(i as 0 | 1 | 2)}
            className={`flex-1 py-1.5 text-[10px] font-semibold rounded-lg transition-all ${period === i ? "bg-white text-green-700 shadow-sm" : "text-gray-500"}`}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          <svg viewBox="0 0 140 160" className="w-36 h-40 transition-all duration-500">
            <rect x="40" y="120" width="60" height="30" rx="4" fill="#8d6e63" />
            <rect x="35" y="115" width="70" height="10" rx="3" fill="#a1887f" />
            <ellipse cx="70" cy="118" rx="30" ry="5" fill="#5d4037" />
            <line x1="70" y1="115" x2="70" y2={115 - current.height} stroke="#4caf50" strokeWidth="3" />
            <path d={`M70 ${115 - current.height + 10} C70 ${115 - current.height + 10}, ${70 + 15 + period * 5} ${115 - current.height - 5}, ${70 + 20 + period * 5} ${115 - current.height + 10} C${70 + 25 + period * 5} ${115 - current.height + 25}, 70 ${115 - current.height + 25}, 70 ${115 - current.height + 25}Z`} fill={current.leafColor} className="transition-all duration-500" />
            <path d={`M70 ${115 - current.height + 10} C70 ${115 - current.height + 10}, ${70 - 15 - period * 5} ${115 - current.height - 5}, ${70 - 20 - period * 5} ${115 - current.height + 10} C${70 - 25 - period * 5} ${115 - current.height + 25}, 70 ${115 - current.height + 25}, 70 ${115 - current.height + 25}Z`} fill={current.leafColor} opacity="0.8" className="transition-all duration-500" />
            {period > 0 && (
              <>
                <path d={`M70 ${115 - current.height + 25} C70 ${115 - current.height + 25}, ${70 + 12 + period * 3} ${115 - current.height + 15}, ${70 + 18 + period * 3} ${115 - current.height + 25} C${70 + 22 + period * 3} ${115 - current.height + 35}, 70 ${115 - current.height + 35}, 70 ${115 - current.height + 35}Z`} fill={current.leafColor} opacity="0.7" className="transition-all duration-500" />
                <path d={`M70 ${115 - current.height + 25} C70 ${115 - current.height + 25}, ${70 - 12 - period * 3} ${115 - current.height + 15}, ${70 - 18 - period * 3} ${115 - current.height + 25} C${70 - 22 - period * 3} ${115 - current.height + 35}, 70 ${115 - current.height + 35}, 70 ${115 - current.height + 35}Z`} fill={current.leafColor} opacity="0.6" className="transition-all duration-500" />
              </>
            )}
          </svg>
          {period > 0 && (
            <div className="absolute -right-2 top-1/2 -translate-y-1/2">
              <svg className="w-4 h-4 text-green-500 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <div className="bg-green-50 rounded-xl p-2 text-center">
          <p className="text-[9px] text-gray-500">키</p>
          <p className="text-sm font-bold text-green-700">{current.growth}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-2 text-center">
          <p className="text-[9px] text-gray-500">상태</p>
          <p className="text-sm font-bold text-green-700">{current.health}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-2 text-center">
          <p className="text-[9px] text-gray-500">성장률</p>
          <p className="text-sm font-bold text-green-700">{current.height}%</p>
        </div>
      </div>
      {period > 0 && (
        <p className="text-center text-[10px] text-green-600 font-medium animate-pulse">
          {period === 1 ? "1주 후" : "2주 후"} 예측 결과입니다
        </p>
      )}
    </div>
  );
}

/* ③ 시각적 관리 */
function DashboardScreen() {
  const statusCards = [
    { label: "토마토 A동", status: "양호", color: "bg-green-500", value: 85 },
    { label: "딸기 B동", status: "주의", color: "bg-yellow-500", value: 62 },
    { label: "상추 C동", status: "우수", color: "bg-emerald-500", value: 94 },
  ];
  const growthBars = [
    { label: "토마토", value: 78, color: "bg-red-400" },
    { label: "딸기", value: 65, color: "bg-pink-400" },
    { label: "상추", value: 91, color: "bg-green-400" },
    { label: "고추", value: 54, color: "bg-orange-400" },
  ];

  return (
    <div className="flex flex-col h-full px-3 py-3 gap-2.5 overflow-y-auto scrollbar-none">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-gray-800">내 농장 대시보드</p>
        <span className="text-[9px] text-gray-400">2025.01.15</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {statusCards.map((card) => (
          <div key={card.label} className="bg-white border border-gray-100 rounded-xl p-2 shadow-sm">
            <div className={`w-2 h-2 ${card.color} rounded-full mb-1`} />
            <p className="text-[9px] text-gray-500 truncate">{card.label}</p>
            <p className="text-[11px] font-bold text-gray-800">{card.status}</p>
            <p className="text-[10px] font-semibold text-gray-600">{card.value}%</p>
          </div>
        ))}
      </div>
      <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-700 mb-2">작물별 성장률</p>
        <div className="space-y-2">
          {growthBars.map((bar) => (
            <div key={bar.label}>
              <div className="flex justify-between mb-0.5">
                <span className="text-[9px] text-gray-600">{bar.label}</span>
                <span className="text-[9px] font-bold text-gray-700">{bar.value}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${bar.color} rounded-full transition-all duration-700`} style={{ width: `${bar.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="bg-blue-50 rounded-xl p-2.5">
          <p className="text-[9px] text-blue-500">평균 온도</p>
          <p className="text-sm font-bold text-blue-700">23.5°C</p>
        </div>
        <div className="bg-cyan-50 rounded-xl p-2.5">
          <p className="text-[9px] text-cyan-500">평균 습도</p>
          <p className="text-sm font-bold text-cyan-700">68%</p>
        </div>
      </div>
    </div>
  );
}

/* ④ 맞춤 컨설팅 */
function ConsultScreen() {
  const [step, setStep] = useState<"idle" | "generating" | "done">("idle");
  const [dots, setDots] = useState(0);

  const generate = useCallback(() => {
    setStep("generating");
    setDots(0);
    const dotTimer = setInterval(() => setDots((d) => (d + 1) % 4), 400);
    setTimeout(() => { clearInterval(dotTimer); setStep("done"); }, 2400);
  }, []);

  if (step === "idle") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <p className="text-xs text-gray-500 text-center">현재 데이터를 기반으로<br/>맞춤 처방 리포트를 생성합니다</p>
        <button onClick={generate} className="px-5 py-2.5 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg hover:bg-green-600 transition-colors">
          리포트 생성하기
        </button>
      </div>
    );
  }

  if (step === "generating") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
        <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin" />
        <p className="text-xs font-semibold text-green-600">AI 리포트 생성 중{".".repeat(dots)}</p>
        <div className="space-y-1.5 w-full max-w-[180px]">
          {["데이터 수집", "환경 분석", "처방 생성"].map((t, i) => (
            <div key={t} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full flex items-center justify-center ${i < 2 ? "bg-green-500" : "bg-gray-200 animate-pulse"}`}>
                {i < 2 && <svg className="w-2 h-2 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
              </div>
              <span className="text-[10px] text-gray-600">{t}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const prescriptions = [
    { icon: "💧", label: "물주기", value: "2일 1회, 200ml", tip: "아침 7시 권장" },
    { icon: "🌱", label: "비료", value: "NPK 20-20-20", tip: "주 1회 희석 시비" },
    { icon: "🌡️", label: "온도", value: "22~26°C 유지", tip: "야간 18°C 이상" },
    { icon: "☀️", label: "일조량", value: "14시간/일", tip: "보광 필요 시 LED" },
  ];

  return (
    <div className="flex flex-col h-full px-3 py-3 gap-2 overflow-y-auto scrollbar-none">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
        </div>
        <p className="text-xs font-bold text-gray-800">맞춤 처방전</p>
      </div>
      {prescriptions.map((p) => (
        <div key={p.label} className="bg-white border border-gray-100 rounded-xl px-3 py-2.5 shadow-sm flex items-start gap-2.5">
          <span className="text-lg leading-none mt-0.5">{p.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-gray-800">{p.label}</p>
            <p className="text-[10px] text-green-700 font-semibold">{p.value}</p>
            <p className="text-[9px] text-gray-400 mt-0.5">{p.tip}</p>
          </div>
        </div>
      ))}
      <button onClick={() => setStep("idle")} className="mt-auto mx-auto text-[10px] text-gray-400 underline">다시 생성하기</button>
    </div>
  );
}

/* ⑤ 교육 프로그램 */
function EduScreen() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const courses = [
    { id: 0, title: "작물 생육 기초", progress: 80, desc: "작물의 성장 단계별 특성과 관리 요령을 학습합니다. 발아부터 수확까지의 전 과정을 다룹니다.", lessons: 12 },
    { id: 1, title: "병해충 관리", progress: 45, desc: "주요 병해충 종류와 친환경 방제법을 학습합니다. 예방과 조기 대응 전략을 익힙니다.", lessons: 8 },
    { id: 2, title: "스마트팜 기술", progress: 20, desc: "IoT 센서, 자동화 시스템, 데이터 분석 등 스마트팜 핵심 기술을 학습합니다.", lessons: 15 },
    { id: 3, title: "토양 및 영양 관리", progress: 0, desc: "토양 분석 방법과 작물별 최적 영양 관리 전략을 학습합니다.", lessons: 10 },
  ];

  return (
    <div className="flex flex-col h-full px-3 py-3 gap-2 overflow-y-auto scrollbar-none">
      <p className="text-xs font-bold text-gray-800 mb-1">교육 콘텐츠</p>
      {courses.map((course) => {
        const isExpanded = expandedId === course.id;
        return (
          <button key={course.id} onClick={() => setExpandedId(isExpanded ? null : course.id)} className="w-full text-left bg-white border border-gray-100 rounded-xl px-3 py-2.5 shadow-sm transition-all">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-gray-800">{course.title}</p>
              <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }} />
              </div>
              <span className="text-[9px] font-semibold text-gray-500 flex-shrink-0">{course.progress}%</span>
            </div>
            <p className="text-[9px] text-gray-400 mt-1">{course.lessons}개 레슨</p>
            {isExpanded && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <p className="text-[10px] text-gray-600 leading-relaxed">{course.desc}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-semibold rounded-full">
                    {course.progress > 0 ? "학습 중" : "미시작"}
                  </span>
                  {course.progress > 0 && course.progress < 100 && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] font-semibold rounded-full">이어하기</span>
                  )}
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Phone Mockup Frame
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SeedlivePhoneMockup({ activeTab }: { activeTab: TabId }) {
  const screenMap: Record<TabId, React.ReactNode> = {
    analysis: <AnalysisScreen />,
    predict: <PredictScreen />,
    dashboard: <DashboardScreen />,
    consult: <ConsultScreen />,
    edu: <EduScreen />,
  };
  const tabTitle = TABS.find((t) => t.id === activeTab)?.label ?? "";

  return (
    <div className="relative mx-auto w-[280px] md:w-[320px]">
      <div className="rounded-[40px] border-[6px] border-gray-800 bg-gray-800 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="relative bg-gray-800 h-7 flex items-center justify-center">
          <div className="w-20 h-5 bg-gray-900 rounded-b-2xl" />
        </div>
        {/* Status Bar */}
        <div className="bg-white px-5 py-1.5 flex items-center justify-between text-[10px] text-gray-500 font-medium">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-2 border border-gray-400 rounded-sm relative">
              <div className="absolute inset-0.5 bg-gray-500 rounded-[1px]" />
            </div>
          </div>
        </div>
        {/* App Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2.5 flex items-center gap-2.5">
          <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M7 20h10" />
              <path d="M10 20c5.5-2.5 8-7.5 8-13-3 0-7 1-9 4.5C7 8 3.5 7 1 7c0 5.5 2.5 10.5 9 13z" />
            </svg>
          </div>
          <div>
            <p className="text-[12px] font-bold text-white">seedlive</p>
            <p className="text-[9px] text-green-100">{tabTitle}</p>
          </div>
        </div>
        {/* Screen Content */}
        <div className="h-[340px] md:h-[380px] bg-gray-50">
          {screenMap[activeTab]}
        </div>
        {/* Bottom Bar */}
        <div className="bg-white h-5 flex items-center justify-center border-t border-gray-100">
          <div className="w-24 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Main Page — 기존 페이지 유지 + 하단에 체험 섹션 추가
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const SeedlivePage: React.FC = () => {
  const scrollRef = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<TabId>("analysis");
  const [tabKey, setTabKey] = useState(0);

  useEffect(() => {
    setTabKey((k) => k + 1);
  }, [activeTab]);

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
      title: "AI 생육 자동 분석",
      description: "스마트폰 사진 촬영만으로 작물의 생육 상태, 병해충, 이상 징후를 AI가 자동으로 분석하여 정량 데이터를 수집합니다.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      title: "예측 기술",
      description: "과거와 현재의 사진을 비교·분석하여 1~2주 후 작물의 생육 상태를 예측하고, 선제적 대응을 가능하게 합니다.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
      title: "시각적 관리",
      description: "작물의 상태와 성장 척도를 디지털화·이미지화하여 한눈에 파악할 수 있는 직관적인 대시보드를 제공합니다.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      title: "맞춤 컨설팅",
      description: "영농 데이터를 자동으로 축적하고, 작물별·환경별 맞춤 재배 처방과 컨설팅 리포트를 제공합니다.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      title: "교육 프로그램",
      description: "식물 성장 과정에 대한 교육 콘텐츠를 제공하며, 교육기관과의 협업을 통해 체계적인 농업 교육을 지원합니다.",
    },
  ];

  return (
    <div className="animate-fadeIn" ref={scrollRef}>
      {/* ═══════ 기존 Hero Section ═══════ */}
      <section className="relative pb-24 pt-36 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute -top-10 -right-10 w-64 h-64 text-green-200 opacity-40" viewBox="0 0 200 200" fill="currentColor">
            <path d="M100 10 C140 30, 180 80, 160 140 C140 180, 100 190, 80 170 C50 140, 30 100, 50 60 C65 30, 85 15, 100 10Z" />
          </svg>
          <svg className="absolute -bottom-10 -left-10 w-48 h-48 text-emerald-200 opacity-30" viewBox="0 0 200 200" fill="currentColor">
            <path d="M100 10 C140 30, 180 80, 160 140 C140 180, 100 190, 80 170 C50 140, 30 100, 50 60 C65 30, 85 15, 100 10Z" />
          </svg>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="scroll-animate inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-2xl shadow-lg mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 20h10" />
              <path d="M10 20c5.5-2.5 8-7.5 8-13-3 0-7 1-9 4.5C7 8 3.5 7 1 7c0 5.5 2.5 10.5 9 13z" />
            </svg>
          </div>

          <h1 className="scroll-animate text-4xl md:text-5xl font-extrabold text-gray-800">
            seedlive
          </h1>
          <p className="scroll-animate mt-4 text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            휴대폰 사진 한 장으로 시작하는
            <br className="hidden md:block" />
            AI 작물 생육 분석·예측·관리 서비스
          </p>

          <div className="scroll-animate-scale mt-12 mx-auto w-56 md:w-64">
            <svg viewBox="0 0 240 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-2xl">
              <rect x="10" y="10" width="220" height="400" rx="30" fill="#1a1a1a" />
              <rect x="18" y="50" width="204" height="320" rx="4" fill="#e8f5e9" />
              <rect x="18" y="18" width="204" height="32" rx="4" fill="#222" />
              <rect x="85" y="18" width="70" height="14" rx="7" fill="#1a1a1a" />
              <circle cx="120" cy="190" r="50" fill="#a5d6a7" />
              <path d="M120 160 C120 160, 140 140, 145 160 C150 180, 120 190, 120 190Z" fill="#66bb6a" />
              <path d="M120 160 C120 160, 100 140, 95 160 C90 180, 120 190, 120 190Z" fill="#43a047" />
              <line x1="120" y1="190" x2="120" y2="240" stroke="#4caf50" strokeWidth="3" />
              <circle cx="120" cy="190" r="70" stroke="#fff" strokeWidth="2" strokeDasharray="8 4" opacity="0.8" />
              <line x1="50" y1="190" x2="190" y2="190" stroke="#4caf50" strokeWidth="1" opacity="0.5" />
              <line x1="120" y1="120" x2="120" y2="260" stroke="#4caf50" strokeWidth="1" opacity="0.5" />
              <rect x="30" y="280" width="80" height="24" rx="12" fill="#4caf50" />
              <text x="70" y="296" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">생육 양호</text>
              <rect x="130" y="280" width="80" height="24" rx="12" fill="#66bb6a" />
              <text x="170" y="296" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">병해 없음</text>
              <rect x="30" y="320" width="180" height="8" rx="4" fill="#c8e6c9" />
              <rect x="30" y="320" width="140" height="8" rx="4" fill="#4caf50" />
              <text x="30" y="345" fill="#388e3c" fontSize="9" fontWeight="bold">성장률 78%</text>
              <circle cx="120" cy="390" r="16" fill="#333" />
              <circle cx="120" cy="390" r="12" fill="#4caf50" />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══════ 기존 Features Section ═══════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="scroll-animate text-3xl font-bold text-gray-800">
              seedlive 핵심 기능
            </h2>
            <p className="scroll-animate mt-4 text-lg text-gray-600">
              사진 한 장에서 시작되는 스마트 농업의 모든 것
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`scroll-animate scroll-animate-delay-${index + 1} bg-green-50 border border-green-100 p-6 rounded-2xl hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 기존 How it works Section ═══════ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="scroll-animate text-3xl font-bold text-gray-800">
              이렇게 사용합니다
            </h2>
            <p className="scroll-animate mt-4 text-lg text-gray-600">
              누구나 쉽게, 3단계로 시작하는 스마트 농업
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "사진 촬영",
                desc: "스마트폰으로 작물을 촬영합니다",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                ),
              },
              {
                step: "2",
                title: "AI 분석",
                desc: "AI가 생육 상태를 자동 분석합니다",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                    <circle cx="12" cy="12" r="6" />
                  </svg>
                ),
              },
              {
                step: "3",
                title: "맞춤 처방",
                desc: "최적의 재배 솔루션을 받습니다",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className={`scroll-animate scroll-animate-delay-${index + 1} text-center`}>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-4">
                  {item.icon}
                </div>
                <div className="text-sm font-bold text-green-500 mb-1">
                  STEP {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 🆕 인터랙티브 체험 섹션 (새로 추가) ═══════ */}
      <section id="demo" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="scroll-animate text-3xl font-bold text-gray-800">
              직접 체험해보세요
            </h2>
            <p className="scroll-animate mt-4 text-lg text-gray-600">
              탭을 선택하고, 모바일 화면에서 seedlive 기능을 경험해보세요
            </p>
          </div>

          {/* Mobile: horizontal scroll tabs */}
          <div className="scroll-animate md:hidden flex gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  activeTab === tab.id
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Desktop: 2-column layout */}
          <div className="flex flex-col md:flex-row gap-10 items-start justify-center">
            {/* Left: Tab List (desktop only) */}
            <div className="hidden md:flex flex-col gap-3 w-80 flex-shrink-0 scroll-animate-left">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${
                    activeTab === tab.id
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "border-gray-100 bg-white hover:border-green-200 hover:bg-green-50/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      activeTab === tab.id ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      {tab.icon}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${activeTab === tab.id ? "text-green-700" : "text-gray-800"}`}>
                        {tab.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{tab.description}</p>
                    </div>
                  </div>
                  {activeTab === tab.id && (
                    <div className="mt-3 flex items-center gap-1.5 text-green-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-semibold">체험 중</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Right: Phone Mockup */}
            <div className="flex-1 flex justify-center scroll-animate-right" key={tabKey}>
              <SeedlivePhoneMockup activeTab={activeTab} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 기존 CTA Section ═══════ */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="scroll-animate text-3xl md:text-4xl font-bold text-white">
            지금 바로 스마트 농업을 시작하세요
          </h2>
          <p className="scroll-animate mt-4 text-lg text-green-100 max-w-2xl mx-auto">
            seedlive와 함께라면 사진 한 장으로 작물 관리의 새로운 시대를 열 수
            있습니다.
          </p>
          <div className="scroll-animate mt-8">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 bg-white text-green-700 font-bold py-4 px-10 rounded-full shadow-lg hover:bg-green-50 transition-transform duration-300 transform hover:scale-105 text-lg"
            >
              seedlive 시작하기
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeedlivePage;
