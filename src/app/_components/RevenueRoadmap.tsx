"use client";

import { useScrollAnimation } from "../_hooks/useScrollAnimation";

const roadmapData = [
  {
    year: "2025",
    type: "실적" as const,
    base: 2.1,
    upside: 2.1,
    drivers: ["초기 유료 고객 확보", "제품 검증"],
  },
  {
    year: "2026",
    type: "목표" as const,
    base: 5,
    upside: 8,
    drivers: ["건설업 레퍼런스 확대", "기존 고객 재계약"],
  },
  {
    year: "2027",
    type: "목표" as const,
    base: 12,
    upside: 18,
    drivers: ["제조업 확장", "업종별 패키지 고도화"],
  },
  {
    year: "2028",
    type: "목표" as const,
    base: 28,
    upside: 54,
    drivers: ["운수·창고업 확장", "파트너 채널 도입"],
  },
  {
    year: "2029",
    type: "목표" as const,
    base: 65,
    upside: 160,
    drivers: ["멀티 산업군 확장", "API/제휴 매출"],
  },
  {
    year: "2030",
    type: "목표" as const,
    base: 150,
    upside: 478,
    drivers: ["직판+파트너+API 확산", "업셀링 본격화"],
  },
];

const MAX_VALUE = 478;
const MAX_BAR_HEIGHT = 180;

function barHeight(value: number): number {
  return Math.max(Math.sqrt(value / MAX_VALUE) * MAX_BAR_HEIGHT, 8);
}

function formatVal(v: number): string {
  return `${v}억`;
}

const growthPhases = [
  {
    phase: "Phase 1",
    period: "2025–2026",
    label: "B2B 업셀링",
    desc: "건설업 레퍼런스 확보 및 업셀",
    color: "mint",
  },
  {
    phase: "Phase 2",
    period: "2027",
    label: "SaaS 확장",
    desc: "제조업 업종별 패키지 고도화",
    color: "sky",
  },
  {
    phase: "Phase 3",
    period: "2028",
    label: "B2G 공공조달",
    desc: "운수·창고업 + 파트너 채널",
    color: "indigo",
  },
  {
    phase: "Phase 4",
    period: "2029–2030",
    label: "파트너십",
    desc: "API/제휴 매출 + 업셀링 본격화",
    color: "sky2",
  },
];

const RevenueRoadmap = () => {
  const animRef = useScrollAnimation();

  return (
    <div className="w-full bg-gray-50 overflow-hidden" ref={animRef}>
      <div className="max-w-[1140px] mx-auto px-6 py-16 md:py-20">

        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="scroll-animate text-mint-600 font-bold text-sm tracking-[0.2em] uppercase mb-3">
            Revenue Growth Roadmap
          </p>
          <h2 className="scroll-animate scroll-animate-delay-1 text-3xl md:text-[42px] font-extrabold leading-tight text-gray-900">
            매출 성장{" "}
            <span className="text-mint-600">로드맵</span>
          </h2>
          <p className="scroll-animate scroll-animate-delay-2 text-gray-500 mt-3 text-base md:text-lg max-w-[700px] mx-auto leading-relaxed">
            2025년 실매출 2.1억 원을 출발점으로, B2B 업셀링 → SaaS 확장 → B2G 공공조달 → 파트너십 순으로
            성장 드라이버가 단계적으로 작동합니다.
          </p>
        </div>

        {/* Key Milestones */}
        <div className="scroll-animate scroll-animate-delay-2 flex flex-wrap justify-center items-center gap-3 mb-10">
          <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <span className="text-sm text-gray-400 font-medium">2025 실적</span>
            <span className="text-base font-extrabold text-gray-800">2.1억</span>
          </div>
          <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div className="flex items-center gap-2.5 bg-mint-50 border border-mint-200 rounded-full px-5 py-2.5 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-mint-500" />
            <span className="text-sm text-mint-600 font-medium">2030 Base</span>
            <span className="text-base font-extrabold text-mint-700">150억</span>
            <span className="text-xs font-bold text-mint-400 bg-mint-100 px-2 py-0.5 rounded-full">×71</span>
          </div>
          <div className="flex items-center gap-2.5 bg-sky-50 border border-sky-200 rounded-full px-5 py-2.5 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="text-sm text-sky-600 font-medium">2030 Upside</span>
            <span className="text-base font-extrabold text-sky-700">478억</span>
            <span className="text-xs font-bold text-sky-500 bg-sky-100 px-2 py-0.5 rounded-full">×228</span>
          </div>
        </div>

        {/* Chart Card */}
        <div className="scroll-animate bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden mb-3">
          {/* Chart Area */}
          <div className="px-6 md:px-10 pt-8 pb-0">
            <div
              className="flex items-end justify-between gap-1 md:gap-3"
              style={{ height: `${MAX_BAR_HEIGHT + 50}px` }}
            >
              {roadmapData.map((item, idx) => {
                const baseH = barHeight(item.base);
                const upsideH = barHeight(item.upside);
                const hasUpside = item.upside !== item.base;
                return (
                  <div
                    key={item.year}
                    className={`scroll-animate scroll-animate-delay-${Math.min(idx, 5)} flex-1 flex flex-col items-center`}
                  >
                    {/* Value labels above bars */}
                    <div className="text-center mb-2 min-h-[40px] flex flex-col items-center justify-end">
                      {hasUpside && (
                        <span className="text-[11px] md:text-[13px] font-bold text-sky-500 leading-tight">
                          {formatVal(item.upside)}
                        </span>
                      )}
                      <span
                        className={`text-[11px] md:text-[13px] font-bold leading-tight ${
                          item.year === "2025" ? "text-gray-400" : "text-mint-600"
                        }`}
                      >
                        {formatVal(item.base)}
                      </span>
                    </div>

                    {/* Bars */}
                    <div className="flex items-end justify-center gap-0.5 w-full">
                      <div
                        className={`rounded-t-md transition-all duration-700 ${
                          item.year === "2025"
                            ? "bg-gradient-to-t from-gray-400 to-gray-300"
                            : "bg-gradient-to-t from-mint-700 to-mint-400"
                        }`}
                        style={{
                          height: `${baseH}px`,
                          width: hasUpside ? "calc(50% - 1px)" : "60%",
                          maxWidth: "44px",
                          minWidth: "12px",
                        }}
                      />
                      {hasUpside && (
                        <div
                          className="rounded-t-md bg-gradient-to-t from-sky-600 to-sky-300 transition-all duration-700"
                          style={{
                            height: `${upsideH}px`,
                            width: "calc(50% - 1px)",
                            maxWidth: "44px",
                            minWidth: "12px",
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* X-axis */}
          <div className="mx-6 md:mx-10 h-px bg-gray-200" />

          {/* Year + Type labels */}
          <div className="flex justify-between gap-1 md:gap-3 px-6 md:px-10 pt-3 pb-5">
            {roadmapData.map((item) => (
              <div key={item.year} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[13px] md:text-[15px] font-bold text-gray-800">{item.year}</span>
                <span
                  className={`text-[10px] md:text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    item.type === "실적"
                      ? "bg-gray-100 text-gray-500"
                      : "bg-mint-50 text-mint-600"
                  }`}
                >
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-end gap-5 mb-8 px-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-gray-400 to-gray-300" />
            <span className="text-xs text-gray-400">실적 (Actual)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-mint-700 to-mint-400" />
            <span className="text-xs text-gray-400">Base Plan (기준)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-sky-600 to-sky-300" />
            <span className="text-xs text-gray-400">Upside Plan (도전)</span>
          </div>
          <span className="text-[10px] text-gray-300">※ 막대 높이는 √스케일 적용</span>
        </div>

        {/* Data Table */}
        <div className="scroll-animate scroll-animate-delay-1 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-8">
          <table className="w-full min-w-[600px] bg-white">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-5 py-3.5">
                  연도
                </th>
                <th className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-3.5">
                  구분
                </th>
                <th className="text-right text-xs font-bold text-mint-500 uppercase tracking-wider px-5 py-3.5">
                  Base Plan
                </th>
                <th className="text-right text-xs font-bold text-sky-500 uppercase tracking-wider px-5 py-3.5">
                  Upside Plan
                </th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-5 py-3.5">
                  주요 성장 동인
                </th>
              </tr>
            </thead>
            <tbody>
              {roadmapData.map((item, idx) => {
                const prevBase = idx > 0 ? roadmapData[idx - 1].base : null;
                const prevUpside = idx > 0 ? roadmapData[idx - 1].upside : null;
                return (
                  <tr
                    key={item.year}
                    className={`border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50/60 ${
                      item.year === "2030" ? "bg-mint-50/20" : ""
                    }`}
                  >
                    {/* Year */}
                    <td className="px-5 py-3.5">
                      <span className="text-base font-extrabold text-gray-900">{item.year}</span>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-3.5 text-center">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          item.type === "실적"
                            ? "bg-gray-100 text-gray-500"
                            : "bg-mint-50 text-mint-700 border border-mint-200"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>

                    {/* Base */}
                    <td className="px-5 py-3.5 text-right">
                      <span
                        className={`text-base font-bold ${
                          item.year === "2030" ? "text-mint-600" : "text-gray-900"
                        }`}
                      >
                        {formatVal(item.base)}
                      </span>
                      {prevBase !== null && (
                        <div className="text-[11px] text-mint-400 font-semibold mt-0.5">
                          ×{(item.base / prevBase).toFixed(1)}
                        </div>
                      )}
                    </td>

                    {/* Upside */}
                    <td className="px-5 py-3.5 text-right">
                      <span
                        className={`text-base font-bold ${
                          item.year === "2030"
                            ? "text-sky-600"
                            : item.upside !== item.base
                            ? "text-sky-500"
                            : "text-gray-400"
                        }`}
                      >
                        {formatVal(item.upside)}
                      </span>
                      {prevUpside !== null && item.upside !== item.base && (
                        <div className="text-[11px] text-sky-400 font-semibold mt-0.5">
                          ×{(item.upside / prevUpside).toFixed(1)}
                        </div>
                      )}
                    </td>

                    {/* Drivers */}
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1.5">
                        {item.drivers.map((d, di) => (
                          <span
                            key={di}
                            className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Growth Phase Drivers */}
        <div className="scroll-animate scroll-animate-delay-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              성장 단계별 드라이버
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {growthPhases.map((p, idx) => (
              <div
                key={p.phase}
                className={`scroll-animate scroll-animate-delay-${idx} rounded-2xl border p-4 transition-all duration-300 hover:shadow-md ${
                  p.color === "mint"
                    ? "bg-white border-mint-200 hover:border-mint-400 hover:shadow-mint-500/5"
                    : p.color === "sky"
                    ? "bg-white border-sky-200 hover:border-sky-400 hover:shadow-sky-500/5"
                    : p.color === "indigo"
                    ? "bg-white border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-500/5"
                    : "bg-white border-sky-200 hover:border-sky-400 hover:shadow-sky-500/5"
                }`}
              >
                {/* Phase badge */}
                <div className="flex items-center gap-2 mb-2.5">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full text-white ${
                      p.color === "mint"
                        ? "bg-mint-600"
                        : p.color === "sky"
                        ? "bg-sky-600"
                        : p.color === "indigo"
                        ? "bg-indigo-600"
                        : "bg-sky-700"
                    }`}
                  >
                    {p.phase}
                  </span>
                  <span
                    className={`text-[11px] font-semibold ${
                      p.color === "mint"
                        ? "text-mint-500"
                        : p.color === "sky"
                        ? "text-sky-500"
                        : p.color === "indigo"
                        ? "text-indigo-500"
                        : "text-sky-500"
                    }`}
                  >
                    {p.period}
                  </span>
                </div>
                <p className="text-base font-extrabold text-gray-900 mb-1">{p.label}</p>
                <p className="text-[13px] text-gray-500 leading-relaxed">{p.desc}</p>

                {/* Bottom accent */}
                <div
                  className={`mt-3 h-1 w-full rounded-full opacity-30 ${
                    p.color === "mint"
                      ? "bg-gradient-to-r from-mint-500 to-mint-300"
                      : p.color === "sky"
                      ? "bg-gradient-to-r from-sky-500 to-sky-300"
                      : p.color === "indigo"
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-300"
                      : "bg-gradient-to-r from-sky-500 to-sky-300"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RevenueRoadmap;
