import React from "react";

import { IconCircleCheck } from "@tabler/icons-react";
import { assetPathProvider } from "@/config/asset_path_provider";

const SafeBuddyPage: React.FC = () => {
  const features = [
    {
      title: "AI 기반 업종별 맞춤 관리",
      description:
        "사업장의 업종과 규모를 분석하여 중대재해처벌법에 대응하기 위한 최적의 안전 경영 계획을 AI가 자동으로 수립하고 제안합니다.",
    },
    {
      title: "필수 안전문서 자동 생성",
      description:
        "위험성 평가, 안전보건 경영방침 등 복잡하고 어려운 법적 필수 문서들을 간단한 입력만으로 쉽고 빠르게 완성할 수 있습니다.",
    },
    {
      title: "통합 전산 안전 관리",
      description:
        "여러 사업장과 관련 문서를 하나의 시스템에서 통합 관리하여 업무 효율성을 극대화하고, 누락 없는 안전 관리를 지원합니다.",
    },
    {
      title: "모바일 전자서명 및 QR 체크인",
      description:
        "디지털 기기에 익숙하지 않은 사용자도 카카오톡 등을 통해 손쉽게 문서에 서명하고 안전 활동에 참여할 수 있습니다.",
    },
    {
      title: "업무 네비게이션 & To-Do List",
      description:
        "오늘 해야 할 안전 업무가 무엇인지, 어떤 순서로 해야 하는지 명확하게 안내하여 체계적인 안전 관리 체계 구축을 돕습니다.",
    },
    {
      title: "실시간 데이터 및 보고 시스템",
      description:
        "안전 관련 뉴스, 정부 지침 등 최신 정보를 실시간으로 제공하고, 전자 결재를 통한 신속한 상부 보고 체계를 마련합니다.",
    },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="pb-24 pt-36 bg-gradient-to-br from-teal-50 to-cyan-100">
        <div className="container mx-auto px-6 text-center">
          <img
            src={assetPathProvider.logo.safeBuddy}
            alt="Safe Buddy Logo"
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            AI 안전비서 세이프버디
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            안전이 필요한 모든 곳에, 스마트 안전보건관리체계 통합 솔루션
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            50인 미만 사업장, 더 이상 안전의 사각지대가 아닙니다
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            중대재해처벌법 시행 이후에도 여전히 많은 소규모 사업장이 안전관리
            시스템 부재와 정보 부족으로 어려움을 겪고 있습니다. 산재사고의 81%가
            50인 미만 사업장에서 발생합니다.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg text-red-600">준비 미흡</h3>
              <p className="mt-2 text-gray-700">
                대부분의 사업주가 법 대응 준비가 미흡하다고 느끼며, 무엇을
                어떻게 해야 할지 막막해합니다.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg text-red-600">정보 부재</h3>
              <p className="mt-2 text-gray-700">
                다양한 정부 지침과 매뉴얼이 배포되지만, 우리 사업장에 맞는
                정보를 찾고 적용하기 어렵습니다.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg text-red-600">
                시스템 부재
              </h3>
              <p className="mt-2 text-gray-700">
                안전관리자 선임 의무가 없어 체계적인 관리 시스템이 부재하며,
                상식에만 의존하는 경우가 많습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              세이프버디가 제공하는 핵심 기능
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              안전 경영, 더 이상 어렵고 복잡한 일이 아닙니다.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <IconCircleCheck className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            지금 바로 스마트한 안전 경영을 시작하세요
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            세이프버디와 함께라면 저비용으로 법적 리스크를 해소하고, 안전한
            사업장을 만들 수 있습니다.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="#/contact"
              className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-600 transition-transform duration-300 transform hover:scale-105"
            >
              상담 신청하기
            </a>
            <a
              href="#/contact"
              className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-300 transition-transform duration-300 transform hover:scale-105"
            >
              무료 자가진단
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SafeBuddyPage;
