"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconArrowsMove,
  IconBuildingCommunity,
  IconCheck,
  IconLayoutGrid,
  IconPlus,
  IconSettings,
  IconTrash,
  IconUser,
  IconUsersGroup,
  IconX,
} from "@tabler/icons-react";

type OrgGroup = { id: string; name: string; color: string };
type OrgNode = {
  id: string;
  name: string;
  leader: string;
  groupId: string;
  parentId: string | null;
  x: number;
  y: number;
};

const initialGroups: OrgGroup[] = [
  { id: "executive", name: "경영", color: "#00b7af" },
  { id: "product", name: "제품·기술", color: "#2563eb" },
  { id: "business", name: "사업", color: "#f59e0b" },
];

const initialNodes: OrgNode[] = [
  { id: "ceo", name: "대표이사", leader: "김새임", groupId: "executive", parentId: null, x: 525, y: 44 },
  { id: "strategy", name: "경영전략실", leader: "박하늘", groupId: "executive", parentId: "ceo", x: 150, y: 205 },
  { id: "product", name: "제품개발본부", leader: "이도윤", groupId: "product", parentId: "ceo", x: 525, y: 205 },
  { id: "business", name: "사업본부", leader: "최유진", groupId: "business", parentId: "ceo", x: 900, y: 205 },
  { id: "platform", name: "플랫폼팀", leader: "정민수", groupId: "product", parentId: "product", x: 395, y: 385 },
  { id: "ai", name: "AI 솔루션팀", leader: "서하린", groupId: "product", parentId: "product", x: 655, y: 385 },
  { id: "sales", name: "영업팀", leader: "윤서준", groupId: "business", parentId: "business", x: 835, y: 385 },
  { id: "cs", name: "고객성공팀", leader: "송지민", groupId: "business", parentId: "business", x: 1095, y: 385 },
];

const newNodeDraft = { name: "", leader: "", groupId: "", parentId: "" };

function slugify(value: string) {
  return value.trim().replace(/\s+/g, "-").toLowerCase().replace(/[^a-z0-9가-힣-]/g, "") || "group";
}

export default function OrgChartPage() {
  const [groups, setGroups] = useState<OrgGroup[]>(initialGroups);
  const [nodes, setNodes] = useState<OrgNode[]>(initialNodes);
  const [selectedId, setSelectedId] = useState("product");
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupColor, setNewGroupColor] = useState("#7c3aed");
  const [draft, setDraft] = useState(newNodeDraft);
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const drag = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const selected = nodes.find((node) => node.id === selectedId) ?? null;
  const groupById = useMemo(() => new Map(groups.map((group) => [group.id, group])), [groups]);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const updateSelected = (patch: Partial<OrgNode>) => {
    if (!selected) return;
    setNodes((current) => current.map((node) => node.id === selected.id ? { ...node, ...patch } : node));
  };

  const isDescendant = (candidateParentId: string, childId: string) => {
    let cursor: string | null = candidateParentId;
    while (cursor) {
      if (cursor === childId) return true;
      cursor = nodes.find((node) => node.id === cursor)?.parentId ?? null;
    }
    return false;
  };

  const changeParent = (parentId: string | null) => {
    if (!selected) return;
    if (parentId && isDescendant(parentId, selected.id)) {
      showNotice("하위 조직을 상위 조직으로 지정할 수 없습니다.");
      return;
    }
    updateSelected({ parentId });
  };

  const openAddPanel = () => {
    const parent = selected ?? nodes[0];
    setDraft({ name: "", leader: "", groupId: parent.groupId, parentId: parent.id });
    setIsAddPanelOpen(true);
  };

  const addNode = () => {
    if (!draft.name.trim()) {
      showNotice("조직명을 입력해 주세요.");
      return;
    }
    const parent = nodes.find((node) => node.id === draft.parentId) ?? null;
    const id = `node-${Date.now()}`;
    const count = nodes.filter((node) => node.parentId === parent?.id).length;
    const node: OrgNode = {
      id,
      name: draft.name.trim(),
      leader: draft.leader.trim() || "담당자 미지정",
      groupId: draft.groupId || groups[0]?.id || "",
      parentId: parent?.id ?? null,
      x: Math.min(1080, (parent?.x ?? 515) + (count - 1) * 208),
      y: Math.min(550, (parent?.y ?? 42) + 165),
    };
    setNodes((current) => [...current, node]);
    setSelectedId(id);
    setIsAddPanelOpen(false);
    showNotice(`${node.name} 조직을 추가했습니다.`);
  };

  const removeSelected = () => {
    if (!selected || selected.parentId === null) return;
    const children = nodes.filter((node) => node.parentId === selected.id);
    setNodes((current) => current
      .filter((node) => node.id !== selected.id)
      .map((node) => node.parentId === selected.id ? { ...node, parentId: selected.parentId } : node));
    setSelectedId(selected.parentId);
    showNotice(children.length ? "조직을 삭제하고 하위 조직을 상위 조직으로 연결했습니다." : "조직을 삭제했습니다.");
  };

  const addGroup = () => {
    const name = newGroupName.trim();
    if (!name) {
      showNotice("그룹명을 입력해 주세요.");
      return;
    }
    if (groups.some((group) => group.name === name)) {
      showNotice("같은 이름의 그룹이 이미 있습니다.");
      return;
    }
    const id = `${slugify(name)}-${Date.now()}`;
    setGroups((current) => [...current, { id, name, color: newGroupColor }]);
    setNewGroupName("");
    showNotice(`${name} 그룹을 추가했습니다.`);
  };

  const removeGroup = (group: OrgGroup) => {
    if (groups.length === 1) {
      showNotice("최소 하나의 그룹이 필요합니다.");
      return;
    }
    if (nodes.some((node) => node.groupId === group.id)) {
      showNotice("이 그룹을 사용하는 조직이 있어 삭제할 수 없습니다.");
      return;
    }
    setGroups((current) => current.filter((item) => item.id !== group.id));
    showNotice(`${group.name} 그룹을 삭제했습니다.`);
  };

  const autoArrange = () => {
    const getDepth = (node: OrgNode, seen = new Set<string>()): number => {
      if (!node.parentId || seen.has(node.id)) return 0;
      const parent = nodes.find((item) => item.id === node.parentId);
      return parent ? getDepth(parent, new Set([...seen, node.id])) + 1 : 0;
    };
    const levels = new Map<number, OrgNode[]>();
    nodes.forEach((node) => {
      const level = getDepth(node);
      levels.set(level, [...(levels.get(level) ?? []), node]);
    });
    setNodes((current) => current.map((node) => {
      const level = getDepth(node);
      const siblings = levels.get(level) ?? [];
      const index = siblings.findIndex((item) => item.id === node.id);
      const gap = Math.min(260, 1140 / Math.max(1, siblings.length));
      return { ...node, x: Math.max(24, 570 - ((siblings.length - 1) * gap) / 2 + index * gap), y: 44 + level * 165 };
    }));
    showNotice("조직도를 계층 구조에 맞춰 정렬했습니다.");
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !canvasRef.current) return;
    const bounds = canvasRef.current.getBoundingClientRect();
    const x = Math.max(12, Math.min(bounds.width - 202, event.clientX - bounds.left - drag.current.offsetX));
    const y = Math.max(12, Math.min(bounds.height - 110, event.clientY - bounds.top - drag.current.offsetY));
    setNodes((current) => current.map((node) => node.id === drag.current?.id ? { ...node, x, y } : node));
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50" aria-label="메인으로 돌아가기"><IconArrowLeft size={20} /></Link>
            <div><div className="flex items-center gap-2 text-xs font-bold text-slate-400"><IconBuildingCommunity size={14} />조직 관리</div><h1 className="mt-1 text-xl font-black">조직도 편집기</h1></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={autoArrange} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50"><IconLayoutGrid size={17} />자동 정렬</button>
            <button onClick={openAddPanel} className="inline-flex items-center gap-2 rounded-lg bg-[#00a099] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#008b85]"><IconPlus size={17} />조직 추가</button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1600px] gap-5 px-6 py-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div><h2 className="font-black">조직 구조 편집</h2><p className="mt-1 text-xs text-slate-500">조직 박스를 드래그해 배치하고, 우측 패널에서 상위 조직과 그룹을 변경할 수 있습니다.</p></div>
            <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700"><IconArrowsMove size={14} />드래그 이동</span>
          </div>
          <div ref={canvasRef} onPointerMove={onPointerMove} onPointerUp={() => { drag.current = null; }} onPointerLeave={() => { drag.current = null; }} className="relative h-[650px] min-w-[760px] overflow-auto bg-[linear-gradient(#e8eef0_1px,transparent_1px),linear-gradient(90deg,#e8eef0_1px,transparent_1px)] bg-[size:24px_24px]">
            <svg className="pointer-events-none absolute inset-0 h-full min-w-[760px] w-full">{nodes.filter((node) => node.parentId).map((node) => { const parent = nodes.find((item) => item.id === node.parentId); if (!parent) return null; return <path key={node.id} d={`M ${parent.x + 95} ${parent.y + 96} V ${node.y - 28} H ${node.x + 95}`} fill="none" stroke="#b9c6ca" strokeWidth="2" />; })}</svg>
            {nodes.map((node) => {
              const group = groupById.get(node.groupId) ?? groups[0];
              const active = node.id === selectedId;
              return <button key={node.id} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); const bounds = canvasRef.current?.getBoundingClientRect(); if (bounds) drag.current = { id: node.id, offsetX: event.clientX - bounds.left - node.x, offsetY: event.clientY - bounds.top - node.y }; setSelectedId(node.id); }} onClick={() => setSelectedId(node.id)} style={{ left: node.x, top: node.y, borderColor: active ? group?.color : undefined }} className={`absolute w-[190px] cursor-grab rounded-lg border bg-white p-3 text-left shadow-sm transition-shadow active:cursor-grabbing ${active ? "ring-2 ring-teal-100 shadow-md" : "border-slate-200 hover:shadow-md"}`}>
                <div className="flex items-center justify-between gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: group?.color }} /><span className="text-[10px] font-black text-slate-400">{group?.name}</span></div><p className="mt-2 truncate text-sm font-black text-slate-800">{node.name}</p><p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><IconUser size={13} />{node.leader}</p>
              </button>;
            })}
          </div>
        </section>

        <aside className="space-y-5">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="font-black">조직 설정</h2><IconSettings size={19} className="text-slate-400" /></div>
            {selected ? <div className="mt-5 space-y-4">
              <label className="block text-xs font-bold text-slate-500">조직명<input value={selected.name} onChange={(event) => updateSelected({ name: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-800 outline-none focus:border-teal-500" /></label>
              <label className="block text-xs font-bold text-slate-500">조직장<input value={selected.leader} onChange={(event) => updateSelected({ leader: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-teal-500" /></label>
              <label className="block text-xs font-bold text-slate-500">상위 조직<select value={selected.parentId ?? ""} onChange={(event) => changeParent(event.target.value || null)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-teal-500"><option value="">최상위 조직</option>{nodes.filter((node) => node.id !== selected.id && !isDescendant(node.id, selected.id)).map((node) => <option key={node.id} value={node.id}>{node.name}</option>)}</select></label>
              <label className="block text-xs font-bold text-slate-500">그룹<select value={selected.groupId} onChange={(event) => updateSelected({ groupId: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-teal-500">{groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}</select></label>
              <button onClick={removeSelected} disabled={selected.parentId === null} className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-rose-200 px-3 py-2.5 text-sm font-bold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"><IconTrash size={16} />조직 삭제</button>
            </div> : <p className="mt-4 text-sm text-slate-500">캔버스에서 조직을 선택해 주세요.</p>}
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="font-black">그룹 설정</h2><IconUsersGroup size={19} className="text-slate-400" /></div>
            <div className="mt-4 space-y-2">{groups.map((group) => <div key={group.id} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2"><input aria-label={`${group.name} 색상`} type="color" value={group.color} onChange={(event) => setGroups((current) => current.map((item) => item.id === group.id ? { ...item, color: event.target.value } : item))} className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0" /><input aria-label={`${group.name} 그룹명`} value={group.name} onChange={(event) => setGroups((current) => current.map((item) => item.id === group.id ? { ...item, name: event.target.value } : item))} className="min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-700 outline-none" /><button onClick={() => removeGroup(group)} aria-label={`${group.name} 그룹 삭제`} className="grid h-7 w-7 place-items-center rounded text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"><IconTrash size={15} /></button></div>)}</div>
            <div className="mt-4 flex gap-2"><input value={newGroupName} onChange={(event) => setNewGroupName(event.target.value)} onKeyDown={(event) => event.key === "Enter" && addGroup()} placeholder="새 그룹명" className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500" /><input aria-label="새 그룹 색상" type="color" value={newGroupColor} onChange={(event) => setNewGroupColor(event.target.value)} className="h-10 w-10 cursor-pointer rounded-lg border border-slate-200 bg-white p-1" /><button onClick={addGroup} aria-label="그룹 추가" className="grid h-10 w-10 place-items-center rounded-lg bg-slate-900 text-white transition hover:bg-slate-700"><IconPlus size={18} /></button></div>
          </section>
        </aside>
      </main>

      {isAddPanelOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/35 p-4"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold text-teal-600">ORGANIZATION</p><h2 className="mt-1 text-xl font-black">조직 추가</h2><p className="mt-1 text-sm text-slate-500">상위 조직과 그룹을 정하면 조직도에 바로 연결됩니다.</p></div><button onClick={() => setIsAddPanelOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"><IconX size={20} /></button></div>
        <div className="mt-6 space-y-4"><label className="block text-xs font-bold text-slate-500">조직명<input autoFocus value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} placeholder="예: 안전관리팀" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500" /></label><label className="block text-xs font-bold text-slate-500">조직장<input value={draft.leader} onChange={(event) => setDraft((current) => ({ ...current, leader: event.target.value }))} placeholder="예: 홍길동" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500" /></label><div className="grid grid-cols-2 gap-3"><label className="block text-xs font-bold text-slate-500">상위 조직<select value={draft.parentId} onChange={(event) => setDraft((current) => ({ ...current, parentId: event.target.value }))} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-500"><option value="">최상위 조직</option>{nodes.map((node) => <option key={node.id} value={node.id}>{node.name}</option>)}</select></label><label className="block text-xs font-bold text-slate-500">그룹<select value={draft.groupId} onChange={(event) => setDraft((current) => ({ ...current, groupId: event.target.value }))} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-500">{groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}</select></label></div></div>
        <div className="mt-6 flex justify-end gap-2"><button onClick={() => setIsAddPanelOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600">취소</button><button onClick={addNode} className="inline-flex items-center gap-2 rounded-lg bg-[#00a099] px-4 py-2.5 text-sm font-bold text-white"><IconCheck size={16} />조직 추가</button></div>
      </div></div>}
      {notice && <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-xl">{notice}</div>}
    </div>
  );
}
