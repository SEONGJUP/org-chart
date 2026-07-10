"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  IconBook2,
  IconBuilding,
  IconChartBar,
  IconChevronDown,
  IconChevronRight,
  IconClipboardCheck,
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
type GovernanceManagementType = "MANAGER_EVALUATION" | "CONTRACTOR_EVALUATION";
type ViewerRole = "현장소장" | "관리자";
type ChecklistRating = "우수" | "양호" | "보통" | "미흡";
type EvaluationChecklistItem = {
  label: string;
  checked?: boolean;
  rating?: ChecklistRating | "";
  note?: string;
  content?: string;
  maxScore?: number;
  score?: number;
};

const contractorEvaluationChecklistTemplate: EvaluationChecklistItem[] = [
  {
    label: "A. 안전보건관리체계",
    content: "수급업체의 안전보건목표, 경영방침 수립의 적정성 / 안전관리 조직구성, 책임자 지정 및 역할의 적정성",
    maxScore: 20,
    score: 0,
    note: "",
  },
  {
    label: "B. 위험성평가 및 실행수준",
    content: "자체 위험성평가 실시 수준, 도급작업의 위험성평가 결과에 대한 이해수준 / 안전보건 교육 수행 여부 및 기록관리 적정성",
    maxScore: 20,
    score: 0,
    note: "",
  },
  {
    label: "C. 안전점검 및 이행확인",
    content: "안전점검 및 모니터링(보호구 착용확인 포함) 여부 / 안전조치 이행 여부(도급업체 지도조언에 대한 이행 포함)",
    maxScore: 20,
    score: 0,
    note: "",
  },
  {
    label: "D. 운영관리",
    content: "유해·위험물질 및 기계·기구·설비 안전성 확인 및 예방조치 여부 / 비상시 대비 및 피해 최소화 대책 수립 여부",
    maxScore: 20,
    score: 0,
    note: "",
  },
  {
    label: "E. 재해발생수준",
    content: "최근 3년간 산업재해 발생 현황, 중대재해 발생 여부",
    maxScore: 20,
    score: 0,
    note: "",
  },
];

type LegalDuty = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  governanceItems: GovernanceItem[];
};

type GovernanceItem = {
  id: string;
  title: string;
  badge: string;
  status: "완료" | "진행중";
  description: string;
  progress?: number;
  progressLabel?: string;
  managementType?: GovernanceManagementType;
  metrics: Array<{
    label: string;
    value: string;
    caption?: string;
    tone?: "teal" | "slate" | "amber" | "rose";
  }>;
};

type EvaluationTarget = {
  id: string;
  name: string;
  role: string;
  department: string;
  checklist: EvaluationChecklistItem[];
  evidence: number;
  evaluator: string;
  status: "평가완료" | "진행중" | "미평가";
};

type EvaluationHistory = {
  id: string;
  year: number;
  half: "상반기" | "하반기";
  period: string;
  status: "평가완료" | "진행중" | "미평가";
  completed: number;
  total: number;
  targets: EvaluationTarget[];
};

type GovernanceManagementConfig = {
  title: string;
  subtitle: string;
  description: string;
  histories: EvaluationHistory[];
};

type EvaluationCandidate = {
  id: string;
  name: string;
  role: string;
  department: string;
  evaluator: string;
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

type SafetyCardReportRow = SafetyCard & {
  dutyNumber: string;
  dutyTitle: string;
  target: number;
  actual: number;
  rate: number;
  status: DutyStatus;
  department: string;
  budget: number;
  quarters: boolean[];
};

type GovernanceReportRow = {
  id: string;
  dutyId: string;
  dutyNumber: string;
  dutyTitle: string;
  itemTitle: string;
  result: string;
  score: number;
  grade: string;
  evidence: string;
  managementType?: GovernanceManagementType;
  sourceHistoryId?: string;
  sourceHistoryLabel?: string;
  excluded?: boolean;
};

type WorkplaceOverview = {
  siteName: string;
  title: string;
  address: string;
  industry: string;
  employeeCount: string;
  siteType: string;
  client: string;
  confirmer: string;
  confirmationDate: string;
};

const legalDuties: LegalDuty[] = [
  { id: "risk", number: "①", title: "유해·위험요인 확인 및 개선 여부", shortTitle: "유해·위험요인 확인 및 개선", governanceItems: [] },
  {
    id: "manager",
    number: "②",
    title: "안전보건관리책임자 등의 충실한 업무수행 평가·관리",
    shortTitle: "책임자 업무수행 평가·관리",
    governanceItems: [
      {
        id: "safety-org",
        title: "안전보건조직구성 여부",
        badge: "완료",
        status: "완료",
        description: "안전관리자 선임의무가 있는 규모의 사업장 여부를 판단하여 노출합니다.",
        metrics: [
          { label: "조직 구성", value: "완료", caption: "안전보건 R&R 기준", tone: "teal" },
          { label: "안전관리자 선임의무", value: "2명", caption: "대상 사업장", tone: "teal" },
          { label: "보건관리자 선임의무", value: "1명", caption: "대상 사업장", tone: "teal" },
        ],
      },
      {
        id: "manager-evaluation",
        title: "책임자 평가 (상/하반기)",
        badge: "R&R 지정 확인",
        status: "진행중",
        description: "R&R 업무에 담당자가 지정되고 역할 내용이 기재되어 있는지 확인합니다.",
        managementType: "MANAGER_EVALUATION",
        metrics: [
          { label: "평가 대상", value: "4명", caption: "총괄책임자·안전·보건관리자", tone: "slate" },
          { label: "평가 완료", value: "3명", caption: "상반기 평가 수행", tone: "teal" },
          { label: "평가 미완료", value: "1명", caption: "보완 필요", tone: "amber" },
        ],
      },
    ],
  },
  {
    id: "voice",
    number: "③",
    title: "종사자 의견청취 절차에 따른 의견 수렴 및 개선방안 마련·이행 여부",
    shortTitle: "종사자 의견 수렴 및 개선",
    governanceItems: [
      {
        id: "worker-voice",
        title: "근로자 의견청취 · 소통",
        badge: "관리중",
        status: "진행중",
        description: "안전제안과 안전신고 접수 이후 개선 조치 완료 여부를 관리합니다.",
        metrics: [
          { label: "안전제안", value: "12건", tone: "slate" },
          { label: "안전신고", value: "8건", tone: "slate" },
          { label: "조치 완료", value: "18건 · 90%", caption: "총 20건 중", tone: "teal" },
        ],
      },
    ],
  },
  {
    id: "emergency",
    number: "④",
    title: "중대산업재해 발생 대비 매뉴얼에 따른 조치 여부",
    shortTitle: "중대산업재해 대비 매뉴얼",
    governanceItems: [
      {
        id: "accident-near-miss",
        title: "재해 및 아차사고",
        badge: "관리중",
        status: "완료",
        description: "재해와 아차사고 발생 건수, 재발방지조치 완료 여부를 함께 관리합니다.",
        metrics: [
          { label: "재해발생", value: "0건", tone: "teal" },
          { label: "아차사고 발생", value: "3건", tone: "amber" },
          { label: "재발방지조치", value: "3건 · 100%", caption: "대상 3건", tone: "teal" },
        ],
      },
    ],
  },
  {
    id: "contract",
    number: "⑤",
    title: "도급·용역·위탁 기준·절차 이행 여부",
    shortTitle: "도급·용역·위탁 기준 이행",
    governanceItems: [
      {
        id: "contractor-evaluation",
        title: "적격수급업체 평가 이행 : 상/하반기",
        badge: "관리중",
        status: "진행중",
        description: "상/하반기 기준 전체 협력사 대비 평가 완료 현황을 집계합니다.",
        managementType: "CONTRACTOR_EVALUATION",
        metrics: [
          { label: "전체 협력사", value: "24개", tone: "slate" },
          { label: "평가 완료", value: "20개 · 83%", tone: "teal" },
          { label: "미완료", value: "4개", tone: "amber" },
        ],
      },
    ],
  },
  {
    id: "law",
    number: "⑥",
    title: "경영자의 리더십 및 안전·보건 관계 법령에 따른 안전보건 확보 의무 이행 여부",
    shortTitle: "관계 법령 의무 이행 (중처법 시행령 제4조, 제5조)",
    governanceItems: [
      {
        id: "safety-budget",
        title: "안전보건예산 편성 및 실적",
        badge: "관리중",
        status: "진행중",
        description: "연간 안전보건예산 편성액과 현재 집행 실적을 추적합니다.",
        metrics: [
          { label: "2026년 편성", value: "120,000,000원", tone: "slate" },
          { label: "집행 실적", value: "78,600,000원", tone: "teal" },
          { label: "집행율", value: "65.5%", tone: "teal" },
        ],
      },
    ],
  },
  {
    id: "education",
    number: "⑦",
    title: "안전·보건 관계 법령에 따른 의무적인 교육 실시 여부",
    shortTitle: "의무 안전보건 교육",
    governanceItems: [
      {
        id: "legal-education-summary",
        title: "안전보건교육 이행 현황",
        badge: "통계 집계",
        status: "완료",
        description: "안전보건교육 수행 건수와 수료자, TBM 교육시간을 집계합니다.",
        metrics: [
          { label: "수행교육의 수", value: "48건", tone: "slate" },
          { label: "교육수료자", value: "312명", tone: "teal" },
          { label: "TBM 교육시간", value: "1,860분", tone: "amber" },
        ],
      },
    ],
  },
];

const governanceManagementConfigs: Record<GovernanceManagementType, GovernanceManagementConfig> = {
  MANAGER_EVALUATION: {
    title: "책임자 평가 이력관리",
    subtitle: "안전보건관리책임자 등 업무수행 평가",
    description: "년도별 상·하반기 대상자를 기준으로 R&R 지정, 업무수행, 조치 이행 여부를 체크리스트로 관리합니다.",
    histories: [
      {
        id: "manager-2026-h1",
        year: 2026,
        half: "상반기",
        period: "2026.01.01 ~ 2026.06.30",
        status: "진행중",
        completed: 3,
        total: 4,
        targets: [
          {
            id: "m-001",
            name: "김도현",
            role: "안전보건총괄책임자",
            department: "본사 안전보건실",
            status: "평가완료",
            evidence: 4,
            evaluator: "대표이사",
            checklist: [
              { label: "안전보건 목표와 추진계획 검토", checked: true },
              { label: "예산 및 인력 배정 현황 확인", checked: true },
              { label: "개선조치 지시 및 완료 확인", checked: true },
              { label: "반기 평가 의견 기록", checked: true },
            ],
          },
          {
            id: "m-002",
            name: "박서준",
            role: "안전관리자",
            department: "A 현장",
            status: "평가완료",
            evidence: 3,
            evaluator: "안전보건총괄책임자",
            checklist: [
              { label: "위험성평가 실시 여부 확인", checked: true },
              { label: "점검 조치사항 추적관리", checked: true },
              { label: "교육 및 TBM 기록 확인", checked: true },
              { label: "미흡사항 개선계획 등록", checked: true },
            ],
          },
          {
            id: "m-003",
            name: "이하린",
            role: "보건관리자",
            department: "B 현장",
            status: "진행중",
            evidence: 2,
            evaluator: "안전보건총괄책임자",
            checklist: [
              { label: "근로자 건강관리 기록 확인", checked: true },
              { label: "MSDS 교육 및 보호구 관리 확인", checked: true },
              { label: "보건 개선조치 이행 확인", checked: false },
              { label: "반기 평가 의견 기록", checked: false },
            ],
          },
          {
            id: "m-004",
            name: "정민재",
            role: "관리감독자",
            department: "C 현장",
            status: "미평가",
            evidence: 0,
            evaluator: "안전관리자",
            checklist: [
              { label: "작업 전 안전조치 확인", checked: false },
              { label: "근로자 의견 청취 이행", checked: false },
              { label: "일일 점검 기록 확인", checked: false },
              { label: "평가 의견 기록", checked: false },
            ],
          },
        ],
      },
      {
        id: "manager-2025-h2",
        year: 2025,
        half: "하반기",
        period: "2025.07.01 ~ 2025.12.31",
        status: "평가완료",
        completed: 4,
        total: 4,
        targets: [
          {
            id: "m-101",
            name: "김도현",
            role: "안전보건총괄책임자",
            department: "본사 안전보건실",
            status: "평가완료",
            evidence: 5,
            evaluator: "대표이사",
            checklist: [
              { label: "안전보건 목표와 추진계획 검토", checked: true },
              { label: "예산 및 인력 배정 현황 확인", checked: true },
              { label: "개선조치 지시 및 완료 확인", checked: true },
              { label: "반기 평가 의견 기록", checked: true },
            ],
          },
          {
            id: "m-102",
            name: "박서준",
            role: "안전관리자",
            department: "A 현장",
            status: "평가완료",
            evidence: 4,
            evaluator: "안전보건총괄책임자",
            checklist: [
              { label: "위험성평가 실시 여부 확인", checked: true },
              { label: "점검 조치사항 추적관리", checked: true },
              { label: "교육 및 TBM 기록 확인", checked: true },
              { label: "미흡사항 개선계획 등록", checked: true },
            ],
          },
        ],
      },
    ],
  },
  CONTRACTOR_EVALUATION: {
    title: "적격수급업체 평가 이력관리",
    subtitle: "도급·용역·위탁 기준·절차 이행 평가",
    description: "년도별 상·하반기 협력업체 평가 대상과 체크리스트 수행 현황을 관리합니다.",
    histories: [
      {
        id: "contractor-2026-h1",
        year: 2026,
        half: "상반기",
        period: "2026.01.01 ~ 2026.06.30",
        status: "진행중",
        completed: 20,
        total: 24,
        targets: [
          {
            id: "c-001",
            name: "세이프건설 협력사 A",
            role: "건축 공종",
            department: "A 현장",
            status: "평가완료",
            evidence: 6,
            evaluator: "구매/안전 담당",
            checklist: [
              { label: "재해예방 조치 능력 확인", checked: true },
              { label: "안전보건관리 인력 보유 확인", checked: true },
              { label: "안전관리비 반영 확인", checked: true },
              { label: "평가 결과 승인", checked: true },
            ],
          },
          {
            id: "c-002",
            name: "그린설비",
            role: "설비 공종",
            department: "B 현장",
            status: "평가완료",
            evidence: 5,
            evaluator: "안전관리자",
            checklist: [
              { label: "산안법 위반 이력 확인", checked: true },
              { label: "작업계획서 제출 확인", checked: true },
              { label: "투입 인력 교육 확인", checked: true },
              { label: "계약 기준 충족 확인", checked: true },
            ],
          },
          {
            id: "c-003",
            name: "대한중장비",
            role: "장비/양중",
            department: "C 현장",
            status: "진행중",
            evidence: 3,
            evaluator: "현장관리자",
            checklist: [
              { label: "장비 검사서 확인", checked: true },
              { label: "운전원 자격 확인", checked: true },
              { label: "위험작업 허가 기준 확인", checked: false },
              { label: "평가 결과 승인", checked: false },
            ],
          },
          {
            id: "c-004",
            name: "미래전기",
            role: "전기 공종",
            department: "D 현장",
            status: "미평가",
            evidence: 0,
            evaluator: "구매/안전 담당",
            checklist: [
              { label: "재해예방 조치 능력 확인", checked: false },
              { label: "안전보건관리 인력 보유 확인", checked: false },
              { label: "안전관리비 반영 확인", checked: false },
              { label: "평가 결과 승인", checked: false },
            ],
          },
        ],
      },
      {
        id: "contractor-2025-h2",
        year: 2025,
        half: "하반기",
        period: "2025.07.01 ~ 2025.12.31",
        status: "평가완료",
        completed: 22,
        total: 22,
        targets: [
          {
            id: "c-101",
            name: "세이프건설 협력사 A",
            role: "건축 공종",
            department: "A 현장",
            status: "평가완료",
            evidence: 5,
            evaluator: "구매/안전 담당",
            checklist: [
              { label: "재해예방 조치 능력 확인", checked: true },
              { label: "안전보건관리 인력 보유 확인", checked: true },
              { label: "안전관리비 반영 확인", checked: true },
              { label: "평가 결과 승인", checked: true },
            ],
          },
        ],
      },
    ],
  },
};

const evaluationCandidates: Record<GovernanceManagementType, EvaluationCandidate[]> = {
  MANAGER_EVALUATION: [
    { id: "candidate-manager-001", name: "김도현", role: "안전보건총괄책임자", department: "본사 안전보건실", evaluator: "현장소장" },
    { id: "candidate-manager-002", name: "이서연", role: "안전관리자", department: "본사 안전보건실", evaluator: "현장소장" },
    { id: "candidate-manager-003", name: "박준호", role: "보건관리자", department: "현장 안전보건팀", evaluator: "현장소장" },
    { id: "candidate-manager-004", name: "최민재", role: "관리감독자", department: "토목공사팀", evaluator: "현장소장" },
    { id: "candidate-manager-005", name: "정하늘", role: "관리감독자", department: "건축공사팀", evaluator: "현장소장" },
    { id: "candidate-manager-006", name: "오세진", role: "안전관리자", department: "2공구 안전관리팀", evaluator: "현장소장" },
  ],
  CONTRACTOR_EVALUATION: [
    { id: "candidate-contractor-001", name: "한빛산업", role: "협력사", department: "철근콘크리트", evaluator: "현장소장" },
    { id: "candidate-contractor-002", name: "대명이엔지", role: "협력사", department: "전기공사", evaluator: "현장소장" },
    { id: "candidate-contractor-003", name: "세진건설기계", role: "협력사", department: "장비·양중", evaluator: "현장소장" },
    { id: "candidate-contractor-004", name: "우진산업안전", role: "협력사", department: "안전시설물", evaluator: "현장소장" },
    { id: "candidate-contractor-005", name: "동해설비", role: "협력사", department: "기계설비", evaluator: "현장소장" },
  ],
};

const safetyCards: SafetyCard[] = [
  { id: "policy", category: "안전 경영", name: "안전보건 경영방침", dutyId: "manager", cycleType: "YEARLY", cycleLabel: "연 1회", scheduledMonths: [1], baseActual: 1, evidence: 2 },
  { id: "goal", category: "안전 경영", name: "안전보건 목표", dutyId: "manager", cycleType: "YEARLY", cycleLabel: "연 1회", scheduledMonths: [1], baseActual: 1, evidence: 2 },
  { id: "goal-plan", category: "안전 경영", name: "안전보건 목표 및 추진 계획", dutyId: "law", cycleType: "YEARLY", cycleLabel: "연 1회", scheduledMonths: [1], baseActual: 1, evidence: 2 },
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
  const modeLabel = mode === "YEAR" ? "" : mode === "HALF" ? (half === "H1" ? "상반기" : "하반기") : `${month}월까지`;
  return {
    mode,
    year,
    half,
    month,
    endMonth,
    label: modeLabel ? `${year}년 ${modeLabel}` : `${year}년`,
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

function getDefaultQuarters(card: SafetyCard) {
  if (card.cycleType === "DAILY" || card.cycleType === "MONTHLY") return [true, true, true, true];
  if (card.cycleType === "ON_DEMAND") return [false, false, false, true];
  const quarters = [false, false, false, false];
  card.scheduledMonths.forEach((month) => {
    const index = Math.min(3, Math.max(0, Math.ceil(month / 3) - 1));
    quarters[index] = true;
  });
  return quarters;
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

function reportGrade(score: number) {
  if (score >= 90) return "우수";
  if (score >= 75) return "양호";
  if (score >= 60) return "보통";
  return "개선필요";
}

function halfLabelToKey(half: EvaluationHistory["half"]) {
  return String(half).includes("하") ? "H2" : "H1";
}

function getEvaluationHistoryLabel(history: EvaluationHistory) {
  return `${history.year}년 ${halfLabelToKey(history.half) === "H2" ? "하반기" : "상반기"}`;
}

function getEvaluationHistoryOptions(type: GovernanceManagementType, reportYear: number) {
  const config = governanceManagementConfigs[type];
  const startYear = Math.min(2024, reportYear - 2);
  const endYear = Math.max(reportYear, 2026);
  const existing = new Map(config.histories.map((history) => [`${history.year}-${halfLabelToKey(history.half)}`, history]));

  return Array.from({ length: endYear - startYear + 1 }, (_, yearIndex) => startYear + yearIndex)
    .flatMap((year) => (["H1", "H2"] as const).map((half) => {
      const history = existing.get(`${year}-${half}`);
      const total = history?.total ?? (type === "MANAGER_EVALUATION" ? 4 : 24);
      const completed = history?.completed ?? Math.max(0, total - (year === reportYear && half === "H2" ? 2 : 1));
      const score = total > 0 ? Math.round((completed / total) * 100) : 0;
      return {
        id: history?.id ?? `${type.toLowerCase()}-${year}-${half.toLowerCase()}`,
        year,
        half,
        label: history ? getEvaluationHistoryLabel(history) : `${year}년 ${half === "H2" ? "하반기" : "상반기"}`,
        period: history?.period ?? `${year}.${half === "H1" ? "01.01 ~ " + year + ".06.30" : "07.01 ~ " + year + ".12.31"}`,
        completed,
        total,
        score,
        status: history?.status ?? "평가완료",
      };
    }))
    .sort((a, b) => b.year - a.year || (b.half === "H2" ? 1 : -1));
}

function buildReportDefaults(period: Period) {
  const safetyRows: SafetyCardReportRow[] = safetyCards.map((card) => {
    const target = getTarget(card, period);
    const actual = getActual(card, period);
    const rate = getRate(actual, target);
    const duty = legalDuties.find((item) => item.id === card.dutyId) ?? legalDuties[0];
    return {
      ...card,
      dutyNumber: duty.number,
      dutyTitle: duty.shortTitle,
      target,
      actual,
      rate,
      status: getStatus(actual, target),
      department: "전체",
      budget: 0,
      quarters: getDefaultQuarters(card),
    };
  });

  const governanceRows: GovernanceReportRow[] = legalDuties.flatMap((duty) => duty.governanceItems.map((item) => {
    const score = typeof item.progress === "number" ? Math.round(item.progress) : item.status === "완료" ? 100 : 50;
    return {
      id: item.id,
      dutyId: duty.id,
      dutyNumber: duty.number,
      dutyTitle: duty.shortTitle,
      itemTitle: item.title,
      result: item.badge,
      score,
      grade: reportGrade(score),
      evidence: item.metrics.map((metric) => `${metric.label} ${metric.value}`).join(" / "),
      managementType: item.managementType,
      sourceHistoryId: item.managementType ? governanceManagementConfigs[item.managementType].histories[0]?.id : undefined,
      sourceHistoryLabel: item.managementType && governanceManagementConfigs[item.managementType].histories[0] ? getEvaluationHistoryLabel(governanceManagementConfigs[item.managementType].histories[0]) : undefined,
      excluded: false,
    };
  }));

  const overview: WorkplaceOverview = {
    siteName: "DEMO#1 현장(강원 삼척) - 건설업",
    title: `${period.label} 중대재해처벌법 의무사항 이행 점검`,
    address: "강원특별자치도 삼척시 가곡면 가곡천로 149-6",
    industry: "건설업 > 기타 비주거용 건물 건설업",
    employeeCount: "50명",
    siteType: "건설현장",
    client: "강원도",
    confirmer: "데모컴퍼니 홍길동",
    confirmationDate: `${period.year}년 ${String(period.endMonth).padStart(2, "0")}월 ${String(new Date(period.year, period.endMonth, 0).getDate()).padStart(2, "0")}일`,
  };

  return { overview, governanceRows, safetyRows, improvementNotes: "" };
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

function governanceMetricClass(tone: GovernanceItem["metrics"][number]["tone"] = "slate") {
  if (tone === "teal") return "bg-teal-50 text-[#008d86] ring-teal-100";
  if (tone === "amber") return "bg-amber-50 text-amber-700 ring-amber-100";
  if (tone === "rose") return "bg-rose-50 text-rose-700 ring-rose-100";
  return "bg-slate-50 text-slate-700 ring-slate-100";
}

function governanceStatusClass(status: GovernanceItem["status"]) {
  return status === "완료"
    ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
    : "bg-amber-50 text-amber-700 ring-amber-100";
}

function evaluationStatusClass(status: EvaluationHistory["status"] | EvaluationTarget["status"]) {
  if (status === "평가완료") return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  if (status === "진행중") return "bg-amber-50 text-amber-700 ring-amber-100";
  return "bg-slate-100 text-slate-500 ring-slate-200";
}

function evaluatorProfile(evaluator: string) {
  const profiles: Record<string, { name: string; position: string }> = {
    대표이사: { name: "홍길동", position: "대표이사" },
    안전보건총괄책임자: { name: "김도현", position: "안전보건총괄책임자" },
    안전관리자: { name: "이서연", position: "안전관리자" },
    현장관리자: { name: "박준호", position: "현장관리자" },
    "구매/안전 담당": { name: "정유진", position: "구매/안전 담당" },
    현장소장: { name: "강민수", position: "현장소장" },
  };
  return profiles[evaluator] ?? { name: evaluator, position: "평가자" };
}

function calculateFinalRating(checklist: EvaluationChecklistItem[]): ChecklistRating {
  const scoredItems = checklist.filter((check) => typeof check.maxScore === "number" && check.maxScore > 0);
  if (scoredItems.length > 0) {
    const maxScore = scoredItems.reduce((sum, check) => sum + (check.maxScore ?? 0), 0);
    const score = scoredItems.reduce((sum, check) => sum + (check.score ?? 0), 0);
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    if (percentage >= 90) return "우수";
    if (percentage >= 80) return "양호";
    if (percentage >= 70) return "보통";
    return "미흡";
  }

  const scores: Record<ChecklistRating, number> = { 우수: 4, 양호: 3, 보통: 2, 미흡: 1 };
  const ratings = checklist.map((check) => check.rating).filter(Boolean) as ChecklistRating[];
  if (ratings.length === 0) return "보통";

  const average = ratings.reduce((sum, rating) => sum + scores[rating], 0) / ratings.length;
  if (average >= 3.5) return "우수";
  if (average >= 2.5) return "양호";
  if (average >= 1.5) return "보통";
  return "미흡";
}

function checklistRatingClass(rating: ChecklistRating, active: boolean) {
  if (!active) return "bg-white text-slate-500 ring-1 ring-slate-200";
  if (rating === "우수") return "bg-emerald-600 text-white shadow-sm";
  if (rating === "양호") return "bg-emerald-400 text-white shadow-sm";
  if (rating === "보통") return "bg-amber-400 text-white shadow-sm";
  return "bg-rose-500 text-white shadow-sm";
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

          <p className="text-base font-black text-white/90">안전관리체계 구축 종합 이행률</p>
          <div className="mt-3 flex flex-wrap items-end gap-4">
            <p className="text-[54px] leading-none font-black tracking-[-0.02em]">{totalRate}%</p>
            <p className="mb-2 text-lg font-black text-white/90">정상 관리 구간</p>
          </div>

          <div className="mt-6 border-t border-white/20 pt-5">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-sm font-bold text-white/75">점검 항목</p>
                <b className="mt-1.5 block text-xl font-black">7개</b>
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

function GovernanceManagementModal({ item, viewerRole, onClose }: { item: GovernanceItem & { managementType: GovernanceManagementType }; viewerRole: ViewerRole; onClose: () => void }) {
  const config = governanceManagementConfigs[item.managementType];
  const isContractorManagement = item.managementType === "CONTRACTOR_EVALUATION";
  const [histories, setHistories] = useState<EvaluationHistory[]>(config.histories);
  const [selectedHistoryId, setSelectedHistoryId] = useState(config.histories[0]?.id ?? "");
  const [selectedTargetId, setSelectedTargetId] = useState("");
  const [isNewFormOpen, setIsNewFormOpen] = useState(false);
  const [newYear, setNewYear] = useState(2026);
  const [newHalf, setNewHalf] = useState<EvaluationHistory["half"]>("상반기");
  const [newFormError, setNewFormError] = useState("");
  const [isAddTargetOpen, setIsAddTargetOpen] = useState(false);
  const [targetAddError, setTargetAddError] = useState("");
  const selectedHistory = histories.find((history) => history.id === selectedHistoryId) ?? histories[0];
  const selectedTarget = selectedTargetId ? selectedHistory.targets.find((target) => target.id === selectedTargetId) : undefined;
  const [editableChecklist, setEditableChecklist] = useState<EvaluationChecklistItem[]>([]);
  const [evaluationStatus, setEvaluationStatus] = useState<EvaluationTarget["status"]>("미평가");
  const [finalRating, setFinalRating] = useState<ChecklistRating>("보통");
  const [isFinalRatingEdited, setIsFinalRatingEdited] = useState(false);
  const [activeStep, setActiveStep] = useState<"CHECKLIST" | "OPINION">("CHECKLIST");
  const opinionStepRef = useRef<HTMLDivElement | null>(null);
  const keepOpinionStepAfterSaveRef = useRef(false);
  const historyRate = selectedHistory.total > 0 ? Math.round((selectedHistory.completed / selectedHistory.total) * 100) : 0;
  const normalizeChecklist = useCallback((check: EvaluationChecklistItem, index = 0): EvaluationChecklistItem => ({
    ...check,
    rating: check.rating ?? (check.checked ? "우수" : ""),
    note: check.note ?? "",
    content: check.content ?? (isContractorManagement ? contractorEvaluationChecklistTemplate[index]?.content ?? "" : undefined),
    maxScore: check.maxScore ?? (isContractorManagement ? contractorEvaluationChecklistTemplate[index]?.maxScore ?? 20 : undefined),
    score: check.score ?? (isContractorManagement ? 0 : undefined),
  }), [isContractorManagement]);
  const totalMaxScore = editableChecklist.reduce((sum, check) => sum + (check.maxScore ?? 0), 0);
  const totalScore = editableChecklist.reduce((sum, check) => sum + (check.score ?? 0), 0);
  const checklistRate = isContractorManagement
    ? totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0
    : editableChecklist.length > 0 ? Math.round((editableChecklist.filter((check) => check.rating).length / editableChecklist.length) * 100) : 0;
  const canEvaluate = viewerRole === "현장소장";

  useEffect(() => {
    const targetChecklist = selectedTarget?.checklist ?? [];
    const sourceChecklist = isContractorManagement && targetChecklist.every((check) => !check.content)
      ? contractorEvaluationChecklistTemplate
      : targetChecklist;
    const nextChecklist = sourceChecklist.map((check, index) => normalizeChecklist(check, index));
    setEditableChecklist(nextChecklist);
    setEvaluationStatus(selectedTarget?.status ?? "미평가");
    setFinalRating(calculateFinalRating(nextChecklist));
    setIsFinalRatingEdited(false);
    if (keepOpinionStepAfterSaveRef.current) {
      keepOpinionStepAfterSaveRef.current = false;
    } else {
      setActiveStep("CHECKLIST");
    }
  }, [isContractorManagement, normalizeChecklist, selectedTargetId, selectedHistoryId, selectedTarget]);

  useEffect(() => {
    if (!isFinalRatingEdited) {
      setFinalRating(calculateFinalRating(editableChecklist));
    }
  }, [editableChecklist, isFinalRatingEdited]);

  useEffect(() => {
    if (activeStep !== "OPINION") return;
    window.requestAnimationFrame(() => {
      opinionStepRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [activeStep]);

  const selectHistory = (history: EvaluationHistory) => {
    setSelectedHistoryId(history.id);
    setSelectedTargetId("");
    setIsAddTargetOpen(false);
    setTargetAddError("");
  };

  const createHistory = () => {
    const exists = histories.some((history) => history.year === newYear && history.half === newHalf);
    if (exists) {
      setNewFormError(`${newYear}년 ${newHalf} 평가는 이미 생성되어 있습니다.`);
      return;
    }

    const sourceTargets = selectedHistory?.targets ?? [];
    const nextHistory: EvaluationHistory = {
      id: `${item.managementType.toLowerCase()}-${newYear}-${newHalf === "상반기" ? "h1" : "h2"}-${Date.now()}`,
      year: newYear,
      half: newHalf,
      period: newHalf === "상반기" ? `${newYear}.01.01 ~ ${newYear}.06.30` : `${newYear}.07.01 ~ ${newYear}.12.31`,
      status: "미평가",
      completed: 0,
      total: sourceTargets.length,
      targets: sourceTargets.map((target, index) => ({
        ...target,
        id: `${target.id}-${newYear}-${newHalf === "상반기" ? "h1" : "h2"}-${index}`,
        status: "미평가",
        evidence: 0,
        checklist: (isContractorManagement ? contractorEvaluationChecklistTemplate : target.checklist).map((check, index) => ({ ...normalizeChecklist(check, index), checked: false, rating: "", note: "", score: isContractorManagement ? 0 : check.score })),
      })),
    };

    setHistories((items) => [nextHistory, ...items]);
    setSelectedHistoryId(nextHistory.id);
    setSelectedTargetId("");
    setIsNewFormOpen(false);
    setNewFormError("");
  };

  const addEvaluationTarget = (candidate: EvaluationCandidate) => {
    if (!selectedHistory) return;
    const exists = selectedHistory.targets.some((target) => target.name === candidate.name && target.role === candidate.role);
    if (exists) {
      setTargetAddError(`${candidate.name} 대상자는 이미 등록되어 있습니다.`);
      return;
    }

    const templateChecklist = selectedHistory.targets[0]?.checklist ?? [
      ...(isContractorManagement
        ? contractorEvaluationChecklistTemplate
        : [
            { label: "R&R 및 평가 대상 여부 확인", checked: false, rating: "", note: "" },
            { label: "업무수행 기록 확인", checked: false, rating: "", note: "" },
            { label: "보완 필요사항 조치 여부 확인", checked: false, rating: "", note: "" },
          ]),
    ];
    const nextTarget: EvaluationTarget = {
      id: `${candidate.id}-${selectedHistory.id}-${Date.now()}`,
      name: candidate.name,
      role: candidate.role,
      department: candidate.department,
      evaluator: candidate.evaluator,
      evidence: 0,
      status: "미평가",
      checklist: templateChecklist.map((check, index) => ({ ...normalizeChecklist(check, index), checked: false, rating: "", note: "", score: isContractorManagement ? 0 : check.score })),
    };

    setHistories((items) => items.map((history) => history.id === selectedHistory.id
      ? { ...history, total: history.total + 1, targets: [...history.targets, nextTarget] }
      : history
    ));
    setSelectedTargetId(nextTarget.id);
    setIsAddTargetOpen(false);
    setTargetAddError("");
  };

  const updateChecklistLabel = (index: number, label: string) => {
    setEditableChecklist((items) => items.map((check, itemIndex) => itemIndex === index ? { ...check, label } : check));
  };

  const updateChecklistContent = (index: number, content: string) => {
    setEditableChecklist((items) => items.map((check, itemIndex) => itemIndex === index ? { ...check, content } : check));
  };

  const updateChecklistScore = (index: number, score: number) => {
    setEditableChecklist((items) => items.map((check, itemIndex) => {
      if (itemIndex !== index) return check;
      const maxScore = check.maxScore ?? 20;
      const nextScore = Math.max(0, Math.min(maxScore, Number.isFinite(score) ? score : 0));
      return { ...check, score: nextScore, checked: nextScore > 0 };
    }));
  };

  const updateChecklistRating = (index: number, rating: ChecklistRating) => {
    setEditableChecklist((items) => items.map((check, itemIndex) => itemIndex === index ? { ...check, checked: true, rating } : check));
  };

  const updateChecklistNote = (index: number, note: string) => {
    setEditableChecklist((items) => items.map((check, itemIndex) => itemIndex === index ? { ...check, note } : check));
  };

  const addChecklistRow = () => {
    setEditableChecklist((items) => [...items, isContractorManagement
      ? { label: "새 항목", content: "", maxScore: 20, score: 0, checked: false, rating: "", note: "" }
      : { label: "새 평가 항목", checked: false, rating: "", note: "" }
    ]);
  };

  const removeChecklistRow = (index: number) => {
    setEditableChecklist((items) => items.filter((_, itemIndex) => itemIndex !== index));
  };

  const completeChecklistStep = () => {
    keepOpinionStepAfterSaveRef.current = true;
    if (selectedTarget) {
      setHistories((items) => items.map((history) => history.id === selectedHistory.id
        ? {
            ...history,
            targets: history.targets.map((target) => target.id === selectedTarget.id
              ? { ...target, checklist: editableChecklist.map((check) => ({ ...check, checked: isContractorManagement ? (check.score ?? 0) > 0 : Boolean(check.rating) })) }
              : target
            ),
          }
        : history
      ));
    }
    setActiveStep("OPINION");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-7xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-black tracking-[0.14em] text-[#00a099]">GOVERNANCE MANAGEMENT</p>
            <h3 className="mt-1 text-2xl font-black text-slate-950">{config.title}</h3>
            <p className="mt-1 text-sm font-bold text-slate-500">{config.subtitle}</p>
            <p className="mt-2 text-sm text-slate-500">{config.description}</p>
          </div>
          <button onClick={onClose} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-black text-slate-500 transition hover:bg-slate-100 hover:text-slate-800">
            닫기
          </button>
        </div>

        <div className={`grid h-[calc(92vh-132px)] overflow-hidden ${selectedTarget ? "lg:grid-cols-[260px_minmax(0,1fr)]" : "lg:grid-cols-[330px_minmax(0,1fr)]"}`}>
          <aside className="overflow-y-auto border-r border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-slate-400">년도별 상·하반기 이력</p>
                <p className="text-sm font-black text-slate-800">{histories.length}개 평가 이력</p>
              </div>
              {canEvaluate && (
                <button
                  onClick={() => {
                    setIsNewFormOpen((open) => !open);
                    setNewFormError("");
                  }}
                  className="rounded-lg bg-[#00b7af] px-3 py-2 text-xs font-black text-white shadow-sm"
                >
                  신규 평가
                </button>
              )}
            </div>
            {canEvaluate && isNewFormOpen && (
              <div className="mb-4 rounded-2xl border border-teal-100 bg-white p-3 shadow-sm">
                <p className="text-xs font-black text-[#00a099]">신규 평가 생성</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <label className="text-[10px] font-black text-slate-400">
                    년도
                    <select value={newYear} onChange={(event) => setNewYear(Number(event.target.value))} className="mt-1 h-9 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs font-black text-slate-700 outline-none focus:border-[#00b7af]">
                      {[2024, 2025, 2026, 2027, 2028].map((yearOption) => <option key={yearOption} value={yearOption}>{yearOption}년</option>)}
                    </select>
                  </label>
                  <label className="text-[10px] font-black text-slate-400">
                    평가 구분
                    <select value={newHalf} onChange={(event) => setNewHalf(event.target.value as EvaluationHistory["half"])} className="mt-1 h-9 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs font-black text-slate-700 outline-none focus:border-[#00b7af]">
                      <option value="상반기">상반기</option>
                      <option value="하반기">하반기</option>
                    </select>
                  </label>
                </div>
                {newFormError && <p className="mt-2 rounded-lg bg-rose-50 px-2 py-1.5 text-[11px] font-bold text-rose-600">{newFormError}</p>}
                <div className="mt-3 flex justify-end gap-2">
                  <button onClick={() => setIsNewFormOpen(false)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-500 transition hover:bg-slate-50">취소</button>
                  <button onClick={createHistory} className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-black text-white transition hover:bg-[#00a099]">생성</button>
                </div>
              </div>
            )}
            <div className="space-y-2">
              {histories.map((history) => {
                const rate = history.total > 0 ? Math.round((history.completed / history.total) * 100) : 0;
                const active = history.id === selectedHistory.id;
                return (
                  <button key={history.id} onClick={() => selectHistory(history)} className={`w-full rounded-xl border p-3 text-left transition ${active ? "border-[#00b7af] bg-white shadow-sm ring-2 ring-teal-50" : "border-slate-200 bg-white hover:border-teal-200"}`}>
                    <div className="flex items-center justify-between gap-2">
                      <b className="text-sm font-black text-slate-900">{history.year}년 {history.half}</b>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ring-1 ${evaluationStatusClass(history.status)}`}>{history.status}</span>
                    </div>
                    <p className="mt-1 text-xs font-bold text-slate-400">{history.period}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-slate-100">
                        <div className="h-2 rounded-full bg-[#00b7af]" style={{ width: `${rate}%` }} />
                      </div>
                      <span className="w-9 text-right text-xs font-black text-[#008d86]">{rate}%</span>
                    </div>
                    <p className="mt-2 text-xs font-black text-slate-500">평가 {history.completed.toLocaleString()} / {history.total.toLocaleString()}명</p>
                  </button>
                );
              })}
            </div>
            {selectedTarget && (
              <div className="mt-5 rounded-2xl border border-teal-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-black tracking-[0.12em] text-[#00a099]">SELECTED TARGET</p>
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <b className="block truncate text-base font-black text-slate-950">{selectedTarget.name}</b>
                    <p className="mt-1 text-xs font-bold text-slate-500">{selectedTarget.role}</p>
                    <p className="mt-0.5 text-xs font-bold text-slate-400">{selectedTarget.department}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ring-1 ${evaluationStatusClass(evaluationStatus)}`}>{evaluationStatus}</span>
                </div>
                <div className="mt-3 grid gap-2">
                  <div className="rounded-lg bg-slate-50 px-3 py-2">
                    <p className="text-[10px] font-black text-slate-400">평가자</p>
                    <p className="mt-1 truncate text-xs font-black text-slate-700">{selectedTarget.evaluator}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedTargetId("")} className="mt-3 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-500 transition hover:bg-slate-100">
                  대상자 다시 선택
                </button>
              </div>
            )}
          </aside>

          <div className="min-w-0 overflow-y-auto p-5">
            <div className={`mb-4 rounded-2xl border px-4 py-3 text-sm font-bold ${canEvaluate ? "border-teal-100 bg-teal-50/60 text-[#008d86]" : "border-slate-200 bg-slate-50 text-slate-500"}`}>
              현재 보기: <b className="font-black">{viewerRole}</b>
              <span className="ml-2">{canEvaluate ? "평가 체크리스트 수정, 의견 작성, 완료 처리가 가능합니다." : "평가 진행상태와 완료 결과만 확인할 수 있습니다."}</span>
            </div>

            {!selectedTarget && <div className="mb-4 grid gap-3 md:grid-cols-4">
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <p className="text-xs font-bold text-slate-400">선택 평가기간</p>
                <b className="mt-1 block text-sm font-black text-slate-900">{selectedHistory.year}년 {selectedHistory.half}</b>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <p className="text-xs font-bold text-slate-400">평가대상</p>
                <b className="mt-1 block text-sm font-black text-slate-900">{selectedHistory.total.toLocaleString()}명</b>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <p className="text-xs font-bold text-slate-400">평가완료</p>
                <b className="mt-1 block text-sm font-black text-[#008d86]">{selectedHistory.completed.toLocaleString()}명</b>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <p className="text-xs font-bold text-slate-400">완료율</p>
                <b className="mt-1 block text-sm font-black text-[#008d86]">{historyRate}%</b>
              </div>
            </div>}

            <div className={`grid h-full min-h-0 gap-4 ${selectedTarget ? "xl:grid-cols-1" : "xl:grid-cols-[360px_minmax(0,1fr)]"}`}>
              {!selectedTarget && <section className="min-h-0 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-sm font-black text-slate-900">대상자 목록</h4>
                  {canEvaluate && (
                    <button
                      onClick={() => {
                        setIsAddTargetOpen((open) => !open);
                        setTargetAddError("");
                      }}
                      className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-black text-[#008d86] transition hover:bg-teal-100"
                    >
                      + 대상자 추가
                    </button>
                  )}
                </div>
                <div className="max-h-[58vh] space-y-2 overflow-y-auto pr-1">
                  {selectedHistory.targets.map((target) => (
                    <button key={target.id} onClick={() => setSelectedTargetId(target.id)} className={`w-full rounded-xl border p-3 text-left transition ${selectedTargetId === target.id ? "border-[#00b7af] bg-teal-50/40" : "border-slate-200 hover:border-teal-200"}`}>
                      <div className="flex items-center justify-between gap-2">
                        <b className="truncate text-sm font-black text-slate-900">{target.name}</b>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ring-1 ${evaluationStatusClass(target.status)}`}>{target.status}</span>
                      </div>
                      <p className="mt-1 text-xs font-bold text-slate-500">{target.role}</p>
                      <p className="mt-0.5 text-xs font-bold text-slate-400">{target.department}</p>
                    </button>
                  ))}
                </div>
              </section>}

              {!selectedTarget && (
                <section className={`min-h-[360px] rounded-2xl border ${isAddTargetOpen ? "border-slate-200 bg-white p-4" : "grid place-items-center border-dashed border-slate-200 bg-slate-50 p-8 text-center"}`}>
                  {isAddTargetOpen ? (
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-black tracking-[0.12em] text-[#00a099]">ADD TARGET</p>
                          <h4 className="mt-1 text-lg font-black text-slate-900">{item.managementType === "MANAGER_EVALUATION" ? "직원/R&R 등록자 불러오기" : "협력사 불러오기"}</h4>
                          <p className="mt-1 text-sm font-bold text-slate-400">현재 평가 이력에 추가할 대상자를 선택하세요. 이미 등록된 대상자는 중복 추가되지 않습니다.</p>
                        </div>
                        <button onClick={() => setIsAddTargetOpen(false)} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-500 transition hover:bg-slate-100">닫기</button>
                      </div>
                      {targetAddError && <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600">{targetAddError}</p>}
                      <div className="mt-4 grid max-h-[52vh] gap-2 overflow-y-auto pr-1 md:grid-cols-2">
                        {evaluationCandidates[item.managementType].map((candidate) => {
                          const alreadyAdded = selectedHistory.targets.some((target) => target.name === candidate.name && target.role === candidate.role);
                          return (
                            <button
                              key={candidate.id}
                              onClick={() => addEvaluationTarget(candidate)}
                              disabled={alreadyAdded}
                              className={`rounded-xl border p-3 text-left transition ${alreadyAdded ? "cursor-not-allowed border-slate-100 bg-slate-50 opacity-60" : "border-slate-200 bg-white hover:border-teal-200 hover:bg-teal-50/40"}`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <b className="truncate text-sm font-black text-slate-900">{candidate.name}</b>
                                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ${alreadyAdded ? "bg-slate-100 text-slate-400" : "bg-teal-50 text-[#008d86]"}`}>{alreadyAdded ? "등록됨" : "추가"}</span>
                              </div>
                              <p className="mt-1 text-xs font-bold text-slate-500">{candidate.role}</p>
                              <p className="mt-0.5 text-xs font-bold text-slate-400">{candidate.department}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg font-black text-slate-800">대상자를 선택하세요</p>
                      <p className="mt-2 text-sm font-bold text-slate-400">좌측 대상자 목록에서 사람 또는 협력업체를 선택하면 개인별 평가수행 화면이 펼쳐집니다.</p>
                    </div>
                  )}
                </section>
              )}

              {selectedTarget && (
                <section className="min-h-0 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="grid gap-3 xl:grid-cols-[minmax(220px,1fr)_minmax(320px,1.35fr)_auto] xl:items-start">
                    <div className="min-w-0">
                      <h4 className="text-lg font-black text-slate-950">{selectedTarget.name}</h4>
                      <p className="mt-1 text-sm font-bold text-slate-500">{selectedTarget.role} · {selectedTarget.department}</p>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                        <p className="text-xs font-bold text-slate-400">평가자</p>
                        <b className="mt-1 block text-sm font-black text-slate-800">{evaluatorProfile(selectedTarget.evaluator).name}</b>
                        <p className="mt-0.5 text-[11px] font-bold text-slate-400">{evaluatorProfile(selectedTarget.evaluator).position}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                        <p className="text-xs font-bold text-slate-400">체크리스트 완료율</p>
                        <b className="mt-1 block text-sm font-black text-[#008d86]">{checklistRate}%</b>
                      </div>
                    </div>
                    <span className={`justify-self-start rounded-full px-3 py-1 text-xs font-black ring-1 xl:justify-self-end ${evaluationStatusClass(evaluationStatus)}`}>{evaluationStatus}</span>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-xl border border-slate-200">
                      <button onClick={() => setActiveStep("CHECKLIST")} className="flex w-full items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-left">
                        <div>
                          <p className="text-xs font-black text-[#00a099]">STEP 1</p>
                          <p className="text-sm font-black text-slate-900">평가수행 체크리스트</p>
                          <p className="mt-0.5 text-xs font-bold text-slate-400">{canEvaluate ? "항목명을 직접 수정하고 평가 항목을 추가·삭제할 수 있습니다." : "관리자는 체크리스트 수행 결과만 확인합니다."}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-[#008d86] ring-1 ring-teal-100">{checklistRate}%</span>
                          <span className="text-xs font-black text-slate-400">{activeStep === "CHECKLIST" ? "접기" : "펼치기"}</span>
                        </div>
                      </button>
                      {activeStep === "CHECKLIST" && (
                        <div>
                          {canEvaluate && <div className="flex justify-end border-b border-slate-100 px-4 py-3">
                            <button onClick={addChecklistRow} className="rounded-lg bg-[#00b7af] px-3 py-2 text-xs font-black text-white shadow-sm transition hover:bg-[#00a099]">
                              행 추가
                            </button>
                          </div>}
                          {isContractorManagement ? (
                            <div className="overflow-x-auto p-4">
                              <table className="min-w-[980px] w-full border-separate border-spacing-0 overflow-hidden rounded-xl border border-slate-200 text-left text-xs">
                                <thead>
                                  <tr className="bg-teal-50 text-center text-slate-900">
                                    <th rowSpan={2} className="w-[170px] border-b border-r border-slate-200 px-3 py-3 font-black">항목</th>
                                    <th rowSpan={2} className="border-b border-r border-slate-200 px-3 py-3 font-black">점검내용</th>
                                    <th colSpan={2} className="w-[130px] border-b border-r border-slate-200 px-3 py-2 font-black">평가결과</th>
                                    <th rowSpan={2} className="w-[180px] border-b border-r border-slate-200 px-3 py-3 font-black">평가내용</th>
                                    <th rowSpan={2} className="w-12 border-b border-slate-200 px-3 py-3 font-black">삭제</th>
                                  </tr>
                                  <tr className="bg-teal-50 text-center text-slate-900">
                                    <th className="border-b border-r border-slate-200 px-3 py-2 font-black">배점</th>
                                    <th className="border-b border-r border-slate-200 px-3 py-2 font-black">점수</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {editableChecklist.map((check, index) => (
                                    <tr key={`${selectedTarget.id}-contractor-check-${index}`} className="bg-white">
                                      <td className="border-b border-r border-slate-200 px-2 py-2 align-middle">
                                        <input
                                          value={check.label}
                                          onChange={(event) => updateChecklistLabel(index, event.target.value)}
                                          readOnly={!canEvaluate}
                                          className={`w-full rounded-md border border-transparent px-2 py-1.5 text-xs font-black text-slate-700 outline-none transition ${canEvaluate ? "bg-white focus:border-[#00b7af] focus:ring-2 focus:ring-teal-100" : "bg-transparent"}`}
                                          placeholder="항목"
                                        />
                                      </td>
                                      <td className="border-b border-r border-slate-200 px-2 py-2 align-middle">
                                        <textarea
                                          value={check.content ?? ""}
                                          onChange={(event) => updateChecklistContent(index, event.target.value)}
                                          readOnly={!canEvaluate}
                                          rows={2}
                                          className={`w-full resize-none rounded-md border border-transparent px-2 py-1.5 text-xs font-bold leading-5 text-slate-600 outline-none transition ${canEvaluate ? "bg-white focus:border-[#00b7af] focus:ring-2 focus:ring-teal-100" : "bg-transparent"}`}
                                          placeholder="점검내용"
                                        />
                                      </td>
                                      <td className="border-b border-r border-slate-200 px-2 py-2 align-middle text-center">
                                        <input
                                          value={check.maxScore ?? 20}
                                          readOnly
                                          className="mx-auto h-9 w-11 rounded-md border border-slate-200 bg-white text-center text-xs font-black text-slate-700 outline-none"
                                          aria-label="배점"
                                        />
                                      </td>
                                      <td className="border-b border-r border-slate-200 px-2 py-2 align-middle text-center">
                                        <input
                                          type="number"
                                          min={0}
                                          max={check.maxScore ?? 20}
                                          value={check.score ?? 0}
                                          onChange={(event) => updateChecklistScore(index, Number(event.target.value))}
                                          readOnly={!canEvaluate}
                                          className={`mx-auto h-9 w-11 rounded-md border border-slate-200 text-center text-xs font-black text-slate-700 outline-none transition ${canEvaluate ? "bg-white focus:border-[#00b7af] focus:ring-2 focus:ring-teal-100" : "bg-slate-50"}`}
                                          aria-label="점수"
                                        />
                                      </td>
                                      <td className="border-b border-r border-slate-200 px-2 py-2 align-middle">
                                        <input
                                          value={check.note ?? ""}
                                          onChange={(event) => updateChecklistNote(index, event.target.value)}
                                          readOnly={!canEvaluate}
                                          className={`h-9 w-full rounded-md border border-slate-200 px-2 text-xs font-medium text-slate-600 outline-none transition ${canEvaluate ? "bg-white focus:border-[#00b7af] focus:ring-2 focus:ring-teal-100" : "bg-slate-50"}`}
                                          placeholder="평가내용"
                                        />
                                      </td>
                                      <td className="border-b border-slate-200 px-2 py-2 text-center align-middle">
                                        {canEvaluate ? (
                                          <button
                                            onClick={() => removeChecklistRow(index)}
                                            className="grid h-8 w-8 place-items-center rounded-md text-lg font-light text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
                                            aria-label="평가 항목 삭제"
                                          >
                                            ×
                                          </button>
                                        ) : (
                                          <span className="text-slate-300">-</span>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                  {editableChecklist.length === 0 && (
                                    <tr>
                                      <td colSpan={6} className="bg-white px-4 py-6 text-center text-sm font-bold text-slate-400">
                                        체크리스트 항목이 없습니다. 행 추가 버튼으로 평가 항목을 추가하세요.
                                      </td>
                                    </tr>
                                  )}
                                  <tr className="bg-slate-50 text-center text-sm font-black text-slate-950">
                                    <td colSpan={2} className="border-r border-slate-200 px-3 py-3">합계</td>
                                    <td className="border-r border-slate-200 px-3 py-3">{totalMaxScore.toLocaleString()}</td>
                                    <td className="border-r border-slate-200 px-3 py-3">{totalScore.toLocaleString()}</td>
                                    <td className="border-r border-slate-200 px-3 py-3" />
                                    <td className="px-3 py-3" />
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className="divide-y divide-slate-100">
                              {editableChecklist.map((check, index) => (
                                <div key={`${selectedTarget.id}-check-${index}`} className="grid gap-2 px-4 py-3 xl:grid-cols-[minmax(240px,1fr)_auto_minmax(180px,0.55fr)_auto] xl:items-center">
                                  <input
                                    value={check.label}
                                    onChange={(event) => updateChecklistLabel(index, event.target.value)}
                                    readOnly={!canEvaluate}
                                    className={`min-w-0 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 outline-none transition ${canEvaluate ? "bg-white focus:border-[#00b7af] focus:ring-2 focus:ring-teal-100" : "bg-slate-50"}`}
                                    placeholder="평가 항목을 입력하세요"
                                  />
                                  <div className="flex gap-1 rounded-xl bg-slate-50 p-1 ring-1 ring-slate-100">
                                    {(["우수", "양호", "보통", "미흡"] as ChecklistRating[]).map((rating) => (
                                      <button
                                        key={rating}
                                        type="button"
                                        onClick={() => canEvaluate && updateChecklistRating(index, rating)}
                                        disabled={!canEvaluate}
                                        className={`rounded-lg px-3 py-1.5 text-xs font-black transition ${check.rating === rating
                                          ? rating === "우수"
                                            ? "bg-emerald-600 text-white shadow-sm"
                                            : rating === "양호"
                                              ? "bg-emerald-400 text-white shadow-sm"
                                              : rating === "보통"
                                                ? "bg-amber-400 text-white shadow-sm"
                                                : "bg-rose-500 text-white shadow-sm"
                                          : "bg-white text-slate-500 ring-1 ring-slate-200"} ${canEvaluate ? "hover:bg-teal-50 hover:text-[#008d86]" : "cursor-default opacity-80"}`}
                                      >
                                        {rating}
                                      </button>
                                    ))}
                                  </div>
                                  <input
                                    value={check.note ?? ""}
                                    onChange={(event) => updateChecklistNote(index, event.target.value)}
                                    readOnly={!canEvaluate}
                                    className={`min-w-0 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 outline-none transition ${canEvaluate ? "bg-white focus:border-[#00b7af] focus:ring-2 focus:ring-teal-100" : "bg-slate-50"}`}
                                    placeholder="비고를 입력하세요"
                                  />
                                  {canEvaluate ? <button
                                    onClick={() => removeChecklistRow(index)}
                                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                                  >
                                    삭제
                                  </button> : <span className="rounded-lg bg-slate-50 px-3 py-2 text-center text-xs font-black text-slate-400">확인</span>}
                                </div>
                              ))}
                              {editableChecklist.length === 0 && (
                                <div className="px-4 py-6 text-center text-sm font-bold text-slate-400">
                                  체크리스트 항목이 없습니다. 행 추가 버튼으로 평가 항목을 추가하세요.
                                </div>
                              )}
                            </div>
                          )}
                          {canEvaluate && <div className="flex justify-end border-t border-slate-100 px-4 py-3">
                            <button onClick={completeChecklistStep} className="rounded-lg bg-slate-950 px-4 py-2 text-xs font-black text-white transition hover:bg-[#00a099]">
                              체크리스트 입력 완료
                            </button>
                          </div>}
                        </div>
                      )}
                    </div>

                    <div ref={opinionStepRef} className="scroll-mt-4 rounded-xl border border-slate-200 bg-white">
                      <button onClick={() => setActiveStep("OPINION")} className="flex w-full items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-left">
                        <div>
                          <p className="text-xs font-black text-[#00a099]">STEP 2</p>
                          <p className="text-sm font-black text-slate-900">평가의견</p>
                          <p className="mt-0.5 text-xs font-bold text-slate-400">{canEvaluate ? "체크리스트 검토 후 평가 의견을 남기고 완료 처리합니다." : "관리자는 등록된 평가 의견과 처리 상태를 확인합니다."}</p>
                        </div>
                        <span className="text-xs font-black text-slate-400">{activeStep === "OPINION" ? "접기" : "펼치기"}</span>
                      </button>
                      {activeStep === "OPINION" && (
                        <div className="p-4">
                          <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div>
                                <p className="text-xs font-black text-slate-400">최종평가</p>
                                <p className="mt-1 text-sm font-bold text-slate-500">
                                  체크리스트 등급 평균으로 자동 계산되며, 필요 시 직접 수정할 수 있습니다.
                                </p>
                              </div>
                              <div className="flex gap-1 rounded-xl bg-white p-1 ring-1 ring-slate-200">
                                {(["우수", "양호", "보통", "미흡"] as ChecklistRating[]).map((rating) => (
                                  <button
                                    key={rating}
                                    type="button"
                                    onClick={() => {
                                      if (!canEvaluate) return;
                                      setFinalRating(rating);
                                      setIsFinalRatingEdited(true);
                                    }}
                                    disabled={!canEvaluate}
                                    className={`rounded-lg px-3 py-1.5 text-xs font-black transition ${checklistRatingClass(rating, finalRating === rating)} ${canEvaluate ? "hover:bg-teal-50 hover:text-[#008d86]" : "cursor-default opacity-80"}`}
                                  >
                                    {rating}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <textarea readOnly={!canEvaluate} className={`min-h-40 w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition ${canEvaluate ? "bg-white focus:border-[#00b7af] focus:ring-2 focus:ring-teal-100" : "bg-slate-50"}`} defaultValue={selectedTarget.status === "평가완료" ? "평가 기준을 충족했으며 증빙자료가 등록되었습니다." : "평가 진행 현황을 확인 중입니다."} placeholder="평가 의견과 보완 필요사항을 입력하세요." />
                          {canEvaluate ? <div className="mt-3 flex justify-end gap-2">
                            <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-500 transition hover:bg-slate-100">임시저장</button>
                            <button
                              onClick={() => setEvaluationStatus((status) => status === "평가완료" ? "진행중" : "평가완료")}
                              className={`rounded-lg px-3 py-2 text-xs font-black shadow-sm transition ${evaluationStatus === "평가완료" ? "border border-slate-200 bg-white text-slate-500 hover:bg-slate-100" : "bg-[#00b7af] text-white hover:bg-[#00a099]"}`}
                            >
                              {evaluationStatus === "평가완료" ? "평가완료 해제" : "평가완료 처리"}
                            </button>
                          </div> : <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-black text-slate-500">읽기 전용 화면입니다. 평가 처리는 현장소장 계정에서만 가능합니다.</div>}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DutyCards({ dutyStats, viewerRole }: { dutyStats: Array<LegalDuty & { cards: Array<SafetyCard & { target: number; actual: number; rate: number; status: DutyStatus }>; target: number; actual: number; evidence: number; rate: number; status: DutyStatus }>; viewerRole: ViewerRole }) {
  const [selectedManagementItem, setSelectedManagementItem] = useState<(GovernanceItem & { managementType: GovernanceManagementType }) | null>(null);

  return (
    <section id="legal-duty-status" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black tracking-[0.14em] text-[#00a099]">SECTION 2</p>
          <h2 className="mt-1 text-xl font-black text-slate-900">안전 및 보건확보 의무 이행 자율점검 현황</h2>
          <p className="mt-1 text-sm text-slate-500">7개 법정 이행 항목에 대한 안전카드 문서와 수행 기록을 자동 집계합니다.</p>
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
                  <StatusBadge status={duty.status} />
                </div>
                <p className="mt-2 pl-10 text-sm text-slate-500">{duty.title}</p>
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-bold text-slate-400">안전 경영체계(Governance) 이행사항 별도관리 항목</p>
                    <b className="text-sm font-black text-slate-800">{duty.governanceItems.length}건</b>
                  </div>
                  {duty.governanceItems.length > 0 ? (
                    <div className="mt-3 grid gap-3">
                      {duty.governanceItems.map((item) => (
                        <div key={item.id} className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-xs font-black text-slate-800">{item.title}</p>
                                <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-black text-[#008d86] ring-1 ring-teal-100">{item.badge}</span>
                              </div>
                              <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-500">{item.description}</p>
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                              <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ring-1 ${governanceStatusClass(item.status)}`}>{item.status}</span>
                              <button
                                onClick={() => {
                                  if (item.id === "safety-org") {
                                    window.location.href = "/org-chart";
                                    return;
                                  }
                                  if (item.id === "safety-budget") {
                                    window.location.href = "https://safety-budget.vercel.app/";
                                    return;
                                  }
                                  if (item.managementType) {
                                    setSelectedManagementItem(item as GovernanceItem & { managementType: GovernanceManagementType });
                                  }
                                }}
                                className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-black text-[#008d86] transition hover:bg-teal-100"
                              >
                                관리
                              </button>
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-3 gap-2">
                            {item.metrics.map((metric) => (
                              <div key={`${item.id}-${metric.label}`} className={`min-w-0 rounded-lg px-3 py-2 ring-1 ${governanceMetricClass(metric.tone)}`}>
                                <p className="truncate text-[10px] font-black text-slate-400" title={metric.label}>{metric.label}</p>
                                <p className="mt-1 truncate text-sm font-black" title={metric.value}>{metric.value}</p>
                                {metric.caption && <p className="mt-0.5 truncate text-[10px] font-bold text-slate-400" title={metric.caption}>{metric.caption}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-400 ring-1 ring-slate-100">추가 관리 항목 없음</p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-700">연결 안전카드 {duty.cards.length}개 · 증빙 {duty.evidence.toLocaleString()}건</p>
                    <p className="mt-0.5 text-xs font-bold text-slate-400">전체 표시</p>
                  </div>
                  <div className="flex min-w-[180px] items-center gap-3">
                    <p className="shrink-0 text-xs font-black text-slate-500">달성률</p>
                    <div className="h-2.5 min-w-0 flex-1 rounded-full bg-slate-100">
                      <div className="h-2.5 rounded-full bg-[#00b7af]" style={{ width: `${duty.rate}%` }} />
                    </div>
                    <b className="w-11 shrink-0 text-right text-lg font-black text-[#008d86]">{duty.rate}%</b>
                  </div>
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
      {selectedManagementItem && (
        <GovernanceManagementModal key={selectedManagementItem.id} item={selectedManagementItem} viewerRole={viewerRole} onClose={() => setSelectedManagementItem(null)} />
      )}
    </section>
  );
}

function InspectionReportPeriodModal({ initialPeriod, onCancel, onConfirm }: { initialPeriod: Period; onCancel: () => void; onConfirm: (period: Period) => void }) {
  const [mode, setMode] = useState<PeriodMode>(initialPeriod.mode);
  const [year, setYear] = useState(initialPeriod.year);
  const [half, setHalf] = useState<"H1" | "H2">(initialPeriod.half);
  const [month, setMonth] = useState(initialPeriod.month);
  const reportPeriod = useMemo(() => getPeriod(mode, year, half, month), [mode, year, half, month]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
        <div className="border-b border-slate-200 px-6 py-5">
          <p className="text-xs font-black tracking-[0.14em] text-[#00a099]">SAFEBUDDY REPORT</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">보고서 기간 선택</h3>
          <p className="mt-1 text-sm font-bold text-slate-500">선택한 기간의 대시보드 데이터를 보고서 기본값으로 불러옵니다.</p>
        </div>
        <div className="p-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <select value={year} onChange={(event) => setYear(Number(event.target.value))} className="control-select">
                {[2024, 2025, 2026, 2027, 2028].map((value) => <option key={value} value={value}>{value}년</option>)}
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
                  {Array.from({ length: 11 }, (_, index) => index + 1).map((value) => <option key={value} value={value}>1월~{value}월</option>)}
                </select>
              )}
            </div>
            <div className="mt-4 rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-sm font-bold text-teal-800">{reportPeriod.rangeLabel}</div>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={onCancel} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-500 transition hover:bg-slate-50">취소</button>
            <button onClick={() => onConfirm(reportPeriod)} className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#00a099]">안전카드 생성</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InspectionReportModal({ reportPeriod, onClose }: { reportPeriod: Period; onClose: () => void }) {
  const defaults = useMemo(() => buildReportDefaults(reportPeriod), [reportPeriod]);
  const [overview, setOverview] = useState<WorkplaceOverview>(defaults.overview);
  const [improvementNotes, setImprovementNotes] = useState(defaults.improvementNotes);
  const [governanceRows, setGovernanceRows] = useState<GovernanceReportRow[]>(defaults.governanceRows);
  const [safetyRows, setSafetyRows] = useState<SafetyCardReportRow[]>(defaults.safetyRows);
  const [historyPickerRow, setHistoryPickerRow] = useState<GovernanceReportRow | null>(null);

  const dutyGroups = useMemo(() => legalDuties.map((duty) => {
    const governance = governanceRows.filter((row) => row.dutyId === duty.id);
    const safetyCardsForDuty = safetyRows.filter((row) => row.dutyId === duty.id);
    const governanceScores = governance.filter((row) => !row.excluded).map((row) => row.score);
    const cardScores = safetyCardsForDuty.map((row) => row.rate);
    const scores = [...governanceScores, ...cardScores];
    const score = scores.length > 0 ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length) : 0;
    return {
      dutyId: duty.id,
      label: `${duty.number} ${duty.shortTitle}`,
      title: duty.title,
      score,
      result: score >= 60 ? "예" : "보완",
      grade: reportGrade(score),
      governance,
      safetyCards: safetyCardsForDuty,
    };
  }), [governanceRows, safetyRows]);

  const totalScore = dutyGroups.length > 0 ? Math.round(dutyGroups.reduce((sum, row) => sum + row.score, 0) / dutyGroups.length) : 0;

  const updateOverview = (key: keyof WorkplaceOverview, value: string) => {
    setOverview((item) => ({ ...item, [key]: value }));
  };

  const updateGovernanceRow = (id: string, key: keyof GovernanceReportRow, value: string | number | boolean) => {
    setGovernanceRows((items) => items.map((row) => {
      if (row.id !== id) return row;
      if (key === "score") {
        const score = Math.max(0, Math.min(100, Number(value) || 0));
        return { ...row, score, grade: reportGrade(score) };
      }
      return { ...row, [key]: value } as GovernanceReportRow;
    }));
  };

  const applyEvaluationHistory = (rowId: string, option: ReturnType<typeof getEvaluationHistoryOptions>[number]) => {
    setGovernanceRows((items) => items.map((row) => {
      if (row.id !== rowId) return row;
      const score = Math.max(0, Math.min(100, option.score));
      return {
        ...row,
        score,
        grade: reportGrade(score),
        result: `${option.completed}/${option.total} 평가완료`,
        evidence: `${option.label} 평가 데이터 · ${option.period}`,
        sourceHistoryId: option.id,
        sourceHistoryLabel: option.label,
        excluded: false,
      };
    }));
    setHistoryPickerRow(null);
  };

  const updateSafetyRow = (id: string, key: keyof SafetyCardReportRow, value: string | number) => {
    setSafetyRows((items) => items.map((row) => {
      if (row.id !== id) return row;
      const next = { ...row, [key]: value } as SafetyCardReportRow;
      if (key === "target" || key === "actual") {
        const target = Math.max(0, Number(next.target) || 0);
        const actual = Math.max(0, Number(next.actual) || 0);
        next.target = target;
        next.actual = actual;
        next.rate = getRate(actual, target);
        next.status = getStatus(actual, target);
      }
      if (key === "evidence") {
        next.evidence = Math.max(0, Number(value) || 0);
      }
      if (key === "rate") {
        next.rate = Math.max(0, Math.min(100, Number(value) || 0));
      }
      return next;
    }));
  };

  const toggleSafetyQuarter = (id: string, quarterIndex: number) => {
    setSafetyRows((items) => items.map((row) => {
      if (row.id !== id) return row;
      const quarters = [...row.quarters];
      quarters[quarterIndex] = !quarters[quarterIndex];
      return { ...row, quarters };
    }));
  };

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="flex max-h-[94vh] w-full max-w-[1500px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-black tracking-[0.14em] text-[#00a099]">SAFEBUDDY REPORT</p>
            <h3 className="mt-1 text-2xl font-black text-slate-950">중처법 이행점검 보고서 만들기</h3>
            <p className="mt-1 text-sm font-bold text-slate-500">{reportPeriod.rangeLabel}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => window.print()} className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#00a099]">인쇄</button>
            <button onClick={onClose} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-black text-slate-500 transition hover:bg-slate-100 hover:text-slate-800">닫기</button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-[#f5f8f9] p-5">
          <section className="rounded-2xl border border-teal-100 bg-teal-50 p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black tracking-[0.14em] text-[#00a099]">고정 보고기간</p>
                <h4 className="mt-1 text-lg font-black text-slate-950">{reportPeriod.label}</h4>
                <p className="mt-1 text-sm font-bold text-teal-800">{reportPeriod.rangeLabel}</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#008d86] ring-1 ring-teal-100">기간 변경 불가</span>
            </div>
          </section>

          <div className="mt-5 space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-black tracking-[0.14em] text-[#00a099]">SECTION 1</p>
              <h4 className="mt-1 text-lg font-black text-slate-950">사업장 개요</h4>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {[
                  ["siteName", "현장명"],
                  ["title", "제목"],
                  ["address", "사업장주소"],
                  ["industry", "주업종"],
                  ["employeeCount", "상시근로자 수"],
                  ["siteType", "사업장유형"],
                  ["client", "발주처"],
                  ["confirmer", "확인자"],
                  ["confirmationDate", "확인일"],
                ].map(([key, label]) => (
                  <label key={key} className={key === "title" || key === "address" ? "md:col-span-2 text-xs font-black text-slate-400" : "text-xs font-black text-slate-400"}>
                    {label}
                    <input value={overview[key as keyof WorkplaceOverview]} onChange={(event) => updateOverview(key as keyof WorkplaceOverview, event.target.value)} className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 outline-none focus:border-[#00b7af] focus:ring-2 focus:ring-teal-100" />
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-black tracking-[0.14em] text-[#00a099]">SECTION 2</p>
                  <h4 className="mt-1 text-lg font-black text-slate-950">주요 개선사항 및 점검항목 집계</h4>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-400">총점</p>
                  <b className="text-3xl font-black text-[#008d86]">{totalScore}점</b>
                </div>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(380px,1.05fr)_minmax(0,0.95fr)]">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-2 text-xs font-black text-slate-500">점검항목별 집계 점수</p>
                  <div className="grid gap-2 md:grid-cols-2">
                    {dutyGroups.map((group) => (
                      <div key={`${group.dutyId}-section2-summary`} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="min-w-0 truncate text-xs font-black text-slate-700" title={group.label}>{group.label}</p>
                          <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-slate-500 ring-1 ring-slate-200">{group.grade}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-2 flex-1 rounded-full bg-slate-100">
                            <div className="h-2 rounded-full bg-[#00b7af]" style={{ width: `${group.score}%` }} />
                          </div>
                          <b className="w-10 text-right text-sm font-black text-[#008d86]">{group.score}</b>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-2 text-xs font-black text-slate-500">주요 개선사항</p>
                  <textarea value={improvementNotes} onChange={(event) => setImprovementNotes(event.target.value)} className="min-h-56 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-[#00b7af] focus:ring-2 focus:ring-teal-100" />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-black tracking-[0.14em] text-[#00a099]">SECTION 3</p>
                  <h4 className="mt-1 text-lg font-black text-slate-950">이행점검 점수표</h4>
                </div>
              </div>
              <div className="mt-4 grid gap-3">
                {dutyGroups.map((group) => (
                  <article key={group.dutyId} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-black text-slate-900">{group.label}</p>
                        <p className="mt-1 text-xs font-bold text-slate-400">{group.title}</p>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 ring-1 ring-slate-100">
                        <div className="h-2 w-28 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-[#00b7af]" style={{ width: `${group.score}%` }} /></div>
                        <b className="text-lg font-black text-[#008d86]">{group.score}점</b>
                        <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-black text-[#008d86] ring-1 ring-teal-100">{group.grade}</span>
                        <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-slate-500 ring-1 ring-slate-200">{group.result}</span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-xs font-black text-[#00a099]">거버넌스 평가결과</p>
                          <span className="text-[10px] font-black text-slate-400">{group.governance.length}건</span>
                        </div>
                        <div className="space-y-2">
                          {false && (<div className="grid min-w-[1120px] gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center text-[10px] font-black text-slate-500 xl:grid-cols-[minmax(260px,1.15fr)_132px_minmax(260px,1fr)_128px_150px_minmax(190px,0.75fr)]">
                            <span>안전카드</span>
                            <span>추진일정(분기)</span>
                            <span>목표 / 실적 / 달성 / 증빙</span>
                            <span>담당부서</span>
                            <span>예산</span>
                            <span>상태</span>
                          </div>)}
                          {group.governance.length > 0 ? group.governance.map((row) => (
                            <div key={row.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                              <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_72px]">
                                <input value={row.itemTitle} onChange={(event) => updateGovernanceRow(row.id, "itemTitle", event.target.value)} className="h-9 min-w-0 rounded-lg border border-slate-200 bg-white px-2 text-xs font-black text-slate-800 outline-none focus:border-[#00b7af]" />
                                <input type="number" min={0} max={100} value={row.score} onChange={(event) => updateGovernanceRow(row.id, "score", Number(event.target.value))} className="h-9 rounded-lg border border-slate-200 bg-white text-center text-xs font-black text-[#008d86] outline-none focus:border-[#00b7af]" />
                              </div>
                              {row.managementType && (
                                <div className="mt-2 flex flex-wrap items-center gap-2 rounded-xl border border-teal-100 bg-white px-3 py-2">
                                  <button
                                    type="button"
                                    onClick={() => setHistoryPickerRow(row)}
                                    disabled={row.excluded}
                                    className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-black text-[#008d86] transition hover:bg-teal-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400"
                                  >
                                    평가 데이터 선택
                                  </button>
                                  <span className="min-w-0 flex-1 truncate text-xs font-bold text-slate-500">{row.excluded ? "평가 미대상으로 집계 제외" : row.sourceHistoryLabel ?? "선택된 평가 데이터 없음"}</span>
                                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-black text-slate-500 ring-1 ring-slate-200">
                                    <input type="checkbox" checked={Boolean(row.excluded)} onChange={(event) => updateGovernanceRow(row.id, "excluded", event.target.checked)} className="h-4 w-4 accent-[#00b7af]" />
                                    평가 미대상
                                  </label>
                                </div>
                              )}
                              <div className="mt-2 grid gap-2 md:grid-cols-3">
                                <input value={row.result} onChange={(event) => updateGovernanceRow(row.id, "result", event.target.value)} className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-600 outline-none focus:border-[#00b7af]" />
                                <input value={row.grade} onChange={(event) => updateGovernanceRow(row.id, "grade", event.target.value)} className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-600 outline-none focus:border-[#00b7af]" />
                                <input value={row.evidence} onChange={(event) => updateGovernanceRow(row.id, "evidence", event.target.value)} className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-600 outline-none focus:border-[#00b7af]" />
                              </div>
                            </div>
                          )) : (
                            <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold text-slate-400">거버넌스 평가 항목 없음</p>
                          )}
                        </div>
                      </div>
                      <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-xs font-black text-[#00a099]">안전카드 실적</p>
                          <span className="text-[10px] font-black text-slate-400">{group.safetyCards.length}개</span>
                        </div>
                        <div className="space-y-2 overflow-x-auto">
                          <div className="grid min-w-[1040px] gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center text-[10px] font-black text-slate-500 xl:grid-cols-[minmax(210px,0.95fr)_132px_minmax(280px,1.12fr)_140px_160px_minmax(190px,0.75fr)]">
                            <span>안전카드</span>
                            <span>추진일정(분기)</span>
                            <span>목표 / 실적 / 달성 / 증빙</span>
                            <span>담당부서</span>
                            <span>예산</span>
                            <span>상태</span>
                          </div>
                          {group.safetyCards.length > 0 ? group.safetyCards.map((row) => (
                            <div key={row.id} className="min-w-0 rounded-lg bg-white px-3 py-2.5 text-xs ring-1 ring-slate-100">
                              <div className="grid min-w-[1040px] gap-2 xl:grid-cols-[minmax(210px,0.95fr)_132px_minmax(280px,1.12fr)_140px_160px_minmax(190px,0.75fr)] xl:items-center">
                                <div className="min-w-0 px-1">
                                  <span className="block min-w-0 truncate text-[10px] font-black text-slate-400" title={row.category}>{row.category}</span>
                                  <span className="mt-0.5 block min-w-0 truncate font-black text-slate-800" title={row.name}>{row.name}</span>
                                </div>
                                <div className="flex items-center justify-center gap-1">
                                  {row.quarters.map((checked, index) => (
                                    <label key={`${row.id}-q${index}`} className="flex h-6 w-6 cursor-pointer items-center justify-center">
                                      <input type="checkbox" checked={checked} onChange={() => toggleSafetyQuarter(row.id, index)} className="peer sr-only" />
                                      <span className="flex h-6 w-6 items-center justify-center rounded-md border border-slate-300 bg-white text-[10px] font-black text-slate-400 peer-checked:border-[#00b7af] peer-checked:bg-[#00b7af] peer-checked:text-white">{index + 1}</span>
                                    </label>
                                  ))}
                                </div>
                                <div className="grid grid-cols-4 gap-1.5">
                                  <label className="text-[10px] font-black text-slate-400">목표<input type="number" value={row.target} onChange={(event) => updateSafetyRow(row.id, "target", Number(event.target.value))} className="mt-1 h-7 w-full rounded-lg border border-slate-200 bg-white text-center text-xs font-black text-slate-700 outline-none focus:border-[#00b7af]" /></label>
                                  <label className="text-[10px] font-black text-slate-400">실적<input type="number" value={row.actual} onChange={(event) => updateSafetyRow(row.id, "actual", Number(event.target.value))} className="mt-1 h-7 w-full rounded-lg border border-slate-200 bg-white text-center text-xs font-black text-slate-700 outline-none focus:border-[#00b7af]" /></label>
                                  <label className="text-[10px] font-black text-slate-400">달성<input type="number" value={row.rate} onChange={(event) => updateSafetyRow(row.id, "rate", Number(event.target.value))} className="mt-1 h-7 w-full rounded-lg border border-slate-200 bg-white text-center text-xs font-black text-[#008d86] outline-none focus:border-[#00b7af]" /></label>
                                  <label className="text-[10px] font-black text-slate-400">증빙<input type="number" value={row.evidence} onChange={(event) => updateSafetyRow(row.id, "evidence", Number(event.target.value))} className="mt-1 h-7 w-full rounded-lg border border-slate-200 bg-white text-center text-xs font-black text-slate-700 outline-none focus:border-[#00b7af]" /></label>
                                </div>
                                <label className="text-[10px] font-black text-slate-400">담당부서<input value={row.department} onChange={(event) => updateSafetyRow(row.id, "department", event.target.value)} className="mt-1 h-7 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-600 outline-none focus:border-[#00b7af]" /></label>
                                <label className="relative text-[10px] font-black text-slate-400">예산<input type="number" value={row.budget} onChange={(event) => updateSafetyRow(row.id, "budget", Number(event.target.value))} className="mt-1 h-7 w-full rounded-lg border border-slate-200 bg-white pl-2 pr-7 text-right text-xs font-bold text-slate-600 outline-none focus:border-[#00b7af]" /><span className="pointer-events-none absolute bottom-1.5 right-2 text-[10px] font-black text-slate-400">원</span></label>
                                <div className="flex min-w-0 items-center gap-2">
                                  <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black text-slate-500">{getCyclePolicy(row).label}</span>
                                  <div className="h-1.5 min-w-12 flex-1 rounded-full bg-slate-100">
                                    <div className={`h-1.5 rounded-full ${progressClass(row.status)}`} style={{ width: `${row.rate}%` }} />
                                  </div>
                                  <span className="w-8 shrink-0 text-right font-black text-[#008d86]">{row.rate}%</span>
                                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ${miniStatusClass(row.status)}`}>{row.status === "해당없음" ? "목표없음" : row.status}</span>
                                </div>
                              </div>
                            </div>
                          )) : (
                            <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold text-slate-400">연결 안전카드 없음</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
    {historyPickerRow?.managementType && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
        <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
          <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-6 py-5">
            <div>
              <p className="text-xs font-black tracking-[0.14em] text-[#00a099]">EVALUATION DATA</p>
              <h4 className="mt-1 text-xl font-black text-slate-950">반기별 평가 데이터 선택</h4>
              <p className="mt-1 text-sm font-bold text-slate-500">{historyPickerRow.itemTitle}</p>
            </div>
            <button onClick={() => setHistoryPickerRow(null)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-black text-slate-500 transition hover:bg-slate-100">닫기</button>
          </div>
          <div className="max-h-[64vh] overflow-y-auto p-5">
            <div className="grid gap-2">
              {getEvaluationHistoryOptions(historyPickerRow.managementType, reportPeriod.year).map((option) => (
                <button
                  key={`${historyPickerRow.id}-${option.id}`}
                  type="button"
                  onClick={() => applyEvaluationHistory(historyPickerRow.id, option)}
                  className={`rounded-xl border p-4 text-left transition hover:border-[#00b7af] hover:bg-teal-50/40 ${historyPickerRow.sourceHistoryId === option.id ? "border-[#00b7af] bg-teal-50/50" : "border-slate-200 bg-white"}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-900">{option.label}</p>
                      <p className="mt-1 text-xs font-bold text-slate-400">{option.period}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-black text-slate-600 ring-1 ring-slate-200">{option.completed}/{option.total}</span>
                      <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-black text-[#008d86] ring-1 ring-teal-100">{option.score}점</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

function SafetyCardTable({ rows, period }: { rows: Array<SafetyCard & { duty: LegalDuty; target: number; actual: number; rate: number; status: DutyStatus }>; period: Period }) {
  return (
    <section id="safety-card-detail" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black tracking-[0.14em] text-[#00a099]">SECTION 3</p>
          <h2 className="mt-1 text-xl font-black text-slate-900">안전카드별 세부추진 목표 / 현황</h2>
          <p className="mt-1 text-sm text-slate-500">세이프버디 안전카드 목록을 법정 이행 항목에 연결해 목표와 실적을 확인합니다.</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[1180px] w-full border-separate border-spacing-0 text-left">
          <thead>
            <tr className="text-xs text-slate-500">
              {["안전 및 보건확보 의무 이행 자율점검 현황", "문서명(안전카드)", "목표주기", `목표(${period.label})`, "실적(누계)", "달성률", "상태", "작성"].map((head) => (
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
                <td className="border-b border-slate-100 px-4 py-3 align-top text-sm font-black text-slate-800">{row.target > 0 ? `${row.target.toLocaleString()}건` : ""}</td>
                <td className="border-b border-slate-100 px-4 py-3 align-top text-sm font-black text-slate-800">{row.actual.toLocaleString()}건</td>
                <td className="border-b border-slate-100 px-4 py-3 align-top">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-[#00b7af]" style={{ width: `${row.rate}%` }} /></div>
                    <b className="text-xs text-slate-700">{row.rate}%</b>
                  </div>
                </td>
                <td className="border-b border-slate-100 px-4 py-3 align-top"><StatusBadge status={row.status} /></td>
                <td className="border-b border-slate-100 px-4 py-3 align-top">
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-black text-slate-500 transition-all duration-200 ease-out hover:border-[#00b7af] hover:bg-[#00b7af] hover:text-white hover:shadow-sm">
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
  const [viewerRole, setViewerRole] = useState<ViewerRole>("현장소장");
  const [isReportPeriodModalOpen, setIsReportPeriodModalOpen] = useState(false);
  const [selectedReportPeriod, setSelectedReportPeriod] = useState<Period | null>(null);
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
    <div className="safebuddy-console min-h-screen bg-[#f5f8f9] text-slate-900">
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur lg:px-8">
            <div className="mx-auto flex max-w-[1540px] items-center justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-xs font-black text-[#00a099]"><IconShieldCheck size={15} />중처법 이행현황</p>
                <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950">중처법 이행현황 대시보드</h1>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <div className="mr-1 flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
                  {(["현장소장", "관리자"] as ViewerRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => setViewerRole(role)}
                      className={`rounded-lg px-3 py-2 text-xs font-black transition ${viewerRole === role ? "bg-[#00b7af] text-white shadow-sm" : "text-slate-500 hover:bg-white hover:text-slate-800"}`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
                <button className="header-action-card">
                  <span className="header-action-icon"><IconClipboardCheck size={17} /></span>
                  <span>안전보건목표 및 세부추진계획</span>
                </button>
                <button onClick={() => setIsReportPeriodModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-black text-white">
                  <IconReportAnalytics size={17} />중처법 이행점검 보고서 만들기
                </button>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1540px] space-y-6 px-5 py-6 lg:px-8">
            <Overview totalRate={totalRate} totalActual={totalActual} totalTarget={totalTarget} totalEvidence={totalEvidence} totalCards={rows.length} mode={mode} setMode={setMode} year={year} setYear={setYear} half={half} setHalf={setHalf} month={month} setMonth={setMonth} period={period} />
            <DutyCards dutyStats={dutyStats} viewerRole={viewerRole} />
            <SafetyCardTable rows={rows} period={period} />
          </div>
        </main>
      </div>
      {isReportPeriodModalOpen && (
        <InspectionReportPeriodModal
          initialPeriod={period}
          onCancel={() => setIsReportPeriodModalOpen(false)}
          onConfirm={(reportPeriod) => {
            setIsReportPeriodModalOpen(false);
            setSelectedReportPeriod(reportPeriod);
          }}
        />
      )}
      {selectedReportPeriod && <InspectionReportModal reportPeriod={selectedReportPeriod} onClose={() => setSelectedReportPeriod(null)} />}
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
