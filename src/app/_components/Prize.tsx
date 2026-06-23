"use client";

import { assetPathProvider } from "@/config/asset_path_provider";
import { useScrollAnimation } from "../_hooks/useScrollAnimation";

const prizeImages = [
  assetPathProvider.prize.prize1,
  assetPathProvider.prize.prize2,
  assetPathProvider.prize.prize3,
  assetPathProvider.prize.prize4,
  assetPathProvider.prize.prize5,
];

const Prize = () => {
  const animRef = useScrollAnimation();

  return (
    <div className="w-full bg-gray-900" ref={animRef}>
      <div className="max-w-[1140px] mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="scroll-animate text-mint-400 text-sm font-bold tracking-widest uppercase mb-3">
            Awards
          </p>
          <h3 className="scroll-animate scroll-animate-delay-1 text-[28px] md:text-[32px] font-extrabold text-white">
            새임이 받은 인정
          </h3>
        </div>

        <div className="scroll-animate scroll-animate-delay-2 flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {prizeImages.map((src, index) => (
            <div
              key={index}
              className="w-36 md:w-44 bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <img
                className="w-full object-contain"
                src={src}
                alt={`prize-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prize;
