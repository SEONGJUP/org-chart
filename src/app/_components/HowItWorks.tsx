"use client";

import { useScrollAnimation } from "../_hooks/useScrollAnimation";

const HowItWorks = () => {
  const animRef = useScrollAnimation();

  return (
    <div className="w-full bg-white overflow-hidden" ref={animRef}>
      <div className="max-w-[1140px] mx-auto px-6 py-24 md:py-32">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="scroll-animate text-mint-600 font-bold text-base tracking-[0.2em] uppercase mb-3">
            How It Works
          </p>
          <h2 className="scroll-animate scroll-animate-delay-1 text-4xl md:text-[48px] font-extrabold leading-tight text-gray-900">
            AI-Powered{" "}
            <span className="text-mint-600">Safety Platform</span>
          </h2>
          <p className="scroll-animate scroll-animate-delay-2 text-gray-500 mt-5 text-xl max-w-[650px] mx-auto leading-relaxed">
            Upload a photo or enter text — our AI handles the rest, from
            analysis to multilingual training content.
          </p>
        </div>

        {/* ── Working Principle — Flow Diagram ── */}
        <div className="scroll-animate mb-16">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 px-8 py-5 md:px-10 md:py-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5 text-center">
              Working Principle
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-0">
              {/* Step 1: Input */}
              <div className="flex flex-col items-center text-center max-w-[200px]">
                <div className="w-20 h-20 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-4">
                  <svg className="w-9 h-9 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-lg font-extrabold text-gray-900">Upload</p>
                <p className="text-base text-gray-500 mt-1">Site photo or text</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center px-4">
                <div className="w-14 h-px bg-gray-300" />
                <svg className="w-5 h-5 text-gray-400 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="md:hidden">
                <svg className="w-5 h-5 text-gray-400 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Step 2: AI Analysis */}
              <div className="flex flex-col items-center text-center max-w-[200px]">
                <div className="w-20 h-20 rounded-2xl bg-mint-50 border border-mint-200 shadow-sm flex items-center justify-center mb-4">
                  <svg className="w-9 h-9 text-mint-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.59.659H9.06a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V5a2 2 0 00-2-2h-1" />
                  </svg>
                </div>
                <p className="text-lg font-extrabold text-gray-900">AI Analysis</p>
                <p className="text-base text-gray-500 mt-1">Process recognition</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center px-4">
                <div className="w-14 h-px bg-gray-300" />
                <svg className="w-5 h-5 text-gray-400 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="md:hidden">
                <svg className="w-5 h-5 text-gray-400 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Step 3: Generate */}
              <div className="flex flex-col items-center text-center max-w-[200px]">
                <div className="w-20 h-20 rounded-2xl bg-mint-50 border border-mint-200 shadow-sm flex items-center justify-center mb-4">
                  <svg className="w-9 h-9 text-mint-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <p className="text-lg font-extrabold text-gray-900">Generate</p>
                <p className="text-base mt-1"><span className="text-mint-600 font-semibold">Risk Assessment</span>, <span className="text-mint-600 font-semibold">TBM</span>, <span className="text-mint-600 font-semibold">Video</span></p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center px-4">
                <div className="w-14 h-px bg-gray-300" />
                <svg className="w-5 h-5 text-gray-400 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="md:hidden">
                <svg className="w-5 h-5 text-gray-400 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Step 4: Deliver */}
              <div className="flex flex-col items-center text-center max-w-[200px]">
                <div className="w-20 h-20 rounded-2xl bg-sky-50 border border-sky-200 shadow-sm flex items-center justify-center mb-4">
                  <svg className="w-9 h-9 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38a1.125 1.125 0 01-1.4-.272L7.2 18.385a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.28c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l.663.256c.423.164.916.098 1.277-.194.39-.317.8-.608 1.228-.87a1.125 1.125 0 00.549-1.076l-.11-.72a1.125 1.125 0 01.895-1.274l2.558-.42a1.125 1.125 0 011.262.795l.267.89c.13.433.502.753.953.81.467.058.93.14 1.387.246" />
                  </svg>
                </div>
                <p className="text-lg font-extrabold text-gray-900">Deliver</p>
                <p className="text-base mt-1"><span className="text-sky-600 font-semibold">Multilingual</span> + <span className="text-sky-600 font-semibold">TTS</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Core Functions + Client Benefits — side by side ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Core Functions */}
          <div className="scroll-animate scroll-animate-delay-1 flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-400">
                Core Functions
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {/* Auto Content Generation */}
              <div className="group bg-gray-50 rounded-2xl border border-gray-200 hover:border-mint-400 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-mint-500/5 flex-1 flex items-start">
                <div className="flex gap-4">
                  <div className="w-13 h-13 rounded-xl bg-mint-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-mint-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1.5">
                      AI Content Generation
                    </h4>
                    <p className="text-[15px] text-gray-500 leading-relaxed">
                      LLM-powered auto-generation of safety training content — text, images, and video — tailored to specific work processes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Multilingual + TTS */}
              <div className="group bg-gray-50 rounded-2xl border border-gray-200 hover:border-sky-400 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/5 flex-1 flex items-start">
                <div className="flex gap-4">
                  <div className="w-13 h-13 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1.5">
                      Multilingual Translation & TTS
                    </h4>
                    <p className="text-[15px] text-gray-500 leading-relaxed">
                      Real-time translation and Text-to-Speech voice support, enabling safety training across language barriers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Benefits */}
          <div className="scroll-animate scroll-animate-delay-2 flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-400">
                Client Benefits
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {/* 80% Efficiency */}
              <div className="flex items-center gap-4 bg-mint-50 rounded-2xl border border-mint-200 p-6 flex-1">
                <div className="text-[42px] font-extrabold text-mint-600 leading-none flex-shrink-0">
                  80<span className="text-[28px]">%</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-0.5">
                    Efficiency Gain
                  </h4>
                  <p className="text-[15px] text-gray-500">
                    Reduces time and costs for creating safety training content.
                  </p>
                </div>
              </div>

              {/* Site Managers */}
              <div className="flex items-center gap-4 bg-gray-50 rounded-2xl border border-gray-200 p-6 flex-1">
                <div className="w-13 h-13 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-0.5">
                    For Site Managers
                  </h4>
                  <p className="text-[15px] text-gray-500">
                    Zero paperwork — more time for actual on-site safety management.
                  </p>
                </div>
              </div>

              {/* Workers */}
              <div className="flex items-center gap-4 bg-gray-50 rounded-2xl border border-gray-200 p-6 flex-1">
                <div className="w-13 h-13 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-0.5">
                    For Workers
                  </h4>
                  <p className="text-[15px] text-gray-500">
                    Practical, task-specific safety education tailored to daily work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
