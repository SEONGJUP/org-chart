import {
  IconEye,
  IconFileCheck,
  IconUsersGroup,
  IconWorld,
} from "@tabler/icons-react";
import React from "react";

const SaiifeduPage: React.FC = () => {
  const features = [
    {
      icon: <IconEye />,
      title: "AI 영상분석 및 시선추적 기술",
      description:
        "교육 중인 근로자의 안면 인식과 시선 추적을 통해 집중도를 실시간으로 분석하고, 집중 유도 기능을 통해 교육 효과를 극대화합니다.",
    },
    {
      icon: <IconFileCheck />,
      title: "문서 자동화 및 전자서명",
      description:
        "태블릿을 통한 최소한의 정보 입력만으로 교육일지, 참석자 명단, 이수증 등 모든 관련 문서가 자동으로 생성되고 전자서명까지 완료됩니다.",
    },
    {
      icon: <IconWorld />,
      title: "다국어 지원 교육 시스템",
      description:
        "영상 OCR 기술로 교육 콘텐츠 내 문자 정보를 자동 번역하여, 외국인 근로자도 언어 장벽 없이 효과적인 안전 교육을 받을 수 있습니다.",
    },
    {
      icon: <IconUsersGroup />,
      title: "관리자 대시보드 및 DB 관리",
      description:
        "안전관리자는 대시보드를 통해 현장 교육 현황, 근로자별 교육 이력 등을 손쉽게 확인하고, 모든 데이터를 체계적으로 관리 및 출력할 수 있습니다.",
    },
  ];

  const processSteps = [
    "스마트 안전교육장 착석 및 개인정보 입력",
    "근로자별 맞춤 교육 자동 매칭 및 시작",
    "온라인 영상 강의 시청 (AI 집중도 분석)",
    "교육 내용 기반 테스트 및 결과 분석",
    "교육 수료증 자동 발급 및 교육 이력 DB화",
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            세이프에듀
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            근로자가 직접 참여하는 새로운 교육 문화, AI 스마트 안전보건교육
            시스템
          </p>
        </div>
      </section>

      {/* Core Idea Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            교육의 패러다임을 바꿉니다
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            현장 중심의 안전보건교육 강화 추세에 맞춰, 세이프에듀는 AI 기술을
            통해 근로자의 안전의식을 강화하고 산업재해의 인적 요인을 최소화하는
            혁신적인 교육 솔루션을 제공합니다.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              세이프에듀의 스마트한 기능
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              교육부터 관리까지, 모든 과정을 자동화합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0 bg-blue-500 text-white rounded-full p-4 ">
                    {Icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              자동화된 All-in-one 교육 프로세스
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              착석부터 현장 투입 전까지, 모든 것이 하나로 이어집니다.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-blue-200 rounded-full"></div>
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div key={index} className="md:flex items-center md:space-x-8">
                  <div className="md:w-1/2 md:text-right">
                    <div
                      className={`p-6 bg-white rounded-lg shadow-lg ${
                        index % 2 === 0 ? "md:mr-8" : "md:hidden"
                      }`}
                    >
                      <p>{step}</p>
                    </div>
                  </div>
                  <div className="relative flex-shrink-0">
                    <div className="absolute left-1/2 -translate-x-1/2 -top-12 md:static md:transform-none w-px h-12 md:hidden bg-blue-200"></div>
                    <div className="mx-auto md:mx-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-10 relative">
                      {index + 1}
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div
                      className={`mt-4 md:mt-0 p-6 bg-white rounded-lg shadow-lg ${
                        index % 2 !== 0 ? "md:ml-8" : "md:hidden"
                      }`}
                    >
                      <p>{step}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SaiifeduPage;
