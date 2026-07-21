"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { IconArrowLeft, IconArrowUpRight, IconChevronLeft, IconPlus, IconSparkles } from "@tabler/icons-react";
import { BRAND, baseFeatures, featureHref, Feature, FeatureThumb, STORAGE_KEY } from "./_data";

export default function SvcOpenInnovationDemoPage() {
  const [customFeatures, setCustomFeatures] = useState<Feature[]>([]);
  const features = useMemo(() => [...baseFeatures, ...customFeatures], [customFeatures]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as Array<{ id: string; title: string; desc: string }>;
      setCustomFeatures(
        parsed.map((item) => ({
          ...item,
          icon: IconSparkles,
          tone: "bg-slate-50 text-slate-700 border-slate-200",
          accent: "#475569",
          kind: "custom",
        })),
      );
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const addFeature = () => {
    const name = window.prompt("추가할 AI 기능 이름을 입력하세요.");
    const trimmed = name?.trim();
    if (!trimmed) return;

    const next = [
      ...customFeatures,
      {
        id: `custom-${Date.now()}`,
        title: trimmed,
        desc: "추후 연결할 AI 기능입니다. 같은 규격의 기능 버튼으로 저장됩니다.",
        icon: IconSparkles,
        tone: "bg-slate-50 text-slate-700 border-slate-200",
        accent: "#475569",
        kind: "custom" as const,
      },
    ];
    setCustomFeatures(next);
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(next.map(({ id, title, desc }) => ({ id, title, desc }))),
    );
  };

  return (
    <main className="min-h-screen bg-[#f6fbfb] text-slate-950">
      <section className="border-b border-teal-100 bg-white/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 md:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => window.history.back()} className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition hover:bg-slate-50">
              <IconChevronLeft size={18} /> 이전 페이지
            </button>
            <Link href="/svc-open-innovation" className="inline-flex h-10 items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 text-sm font-black transition hover:bg-white" style={{ color: BRAND }}>
              <IconArrowLeft size={18} /> SVC 오픈이노베이션
            </Link>
          </div>
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700 ring-1 ring-teal-100">
            AI Function Lab
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="svc-animate-up mb-7 rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black tracking-[0.16em] text-teal-700">SAMPLE FUNCTION EXPERIENCE</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">AI 안전보건 기능 체험</h1>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-500 md:text-base">
              공동과제에서 확장할 AI 기능들을 버튼형 허브로 구성했습니다. 기능 버튼을 선택하면 해당 기능 전용 페이지로 이동합니다.
            </p>
          </div>
          <button onClick={addFeature} className="inline-flex h-12 items-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800">
            <IconPlus size={18} /> 기능 추가
          </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <Link
              key={feature.id}
              href={feature.kind === "custom" ? featureHref("custom") : featureHref(feature.id)}
              className={`svc-animate-scale group min-h-[190px] rounded-3xl border border-slate-200 bg-white p-3 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-900/10 svc-delay-${Math.min(index % 4, 3) + 1}`}
            >
              <FeatureThumb feature={feature} />
              <div className="mt-3 flex items-start justify-between gap-2">
                <p className="text-sm font-black leading-5 text-slate-950">{feature.title}</p>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-50 text-slate-400 transition group-hover:bg-teal-600 group-hover:text-white">
                  <IconArrowUpRight size={15} />
                </span>
              </div>
              <p className="mt-1 hidden text-xs font-semibold leading-5 text-slate-500 sm:block">{feature.desc}</p>
            </Link>
          ))}

          <button onClick={addFeature} className="svc-animate-scale min-h-[190px] rounded-3xl border-2 border-dashed border-slate-300 bg-white p-3 text-left transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:bg-teal-50/50 hover:shadow-xl hover:shadow-teal-900/5">
            <div className="grid aspect-[4/3] place-items-center rounded-2xl bg-slate-50 text-slate-400">
              <IconPlus size={34} />
            </div>
            <p className="mt-3 text-sm font-black text-slate-700">추가하기</p>
            <p className="mt-1 hidden text-xs font-semibold leading-5 text-slate-400 sm:block">새로운 기능 이름을 저장합니다.</p>
          </button>
        </div>
      </section>
    </main>
  );
}
