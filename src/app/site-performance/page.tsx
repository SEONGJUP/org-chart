"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import UnavailableModal from "../_components/UnavailableModal";
import {
  IconAlertTriangle,
  IconArrowLeft,
  IconArrowRight,
  IconBell,
  IconBuilding,
  IconChevronRight,
  IconCircleCheck,
  IconClipboardCheck,
  IconCloudCheck,
  IconFilter,
  IconHelp,
  IconLayoutDashboard,
  IconMapPin,
  IconSearch,
  IconShieldCheck,
  IconUsers,
} from "@tabler/icons-react";

type SiteStatus = "정상" | "관리 필요" | "집중 관리";
type Site = {
  id: string;
  name: string;
  region: string;
  type: string;
  manager: string;
  workers: number;
  rate: number;
  complete: number;
  total: number;
  actionNeeded: number;
  missingEvidence: number;
  lastSync: string;
  status: SiteStatus;
  weakArea: string;
};

const sites: Site[] = [
  { id: "s1", name: "마포 본사 신축현장", region: "서울 마포구", type: "건축", manager: "김현우", workers: 86, rate: 96, complete: 48, total: 50, actionNeeded: 1, missingEvidence: 1, lastSync: "오늘 10:04", status: "정상", weakArea: "정기점검" },
  { id: "s2", name: "인천 물류센터 증축현장", region: "인천 서구", type: "건축", manager: "박지훈", workers: 122, rate: 91, complete: 41, total: 45, actionNeeded: 3, missingEvidence: 1, lastSync: "오늘 09:56", status: "관리 필요", weakArea: "협력업체 평가" },
  { id: "s3", name: "평택 산업단지 2공구", region: "경기 평택시", type: "토목", manager: "이서연", workers: 154, rate: 87, complete: 40, total: 46, actionNeeded: 4, missingEvidence: 2, lastSync: "오늘 09:41", status: "관리 필요", weakArea: "위험성평가 개선조치" },
  { id: "s4", name: "판교 업무시설 리모델링", region: "경기 성남시", type: "건축", manager: "최민석", workers: 73, rate: 98, complete: 49, total: 50, actionNeeded: 0, missingEvidence: 1, lastSync: "오늘 10:08", status: "정상", weakArea: "증빙 보완" },
  { id: "s5", name: "김포 데이터센터 현장", region: "경기 김포시", type: "플랜트", manager: "정유진", workers: 211, rate: 79, complete: 38, total: 48, actionNeeded: 7, missingEvidence: 3, lastSync: "어제 17:32", status: "집중 관리", weakArea: "안전보건 교육" },
  { id: "s6", name: "대전 연구시설 공사", region: "대전 유성구", type: "건축", manager: "한도윤", workers: 68, rate: 94, complete: 44, total: 47, actionNeeded: 2, missingEvidence: 1, lastSync: "오늘 09:51", status: "정상", weakArea: "작업허가서" },
  { id: "s7", name: "세종 스마트시티 현장", region: "세종특별자치시", type: "토목", manager: "윤하늘", workers: 187, rate: 89, complete: 42, total: 47, actionNeeded: 3, missingEvidence: 2, lastSync: "오늘 08:58", status: "관리 필요", weakArea: "비상대응 훈련" },
  { id: "s8", name: "부산 북항 재개발 1공구", region: "부산 동구", type: "토목", manager: "장민호", workers: 241, rate: 85, complete: 39, total: 46, actionNeeded: 5, missingEvidence: 2, lastSync: "오늘 09:22", status: "관리 필요", weakArea: "안전보건협의체" },
  { id: "s9", name: "울산 생산라인 증설현장", region: "울산 남구", type: "플랜트", manager: "신예은", workers: 132, rate: 97, complete: 48, total: 49, actionNeeded: 1, missingEvidence: 0, lastSync: "오늘 10:02", status: "정상", weakArea: "근로자 참여" },
  { id: "s10", name: "광주 복합문화센터 현장", region: "광주 북구", type: "건축", manager: "오준혁", workers: 95, rate: 82, complete: 37, total: 45, actionNeeded: 6, missingEvidence: 2, lastSync: "어제 16:48", status: "집중 관리", weakArea: "도급·용역 관리" },
  { id: "s11", name: "창원 물류단지 조성공사", region: "경남 창원시", type: "토목", manager: "문지아", workers: 116, rate: 93, complete: 43, total: 46, actionNeeded: 2, missingEvidence: 1, lastSync: "오늘 09:36", status: "정상", weakArea: "정기교육" },
  { id: "s12", name: "제주 리조트 개발현장", region: "제주 서귀포시", type: "건축", manager: "배성훈", workers: 61, rate: 88, complete: 39, total: 44, actionNeeded: 3, missingEvidence: 2, lastSync: "어제 18:10", status: "관리 필요", weakArea: "위험성평가" },
];

const statusStyle: Record<SiteStatus, string> = {
  정상: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  "관리 필요": "bg-amber-50 text-amber-700 ring-amber-100",
  "집중 관리": "bg-rose-50 text-rose-700 ring-rose-100",
};

function StatusBadge({ status }: { status: SiteStatus }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${statusStyle[status]}`}>{status}</span>;
}

function Bar({ value, color = "bg-teal-500" }: { value: number; color?: string }) {
  return <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} /></div>;
}

function Sidebar() {
  const menu = [[IconLayoutDashboard, "대시보드"], [IconShieldCheck, "중처법 이행 현황"], [IconBuilding, "현장별 현황"], [IconClipboardCheck, "안전카드 관리"], [IconAlertTriangle, "위험성평가"]] as const;
  return <aside className="sticky top-0 hidden h-screen w-[248px] flex-none border-r border-slate-200 bg-white px-4 py-5 xl:block"><div className="flex items-center px-2"><img src="/logos/safe_buddy_logo.png" alt="SafeBuddy" className="h-10 w-[132px] object-contain object-left" /></div><nav className="mt-10 space-y-1">{menu.map(([Icon, name]) => {
    const active = name === "현장별 현황";
    const className = `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold ${active ? "bg-teal-50 text-teal-800" : "text-slate-500 hover:bg-slate-50"}`;
    if (name === "중처법 이행 현황") return <Link key={name} href="/half-year-inspection" className={className}><Icon size={19} />{name}</Link>;
    return <button key={name} type="button" className={className}><Icon size={19} />{name}</button>;
  })}</nav><div className="mt-8 rounded-xl bg-slate-50 p-3 text-xs"><p className="font-black text-slate-700">(주)세이프건설</p><p className="mt-1 text-slate-400">본사 안전관리팀</p></div></aside>;
}

function Summary({ selected }: { selected: Site[] }) {
  const stats = useMemo(() => {
    const workers = selected.reduce((sum, item) => sum + item.workers, 0);
    const averageRate = Math.round(selected.reduce((sum, item) => sum + item.rate, 0) / selected.length);
    const action = selected.reduce((sum, item) => sum + item.actionNeeded, 0);
    const evidence = selected.reduce((sum, item) => sum + item.missingEvidence, 0);
    return { workers, averageRate, action, evidence, focus: selected.filter((item) => item.status === "집중 관리").length };
  }, [selected]);
  const cards = [
    ["관리 현장", `${selected.length}개`, "전체 현장 데이터 동기화", IconBuilding, "text-teal-700 bg-teal-50"],
    ["평균 이행률", `${stats.averageRate}%`, "전체 법정 이행 항목 기준", IconCircleCheck, "text-emerald-700 bg-emerald-50"],
    ["우선 조치", `${stats.action}건`, "현장 담당자 확인 필요", IconAlertTriangle, "text-amber-700 bg-amber-50"],
    ["증빙 누락", `${stats.evidence}건`, "안전카드 문서 보완 필요", IconCloudCheck, "text-violet-700 bg-violet-50"],
  ] as const;
  return <><section className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">{cards.map(([label, value, helper, Icon, color]) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><div><p className="text-sm font-bold text-slate-500">{label}</p><p className="mt-3 text-3xl font-black tracking-tight text-slate-900">{value}</p></div><div className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}><Icon size={20} /></div></div><p className="mt-3 text-xs text-slate-400">{helper}</p></article>)}</section><section className="mt-6 grid gap-5 xl:grid-cols-[1.35fr_1fr]"><article className="rounded-2xl bg-[#0f766e] p-6 text-white shadow-sm"><div className="flex items-start justify-between"><div><p className="text-sm font-bold text-teal-100">본사 안전관리체계 통합 현황</p><h2 className="mt-2 text-2xl font-black">현장 이행 상태를 지금 확인하세요.</h2><p className="mt-2 text-sm leading-6 text-teal-50">현장별 자동 집계와 수동 관리 데이터를 기준으로 본사에서 우선 관리해야 할 항목을 선별합니다.</p></div><IconShieldCheck size={31} className="text-white/90" /></div><div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/15 pt-4"><div><p className="text-xs text-teal-100">관리 인원</p><b className="mt-1 block text-xl">{stats.workers.toLocaleString()}명</b></div><div><p className="text-xs text-teal-100">집중 관리</p><b className="mt-1 block text-xl">{stats.focus}개 현장</b></div><div><p className="text-xs text-teal-100">데이터 기준</p><b className="mt-1 block text-xl">실시간</b></div></div></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="font-black text-slate-900">본사 관리 인사이트</h2><p className="mt-1 text-xs text-slate-500">현장 간 이행 격차를 빠르게 파악합니다.</p></div><IconMapPin className="text-teal-600" size={22} /></div><div className="mt-5 space-y-3"><div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800"><b>집중 관리:</b> 김포 데이터센터, 광주 복합문화센터</div><div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800"><b>공통 취약 항목:</b> 위험성평가 개선조치 및 증빙 문서</div></div></article></section></>;
}

function SiteGrid({ sites, onOpen }: { sites: Site[]; onOpen: (site: Site) => void }) {
  return <section><div className="mb-4 flex items-end justify-between"><div><h2 className="text-lg font-black text-slate-900">현장 이행 현황</h2><p className="mt-1 text-sm text-slate-500">각 현장의 법정 이행 데이터, 위험 신호와 증빙 상태를 비교합니다.</p></div><span className="text-xs font-bold text-slate-400">카드 선택 시 현장 상세보기</span></div><div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">{sites.map((site) => <button key={site.id} onClick={() => onOpen(site)} className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><div className="flex items-center gap-2 text-xs font-bold text-slate-400"><span>{site.type}</span><span className="h-1 w-1 rounded-full bg-slate-300" /><span>{site.region}</span></div><h3 className="mt-2 truncate text-base font-black text-slate-900">{site.name}</h3></div><StatusBadge status={site.status} /></div><div className="mt-5 flex items-end justify-between"><div><p className="text-xs font-bold text-slate-400">법정 이행률</p><b className="mt-1 text-3xl font-black text-slate-900">{site.rate}%</b></div><div className="text-right text-xs"><p className="text-slate-400">이행 확인</p><b className="mt-1 block text-slate-700">{site.complete} / {site.total}</b></div></div><div className="mt-4"><Bar value={site.rate} color={site.rate >= 93 ? "bg-emerald-500" : site.rate >= 85 ? "bg-amber-500" : "bg-rose-500"} /></div><div className="mt-4 grid grid-cols-3 border-t border-slate-100 pt-4 text-center text-xs"><div><p className="text-slate-400">조치 필요</p><b className="mt-1 block text-amber-700">{site.actionNeeded}</b></div><div className="border-x border-slate-100"><p className="text-slate-400">증빙 누락</p><b className="mt-1 block text-violet-700">{site.missingEvidence}</b></div><div><p className="text-slate-400">작업자</p><b className="mt-1 block text-slate-700">{site.workers}명</b></div></div><div className="mt-4 flex items-center justify-between text-xs"><span className="text-slate-400">{site.manager} · {site.lastSync}</span><span className="inline-flex items-center gap-1 font-bold text-teal-700 opacity-0 transition group-hover:opacity-100">상세보기 <IconArrowRight size={13} /></span></div></button>)}</div></section>;
}

function DetailDrawer({ site, onClose, onUnavailable }: { site: Site | null; onClose: () => void; onUnavailable: (title: string) => void }) {
  if (!site) return null;
  const measures = [
    ["안전보건 경영체계", 100], ["유해·위험요인 관리", Math.max(site.rate - 3, 65)], ["안전보건 교육", Math.max(site.rate - 7, 58)], ["점검 및 개선", Math.max(site.rate - 4, 60)], ["비상대응 및 사고관리", Math.max(site.rate - 10, 50)],
  ];
  return <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/25" onClick={onClose}><aside className="h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white p-6"><div><p className="text-xs font-black text-teal-700">현장 상세 현황</p><h2 className="mt-1 text-xl font-black text-slate-900">{site.name}</h2><p className="mt-2 text-sm text-slate-500">{site.region} · {site.type} · 현장책임자 {site.manager}</p></div><button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">닫기</button></div><div className="space-y-6 p-6"><div className="rounded-2xl bg-slate-900 p-5 text-white"><p className="text-sm font-bold text-slate-300">현장 종합 이행률</p><div className="mt-2 flex items-end justify-between"><b className="text-5xl font-black">{site.rate}%</b><StatusBadge status={site.status} /></div><div className="mt-5 grid grid-cols-3 border-t border-white/15 pt-4 text-center text-sm"><div><p className="text-slate-400">이행 확인</p><b>{site.complete}/{site.total}</b></div><div><p className="text-slate-400">조치 필요</p><b>{site.actionNeeded}건</b></div><div><p className="text-slate-400">증빙 누락</p><b>{site.missingEvidence}건</b></div></div></div><section><h3 className="font-black text-slate-900">법정 이행 영역별 현황</h3><div className="mt-4 space-y-4">{measures.map(([name, value]) => <div key={name as string}><div className="mb-2 flex justify-between text-sm"><span className="font-bold text-slate-600">{name}</span><b className="text-slate-900">{value}%</b></div><Bar value={value as number} color={(value as number) >= 93 ? "bg-emerald-500" : (value as number) >= 85 ? "bg-amber-500" : "bg-rose-500"} /></div>)}</div></section><section className="rounded-xl border border-amber-100 bg-amber-50 p-4"><div className="flex gap-3"><IconAlertTriangle className="flex-none text-amber-600" size={20} /><div><p className="font-black text-amber-900">우선 확인: {site.weakArea}</p><p className="mt-1 text-sm leading-5 text-amber-800">현장 담당자가 관련 안전카드와 증빙 문서를 보완하면 본사 통합 지표에 자동 반영됩니다.</p></div></div></section><button onClick={() => { onClose(); onUnavailable("현장 안전카드"); }} className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white">현장 안전카드 열기 <IconArrowRight size={17} /></button></div></aside></div>;
}

export default function SitePerformancePage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"전체" | SiteStatus>("전체");
  const [type, setType] = useState("전체");
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [unavailableTitle, setUnavailableTitle] = useState<string | null>(null);
  const filtered = useMemo(() => sites.filter((site) => (status === "전체" || site.status === status) && (type === "전체" || site.type === type) && (site.name.includes(query) || site.region.includes(query) || site.manager.includes(query))), [query, status, type]);
  return <div className="safebuddy-console min-h-screen bg-[#f5f7f8] text-slate-900"><div className="flex"><Sidebar /><main className="min-w-0 flex-1"><header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-5 py-5 lg:px-8 xl:flex-row xl:items-center xl:justify-between"><div><div className="flex items-center gap-2 text-xs font-bold text-slate-400"><span>본사 안전관리</span><IconChevronRight size={14} /><span className="text-teal-700">현장별 이행 현황</span></div><h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">현장별 중처법 이행 현황</h1><p className="mt-1 text-sm text-slate-500">본사에서 관리하는 현장별 안전관리체계 이행 데이터와 위험 신호를 비교합니다.</p></div><div className="flex flex-wrap items-center gap-2"><button onClick={() => setUnavailableTitle("알림")} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500" aria-label="알림"><IconBell size={19} /></button><button onClick={() => setUnavailableTitle("도움말")} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500" aria-label="도움말"><IconHelp size={19} /></button><Link href="/half-year-inspection" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white"><IconArrowLeft size={18} />본사 통합 현황</Link></div></header><div className="mx-auto max-w-[1580px] space-y-6 px-5 py-6 lg:px-8"><Summary selected={filtered} /><section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center"><div className="relative flex-1"><IconSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="현장명, 지역, 현장책임자 검색" className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-teal-500" /></div><div className="flex flex-wrap gap-2"><span className="inline-flex items-center gap-1 px-2 text-xs font-bold text-slate-400"><IconFilter size={15} />필터</span><select value={status} onChange={(event) => setStatus(event.target.value as "전체" | SiteStatus)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-600"><option>전체</option><option>정상</option><option>관리 필요</option><option>집중 관리</option></select><select value={type} onChange={(event) => setType(event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-600"><option>전체</option><option>건축</option><option>토목</option><option>플랜트</option></select></div></section><SiteGrid sites={filtered} onOpen={setSelectedSite} /></div></main></div><DetailDrawer site={selectedSite} onClose={() => setSelectedSite(null)} onUnavailable={setUnavailableTitle} /><UnavailableModal title={unavailableTitle} onClose={() => setUnavailableTitle(null)} /></div>;
}
