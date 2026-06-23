const LOGO = `/logos`;
const CUSTOMER = `${LOGO}/landing_customers`;

export interface TimelineEvent {
  month: string;
  description: string;
  highlight?: boolean;
  badge?: string;
  logos?: { src: string; alt: string }[];
}

export interface TimelineYear {
  year: string;
  summary: string;
  events: TimelineEvent[];
}

export const timelineData: TimelineYear[] = [
  {
    year: "2025",
    summary: "GS인증 1등급 · 공공기관 도입 · 다수 수상",
    events: [
      {
        month: "12월",
        description: "세이프버디 GS인증 1등급 획득",
        highlight: true,
        badge: "인증",
        logos: [{ src: `${LOGO}/main1-goodsoft.png`, alt: "GS인증" }],
      },
      {
        month: "11월",
        description: "2025 스마트건설 EXPO 공모전 최우수상 수상",
        highlight: true,
        badge: "수상",
        logos: [{ src: `${LOGO}/logo-molit.png`, alt: "국토교통부" }],
      },
      {
        month: "10월",
        description: "스마트건설 얼라이언스 실증사업",
        logos: [{ src: `${LOGO}/logo-molit.png`, alt: "국토교통부" }],
      },
      {
        month: "9월",
        description: "화성도시공사 세이프버디 공공기관 도입",
        badge: "도입",
      },
      {
        month: "9월",
        description: "한국건설안전학회 국회의원 표창 수상",
        highlight: true,
        badge: "수상",
        logos: [{ src: `${LOGO}/logo-kapa.png`, alt: "한국건설안전학회" }],
      },
      {
        month: "6월",
        description: "DL이앤씨 토목현장 세이프에듀 현장 추가",
        logos: [{ src: `${CUSTOMER}/2-dl.png`, alt: "DL이앤씨" }],
      },
      {
        month: "6월",
        description: "현대아산 세이프버디 전사 도입 (연간구독)",
        badge: "도입",
      },
      {
        month: "6월",
        description: "한국수력원자력 퓨처브릿지 지원사업 선정",
        badge: "선정",
      },
      {
        month: "5월",
        description: "창진원 창업도약패키지 (대기업 협업) 선정",
        badge: "선정",
        logos: [{ src: `${LOGO}/logo-jungso.png`, alt: "창업진흥원" }],
      },
      {
        month: "4월",
        description: "AI 교육시스템 특허 등록 (새임 + 현대건설 공동)",
        highlight: true,
        badge: "특허",
        logos: [{ src: `${CUSTOMER}/1-hd.png`, alt: "현대건설" }],
      },
      {
        month: "2월",
        description: "한국수자원조사기술원 세이프버디 전사 도입 (연간구독)",
        badge: "도입",
      },
    ],
  },
  {
    year: "2024",
    summary: "세이프버디 출시 · 연구소 설립 · 파트너십 확대",
    events: [
      {
        month: "12월",
        description: "대한중대재해예방협회 이사회 등록 / 세이프버디 회원사 도입",
        badge: "협약",
        logos: [{ src: `${LOGO}/disaster_logo.png`, alt: "대한중대재해예방협회" }],
      },
      {
        month: "11월",
        description: "현대건설 세이프에듀 시스템 구축",
        logos: [{ src: `${CUSTOMER}/1-hd.png`, alt: "현대건설" }],
      },
      {
        month: "11월",
        description: "스마트건설 EXPO 초청 참가",
        logos: [{ src: `${LOGO}/logo-molit.png`, alt: "국토교통부" }],
      },
      {
        month: "10월",
        description: "2024 한국건설안전박람회 현대건설 공동관 참가",
        logos: [
          { src: `${CUSTOMER}/1-hd.png`, alt: "현대건설" },
          { src: `${LOGO}/logo-kapa.png`, alt: "한국건설안전학회" },
        ],
      },
      {
        month: "10월",
        description: "세이프버디 출시 및 최초 공개 (구, 안전명장)",
        highlight: true,
        badge: "출시",
      },
      {
        month: "7월",
        description: "SBA · DL이앤씨 (플랜트) O.I 선정",
        badge: "선정",
        logos: [
          { src: `${LOGO}/sba.png`, alt: "SBA" },
          { src: `${CUSTOMER}/2-dl.png`, alt: "DL이앤씨" },
        ],
      },
      {
        month: "4월",
        description: "AI 교육시스템 공동특허 출원 / 상표 2건 등록",
        badge: "특허",
      },
      {
        month: "3월",
        description: "기업부설연구소 (벤처기업) 설립",
        highlight: true,
        badge: "설립",
        logos: [{ src: `${LOGO}/logo-koita.png`, alt: "KOITA" }],
      },
    ],
  },
  {
    year: "2023",
    summary: "대기업 오픈이노베이션 수상 · 다수 협약 체결",
    events: [
      {
        month: "11월",
        description: "스마트건설 EXPO 초청 참가",
      },
      {
        month: "11월",
        description: "국토안전관리원 2023년 하반기 K-테스트베드",
        logos: [{ src: `${LOGO}/kalis.png`, alt: "국토안전관리원" }],
      },
      {
        month: "9월",
        description:
          "현대자동차그룹 출자 산업안전상생재단 — 2023년 안전보건통합패키지 수행기관 선정 [건설분야]",
        highlight: true,
        badge: "선정",
        logos: [{ src: `${LOGO}/spf_logo.png`, alt: "산업안전상생재단" }],
      },
      {
        month: "8월",
        description:
          "2023 DL이앤씨 × 민관협력 오픈이노베이션 4차산업 분야 — DX 과제 1위 달성, 중소벤처기업부장관상 수상",
        highlight: true,
        badge: "수상",
        logos: [
          { src: `${CUSTOMER}/2-dl.png`, alt: "DL이앤씨" },
          { src: `${LOGO}/logo-jungso.png`, alt: "중소벤처기업부" },
        ],
      },
      {
        month: "7월",
        description:
          "2023 현대건설 × Seoul Startup Open Innovation (스마트안전) — SBA 우수 스타트업 선정",
        highlight: true,
        badge: "선정",
        logos: [
          { src: `${CUSTOMER}/1-hd.png`, alt: "현대건설" },
          { src: `${LOGO}/sba.png`, alt: "SBA" },
        ],
      },
      {
        month: "5월",
        description: "국토교통부 스마트건설 얼라이언스 스마트안전 회원사 등록",
        logos: [{ src: `${LOGO}/logo-molit.png`, alt: "국토교통부" }],
      },
      {
        month: "4월",
        description: "국토안전관리원 2023년 상반기 K-테스트베드",
        logos: [{ src: `${LOGO}/kalis.png`, alt: "국토안전관리원" }],
      },
      {
        month: "1월",
        description: "한국건설스마트안전협회 정회원사 등록",
        logos: [{ src: `${LOGO}/kscsa_logo.png`, alt: "한국건설스마트안전협회" }],
      },
    ],
  },
  {
    year: "2022",
    summary: "벤처기업 인증 · 특허 출원 · 창업 가속",
    events: [
      {
        month: "11월",
        description: "기술보증기금 약정 / 안전명장 기획 및 개발",
        logos: [{ src: `${LOGO}/kibo.png`, alt: "기술보증기금" }],
      },
      {
        month: "10월",
        description: "벤처기업 인증",
        highlight: true,
        badge: "인증",
        logos: [{ src: `${LOGO}/main2-ve.png`, alt: "벤처기업" }],
      },
      {
        month: "10월",
        description: "특허 4건 · 상표 2건 출원 완료",
        badge: "특허",
      },
      {
        month: "3월",
        description: "청년창업사관학교 (서울) 12기",
        badge: "선정",
        logos: [{ src: `${LOGO}/logo-jungso.png`, alt: "창업진흥원" }],
      },
    ],
  },
  {
    year: "2021",
    summary: "법인 설립 · 서비스 기획",
    events: [
      {
        month: "10월",
        description: "세이프에듀 기획 및 개발 착수",
      },
      {
        month: "7월",
        description: "㈜새임 법인 설립",
        highlight: true,
        badge: "설립",
      },
    ],
  },
];
