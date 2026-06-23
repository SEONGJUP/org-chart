"use client";

import { useState, useCallback } from "react";
import { toPng } from "html-to-image";

const SCALE = 2; // 2x resolution for sharp output in Illustrator

/**
 * Capture a section of the page as a PNG data URL.
 */
async function captureSection(
  target: HTMLElement,
  pageWidth: number,
  yOffset: number,
  sectionHeight: number
): Promise<string> {
  return toPng(target, {
    width: pageWidth,
    height: sectionHeight,
    pixelRatio: SCALE,
    style: {
      transform: `translateY(-${yOffset}px)`,
      transformOrigin: "top left",
    },
    filter: (node) => {
      if (node instanceof HTMLElement && node.id === "svg-download-btn") {
        return false;
      }
      return true;
    },
  });
}

const SvgDownloadButton = () => {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleDownload = useCallback(async () => {
    setIsCapturing(true);

    try {
      const btn = document.getElementById("svg-download-btn");
      if (btn) btn.style.display = "none";

      const target = document.body;
      const pageWidth = window.innerWidth;
      const pageHeight = document.documentElement.scrollHeight;

      // Split the page into sections to keep each base64 chunk manageable for Illustrator
      const SECTION_HEIGHT = 2000;
      const sectionCount = Math.ceil(pageHeight / SECTION_HEIGHT);
      const imageEntries: { y: number; h: number; dataUrl: string }[] = [];

      for (let i = 0; i < sectionCount; i++) {
        const yOffset = i * SECTION_HEIGHT;
        const h = Math.min(SECTION_HEIGHT, pageHeight - yOffset);
        const dataUrl = await captureSection(target, pageWidth, yOffset, h);
        imageEntries.push({ y: yOffset, h, dataUrl });
      }

      if (btn) btn.style.display = "";

      // Build Illustrator-compatible SVG 1.1 (no DOCTYPE — Illustrator chokes on it)
      const imageElements = imageEntries
        .map(
          (entry) =>
            `  <image x="0" y="${entry.y}" width="${pageWidth}" height="${entry.h}" xlink:href="${entry.dataUrl}" />`
        )
        .join("\n");

      const svgContent = [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<svg xmlns="http://www.w3.org/2000/svg"`,
        `     xmlns:xlink="http://www.w3.org/1999/xlink"`,
        `     version="1.1"`,
        `     width="${pageWidth}pt"`,
        `     height="${pageHeight}pt"`,
        `     viewBox="0 0 ${pageWidth} ${pageHeight}">`,
        imageElements,
        `</svg>`,
      ].join("\n");

      const blob = new Blob([svgContent], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `seiim-landing-${new Date().toISOString().slice(0, 10)}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("SVG capture failed:", err);
      alert("SVG 캡처에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsCapturing(false);
      const btn = document.getElementById("svg-download-btn");
      if (btn) btn.style.display = "";
    }
  }, []);

  return (
    <button
      id="svg-download-btn"
      onClick={handleDownload}
      disabled={isCapturing}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-wait cursor-pointer"
    >
      {isCapturing ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          캡처 중...
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          SVG 다운로드
        </>
      )}
    </button>
  );
};

export default SvgDownloadButton;
