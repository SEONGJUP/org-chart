"use client";

import { useScrollAnimation, useCountUp } from "../_hooks/useScrollAnimation";

/* ── Client-side benefits ── */
const clientBenefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "80% Faster Content Creation",
    description: "Dramatically reduces time and costs for producing safety training materials — from days to hours.",
    stat: 80,
    statSuffix: "%",
    statLabel: "Time & Cost Saved",
    color: "mint" as const,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Zero Paperwork for Managers",
    description: "Eliminates manual document preparation, freeing site managers to focus on actual on-site safety.",
    stat: 0,
    statSuffix: "",
    statLabel: "",
    color: "sky" as const,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Task-Specific Training",
    description: "Delivers practical, role-specific safety education tailored to each worker's daily tasks and conditions.",
    stat: 0,
    statSuffix: "",
    statLabel: "",
    color: "violet" as const,
  },
];

/* ── SEIIM-side benefits ── */
const seiimBenefits = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "B2B Onboarding Pipeline",
    description: "Structured 4-step enterprise approach — Touchpoint, Trust Building, Pilot Proposal, and Scale-up — backed by execution-ready documentation.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Localization with Proven Technology",
    description: "Compliance with global safety standards such as ISO 45001 is essential — leveraging domestically proven technology to execute and validate a localization strategy.",
  },
];

const colorMap = {
  mint: {
    iconBg: "bg-mint-100",
    iconText: "text-mint-600",
    border: "border-mint-200 hover:border-mint-400",
    shadow: "hover:shadow-mint-500/8",
    accent: "bg-mint-500",
    statText: "text-mint-600",
  },
  sky: {
    iconBg: "bg-sky-100",
    iconText: "text-sky-600",
    border: "border-sky-200 hover:border-sky-400",
    shadow: "hover:shadow-sky-500/8",
    accent: "bg-sky-500",
    statText: "text-sky-600",
  },
  violet: {
    iconBg: "bg-purple-100",
    iconText: "text-purple-600",
    border: "border-purple-200 hover:border-purple-400",
    shadow: "hover:shadow-purple-500/8",
    accent: "bg-purple-500",
    statText: "text-purple-600",
  },
};

function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useCountUp(value, 1500);
  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>{suffix}
    </span>
  );
}

const ClientBenefits = () => {
  const animRef = useScrollAnimation();

  return (
    <div className="w-full bg-white overflow-hidden" ref={animRef}>
      <div className="max-w-[1140px] mx-auto px-6 py-24 md:py-32">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="scroll-animate text-mint-600 font-bold text-base tracking-[0.2em] uppercase mb-3">
            Benefits
          </p>
          <h2 className="scroll-animate scroll-animate-delay-1 text-4xl md:text-[48px] font-extrabold leading-tight text-gray-900">
            Value for{" "}
            <span className="text-mint-600">Everyone</span>
          </h2>
          <p className="scroll-animate scroll-animate-delay-2 text-gray-500 mt-5 text-xl max-w-[650px] mx-auto leading-relaxed">
            Tangible impact for our clients on site —
            and strategic advantages that power SEIIM&apos;s growth engine.
          </p>
        </div>

        {/* ── For Clients ── */}
        <div className="scroll-animate mb-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-400">
              For Clients
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {clientBenefits.map((b, idx) => {
            const c = colorMap[b.color];
            return (
              <div
                key={idx}
                className={`scroll-animate ${idx === 1 ? "scroll-animate-delay-1" : idx === 2 ? "scroll-animate-delay-2" : ""} group relative bg-white rounded-2xl border ${c.border} p-6 transition-all duration-300 hover:shadow-xl ${c.shadow}`}
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-6 right-6 h-[3px] ${c.accent} rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity`} />

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${c.iconBg} ${c.iconText} flex items-center justify-center mb-5`}>
                  {b.icon}
                </div>

                {/* Stat highlight */}
                {b.stat > 0 && (
                  <>
                    <div className={`text-[52px] font-extrabold ${c.statText} leading-none mb-1`}>
                      <StatCounter value={b.stat} suffix={b.statSuffix} />
                    </div>
                    <p className="text-gray-400 text-sm font-medium mb-3">{b.statLabel}</p>
                  </>
                )}

                {/* Title & Description */}
                <h3 className="text-xl font-extrabold text-gray-900 leading-snug mb-2">
                  {b.title}
                </h3>
                <p className="text-gray-500 text-[16px] leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── For SEIIM ── */}
        <div className="scroll-animate scroll-animate-delay-1 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-400">
              For SEIIM
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {seiimBenefits.map((b, idx) => (
            <div
              key={idx}
              className={`scroll-animate ${idx === 1 ? "scroll-animate-delay-2" : "scroll-animate-delay-1"} group relative bg-gray-50 rounded-2xl border border-gray-200 hover:border-gray-900 p-6 transition-all duration-300 hover:shadow-lg`}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center flex-shrink-0">
                  {b.icon}
                </div>
                {/* Content */}
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 leading-snug mb-2">
                    {b.title}
                  </h3>
                  <p className="text-gray-500 text-[16px] leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientBenefits;
