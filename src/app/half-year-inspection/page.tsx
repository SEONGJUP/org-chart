"use client";

import { useMemo, useState } from "react";
import {
  IconBook2,
  IconBuilding,
  IconChartBar,
  IconChevronDown,
  IconChevronRight,
  IconClipboardCheck,
  IconFilePlus,
  IconFolder,
  IconLayoutDashboard,
  IconMenu2,
  IconReportAnalytics,
  IconShieldCheck,
  IconSparkles,
} from "@tabler/icons-react";

type PeriodMode = "YEAR" | "HALF" | "MONTH";
type DutyStatus = "완료" | "진행중" | "미완료" | "해당없음";
type CycleType = "YEARLY" | "HALF_YEARLY" | "MONTHLY" | "DAILY" | "ON_DEMAND";

type LegalDuty = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  governanceItems: string[];
  safeBuddy?: boolean;
};

type SafetyCard = {
  id: string;
  category: string;
  name: string;
  dutyId: string;
  cycleType: CycleType;
  cycleLabel: string;
  scheduledMonths: number[];
  baseActual: number;
  evidence: number;
};

type Period = {
  mode: PeriodMode;
  year: number;
  half: "H1" | "H2";
  month: number;
  endMonth: number;
  label: string;
  rangeLabel: string;
};

const legalDuties: LegalDuty[] = [
  { id: "risk", number: "①", title: "유해·위험요인 확인 및 개선 여부", shortTitle: "유해·위험요인 확인 및 개선", governanceItems: [] },
  { id: "manager", number: "②", title: "안전보건관리책임자 등의 충실한 업무수행 평가·관리", shortTitle: "책임자 업무수행 평가·관리", governanceItems: ["안전보건조직구성 여부", "안전보건예산 편성 및 실적", "책임자 평가 (상/하반기)"] },
  { id: "voice", number: "③", title: "종사자 의견청취 절차에 따른 의견 수렴 및 개선방안 마련·이행 여부", shortTitle: "종사자 의견 수렴 및 개선", governanceItems: ["근로자 의견청취 · 소통 (안전제안 00건, 안전신고 00건)"] },
  { id: "emergency", number: "④", title: "중대산업재해 발생 대비 매뉴얼에 따른 조치 여부", shortTitle: "중대산업재해 대비 매뉴얼", governanceItems: ["재해 및 아차사고 (재해사고 재발방지조치 00건, 아차사고 00건)"] },
  { id: "contract", number: "⑤", title: "도급·용역·위탁 기준·절차 이행 여부", shortTitle: "도급·용역·위탁 기준 이행", governanceItems: ["적격수급업체 평가 이행 : 상/하반기"] },
  { id: "law", number: "⑥", title: "안전·보건 관계 법령에 따른 의무 이행 여부", shortTitle: "관계 법령 의무 이행", governanceItems: ["관계 법령 의무 이행 점검표", "법령 개정사항 반영 여부", "미준수 항목 조치계획"] },
  { id: "education", number: "⑦", title: "안전·보건 관계 법령에 따른 의무적인 교육 실시 여부", shortTitle: "의무 안전보건 교육", governanceItems: ["법정교육 대상자 관리", "교육 이수율 및 미이수자 조치", "교육 증빙자료 확인"] },
  { id: "safe-buddy", number: "⑧", title: "안전보건 확보 의무 이행 여부 (중대재해처벌법 시행령 제4조, 제5조 관련)", shortTitle: "안전보건 확보 의무 이행", governanceItems: ["안전보건 확보 의무 종합 이행점검", "반기별 이행점검 보고서 생성", "경영책임자 검토 및 승인"], safeBuddy: true },
];

const safetyCards: SafetyCard[] = [
  { id: "policy", category: "안전 경영", name: "안전보건 경영방침", dutyId: "manager", cycleType: "YEARLY", cycleLabel: "연 1회", scheduledMonths: [1], baseActual: 1, evidence: 2 },
  { id: "goal", category: "안전 경영", name: "안전보건 목표", dutyId: "safe-buddy", cycleType: "YEARLY", cycleLabel: "연 1회", scheduledMonths: [1], baseActual: 1, evidence: 2 },
  { id: "goal-plan", category: "안전 경영", name: "안전보건 목표 및 추진 계획", dutyId: "safe-buddy", cycleType: "YEARLY", cycleLabel: "연 1회", scheduledMonths: [1], baseActual: 1, evidence: 2 },
  { id: "manual", category: "안전 경영", name: "안전보건매뉴얼·계획서", dutyId: "law", cycleType: "HALF_YEARLY", cycleLabel: "반기 1회", scheduledMonths: [6, 12], baseActual: 1, evidence: 3 },
  { id: "partner-eval", category: "안전 경영", name: "협력업체평가", dutyId: "contract", cycleType: "HALF_YEARLY", cycleLabel: "반기 1회", scheduledMonths: [6, 12], baseActual: 1, evidence: 2 },
  { id: "appointment", category: "안전 경영", name: "선임보고서", dutyId: "manager", cycleType: "YEARLY", cycleLabel: "연 1회", scheduledMonths: [1], baseActual: 1, evidence: 1 },

  { id: "tbm", category: "안전 보건 교육", name: "TBM 교육", dutyId: "education", cycleType: "MONTHLY", cycleLabel: "월 1회", scheduledMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], baseActual: 10, evidence: 10 },
  { id: "daily-edu", category: "안전 보건 교육", name: "일일 안전교육", dutyId: "education", cycleType: "MONTHLY", cycleLabel: "월 1회", scheduledMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], baseActual: 3, evidence: 3 },
  { id: "new-hire", category: "안전 보건 교육", name: "신규 채용자 교육", dutyId: "education", cycleType: "ON_DEMAND", cycleLabel: "발생시", scheduledMonths: [], baseActual: 2, evidence: 2 },
  { id: "special-edu", category: "안전 보건 교육", name: "특별 안전보건 교육", dutyId: "education", cycleType: "ON_DEMAND", cycleLabel: "발생시", scheduledMonths: [], baseActual: 1, evidence: 1 },
  { id: "special-worker", category: "안전 보건 교육", name: "특수형태 근로종사자 교육", dutyId: "education", cycleType: "ON_DEMAND", cycleLabel: "발생시", scheduledMonths: [], baseActual: 0, evidence: 0 },
  { id: "changed-work", category: "안전 보건 교육", name: "작업 변경 시 교육", dutyId: "education", cycleType: "ON_DEMAND", cycleLabel: "발생시", scheduledMonths: [], baseActual: 1, evidence: 1 },
  { id: "msds", category: "안전 보건 교육", name: "물질 안전보건 (MSDS) 교육", dutyId: "education", cycleType: "HALF_YEARLY", cycleLabel: "반기 1회", scheduledMonths: [6, 12], baseActual: 1, evidence: 1 },
  { id: "supervisor-edu", category: "안전 보건 교육", name: "정기 안전보건 교육 (관리감독자)", dutyId: "education", cycleType: "HALF_YEARLY", cycleLabel: "반기 1회", scheduledMonths: [6, 12], baseActual: 1, evidence: 1 },
  { id: "worker-edu", category: "안전 보건 교육", name: "정기 안전보건 교육 (근로자)", dutyId: "education", cycleType: "HALF_YEARLY", cycleLabel: "반기 1회", scheduledMonths: [6, 12], baseActual: 1, evidence: 1 },
  { id: "etc-edu", category: "안전 보건 교육", name: "기타 교육", dutyId: "education", cycleType: "ON_DEMAND", cycleLabel: "발생시", scheduledMonths: [], baseActual: 0, evidence: 0 },
  { id: "worker-safety", category: "안전 보건 교육", name: "작업자 안전교육", dutyId: "education", cycleType: "MONTHLY", cycleLabel: "월 1회", scheduledMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], baseActual: 10, evidence: 10 },

  { id: "inspection", category: "안전 보건 점검", name: "안전점검", dutyId: "risk", cycleType: "MONTHLY", cycleLabel: "월 1회", scheduledMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], baseActual: 10, evidence: 10 },
  { id: "inspection-action", category: "안전 보건 점검", name: "안전점검 조치사항", dutyId: "risk", cycleType: "MONTHLY", cycleLabel: "월 1회", scheduledMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], baseActual: 3, evidence: 3 },
  { id: "daily-check", category: "안전 보건 점검", name: "일일 안전 보건점검", dutyId: "risk", cycleType: "DAILY", cycleLabel: "매일", scheduledMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], baseActual: 219, evidence: 219 },
  { id: "daily-checklist", category: "안전 보건 점검", name: "일일 안전 점검일지(체크리스트 사용)", dutyId: "risk", cycleType: "DAILY", cycleLabel: "매일", scheduledMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], baseActual: 218, evidence: 218 },
  { id: "daily-risk", category: "안전 보건 점검", name: "일일 안전 점검일지(위험성평가 연계)", dutyId: "risk", cycleType: "DAILY", cycleLabel: "매일", scheduledMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], baseActual: 213, evidence: 213 },
  { id: "labor-joint", category: "안전 보건 점검", name: "노사 합동 안전점검", dutyId: "risk", cycleType: "HALF_YEARLY", cycleLabel: "반기 1회", scheduledMonths: [6, 12], baseActual: 1, evidence: 1 },
  { id: "joint-inspection", category: "안전 보건 점검", name: "합동 안전점검", dutyId: "risk", cycleType: "HALF_YEARLY", cycleLabel: "반기 1회", scheduledMonths: [6, 12], baseActual: 0, evidence: 0 },
  { id: "patrol", category: "안전 보건 점검", name: "작업장 순회점검표(체크리스트 사용)", dutyId: "risk", cycleType: "MONTHLY", cycleLabel: "월 1회", scheduledMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], baseActual: 10, evidence: 10 },

  { id: "risk-assessment", category: "위험성 평가", name: "위험성평가", dutyId: "risk", cycleType: "HALF_YEARLY", cycleLabel: "반기 1회", scheduledMonths: [6, 12], baseActual: 1, evidence: 3 },
  { id: "risk-focus", category: "위험성 평가", name: "위험성평가 중점관리", dutyId: "risk", cycleType: "MONTHLY", cycleLabel: "월 1회", scheduledMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], baseActual: 3, evidence: 3 },

  { id: "worker-report", category: "근로자 참여", name: "근로자 신고", dutyId: "voice", cycleType: "ON_DEMAND", cycleLabel: "발생시", scheduledMonths: [], baseActual: 4, evidence: 4 },
  { id: "worker-suggestion", category: "근로자 참여", name: "근로자 제안사항", dutyId: "voice", cycleType: "ON_DEMAND", cycleLabel: "발생시", scheduledMonths: [], baseActual: 5, evidence: 5 },

  { id: "hot-work", category: "작업계획·허가서", name: "화기 작업계획서", dutyId: "contract", cycleType: "ON_DEMAND", cycleLabel: "발생시", scheduledMonths: [], baseActual: 3, evidence: 3 },
  { id: "heavy-work", category: "작업계획·허가서", name: "차량계 건설기계/하역운반 및 중량물 취급 작업계획서", dutyId: "contract", cycleType: "ON_DEMAND", cycleLabel: "발생시", scheduledMonths: [], baseActual: 2, evidence: 2 },
  { id: "work-plan", category: "작업계획·허가서", name: "작업계획서", dutyId: "contract", cycleType: "ON_DEMAND", cycleLabel: "발생시", scheduledMonths: [], baseActual: 5, evidence: 5 },
  { id: "work-permit", category: "작업계획·허가서", name: "작업허가서", dutyId: "contract", cycleType: "ON_DEMAND", cycleLabel: "발생시", scheduledMonths: [], baseActual: 12, evidence: 12 },
  { id: "work-permit-chm", category: "작업계획·허가서", name: "작업허가증(CHM 전용)", dutyId: "contract", cycleType: "ON_DEMAND", cycleLabel: "발생시", scheduledMonths: [], baseActual: 4, evidence: 4 },
  { id: "work-permit-sk", category: "작업계획·허가서", name: "작업허가증(SK이노베이션 전용)", dutyId: "contract", cycleType: "ON_DEMAND", cycleLabel: "발생시", scheduledMonths: [], baseActual: 3, evidence: 3 },
  { id: "outsourcing-daily", category: "작업계획·허가서", name: "외주공사 일보", dutyId: "contract", cycleType: "ON_DEMAND", cycleLabel: "발생시", scheduledMonths: [], baseActual: 6, evidence: 6 },

  { id: "safety-council", category: "안전 보건 회의", name: "안전보건협의체", dutyId: "law", cycleType: "MONTHLY", cycleLabel: "월 1회", scheduledMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], baseActual: 10, evidence: 10 },
  { id: "labor-council", category: "안전 보건 회의", name: "노사협의체", dutyId: "law", cycleType: "HALF_YEARLY", cycleLabel: "반기 1회", scheduledMonths: [6, 12], baseActual: 1, evidence: 1 },
  { id: "committee", category: "안전 보건 회의", name: "산업 안전 보건위원회", dutyId: "law", cycleType: "HALF_YEARLY", cycleLabel: "반기 1회", scheduledMonths: [6, 12], baseActual: 1, evidence: 1 },

  { id: "accident-report", category: "안전사고관리", name: "사고·재해발생 보고서", dutyId: "emergency", cycleType: "ON_DEMAND", cycleLabel: "발생시", scheduledMonths: [], baseActual: 1, evidence: 1 },
  { id: "emergency-manual", category: "안전사고관리", name: "비상조치계획 시나리오/매뉴얼", dutyId: "emergency", cycleType: "YEARLY", cycleLabel: "연 1회", scheduledMonths: [1], baseActual: 1, evidence: 2 },
  { id: "emergency-drill", category: "안전사고관리", name: "비상훈련 실시 보고서", dutyId: "emergency", cycleType: "YEARLY", cycleLabel: "연 1회", scheduledMonths: [10], baseActual: 0, evidence: 0 },
];

const previousMenus = [
  { label: "대시보드", targetId: "inspection-overview" },
  { label: "월별 이행점검", targetId: "period-filter" },
  { label: "이행점검 이력", targetId: "legal-duty-status" },
  { label: "안전카드 관리", targetId: "safety-card-detail" },
  { label: "위험성 평가", targetId: "safety-card-detail" },
  { label: "안전 교육", targetId: "safety-card-detail" },
  { label: "작업허가", targetId: "safety-card-detail" },
  { label: "안전 점검", targetId: "safety-card-detail" },
  { label: "사고 관리", targetId: "safety-card-detail" },
  { label: "협력업체 관리", targetId: "safety-card-detail" },
  { label: "보고서", targetId: "inspection-overview" },
  { label: "설정", targetId: "period-filter" },
];

function getPeriod(mode: PeriodMode, year: number, half: "H1" | "H2", month: number): Period {
  const endMonth = mode === "YEAR" ? 12 : mode === "HALF" ? (half === "H1" ? 6 : 12) : month;
  const endDay = new Date(year, endMonth, 0).getDate();
  const modeLabel = mode === "YEAR" ? "연도" : mode === "HALF" ? (half === "H1" ? "상반기" : "하반기 누적") : `${month}월 누적`;
  return {
    mode,
    year,
    half,
    month,
    endMonth,
    label: `${year}년 ${modeLabel}`,
    rangeLabel: `기간 : ${year}년 01월 01일 ~ ${year}년 ${String(endMonth).padStart(2, "0")}월 ${String(endDay).padStart(2, "0")}일`,
  };
}

function getTarget(card: SafetyCard, period: Period) {
  if (card.cycleType === "ON_DEMAND") return 0;
  if (card.cycleType === "DAILY") return period.endMonth * 22;
  if (card.cycleType === "MONTHLY") return card.scheduledMonths.filter((month) => month <= period.endMonth).length;
  return card.scheduledMonths.filter((month) => month <= period.endMonth).length;
}

function getActual(card: SafetyCard, period: Period) {
  if (card.cycleType === "ON_DEMAND") return Math.min(card.baseActual, Math.max(0, Math.round(card.baseActual * (period.endMonth / 12))));
  if (card.cycleType === "DAILY") return Math.min(card.baseActual, period.endMonth * 22);
  return Math.min(card.baseActual, Math.max(0, getTarget(card, period)));
}

function getRate(actual: number, target: number) {
  if (target === 0) return actual > 0 ? 100 : 0;
  return Math.min(100, Math.round((actual / target) * 100));
}

function getStatus(actual: number, target: number): DutyStatus {
  if (target === 0 && actual === 0) return "해당없음";
  if (target === 0 && actual > 0) return "완료";
  if (actual === 0 && target > 0) return "미완료";
  if (actual >= target) return "완료";
  return "진행중";
}

function getCyclePolicy(card: SafetyCard) {
  if (card.cycleType === "ON_DEMAND") return { label: "발생 시", description: "자동 생성 진행하지 않음" };
  if (card.cycleType === "DAILY") return { label: "1회/일(주말제외)", description: "해당 주의 월요일부터 금요일까지" };
  if (card.cycleType === "MONTHLY") return { label: "1회/월", description: "선택 기간 내 월별 1회 기준" };
  if (card.cycleType === "HALF_YEARLY") return { label: "1회/반기", description: "상반기·하반기 각 1회 기준" };
  return { label: "1회/년", description: "선택 연도 기준 1회" };
}

function StatusBadge({ status }: { status: DutyStatus }) {
  if (status === "해당없음") return <span className="text-xs text-slate-300">-</span>;
  const className = status === "완료" ? "bg-emerald-50 text-emerald-700 ring-emerald-100" : status === "미완료" ? "bg-rose-50 text-rose-700 ring-rose-100" : "bg-amber-50 text-amber-700 ring-amber-100";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black ring-1 ${className}`}>{status}</span>;
}

function miniStatusClass(status: DutyStatus) {
  if (status === "완료") return "bg-emerald-50 text-emerald-700";
  if (status === "미완료") return "bg-rose-50 text-rose-700";
  if (status === "진행중") return "bg-amber-50 text-amber-700";
  return "bg-slate-100 text-slate-500";
}

function progressClass(status: DutyStatus) {
  if (status === "완료") return "bg-[#00b7af]";
  if (status === "진행중") return "bg-amber-400";
  if (status === "미완료") return "bg-rose-400";
  return "bg-slate-300";
}

function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 border-r border-slate-200 bg-white px-4 py-5 xl:block">
      <div className="mb-7 flex items-center gap-3 px-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#00b7af] text-white">
          <IconShieldCheck size={22} />
        </div>
        <div>
          <p className="text-lg font-black text-slate-900">SafeBuddy</p>
          <p className="text-[10px] font-black tracking-[0.18em] text-[#00a099]">SAFETY OS</p>
        </div>
      </div>
      <nav className="space-y-2">
        <button className="flex w-full items-center gap-3 rounded-xl bg-teal-50 px-4 py-3 text-left text-sm font-black text-[#008d86]">
          <IconLayoutDashboard size={18} />
          중처법 이행현황
        </button>
        <button onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-500 hover:bg-slate-50">
          <span className="flex items-center gap-3">
            <IconFolder size={18} />
            이전 메뉴 보관
          </span>
          <IconChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="ml-4 space-y-1 border-l border-slate-200 pl-3">
            {previousMenus.map((item) => (
              <button key={item.label} onClick={() => document.getElementById(item.targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })} className="block w-full rounded-lg px-3 py-2 text-left text-xs font-bold text-slate-400 hover:bg-slate-50 hover:text-slate-600">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
}

function FilterBar({ mode, setMode, year, setYear, half, setHalf, month, setMonth, period }: {
  mode: PeriodMode;
  setMode: (mode: PeriodMode) => void;
  year: number;
  setYear: (year: number) => void;
  half: "H1" | "H2";
  setHalf: (half: "H1" | "H2") => void;
  month: number;
  setMonth: (month: number) => void;
  period: Period;
}) {
  return (
    <div id="period-filter" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[0.14em] text-[#00a099]">SECTION 1</p>
          <h2 className="mt-1 text-xl font-black text-slate-900">기간 선택</h2>
          <p className="mt-1 text-sm text-slate-500">모든 조회는 선택 연도 1월 1일부터 선택 기간 말일까지의 누적치로 보여줍니다.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select value={year} onChange={(event) => setYear(Number(event.target.value))} className="control-select">
            {[2024, 2025, 2026].map((value) => <option key={value} value={value}>{value}년</option>)}
          </select>
          <div className="segmented">
            <button onClick={() => setMode("YEAR")} className={mode === "YEAR" ? "active" : ""}>년도</button>
            <button onClick={() => setMode("HALF")} className={mode === "HALF" ? "active" : ""}>반기</button>
            <button onClick={() => setMode("MONTH")} className={mode === "MONTH" ? "active" : ""}>월</button>
          </div>
          {mode === "HALF" && (
            <div className="segmented">
              <button onClick={() => setHalf("H1")} className={half === "H1" ? "active" : ""}>상반기</button>
              <button onClick={() => setHalf("H2")} className={half === "H2" ? "active" : ""}>하반기</button>
            </div>
          )}
          {mode === "MONTH" && (
            <select value={month} onChange={(event) => setMonth(Number(event.target.value))} className="control-select">
              {Array.from({ length: 12 }, (_, index) => index + 1).map((value) => <option key={value} value={value}>{value}월</option>)}
            </select>
          )}
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-sm font-bold text-teal-800">{period.rangeLabel}</div>
    </div>
  );
}

function Overview({
  totalRate,
  totalActual,
  totalTarget,
  totalEvidence,
  totalCards,
  mode,
  setMode,
  year,
  setYear,
  half,
  setHalf,
  month,
  setMonth,
  period,
}: {
  totalRate: number;
  totalActual: number;
  totalTarget: number;
  totalEvidence: number;
  totalCards: number;
  mode: PeriodMode;
  setMode: (mode: PeriodMode) => void;
  year: number;
  setYear: (year: number) => void;
  half: "H1" | "H2";
  setHalf: (half: "H1" | "H2") => void;
  month: number;
  setMonth: (month: number) => void;
  period: Period;
}) {
  return (
    <section id="inspection-overview" className="scroll-mt-24 space-y-4">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.75fr)]">
        <div className="relative overflow-hidden rounded-[22px] bg-[#08b8ae] p-6 text-white shadow-sm">
          <div className="pointer-events-none absolute -right-6 -top-20 h-48 w-48 rounded-full border-[28px] border-white/12" />
          <div className="pointer-events-none absolute bottom-[-78px] right-36 h-36 w-36 rounded-full border-[22px] border-white/10" />
          <div className="pointer-events-none absolute right-9 top-10 grid h-14 w-14 place-items-center rounded-2xl bg-white/14">
            <IconShieldCheck size={30} strokeWidth={2.2} />
          </div>

          <p className="text-base font-black text-white/90">안전관리체계 종합 이행률</p>
          <div className="mt-3 flex flex-wrap items-end gap-4">
            <p className="text-[54px] leading-none font-black tracking-[-0.02em]">{totalRate}%</p>
            <p className="mb-2 text-lg font-black text-white/90">정상 관리 구간</p>
          </div>

          <div className="mt-6 border-t border-white/20 pt-5">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-sm font-bold text-white/75">점검 항목</p>
                <b className="mt-1.5 block text-xl font-black">8개</b>
              </div>
              <div>
                <p className="text-sm font-bold text-white/75">이행 확인</p>
                <b className="mt-1.5 block text-xl font-black">{totalActual.toLocaleString()} / {totalTarget.toLocaleString()}</b>
              </div>
              <div>
                <p className="text-sm font-bold text-white/75">증빙 연결</p>
                <b className="mt-1.5 block text-xl font-black">{totalEvidence.toLocaleString()}건</b>
                <p className="mt-1 text-xs font-bold text-white/70">안전카드 {totalCards}개</p>
              </div>
            </div>
          </div>
        </div>

        <FilterBar mode={mode} setMode={setMode} year={year} setYear={setYear} half={half} setHalf={setHalf} month={month} setMonth={setMonth} period={period} />
      </div>

    </section>
  );
}

function DutyCards({ dutyStats }: { dutyStats: Array<LegalDuty & { cards: Array<SafetyCard & { target: number; actual: number; rate: number; status: DutyStatus }>; target: number; actual: number; evidence: number; rate: number; status: DutyStatus }> }) {
  return (
    <section id="legal-duty-status" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black tracking-[0.14em] text-[#00a099]">SECTION 3</p>
          <h2 className="mt-1 text-xl font-black text-slate-900">책임자 안전보건 확보 의무 현황</h2>
          <p className="mt-1 text-sm text-slate-500">8개 법정 이행 항목에 대한 안전카드 문서와 수행 기록을 자동 집계합니다.</p>
        </div>
      </div>
      <div className="space-y-3">
        {dutyStats.map((duty) => (
          <article key={duty.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.08fr)]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-sm font-black text-slate-600">{duty.number}</span>
                  <h3 className="min-w-0 flex-1 text-base font-black text-slate-900">{duty.shortTitle}</h3>
                  {duty.safeBuddy && <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-black text-[#008d86] ring-1 ring-teal-100">세이프버디 제공</span>}
                  <StatusBadge status={duty.status} />
                </div>
                <p className="mt-2 pl-10 text-sm text-slate-500">{duty.title}</p>
                <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-bold text-slate-400">안전 경영체계(Governance) 이행</p>
                    <b className="text-sm font-black text-slate-800">{duty.governanceItems.length}건</b>
                  </div>
                  {duty.governanceItems.length > 0 ? (
                    <div className="mt-3 grid gap-1.5">
                      {duty.governanceItems.map((item) => (
                        <div key={item} className="flex items-start gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-600 ring-1 ring-slate-100">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00a099]" />
                          <span className="leading-4">{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-400 ring-1 ring-slate-100">추가 관리 필드 없음</p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-black text-slate-500">달성률</p>
                  <b className="text-xl font-black text-[#008d86]">{duty.rate}%</b>
                </div>
                <div className="mt-2 h-2.5 rounded-full bg-slate-100"><div className="h-2.5 rounded-full bg-[#00b7af]" style={{ width: `${duty.rate}%` }} /></div>
                <div className="mt-4 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-black text-slate-700">
                  <span>연결 안전카드 {duty.cards.length}개 · 증빙 {duty.evidence.toLocaleString()}건</span>
                  <span className="text-xs text-slate-400">전체 표시</span>
                </div>
                <div className="mt-2 grid gap-2 lg:grid-cols-2">
                  {duty.cards.map((card) => {
                    const policy = getCyclePolicy(card);
                    const isOnDemand = card.cycleType === "ON_DEMAND";
                    return (
                      <div key={card.id} className="min-w-0 rounded-lg bg-white px-3 py-2.5 text-xs ring-1 ring-slate-100">
                        <p className="truncate font-black text-slate-800" title={card.name}>{card.name}</p>
                        <div className="mt-1.5 flex min-w-0 items-center gap-2">
                          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black text-slate-500">{policy.label}</span>
                          <span className="min-w-0 flex-1 truncate text-[11px] font-bold text-slate-500">{isOnDemand ? `누적 ${card.actual.toLocaleString()}건` : `실적 ${card.actual.toLocaleString()}건 / 목표 ${card.target.toLocaleString()}건`}</span>
                          <div className="h-1.5 w-14 shrink-0 rounded-full bg-slate-100">
                            <div className={`h-1.5 rounded-full ${progressClass(card.status)}`} style={{ width: `${card.rate}%` }} />
                          </div>
                          <span className="w-8 shrink-0 text-right font-black text-[#008d86]">{card.rate}%</span>
                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ${miniStatusClass(card.status)}`}>{card.status === "해당없음" ? "목표없음" : card.status}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SafetyCardTable({ rows }: { rows: Array<SafetyCard & { duty: LegalDuty; target: number; actual: number; rate: number; status: DutyStatus }> }) {
  return (
    <section id="safety-card-detail" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black tracking-[0.14em] text-[#00a099]">SECTION 4</p>
          <h2 className="mt-1 text-xl font-black text-slate-900">안전카드별 세부추진 목표 / 현황</h2>
          <p className="mt-1 text-sm text-slate-500">세이프버디 안전카드 목록을 법정 이행 항목에 연결해 목표와 실적을 확인합니다.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-[#00a099] px-4 py-2.5 text-sm font-black text-white">
          <IconFilePlus size={17} />안전카드 신규생성
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[1180px] w-full border-separate border-spacing-0 text-left">
          <thead>
            <tr className="text-xs text-slate-500">
              {["책임자 안전보건 확보 의무 현황", "문서명(안전카드)", "목표주기", "실적", "달성률", "상태", "작성"].map((head) => (
                <th key={head} className="border-b border-slate-200 bg-slate-50 px-4 py-3 font-black first:rounded-l-xl last:rounded-r-xl">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="group">
                <td className="border-b border-slate-100 px-4 py-3 align-top">
                  <p className="text-xs font-black text-[#00a099]">{row.duty.number} {row.duty.shortTitle}</p>
                  <p className="mt-1 text-[11px] font-bold text-slate-400">{row.category}</p>
                </td>
                <td className="border-b border-slate-100 px-4 py-3 align-top text-sm font-black text-slate-800">{row.name}</td>
                <td className="border-b border-slate-100 px-4 py-3 align-top"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{getCyclePolicy(row).label}</span></td>
                <td className="border-b border-slate-100 px-4 py-3 align-top text-sm font-black text-slate-800">{row.actual.toLocaleString()}건</td>
                <td className="border-b border-slate-100 px-4 py-3 align-top">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-[#00b7af]" style={{ width: `${row.rate}%` }} /></div>
                    <b className="text-xs text-slate-700">{row.rate}%</b>
                  </div>
                </td>
                <td className="border-b border-slate-100 px-4 py-3 align-top"><StatusBadge status={row.status} /></td>
                <td className="border-b border-slate-100 px-4 py-3 align-top">
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-black text-[#008d86]">
                    작성
                    <IconChevronRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function HalfYearInspectionPage() {
  const [mode, setMode] = useState<PeriodMode>("HALF");
  const [year, setYear] = useState(2024);
  const [half, setHalf] = useState<"H1" | "H2">("H1");
  const [month, setMonth] = useState(6);
  const period = useMemo(() => getPeriod(mode, year, half, month), [mode, year, half, month]);

  const rows = useMemo(() => safetyCards.map((card) => {
    const target = getTarget(card, period);
    const actual = getActual(card, period);
    const rate = getRate(actual, target);
    return { ...card, duty: legalDuties.find((duty) => duty.id === card.dutyId) ?? legalDuties[0], target, actual, rate, status: getStatus(actual, target) };
  }), [period]);

  const dutyStats = useMemo(() => legalDuties.map((duty) => {
    const cards = rows.filter((row) => row.dutyId === duty.id);
    const target = cards.reduce((sum, card) => sum + card.target, 0);
    const actual = cards.reduce((sum, card) => sum + card.actual, 0);
    const evidence = cards.reduce((sum, card) => sum + Math.min(card.evidence, card.actual || card.evidence), 0);
    const rate = getRate(actual, target);
    return { ...duty, cards, target, actual, evidence, rate, status: getStatus(actual, target) };
  }), [rows]);

  const totalTarget = dutyStats.reduce((sum, duty) => sum + duty.target, 0);
  const totalActual = dutyStats.reduce((sum, duty) => sum + duty.actual, 0);
  const totalEvidence = dutyStats.reduce((sum, duty) => sum + duty.evidence, 0);
  const totalRate = getRate(totalActual, totalTarget);

  return (
    <div className="min-h-screen bg-[#f5f8f9] text-slate-900">
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur lg:px-8">
            <div className="mx-auto flex max-w-[1540px] items-center justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-xs font-black text-[#00a099]"><IconShieldCheck size={15} />중처법 이행현황</p>
                <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950">반기별 이행점검 데이터 대시보드</h1>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <button className="header-action-card">
                  <span className="header-action-icon"><IconClipboardCheck size={17} /></span>
                  <span>안전보건목표 및 세부추진계획</span>
                </button>
                <button className="header-action-card">
                  <span className="header-action-icon"><IconFilePlus size={17} /></span>
                  <span>안전보건목표 및 세부추진실적</span>
                </button>
                <button className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-black text-white">
                  <IconReportAnalytics size={17} />반기별 이행점검 보고서 만들기
                </button>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1540px] space-y-6 px-5 py-6 lg:px-8">
            <Overview totalRate={totalRate} totalActual={totalActual} totalTarget={totalTarget} totalEvidence={totalEvidence} totalCards={rows.length} mode={mode} setMode={setMode} year={year} setYear={setYear} half={half} setHalf={setHalf} month={month} setMonth={setMonth} period={period} />
            <DutyCards dutyStats={dutyStats} />
            <SafetyCardTable rows={rows} />
          </div>
        </main>
      </div>
      <style jsx global>{`
        .control-select {
          height: 40px;
          border: 1px solid #dbe6e8;
          border-radius: 10px;
          background: #fff;
          padding: 0 34px 0 12px;
          font-size: 13px;
          font-weight: 800;
          color: #334155;
          outline: none;
        }
        .control-select:focus {
          border-color: #00a099;
          box-shadow: 0 0 0 3px rgba(0, 183, 175, 0.12);
        }
        .segmented {
          display: inline-flex;
          gap: 4px;
          border: 1px solid #dbe6e8;
          border-radius: 12px;
          background: #f8fafc;
          padding: 4px;
        }
        .segmented button {
          height: 30px;
          border-radius: 8px;
          padding: 0 12px;
          font-size: 12px;
          font-weight: 900;
          color: #64748b;
        }
        .segmented button.active {
          background: #00a099;
          color: #fff;
          box-shadow: 0 6px 14px rgba(0, 160, 153, 0.22);
        }
        .header-action-card {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 42px;
          border: 1px solid #ccfbf1;
          border-radius: 12px;
          background: #f0fdfa;
          padding: 8px 11px;
          font-size: 12px;
          font-weight: 900;
          color: #007f78;
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
        }
        .header-action-card:hover {
          border-color: #5eead4;
          background: #ccfbf1;
        }
        .header-action-icon {
          display: grid;
          height: 26px;
          width: 26px;
          place-items: center;
          border-radius: 9px;
          background: #ffffff;
          color: #00a099;
        }
      `}</style>
    </div>
  );
}
