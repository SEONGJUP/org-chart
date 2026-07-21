import {
  IconActivityHeartbeat,
  IconFileAlert,
  IconFirstAidKit,
  IconGavel,
  IconMessageChatbot,
  IconMicroscope,
  IconSparkles,
} from "@tabler/icons-react";

export const BRAND = "#008C8C";
export const STORAGE_KEY = "svc-open-innovation-custom-features";

export type FeatureKind = "msds" | "law" | "risk" | "aed" | "ergonomic" | "chatbot" | "custom";

export type Feature = {
  id: string;
  title: string;
  desc: string;
  icon: typeof IconSparkles;
  tone: string;
  accent: string;
  kind: FeatureKind;
};

export type HistoryItem = {
  id: string;
  title: string;
  type: string;
  kind: FeatureKind;
  date: string;
  status: string;
  summary: string;
  detail: string;
};

export const baseFeatures: Feature[] = [
  {
    id: "msds-label",
    title: "MSDS 경고표지 만들기",
    desc: "MSDS 물질자료 업로드 후 분석, 요약, 수정, 컨펌, 경고표지 인쇄",
    icon: IconFileAlert,
    tone: "bg-red-50 text-red-700 border-red-100",
    accent: "#dc2626",
    kind: "msds",
  },
  {
    id: "law-search",
    title: "안전작업 법령 검색하기",
    desc: "사진 또는 텍스트로 현장 상황을 입력하고 관련 법령 링크 검색",
    icon: IconGavel,
    tone: "bg-blue-50 text-blue-700 border-blue-100",
    accent: "#2563eb",
    kind: "law",
  },
  {
    id: "chemical-risk",
    title: "화학물질 위험성평가",
    desc: "현장 데이터 분석 후 위험성평가 문서 초안 생성",
    icon: IconMicroscope,
    tone: "bg-amber-50 text-amber-700 border-amber-100",
    accent: "#d97706",
    kind: "risk",
  },
  {
    id: "aed-edu",
    title: "AED 종류검색 및 사용자 교육",
    desc: "AED 사진 또는 명칭으로 장비 규격과 사용법 안내자료 조회",
    icon: IconFirstAidKit,
    tone: "bg-rose-50 text-rose-700 border-rose-100",
    accent: "#e11d48",
    kind: "aed",
  },
  {
    id: "ergonomic-analysis",
    title: "근골격계 증상조사 AI 분석",
    desc: "작업 자세와 증상 데이터를 분석해 인간공학적 개선대책 보고서 생성",
    icon: IconActivityHeartbeat,
    tone: "bg-violet-50 text-violet-700 border-violet-100",
    accent: "#7c3aed",
    kind: "ergonomic",
  },
  {
    id: "safety-chatbot",
    title: "AI 안전보건 챗봇",
    desc: "안전보건 질문을 대화형으로 해결하는 챗봇 연결 화면",
    icon: IconMessageChatbot,
    tone: "bg-teal-50 text-teal-700 border-teal-100",
    accent: "#008C8C",
    kind: "chatbot",
  },
];

export const sampleSummary: Record<FeatureKind, string> = {
  msds: "업로드된 MSDS 자료에서 물질명, 신호어, 주요 유해위험 문구, 예방조치, 응급조치, 보관방법을 추출했습니다. 현장 게시용 A4 경고표지에 바로 반영할 수 있습니다.",
  law: "입력된 현장 상황은 사다리 작업, 개구부 주변 이동, 보호구 착용 확인이 필요한 작업으로 추정됩니다. 산업안전보건기준에 관한 규칙과 KOSHA 가이드 기반 점검항목 검색이 필요합니다.",
  risk: "현장 내 화학물질 취급, 환기 상태, 보호구 착용, 소분 용기 표시 여부를 중심으로 위험성을 평가했습니다. 발생가능성은 중간, 중대성은 높음으로 우선 개선 조치가 필요합니다.",
  aed: "입력된 AED 장비는 자동심장충격기 교육대상 장비로 분류됩니다. 패드 부착 위치, 음성 안내 준수, 심폐소생술 병행, 정기 점검 항목 확인이 필요합니다.",
  ergonomic: "반복 작업, 허리 굴곡, 손목 편위, 중량물 취급 가능성이 관찰됩니다. 작업대 높이 조정, 보조도구 사용, 순환근무, 증상 설문 추가 확인이 권장됩니다.",
  chatbot: "AI 안전보건 챗봇은 현장 질문, 법령 검색, 안전보건 문서 초안 작성, 교육자료 추천 기능으로 확장될 예정입니다.",
  custom: "추가된 기능의 입력, 분석, 요약, 컨펌, 결과 생성 프로세스를 연결할 수 있는 준비 화면입니다.",
};

export const lawLinks = [
  { title: "산업안전보건법", href: "https://www.law.go.kr/법령/산업안전보건법", desc: "사업주 안전보건 조치, 교육, 관리체계 기본 법령" },
  { title: "산업안전보건기준에 관한 규칙", href: "https://www.law.go.kr/법령/산업안전보건기준에관한규칙", desc: "사다리, 비계, 개구부, 화기작업 등 작업 기준 검색" },
  { title: "화학물질의 분류·표시 및 물질안전보건자료에 관한 기준", href: "https://www.law.go.kr/행정규칙/화학물질의분류·표시및물질안전보건자료에관한기준", desc: "MSDS, GHS 표시, 경고표지 관련 기준" },
];

export const contentHistoryItems: HistoryItem[] = [
  {
    id: "hist-msds-001",
    title: "에폭시 프라이머 MSDS 경고표지",
    type: "MSDS 경고표지",
    kind: "msds",
    date: "2026.07.22",
    status: "인쇄 대기",
    summary: "물질명, 신호어, 주요 유해위험 문구, 예방조치, 응급조치 항목을 추출해 A4 게시용 경고표지 초안을 생성했습니다.",
    detail: "에폭시 프라이머 취급 작업 기준으로 인화성 액체, 피부 자극, 흡입 유해 항목을 반영했습니다. 현장 게시 전 물질명과 제조사 정보를 확인해야 합니다.",
  },
  {
    id: "hist-law-001",
    title: "개구부 주변 이동 작업 법령 검색",
    type: "안전작업 법령",
    kind: "law",
    date: "2026.07.21",
    status: "검색 완료",
    summary: "개구부, 추락방지, 안전난간, 출입통제 관련 법령과 자체 점검 항목을 검색했습니다.",
    detail: "산업안전보건기준에 관한 규칙의 추락 방지 조치, 개구부 덮개 및 안전난간 관련 기준을 우선 검색 대상으로 추천했습니다.",
  },
  {
    id: "hist-risk-001",
    title: "사석장 도포 작업 위험성평가",
    type: "위험성평가",
    kind: "risk",
    date: "2026.07.20",
    status: "초안 생성",
    summary: "환기 부족, 보호구 미착용, 도포 용기 표시 누락을 주요 위험요인으로 평가했습니다.",
    detail: "발생가능성은 중간, 중대성은 높음으로 분류했습니다. 방독마스크 착용, 환기팬 배치, 도포 용기 라벨 부착을 개선대책으로 제안했습니다.",
  },
  {
    id: "hist-aed-001",
    title: "현장 사무실 AED 사용법 자료",
    type: "AED 교육",
    kind: "aed",
    date: "2026.07.19",
    status: "자료 확인",
    summary: "AED 모델명을 기준으로 패드 부착 위치, 음성 안내 순서, 심폐소생술 병행 절차를 정리했습니다.",
    detail: "현장 사무실에 비치된 자동심장충격기 교육자료를 조회하는 흐름으로 구성했습니다. 실제 장비 모델 확인 후 제조사 자료 링크를 연결할 예정입니다.",
  },
  {
    id: "hist-ergonomic-001",
    title: "반복 조립 작업 근골격계 분석",
    type: "근골격계 AI 분석",
    kind: "ergonomic",
    date: "2026.07.18",
    status: "보고서 생성",
    summary: "허리 굴곡, 손목 반복 동작, 장시간 정적 자세를 중심으로 인간공학적 개선대책을 제안했습니다.",
    detail: "작업대 높이 조정, 보조 지그 사용, 순환근무, 증상 설문 추가 확인을 개선대책으로 정리했습니다.",
  },
  {
    id: "hist-chatbot-001",
    title: "보호구 착용 기준 챗봇 상담",
    type: "AI 안전보건 챗봇",
    kind: "chatbot",
    date: "2026.07.17",
    status: "대화 저장",
    summary: "작업 유형별 보호구 착용 기준과 MSDS 확인 필요 항목을 대화형으로 안내했습니다.",
    detail: "추후 실제 챗봇 서버와 연결되면 상담 로그, 참조 문서, 후속 조치 요청을 함께 확인할 수 있습니다.",
  },
];

export function featureHref(id: string) {
  return `/svc-open-innovation/demo/${id}`;
}

export function FeatureThumb({ feature, compact = false }: { feature: Feature; compact?: boolean }) {
  const Icon = feature.icon;

  return (
    <div className={`${compact ? "h-16 w-16 rounded-2xl" : "aspect-[4/3] w-full rounded-2xl"} relative grid place-items-center overflow-hidden border ${feature.tone}`}>
      <div className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at 25% 20%, ${feature.accent}22, transparent 34%), linear-gradient(135deg, #ffffff, ${feature.accent}0f)` }} />
      <div className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/70" />
      <span className={`${compact ? "h-11 w-11" : "h-14 w-14"} relative grid place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5`} style={{ color: feature.accent }}>
        <Icon size={compact ? 27 : 34} stroke={1.8} />
      </span>
    </div>
  );
}
