import React from "react";

import Image from "next/image";

import { assetPathProvider } from "@/config/asset_path_provider";
import { cn } from "@/functions/validation";

const Content1 = () => {
  return (
    <div className="w-full max-w-[1080px] mx-auto py-20">
      <div className="flex flex-col items-center">
        <div className="relative h-[60px] md:h-[80px] aspect-276/113">
          <Image
            src={assetPathProvider.logo.seiimV2}
            alt="seiim-logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <p className="text-[20px] md:text-[28px] font-bold mt-8 md:mt-12">
          새임은 AI & IT 기술이 아니라,{" "}
          <span className="text-mint-500">안전</span>을 팝니다.
        </p>
      </div>

      <div className="flex flex-row flex-wrap items-center justify-center md:justify-around gap-2 mt-12 md:mt-16">
        <div
          className={cn(
            "flex flex-col items-center rounded-xl py-4 px-6 w-[180px] md:w-[240px] h-[180px] md:h-auto select-none",
            "border-2 border-mint-100 hover:border-mint-400"
          )}
        >
          <div className="relative w-[120px] h-[60px]">
            <Image
              src={assetPathProvider.logo.koita}
              alt="safebuddy-icon"
              fill
              className="object-contain"
            />
          </div>

          <div className="mt-6 font-semibold text-center break-keep">
            <p>벤처기업부설연구소</p>
            <p>AI 기능 연구 및 개발</p>
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col items-center rounded-xl py-4 px-6 w-[180px] md:w-[240px] h-[180px] md:h-auto select-none",
            "border-2 border-mint-100 hover:border-mint-400"
          )}
        >
          <div className="relative w-[120px] h-[60px]">
            <Image
              src={assetPathProvider.logo.molitWide}
              alt="safebuddy-icon"
              fill
              className="object-contain"
            />
          </div>

          <div className="mt-6 font-semibold text-center break-keep">
            <p>스마트건설 얼라이언스</p>
            <p>
              <span className="text-mint-500">스마트안전</span>회원사
            </p>
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col items-center rounded-xl py-4 px-6 w-[180px] md:w-[240px] h-[180px] md:h-auto select-none",
            "border-2 border-mint-100 hover:border-mint-400"
          )}
        >
          <div className="relative w-[120px] h-[60px]">
            <Image
              src={assetPathProvider.logo.jungso}
              alt="safebuddy-icon"
              fill
              className="object-contain"
            />
          </div>

          <div className="mt-6 font-semibold text-center break-keep">
            <p>2023년</p>
            <p>
              <span className="text-mint-500">중소벤처기업부장관상</span> 수상
            </p>
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col items-center rounded-xl py-4 px-6 w-[180px] md:w-[240px] h-[180px] md:h-auto select-none",
            "border-2 border-mint-100 hover:border-mint-400"
          )}
        >
          <div className="relative w-[120px] h-[60px]">
            <Image
              src={assetPathProvider.logo.kapa}
              alt="safebuddy-icon"
              fill
              className="object-contain"
            />
          </div>

          <div className="mt-6 font-semibold flex flex-col items-center justify-center text-center break-keep">
            <p>안전솔루션 도입사 선정</p>
            <Image
              src={assetPathProvider.logo.safeBuddy}
              alt="safebuddy-icon"
              width={60}
              height={20}
              className="object-contain object-center mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content1;
