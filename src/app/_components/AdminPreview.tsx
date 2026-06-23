"use client";

import { useState } from "react";
import { IconPrinter, IconX } from "@tabler/icons-react";
import { assetPathProvider } from "@/config/asset_path_provider";

interface AdminPreviewProps {
  answers: Record<string, string>;
}

const SIDEBAR_ITEMS = [
  { label: "대시보드", active: false },
  { label: "위험성평가", active: false },
  { label: "안전교육", active: false },
  { label: "점검관리", active: false },
  { label: "안전활동", active: false },
  { label: "근로자관리", active: true },
];

const AdminPreview = ({ answers }: AdminPreviewProps) => {
  const [showPrintModal, setShowPrintModal] = useState(false);

  const tableRows = [
    { label: "성명", value: "홍길동" },
    { label: "직종", value: answers.jobType || "-" },
    { label: "안전보호구", value: answers.safetyGear || "-" },
    { label: "혈액형", value: answers.bloodType || "-" },
    { label: "비상연락망", value: answers.emergencyContact || "-" },
    { label: "교육증 첨부", value: answers.trainingCert || "-" },
  ];

  return (
    <div className="w-full max-w-[540px]">
      {/* Browser Frame */}
      <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
        {/* Title Bar */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-3">
            <div className="bg-white rounded-md px-3 py-1 text-[10px] text-gray-400 text-center border border-gray-200">
              safebuddy.co.kr/admin
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex min-h-[300px]">
          {/* Sidebar */}
          <div className="w-[130px] bg-gray-900 py-3 px-2 flex-shrink-0">
            <div className="flex items-center gap-2 px-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-mint-500 flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">SB</span>
              </div>
              <span className="text-white text-[10px] font-bold">SafeBuddy</span>
            </div>
            {SIDEBAR_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`px-2 py-1.5 rounded-md text-[10px] mb-0.5 cursor-default ${
                  item.active
                    ? "bg-mint-600 text-white font-semibold"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-bold text-gray-900">신규채용자 관리대장</h3>
              <button
                onClick={() => setShowPrintModal(true)}
                className="flex items-center gap-1 px-2.5 py-1 bg-mint-500 text-white text-[10px] font-medium rounded-md hover:bg-mint-600 transition-colors"
              >
                <IconPrinter size={12} />
                출력하기
              </button>
            </div>

            {/* Info Row */}
            <div className="flex gap-3 mb-3 text-[10px] text-gray-500">
              <span>작성일: 2025.01.15</span>
              <span>작성자: 홍길동</span>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-3 py-2 text-gray-600 font-semibold border-b border-gray-200 w-[90px]">
                      항목
                    </th>
                    <th className="text-left px-3 py-2 text-gray-600 font-semibold border-b border-gray-200">
                      내용
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-b-0">
                      <td className="px-3 py-2 text-gray-500 font-medium bg-gray-50/50">
                        {row.label}
                      </td>
                      <td className="px-3 py-2 text-gray-800 font-medium">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Status Badge */}
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-medium rounded-full border border-green-200">
                작성완료
              </span>
              <span className="text-[10px] text-gray-400">AI 자동작성</span>
            </div>
          </div>
        </div>
      </div>

      {/* Print Preview Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-[400px] w-full overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h4 className="text-sm font-bold text-gray-900">인쇄 미리보기</h4>
              <button
                onClick={() => setShowPrintModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <IconX size={14} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <div className="rounded-lg overflow-hidden border border-gray-200 shadow-inner">
                <img
                  src={assetPathProvider.image.doc11}
                  alt="신규채용자 관리대장 문서"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="px-4 pb-4 flex gap-2">
              <button
                onClick={() => setShowPrintModal(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                닫기
              </button>
              <button className="flex-1 py-2 bg-mint-500 text-white text-xs font-medium rounded-lg hover:bg-mint-600 transition-colors flex items-center justify-center gap-1">
                <IconPrinter size={14} />
                인쇄
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPreview;
