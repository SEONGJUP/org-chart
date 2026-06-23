"use client";

import { assetPathProvider } from "@/config/asset_path_provider";
import { useScrollAnimation } from "../_hooks/useScrollAnimation";

const certLogos = [
  { src: assetPathProvider.logo.goodsoft, alt: "GS인증", label: "GS인증" },
  { src: assetPathProvider.logo.ve, alt: "벤처기업", label: "벤처기업" },
  { src: assetPathProvider.logo.mainbiz, alt: "메인비즈", label: "메인비즈" },
  { src: assetPathProvider.logo.koita, alt: "연구소기업", label: "연구소기업" },
  { src: assetPathProvider.logo.start, alt: "스타트업", label: "스타트업" },
];

const customers = assetPathProvider.logo.customers;
const allCustomerLogos = [
  customers.hd, customers.dl, customers.shSng, customers.shScs,
  customers.ean, customers.gau, customers.ebm, customers.gaon,
  customers.baeksan, customers.buyoung, customers.sanha, customers.ocean,
  customers.carrier, customers.yk, customers.insung, customers.gtack,
  customers.hangyul, customers.samjung, customers.heungwooConst, customers.heungwooInd,
  customers.dowon, customers.shinyoung, customers.topwith, customers.hdasan,
  customers.kihs, customers.hsuco, customers.hoban, customers.spf,
  customers.kapa, customers.kscsa, customers.kalis, customers.hanwha,
];

const row1 = allCustomerLogos.slice(0, 11);
const row2 = allCustomerLogos.slice(11, 22);
const row3 = allCustomerLogos.slice(22, 32);

const Onboarding = () => {
  const animRef = useScrollAnimation(0.1);

  return (
    <div className="relative min-h-screen w-full overflow-hidden" ref={animRef}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-mint-50 via-white to-mint-100" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-mint-200/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-mint-300/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

      {/* Content */}
      <div className="relative z-10 max-w-[1140px] mx-auto px-6 pt-[160px] pb-[80px] flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col justify-center">
          {/* Badge */}
          <div className="scroll-animate">
            <span className="inline-flex items-center px-4 py-2 bg-mint-500/10 text-mint-700 text-sm font-semibold rounded-full">
              중대재해처벌법 컴플라이언스 No.1
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="scroll-animate scroll-animate-delay-1 mt-6 text-[44px] md:text-[56px] font-extrabold leading-[1.25] tracking-tight text-gray-900">
            안전관리,
            <br />
            <span className="text-mint-600">새임</span>과 함께라면
            <br />
            쉬워집니다
          </h1>

          {/* Sub text */}
          <p className="scroll-animate scroll-animate-delay-2 mt-6 text-lg md:text-xl text-gray-500 leading-relaxed max-w-[520px]">
            우리 회사에 안전관리자가 없어도, 걱정하지 마세요.
            <br />
            스마트 안전관리체계를 구축해 드립니다.
          </p>

          {/* CTA Buttons */}
          <div className="scroll-animate scroll-animate-delay-3 mt-10 flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-gray-900 text-white text-[16px] font-bold rounded-2xl hover:bg-gray-800 transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
              무료로 시작하기
            </button>
            <button className="px-8 py-4 bg-white text-gray-700 text-[16px] font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
              서비스 소개서
            </button>
          </div>

          {/* Certification Logos - Badge Style */}
          <div className="scroll-animate scroll-animate-delay-4 mt-12 flex items-center justify-center gap-3 flex-wrap">
            {certLogos.map((logo, index) => (
              <div
                key={logo.alt}
                className="group flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md hover:border-mint-300 transition-all"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-6 w-auto object-contain"
                />
                <span className="text-[13px] font-semibold text-gray-600 group-hover:text-mint-700 transition-colors whitespace-nowrap">
                  {logo.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Logo Portfolio - Multi-row Infinite Scroll */}
        <div className="scroll-animate scroll-animate-delay-5 mt-auto pt-10">
          <p className="text-sm font-semibold text-gray-400 mb-5 tracking-wide">
            <span className="text-mint-600 font-bold">32+</span> 기업이 새임과 함께하고 있습니다
          </p>
          <div className="relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 py-5">
            {/* Gradient Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none" />

            {/* Row 1 - Left */}
            <div className="flex mb-3 logo-scroll-left">
              <div className="flex shrink-0 items-center gap-4 animate-scroll-left">
                {[...row1, ...row1].map((src, i) => (
                  <div key={`r1-${i}`} className="flex-shrink-0 w-[120px] h-[48px] flex items-center justify-center bg-white rounded-xl border border-gray-100 px-3 hover:border-mint-200 hover:shadow-sm transition-all">
                    <img src={src} alt={`client-${i}`} className="max-h-[28px] max-w-[96px] object-contain opacity-60 hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
              <div className="flex shrink-0 items-center gap-4 animate-scroll-left" aria-hidden>
                {[...row1, ...row1].map((src, i) => (
                  <div key={`r1d-${i}`} className="flex-shrink-0 w-[120px] h-[48px] flex items-center justify-center bg-white rounded-xl border border-gray-100 px-3 hover:border-mint-200 hover:shadow-sm transition-all">
                    <img src={src} alt="" className="max-h-[28px] max-w-[96px] object-contain opacity-60 hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 - Right */}
            <div className="flex mb-3 logo-scroll-right">
              <div className="flex shrink-0 items-center gap-4 animate-scroll-right">
                {[...row2, ...row2].map((src, i) => (
                  <div key={`r2-${i}`} className="flex-shrink-0 w-[120px] h-[48px] flex items-center justify-center bg-white rounded-xl border border-gray-100 px-3 hover:border-mint-200 hover:shadow-sm transition-all">
                    <img src={src} alt={`client-${i}`} className="max-h-[28px] max-w-[96px] object-contain opacity-60 hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
              <div className="flex shrink-0 items-center gap-4 animate-scroll-right" aria-hidden>
                {[...row2, ...row2].map((src, i) => (
                  <div key={`r2d-${i}`} className="flex-shrink-0 w-[120px] h-[48px] flex items-center justify-center bg-white rounded-xl border border-gray-100 px-3 hover:border-mint-200 hover:shadow-sm transition-all">
                    <img src={src} alt="" className="max-h-[28px] max-w-[96px] object-contain opacity-60 hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3 - Left (slower) */}
            <div className="flex logo-scroll-left">
              <div className="flex shrink-0 items-center gap-4 animate-scroll-left-slow">
                {[...row3, ...row3].map((src, i) => (
                  <div key={`r3-${i}`} className="flex-shrink-0 w-[120px] h-[48px] flex items-center justify-center bg-white rounded-xl border border-gray-100 px-3 hover:border-mint-200 hover:shadow-sm transition-all">
                    <img src={src} alt={`client-${i}`} className="max-h-[28px] max-w-[96px] object-contain opacity-60 hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
              <div className="flex shrink-0 items-center gap-4 animate-scroll-left-slow" aria-hidden>
                {[...row3, ...row3].map((src, i) => (
                  <div key={`r3d-${i}`} className="flex-shrink-0 w-[120px] h-[48px] flex items-center justify-center bg-white rounded-xl border border-gray-100 px-3 hover:border-mint-200 hover:shadow-sm transition-all">
                    <img src={src} alt="" className="max-h-[28px] max-w-[96px] object-contain opacity-60 hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
