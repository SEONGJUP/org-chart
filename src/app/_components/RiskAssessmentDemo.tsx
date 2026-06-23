"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { IconPrinter, IconX, IconChevronDown, IconDownload } from "@tabler/icons-react";
import { downloadRiskAssessmentEmptyHtml } from "../_utils/riskAssessmentEmptyHtml";

interface RiskRow {
  id: number;
  hazard: string;
  currentMeasure: string;
  frequency: number;
  severity: number;
  improvement: string;
}

interface SubTask {
  label: string;
  rows: RiskRow[];
}

interface CategoryData {
  label: string;
  subTasks: SubTask[];
}

const RISK_DATA: CategoryData[] = [
  {
    label: "건설공사",
    subTasks: [
      {
        label: "고소작업(비계)",
        rows: [
          { id: 1, hazard: "비계 상부 추락", currentMeasure: "안전대 착용", frequency: 3, severity: 5, improvement: "안전난간 설치 및 추락방지망 보강" },
          { id: 2, hazard: "자재 낙하", currentMeasure: "안전모 착용", frequency: 4, severity: 4, improvement: "낙하물 방지망 설치 및 자재 고정" },
          { id: 3, hazard: "비계 붕괴", currentMeasure: "정기 점검 실시", frequency: 2, severity: 5, improvement: "구조검토서 기반 설치 및 전문가 점검" },
        ],
      },
      {
        label: "굴착작업",
        rows: [
          { id: 1, hazard: "토사 붕괴", currentMeasure: "흙막이 설치", frequency: 3, severity: 5, improvement: "지반조사 실시 및 흙막이 보강" },
          { id: 2, hazard: "매설물 파손", currentMeasure: "사전 탐사", frequency: 2, severity: 4, improvement: "GPR 탐사 및 시험 굴착 실시" },
        ],
      },
    ],
  },
  {
    label: "제조업",
    subTasks: [
      {
        label: "프레스 작업",
        rows: [
          { id: 1, hazard: "손·손가락 협착", currentMeasure: "방호장치 설치", frequency: 4, severity: 5, improvement: "양수조작식 안전장치 교체" },
          { id: 2, hazard: "소음성 난청", currentMeasure: "귀마개 지급", frequency: 5, severity: 3, improvement: "방음벽 설치 및 귀덮개 교체" },
        ],
      },
      {
        label: "용접작업",
        rows: [
          { id: 1, hazard: "화상 및 화재", currentMeasure: "소화기 비치", frequency: 3, severity: 4, improvement: "불꽃방지덮개 사용 및 소화기 증설" },
          { id: 2, hazard: "유해가스 흡입", currentMeasure: "환기팬 가동", frequency: 4, severity: 4, improvement: "국소배기장치 설치 및 방독마스크 착용" },
          { id: 3, hazard: "감전 위험", currentMeasure: "절연장갑 착용", frequency: 2, severity: 5, improvement: "자동전격방지기 부착 및 접지확인" },
        ],
      },
      {
        label: "지게차 운반",
        rows: [
          { id: 1, hazard: "보행자 충돌", currentMeasure: "경광등 부착", frequency: 3, severity: 4, improvement: "보행자 통로 분리 및 후방카메라 설치" },
          { id: 2, hazard: "적재물 낙하", currentMeasure: "적재량 준수", frequency: 3, severity: 3, improvement: "팔레트 상태 점검 및 고박장치 사용" },
        ],
      },
    ],
  },
  {
    label: "서비스업",
    subTasks: [
      {
        label: "주방 조리작업",
        rows: [
          { id: 1, hazard: "화상(기름 튐)", currentMeasure: "앞치마 착용", frequency: 4, severity: 3, improvement: "기름 튐 방지 덮개 사용 및 내열장갑 비치" },
          { id: 2, hazard: "미끄러짐", currentMeasure: "미끄럼 주의 표시", frequency: 3, severity: 2, improvement: "미끄럼 방지 매트 설치 및 방수화 착용" },
        ],
      },
      {
        label: "청소·시설관리",
        rows: [
          { id: 1, hazard: "화학물질 노출", currentMeasure: "고무장갑 착용", frequency: 3, severity: 3, improvement: "MSDS 비치 및 보호구 세트 지급" },
          { id: 2, hazard: "사다리 추락", currentMeasure: "2인 1조 작업", frequency: 2, severity: 4, improvement: "이동식 작업대 사용 및 안전발판 교체" },
          { id: 3, hazard: "근골격계 질환", currentMeasure: "스트레칭 실시", frequency: 4, severity: 2, improvement: "인력운반 보조기구 도입 및 작업 로테이션" },
        ],
      },
    ],
  },
];

const SIDEBAR_ITEMS = [
  { label: "대시보드", active: false },
  { label: "위험성평가", active: true },
  { label: "안전교육", active: false },
  { label: "점검관리", active: false },
  { label: "안전활동", active: false },
  { label: "근로자관리", active: false },
];

function getRiskLevel(freq: number, sev: number): { label: string; color: string; bg: string } {
  const score = freq * sev;
  if (score >= 12) return { label: "상", color: "text-red-700", bg: "bg-red-100" };
  if (score >= 6) return { label: "중", color: "text-yellow-700", bg: "bg-yellow-100" };
  return { label: "하", color: "text-green-700", bg: "bg-green-100" };
}

const RiskAssessmentDemo = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubTask, setSelectedSubTask] = useState("");
  const [rows, setRows] = useState<RiskRow[]>([]);
  const [visibleRows, setVisibleRows] = useState(0);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [subTaskOpen, setSubTaskOpen] = useState(false);

  const [isInView, setIsInView] = useState(false);
  const comboRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = comboRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showAttention = isInView && !selectedCategory;

  const categoryData = RISK_DATA.find((c) => c.label === selectedCategory);
  const subTasks = categoryData?.subTasks || [];

  const animateRows = useCallback((allRows: RiskRow[]) => {
    setRows(allRows);
    setVisibleRows(0);
    allRows.forEach((_, i) => {
      setTimeout(() => {
        setVisibleRows((prev) => prev + 1);
      }, 300 * (i + 1));
    });
  }, []);

  useEffect(() => {
    if (!selectedSubTask) {
      setRows([]);
      setVisibleRows(0);
      return;
    }
    const subTask = subTasks.find((s) => s.label === selectedSubTask);
    if (subTask) {
      animateRows(subTask.rows);
    }
  }, [selectedSubTask, subTasks, animateRows]);

  const handleCategorySelect = (label: string) => {
    setSelectedCategory(label);
    setSelectedSubTask("");
    setRows([]);
    setVisibleRows(0);
    setCategoryOpen(false);
  };

  const handleSubTaskSelect = (label: string) => {
    setSelectedSubTask(label);
    setSubTaskOpen(false);
  };

  return (
    <div className="w-full max-w-[960px] mx-auto">
      {/* Browser Frame */}
      <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
        {/* Title Bar */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-3">
            <div className="bg-white rounded-md px-3 py-1 text-[10px] text-gray-400 text-center border border-gray-200">
              safebuddy.co.kr/admin/risk-assessment
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex min-h-[420px]">
          {/* Sidebar */}
          <div className="w-[140px] bg-gray-900 py-3 px-2 flex-shrink-0 hidden md:block">
            <div className="flex items-center gap-2 px-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-mint-500 flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">SB</span>
              </div>
              <span className="text-white text-[10px] font-bold">SafeBuddy</span>
            </div>
            {SIDEBAR_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`px-2 py-1.5 rounded-md text-[10px] mb-0.5 cursor-default ${
                  item.active
                    ? "bg-mint-600 text-white font-semibold"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-gray-900">위험성평가표</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={downloadRiskAssessmentEmptyHtml}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-white text-gray-500 text-[11px] font-medium rounded-md border border-gray-200 hover:border-mint-400 hover:text-mint-600 transition-colors"
                >
                  <IconDownload size={12} />
                  HTML
                </button>
                {rows.length > 0 && visibleRows >= rows.length && (
                  <button
                    onClick={() => setShowPrintModal(true)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-mint-500 text-white text-[11px] font-medium rounded-md hover:bg-mint-600 transition-colors"
                  >
                    <IconPrinter size={13} />
                    문서출력
                  </button>
                )}
              </div>
            </div>

            {/* Combo Boxes */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5" ref={comboRef}>
              {/* Category Combobox */}
              <div className="relative flex-1">
                <button
                  onClick={() => { setCategoryOpen(!categoryOpen); setSubTaskOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-[12px] bg-white hover:border-mint-400 transition-colors ${showAttention ? "combo-attention" : ""}`}
                >
                  <span className={selectedCategory ? "text-gray-800" : "text-gray-400"}>
                    {selectedCategory || "중분류 선택"}
                  </span>
                  <IconChevronDown size={14} className={`transition-transform ${showAttention ? "text-mint-500" : "text-gray-400"} ${categoryOpen ? "rotate-180" : ""}`} />
                </button>
                {showAttention && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] text-mint-600 font-semibold whitespace-nowrap animate-bounce">
                    클릭하여 업종을 선택해 보세요
                  </span>
                )}
                {categoryOpen && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {RISK_DATA.map((cat) => (
                      <button
                        key={cat.label}
                        onClick={() => handleCategorySelect(cat.label)}
                        className={`w-full text-left px-3 py-2 text-[12px] hover:bg-mint-50 transition-colors ${
                          selectedCategory === cat.label ? "bg-mint-50 text-mint-700 font-medium" : "text-gray-700"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* SubTask Combobox */}
              <div className="relative flex-1">
                <button
                  onClick={() => { if (subTasks.length > 0) { setSubTaskOpen(!subTaskOpen); setCategoryOpen(false); } }}
                  className={`w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-[12px] bg-white transition-colors ${
                    subTasks.length > 0 ? "hover:border-mint-400" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <span className={selectedSubTask ? "text-gray-800" : "text-gray-400"}>
                    {selectedSubTask || "단위작업 선택"}
                  </span>
                  <IconChevronDown size={14} className={`text-gray-400 transition-transform ${subTaskOpen ? "rotate-180" : ""}`} />
                </button>
                {subTaskOpen && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {subTasks.map((st) => (
                      <button
                        key={st.label}
                        onClick={() => handleSubTaskSelect(st.label)}
                        className={`w-full text-left px-3 py-2 text-[12px] hover:bg-mint-50 transition-colors ${
                          selectedSubTask === st.label ? "bg-mint-50 text-mint-700 font-medium" : "text-gray-700"
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Table */}
            {rows.length > 0 ? (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-2 py-2 text-gray-600 font-semibold border-b border-gray-200 w-[30px] text-center">#</th>
                      <th className="px-2 py-2 text-gray-600 font-semibold border-b border-gray-200 text-left">유해위험요인</th>
                      <th className="px-2 py-2 text-gray-600 font-semibold border-b border-gray-200 text-left hidden sm:table-cell">현재안전조치</th>
                      <th className="px-2 py-2 text-gray-600 font-semibold border-b border-gray-200 text-center w-[80px]">위험도</th>
                      <th className="px-2 py-2 text-gray-600 font-semibold border-b border-gray-200 text-left hidden md:table-cell">개선대책</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => {
                      const risk = getRiskLevel(row.frequency, row.severity);
                      const isVisible = i < visibleRows;
                      return (
                        <tr
                          key={row.id}
                          className="border-b border-gray-100 last:border-b-0 transition-all duration-500"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "translateY(0)" : "translateY(12px)",
                          }}
                        >
                          <td className="px-2 py-2.5 text-gray-400 text-center">{row.id}</td>
                          <td className="px-2 py-2.5 text-gray-800 font-medium">{row.hazard}</td>
                          <td className="px-2 py-2.5 text-gray-600 hidden sm:table-cell">{row.currentMeasure}</td>
                          <td className="px-2 py-2.5 text-center">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${risk.bg} ${risk.color}`}>
                              {risk.label} ({row.frequency}×{row.severity})
                            </span>
                          </td>
                          <td className="px-2 py-2.5 text-gray-600 hidden md:table-cell">{row.improvement}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-3 opacity-40">
                  <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
                  <path d="M6 18h36" stroke="currentColor" strokeWidth="2" />
                  <path d="M18 18v20" stroke="currentColor" strokeWidth="2" />
                </svg>
                <p className="text-[13px]">중분류와 단위작업을 선택하면</p>
                <p className="text-[13px]">위험성평가표가 자동으로 생성됩니다.</p>
              </div>
            )}

            {/* Status */}
            {rows.length > 0 && visibleRows >= rows.length && (
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-medium rounded-full border border-green-200">
                  평가완료
                </span>
                <span className="text-[10px] text-gray-400">AI 자동생성 · {rows.length}건</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Print Preview Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-[520px] w-full overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
              <h4 className="text-sm font-bold text-gray-900">위험성평가표 미리보기</h4>
              <button
                onClick={() => setShowPrintModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <IconX size={14} className="text-gray-500" />
              </button>
            </div>
            <div className="p-5">
              {/* Print Preview Content */}
              <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-inner">
                <div className="text-center mb-4">
                  <h5 className="text-[14px] font-bold text-gray-900">위험성평가표</h5>
                  <p className="text-[10px] text-gray-500 mt-1">
                    {selectedCategory} &gt; {selectedSubTask}
                  </p>
                </div>
                <table className="w-full text-[10px] border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-2 py-1.5 text-center w-[24px]">#</th>
                      <th className="border border-gray-200 px-2 py-1.5 text-left">유해위험요인</th>
                      <th className="border border-gray-200 px-2 py-1.5 text-left">현재안전조치</th>
                      <th className="border border-gray-200 px-2 py-1.5 text-center w-[60px]">위험도</th>
                      <th className="border border-gray-200 px-2 py-1.5 text-left">개선대책</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => {
                      const risk = getRiskLevel(row.frequency, row.severity);
                      return (
                        <tr key={row.id}>
                          <td className="border border-gray-200 px-2 py-1.5 text-center text-gray-500">{row.id}</td>
                          <td className="border border-gray-200 px-2 py-1.5 text-gray-800">{row.hazard}</td>
                          <td className="border border-gray-200 px-2 py-1.5 text-gray-600">{row.currentMeasure}</td>
                          <td className="border border-gray-200 px-2 py-1.5 text-center">
                            <span className={`font-bold ${risk.color}`}>{risk.label}</span>
                          </td>
                          <td className="border border-gray-200 px-2 py-1.5 text-gray-600">{row.improvement}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="mt-3 flex justify-between text-[9px] text-gray-400">
                  <span>작성일: 2025.01.15</span>
                  <span>작성자: 홍길동</span>
                </div>
              </div>
            </div>
            <div className="px-5 pb-4 flex gap-2">
              <button
                onClick={() => setShowPrintModal(false)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                닫기
              </button>
              <button className="flex-1 py-2.5 bg-mint-500 text-white text-xs font-medium rounded-lg hover:bg-mint-600 transition-colors flex items-center justify-center gap-1">
                <IconPrinter size={14} />
                인쇄
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessmentDemo;
