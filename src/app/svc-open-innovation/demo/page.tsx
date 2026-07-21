"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { IconArrowLeft, IconArrowUpRight, IconChevronLeft, IconEye, IconHistory, IconPlus, IconSparkles, IconWand, IconX } from "@tabler/icons-react";
import { BRAND, baseFeatures, contentHistoryItems, featureHref, Feature, FeatureKind, FeatureThumb, HistoryItem, STORAGE_KEY } from "./_data";

export default function SvcOpenInnovationDemoPage() {
  const [customFeatures, setCustomFeatures] = useState<Feature[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newFeatureName, setNewFeatureName] = useState("");
  const [historyFilter, setHistoryFilter] = useState<FeatureKind | "all">("all");
  const [selectedHistory, setSelectedHistory] = useState<HistoryItem | null>(null);
  const features = useMemo(() => [...baseFeatures, ...customFeatures], [customFeatures]);
  const filteredHistoryItems = useMemo(
    () => (historyFilter === "all" ? contentHistoryItems : contentHistoryItems.filter((item) => item.kind === historyFilter)),
    [historyFilter],
  );

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

  const openAddModal = () => {
    setNewFeatureName("");
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewFeatureName("");
  };

  const addFeature = () => {
    const trimmed = newFeatureName.trim();
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
    closeAddModal();
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
          <button data-testid="open-add-feature-modal" onClick={openAddModal} className="inline-flex h-12 items-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800">
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

          <button data-testid="open-add-feature-card" onClick={openAddModal} className="svc-animate-scale min-h-[190px] rounded-3xl border-2 border-dashed border-slate-300 bg-white p-3 text-left transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:bg-teal-50/50 hover:shadow-xl hover:shadow-teal-900/5">
            <div className="grid aspect-[4/3] place-items-center rounded-2xl bg-slate-50 text-slate-400">
              <IconPlus size={34} />
            </div>
            <p className="mt-3 text-sm font-black text-slate-700">추가하기</p>
            <p className="mt-1 hidden text-xs font-semibold leading-5 text-slate-400 sm:block">새로운 기능 이름을 저장합니다.</p>
          </button>
        </div>

        <HubHistoryList
          features={features}
          selectedKind={historyFilter}
          items={filteredHistoryItems}
          totalCount={contentHistoryItems.length}
          onFilterChange={setHistoryFilter}
          onSelect={setSelectedHistory}
        />
      </section>
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="svc-animate-scale w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-950/20">
            <div className="relative border-b border-slate-100 p-6">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-teal-50" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
                    <IconWand size={25} />
                  </span>
                  <div>
                    <p className="text-xs font-black tracking-[0.16em] text-teal-700">ADD AI FUNCTION</p>
                    <h2 className="mt-1 text-2xl font-black text-slate-950">새 기능 추가</h2>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                      추후 연결할 AI 안전보건 기능 이름을 입력하면 같은 규격의 버튼으로 저장됩니다.
                    </p>
                  </div>
                </div>
                <button onClick={closeAddModal} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50">
                  <IconX size={18} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <label className="text-xs font-black tracking-[0.14em] text-slate-400">기능 이름</label>
              <input
                autoFocus
                data-testid="add-feature-name-input"
                value={newFeatureName}
                onChange={(event) => setNewFeatureName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") addFeature();
                  if (event.key === "Escape") closeAddModal();
                }}
                placeholder="예: 밀폐공간 작업허가서 자동 작성"
                className="mt-2 h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base font-bold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:shadow-lg focus:shadow-teal-900/5"
              />
              <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-black text-slate-700">저장 후 표시 방식</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
                  기능 허브 하단에 버튼이 추가되고, 브라우저 로컬 저장소에 유지됩니다.
                </p>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button onClick={closeAddModal} className="h-12 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-600 transition hover:bg-slate-50">
                  취소
                </button>
                <button
                  onClick={addFeature}
                  data-testid="save-add-feature"
                  disabled={!newFeatureName.trim()}
                  className="h-12 rounded-2xl px-5 text-sm font-black text-white shadow-lg shadow-teal-700/15 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                  style={{ backgroundColor: newFeatureName.trim() ? BRAND : undefined }}
                >
                  저장하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedHistory && <HistoryModal item={selectedHistory} onClose={() => setSelectedHistory(null)} />}
    </main>
  );
}

function HubHistoryList({
  features,
  selectedKind,
  items,
  totalCount,
  onFilterChange,
  onSelect,
}: {
  features: Feature[];
  selectedKind: FeatureKind | "all";
  items: HistoryItem[];
  totalCount: number;
  onFilterChange: (kind: FeatureKind | "all") => void;
  onSelect: (item: HistoryItem) => void;
}) {
  const filterOptions = [
    { label: "전체", kind: "all" as const, count: totalCount },
    ...features
      .filter((feature) => feature.kind !== "custom")
      .map((feature) => ({
        label: feature.title,
        kind: feature.kind,
        count: contentHistoryItems.filter((item) => item.kind === feature.kind).length,
      })),
  ];

  return (
    <section className="svc-animate-up svc-delay-3 mt-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black tracking-[0.16em] text-teal-700">ALL CONTENT HISTORY</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">전체 AI 기능 생성 이력</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
            기능별로 생성했던 콘텐츠 이력을 한곳에서 확인하고, 필요한 기능만 필터링해서 볼 수 있습니다.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-xs font-black text-slate-500 ring-1 ring-slate-200">
          <IconHistory size={16} /> {items.length}/{totalCount}건
        </span>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {filterOptions.map((option) => {
          const active = selectedKind === option.kind;
          return (
            <button
              key={option.kind}
              onClick={() => onFilterChange(option.kind)}
              className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-black transition ${
                active ? "bg-slate-950 text-white shadow-lg shadow-slate-900/10" : "border border-slate-200 bg-white text-slate-600 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
              }`}
            >
              {option.label}
              <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] ${active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"}`}>
                {option.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <HistoryRow key={item.id} item={item} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

function HistoryRow({ item, onSelect }: { item: HistoryItem; onSelect: (item: HistoryItem) => void }) {
  return (
    <button
      onClick={() => onSelect(item)}
      className="group grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50/40 hover:shadow-lg hover:shadow-teal-900/5 md:grid-cols-[1fr_auto] md:items-center"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-black text-teal-700 ring-1 ring-teal-100">{item.type}</span>
          <span className="text-xs font-bold text-slate-400">{item.date}</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black text-slate-500">{item.status}</span>
        </div>
        <h3 className="mt-3 text-base font-black text-slate-950">{item.title}</h3>
        <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">{item.summary}</p>
      </div>
      <span className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition group-hover:border-teal-300 group-hover:text-teal-700">
        <IconEye size={17} /> 상세보기
      </span>
    </button>
  );
}

function HistoryModal({ item, onClose }: { item: HistoryItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="svc-animate-scale max-h-[90vh] w-full max-w-2xl overflow-auto rounded-3xl bg-white shadow-2xl shadow-slate-950/20">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5 md:p-6">
          <div>
            <p className="text-xs font-black tracking-[0.16em] text-teal-700">HISTORY DETAIL</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{item.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700 ring-1 ring-teal-100">{item.type}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">{item.date}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">{item.status}</span>
            </div>
          </div>
          <button onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50">
            <IconX size={18} />
          </button>
        </div>
        <div className="p-5 md:p-6">
          <InfoBlock title="요약" text={item.summary} />
          <InfoBlock title="상세내용" text={item.detail} />
          <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-white">
            <p className="text-xs font-black text-teal-200">다음 연결 예정</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
              실제 저장소와 연결되면 생성 파일, 편집 이력, 인쇄 여부, 담당자 피드백을 이 모달에서 함께 확인할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-4 rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-black tracking-[0.14em] text-slate-400">{title}</p>
      <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{text}</p>
    </div>
  );
}
