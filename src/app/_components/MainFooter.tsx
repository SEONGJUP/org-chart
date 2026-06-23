"use client";

import Image from "next/image";
import Link from "next/link";

import { assetPathProvider } from "@/config/asset_path_provider";

export default function MainFooter() {
  return (
    <footer data-main-site-footer className="w-full bg-gray-950 pt-16 pb-10">
      <div className="max-w-[1140px] mx-auto px-6">
        {/* Top: Logo + Links */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 pb-10 border-b border-gray-800">
          <div>
            <Image
              src={assetPathProvider.logo.safeBuddyWhite}
              width={120}
              height={36}
              className="h-8 w-auto object-contain opacity-80"
              alt="SafeBuddy 로고"
            />
          </div>

          <div className="flex gap-6 text-sm">
            <Link
              href="https://root-frigate-3f0.notion.site/9cab0b6b88c8436fa9fee8362f5ac15d?pvs=4"
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors"
            >
              서비스이용약관
            </Link>
            <Link
              href="https://root-frigate-3f0.notion.site/3f2beef53a274e04883cfb0322a3cfcf?pvs=4"
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors font-semibold"
            >
              개인정보처리방침
            </Link>
          </div>
        </div>

        {/* Bottom: Company Info */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-gray-500 text-sm leading-loose space-y-1">
            <p>
              <span className="text-gray-400 font-medium">㈜새임</span>
              <span className="mx-2 text-gray-700">|</span>
              대표자 성주필
              <span className="mx-2 text-gray-700">|</span>
              사업자번호 218-81-25047
            </p>
            <p>
              통신판매업신고 제2023-서울마포-0573호
            </p>
            <p>
              서울특별시 마포구 동교로17안길 43-12, 1층(서교동, 하임 HAIM)
            </p>
            <p>
              전화 02-990-1019
              <span className="mx-2 text-gray-700">|</span>
              이메일 biz@seiim.co.kr
            </p>
          </div>

          <div className="md:text-right flex flex-col justify-end">
            <p className="text-gray-600 text-sm">
              COPYRIGHT &copy; 2024 SEIIM ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
