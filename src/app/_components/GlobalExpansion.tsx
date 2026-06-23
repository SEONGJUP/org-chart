"use client";

import { useScrollAnimation } from "../_hooks/useScrollAnimation";

const GlobalExpansion = () => {
  const animRef = useScrollAnimation();

  return (
    <div className="w-full bg-white overflow-hidden" ref={animRef}>
      <div className="max-w-[1140px] mx-auto px-6 py-24 md:py-32">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="scroll-animate text-mint-600 font-bold text-sm tracking-[0.2em] uppercase mb-3">
            Global Expansion
          </p>
          <h2 className="scroll-animate scroll-animate-delay-1 text-3xl md:text-[42px] font-extrabold leading-tight text-gray-900">
            Smart Safety,{" "}
            <span className="text-mint-600">
              Going Global
            </span>
          </h2>
          <p className="scroll-animate scroll-animate-delay-2 text-gray-500 mt-4 text-lg max-w-[640px] mx-auto leading-relaxed">
            Starting with Indonesia — where large-scale infrastructure
            projects are driving unprecedented demand for smart safety
            solutions.
          </p>
        </div>

        {/* Main Content: Map + Info Cards */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Indonesia Map SVG */}
          <div className="scroll-animate-left flex-1 w-full lg:max-w-[560px] relative">
            <svg
              viewBox="0 0 800 450"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto relative z-10"
            >
              {/* Grid lines */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <line
                  key={`v-${i}`}
                  x1={100 * i}
                  y1="0"
                  x2={100 * i}
                  y2="450"
                  stroke="#e5e8eb"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              ))}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={100 * i + 25}
                  x2="800"
                  y2={100 * i + 25}
                  stroke="#e5e8eb"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              ))}

              {/* Sumatra */}
              <path
                d="M120,160 L140,145 L165,130 L180,135 L195,150 L200,170 L195,195 L180,220 L165,245 L150,260 L135,270 L120,265 L110,250 L105,230 L110,205 L115,185 Z"
                fill="#00b7af"
                fillOpacity="0.15"
                stroke="#00b7af"
                strokeWidth="1.5"
              />
              {/* Java */}
              <path
                d="M220,280 L260,275 L310,270 L360,268 L400,270 L420,275 L415,285 L390,290 L350,288 L300,285 L260,288 L230,290 L220,285 Z"
                fill="#00b7af"
                fillOpacity="0.15"
                stroke="#00b7af"
                strokeWidth="1.5"
              />
              {/* Kalimantan (Borneo) */}
              <path
                d="M280,140 L320,120 L360,115 L390,125 L400,150 L395,180 L380,205 L360,220 L335,225 L310,215 L290,195 L275,170 L275,155 Z"
                fill="#00b7af"
                fillOpacity="0.15"
                stroke="#00b7af"
                strokeWidth="1.5"
              />
              {/* Sulawesi */}
              <path
                d="M430,140 L445,125 L460,130 L465,150 L455,170 L460,190 L470,200 L465,215 L450,220 L440,205 L435,185 L440,170 L430,155 Z"
                fill="#00b7af"
                fillOpacity="0.15"
                stroke="#00b7af"
                strokeWidth="1.5"
              />
              {/* Papua */}
              <path
                d="M600,150 L640,135 L680,130 L710,140 L720,160 L715,185 L700,205 L675,215 L650,210 L630,195 L615,175 L605,160 Z"
                fill="#00b7af"
                fillOpacity="0.15"
                stroke="#00b7af"
                strokeWidth="1.5"
              />
              {/* Small islands */}
              <path
                d="M430,278 L445,275 L443,282 L432,284 Z"
                fill="#00b7af"
                fillOpacity="0.15"
                stroke="#00b7af"
                strokeWidth="1"
              />
              <path
                d="M455,275 L475,272 L473,280 L457,282 Z"
                fill="#00b7af"
                fillOpacity="0.15"
                stroke="#00b7af"
                strokeWidth="1"
              />
              <path
                d="M485,270 L520,265 L518,275 L487,278 Z"
                fill="#00b7af"
                fillOpacity="0.15"
                stroke="#00b7af"
                strokeWidth="1"
              />

              {/* Nusantara (New Capital) marker - pulsing */}
              <circle cx="350" cy="195" r="16" fill="#00b7af" fillOpacity="0.12">
                <animate
                  attributeName="r"
                  values="16;24;16"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  values="0.12;0.04;0.12"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="350" cy="195" r="5" fill="#00b7af" />
              <circle cx="350" cy="195" r="2.5" fill="white" />

              {/* Nusantara label */}
              <g>
                <rect
                  x="360"
                  y="180"
                  width="120"
                  height="28"
                  rx="6"
                  fill="white"
                  stroke="#00b7af"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
                <text
                  x="420"
                  y="192"
                  textAnchor="middle"
                  fill="#00716c"
                  fontSize="10"
                  fontWeight="700"
                >
                  Nusantara
                </text>
                <text
                  x="420"
                  y="203"
                  textAnchor="middle"
                  fill="#8b95a1"
                  fontSize="8"
                >
                  New Capital City
                </text>
              </g>

              {/* Jakarta marker */}
              <circle cx="250" cy="272" r="4" fill="#0284c7" />
              <circle cx="250" cy="272" r="2" fill="white" />
              <text
                x="250"
                y="264"
                textAnchor="middle"
                fill="#0284c7"
                fontSize="9"
                fontWeight="600"
              >
                Jakarta
              </text>

              {/* Connection line: Korea to Indonesia */}
              <path
                d="M420,40 Q350,100 300,160"
                stroke="url(#connectionGradient)"
                strokeWidth="1.5"
                strokeDasharray="6,4"
                fill="none"
                opacity="0.5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-20"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Korea label */}
              <g>
                <rect
                  x="395"
                  y="22"
                  width="72"
                  height="24"
                  rx="12"
                  fill="white"
                  stroke="#0284c7"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
                <text
                  x="431"
                  y="38"
                  textAnchor="middle"
                  fill="#0284c7"
                  fontSize="10"
                  fontWeight="700"
                >
                  KOREA
                </text>
              </g>

              <defs>
                <linearGradient
                  id="connectionGradient"
                  x1="420"
                  y1="40"
                  x2="300"
                  y2="160"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0284c7" />
                  <stop offset="1" stopColor="#00b7af" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Right: Info Cards */}
          <div className="scroll-animate-right flex-1 flex flex-col gap-6 w-full lg:max-w-[460px]">
            {/* Card 1: Market Opportunity */}
            <div className="group relative bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-mint-400 transition-all duration-300 hover:shadow-lg hover:shadow-mint-500/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-mint-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-mint-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Market Opportunity
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Increasing demand for{" "}
                <span className="text-mint-800 font-semibold">
                  Smart Safety solutions
                </span>{" "}
                driven by large-scale infrastructure projects, including
                Indonesia&apos;s new capital city{" "}
                <span className="text-mint-800 font-semibold">
                  Nusantara
                </span>.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs bg-mint-50 text-mint-700 font-semibold px-3 py-1.5 rounded-full border border-mint-200">
                  New Capital Project
                </span>
                <span className="text-xs bg-mint-50 text-mint-700 font-semibold px-3 py-1.5 rounded-full border border-mint-200">
                  Infrastructure Boom
                </span>
                <span className="text-xs bg-mint-50 text-mint-700 font-semibold px-3 py-1.5 rounded-full border border-mint-200">
                  Smart Safety
                </span>
              </div>
            </div>

            {/* Card 2: Expansion Strategy */}
            <div className="group relative bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-sky-400 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-sky-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Expansion Strategy
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Leveraging the expansion of major Korean corporations in
                Indonesia — including{" "}
                <span className="text-sky-800 font-semibold">
                  Hyundai E&C
                </span>{" "}
                and{" "}
                <span className="text-sky-800 font-semibold">
                  Hyundai Motor Group
                </span>{" "}
                — for joint market entry and strategic collaboration.
              </p>
              <div className="flex gap-2 mt-4 flex-nowrap">
                <div className="flex items-center gap-1.5 text-xs bg-sky-50 text-sky-700 font-semibold px-3 py-1.5 rounded-full border border-sky-200 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full flex-shrink-0" />
                  Hyundai E&C
                </div>
                <div className="flex items-center gap-1.5 text-xs bg-sky-50 text-sky-700 font-semibold px-3 py-1.5 rounded-full border border-sky-200 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full flex-shrink-0" />
                  Hyundai Motor Group
                </div>
                <div className="flex items-center gap-1.5 text-xs bg-sky-50 text-sky-700 font-semibold px-3 py-1.5 rounded-full border border-sky-200 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full flex-shrink-0" />
                  Joint Market Entry
                </div>
              </div>
            </div>

            {/* Target Country Badge */}
            <div className="scroll-animate scroll-animate-delay-3 flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
              <div className="text-3xl">🇮🇩</div>
              <div>
                <p className="text-gray-900 font-bold text-sm">
                  Target Country: Indonesia
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  Population 270M+ &middot; GDP Growth 5%+ &middot; Infrastructure Boom
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalExpansion;
