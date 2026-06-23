"use client";

import React, { useState } from "react";
import { timelineData } from "../_data/timelineData";
import type { TimelineEvent, TimelineYear } from "../_data/timelineData";
import { useScrollAnimation } from "../_hooks/useScrollAnimation";
import { IconChevronDown } from "@tabler/icons-react";

/* ================================================================
   Shared helpers
   ================================================================ */

const BADGE_STYLES: Record<string, { bg: string; text: string }> = {
  수상: { bg: "bg-amber-100", text: "text-amber-700" },
  선정: { bg: "bg-blue-100", text: "text-blue-700" },
  인증: { bg: "bg-green-100", text: "text-green-700" },
  출시: { bg: "bg-purple-100", text: "text-purple-700" },
  설립: { bg: "bg-gray-800", text: "text-white" },
  특허: { bg: "bg-cyan-100", text: "text-cyan-700" },
  협약: { bg: "bg-mint-100", text: "text-mint-700" },
  도입: { bg: "bg-indigo-100", text: "text-indigo-700" },
};

function Badge({ label }: { label: string }) {
  const s = BADGE_STYLES[label] || { bg: "bg-gray-100", text: "text-gray-600" };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide ${s.bg} ${s.text}`}>
      {label}
    </span>
  );
}

function LogoChips({ logos }: { logos: { src: string; alt: string }[] }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap mt-2">
      {logos.map((l, i) => (
        <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-md border border-gray-100">
          <img src={l.src} alt={l.alt} className="h-4 w-auto max-w-[60px] object-contain" />
          <span className="text-[9px] text-gray-400 font-medium whitespace-nowrap">{l.alt}</span>
        </div>
      ))}
    </div>
  );
}

const VIEW_LABELS = [
  { id: 1, label: "아코디언", desc: "접기/펼치기" },
  { id: 2, label: "지그재그", desc: "좌우 교차" },
  { id: 3, label: "카드 그리드", desc: "연도별 카드" },
  { id: 4, label: "하이라이트", desc: "주요 성과만" },
  { id: 5, label: "컴팩트", desc: "전체 한눈에" },
];

/* ================================================================
   STYLE 1 — Accordion (아코디언 접기/펼치기)
   최신 연도만 열림, 나머지는 접힘
   ================================================================ */

function AccordionView() {
  const [openYears, setOpenYears] = useState<Set<string>>(
    new Set([timelineData[0]?.year])
  );

  const toggle = (year: string) => {
    setOpenYears((prev) => {
      const next = new Set(prev);
      next.has(year) ? next.delete(year) : next.add(year);
      return next;
    });
  };

  return (
    <div className="max-w-[780px] mx-auto space-y-3">
      {timelineData.map((yd) => {
        const isOpen = openYears.has(yd.year);
        const hlCount = yd.events.filter((e) => e.highlight).length;

        return (
          <div key={yd.year} className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
            {/* Year header — clickable */}
            <button
              onClick={() => toggle(yd.year)}
              className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-extrabold">{yd.year.slice(2)}</span>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-lg font-extrabold text-gray-900">{yd.year}</span>
                  <span className="text-[12px] text-gray-400">{yd.summary}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-gray-400">{yd.events.length}건</span>
                  {hlCount > 0 && (
                    <span className="text-[11px] text-mint-600 font-bold">주요 {hlCount}건</span>
                  )}
                </div>
              </div>
              <IconChevronDown
                size={18}
                className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Events — collapsible */}
            <div
              className="overflow-hidden transition-all duration-500"
              style={{ maxHeight: isOpen ? `${yd.events.length * 120 + 40}px` : "0px" }}
            >
              <div className="px-5 pb-4 pt-1 border-t border-gray-100">
                <div className="relative ml-5">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" />
                  {yd.events.map((ev, i) => (
                    <div key={i} className="relative flex gap-3 group">
                      <div className="absolute left-0 top-[7px] -translate-x-1/2 z-10">
                        {ev.highlight ? (
                          <div className="w-3 h-3 rounded-full bg-mint-500 border-2 border-mint-200" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-gray-300" />
                        )}
                      </div>
                      <div className="w-4 shrink-0" />
                      <span className={`shrink-0 w-[38px] pt-[2px] text-[12px] ${ev.highlight ? "font-bold text-mint-600" : "font-medium text-gray-400"}`}>
                        {ev.month}
                      </span>
                      <div className="flex-1 pb-3">
                        <div className="flex items-start gap-1.5 flex-wrap">
                          {ev.badge && <Badge label={ev.badge} />}
                          <p className={`text-[13px] leading-relaxed ${ev.highlight ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                            {ev.description}
                          </p>
                        </div>
                        {ev.logos && ev.logos.length > 0 && <LogoChips logos={ev.logos} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================
   STYLE 2 — Zigzag (지그재그 좌우 교차)
   데스크톱에서 이벤트가 중앙 라인 좌·우로 교차 배치
   ================================================================ */

function ZigzagView() {
  const allEvents = timelineData.flatMap((yd) =>
    yd.events.map((ev) => ({ ...ev, year: yd.year }))
  );

  let prevYear = "";

  return (
    <div className="max-w-[900px] mx-auto relative">
      {/* Center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />

      <div className="space-y-4 md:space-y-6">
        {allEvents.map((ev, i) => {
          const isLeft = i % 2 === 0;
          const showYear = ev.year !== prevYear;
          prevYear = ev.year;

          return (
            <React.Fragment key={i}>
              {/* Year marker */}
              {showYear && (
                <div className="flex justify-center relative z-10 py-2">
                  <div className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-extrabold shadow-lg">
                    {ev.year}
                  </div>
                </div>
              )}

              {/* Event card */}
              <div className={`flex items-start gap-4 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Content side */}
                <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                  <div className={`inline-block text-left ${ev.highlight ? "bg-white border border-mint-200 shadow-sm rounded-xl p-3.5" : "p-1"} max-w-[380px] ${isLeft ? "md:ml-auto" : ""}`}>
                    <div className="flex items-start gap-2 flex-wrap">
                      <span className={`text-[12px] ${ev.highlight ? "font-bold text-mint-600" : "font-medium text-gray-400"}`}>
                        {ev.month}
                      </span>
                      {ev.badge && <Badge label={ev.badge} />}
                    </div>
                    <p className={`mt-1 text-[13px] leading-relaxed ${ev.highlight ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                      {ev.description}
                    </p>
                    {ev.logos && ev.logos.length > 0 && <LogoChips logos={ev.logos} />}
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-6 shrink-0 justify-center pt-2">
                  {ev.highlight ? (
                    <div className="w-3.5 h-3.5 rounded-full bg-mint-500 border-[3px] border-mint-200 z-10" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300 z-10" />
                  )}
                </div>

                {/* Empty side */}
                <div className="flex-1 hidden md:block" />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================
   STYLE 3 — Card Grid (카드 그리드)
   연도별 카드, 가로 스크롤
   ================================================================ */

function CardGridView() {
  return (
    <div className="max-w-[1140px] mx-auto">
      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
        {timelineData.map((yd) => {
          const hlCount = yd.events.filter((e) => e.highlight).length;
          return (
            <div
              key={yd.year}
              className="shrink-0 w-[320px] md:w-[360px] snap-start bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Card header */}
              <div className="bg-gray-900 px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-white">{yd.year}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-400">{yd.events.length}건</span>
                    {hlCount > 0 && (
                      <span className="text-[11px] text-mint-400 font-bold">★ {hlCount}</span>
                    )}
                  </div>
                </div>
                <p className="text-[12px] text-gray-400 mt-1">{yd.summary}</p>
              </div>

              {/* Events list */}
              <div className="p-4 space-y-2.5 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {yd.events.map((ev, i) => (
                  <div
                    key={i}
                    className={`rounded-lg p-2.5 ${ev.highlight ? "bg-mint-50 border border-mint-200" : "bg-gray-50"}`}
                  >
                    <div className="flex items-start gap-2 flex-wrap">
                      <span className={`text-[11px] font-medium shrink-0 ${ev.highlight ? "text-mint-600" : "text-gray-400"}`}>
                        {ev.month}
                      </span>
                      {ev.badge && <Badge label={ev.badge} />}
                    </div>
                    <p className={`mt-1 text-[12px] leading-relaxed ${ev.highlight ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                      {ev.description}
                    </p>
                    {ev.logos && ev.logos.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap mt-1.5">
                        {ev.logos.map((l, j) => (
                          <img key={j} src={l.src} alt={l.alt} title={l.alt} className="h-3.5 w-auto max-w-[48px] object-contain opacity-60" />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-center text-[12px] text-gray-400 mt-3">← 좌우로 스크롤하세요 →</p>
    </div>
  );
}

/* ================================================================
   STYLE 4 — Highlight Focus (주요 성과만 크게)
   하이라이트 이벤트를 대형 카드로, 나머지는 컴팩트 리스트
   ================================================================ */

function HighlightView() {
  const highlights = timelineData.flatMap((yd) =>
    yd.events.filter((e) => e.highlight).map((e) => ({ ...e, year: yd.year }))
  );
  const others = timelineData.flatMap((yd) =>
    yd.events.filter((e) => !e.highlight).map((e) => ({ ...e, year: yd.year }))
  );

  const [showOthers, setShowOthers] = useState(false);

  return (
    <div className="max-w-[960px] mx-auto">
      {/* Highlight grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {highlights.map((ev, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-mint-200 shadow-[0_4px_16px_rgba(0,183,175,0.06)] p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-extrabold text-gray-900">
                {ev.year}.{ev.month}
              </span>
              {ev.badge && <Badge label={ev.badge} />}
            </div>
            <p className="text-[14px] font-semibold text-gray-900 leading-snug">
              {ev.description}
            </p>
            {ev.logos && ev.logos.length > 0 && <LogoChips logos={ev.logos} />}
          </div>
        ))}
      </div>

      {/* Others toggle */}
      <div className="text-center">
        <button
          onClick={() => setShowOthers(!showOthers)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-600 text-[13px] font-medium rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
        >
          {showOthers ? "접기" : `기타 이벤트 ${others.length}건 더보기`}
          <IconChevronDown
            size={14}
            className={`transition-transform duration-300 ${showOthers ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {showOthers && (
        <div className="mt-6 bg-gray-50 rounded-2xl p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5">
            {others.map((ev, i) => (
              <div key={i} className="flex items-start gap-2 py-1.5 border-b border-gray-100 last:border-none">
                <span className="text-[11px] text-gray-400 font-medium shrink-0 w-[58px]">
                  {ev.year}.{ev.month}
                </span>
                {ev.badge && <Badge label={ev.badge} />}
                <p className="text-[12px] text-gray-600 flex-1">{ev.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================
   STYLE 5 — Compact Table (컴팩트 테이블)
   연도를 행 그룹으로 묶는 밀도 높은 테이블
   ================================================================ */

function CompactView() {
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-gray-500 font-semibold w-[60px]">연도</th>
              <th className="text-left px-3 py-3 text-gray-500 font-semibold w-[46px]">월</th>
              <th className="text-left px-3 py-3 text-gray-500 font-semibold w-[52px]">구분</th>
              <th className="text-left px-3 py-3 text-gray-500 font-semibold">내용</th>
              <th className="text-left px-3 py-3 text-gray-500 font-semibold w-[100px] hidden md:table-cell">관계기관</th>
            </tr>
          </thead>
          <tbody>
            {timelineData.map((yd) =>
              yd.events.map((ev, i) => (
                <tr
                  key={`${yd.year}-${i}`}
                  className={`border-b border-gray-100 last:border-b-0 ${ev.highlight ? "bg-mint-50/40" : "hover:bg-gray-50"} transition-colors`}
                >
                  {/* Year — only on first row */}
                  {i === 0 ? (
                    <td
                      className="px-4 py-2.5 font-extrabold text-gray-900 text-[14px] align-top"
                      rowSpan={yd.events.length}
                    >
                      {yd.year}
                    </td>
                  ) : null}
                  <td className={`px-3 py-2.5 ${ev.highlight ? "font-bold text-mint-600" : "text-gray-400"}`}>
                    {ev.month}
                  </td>
                  <td className="px-3 py-2.5">
                    {ev.badge && <Badge label={ev.badge} />}
                  </td>
                  <td className={`px-3 py-2.5 ${ev.highlight ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                    {ev.description}
                  </td>
                  <td className="px-3 py-2.5 hidden md:table-cell">
                    {ev.logos && (
                      <div className="flex items-center gap-1 flex-wrap">
                        {ev.logos.map((l, j) => (
                          <img key={j} src={l.src} alt={l.alt} title={l.alt} className="h-3.5 w-auto max-w-[44px] object-contain opacity-60 hover:opacity-100 transition-opacity" />
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================================================================
   Main Component — View Switcher
   ================================================================ */

const HistoryTimeline = () => {
  const [viewMode, setViewMode] = useState(1);
  const animRef = useScrollAnimation(0.05);

  const totalEvents = timelineData.reduce((sum, y) => sum + y.events.length, 0);
  const totalHighlights = timelineData.reduce(
    (sum, y) => sum + y.events.filter((e) => e.highlight).length,
    0
  );

  return (
    <div className="py-24 md:py-32 bg-white" ref={animRef}>
      <div className="max-w-[1140px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="scroll-animate text-mint-600 text-sm font-bold tracking-widest uppercase mb-3">
            History
          </p>
          <h2 className="scroll-animate scroll-animate-delay-1 text-[32px] md:text-[40px] font-extrabold text-gray-900">
            회사 연혁
          </h2>
          <p className="scroll-animate scroll-animate-delay-2 mt-4 text-gray-500 text-lg">
            2021년 설립 이후, 안전관리 혁신을 선도하고 있습니다
          </p>

          {/* Summary stats */}
          <div className="scroll-animate scroll-animate-delay-3 mt-6 inline-flex items-center gap-5 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="text-center">
              <span className="block text-xl font-extrabold text-gray-900">{timelineData.length}</span>
              <span className="text-[11px] text-gray-400">년간</span>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <span className="block text-xl font-extrabold text-gray-900">{totalEvents}</span>
              <span className="text-[11px] text-gray-400">이벤트</span>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <span className="block text-xl font-extrabold text-mint-600">{totalHighlights}</span>
              <span className="text-[11px] text-gray-400">주요 성과</span>
            </div>
          </div>
        </div>

        {/* View Switcher */}
        <div className="scroll-animate scroll-animate-delay-4 flex justify-center mb-12">
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-gray-100 rounded-2xl">
            {VIEW_LABELS.map((v) => (
              <button
                key={v.id}
                onClick={() => setViewMode(v.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${
                  viewMode === v.id
                    ? "bg-white text-gray-900 shadow-sm font-bold"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-extrabold ${
                  viewMode === v.id ? "bg-gray-900 text-white" : "bg-gray-300 text-white"
                }`}>
                  {v.id}
                </span>
                <span className="hidden sm:inline">{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* View Content */}
        <div className="scroll-animate scroll-animate-delay-5">
          {viewMode === 1 && <AccordionView />}
          {viewMode === 2 && <ZigzagView />}
          {viewMode === 3 && <CardGridView />}
          {viewMode === 4 && <HighlightView />}
          {viewMode === 5 && <CompactView />}
        </div>
      </div>
    </div>
  );
};

export default HistoryTimeline;
