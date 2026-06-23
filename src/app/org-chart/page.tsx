"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconArrowsMove,
  IconBuildingCommunity,
  IconCheck,
  IconChevronDown,
  IconFolderPlus,
  IconLayoutGrid,
  IconMinus,
  IconPalette,
  IconPlus,
  IconPrinter,
  IconSettings,
  IconTrash,
  IconUser,
  IconUsersGroup,
  IconX,
  IconZoomIn,
  IconZoomOut,
} from "@tabler/icons-react";

type OrgGroup = { id: string; name: string; color: string; description: string };
type OrgNode = {
  id: string;
  name: string;
  leader: string;
  groupId: string;
  parentId: string | null;
  color: string;
  x: number;
  y: number;
};

const PAPER = { width: 794, height: 1123, nodeWidth: 184, nodeHeight: 96 };
const initialGroups: OrgGroup[] = [
  { id: "executive", name: "경영 그룹", color: "#00b7af", description: "전사 전략과 경영 의사결정 조직" },
  { id: "product", name: "제품·기술 그룹", color: "#2563eb", description: "제품, 플랫폼, AI 기술 조직" },
  { id: "business", name: "사업 그룹", color: "#f59e0b", description: "영업 및 고객 성공 조직" },
];
const initialNodes: OrgNode[] = [
  { id: "ceo", name: "대표이사", leader: "김새임", groupId: "executive", parentId: null, color: "#00b7af", x: 305, y: 104 },
  { id: "strategy", name: "경영전략실", leader: "박하늘", groupId: "executive", parentId: "ceo", color: "#00b7af", x: 70, y: 295 },
  { id: "product", name: "제품개발본부", leader: "이도윤", groupId: "product", parentId: "ceo", color: "#2563eb", x: 305, y: 295 },
  { id: "business", name: "사업본부", leader: "최유진", groupId: "business", parentId: "ceo", color: "#f59e0b", x: 540, y: 295 },
  { id: "platform", name: "플랫폼팀", leader: "정민수", groupId: "product", parentId: "product", color: "#2563eb", x: 202, y: 484 },
  { id: "ai", name: "AI 솔루션팀", leader: "서하린", groupId: "product", parentId: "product", color: "#2563eb", x: 408, y: 484 },
  { id: "sales", name: "영업팀", leader: "윤서준", groupId: "business", parentId: "business", color: "#f59e0b", x: 505, y: 664 },
  { id: "cs", name: "고객성공팀", leader: "송지민", groupId: "business", parentId: "business", color: "#f59e0b", x: 505, y: 844 },
];

const emptyNodeDraft = { name: "", leader: "", groupId: "", parentId: "" };

export default function OrgChartPage() {
  const [groups, setGroups] = useState<OrgGroup[]>(initialGroups);
  const [nodes, setNodes] = useState<OrgNode[]>(initialNodes);
  const [selectedId, setSelectedId] = useState("product");
  const [zoom, setZoom] = useState(78);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupColor, setNewGroupColor] = useState("#7c3aed");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [draft, setDraft] = useState(emptyNodeDraft);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const drag = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  const selected = nodes.find((node) => node.id === selectedId) ?? null;
  const groupById = useMemo(() => new Map(groups.map((group) => [group.id, group])), [groups]);
  const scale = zoom / 100;

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  };
  const updateSelected = (patch: Partial<OrgNode>) => {
    if (!selected) return;
    setNodes((current) => current.map((node) => node.id === selected.id ? { ...node, ...patch } : node));
  };
  const isDescendant = (possibleParentId: string, nodeId: string) => {
    let cursor: string | null = possibleParentId;
    while (cursor) {
      if (cursor === nodeId) return true;
      cursor = nodes.find((node) => node.id === cursor)?.parentId ?? null;
    }
    return false;
  };
  const openAdd = (parentId = selected?.id ?? "") => {
    const parent = nodes.find((node) => node.id === parentId);
    setDraft({ name: "", leader: "", groupId: parent?.groupId ?? groups[0]?.id ?? "", parentId });
    setIsAddOpen(true);
  };
  const addNode = () => {
    if (!draft.name.trim()) return notify("조직명을 입력해 주세요.");
    const parent = nodes.find((node) => node.id === draft.parentId);
    const siblingCount = nodes.filter((node) => node.parentId === parent?.id).length;
    const group = groupById.get(draft.groupId) ?? groups[0];
    const node: OrgNode = {
      id: `node-${Date.now()}`,
      name: draft.name.trim(),
      leader: draft.leader.trim() || "담당자 미지정",
      groupId: group.id,
      parentId: parent?.id ?? null,
      color: group.color,
      x: Math.max(26, Math.min(PAPER.width - PAPER.nodeWidth - 26, (parent?.x ?? 305) + (siblingCount - 1) * 116)),
      y: Math.max(92, Math.min(PAPER.height - PAPER.nodeHeight - 50, (parent?.y ?? 104) + 184)),
    };
    setNodes((current) => [...current, node]);
    setSelectedId(node.id);
    setIsAddOpen(false);
    notify(`${node.name} 조직을 추가했습니다.`);
  };
  const removeSelected = () => {
    if (!selected || !selected.parentId) return;
    setNodes((current) => current.filter((node) => node.id !== selected.id).map((node) => node.parentId === selected.id ? { ...node, parentId: selected.parentId } : node));
    setSelectedId(selected.parentId);
    notify("조직을 삭제하고 하위 조직은 상위 조직으로 연결했습니다.");
  };
  const addGroup = () => {
    const name = newGroupName.trim();
    if (!name) return notify("그룹명을 입력해 주세요.");
    if (groups.some((group) => group.name === name)) return notify("같은 이름의 그룹이 있습니다.");
    setGroups((current) => [...current, { id: `group-${Date.now()}`, name, color: newGroupColor, description: newGroupDescription.trim() || "조직 묶음" }]);
    setNewGroupName("");
    setNewGroupDescription("");
    notify(`${name} 그룹을 만들었습니다.`);
  };
  const removeGroup = (group: OrgGroup) => {
    if (groups.length === 1) return notify("최소 하나의 그룹이 필요합니다.");
    if (nodes.some((node) => node.groupId === group.id)) return notify("이 그룹에 소속된 조직을 먼저 다른 그룹으로 옮겨 주세요.");
    setGroups((current) => current.filter((item) => item.id !== group.id));
    notify(`${group.name} 그룹을 삭제했습니다.`);
  };
  const autoArrange = () => {
    const depth = (node: OrgNode, seen = new Set<string>()): number => {
      if (!node.parentId || seen.has(node.id)) return 0;
      const parent = nodes.find((item) => item.id === node.parentId);
      return parent ? depth(parent, new Set([...seen, node.id])) + 1 : 0;
    };
    const levels = new Map<number, OrgNode[]>();
    nodes.forEach((node) => { const level = depth(node); levels.set(level, [...(levels.get(level) ?? []), node]); });
    setNodes((current) => current.map((node) => {
      const level = depth(node);
      const levelNodes = levels.get(level) ?? [];
      const index = levelNodes.findIndex((item) => item.id === node.id);
      const gap = Math.min(218, (PAPER.width - PAPER.nodeWidth - 64) / Math.max(1, levelNodes.length - 1));
      return { ...node, x: levelNodes.length === 1 ? 305 : 32 + index * gap, y: 104 + level * 184 };
    }));
    notify("A4 세로 지면에 맞게 자동 정렬했습니다.");
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !paperRef.current) return;
    const rect = paperRef.current.getBoundingClientRect();
    const x = Math.max(12, Math.min(PAPER.width - PAPER.nodeWidth - 12, (event.clientX - rect.left) / scale - drag.current.offsetX));
    const y = Math.max(64, Math.min(PAPER.height - PAPER.nodeHeight - 18, (event.clientY - rect.top) / scale - drag.current.offsetY));
    setNodes((current) => current.map((node) => node.id === drag.current?.id ? { ...node, x, y } : node));
  };
  const startDrag = (event: React.PointerEvent<HTMLButtonElement>, node: OrgNode) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const rect = paperRef.current?.getBoundingClientRect();
    if (rect) drag.current = { id: node.id, offsetX: (event.clientX - rect.left) / scale - node.x, offsetY: (event.clientY - rect.top) / scale - node.y };
    setSelectedId(node.id);
  };
  const changeGroup = (groupId: string) => {
    const group = groupById.get(groupId);
    if (group) updateSelected({ groupId, color: group.color });
  };

  const ChartPaper = ({ print = false }: { print?: boolean }) => <div className={print ? "print-paper" : "a4-paper"} style={{ width: PAPER.width, height: PAPER.height }} ref={print ? undefined : paperRef} onPointerMove={print ? undefined : onPointerMove} onPointerUp={() => { drag.current = null; }}>
    <div className="absolute left-0 right-0 top-0 h-20 border-b border-slate-200 bg-white px-12 pt-8"><div className="flex items-start justify-between"><div><p className="text-[9px] font-black tracking-[0.18em] text-[#00a099]">SEIIM ORGANIZATION</p><h2 className="mt-1 text-[19px] font-black text-slate-900">조직도</h2></div><p className="text-[9px] font-semibold text-slate-400">2026. 06 · A4 세로</p></div></div>
    <svg className="pointer-events-none absolute inset-0 z-0" width={PAPER.width} height={PAPER.height} viewBox={`0 0 ${PAPER.width} ${PAPER.height}`} aria-hidden="true">{nodes.filter((node) => node.parentId).map((node) => { const parent = nodes.find((item) => item.id === node.parentId); if (!parent) return null; const fromX = parent.x + PAPER.nodeWidth / 2; const fromY = parent.y + PAPER.nodeHeight; const toX = node.x + PAPER.nodeWidth / 2; const toY = node.y; const midY = fromY + Math.max(34, (toY - fromY) / 2); return <path key={node.id} d={`M ${fromX} ${fromY} V ${midY} H ${toX} V ${toY}`} fill="none" stroke="#7c9097" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />; })}</svg>
    {nodes.map((node) => { const group = groupById.get(node.groupId); const active = node.id === selectedId; return <button key={node.id} type="button" onPointerDown={print ? undefined : (event) => startDrag(event, node)} onClick={print ? undefined : () => setSelectedId(node.id)} style={{ left: node.x, top: node.y, width: PAPER.nodeWidth, height: PAPER.nodeHeight, borderColor: active && !print ? node.color : "#dce5e8" }} className={`absolute z-10 rounded-lg border bg-white px-3 py-2.5 text-left shadow-sm ${print ? "cursor-default" : "cursor-grab active:cursor-grabbing"} ${active && !print ? "ring-2 ring-teal-100" : ""}`}>
      <div className="flex items-center justify-between gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: node.color }} /><span className="truncate text-[9px] font-bold text-slate-400">{group?.name}</span></div><p className="mt-2 truncate text-[13px] font-black text-slate-800">{node.name}</p><p className="mt-1 flex items-center gap-1 text-[10px] text-slate-500"><IconUser size={12} />{node.leader}</p>
    </button>; })}
    <div className="absolute bottom-8 left-12 right-12 flex items-center justify-between border-t border-slate-200 pt-3 text-[9px] text-slate-400"><span>조직 및 그룹 설정은 관리 화면에서 변경할 수 있습니다.</span><span>SEIIM</span></div>
  </div>;

  return <div className="min-h-screen bg-[#eef2f3] text-slate-900">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-4 px-6 py-4"><div className="flex items-center gap-4"><Link href="/" className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50" aria-label="메인으로 돌아가기"><IconArrowLeft size={20} /></Link><div><p className="flex items-center gap-2 text-xs font-bold text-slate-400"><IconBuildingCommunity size={14} />조직 관리</p><h1 className="mt-1 text-xl font-black">조직 구조 편집</h1></div></div><div className="flex flex-wrap items-center gap-2"><button onClick={autoArrange} className="tool-button"><IconLayoutGrid size={17} />자동 정렬</button><button onClick={() => setIsPrintPreviewOpen(true)} className="tool-button"><IconPrinter size={17} />인쇄 미리보기</button><button onClick={() => openAdd()} className="inline-flex items-center gap-2 rounded-lg bg-[#00a099] px-4 py-2.5 text-sm font-black text-white hover:bg-[#008b85]"><IconPlus size={17} />조직 추가</button></div></div></header>
    <main className="mx-auto grid max-w-[1680px] gap-5 px-6 py-6 2xl:grid-cols-[minmax(0,1fr)_390px]">
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4"><div><h2 className="font-black">A4 세로 조직도</h2><p className="mt-1 text-xs text-slate-500">박스를 드래그해 배치하고, 연결선과 인쇄 결과를 바로 확인하세요.</p></div><div className="flex items-center gap-2"><span className="hidden items-center gap-1 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700 sm:inline-flex"><IconArrowsMove size={14} />자유 배치</span><button onClick={() => setZoom((value) => Math.max(55, value - 10))} className="icon-button" aria-label="축소"><IconZoomOut size={17} /></button><span className="w-10 text-center text-xs font-black text-slate-600">{zoom}%</span><button onClick={() => setZoom((value) => Math.min(135, value + 10))} className="icon-button" aria-label="확대"><IconZoomIn size={17} /></button></div></div>
        <div className="a4-stage"><div className="origin-top transition-transform" style={{ transform: `scale(${scale})`, width: PAPER.width * scale, height: PAPER.height * scale }}><ChartPaper /></div></div>
      </section>
      <aside className="space-y-5"><section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="font-black">조직 설정</h2><p className="mt-1 text-xs text-slate-500">선택한 조직의 계층과 표시 색상을 관리합니다.</p></div><IconSettings size={19} className="text-slate-400" /></div>{selected && <div className="mt-5 space-y-4"><label className="field-label">조직명<input value={selected.name} onChange={(event) => updateSelected({ name: event.target.value })} className="field-input" /></label><label className="field-label">조직장<input value={selected.leader} onChange={(event) => updateSelected({ leader: event.target.value })} className="field-input" /></label><div className="grid grid-cols-[1fr_64px] gap-3"><label className="field-label">소속 그룹<select value={selected.groupId} onChange={(event) => changeGroup(event.target.value)} className="field-input">{groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}</select></label><label className="field-label">색상<input aria-label="조직 색상" type="color" value={selected.color} onChange={(event) => updateSelected({ color: event.target.value })} className="mt-1.5 h-10 w-full cursor-pointer rounded-lg border border-slate-200 bg-white p-1" /></label></div><label className="field-label">상위 조직<select value={selected.parentId ?? ""} onChange={(event) => { const parentId = event.target.value || null; if (parentId && isDescendant(parentId, selected.id)) notify("하위 조직은 상위 조직으로 지정할 수 없습니다."); else updateSelected({ parentId }); }} className="field-input"><option value="">최상위 조직</option>{nodes.filter((node) => node.id !== selected.id && !isDescendant(node.id, selected.id)).map((node) => <option key={node.id} value={node.id}>{node.name}</option>)}</select></label><div className="grid grid-cols-2 gap-2"><button onClick={() => openAdd(selected.id)} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2.5 text-sm font-bold text-teal-700"><IconPlus size={16} />하위 조직</button><button onClick={removeSelected} disabled={!selected.parentId} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-200 px-3 py-2.5 text-sm font-bold text-rose-700 disabled:cursor-not-allowed disabled:opacity-40"><IconTrash size={16} />조직 삭제</button></div></div>}</section>
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="font-black">그룹 관리</h2><p className="mt-1 text-xs text-slate-500">그룹은 여러 조직을 묶는 분류 체계이며 상하위 관계와 별개입니다.</p></div><IconUsersGroup size={19} className="text-slate-400" /></div><div className="mt-4 space-y-2">{groups.map((group) => <div key={group.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3"><div className="flex items-center gap-2"><input aria-label={`${group.name} 색상`} type="color" value={group.color} onChange={(event) => setGroups((current) => current.map((item) => item.id === group.id ? { ...item, color: event.target.value } : item))} className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent p-0" /><input value={group.name} onChange={(event) => setGroups((current) => current.map((item) => item.id === group.id ? { ...item, name: event.target.value } : item))} className="min-w-0 flex-1 bg-transparent text-sm font-black text-slate-700 outline-none" /><button onClick={() => removeGroup(group)} className="grid h-7 w-7 place-items-center rounded text-slate-400 hover:bg-rose-50 hover:text-rose-600" aria-label={`${group.name} 삭제`}><IconTrash size={15} /></button></div><p className="mt-1.5 pl-9 text-[11px] text-slate-500">{nodes.filter((node) => node.groupId === group.id).length}개 조직 · {group.description}</p></div>)}</div><div className="mt-4 rounded-lg border border-dashed border-slate-300 p-3"><div className="grid grid-cols-[1fr_44px] gap-2"><input value={newGroupName} onChange={(event) => setNewGroupName(event.target.value)} placeholder="새 그룹명" className="field-input" /><input aria-label="그룹 색상" type="color" value={newGroupColor} onChange={(event) => setNewGroupColor(event.target.value)} className="h-10 w-full cursor-pointer rounded-lg border border-slate-200 bg-white p-1" /></div><input value={newGroupDescription} onChange={(event) => setNewGroupDescription(event.target.value)} placeholder="그룹 설명 (선택)" className="field-input mt-2" /><button onClick={addGroup} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2.5 text-sm font-bold text-white"><IconFolderPlus size={16} />그룹 만들기</button></div></section></aside>
    </main>
    {isAddOpen && <div className="modal-backdrop"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-black tracking-[0.14em] text-[#00a099]">ORGANIZATION</p><h2 className="mt-1 text-xl font-black">조직 추가</h2></div><button onClick={() => setIsAddOpen(false)} className="icon-button"><IconX size={19} /></button></div><div className="mt-6 space-y-4"><label className="field-label">조직명<input autoFocus value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} placeholder="예: 안전관리팀" className="field-input" /></label><label className="field-label">조직장<input value={draft.leader} onChange={(event) => setDraft((current) => ({ ...current, leader: event.target.value }))} placeholder="예: 홍길동" className="field-input" /></label><div className="grid grid-cols-2 gap-3"><label className="field-label">상위 조직<select value={draft.parentId} onChange={(event) => setDraft((current) => ({ ...current, parentId: event.target.value }))} className="field-input"><option value="">최상위 조직</option>{nodes.map((node) => <option key={node.id} value={node.id}>{node.name}</option>)}</select></label><label className="field-label">그룹<select value={draft.groupId} onChange={(event) => setDraft((current) => ({ ...current, groupId: event.target.value }))} className="field-input">{groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}</select></label></div></div><div className="mt-6 flex justify-end gap-2"><button onClick={() => setIsAddOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600">취소</button><button onClick={addNode} className="inline-flex items-center gap-2 rounded-lg bg-[#00a099] px-4 py-2.5 text-sm font-bold text-white"><IconCheck size={16} />조직 추가</button></div></div></div>}
    {isPrintPreviewOpen && <div className="modal-backdrop overflow-auto py-8"><div className="w-full max-w-[720px]"><div className="mb-4 flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-lg"><div><h2 className="font-black">A4 인쇄 미리보기</h2><p className="text-xs text-slate-500">현재 조직 구조를 A4 세로 한 장에 맞춰 출력합니다.</p></div><div className="flex gap-2"><button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg bg-[#00a099] px-3 py-2 text-sm font-bold text-white"><IconPrinter size={16} />인쇄</button><button onClick={() => setIsPrintPreviewOpen(false)} className="icon-button"><IconX size={18} /></button></div></div><div className="overflow-auto rounded-xl bg-slate-700 p-8"><div className="origin-top-left scale-[0.72] shadow-2xl"><ChartPaper print /></div></div></div></div>}
    {notice && <div className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-xl">{notice}</div>}
    <style jsx global>{`
      .tool-button { display:inline-flex; align-items:center; gap:8px; border:1px solid #dce5e8; border-radius:8px; background:#fff; padding:10px 12px; font-size:13px; font-weight:700; color:#334155; } .tool-button:hover { border-color:#6ee7df; background:#f0fdfa; }
      .icon-button { display:grid; height:36px; width:36px; place-items:center; border:1px solid #dce5e8; border-radius:8px; background:#fff; color:#475569; } .icon-button:hover { background:#f8fafc; }
      .field-label { display:block; font-size:12px; font-weight:700; color:#64748b; } .field-input { margin-top:6px; width:100%; border:1px solid #dce5e8; border-radius:8px; background:#fff; padding:10px 11px; font-size:13px; color:#1e293b; outline:none; } .field-input:focus { border-color:#00a099; box-shadow:0 0 0 3px rgba(0,183,175,.12); }
      .a4-stage { min-height:720px; overflow:auto; background:linear-gradient(45deg,#e2e8f0 25%,transparent 25%),linear-gradient(-45deg,#e2e8f0 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e2e8f0 75%),linear-gradient(-45deg,transparent 75%,#e2e8f0 75%); background-size:20px 20px; background-position:0 0,0 10px,10px -10px,-10px 0; padding:42px; } .a4-paper,.print-paper { position:relative; overflow:hidden; background:#fff; box-shadow:0 12px 28px rgba(15,23,42,.16); } .print-paper { box-shadow:none; }
      .modal-backdrop { position:fixed; inset:0; z-index:60; display:grid; place-items:center; background:rgba(15,23,42,.48); padding:16px; }
      @media print { @page { size:A4 portrait; margin:0; } body * { visibility:hidden !important; } .print-paper, .print-paper * { visibility:visible !important; } .print-paper { position:fixed !important; left:0 !important; top:0 !important; width:210mm !important; height:297mm !important; transform:none !important; box-shadow:none !important; } }
    `}</style>
  </div>;
}
