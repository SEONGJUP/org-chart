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
  kind: FeatureKind;
};

export const baseFeatures: Feature[] = [
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

export function featureHref(id: string) {
  return `/svc-open-innovation/demo/${id}`;
}

export function FeatureThumb({ feature, compact = false }: { feature: Feature; compact?: boolean }) {
  const Icon = feature.icon;

  return (
    <div className={`${compact ? "h-16 w-16" : "aspect-[4/3] w-full"} grid place-items-center rounded-xl border ${feature.tone}`}>
      <Icon size={compact ? 31 : 42} stroke={1.7} />
    </div>
  );
}
