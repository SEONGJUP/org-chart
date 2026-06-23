"use client";

import { useScrollAnimation } from "../_hooks/useScrollAnimation";

const phases = [
  {
    phase: "Phase 1",
    year: "2026",
    title: "Domestic Market Solidification",
    color: "mint" as const,
    items: [
      {
        tag: "Initial Entry",
        text: "Launch SafeBuddy AI Center SaaS after successful PoC with Hyundai E&C by Q1 2026.",
      },
      {
        tag: "Public Sector",
        text: "Enter B2G market via Nara-Jangteo (G2B portal) registration; bid on 2+ public safety projects.",
      },
      {
        tag: "Target Scaling",
        text: "Secure 50+ mid-sized construction & manufacturing sites through a Freemium conversion strategy.",
      },
    ],
  },
  {
    phase: "Phase 2",
    year: "2027",
    title: "Global Entry & Strategic Partnerships",
    color: "sky" as const,
    items: [
      {
        tag: "Entry Strategy",
        text: "Joint overseas entry with Korean EPC firms, starting with a pilot at Hyundai E&C's Indonesia project.",
      },
      {
        tag: "Local Network",
        text: "Partner with PwC Indonesia & local safety consultants to build a reseller network and ESG compliance MOU.",
      },
      {
        tag: "Global Scalability",
        text: "Adapt RAG database for local labor laws (Kementerian Ketenagakerjaan) and ISO 45001 standards.",
      },
    ],
  },
];

const colorMap = {
  mint: {
    badge: "bg-mint-600 text-white",
    yearBg: "bg-mint-50 text-mint-700 border-mint-200",
    card: "border-mint-200 hover:border-mint-400 hover:shadow-mint-500/5",
    tag: "bg-mint-50 text-mint-700 border-mint-200",
    dot: "bg-mint-500",
    line: "from-mint-500 to-mint-300",
    icon: "bg-mint-100 text-mint-600",
    number: "text-mint-500",
  },
  sky: {
    badge: "bg-sky-600 text-white",
    yearBg: "bg-sky-50 text-sky-700 border-sky-200",
    card: "border-sky-200 hover:border-sky-400 hover:shadow-sky-500/5",
    tag: "bg-sky-50 text-sky-700 border-sky-200",
    dot: "bg-sky-500",
    line: "from-sky-500 to-sky-300",
    icon: "bg-sky-100 text-sky-600",
    number: "text-sky-500",
  },
};

const ExpansionPlan = () => {
  const animRef = useScrollAnimation();

  return (
    <div className="w-full bg-gray-50 overflow-hidden" ref={animRef}>
      <div className="max-w-[1140px] mx-auto px-6 py-24 md:py-32">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="scroll-animate text-mint-600 font-bold text-sm tracking-[0.2em] uppercase mb-3">
            Roadmap
          </p>
          <h2 className="scroll-animate scroll-animate-delay-1 text-3xl md:text-[42px] font-extrabold leading-tight text-gray-900">
            Market{" "}
            <span className="text-mint-600">Expansion Plan</span>
          </h2>
          <p className="scroll-animate scroll-animate-delay-2 text-gray-500 mt-4 text-lg max-w-[600px] mx-auto leading-relaxed">
            A two-phase strategy — from domestic market leadership
            to global scale through Indonesia.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center connector line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

          <div className="flex flex-col md:flex-row gap-8 md:gap-6">
            {phases.map((phase, phaseIdx) => {
              const c = colorMap[phase.color];
              return (
                <div
                  key={phase.phase}
                  className={`scroll-animate ${phaseIdx === 1 ? "scroll-animate-delay-2" : ""} flex-1`}
                >
                  {/* Phase Card */}
                  <div className={`bg-white rounded-2xl border ${c.card} p-6 md:p-8 transition-all duration-300 hover:shadow-lg h-full`}>
                    {/* Phase Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${c.badge}`}>
                        {phase.phase}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${c.yearBg}`}>
                        {phase.year}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-gray-900 mb-6">
                      {phase.title}
                    </h3>

                    {/* Items */}
                    <div className="flex flex-col gap-5">
                      {phase.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          {/* Step number */}
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full ${c.icon} flex items-center justify-center font-bold text-sm`}>
                              {idx + 1}
                            </div>
                            {idx < phase.items.length - 1 && (
                              <div className="w-px h-full bg-gray-200 mt-1" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="pb-1">
                            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md border ${c.tag} mb-2`}>
                              {item.tag}
                            </span>
                            <p className="text-gray-600 text-[14px] leading-relaxed">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom highlight bar */}
                    <div className={`mt-6 h-1 w-full rounded-full bg-gradient-to-r ${c.line} opacity-40`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrow between phases (desktop) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpansionPlan;
