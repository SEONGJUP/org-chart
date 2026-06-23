"use client";

import Marquee from "react-fast-marquee";
import { assetPathProvider } from "@/config/asset_path_provider";
import { useScrollAnimation } from "../_hooks/useScrollAnimation";

const certificateImages = [
  assetPathProvider.certificate.new1,
  assetPathProvider.certificate.new2,
  assetPathProvider.certificate.new3,
  assetPathProvider.certificate.new4,
  assetPathProvider.certificate.new5,
  assetPathProvider.certificate.new6,
  assetPathProvider.certificate.new7,
  assetPathProvider.certificate.new8,
];

const Certificates = () => {
  const animRef = useScrollAnimation();

  return (
    <div className="py-20 bg-gray-50" ref={animRef}>
      <div className="max-w-[1140px] mx-auto px-6 mb-10">
        <div className="text-center">
          <p className="scroll-animate text-mint-600 text-sm font-bold tracking-widest uppercase mb-3">
            Certificates
          </p>
          <h3 className="scroll-animate scroll-animate-delay-1 text-[28px] md:text-[32px] font-extrabold text-gray-900">
            인증 및 특허
          </h3>
        </div>
      </div>

      <div className="scroll-animate scroll-animate-delay-2">
        <Marquee gradient={true} gradientColor="#f9fafb" speed={35} pauseOnHover={true}>
          {[...certificateImages].map((src, index) => (
            <div
              key={index}
              className="mx-3 rounded-2xl overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <img
                className="w-[160px] md:w-[200px] h-auto object-contain"
                src={src}
                alt={`certificate-${index}`}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Certificates;
