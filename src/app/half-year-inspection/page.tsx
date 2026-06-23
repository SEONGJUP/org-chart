"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import UnavailableModal from "../_components/UnavailableModal";
import {
  IconAlertTriangle,
  IconArrowRight,
  IconBell,
  IconBook2,
  IconBriefcase,
  IconBuilding,
  IconCheck,
  IconChevronRight,
  IconCircleCheck,
  IconClipboardCheck,
  IconCloudCheck,
  IconFileDescription,
  IconFilePlus,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconMapPin,
  IconMenu2,
  IconPencil,
  IconReportAnalytics,
  IconShieldCheck,
  IconSparkles,
  IconTargetArrow,
  IconUsers,
  IconX,
} from "@tabler/icons-react";

type ComplianceStatus = "정상" | "관리 필요" | "미이행" | "확인 필요";
type DataMethod = "AUTO" | "MANUAL" | "HYBRID";

type AggregationView = "MONTH" | "HALF" | "YEAR";
type MetricRule = {
  id: string;
  title: string;
  aggregation: "COUNT" | "CUMULATIVE";
  cycle: "MONTHLY" | "HALF_YEARLY" | "DAILY" | "BI_MONTHLY" | "YEARLY";
  match: "WITHIN" | "EXACT" | "CUMULATIVE";
  scheduledMonths?: number[];
  dayPolicy?: "ALL_DAYS" | "WORKDAYS";
};

// 목표 발생 규칙과 수행 기록 집계 규칙을 분리해 API 연동 시에도 동일하게 계산한다.
const metricRules: MetricRule[] = [
  { id: "monthly-count", title: "월 1회 이행 횟수", aggregation: "COUNT", cycle: "MONTHLY", match: "WITHIN" },
  { id: "cumulative", title: "기간 내 누적 발생 건수", aggregation: "CUMULATIVE", cycle: "MONTHLY", match: "CUMULATIVE" },
  { id: "half-required", title: "반기별 필수 이행", aggregation: "COUNT", cycle: "HALF_YEARLY", match: "EXACT", scheduledMonths: [6, 12] },
  { id: "daily-workday", title: "매일 이행(주말 제외)", aggregation: "COUNT", cycle: "DAILY", match: "WITHIN", dayPolicy: "WORKDAYS" },
  { id: "bi-monthly", title: "격월 1회 이행", aggregation: "COUNT", cycle: "BI_MONTHLY", match: "EXACT", scheduledMonths: [2, 4, 6, 8, 10, 12] },
];

const itemMetricRules: Record<string, MetricRule> = {
  "management-policy": { id: "management-policy-rule", title: "경영방침·책임자", aggregation: "COUNT", cycle: "YEARLY", match: "EXACT", scheduledMonths: [1] },
  "goal-plan": { id: "goal-plan-rule", title: "안전보건 목표", aggregation: "COUNT", cycle: "YEARLY", match: "EXACT", scheduledMonths: [1] },
  "risk-assessment": { id: "risk-rule", title: "위험성평가", aggregation: "COUNT", cycle: "HALF_YEARLY", match: "EXACT", scheduledMonths: [6, 12] },
  education: { id: "education-rule", title: "법정 교육", aggregation: "COUNT", cycle: "MONTHLY", match: "WITHIN" },
  inspection: { id: "inspection-rule", title: "일일 점검", aggregation: "COUNT", cycle: "DAILY", match: "WITHIN", dayPolicy: "WORKDAYS" },
  emergency: { id: "emergency-rule", title: "비상·사고", aggregation: "CUMULATIVE", cycle: "MONTHLY", match: "CUMULATIVE" },
  "worker-participation": { id: "worker-rule", title: "근로자 참여", aggregation: "CUMULATIVE", cycle: "MONTHLY", match: "CUMULATIVE" },
  outsourcing: { id: "outsourcing-rule", title: "도급·용역", aggregation: "COUNT", cycle: "BI_MONTHLY", match: "EXACT", scheduledMonths: [2, 4, 6, 8, 10, 12] },
};

function calculateRuleTarget(rule: MetricRule, view: AggregationView, month: number) {
  if (rule.aggregation === "CUMULATIVE") return null;
  if (rule.cycle === "DAILY") return view === "MONTH" ? (rule.dayPolicy === "WORKDAYS" ? 22 : 30) : view === "HALF" ? (rule.dayPolicy === "WORKDAYS" ? 132 : 181) : (rule.dayPolicy === "WORKDAYS" ? 264 : 365);
  const months = view === "MONTH" ? [month] : view === "HALF" ? (month <= 6 ? [1, 2, 3, 4, 5, 6] : [7, 8, 9, 10, 11, 12]) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  if (rule.cycle === "MONTHLY") return months.length;
  if (rule.cycle === "YEARLY") return months.filter((value) => rule.scheduledMonths?.includes(value)).length;
  return months.filter((value) => rule.scheduledMonths?.includes(value)).length;
}

function MetricRuleSummary({ rule, target }: { rule: MetricRule; target: number | null }) {
  const cycleLabel = { MONTHLY: "월 1회", HALF_YEARLY: "반기 1회", DAILY: "매일", BI_MONTHLY: "격월 1회", YEARLY: "연 1회" };
  const matchLabel = { WITHIN: "기간 내 집계", EXACT: "예정월 일치", CUMULATIVE: "기간 누적" };
  return <div className="mt-2 ml-10 flex flex-wrap gap-1.5"><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">{rule.aggregation === "CUMULATIVE" ? "누적형" : "횟수형"}</span><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">{cycleLabel[rule.cycle]}{rule.dayPolicy ? " · 주말 제외" : ""}</span><span className="rounded-full bg-teal-50 px-2 py-1 text-[10px] font-bold text-teal-700">{matchLabel[rule.match]}</span><span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-slate-500">{target === null ? "기간 누적" : target === 0 ? "기간 외" : "이번 기간 목표 " + target + "회"}</span></div>;
}

type ComplianceItem = {
  id: string;
  area: string;
  legalBasis: string;
  title: string;
  description: string;
  autoValue: number;
  manualValue: number;
  target: number;
  method: DataMethod;
  evidence: number;
  owner: string;
  nextAction: string;
  updatedAt: string;
};

type SiteSummary = {
  name: string;
  region: string;
  type: string;
  manager: string;
  rate: number;
  complete: number;
  total: number;
  actionNeeded: number;
  missingEvidence: number;
  status: "정상" | "관리 필요" | "집중 관리";
};

const siteSummaries: SiteSummary[] = [
  { name: "마포 본사 신축현장", region: "서울 마포구", type: "건축", manager: "김현우", rate: 96, complete: 48, total: 50, actionNeeded: 1, missingEvidence: 1, status: "정상" },
  { name: "인천 물류센터 증축현장", region: "인천 서구", type: "건축", manager: "박지훈", rate: 91, complete: 41, total: 45, actionNeeded: 3, missingEvidence: 1, status: "관리 필요" },
  { name: "평택 산업단지 2공구", region: "경기 평택시", type: "토목", manager: "이서연", rate: 87, complete: 40, total: 46, actionNeeded: 4, missingEvidence: 2, status: "관리 필요" },
  { name: "판교 업무시설 리모델링", region: "경기 성남시", type: "건축", manager: "최민석", rate: 98, complete: 49, total: 50, actionNeeded: 0, missingEvidence: 1, status: "정상" },
  { name: "김포 데이터센터 현장", region: "경기 김포시", type: "플랜트", manager: "정유진", rate: 79, complete: 38, total: 48, actionNeeded: 7, missingEvidence: 3, status: "집중 관리" },
  { name: "대전 연구시설 공사", region: "대전 유성구", type: "건축", manager: "한도윤", rate: 94, complete: 44, total: 47, actionNeeded: 2, missingEvidence: 1, status: "정상" },
  { name: "세종 스마트시티 현장", region: "세종특별자치시", type: "토목", manager: "윤하늘", rate: 89, complete: 42, total: 47, actionNeeded: 3, missingEvidence: 2, status: "관리 필요" },
  { name: "부산 북항 재개발 1공구", region: "부산 동구", type: "토목", manager: "장민호", rate: 85, complete: 39, total: 46, actionNeeded: 5, missingEvidence: 2, status: "관리 필요" },
  { name: "울산 생산라인 증설현장", region: "울산 남구", type: "플랜트", manager: "신예은", rate: 97, complete: 48, total: 49, actionNeeded: 1, missingEvidence: 0, status: "정상" },
  { name: "광주 복합문화센터 현장", region: "광주 북구", type: "건축", manager: "오준혁", rate: 82, complete: 37, total: 45, actionNeeded: 6, missingEvidence: 2, status: "집중 관리" },
  { name: "창원 물류단지 조성공사", region: "경남 창원시", type: "토목", manager: "문지아", rate: 93, complete: 43, total: 46, actionNeeded: 2, missingEvidence: 1, status: "정상" },
  { name: "제주 리조트 개발현장", region: "제주 서귀포시", type: "건축", manager: "배성훈", rate: 88, complete: 39, total: 44, actionNeeded: 3, missingEvidence: 2, status: "관리 필요" },
];

type ActionCheckStatus = "완료" | "확인 필요" | "조치 필요";
type ActionCheck = {
  id: string;
  title: string;
  description: string;
  linkedCards: Array<{ name: string; count: number }>;
  autoEvidence: number;
  checked: boolean;
  owner: string;
  status: ActionCheckStatus;
  safeBuddy?: boolean;
};

const initialActionChecks: ActionCheck[] = [
  { id: "risk", title: "유해·위험요인 확인 및 개선", description: "위험성평가 누락, 개선조치 완료 및 재발 방지 이행 여부", linkedCards: [{ name: "위험성평가", count: 6 }, { name: "안전점검 조치사항", count: 12 }], autoEvidence: 18, checked: true, owner: "안전관리자", status: "완료" },
  { id: "officer", title: "안전보건관리책임자 등 업무수행", description: "안전보건관리책임자·관리감독자 등의 법정 업무 수행 평가", linkedCards: [{ name: "선임보고서", count: 1 }, { name: "관리감독자 교육", count: 3 }], autoEvidence: 4, checked: false, owner: "경영책임자", status: "확인 필요" },
  { id: "voice", title: "종사자 의견 수렴 및 개선", description: "근로자 신고·제안사항 수렴 및 개선방안 이행 여부", linkedCards: [{ name: "근로자 신고", count: 2 }, { name: "근로자 제안사항", count: 3 }], autoEvidence: 5, checked: true, owner: "안전관리자", status: "완료" },
  { id: "emergency", title: "중대산업재해 대비 매뉴얼 조치", description: "작업중지, 대피, 위험요인 제거, 구호 조치의 준비 및 훈련 여부", linkedCards: [{ name: "비상조치계획", count: 1 }, { name: "비상훈련 실시 보고서", count: 0 }], autoEvidence: 1, checked: false, owner: "관리감독자", status: "조치 필요" },
  { id: "contract", title: "도급·용역·위탁 안전보건 확보", description: "수급인 재해예방 능력, 기술, 비용, 공사기간 기준 이행 여부", linkedCards: [{ name: "협력업체평가", count: 2 }, { name: "작업계획서", count: 3 }], autoEvidence: 5, checked: false, owner: "관리감독자", status: "조치 필요" },
  { id: "law", title: "안전·보건 관계 법령 의무 이행", description: "법령 이행 점검과 미준수 항목에 대한 필요한 조치 여부", linkedCards: [{ name: "안전보건매뉴얼·계획서", count: 3 }, { name: "정기점검", count: 6 }], autoEvidence: 9, checked: true, owner: "안전관리자", status: "완료" },
  { id: "training", title: "의무 안전보건 교육 실시", description: "유해·위험 작업 관련 법정 교육 대상·실시·증빙의 충족 여부", linkedCards: [{ name: "TBM 교육", count: 9 }, { name: "정기 안전보건 교육", count: 6 }], autoEvidence: 15, checked: false, owner: "현장관리자", status: "확인 필요" },
  { id: "legal-duty", title: "안전보건 확보 의무 이행 여부", description: "중대재해처벌법 시행령 제4조·제5조 관련 안전보건 확보 의무의 전반적 이행 여부", linkedCards: [{ name: "안전보건 경영방침", count: 1 }, { name: "목표 및 추진계획", count: 2 }, { name: "이행점검", count: 21 }], autoEvidence: 24, checked: false, owner: "경영책임자", status: "확인 필요", safeBuddy: true },
];

const safetyCardAssignments: Record<string, Array<{ name: string; count: number }>> = {
  risk: [
    { name: "안전점검", count: 6 }, { name: "안전점검 조치사항", count: 12 }, { name: "일일 안전 보건점검", count: 132 },
    { name: "일일 안전 점검일지(체크리스트 사용)", count: 132 }, { name: "일일 안전 점검일지(위험성평가 연계)", count: 132 },
    { name: "노사 합동 안전점검", count: 2 }, { name: "합동 안전점검", count: 2 }, { name: "작업장 순회점검표(체크리스트 사용)", count: 6 },
    { name: "위험성평가", count: 2 }, { name: "위험성평가 중점관리", count: 6 },
  ],
  officer: [
    { name: "안전보건 경영방침", count: 1 }, { name: "안전보건 목표", count: 1 },
    { name: "안전보건 목표 및 추진 계획", count: 1 }, { name: "선임보고서", count: 1 },
  ],
  voice: [{ name: "근로자 신고", count: 2 }, { name: "근로자 제안사항", count: 3 }],
  emergency: [
    { name: "중대재해 발생", count: 0 }, { name: "비상조치계획 시나리오/매뉴얼", count: 1 }, { name: "비상훈련 실시 보고서", count: 0 },
  ],
  contract: [
    { name: "협력업체평가", count: 1 }, { name: "화기 작업계획서", count: 2 },
    { name: "차량계 건설기계/하역운반 및 중량물 취급 작업계획서", count: 2 }, { name: "작업계획서", count: 3 },
    { name: "작업허가서", count: 8 }, { name: "외주공사 일보", count: 6 },
  ],
  law: [
    { name: "안전보건매뉴얼·계획서", count: 1 }, { name: "안전보건협의체", count: 6 },
    { name: "노사협의체", count: 3 }, { name: "산업 안전 보건위원회", count: 3 },
  ],
  training: [
    { name: "TBM 교육", count: 6 }, { name: "일일 안전교육", count: 6 }, { name: "신규 채용자 교육", count: 0 },
    { name: "특별 안전보건 교육", count: 0 }, { name: "특수형태 근로종사자 교육", count: 0 }, { name: "작업 변경 시 교육", count: 0 },
    { name: "물질 안전보건 (MSDS) 교육", count: 1 }, { name: "정기 안전보건 교육 (관리감독자)", count: 2 },
    { name: "정기 안전보건 교육 (근로자)", count: 2 }, { name: "기타 교육", count: 0 }, { name: "작업자 안전교육", count: 6 },
  ],
  "legal-duty": [{ name: "중대재해처벌법 반기 이행점검", count: 1 }],
};

const integratedActionChecks = initialActionChecks.map((check) => {
  const linkedCards = safetyCardAssignments[check.id] ?? check.linkedCards;
  return { ...check, linkedCards, autoEvidence: linkedCards.reduce((sum, card) => sum + card.count, 0) };
});

function LinkedSafetyCards({ cards }: { cards: Array<{ name: string; count: number }> }) {
  const [expanded, setExpanded] = useState(false);
  return <span className="block"><button onClick={() => setExpanded((value) => !value)} className="flex w-full items-center justify-between rounded-md px-1 py-1 text-left text-teal-700 hover:bg-teal-50"><span className="font-bold">연결 안전카드 {cards.length}개</span><IconChevronRight size={15} className={`transition-transform ${expanded ? "rotate-90" : ""}`} /></button>{expanded && <span className="mt-1 block space-y-1.5 border-t border-slate-200 pt-2">{cards.map((card) => <span key={card.name} className="flex items-center justify-between rounded-md bg-white px-2 py-1.5 text-slate-700"><span className="font-semibold">{card.name}</span><span className="text-teal-700">이행 <b>{card.count}회</b></span></span>)}</span>}</span>;
}

const initialItems: ComplianceItem[] = [
  {
    id: "management-policy",
    area: "안전보건 경영체계",
    legalBasis: "경영책임자 등의 안전 및 보건 확보 의무",
    title: "안전보건 경영방침 및 조직 운영",
    description: "경영방침, 책임자 선임, 안전보건 전담조직 운영 현황",
    autoValue: 3,
    manualValue: 1,
    target: 4,
    method: "HYBRID",
    evidence: 4,
    owner: "안전관리자",
    nextAction: "조직도 최신화 확인",
    updatedAt: "오늘 09:24",
  },
  {
    id: "goal-plan",
    area: "안전보건 목표",
    legalBasis: "안전보건 목표 및 세부 추진계획 수립",
    title: "안전보건목표 및 세부추진계획",
    description: "연간 목표, 실행 항목, 담당자 및 예산 배정 현황",
    autoValue: 2,
    manualValue: 0,
    target: 3,
    method: "HYBRID",
    evidence: 2,
    owner: "안전관리자",
    nextAction: "세부 추진계획 실적 등록",
    updatedAt: "어제 16:10",
  },
  {
    id: "risk-assessment",
    area: "유해·위험요인 관리",
    legalBasis: "유해·위험요인 확인·개선 절차 마련",
    title: "위험성평가 및 개선조치",
    description: "위험성평가, 개선조치, 작업 전 점검의 자동 집계 결과",
    autoValue: 18,
    manualValue: 0,
    target: 18,
    method: "AUTO",
    evidence: 18,
    owner: "현장관리자",
    nextAction: "정상 운영 중",
    updatedAt: "오늘 10:06",
  },
  {
    id: "education",
    area: "안전보건 교육",
    legalBasis: "종사자 안전보건 교육 실시",
    title: "정기교육 및 TBM 이행",
    description: "교육관리·안전카드에서 연동된 대상자 및 교육 이력",
    autoValue: 14,
    manualValue: 1,
    target: 16,
    method: "HYBRID",
    evidence: 13,
    owner: "현장관리자",
    nextAction: "관리감독자 교육 증빙 보완",
    updatedAt: "오늘 08:40",
  },
  {
    id: "inspection",
    area: "점검 및 개선",
    legalBasis: "안전보건 관계 법령 이행 여부 점검",
    title: "정기점검 및 조치사항 관리",
    description: "현장 점검표와 개선조치 완료 기록의 통합 현황",
    autoValue: 9,
    manualValue: 0,
    target: 10,
    method: "AUTO",
    evidence: 9,
    owner: "안전관리자",
    nextAction: "미조치 1건 확인",
    updatedAt: "오늘 09:55",
  },
  {
    id: "emergency",
    area: "비상대응 및 사고관리",
    legalBasis: "재해 발생 시 재발방지 대책 수립 및 이행",
    title: "비상조치계획 및 훈련",
    description: "비상 시나리오, 훈련 결과, 사고 대응 문서 관리",
    autoValue: 1,
    manualValue: 0,
    target: 2,
    method: "MANUAL",
    evidence: 1,
    owner: "관리감독자",
    nextAction: "비상훈련 결과 문서 등록",
    updatedAt: "3일 전",
  },
  {
    id: "worker-participation",
    area: "근로자 참여",
    legalBasis: "종사자 의견 청취 및 개선 절차 운영",
    title: "근로자 의견·신고 처리",
    description: "신고, 제안, 협의체 논의 및 처리 결과",
    autoValue: 4,
    manualValue: 0,
    target: 4,
    method: "AUTO",
    evidence: 4,
    owner: "안전관리자",
    nextAction: "정상 운영 중",
    updatedAt: "어제 13:30",
  },
  {
    id: "outsourcing",
    area: "도급·용역 관리",
    legalBasis: "도급·용역·위탁 시 안전보건 확보",
    title: "협력업체 안전보건 관리",
    description: "협력업체 평가, 작업계획서, 현장 안전관리 현황",
    autoValue: 5,
    manualValue: 0,
    target: 6,
    method: "HYBRID",
    evidence: 5,
    owner: "관리감독자",
    nextAction: "협력업체 평가서 등록",
    updatedAt: "어제 15:12",
  },
];

const statusStyle: Record<ComplianceStatus, string> = {
  정상: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  "관리 필요": "bg-amber-50 text-amber-700 ring-amber-100",
  미이행: "bg-rose-50 text-rose-700 ring-rose-100",
  "확인 필요": "bg-violet-50 text-violet-700 ring-violet-100",
};

const methodStyle: Record<DataMethod, { label: string; className: string }> = {
  AUTO: { label: "자동 연동", className: "bg-blue-50 text-blue-700" },
  MANUAL: { label: "수동 관리", className: "bg-slate-100 text-slate-700" },
  HYBRID: { label: "자동 + 수동", className: "bg-teal-50 text-teal-700" },
};

function getRate(item: ComplianceItem) {
  return Math.min(100, Math.round(((item.autoValue + item.manualValue) / item.target) * 100));
}

function getStatus(item: ComplianceItem): ComplianceStatus {
  const total = item.autoValue + item.manualValue;
  if (item.evidence < total) return "확인 필요";
  if (total === 0) return "미이행";
  if (total < item.target) return "관리 필요";
  return "정상";
}

function StatusBadge({ status }: { status: ComplianceStatus }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${statusStyle[status]}`}>{status}</span>;
}

function SourceBadge({ method }: { method: DataMethod }) {
  const style = methodStyle[method];
  return <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold ${style.className}`}><IconCloudCheck size={13} />{style.label}</span>;
}

function Progress({ value, color = "bg-teal-500" }: { value: number; color?: string }) {
  return <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(value, 100)}%` }} /></div>;
}

function Sidebar({ onUnavailable }: { onUnavailable: (title: string) => void }) {
  const menus = [
    [IconLayoutDashboard, "대시보드"],
    [IconShieldCheck, "중처법 이행 현황"],
    [IconClipboardCheck, "안전카드 관리"],
    [IconAlertTriangle, "위험성평가"],
    [IconBook2, "안전보건 교육"],
    [IconBriefcase, "작업허가·계획"],
    [IconReportAnalytics, "보고서"],
  ] as const;
  return (
    <aside className="sticky top-0 hidden h-screen w-[248px] flex-none border-r border-slate-200 bg-white px-4 py-5 xl:block">
      <div className="flex items-center gap-3 px-2">
        <img src="/logos/safe_buddy_logo.png" alt="SafeBuddy" className="h-10 w-[132px] object-contain object-left" />
      </div>
      <nav className="mt-10 space-y-1">
        {menus.map(([Icon, label]) => {
          const active = label === "중처법 이행 현황";
          return <button key={label} onClick={() => !active && onUnavailable(label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition ${active ? "bg-teal-50 text-teal-800" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}><Icon size={19} stroke={active ? 2.4 : 1.8} />{label}</button>;
        })}
      </nav>
      <div className="mt-8 border-t border-slate-100 pt-5">
        <p className="px-3 text-[10px] font-black tracking-wider text-slate-400">WORKSPACE</p>
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3"><div className="grid h-8 w-8 place-items-center rounded-lg bg-white text-teal-700 shadow-sm"><IconBuilding size={16} /></div><div className="min-w-0"><p className="truncate text-xs font-black text-slate-700">(주)세이프건설</p><p className="text-[11px] text-slate-400">관리자</p></div></div>
      </div>
    </aside>
  );
}

function Header({ onCreate, onMenu, onUnavailable }: { onCreate: (kind: "report" | "goal" | "result") => void; onMenu: () => void; onUnavailable: (title: string) => void }) {
  return <>
    <header className="flex flex-col gap-5 border-b border-slate-200 bg-white px-5 py-5 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex min-w-0 items-start gap-3"><button onClick={onMenu} className="mt-1 rounded-lg p-2 text-slate-500 hover:bg-slate-100 xl:hidden" aria-label="메뉴 열기"><IconMenu2 size={21} /></button><div><div className="flex items-center gap-2 text-xs font-bold text-slate-400"><span>안전관리</span><IconChevronRight size={14} /><span className="text-teal-700">중처법 이행 현황</span></div><h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">중대재해처벌법 이행 현황</h1><p className="mt-1 text-sm text-slate-500">자동 연동과 수동 관리 데이터를 통합하여 안전관리체계의 이행 상태를 모니터링합니다.</p></div></div>
      <div className="flex flex-wrap items-center gap-2"><button onClick={() => onUnavailable("알림")} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50" aria-label="알림"><IconBell size={19} /></button><button onClick={() => onUnavailable("도움말")} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50" aria-label="도움말"><IconHelp size={19} /></button><div className="hidden h-8 w-px bg-slate-200 sm:block" /><Link href="/site-performance" className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-bold text-teal-800 hover:bg-teal-100"><IconBuilding size={18} />현장별 현황</Link><button onClick={() => onCreate("report")} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-slate-800"><IconFileDescription size={18} />반기별 이행점검 보고서</button></div>
    </header>
    <section className="grid gap-2 border-b border-slate-200 bg-white px-5 py-3 lg:grid-cols-2 lg:px-8"><div className="flex items-center gap-2 text-xs text-slate-500"><span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />데이터 동기화 완료 <b className="font-semibold text-slate-700">오늘 10:06</b></div><div className="flex flex-wrap items-center gap-2 lg:justify-end"><button onClick={() => onCreate("goal")} className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-800"><IconTargetArrow size={15} />안전보건목표·추진계획 만들기</button><button onClick={() => onCreate("result")} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700"><IconFilePlus size={15} />목표 실적 문서 만들기</button></div></section>
  </>;
}

function Overview({ items }: { items: ComplianceItem[] }) {
  const stats = useMemo(() => {
    const totals = items.reduce((acc, item) => ({ target: acc.target + item.target, actual: acc.actual + item.autoValue + item.manualValue, auto: acc.auto + item.autoValue, manual: acc.manual + item.manualValue, evidence: acc.evidence + item.evidence }), { target: 0, actual: 0, auto: 0, manual: 0, evidence: 0 });
    const status = items.reduce((acc, item) => { acc[getStatus(item)] += 1; return acc; }, { 정상: 0, "관리 필요": 0, 미이행: 0, "확인 필요": 0 } as Record<ComplianceStatus, number>);
    return { ...totals, ...status, rate: Math.round((totals.actual / totals.target) * 100) };
  }, [items]);
  return <section className="grid gap-4 xl:grid-cols-[1.38fr_1fr]">
    <div className="overflow-hidden rounded-2xl bg-[#00B7AF] text-white shadow-sm">
      <div className="relative p-6 sm:p-7"><div className="absolute right-[-40px] top-[-40px] h-44 w-44 rounded-full border-[24px] border-white/10" /><div className="absolute bottom-[-64px] right-24 h-32 w-32 rounded-full border-[18px] border-emerald-300/20" /><div className="relative"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-bold text-teal-100">안전관리체계 종합 이행률</p><div className="mt-2 flex items-end gap-2"><strong className="text-5xl font-black tracking-tight">{stats.rate}%</strong><span className="mb-1 text-sm font-bold text-teal-100">정상 관리 구간</span></div></div><div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15"><IconShieldCheck size={30} /></div></div><div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/15 pt-5 text-sm"><div><p className="text-teal-100">점검 항목</p><b className="mt-1 block text-lg">{items.length}개</b></div><div><p className="text-teal-100">이행 확인</p><b className="mt-1 block text-lg">{stats.actual} / {stats.target}</b></div><div><p className="text-teal-100">증빙 연결</p><b className="mt-1 block text-lg">{stats.evidence}건</b></div></div></div></div>
    </div>
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-start justify-between"><div><p className="text-sm font-black text-slate-900">통합 데이터 현황</p><p className="mt-1 text-xs leading-5 text-slate-500">안전카드에서 자동으로 수집되는 데이터와 담당자가 직접 관리하는 이행 데이터를 함께 반영합니다.</p></div><IconSparkles size={21} className="text-teal-600" /></div><div className="mt-6 space-y-4"><div><div className="mb-2 flex justify-between text-sm"><span className="font-bold text-slate-600">자동 연동 데이터</span><b className="text-blue-700">{stats.auto}건</b></div><Progress value={(stats.auto / stats.target) * 100} color="bg-blue-500" /></div><div><div className="mb-2 flex justify-between text-sm"><span className="font-bold text-slate-600">수동 관리 데이터</span><b className="text-teal-700">{stats.manual}건</b></div><Progress value={(stats.manual / stats.target) * 100} color="bg-teal-500" /></div></div><div className="mt-6 flex gap-2"><span className="flex-1 rounded-lg bg-emerald-50 px-3 py-2 text-center text-xs font-bold text-emerald-700">정상 {stats.정상}</span><span className="flex-1 rounded-lg bg-amber-50 px-3 py-2 text-center text-xs font-bold text-amber-700">관리 {stats["관리 필요"]}</span><span className="flex-1 rounded-lg bg-violet-50 px-3 py-2 text-center text-xs font-bold text-violet-700">확인 {stats["확인 필요"]}</span></div></div>
  </section>;
}

function ActionCenter({ items, onOpen }: { items: ComplianceItem[]; onOpen: (item: ComplianceItem) => void }) {
  const actions = items.filter((item) => getStatus(item) !== "정상").sort((a, b) => getRate(a) - getRate(b));
  return <section className="rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="text-base font-black text-slate-900">우선 관리 항목</h2><p className="mt-1 text-xs text-slate-500">이행 상태 또는 증빙 확인이 필요한 항목입니다.</p></div><span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-black text-rose-700">{actions.length}건</span></div><div className="divide-y divide-slate-100">{actions.map((item) => <button key={item.id} onClick={() => onOpen(item)} className="flex w-full items-center gap-3 px-5 py-3.5 text-left hover:bg-slate-50"><div className={`grid h-9 w-9 flex-none place-items-center rounded-xl ${getStatus(item) === "확인 필요" ? "bg-violet-50 text-violet-600" : "bg-amber-50 text-amber-600"}`}><IconAlertTriangle size={18} /></div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="truncate text-sm font-bold text-slate-800">{item.title}</p><StatusBadge status={getStatus(item)} /></div><p className="mt-1 truncate text-xs text-slate-500">{item.nextAction}</p></div><IconChevronRight size={18} className="flex-none text-slate-300" /></button>)}{actions.length === 0 && <div className="px-5 py-8 text-center text-sm font-semibold text-slate-400">현재 우선 관리가 필요한 항목이 없습니다.</div>}</div></section>;
}

function LegalSystemMap({ items, onOpen }: { items: ComplianceItem[]; onOpen: (item: ComplianceItem) => void }) {
  return <section className="rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="text-base font-black text-slate-900">안전카드 기반 문서·기록</h2><p className="mt-1 text-xs text-slate-500">교육·점검·위험성평가 등 기존 안전카드의 문서와 수행 기록을 자동 집계합니다.</p></div><button className="text-xs font-bold text-teal-700">전체 보기</button></div><div className="grid divide-y divide-slate-100 md:grid-cols-2 md:divide-x md:divide-y-0">{items.map((item) => <button key={item.id} onClick={() => onOpen(item)} className="group p-5 text-left hover:bg-slate-50"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-[11px] font-black tracking-wide text-teal-700">{item.area}</p><h3 className="mt-1 truncate text-sm font-black text-slate-800">{item.title}</h3></div><StatusBadge status={getStatus(item)} /></div><p className="mt-3 h-9 text-xs leading-4 text-slate-500">{item.description}</p><div className="mt-4"><div className="mb-2 flex items-center justify-between text-xs"><SourceBadge method={item.method} /><b className="text-slate-700">{item.autoValue + item.manualValue} / {item.target}</b></div><Progress value={getRate(item)} color={getStatus(item) === "정상" ? "bg-emerald-500" : getStatus(item) === "확인 필요" ? "bg-violet-500" : "bg-amber-500"} /></div><div className="mt-3 flex items-center justify-between text-[11px] text-slate-400"><span>증빙 {item.evidence}건 · {item.owner}</span><span className="inline-flex items-center gap-0.5 font-bold text-teal-700 opacity-0 transition group-hover:opacity-100">관리 <IconArrowRight size={13} /></span></div></button>)}</div></section>;
}

function HalfYearActionChecks({ checks, onConfirm }: { checks: ActionCheck[]; onConfirm: (id: string) => void }) {
  const [year, setYear] = useState("2024");
  const [half, setHalf] = useState<"H1" | "H2">("H1");
  const [month, setMonth] = useState("전체");
  const halfStart = half === "H1" ? "01" : "07";
  const halfEnd = half === "H1" ? "06" : "12";
  const monthLastDay = month === "전체" ? "" : String(new Date(Number(year), Number(month), 0).getDate()).padStart(2, "0");
  const periodLabel = month === "전체"
    ? `${year}년 ${halfStart}월 01일 ~ ${year}년 ${halfEnd}월 ${half === "H1" ? "30" : "31"}일`
    : `${year}년 ${month.padStart(2, "0")}월 01일 ~ ${year}년 ${month.padStart(2, "0")}월 ${monthLastDay}일`;
  const statusClass: Record<ActionCheckStatus, string> = { 완료: "bg-emerald-50 text-emerald-700", "확인 필요": "bg-violet-50 text-violet-700", "조치 필요": "bg-rose-50 text-rose-700" };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
      <div className="flex flex-col gap-5 border-b border-slate-100 pb-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-teal-700"><IconClipboardCheck size={16} />상시 모니터링</div>
          <h2 className="mt-2 text-xl font-black text-slate-900">경영책임자 안전보건 확보 의무 현황</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">현재 시점의 8개 행위 이행 항목을 관리합니다. 반기별 공식 평가는 선택한 기간을 기준으로 별도 보고서에서 집계합니다.</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-[112px_150px_110px]">
          <select value={year} onChange={(event) => setYear(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 outline-none focus:border-teal-500">
            <option value="2024">2024년</option><option value="2025">2025년</option><option value="2026">2026년</option>
          </select>
          <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button onClick={() => setHalf("H1")} className={`flex-1 rounded-md px-3 text-xs font-bold ${half === "H1" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500"}`}>상반기</button>
            <button onClick={() => setHalf("H2")} className={`flex-1 rounded-md px-3 text-xs font-bold ${half === "H2" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500"}`}>하반기</button>
          </div>
          <select value={month} onChange={(event) => setMonth(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 outline-none focus:border-teal-500">
            <option value="전체">월 전체</option>{Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={String(index + 1)}>{index + 1}월</option>)}
          </select>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-teal-50 px-3 py-2 text-xs text-teal-900"><IconReportAnalytics size={15} className="text-teal-700" /><b>적용 기간</b><span>{periodLabel}</span></div>
      <div className="mt-5 space-y-3">
        {checks.map((check, index) => {
          const achievement = check.checked ? 100 : check.status === "확인 필요" ? 75 : 50;
          return <article key={check.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-teal-200">
            <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-sm font-black text-slate-600">{index + 1}</span><h3 className="text-base font-black text-slate-900">{check.title}</h3><span className={`rounded-full px-2 py-1 text-[11px] font-bold ${statusClass[check.status]}`}>{check.status}</span>{check.safeBuddy && <span className="rounded-full bg-teal-700 px-2 py-1 text-[10px] font-black text-white">SafeBuddy</span>}</div>
                <p className="mt-2 pl-10 text-sm text-slate-500">{check.description}</p>
              </div>
              <div className="w-full rounded-lg bg-slate-50 p-3 lg:w-[290px]">
                <div className="mb-2 flex items-center justify-between"><span className="rounded-md bg-white px-2 py-1 text-xs font-black text-slate-600 shadow-sm">달성률</span><b className="text-lg font-black text-teal-700">{achievement}%</b></div>
                <Progress value={achievement} color={achievement === 100 ? "bg-teal-500" : achievement >= 70 ? "bg-amber-400" : "bg-rose-500"} />
              </div>
            </div>
            <div className="grid border-t border-slate-100 lg:grid-cols-2">
              <div className="flex items-center justify-between gap-3 bg-slate-50/70 px-5 py-4"><div><p className="text-[11px] font-bold text-slate-400">안전 경영체계(Governance) 이행</p><b className="mt-1 block text-sm text-slate-800">{check.linkedCards.length}건</b></div><button onClick={() => !check.checked && onConfirm(check.id)} className={`rounded-lg px-3 py-2 text-xs font-bold ${check.checked ? "bg-emerald-50 text-emerald-700" : "bg-slate-900 text-white hover:bg-slate-800"}`}>{check.checked ? "현재 확인" : "상태 확인"}</button></div>
              <div className="border-t border-slate-100 px-5 py-4 lg:border-l lg:border-t-0"><div className="flex items-center justify-between gap-3"><div><p className="text-[11px] font-bold text-slate-400">연결 안전카드</p><p className="mt-1 text-sm font-black text-teal-700">{check.linkedCards.length}개 <span className="font-medium text-slate-400">· 증빙 {check.autoEvidence}건</span></p></div><LinkedSafetyCards cards={check.linkedCards} /></div></div>
            </div>
          </article>;
        })}
      </div>
    </section>
  );
}

function GovernanceActionChecks({ checks, items, onConfirm }: { checks: ActionCheck[]; items: ComplianceItem[]; onConfirm: (id: string) => void }) {
  const [year, setYear] = useState("2024");
  const [half, setHalf] = useState<"H1" | "H2">("H1");
  const [month, setMonth] = useState("전체");
  const governanceMap: Record<string, string> = {
    risk: "risk-assessment",
    officer: "management-policy",
    voice: "worker-participation",
    emergency: "emergency",
    contract: "outsourcing",
    law: "inspection",
    training: "education",
    "legal-duty": "goal-plan",
  };
  const halfStart = half === "H1" ? "01" : "07";
  const halfEnd = half === "H1" ? "06" : "12";
  const lastDay = month === "전체" ? "" : String(new Date(Number(year), Number(month), 0).getDate()).padStart(2, "0");
  const periodLabel = month === "전체"
    ? year + "년 " + halfStart + "월 01일 ~ " + year + "년 " + halfEnd + "월 " + (half === "H1" ? "30" : "31") + "일"
    : year + "년 " + month.padStart(2, "0") + "월 01일 ~ " + year + "년 " + month.padStart(2, "0") + "월 " + lastDay + "일";
  const statusClass: Record<ActionCheckStatus, string> = { 완료: "bg-emerald-50 text-emerald-700", "확인 필요": "bg-violet-50 text-violet-700", "조치 필요": "bg-rose-50 text-rose-700" };

  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
    <div className="flex flex-col gap-5 border-b border-slate-100 pb-5 xl:flex-row xl:items-start xl:justify-between">
      <div>
        <div className="flex items-center gap-2 text-xs font-black text-teal-700"><IconClipboardCheck size={16} />상시 모니터링</div>
        <h2 className="mt-2 text-xl font-black text-slate-900">경영책임자 안전보건 확보 의무 현황</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">8개 법정 이행 항목별로 연결된 안전카드의 문서와 수행 기록을 자동 집계합니다.</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-[112px_150px_110px]">
        <select value={year} onChange={(event) => setYear(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 outline-none focus:border-teal-500"><option value="2024">2024년</option><option value="2025">2025년</option><option value="2026">2026년</option></select>
        <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1"><button onClick={() => setHalf("H1")} className={"flex-1 rounded-md px-3 text-xs font-bold " + (half === "H1" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500")}>상반기</button><button onClick={() => setHalf("H2")} className={"flex-1 rounded-md px-3 text-xs font-bold " + (half === "H2" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500")}>하반기</button></div>
        <select value={month} onChange={(event) => setMonth(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 outline-none focus:border-teal-500"><option value="전체">월 전체</option>{Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={String(index + 1)}>{index + 1}월</option>)}</select>
      </div>
    </div>
    <div className="mt-3 flex items-center gap-2 rounded-lg bg-teal-50 px-3 py-2 text-xs text-teal-900"><IconReportAnalytics size={15} className="text-teal-700" /><b>적용 기간</b><span>{periodLabel}</span></div>
    <div className="mt-5 space-y-3">{checks.map((check, index) => {
      const governanceItem = items.find((item) => item.id === governanceMap[check.id]);
      const rule = governanceItem ? (itemMetricRules[governanceItem.id] ?? metricRules[0]) : metricRules[0];
      const periodView: AggregationView = month === "\uC804\uCCB4" ? "HALF" : "MONTH";
      const periodTarget = calculateRuleTarget(rule, periodView, Number(month === "\uC804\uCCB4" ? (half === "H1" ? 6 : 12) : month));
      const baseActual = governanceItem ? governanceItem.autoValue + governanceItem.manualValue : 0;
      const actual = periodTarget === null ? baseActual : Math.min(baseActual, periodTarget);
      const target = periodTarget === null ? 0 : periodTarget;
      const rate = periodTarget === null ? 100 : target ? Math.min(100, Math.round(actual / target * 100)) : 0;
      return <article key={check.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-teal-200">
        <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-sm font-black text-slate-600">{index + 1}</span><h3 className="text-base font-black text-slate-900">{check.title}</h3><span className={"rounded-full px-2 py-1 text-[11px] font-bold " + statusClass[check.status]}>{check.status}</span>{check.safeBuddy && <span className="rounded-full bg-teal-700 px-2 py-1 text-[10px] font-black text-white">SafeBuddy</span>}</div><p className="mt-2 pl-10 text-sm text-slate-500">{check.description}</p><MetricRuleSummary rule={rule} target={periodTarget} /></div>
          <div className="w-full rounded-lg bg-slate-50 p-3 lg:w-[290px]"><div className="mb-2 flex items-center justify-between"><span className="rounded-md bg-white px-2 py-1 text-xs font-black text-slate-600 shadow-sm">달성률</span><b className="text-lg font-black text-teal-700">{rate}%</b></div><Progress value={rate} color={rate === 100 ? "bg-teal-500" : rate >= 70 ? "bg-amber-400" : "bg-rose-500"} /></div>
        </div>
        <div className="grid border-t border-slate-100 lg:grid-cols-2">
          <div className="bg-slate-50/70 px-5 py-4"><p className="text-[11px] font-bold text-slate-400">안전 경영체계(Governance) 이행</p><div className="mt-2 flex flex-wrap items-center justify-between gap-2"><div><b className="text-sm text-slate-800">{governanceItem?.title ?? "연결 기준 미설정"}</b><span className="ml-2 text-xs font-bold text-teal-700">{actual} / {target}건</span></div><button onClick={() => !check.checked && onConfirm(check.id)} className={"rounded-lg px-3 py-2 text-xs font-bold " + (check.checked ? "bg-emerald-50 text-emerald-700" : "bg-slate-900 text-white hover:bg-slate-800")}>{check.checked ? "현재 확인" : "상태 확인"}</button></div></div>
          <div className="border-t border-slate-100 px-5 py-4 lg:border-l lg:border-t-0"><div className="flex items-start justify-between gap-3"><div><p className="text-[11px] font-bold text-slate-400">연결 안전카드</p><p className="mt-1 text-sm font-black text-teal-700">{check.linkedCards.length}개 <span className="font-medium text-slate-400">· 증빙 {check.autoEvidence}건</span></p></div><LinkedSafetyCards cards={check.linkedCards} /></div></div>
        </div>
      </article>;
    })}</div>
  </section>;
}

function ActionCheckVisuals({ checks }: { checks: ActionCheck[] }) {
  const [view, setView] = useState<"rate" | "status" | "evidence" | "owner" | "priority">("rate");
  const completed = checks.filter((check) => check.checked).length;
  const attention = checks.filter((check) => check.status !== "완료");
  const owners = Array.from(new Set(checks.map((check) => check.owner))).map((owner) => ({ owner, total: checks.filter((check) => check.owner === owner).length, complete: checks.filter((check) => check.owner === owner && check.checked).length }));
  const visualOptions = [{ id: "rate", label: "달성률" }, { id: "status", label: "상태 분포" }, { id: "evidence", label: "증빙 현황" }, { id: "owner", label: "담당자별" }, { id: "priority", label: "우선 조치" }] as const;
  const maxEvidence = Math.max(...checks.map((check) => check.autoEvidence));
  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><div className="flex items-center gap-2 text-xs font-black text-teal-700"><IconReportAnalytics size={16} />8개 달성지표 시각화</div><h2 className="mt-2 text-xl font-black text-slate-900">현재 이행 현황 분석</h2><p className="mt-1 text-sm text-slate-500">원하는 관점 하나를 선택해 8개 지표의 달성 여부와 관리 상태를 비교합니다.</p></div><div className="flex flex-wrap gap-2">{visualOptions.map((option) => <button key={option.id} onClick={() => setView(option.id)} className={`rounded-lg px-3 py-2 text-xs font-bold ${view === option.id ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{option.label}</button>)}</div></div><div className="mt-6 min-h-[245px]">{view === "rate" && <div className="grid gap-3 md:grid-cols-2">{checks.map((check) => <div key={check.id} className="rounded-xl bg-slate-50 p-3"><div className="flex items-center justify-between gap-3 text-sm"><span className="truncate font-bold text-slate-700">{check.title}</span><b className={check.checked ? "text-emerald-700" : "text-amber-700"}>{check.checked ? "100%" : "0%"}</b></div><div className="mt-2"><Progress value={check.checked ? 100 : 0} color={check.checked ? "bg-emerald-500" : "bg-amber-400"} /></div></div>)}</div>}{view === "status" && <div className="grid items-center gap-8 md:grid-cols-[210px_1fr]"><div className="mx-auto grid h-44 w-44 place-items-center rounded-full" style={{ background: `conic-gradient(#10b981 0 ${completed * 12.5}%, #f59e0b ${completed * 12.5}% ${completed * 12.5 + checks.filter((check) => check.status === "확인 필요").length * 12.5}%, #f43f5e ${completed * 12.5 + checks.filter((check) => check.status === "확인 필요").length * 12.5}% 100%)` }}><div className="grid h-28 w-28 place-items-center rounded-full bg-white text-center"><b className="text-3xl font-black text-slate-900">{completed}/8</b><span className="text-xs font-bold text-slate-400">현재 확인</span></div></div><div className="space-y-3">{[["완료", checks.filter((check) => check.status === "완료").length, "bg-emerald-500"], ["확인 필요", checks.filter((check) => check.status === "확인 필요").length, "bg-amber-500"], ["조치 필요", checks.filter((check) => check.status === "조치 필요").length, "bg-rose-500"]].map(([label, value, color]) => <div key={label as string} className="flex items-center gap-3"><span className={`h-3 w-3 rounded-full ${color}`}></span><span className="w-20 text-sm font-bold text-slate-600">{label}</span><div className="flex-1"><Progress value={(value as number) / 8 * 100} color={color as string} /></div><b className="w-8 text-right text-sm text-slate-800">{value}</b></div>)}</div></div>}{view === "evidence" && <div className="space-y-3">{checks.map((check) => <div key={check.id} className="grid grid-cols-[minmax(0,1fr)_48px] items-center gap-4"><div><div className="mb-1 flex justify-between gap-3 text-xs"><span className="truncate font-bold text-slate-600">{check.title}</span><span className="text-slate-400">자동 수집</span></div><Progress value={check.autoEvidence / maxEvidence * 100} color="bg-blue-500" /></div><b className="text-right text-sm text-blue-700">{check.autoEvidence}건</b></div>)}</div>}{view === "owner" && <div className="grid gap-4 md:grid-cols-2">{owners.map((item) => <div key={item.owner} className="rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between"><b className="text-slate-800">{item.owner}</b><span className="text-xs font-bold text-slate-400">{item.complete}/{item.total} 확인</span></div><div className="mt-3"><Progress value={item.complete / item.total * 100} color="bg-teal-500" /></div></div>)}</div>}{view === "priority" && <div className="space-y-3">{attention.map((check) => <div key={check.id} className="flex items-center gap-4 rounded-xl border border-amber-100 bg-amber-50 p-4"><IconAlertTriangle className="flex-none text-amber-600" size={20} /><div className="min-w-0 flex-1"><b className="block truncate text-sm text-amber-950">{check.title}</b><span className="mt-1 block text-xs text-amber-800">{check.owner} 확인 필요 · 연결 안전카드 {check.linkedCards.map((card) => card.name + " " + card.count + "회").join(" · ")}</span></div><span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-amber-700">{check.status}</span></div>)}{attention.length === 0 && <div className="rounded-xl bg-emerald-50 p-6 text-center text-sm font-bold text-emerald-700">현재 우선 조치가 필요한 항목이 없습니다.</div>}</div>}</div></section>;
}

function SiteOverview() {
  const [statusFilter, setStatusFilter] = useState<"전체" | SiteSummary["status"]>("전체");
  const visibleSites = statusFilter === "전체" ? siteSummaries : siteSummaries.filter((site) => site.status === statusFilter);
  const averageRate = Math.round(visibleSites.reduce((sum, site) => sum + site.rate, 0) / visibleSites.length);
  const focusCount = visibleSites.filter((site) => site.status === "집중 관리").length;
  const actionCount = visibleSites.reduce((sum, site) => sum + site.actionNeeded, 0);
  const statusClass = (status: SiteSummary["status"]) => status === "정상" ? "bg-emerald-50 text-emerald-700" : status === "집중 관리" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700";

  return <section id="site-overview" className="scroll-mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
    <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div><div className="flex items-center gap-2 text-xs font-black text-teal-700"><IconMapPin size={15} />본사 통합 현황</div><h2 className="mt-2 text-xl font-black text-slate-900">현장별 이행 현황</h2><p className="mt-1 text-sm text-slate-500">안전카드 자동 집계와 현장 담당자의 수동 관리 데이터를 현장 단위로 통합해 비교합니다.</p></div>
      <div className="flex flex-wrap items-center gap-2"><span className="mr-1 text-xs font-bold text-slate-400">상태 필터</span>{(["전체", "정상", "관리 필요", "집중 관리"] as const).map((status) => <button key={status} onClick={() => setStatusFilter(status)} className={`rounded-lg px-3 py-2 text-xs font-bold ${statusFilter === status ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{status}</button>)}</div>
    </div>
    <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-teal-50 p-4"><p className="text-xs font-bold text-teal-700">표시 현장</p><b className="mt-1 block text-2xl font-black text-teal-900">{visibleSites.length}개</b></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold text-slate-500">평균 이행률</p><b className="mt-1 block text-2xl font-black text-slate-900">{averageRate}%</b></div><div className="rounded-xl bg-amber-50 p-4"><p className="text-xs font-bold text-amber-700">조치 필요 / 집중 관리</p><b className="mt-1 block text-2xl font-black text-amber-900">{actionCount}건 <span className="text-sm">/ {focusCount}개</span></b></div></div>
    <div className="mt-5 overflow-x-auto"><table className="min-w-[900px] w-full text-sm"><thead className="bg-slate-50 text-left text-xs font-bold text-slate-500"><tr><th className="px-4 py-3">현장</th><th className="px-4 py-3">공종 / 책임자</th><th className="px-4 py-3">이행 확인</th><th className="px-4 py-3">이행률</th><th className="px-4 py-3">조치 필요</th><th className="px-4 py-3">증빙 누락</th><th className="px-4 py-3">상태</th></tr></thead><tbody className="divide-y divide-slate-100">{visibleSites.map((site) => <tr key={site.name} className="hover:bg-slate-50"><td className="px-4 py-4"><p className="font-black text-slate-800">{site.name}</p><p className="mt-1 text-xs text-slate-400">{site.region}</p></td><td className="px-4 py-4"><p className="font-bold text-slate-700">{site.type}</p><p className="mt-1 text-xs text-slate-400">{site.manager}</p></td><td className="px-4 py-4 font-bold text-slate-700">{site.complete} / {site.total}</td><td className="px-4 py-4"><div className="flex items-center gap-2"><div className="w-20"><Progress value={site.rate} color={site.rate >= 93 ? "bg-emerald-500" : site.rate >= 85 ? "bg-amber-500" : "bg-rose-500"} /></div><b className="text-xs text-slate-700">{site.rate}%</b></div></td><td className="px-4 py-4 font-black text-amber-700">{site.actionNeeded}건</td><td className="px-4 py-4 font-black text-violet-700">{site.missingEvidence}건</td><td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusClass(site.status)}`}>{site.status}</span></td></tr>)}</tbody></table></div>
  </section>;
}

function MetricAggregationGuide() {
  const [view, setView] = useState<AggregationView>("HALF");
  const [month, setMonth] = useState(6);
  const viewLabel = view === "MONTH" ? month + "월" : view === "HALF" ? (month <= 6 ? "상반기" : "하반기") : "연간";
  const matchLabel = { WITHIN: "기간 내 집계", EXACT: "예정월 일치", CUMULATIVE: "기간 누적" };
  const cycleLabel = { MONTHLY: "월 1회", HALF_YEARLY: "반기 1회", DAILY: "매일", BI_MONTHLY: "격월 1회" };
  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
    <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div><div className="flex items-center gap-2 text-xs font-black text-teal-700"><IconTargetArrow size={16} />지표 집계 기준</div><h2 className="mt-2 text-xl font-black text-slate-900">기간과 지표 주기를 분리해 관리합니다</h2><p className="mt-1 text-sm leading-6 text-slate-500">목표가 발생하는 기간과 실제 수행 기록이 들어온 기간을 별도로 판정해, 기간 외 업무를 미완료로 오해하지 않도록 합니다.</p></div>
      <div className="flex flex-wrap gap-2"><div className="flex rounded-lg bg-slate-100 p-1">{([{ id: "MONTH", label: "월별" }, { id: "HALF", label: "반기별" }, { id: "YEAR", label: "연도별" }] as const).map((option) => <button key={option.id} onClick={() => setView(option.id)} className={"rounded-md px-3 py-2 text-xs font-bold " + (view === option.id ? "bg-white text-teal-700 shadow-sm" : "text-slate-500")}>{option.label}</button>)}</div>{view !== "YEAR" && <select value={month} onChange={(event) => setMonth(Number(event.target.value))} className="rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-700">{Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}월 기준</option>)}</select>}</div>
    </div>
    <div className="mt-4 grid gap-3 md:grid-cols-3"><div className="rounded-xl bg-teal-50 p-4"><p className="text-xs font-bold text-teal-700">1. 넓은 기간 조회</p><p className="mt-2 text-sm font-black text-slate-800">기간 내 기록을 모두 합산</p><p className="mt-1 text-xs leading-5 text-slate-500">월별 기록을 반기·연간으로 조회할 때 수행일 기준으로 누적합니다.</p></div><div className="rounded-xl bg-amber-50 p-4"><p className="text-xs font-bold text-amber-700">2. 예정월 일치</p><p className="mt-2 text-sm font-black text-slate-800">목표가 없는 달은 집계 제외</p><p className="mt-1 text-xs leading-5 text-slate-500">반기·격월 업무는 예정월이 조회 기간에 있을 때만 목표를 생성합니다.</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold text-slate-600">3. 기간 내 실적</p><p className="mt-2 text-sm font-black text-slate-800">수행일이 조회 기간에 포함</p><p className="mt-1 text-xs leading-5 text-slate-500">기록의 수행일 기준으로 실적을 합산하고, 누적형은 목표 없이 건수만 표시합니다.</p></div></div>
    <div className="mt-5 overflow-x-auto"><table className="min-w-[840px] w-full text-sm"><thead className="border-y border-slate-100 bg-slate-50 text-left text-xs font-bold text-slate-500"><tr><th className="px-4 py-3">지표 유형</th><th className="px-4 py-3">주기</th><th className="px-4 py-3">기간 판정</th><th className="px-4 py-3">{viewLabel} 목표</th><th className="px-4 py-3">대시보드 표시</th></tr></thead><tbody className="divide-y divide-slate-100">{metricRules.map((rule) => { const target = calculateRuleTarget(rule, view, month); return <tr key={rule.id}><td className="px-4 py-3 font-bold text-slate-800">{rule.title}</td><td className="px-4 py-3 text-slate-600">{cycleLabel[rule.cycle]}{rule.dayPolicy ? " · " + (rule.dayPolicy === "WORKDAYS" ? "주말 제외" : "주말 포함") : ""}</td><td className="px-4 py-3"><span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{matchLabel[rule.match]}</span></td><td className="px-4 py-3 font-black text-teal-700">{target === null ? "목표 없음" : target + "회"}</td><td className="px-4 py-3 text-xs text-slate-500">{target === 0 ? "해당 없음 · 미완료로 계산하지 않음" : rule.aggregation === "CUMULATIVE" ? "기간 내 누적 건수와 전년/전월 비교" : "실적 / 목표, 이행률, 상태"}</td></tr>; })}</tbody></table></div>
  </section>;
}

function DocumentFlow({ onCreate }: { onCreate: (kind: "report" | "goal" | "result") => void }) {
  const cards = [
    { kind: "report" as const, icon: IconReportAnalytics, title: "반기별 이행점검 보고서", text: "현재 통합 집계 데이터를 바탕으로 이행점검 보고서 초안을 만듭니다.", button: "보고서 만들기", color: "bg-slate-900" },
    { kind: "goal" as const, icon: IconTargetArrow, title: "안전보건목표 및 세부추진계획", text: "안전관리체계 이행 현황을 목표와 세부 실행 항목으로 연결합니다.", button: "추진계획 만들기", color: "bg-teal-700" },
    { kind: "result" as const, icon: IconFilePlus, title: "목표 실적 문서", text: "안전카드에 연결할 실적 문서의 기본 구조를 만듭니다.", button: "실적 문서 만들기", color: "bg-blue-700" },
  ];
  return <section><div className="mb-4 flex items-end justify-between"><div><h2 className="text-lg font-black text-slate-900">문서 작업</h2><p className="mt-1 text-sm text-slate-500">문서 작성과 증빙 관리 작업은 안전카드에서 이어서 진행합니다.</p></div><div className="hidden items-center gap-1 text-xs font-bold text-slate-400 lg:flex"><IconLock size={14} />대시보드는 집계 전용</div></div><div className="grid gap-4 lg:grid-cols-3">{cards.map(({ kind, icon: Icon, title, text, button, color }) => <div key={kind} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><div className={`grid h-11 w-11 place-items-center rounded-xl ${kind === "report" ? "bg-slate-100 text-slate-700" : kind === "goal" ? "bg-teal-50 text-teal-700" : "bg-blue-50 text-blue-700"}`}><Icon size={22} /></div><IconChevronRight size={18} className="text-slate-300" /></div><h3 className="mt-5 text-base font-black text-slate-900">{title}</h3><p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">{text}</p><button onClick={() => onCreate(kind)} className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white ${color}`}><IconFilePlus size={17} />{button}</button></div>)}</div></section>;
}

function DetailTable({ items, onOpen }: { items: ComplianceItem[]; onOpen: (item: ComplianceItem) => void }) {
  return <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-base font-black text-slate-900">법정 이행 데이터</h2><p className="mt-1 text-xs text-slate-500">자동 집계와 수동 입력값이 하나의 이행 항목에 합산됩니다.</p></div><button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700"><IconUsers size={15} />담당자별 보기</button></div><div className="overflow-x-auto"><table className="min-w-[940px] w-full text-sm"><thead className="bg-slate-50 text-left text-xs font-bold text-slate-500"><tr><th className="px-5 py-3">이행 영역</th><th className="px-4 py-3">관리 항목</th><th className="px-4 py-3">데이터 방식</th><th className="px-4 py-3">자동</th><th className="px-4 py-3">수동</th><th className="px-4 py-3">이행률</th><th className="px-4 py-3">증빙</th><th className="px-4 py-3">상태</th><th className="px-5 py-3 text-right">관리</th></tr></thead><tbody className="divide-y divide-slate-100">{items.map((item) => <tr key={item.id} className="hover:bg-slate-50"><td className="px-5 py-4 text-xs font-bold text-teal-700">{item.area}</td><td className="px-4 py-4"><p className="font-bold text-slate-800">{item.title}</p><p className="mt-1 text-xs text-slate-400">{item.owner} · {item.updatedAt}</p></td><td className="px-4 py-4"><SourceBadge method={item.method} /></td><td className="px-4 py-4 font-bold text-blue-700">{item.autoValue}</td><td className="px-4 py-4 font-bold text-teal-700">{item.manualValue}</td><td className="px-4 py-4"><div className="flex min-w-28 items-center gap-2"><div className="w-16"><Progress value={getRate(item)} color="bg-teal-500" /></div><b className="text-xs text-slate-700">{getRate(item)}%</b></div></td><td className="px-4 py-4 text-xs font-bold text-slate-600">{item.evidence}건</td><td className="px-4 py-4"><StatusBadge status={getStatus(item)} /></td><td className="px-5 py-4 text-right"><button onClick={() => onOpen(item)} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"><IconPencil size={14} />관리</button></td></tr>)}</tbody></table></div></section>;
}

function LegalExecutionTable({ items, onOpen }: { items: ComplianceItem[]; onOpen: (item: ComplianceItem) => void }) {
  const getSimpleStatus = (item: ComplianceItem) => {
    const actual = item.autoValue + item.manualValue;
    if (actual >= item.target) return "완료";
    if (actual === 0) return "미완료";
    return "";
  };
  return <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div><h2 className="text-base font-black text-slate-900">법정 이행 데이터</h2><p className="mt-1 text-xs text-slate-500">자동 집계와 수동 입력값이 하나의 이행 항목에 합산됩니다.</p></div>
      <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700"><IconUsers size={15} />담당자별 보기</button>
    </div>
    <div className="overflow-x-auto"><table className="min-w-[850px] w-full text-sm">
      <thead className="bg-slate-50 text-left text-xs font-bold text-slate-500"><tr><th className="px-5 py-3">이행 영역</th><th className="px-4 py-3">관리 항목</th><th className="px-4 py-3">목표</th><th className="px-4 py-3">실적</th><th className="px-4 py-3">이행률</th><th className="px-4 py-3">증빙</th><th className="px-4 py-3">상태</th><th className="px-5 py-3 text-right">관리</th></tr></thead>
      <tbody className="divide-y divide-slate-100">{items.map((item) => {
        const actual = item.autoValue + item.manualValue;
        const status = getSimpleStatus(item);
        return <tr key={item.id} className="hover:bg-slate-50"><td className="px-5 py-4 text-xs font-bold text-teal-700">{item.area}</td><td className="px-4 py-4"><p className="font-bold text-slate-800">{item.title}</p><p className="mt-1 text-xs text-slate-400">{item.owner} · {item.updatedAt}</p></td><td className="px-4 py-4 font-bold text-slate-700">{item.target}</td><td className="px-4 py-4 font-bold text-teal-700">{actual}</td><td className="px-4 py-4"><div className="flex min-w-28 items-center gap-2"><div className="w-16"><Progress value={getRate(item)} color="bg-teal-500" /></div><b className="text-xs text-slate-700">{getRate(item)}%</b></div></td><td className="px-4 py-4 text-xs font-bold text-slate-600">{item.evidence}건</td><td className="px-4 py-4 text-xs font-bold">{status === "완료" && <span className="text-emerald-700">완료</span>}{status === "미완료" && <span className="text-rose-700">미완료</span>}</td><td className="px-5 py-4 text-right"><button onClick={() => onOpen(item)} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"><IconPencil size={14} />관리</button></td></tr>;
      })}</tbody>
    </table></div>
  </section>;
}

// Mock 수행일: 실제 서비스에서는 safetyRecords.performedDate로 대체한다.
const latestPerformedMonth: Record<string, number> = {
  "management-policy": 1,
  "goal-plan": 6,
  "risk-assessment": 7,
  education: 6,
  inspection: 6,
  emergency: 5,
  "worker-participation": 6,
  outsourcing: 4,
};

function PeriodAwareLegalExecutionTable({ items, onOpen }: { items: ComplianceItem[]; onOpen: (item: ComplianceItem) => void }) {
  const [view, setView] = useState<AggregationView>("HALF");
  const [month, setMonth] = useState(6);
  const cycleLabel = { MONTHLY: "월 1회", HALF_YEARLY: "반기 1회", DAILY: "매일", BI_MONTHLY: "격월 1회", YEARLY: "연 1회" };
  const matchLabel = { WITHIN: "기간 내", EXACT: "예정월", CUMULATIVE: "누적" };
  const queriedMonths = view === "MONTH" ? [month] : view === "HALF" ? (month <= 6 ? [1, 2, 3, 4, 5, 6] : [7, 8, 9, 10, 11, 12]) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const endMonth = queriedMonths[queriedMonths.length - 1];
  return <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div><h2 className="text-base font-black text-slate-900">법정 이행 데이터</h2><p className="mt-1 text-xs text-slate-500">조회 기간마다 목표 발생 여부와 실적 집계 방식이 달라집니다.</p></div>
      <div className="flex flex-wrap gap-2"><div className="flex rounded-lg bg-slate-100 p-1">{([{ id: "MONTH", label: "월별" }, { id: "HALF", label: "반기별" }, { id: "YEAR", label: "연도별" }] as const).map((option) => <button key={option.id} onClick={() => setView(option.id)} className={"rounded-md px-3 py-2 text-xs font-bold " + (view === option.id ? "bg-white text-teal-700 shadow-sm" : "text-slate-500")}>{option.label}</button>)}</div>{view !== "YEAR" && <select value={month} onChange={(event) => setMonth(Number(event.target.value))} className="rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-700">{Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}월</option>)}</select>}</div>
    </div>
    <div className="mx-5 mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs"><span className="font-black text-slate-700">기간 결과</span><span className="rounded-full bg-rose-50 px-2 py-1 font-bold text-rose-700">미완료: 조회 기간 내 실적 없음</span><span className="rounded-full bg-amber-50 px-2 py-1 font-bold text-amber-700">이후 보완: 조회 기간 종료 후 수행</span><span className="text-slate-500">이후 보완은 과거 기간의 완료 결과를 변경하지 않습니다.</span></div>
    <div className="mt-4 overflow-x-auto"><table className="min-w-[1080px] w-full text-sm"><thead className="bg-slate-50 text-left text-xs font-bold text-slate-500"><tr><th className="px-5 py-3">이행 영역</th><th className="px-4 py-3">관리 항목</th><th className="px-4 py-3">유형 · 주기</th><th className="px-4 py-3">집계 구분</th><th className="px-4 py-3">목표</th><th className="px-4 py-3">실적</th><th className="px-4 py-3">통계 표시</th><th className="px-4 py-3">상태</th><th className="px-5 py-3 text-right">관리</th></tr></thead>
      <tbody className="divide-y divide-slate-100">{items.map((item) => {
        const rule = itemMetricRules[item.id] ?? metricRules[0];
        const target = calculateRuleTarget(rule, view, month);
        const baseActual = item.autoValue + item.manualValue;
        const performedMonth = latestPerformedMonth[item.id] ?? 0;
        const isPerformedInPeriod = queriedMonths.includes(performedMonth);
        const actual = target === null ? baseActual : isPerformedInPeriod ? Math.min(baseActual, target) : 0;
        const status = target === null || target === 0 ? "" : actual >= target ? "완료" : actual === 0 ? "미완료" : "";
        const laterRemediation = target !== null && target > 0 && actual === 0 && performedMonth > endMonth;
        return <tr key={item.id} className="hover:bg-slate-50"><td className="px-5 py-4 text-xs font-bold text-teal-700">{item.area}</td><td className="px-4 py-4"><p className="font-bold text-slate-800">{item.title}</p><p className="mt-1 text-xs text-slate-400">{item.owner} · {item.updatedAt}</p></td><td className="px-4 py-4"><p className="font-bold text-slate-700">{rule.aggregation === "CUMULATIVE" ? "누적형" : "횟수형"}</p><p className="mt-1 text-xs text-slate-400">{cycleLabel[rule.cycle]}{rule.dayPolicy ? " · 주말 제외" : ""}</p></td><td className="px-4 py-4"><span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{matchLabel[rule.match]}</span></td><td className="px-4 py-4 font-bold text-slate-700">{target === null ? "—" : target === 0 ? "해당 없음" : target + "회"}</td><td className="px-4 py-4 font-bold text-teal-700">{actual}건</td><td className="px-4 py-4 text-xs font-bold text-slate-600">{target === null ? "기간 누적 " + baseActual + "건" : target === 0 ? "기간 외" : <><span>{actual} / {target}회</span>{laterRemediation && <span className="mt-1 block text-amber-700">이후 보완 · {performedMonth}월 수행</span>}</>}</td><td className="px-4 py-4 text-xs font-bold">{status === "완료" && <span className="text-emerald-700">완료</span>}{status === "미완료" && <span className="text-rose-700">미완료</span>}</td><td className="px-5 py-4 text-right"><button onClick={() => onOpen(item)} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"><IconPencil size={14} />관리</button></td></tr>;
      })}</tbody></table></div>
  </section>;
}

function ManageModal({ item, onClose, onSave }: { item: ComplianceItem | null; onClose: () => void; onSave: (item: ComplianceItem) => void }) {
  const [manual, setManual] = useState(item?.manualValue ?? 0);
  const [evidence, setEvidence] = useState(item?.evidence ?? 0);
  if (!item) return null;
  const preview = { ...item, manualValue: manual, evidence };
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/35 p-4"><div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"><div className="flex items-start justify-between border-b border-slate-100 p-6"><div><p className="text-xs font-black text-teal-700">이행 데이터 관리</p><h2 className="mt-1 text-xl font-black text-slate-900">{item.title}</h2><p className="mt-2 text-sm text-slate-500">자동 데이터는 안전카드 연동값이며, 수동 관리 데이터와 증빙 현황을 보완할 수 있습니다.</p></div><button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><IconX size={21} /></button></div><div className="space-y-5 p-6"><div className="grid grid-cols-3 gap-3 rounded-xl bg-slate-50 p-4 text-sm"><div><p className="text-xs text-slate-400">자동 연동</p><b className="mt-1 block text-lg text-blue-700">{item.autoValue}</b></div><div><p className="text-xs text-slate-400">이행 목표</p><b className="mt-1 block text-lg text-slate-800">{item.target}</b></div><div><p className="text-xs text-slate-400">현재 이행률</p><b className="mt-1 block text-lg text-teal-700">{getRate(preview)}%</b></div></div><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold text-slate-700">수동 관리 이행 건수<input type="number" min="0" value={manual} onChange={(event) => setManual(Number(event.target.value))} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-teal-500" /></label><label className="text-sm font-bold text-slate-700">연결 증빙 건수<input type="number" min="0" value={evidence} onChange={(event) => setEvidence(Number(event.target.value))} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-teal-500" /></label></div><div className="rounded-xl border border-teal-100 bg-teal-50 p-4"><div className="flex items-center justify-between"><span className="text-sm font-bold text-teal-900">자동 계산 상태</span><StatusBadge status={getStatus(preview)} /></div><p className="mt-2 text-xs leading-5 text-teal-800">실적 합계 {preview.autoValue + preview.manualValue}건 / 목표 {preview.target}건 · 증빙 {preview.evidence}건</p></div></div><div className="flex justify-end gap-2 border-t border-slate-100 p-5"><button onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-bold text-slate-600">취소</button><button onClick={() => { onSave(preview); onClose(); }} className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-bold text-white">반영하기</button></div></div></div>;
}

function CreateModal({ kind, onClose, onUnavailable }: { kind: "report" | "goal" | "result" | null; onClose: () => void; onUnavailable: (title: string) => void }) {
  if (!kind) return null;
  const content = {
    report: { title: "반기별 이행점검 보고서 만들기", body: "현재 대시보드의 법정 이행 현황을 기준으로 반기별 이행점검 보고서 초안을 생성합니다.", action: "안전카드에서 보고서 만들기", icon: IconReportAnalytics },
    goal: { title: "안전보건목표 및 세부추진계획 만들기", body: "미이행·관리 필요 항목을 목표와 담당 실행 항목으로 정리해 안전카드에 생성합니다.", action: "안전카드에서 추진계획 만들기", icon: IconTargetArrow },
    result: { title: "안전보건목표 실적 문서 만들기", body: "현재 이행 데이터를 기반으로 목표별 실적 문서의 입력 항목을 준비합니다.", action: "안전카드에서 실적 문서 만들기", icon: IconFilePlus },
  }[kind];
  const Icon = content.icon;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/35 p-4"><div className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-2xl"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-teal-50 text-teal-700"><Icon size={28} /></div><h2 className="mt-5 text-xl font-black text-slate-900">{content.title}</h2><p className="mt-3 text-sm leading-6 text-slate-500">{content.body}</p><div className="mt-6 rounded-xl bg-slate-50 p-3 text-left text-xs leading-5 text-slate-500"><b className="text-slate-700">안내:</b> 문서의 작성·수정·증빙 첨부는 안전카드 관리 기능에서 진행됩니다. 이 화면은 통합 이행 데이터를 집계하여 제공합니다.</div><div className="mt-6 flex gap-2"><button onClick={onClose} className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600">닫기</button><button onClick={() => { onClose(); onUnavailable(content.action); }} className="flex-1 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-bold text-white">{content.action}</button></div></div></div>;
}

export default function HalfYearInspectionPage() {
  const [items, setItems] = useState(initialItems);
  const [actionChecks, setActionChecks] = useState(integratedActionChecks);
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);
  const [createKind, setCreateKind] = useState<"report" | "goal" | "result" | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unavailableTitle, setUnavailableTitle] = useState<string | null>(null);
  return <div className="safebuddy-console min-h-screen bg-[#f5f7f8] text-slate-900"><div className="flex"><Sidebar onUnavailable={setUnavailableTitle} />{sidebarOpen && <div className="fixed inset-0 z-40 bg-slate-950/30 xl:hidden" onClick={() => setSidebarOpen(false)} />}<main className="min-w-0 flex-1"><Header onCreate={setCreateKind} onMenu={() => setSidebarOpen(true)} onUnavailable={setUnavailableTitle} /><div className="mx-auto max-w-[1580px] space-y-6 px-5 py-6 lg:px-8"><Overview items={items} /><MetricAggregationGuide /><GovernanceActionChecks checks={actionChecks} items={items} onConfirm={(id) => setActionChecks((previous) => previous.map((check) => check.id === id ? { ...check, checked: true, status: "완료" } : check))} /><ActionCheckVisuals checks={actionChecks} /><ActionCenter items={items} onOpen={setSelectedItem} /><DocumentFlow onCreate={setCreateKind} /><PeriodAwareLegalExecutionTable items={items} onOpen={setSelectedItem} /></div></main></div><ManageModal item={selectedItem} onClose={() => setSelectedItem(null)} onSave={(next) => setItems((prev) => prev.map((item) => item.id === next.id ? next : item))} /><CreateModal kind={createKind} onClose={() => setCreateKind(null)} onUnavailable={setUnavailableTitle} /><UnavailableModal title={unavailableTitle} onClose={() => setUnavailableTitle(null)} /></div>;
}
