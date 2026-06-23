"use client";

import { useScrollAnimation, useCountUp } from "../_hooks/useScrollAnimation";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useCountUp(value, 1800);
  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

const FinancialPlan = () => {
  const animRef = useScrollAnimation();

  return (
    <div className="w-full bg-gray-50 overflow-hidden" ref={animRef}>
      <div className="max-w-[1140px] mx-auto px-6 py-24 md:py-32">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="scroll-animate text-mint-600 font-bold text-sm tracking-[0.2em] uppercase mb-3">
            Financials
          </p>
          <h2 className="scroll-animate scroll-animate-delay-1 text-3xl md:text-[42px] font-extrabold leading-tight text-gray-900">
            Financial{" "}
            <span className="text-mint-600">Plan</span>
          </h2>
          <p className="scroll-animate scroll-animate-delay-2 text-gray-500 mt-4 text-lg max-w-[600px] mx-auto leading-relaxed">
            Clear revenue trajectory, solid runway, and strategic
            investment milestones driving sustainable growth.
          </p>
        </div>

        {/* ── Revenue + Capital + Path — 3 columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-14">
          {/* Revenue Performance */}
          <div className="scroll-animate bg-white rounded-2xl border border-gray-200 hover:border-mint-400 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-mint-500/5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
              Revenue & Projection
            </h3>

            <div className="flex items-end gap-3 justify-center h-[200px]">
              {/* 2025 */}
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm font-extrabold text-gray-900">
                  <AnimatedNumber value={205} />
                  <span className="text-[10px] font-semibold text-gray-400 ml-0.5">M</span>
                </div>
                <div className="w-12 rounded-t-lg bg-gradient-to-t from-mint-600 to-mint-400" style={{ height: "28px" }} />
                <div className="text-center">
                  <p className="text-[11px] font-bold text-gray-800">2025</p>
                  <p className="text-[9px] text-gray-400">Actual</p>
                </div>
              </div>

              {/* 2026 */}
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm font-extrabold text-mint-600">
                  <AnimatedNumber value={1000} />
                  <span className="text-[10px] font-semibold text-mint-400 ml-0.5">M</span>
                </div>
                <div className="w-12 rounded-t-lg bg-gradient-to-t from-mint-700 to-mint-500 relative" style={{ height: "80px" }}>
                  <div className="absolute -top-1 -right-1 bg-mint-600 text-white text-[8px] font-bold px-1 py-0.5 rounded-full">
                    +388%
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-bold text-gray-800">2026</p>
                  <p className="text-[9px] text-gray-400">Projected</p>
                </div>
              </div>

              {/* 2027 - Stacked bar: Domestic + Export */}
              <div className="flex items-end gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-sm font-extrabold text-mint-700">
                    <AnimatedNumber value={1500} />
                    <span className="text-[10px] font-semibold text-mint-500 ml-0.5">M+</span>
                  </div>
                  <div className="w-12 rounded-t-lg overflow-hidden relative" style={{ height: "150px" }}>
                    {/* Export portion */}
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-t from-sky-600 to-sky-400 border-b border-white/30" style={{ height: "50px" }} />
                    {/* Domestic portion */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-mint-700 to-mint-500" style={{ height: "100px" }} />
                  </div>
                  <div className="text-center">
                    <p className="text-[11px] font-bold text-gray-800">2027</p>
                    <p className="text-[9px] text-gray-400">Total</p>
                  </div>
                </div>

                {/* Breakdown labels */}
                <div className="flex flex-col gap-1.5 pb-8">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm bg-mint-500 flex-shrink-0" />
                    <span className="text-[10px] text-gray-600 whitespace-nowrap">Domestic <span className="font-bold text-gray-900">1,000M+</span></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm bg-sky-500 flex-shrink-0" />
                    <span className="text-[10px] text-gray-600 whitespace-nowrap">Export <span className="font-bold text-gray-900">500M+</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-mint-500" />
                <span className="text-[9px] text-gray-500">Domestic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-sky-500" />
                <span className="text-[9px] text-gray-500">Export (Indonesia)</span>
              </div>
            </div>

            <p className="text-center text-[10px] text-gray-400 mt-4">Unit: Million KRW</p>
          </div>

          {/* Capital & Runway */}
          <div className="scroll-animate scroll-animate-delay-1 bg-white rounded-2xl border border-gray-200 hover:border-mint-400 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-mint-500/5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-mint-100 flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-mint-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-extrabold text-gray-900">Capital & Runway</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <span className="text-sm text-gray-500">Revenue Target</span>
                <span className="text-sm font-bold text-gray-900">1,000M KRW</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <span className="text-sm text-gray-500">Planned Investment</span>
                <span className="text-sm font-bold text-gray-900">250M KRW</span>
              </div>
              <div className="flex items-center justify-between bg-mint-50 rounded-xl px-4 py-3 border border-mint-200">
                <span className="text-sm text-mint-700">Gov R&D Funding</span>
                <span className="text-sm font-bold text-mint-700 text-right whitespace-nowrap flex-shrink-0">200M+ KRW (Expected)</span>
              </div>
            </div>
          </div>

          {/* Path to Profitability */}
          <div className="scroll-animate scroll-animate-delay-2 bg-white rounded-2xl border border-gray-200 hover:border-sky-400 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-base font-extrabold text-gray-900">Path to Profitability</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                <p className="text-sm text-gray-600">Scale SaaS to <span className="font-semibold text-gray-900">50+ mid-sized sites</span></p>
              </div>
              <div className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                <p className="text-sm text-gray-600">Secure high-margin <span className="font-semibold text-gray-900">construction SI contracts</span></p>
              </div>
              <div className="flex items-start gap-3 bg-sky-50 rounded-xl px-4 py-3 border border-sky-200">
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                <p className="text-sm text-sky-800 font-medium">500M KRW export from Indonesia by 2027</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Investment Status ── */}
        <div className="scroll-animate scroll-animate-delay-2">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Investment
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </div>

        <div className="scroll-animate scroll-animate-delay-3 bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Status */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Current Status</p>
              <p className="text-sm font-bold text-gray-900">Pre-Investment</p>
              <p className="text-xs text-gray-400 mt-1">As of Feb 2026</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-mint-400" />
                <svg className="w-5 h-5 text-mint-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="flex-1 h-px bg-gradient-to-r from-mint-400 to-gray-200" />
              </div>
            </div>
            {/* Mobile arrow */}
            <div className="flex md:hidden items-center justify-center py-1">
              <svg className="w-5 h-5 text-mint-500 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            {/* Upcoming */}
            <div className="flex flex-col items-center text-center p-4 bg-mint-50 rounded-xl border border-mint-200">
              <div className="w-12 h-12 rounded-full bg-mint-100 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-mint-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <p className="text-xs text-mint-600 font-medium uppercase tracking-wider mb-1">H1 2026</p>
              <p className="text-sm font-bold text-gray-900">PwC Samil Investment</p>
              <p className="text-xs text-gray-500 mt-1">PwC Global Network</p>
            </div>
          </div>

          {/* IR Targets */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">
              Active IR Targets — Seed / Pre-A
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                CNTTECH (TIPS)
              </span>
              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                Plan H Ventures (TIPS)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialPlan;
