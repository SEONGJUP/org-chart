"use client";

import React from "react";

import Image from "next/image";

import { chunk } from "es-toolkit";
import Marquee from "react-fast-marquee";

import { assetPathProvider } from "@/config/asset_path_provider";

const logoList = [
  {
    name: "국토교통부",
    logo: assetPathProvider.logo.molitWide,
  },
  {
    name: "중소벤처기업부",
    logo: assetPathProvider.logo.jungso,
  },
  {
    name: "중소벤처기업진흥공단",
    logo: assetPathProvider.logo.kosme,
  },
  {
    name: "벤처확인기업",
    logo: assetPathProvider.logo.ventureEnterprise,
  },
  {
    name: "기술보증기금",
    logo: assetPathProvider.logo.kibo,
  },
  {
    name: "국토안전관리원",
    logo: assetPathProvider.logo.kalis,
  },
  {
    name: "산업안전상생공단",
    logo: assetPathProvider.logo.spf,
  },
  {
    name: "대한중대재해예방협회",
    logo: assetPathProvider.logo.kapa,
  },
  {
    name: "파인지도사사무소",
    logo: assetPathProvider.logo.findSafety,
  },
  {
    name: "건설안전관리원",
    logo: assetPathProvider.logo.icsm,
  },
  {
    name: "서울창조경제혁신센터",
    logo: assetPathProvider.logo.sccei,
  },
  {
    name: "서울경제진흥원",
    logo: assetPathProvider.logo.sba,
  },
  {
    name: "중소벤처기업진흥공단 청년창업사관학교",
    logo: assetPathProvider.logo.kosmeYoung,
  },
];

const customersLogoList = [
  {
    name: "hd",
    logo: assetPathProvider.logo.customers.hd,
  },
  {
    name: "dl",
    logo: assetPathProvider.logo.customers.dl,
  },
  {
    name: "rsquare",
    logo: assetPathProvider.logo.rsquare,
  },
  {
    name: "shSng",
    logo: assetPathProvider.logo.customers.shSng,
  },
  {
    name: "shScs",
    logo: assetPathProvider.logo.customers.shScs,
  },
  {
    name: "ean",
    logo: assetPathProvider.logo.customers.ean,
  },
  {
    name: "gau",
    logo: assetPathProvider.logo.customers.gau,
  },
  {
    name: "ebm",
    logo: assetPathProvider.logo.customers.ebm,
  },
  {
    name: "gaon",
    logo: assetPathProvider.logo.customers.gaon,
  },
  {
    name: "baeksan",
    logo: assetPathProvider.logo.customers.baeksan,
  },
  {
    name: "buyoung",
    logo: assetPathProvider.logo.customers.buyoung,
  },
  {
    name: "sanha",
    logo: assetPathProvider.logo.customers.sanha,
  },
  {
    name: "ocean",
    logo: assetPathProvider.logo.customers.ocean,
  },
  {
    name: "carrier",
    logo: assetPathProvider.logo.customers.carrier,
  },
  {
    name: "yk",
    logo: assetPathProvider.logo.customers.yk,
  },
  {
    name: "insung",
    logo: assetPathProvider.logo.customers.insung,
  },
  {
    name: "gtack",
    logo: assetPathProvider.logo.customers.gtack,
  },
  {
    name: "hangyul",
    logo: assetPathProvider.logo.customers.hangyul,
  },
  {
    name: "samjung",
    logo: assetPathProvider.logo.customers.samjung,
  },
  {
    name: "heungwooConst",
    logo: assetPathProvider.logo.customers.heungwooConst,
  },
  {
    name: "heungwooInd",
    logo: assetPathProvider.logo.customers.heungwooInd,
  },
  {
    name: "dowon",
    logo: assetPathProvider.logo.customers.dowon,
  },
  {
    name: "shinyoung",
    logo: assetPathProvider.logo.customers.shinyoung,
  },
  {
    name: "topwith",
    logo: assetPathProvider.logo.customers.topwith,
  },
];

const Content3 = () => {
  return (
    <div className="flex flex-col items-center pt-20 pb-28 w-screen overflow-x-hidden">
      <p className="text-2xl text-gray-800 font-bold">Partners</p>

      {/* desktop */}
      <div className="hidden md:flex flex-wrap gap-8 max-w-[1080px] items-center justify-center mt-12 px-4">
        {logoList.map((logo) => (
          <div className="w-[100px] h-[60px] relative" key={logo.name + "1"}>
            <Image
              src={logo.logo}
              alt={logo.name}
              className="object-contain"
              fill
            />
          </div>
        ))}
      </div>

      {/* mobile */}
      <div className="flex flex-col gap-6 md:hidden mt-10 max-w-screen overflow-x-hidden">
        {chunk(logoList, 7).map((logoList, index) => (
          <Marquee gradient={false} speed={50} key={`marquee-${index}`}>
            {logoList.map((logo) => (
              <img
                src={logo.logo}
                alt={logo.name}
                key={`mobile-${logo.name}`}
                className="object-contain w-[100px] h-[60px] mr-8"
              />
            ))}
          </Marquee>
        ))}
      </div>

      <p className="text-2xl text-gray-800 font-bold mt-24">Customers</p>

      {/* desktop */}
      <div className="hidden md:flex flex-wrap gap-8 max-w-[1080px] items-center justify-center mt-12 px-4">
        {customersLogoList.map((logo) => (
          <div className="w-[100px] h-[60px] relative" key={logo.name + "2"}>
            <Image
              src={logo.logo}
              alt={logo.name}
              className="object-contain"
              fill
            />
          </div>
        ))}
      </div>

      {/* mobile */}
      <div className="flex flex-col gap-6 md:hidden mt-10 max-w-screen overflow-hidden">
        {chunk(customersLogoList, 9).map((logoList, index) => (
          <Marquee gradient={false} speed={50} key={`marquee-${index}`}>
            {logoList.map((logo) => (
              <img
                src={logo.logo}
                alt={logo.name}
                key={`mobile-${logo.name}`}
                className="object-contain w-[100px] h-[60px] mr-8"
              />
            ))}
          </Marquee>
        ))}
      </div>
    </div>
  );
};

export default Content3;
