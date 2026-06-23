"use client";

import { useScrollAnimation, useCountUp } from "../_hooks/useScrollAnimation";

const stats = [
  { value: 7000, suffix: "+", label: "활성 사용자" },
  { value: 98, suffix: "%", label: "고객 만족도" },
  { value: 150, suffix: "+", label: "기업 도입" },
];

const Content1NEW = () => {
  const animRef = useScrollAnimation();

  return (
    <div className="w-full bg-white" ref={animRef}>
      <div className="max-w-[1140px] mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
          {/* Left: Quote */}
          <div className="md:max-w-[480px]">
            <p className="scroll-animate text-gray-400 text-lg leading-relaxed">
              바람이 부는 건 못 막습니다.
              <br />
              하지만, 우리는
            </p>
            <p className="scroll-animate scroll-animate-delay-1 text-[28px] md:text-[32px] text-gray-900 font-extrabold mt-4 leading-snug">
              돛의 방향을 바꿀 수 있습니다.
            </p>
          </div>

          {/* Right: Stats */}
          <div className="scroll-animate scroll-animate-delay-2 flex gap-8 md:gap-12 items-center">
            {stats.map((stat, index) => (
              <StatItem key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const countRef = useCountUp(value, 2000);

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[36px] md:text-[42px] text-mint-500 font-extrabold tabular-nums">
        <span ref={countRef}>0</span>
        <span>{suffix}</span>
      </p>
      <p className="text-[15px] text-gray-500 font-medium">{label}</p>
    </div>
  );
}

export default Content1NEW;
