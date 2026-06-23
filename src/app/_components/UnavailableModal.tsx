"use client";

import { IconAlertTriangle, IconArrowLeft, IconX } from "@tabler/icons-react";

export default function UnavailableModal({ title, onClose }: { title: string | null; onClose: () => void }) {
  if (!title) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/35 p-4" onClick={onClose}>
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <button onClick={onClose} aria-label="닫기" className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100"><IconX size={19} /></button>
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-teal-50 text-teal-700"><IconAlertTriangle size={27} /></div>
        <h2 className="mt-5 text-xl font-black text-slate-900">페이지 준비 중</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500"><b className="text-slate-700">{title}</b> 기능은 아직 서비스에 연결되지 않았습니다.<br />현재 페이지에서 계속 작업할 수 있습니다.</p>
        <button onClick={onClose} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"><IconArrowLeft size={17} />현재 페이지로 돌아가기</button>
      </div>
    </div>
  );
}
