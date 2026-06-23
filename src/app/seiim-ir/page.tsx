const years = ["2025", "2026", "2027", "2028", "2029", "2030"];

const sectionNavItems = [
  { href: "#ir-overview", label: "Overview" },
  { href: "#financial-projection", label: "5Y P&L" },
  { href: "#growth-driver-analysis", label: "Growth" },
  { href: "#founder-interview", label: "Interview" },
];

const revenueTargets = [205250, 800000, 1800000, 5400000, 16000000, 47800000];
const domesticRevenue = [205250, 615000, 1154000, 2770000, 7385000, 18385000];
const aiAddonRevenue = [0, 185000, 346000, 830000, 2215000, 5515000];
const overseasRevenue = [0, 0, 300000, 1800000, 6400000, 23900000];
const overseasProjectCounts = [0, 0, 1, 3, 7, 20];
const operatingProfit = [-198218, -220000, 144000, 1220000, 4880000, 16528000];

const financialRows = [
  {
    label: "매출액",
    values: revenueTargets,
    highlight: true,
  },
  {
    label: "  국내 SaaS/구축형 매출",
    values: domesticRevenue,
  },
  {
    label: "  AI Add-on 매출",
    values: aiAddonRevenue,
  },
  {
    label: "  해외/PwC·API 매출",
    values: overseasRevenue,
  },
  {
    label: "매출원가",
    values: [0, 120000, 306000, 1080000, 3520000, 11472000],
  },
  {
    label: "  원재료",
    values: [0, 120000, 306000, 1080000, 3520000, 11472000],
  },
  {
    label: "매출총이익",
    values: [205250, 680000, 1494000, 4320000, 12480000, 36328000],
    highlight: true,
  },
  {
    label: "판관비",
    values: [403468, 900000, 1350000, 3100000, 7600000, 19800000],
  },
  {
    label: "영업손익",
    values: operatingProfit,
    highlight: true,
  },
  {
    label: "영업외수익",
    values: [206542, 150000, 100000, 80000, 120000, 200000],
  },
  {
    label: "영업외비용",
    values: [7621, 20000, 50000, 100000, 250000, 600000],
  },
  {
    label: "법인세비용차감전손익",
    values: [703, -90000, 194000, 1200000, 4750000, 16128000],
  },
  {
    label: "법인세비용",
    values: [0, 0, 19400, 220000, 930000, 3205600],
  },
  {
    label: "당기순손익",
    values: [703, -90000, 174600, 980000, 3820000, 12922400],
    highlight: true,
  },
];

const summaryCards = [
  {
    label: "2030 매출 계획",
    value: "478억",
    detail: "47,800,000천원",
    tone: "dark",
  },
  {
    label: "해외/PwC·API",
    value: "20건",
    detail: "2030년 매출 239억",
    tone: "sky",
  },
  {
    label: "AI Add-on",
    value: "약 30%",
    detail: "국내 SaaS/구축형 매출 대비",
    tone: "violet",
  },
];

const analysisFactors = [
  {
    number: "01",
    title: "국내 SaaS/구축형 고객 수 및 고객당 매출",
    headline: "세이프버디의 사용처 확대가 국내 매출의 기본 성장축입니다.",
    body:
      "2026년에는 세이프버디 구독형 B2B 고객 확산과 업종 확장을 중심으로 매출 기반을 넓힙니다. 2027년 이후에는 공공기관 사용처 확대, 2026년에 테스트한 빌딩관리 및 아파트단지 관리 포트폴리오, 기존 건설업 사용처 확대가 결합되며 국내 SaaS/구축형 매출의 반복성과 객단가가 함께 상승하는 구조입니다.",
    points: [
      "2026년: 세이프버디 B2B 구독 고객 확산",
      "2027년 이후: 공공기관, 빌딩관리, 아파트단지 관리 사용처 확대",
      "건설업 기존 고객군의 지속 확대와 스마트안전 HW 도입 연계",
      "AI CCTV 도메인 추가로 안전관리 데이터 수집 및 문서화 영역 확장",
    ],
    metric: "2030 국내 SaaS/구축형 매출 18,385,000천원",
    tone: "mint",
  },
  {
    number: "02",
    title: "AI Add-on 침투율",
    headline: "기존 고객 기반 위에 AI 문서자동화 매출을 추가합니다.",
    body:
      "AI Add-on은 독립된 신규 매출 항목이면서 국내 SaaS/구축형 고객에게 붙는 고부가가치 확장 매출입니다. 세이프버디 AI, 세이프에듀, CCTV AI 분석레포트를 통해 안전문서 자동화 수요를 흡수하고, 국내 SaaS/구축형 매출 대비 약 30% 수준의 침투율을 목표로 설정했습니다.",
    points: [
      "세이프버디 AI 기반 안전문서 자동화",
      "세이프에듀 교육자료 및 기록 문서 자동화",
      "CCTV AI 분석레포트 기반 현장 안전 리포팅",
      "기존 고객에게 업셀링 가능한 반복 매출 구조",
    ],
    metric: "2030 AI Add-on 매출 5,515,000천원",
    tone: "violet",
  },
  {
    number: "03",
    title: "해외/PwC·API 확장",
    headline: "2027년 테스트베드 이후 글로벌 도입 사례를 매출화합니다.",
    body:
      "SVC 글로벌 진출 지원사업을 통해 해외 시장정보와 특허권 확보 기반을 만들고, PwC와의 협업 네트워크를 통해 해외 사용처 연구 및 시장도입 전략을 수립합니다. 2027년 이후 실제 도입 사례와 테스트베드를 발굴하고, 2028년부터 포트폴리오 확대 및 고객처 확산을 통해 글로벌 매출을 본격화합니다.",
    points: [
      "SVC 글로벌 진출 지원사업 기반 시장정보 및 특허권 확보",
      "PwC 협업 네트워크를 통한 해외 도입 전략 수립",
      "ISO45001 인증 수요 산업군 대상 DX 및 안전문서 자동화 확장",
      "AI CCTV와 하이엔드 솔루션 브랜딩을 통한 해외 사용처 확대",
    ],
    metric: "2030 해외/PwC·API 매출 23,900,000천원",
    tone: "sky",
  },
  {
    number: "04",
    title: "매출원가 및 판관비",
    headline: "SW 중심 매출에서 HW·AI 인식 기반 서비스 확장에 따라 비용 구조를 반영했습니다.",
    body:
      "순수 SW 매출은 별도의 제작 매출원가 부담이 낮지만, CCTV와 카메라 인식을 통한 문서자동화 서비스가 확대되면 장비, 연동, 구축, 운영 관련 매출원가가 발생합니다. 판관비는 인건비, 광고선전비, 기업운영비, 지식재산권 및 인증취득 비용을 중심으로 반영했습니다.",
    points: [
      "SW 기준 매출은 원가 부담이 낮은 구조",
      "CCTV·카메라 인식 서비스 확대 시 원재료 및 구축 원가 반영",
      "인건비, 광고선전비, 운영비 중심 판관비 확대",
      "지식재산권, 특허, 인증취득 비용을 성장 투자로 반영",
    ],
    metric: "2030 매출총이익률 약 76.0%",
    tone: "slate",
  },
  {
    number: "05",
    title: "손익분기점",
    headline: "2027년부터 이익 실현을 목표로 운영 계획을 설계했습니다.",
    body:
      "2026년은 고객군 확장, 제품 포트폴리오 검증, 해외 진출 준비에 투자하는 구간입니다. 2027년부터는 국내 SaaS/구축형 매출 확대, AI Add-on 업셀링, 해외 프로젝트 최초 매출이 결합되며 영업손익과 당기순손익 모두 흑자 전환하는 구조로 설계했습니다.",
    points: [
      "2026년: 확장 투자 및 검증 구간",
      "2027년: 영업손익 144,000천원, 당기순손익 174,600천원",
      "2028년 이후: AI Add-on 및 해외 매출 확대로 이익률 개선",
      "2030년: 당기순손익 12,922,400천원 목표",
    ],
    metric: "2027년 흑자 전환",
    tone: "emerald",
  },
];

const revenueDriverBars = [
  { label: "국내 사용처 확대", value: 82, color: "bg-mint-500" },
  { label: "AI Add-on 침투율", value: 68, color: "bg-violet-500" },
  { label: "해외/PwC·API 확장", value: 94, color: "bg-sky-500" },
  { label: "비용 구조 관리", value: 74, color: "bg-slate-700" },
  { label: "손익분기점 도달", value: 70, color: "bg-emerald-500" },
];

const growthTimeline = [
  {
    year: "2026",
    title: "세이프버디 확장",
    text: "B2B 구독 고객 확산, 업종 확대, 빌딩·아파트 관리 테스트",
  },
  {
    year: "2027",
    title: "흑자 전환과 해외 1건",
    text: "공공기관 사용처 확대, AI CCTV 도메인 추가, 해외 테스트베드 매출화",
  },
  {
    year: "2028",
    title: "포트폴리오 확대",
    text: "해외 프로젝트 3건, AI Add-on 침투율 확대, 안전문서 자동화 고도화",
  },
  {
    year: "2029-2030",
    title: "글로벌 스케일업",
    text: "PwC 협업 기반 고객처 확산, ISO45001 산업군 DX, 해외 20건 목표",
  },
];

const interviewStoryboard = [
  {
    phase: "훅",
    time: "0~4초",
    purpose: "문제제기, 강렬한 한 줄",
    line: "안전관리자가 서류에 묶이는 순간, 현장의 위험은 놓치기 시작합니다.",
    visual: "서류 더미와 현장 사진을 대비시키고, 중앙에 '서류 대신 현장으로' 문구를 크게 배치",
  },
  {
    phase: "정체",
    time: "4~10초",
    purpose: "회사명 + 한 줄 소개",
    line: "새임은 AI로 안전문서를 자동화해, 안전관리자가 다시 현장에 집중하게 만드는 스마트 안전 DX 기업입니다.",
    visual: "SEIIM 로고, SafeBuddy, SafeEdu, AI CCTV 리포트가 하나의 플랫폼으로 연결되는 화면",
  },
  {
    phase: "증거",
    time: "10~16초",
    purpose: "핵심 지표 및 시장 한 줄",
    line: "근로자 7,000여명이 사용했고, 현장 사진 한 장에서 법령 근거 기반 안전문서 초안이 만들어집니다.",
    visual: "7,000+ 사용자, 문서작성 시간 1/10 이하, 공공·건설·시설관리 확장 지표를 카드로 노출",
  },
  {
    phase: "마무리",
    time: "16~20초",
    purpose: "포부, 슬로건",
    line: "새임은 안전활동에 증빙이 따라오는 업무표준을 만들고, 국가 산업안전 운영 플랫폼으로 성장하겠습니다.",
    visual: "현장 근로자, 안전관리자, 데이터 대시보드가 이어지고 마지막에 'SEIIM, Safety Back to the Field' 슬로건",
  },
];

const identityProofs = [
  { label: "Problem", value: "서류에 묻힌 안전", text: "컴플라이언스 서류 부담으로 현장 집중도가 낮아지는 문제" },
  { label: "Solution", value: "AI 안전비서", text: "RAG 기반 법령 검색과 안전문서 초안 자동 생성" },
  { label: "Traction", value: "7,000+ 사용자", text: "디지털약자 사용성 불편 CS 0건, 실증 기반 사용성 검증" },
  { label: "Vision", value: "현장 중심 표준", text: "안전활동에 증빙이 따라오는 산업안전 운영 플랫폼" },
];

function formatAmount(value: number) {
  if (value === 0) return "-";
  return value.toLocaleString("ko-KR");
}

function formatHundredMillion(value: number) {
  return `${(value / 100000).toLocaleString("ko-KR", {
    maximumFractionDigits: value < 1000000 ? 1 : 0,
  })}억`;
}

function getShare(value: number, total: number) {
  if (total === 0) return 0;
  return (value / total) * 100;
}

export default function SeiimIrPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <aside className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <nav className="rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-xl shadow-slate-900/10 backdrop-blur">
          {sectionNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-xl px-4 py-3 text-xs font-black text-slate-500 transition-colors hover:bg-slate-950 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <section id="ir-overview" className="relative overflow-hidden bg-[#07111f] text-white scroll-mt-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(0,183,175,0.28),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.22),transparent_34%)]" />
        <div className="relative max-w-[1180px] mx-auto px-6 pt-12 pb-14 md:pt-20 md:pb-20">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
          >
            <span aria-hidden="true">←</span>
            Sections
          </a>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-bold tracking-[0.24em] text-mint-300">
                SEIIM IR CONTENT STUDIO
              </p>
              <h1 className="mt-4 max-w-[780px] text-[40px] leading-[1.1] md:text-[64px] font-black tracking-normal">
                새임의 성장을
                <span className="block text-mint-300">투자 언어로 시각화</span>
              </h1>
              <p className="mt-6 max-w-[680px] text-lg leading-8 text-slate-300">
                산업안전 AI SaaS, AI Add-on, 해외/PwC·API 프로젝트 매출을
                한 화면에서 검토할 수 있는 IR 자료용 재무 시각화 페이지입니다.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {summaryCards.map((card) => (
                <div
                  key={card.label}
                  className={`rounded-2xl border p-5 ${
                    card.tone === "dark"
                      ? "border-white/10 bg-white/[0.07]"
                      : card.tone === "sky"
                        ? "border-sky-300/20 bg-sky-300/[0.08]"
                        : "border-violet-300/20 bg-violet-300/[0.08]"
                  }`}
                >
                  <p className="text-sm text-slate-300">{card.label}</p>
                  <p className="mt-2 text-3xl font-black text-white">{card.value}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-300">{card.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="financial-projection" className="scroll-mt-8">
        <div className="max-w-[1180px] mx-auto px-6 py-14 md:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black tracking-[0.22em] text-mint-700">
                PROFIT & LOSS PROJECTION
              </p>
              <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-normal">
                향후 5개년 추정손익
              </h2>
              <p className="mt-4 max-w-[760px] text-slate-600 leading-7">
                매출액은 국내 SaaS/구축형, AI Add-on, 해외/PwC·API 매출의 합산으로 구성했습니다.
                AI Add-on은 국내 SaaS/구축형 대비 약 30% 수준이며, 해외 프로젝트는
                2027년 1건에서 2030년 20건까지 확대되는 계획입니다.
              </p>
            </div>
            <div className="w-fit rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm">
              단위: 천원
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 md:p-7 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-black">매출 구성 변화</h3>
                <p className="mt-1 text-sm text-slate-500">
                  연도별 매출액을 3개 매출원으로 분배했습니다.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-bold text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-mint-500" />
                  국내 SaaS/구축형
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-violet-500" />
                  AI Add-on
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-sky-500" />
                  해외/PwC·API
                </span>
              </div>
            </div>

            <div className="mt-7 space-y-5">
              {years.map((year, index) => {
                const total = revenueTargets[index];
                const domesticShare = getShare(domesticRevenue[index], total);
                const aiShare = getShare(aiAddonRevenue[index], total);
                const overseasShare = getShare(overseasRevenue[index], total);

                return (
                  <div key={year} className="grid gap-3 md:grid-cols-[96px_minmax(0,1fr)_150px] md:items-center">
                    <div>
                      <p className="text-base font-black text-slate-900">{year}</p>
                      <p className="text-xs font-bold text-slate-400">
                        {overseasProjectCounts[index] > 0 ? `해외 ${overseasProjectCounts[index]}건` : "국내 중심"}
                      </p>
                    </div>
                    <div className="h-8 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
                      <div className="flex h-full w-full">
                        <div
                          className="bg-gradient-to-r from-mint-700 to-mint-400"
                          style={{ width: `${domesticShare}%` }}
                          title={`국내 SaaS/구축형 ${formatAmount(domesticRevenue[index])}천원`}
                        />
                        {aiAddonRevenue[index] > 0 && (
                          <div
                            className="bg-gradient-to-r from-violet-700 to-violet-400"
                            style={{ width: `${aiShare}%` }}
                            title={`AI Add-on ${formatAmount(aiAddonRevenue[index])}천원`}
                          />
                        )}
                        {overseasRevenue[index] > 0 && (
                          <div
                            className="bg-gradient-to-r from-sky-700 to-sky-400"
                            style={{ width: `${overseasShare}%` }}
                            title={`해외/PwC·API ${formatAmount(overseasRevenue[index])}천원`}
                          />
                        )}
                      </div>
                    </div>
                    <div className="md:text-right">
                      <p className="text-lg font-black text-slate-950">{formatHundredMillion(total)}</p>
                      <p className="text-xs font-semibold text-slate-400">{formatAmount(total)}천원</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <p className="text-sm text-slate-400">2026 계획 매출</p>
              <p className="mt-3 text-3xl font-black">8억</p>
              <p className="mt-2 text-xs text-mint-200">전년 대비 약 3.9배</p>
            </div>
            <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
              <p className="text-sm text-violet-800">2028 AI Add-on</p>
              <p className="mt-3 text-3xl font-black text-slate-950">8.3억</p>
              <p className="mt-2 text-xs font-semibold text-violet-700">국내 SaaS/구축형 대비 약 30%</p>
            </div>
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
              <p className="text-sm text-sky-800">2030 해외/PwC·API</p>
              <p className="mt-3 text-3xl font-black text-slate-950">239억</p>
              <p className="mt-2 text-xs font-semibold text-sky-700">20건, 매출 비중 50%</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 md:flex-row md:items-center md:justify-between">
              <h3 className="text-xl font-black">추정손익 테이블</h3>
              <p className="text-sm font-semibold text-slate-500">
                세부 매출 3개 항목의 합산이 매출액입니다.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-950 text-white">
                    <th className="px-5 py-4 text-left font-black whitespace-nowrap">
                      구분
                    </th>
                    {years.map((year) => (
                      <th key={year} className="px-4 py-4 text-right font-black whitespace-nowrap">
                        {year}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {financialRows.map((row) => {
                    const isSubRow = row.label.startsWith("  ");
                    return (
                      <tr
                        key={row.label}
                        className={`border-t border-slate-100 ${
                          row.highlight ? "bg-mint-50/70" : "bg-white"
                        }`}
                      >
                        <th className="px-5 py-3 text-left font-bold text-slate-700 whitespace-nowrap">
                          {isSubRow ? (
                            <span className="pl-4 text-slate-500">{row.label.trim()}</span>
                          ) : (
                            row.label
                          )}
                        </th>
                        {row.values.map((value, index) => (
                          <td
                            key={`${row.label}-${years[index]}`}
                            className={`px-4 py-3 text-right tabular-nums font-semibold whitespace-nowrap ${
                              value < 0
                                ? "text-rose-600"
                                : row.highlight
                                  ? "text-slate-950"
                                  : "text-slate-600"
                            }`}
                          >
                            {formatAmount(value)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 text-xs leading-6 text-slate-500">
              법인세비용은 2026년 이후 법인세 누진세율을 적용했습니다.
              과세표준 2억원 이하는 10%, 2억원 초과 200억원 이하는 20% 및 누진공제 2,000만원을 반영했습니다.
              과세표준이 음수인 연도는 법인세비용을 0으로 표시했습니다.
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {years.slice(1).map((year, index) => {
              const actualIndex = index + 1;
              const profit = operatingProfit[actualIndex];
              return (
                <div key={year} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-slate-500">{year}</p>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        profit < 0
                          ? "bg-rose-50 text-rose-600"
                          : "bg-mint-50 text-mint-700"
                      }`}
                    >
                      {profit < 0 ? "투자 구간" : "수익화 구간"}
                    </span>
                  </div>
                  <p className="mt-3 text-2xl font-black">{formatHundredMillion(revenueTargets[actualIndex])}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    영업손익 {formatAmount(profit)}천원
                  </p>
                  <p className="mt-1 text-sm font-semibold text-violet-700">
                    AI Add-on {formatAmount(aiAddonRevenue[actualIndex])}천원
                  </p>
                  <p className="mt-1 text-sm font-semibold text-sky-700">
                    {overseasProjectCounts[actualIndex] > 0
                      ? `해외/PwC·API ${overseasProjectCounts[actualIndex]}건 · ${formatAmount(overseasRevenue[actualIndex])}천원`
                      : "해외/PwC·API 수주 준비 단계"}
                  </p>
                </div>
              );
            })}
          </div>

          <section id="growth-driver-analysis" className="mt-16 rounded-[28px] border border-slate-200 bg-white p-6 md:p-8 shadow-sm scroll-mt-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black tracking-[0.22em] text-mint-700">
                  GROWTH DRIVER ANALYSIS
                </p>
                <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-normal">
                  추정손익 주요 가정 분석
                </h2>
                <p className="mt-4 max-w-[820px] text-slate-600 leading-7">
                  향후 5개년 추정손익은 단순 매출 증가가 아니라 국내 사용처 확대,
                  AI Add-on 침투율 상승, 해외/PwC·API 프로젝트 매출화, 비용 구조 관리,
                  손익분기점 도달이라는 5개 동인이 결합된 성장 시나리오입니다.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-950 px-5 py-4 text-white">
                <p className="text-xs font-bold text-slate-400">Break-even</p>
                <p className="mt-1 text-2xl font-black">2027년</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black">매출 발생 영향도</h3>
                  <span className="text-xs font-bold text-slate-400">Index</span>
                </div>
                <div className="mt-6 space-y-5">
                  {revenueDriverBars.map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-bold text-slate-700">{item.label}</span>
                        <span className="font-black text-slate-950">{item.value}</span>
                      </div>
                      <div className="h-3 rounded-full bg-white ring-1 ring-slate-200">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black">성장 논리 타임라인</h3>
                  <span className="text-xs font-bold text-slate-400">2026-2030</span>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {growthTimeline.map((item) => (
                    <div key={item.year} className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                      <p className="text-xs font-black text-mint-700">{item.year}</p>
                      <h4 className="mt-2 text-base font-black text-slate-950">{item.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {analysisFactors.map((factor) => (
                <article
                  key={factor.number}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-black ${
                        factor.tone === "mint"
                          ? "bg-mint-50 text-mint-700"
                          : factor.tone === "violet"
                            ? "bg-violet-50 text-violet-700"
                            : factor.tone === "sky"
                              ? "bg-sky-50 text-sky-700"
                              : factor.tone === "emerald"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {factor.number}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-black leading-snug text-slate-950">
                    {factor.title}
                  </h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-slate-700">
                    {factor.headline}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {factor.body}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {factor.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-6 text-slate-600">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mint-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-xl bg-slate-50 p-3 text-sm font-black text-slate-900 ring-1 ring-slate-200">
                    {factor.metric}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-mint-50 p-5 ring-1 ring-mint-100">
                <p className="text-sm font-black text-mint-700">국내 기반</p>
                <p className="mt-3 text-2xl font-black text-slate-950">사용처 확대</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  건설업에서 공공기관, 빌딩관리, 아파트단지 관리로 도메인을 넓혀
                  고객 수와 고객당 매출을 동시에 끌어올립니다.
                </p>
              </div>
              <div className="rounded-2xl bg-violet-50 p-5 ring-1 ring-violet-100">
                <p className="text-sm font-black text-violet-700">AI 확장</p>
                <p className="mt-3 text-2xl font-black text-slate-950">문서자동화 업셀링</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  세이프버디 AI, 세이프에듀, CCTV AI 분석레포트가 기존 안전관리
                  고객에게 붙는 고마진 Add-on 매출로 작동합니다.
                </p>
              </div>
              <div className="rounded-2xl bg-sky-50 p-5 ring-1 ring-sky-100">
                <p className="text-sm font-black text-sky-700">글로벌 확장</p>
                <p className="mt-3 text-2xl font-black text-slate-950">PwC·API 매출화</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  PwC 협업과 SVC 글로벌 지원사업을 기반으로 테스트베드를 만들고,
                  2028년 이후 글로벌 고객처 확산을 목표로 합니다.
                </p>
              </div>
            </div>
          </section>

          <section id="founder-interview" className="mt-16 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-white shadow-sm scroll-mt-8">
            <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black tracking-[0.22em] text-mint-300">
                  FOUNDER INTERVIEW SCRIPT
                </p>
                <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-normal">
                  창업가 인터뷰 영상 20초 구성
                </h2>
                <p className="mt-5 text-slate-300 leading-7">
                  VentureSquare 기사에서 드러난 새임의 핵심 정체성은 “서류 대신 현장으로”입니다.
                  이 메시지를 20초 안에 문제, 정체, 증거, 포부 순서로 압축해 창업가의 목소리로 전달합니다.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {identityProofs.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <p className="text-xs font-black text-mint-300">{item.label}</p>
                      <p className="mt-2 text-xl font-black">{item.value}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-2xl border border-mint-300/20 bg-mint-300/[0.08] p-5">
                  <p className="text-sm font-black text-mint-200">대표 한 줄 메시지</p>
                  <p className="mt-3 text-2xl font-black leading-snug">
                    “안전관리자가 서류가 아니라 현장을 볼 수 있게, 새임은 AI로 안전활동의 증빙을 자동화합니다.”
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 md:p-7 text-slate-950">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black">20초 스토리보드</h3>
                    <p className="mt-1 text-sm text-slate-500">이미지의 훅-정체-증거-마무리 구조를 새임 메시지로 재구성</p>
                  </div>
                  <div className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white">
                    0~20s
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                  <div className="grid grid-cols-[86px_88px_1fr] bg-slate-100 text-sm font-black text-slate-700 md:grid-cols-[100px_110px_1fr_1fr]">
                    <div className="border-r border-slate-200 px-4 py-3">구간</div>
                    <div className="border-r border-slate-200 px-4 py-3">시간</div>
                    <div className="border-r border-slate-200 px-4 py-3">멘트</div>
                    <div className="hidden px-4 py-3 md:block">화면 연출</div>
                  </div>
                  {interviewStoryboard.map((item) => (
                    <div
                      key={item.phase}
                      className="grid grid-cols-[86px_88px_1fr] border-t border-slate-200 text-sm md:grid-cols-[100px_110px_1fr_1fr]"
                    >
                      <div className="border-r border-slate-200 px-4 py-4 font-black text-slate-950">
                        {item.phase}
                      </div>
                      <div className="border-r border-slate-200 px-4 py-4 font-bold text-slate-500">
                        {item.time}
                      </div>
                      <div className="border-r border-slate-200 px-4 py-4">
                        <p className="font-black leading-6 text-slate-950">{item.line}</p>
                        <p className="mt-2 text-xs font-bold text-mint-700">{item.purpose}</p>
                        <p className="mt-2 text-xs leading-5 text-slate-500 md:hidden">{item.visual}</p>
                      </div>
                      <div className="hidden px-4 py-4 text-sm leading-6 text-slate-600 md:block">
                        {item.visual}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                  <h4 className="text-lg font-black">최종 스크립트 예시</h4>
                  <p className="mt-4 text-lg font-semibold italic leading-8 text-slate-800">
                    “안전관리자가 서류에 묶이는 순간, 현장의 위험은 놓치기 시작합니다.
                    새임은 AI로 안전문서를 자동화해 안전관리자가 다시 현장에 집중하게 만드는 스마트 안전 DX 기업입니다.
                    이미 7,000여명의 근로자가 사용하는 현장에서, 사진 한 장은 법령 근거 기반 안전문서 초안으로 바뀝니다.
                    새임은 안전활동에 증빙이 따라오는 업무표준을 만들고, 국가 산업안전 운영 플랫폼으로 성장하겠습니다.”
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
