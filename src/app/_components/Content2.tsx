"use client";

import React from "react";

import Image from "next/image";

import { assetPathProvider } from "@/config/asset_path_provider";
import { cn } from "@/functions/validation";

const data = [
  "스마트건설·산업안전 DX 솔루션 서비스",
  "현장-사무실의 On-line Cloud 업무환경 구축",
  "모바일 연동 DX 문서자동화 APP & S/W 개발",
];

const Content2 = () => {
  return (
    <div className="bg-[#F8FBFB]">
      <div className="max-w-[1280px] mx-auto py-12 flex flex-col items-center">
        <p className="text-[24px] md:text-[32px] font-bold text-gray-800">
          서비스 영역
        </p>

        <div className="hidden md:flex gap-4 text-gray-600 mt-8">
          <p>{data[0]}</p>
          <p className="text-gray-400">|</p>
          <p>{data[1]}</p>
          <p className="text-gray-400">|</p>
          <p>{data[2]}</p>
        </div>

        <div className="flex md:hidden flex-col font-semibold text-gray-600 mt-8">
          <p>· {data[0]}</p>
          <p>· {data[1]}</p>
          <p>· {data[2]}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8 md:mt-12">
          <div
            className={cn(
              "flex flex-col items-center bg-white rounded-xl py-6 px-4 select-none w-[calc(100vw-32px)] md:w-auto",
              "border-2 border-mint-100 hover:border-mint-400"
            )}
          >
            <div className="relative w-[200px] aspect-3/2">
              <Image
                src={assetPathProvider.image.safebuddyMacbook}
                alt="safebuddy-icon"
                fill
                className="object-contain"
              />
            </div>

            <div className="relative w-[120px] h-[60px] mt-4">
              <Image
                src={assetPathProvider.logo.safeBuddy}
                alt="safebuddy-icon"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col items-center text-gray-700 text-[16px] font-semibold mt-2">
              <p>AI 안전비서</p>
              <p>스마트 안전보건관리체계 통합 솔루션</p>
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col items-center bg-white rounded-xl py-6 px-4 select-none w-[calc(100vw-32px)] md:w-auto",
              "border-2 border-mint-100 hover:border-mint-400"
            )}
          >
            <div className="relative w-[200px] aspect-3/2">
              <Image
                src={assetPathProvider.image.safeEdu}
                alt="safebuddy-icon"
                fill
                className="object-contain"
              />
            </div>

            <div className="relative w-[120px] h-[60px] mt-4">
              <Image
                src={assetPathProvider.logo.saiifEdu}
                alt="safebuddy-icon"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col items-center text-gray-700 text-[16px] font-semibold mt-2">
              <p>건설·산업현장 AI 기반의</p>
              <p>스마트 안전·보건교육 시스템</p>
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col items-center bg-white rounded-xl py-6 px-4 select-none w-[calc(100vw-32px)] md:w-auto",
              "border-2 border-mint-100 hover:border-mint-400"
            )}
          >
            <div className="relative w-[200px] aspect-3/2">
              <Image
                src={assetPathProvider.image.safeMaster}
                alt="safebuddy-icon"
                fill
                className="object-contain"
              />
            </div>

            <div className="relative w-[120px] h-[60px] mt-4">
              <Image
                src={assetPathProvider.logo.safeMeister}
                alt="safebuddy-icon"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col items-center text-gray-700 text-[16px] font-semibold mt-2">
              <p>중견·중소건설사 및 협력사用</p>
              <p>안전경영 ERP 플랫폼</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content2;
