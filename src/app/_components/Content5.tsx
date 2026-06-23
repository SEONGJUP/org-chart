"use client";

import React from "react";

import Marquee from "react-fast-marquee";

import { assetPathProvider } from "@/config/asset_path_provider";

const certificateImages = [
  assetPathProvider.certificate.business,
  assetPathProvider.certificate.venturePrize,
  assetPathProvider.certificate.smartConstruction,
  assetPathProvider.certificate.venture,
  assetPathProvider.certificate.laboratory,
];

const copyrightImages = [
  assetPathProvider.certificate.copyright,
  assetPathProvider.certificate.safePatent,
  assetPathProvider.certificate.production,
];

const Content5 = () => {
  return (
    <div className="pt-20 pb-28 bg-[#01716D]">
      <p className="text-2xl font-bold text-white mb-16 px-4 text-center">
        기업인증 및 지적재산권 현황
      </p>

      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {[...certificateImages, ...copyrightImages].map((src, index) => (
          <img
            className="w-[40vw] md:w-[12vw] object-contain mr-4 md:mr-6"
            key={index}
            src={src}
            alt={`certificate-${index}`}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default Content5;
