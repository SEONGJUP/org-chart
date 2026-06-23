"use client";

import { useScrollAnimation } from "../_hooks/useScrollAnimation";
import { assetPathProvider } from "@/config/asset_path_provider";

const Content2NEW = () => {
  const animRef = useScrollAnimation();

  return (
    <div className="w-full bg-gray-50" ref={animRef}>
      <div className="max-w-[1140px] mx-auto px-6 py-24 md:py-32">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="scroll-animate text-mint-600 text-sm font-bold tracking-widest uppercase mb-4">
            About SEIIM
          </p>
          <h2 className="scroll-animate scroll-animate-delay-1 text-[32px] md:text-[40px] font-extrabold text-gray-900 leading-tight">
            안전관리의 모든 것,
            <br />
            한 곳에서 해결하세요
          </h2>
          <p className="scroll-animate scroll-animate-delay-2 mt-6 text-gray-500 text-lg max-w-[600px] mx-auto leading-relaxed">
            복잡한 안전관리 업무를 체계적이고 효율적으로 관리할 수 있는
            올인원 솔루션을 제공합니다.
          </p>
        </div>

        {/* Image */}
        <div className="scroll-animate-scale scroll-animate-delay-3">
          <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
            <img
              src={assetPathProvider.image.aboutCompany}
              alt="about-company"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content2NEW;
