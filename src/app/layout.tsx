import type { Metadata, Viewport } from "next";

import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/functions/validation";
import MainHeader from "./_components/MainHeader";
import MainFooter from "./_components/MainFooter";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "새임(SEIIM) - 스마트 안전관리 플랫폼",
  description:
    "중대재해처벌법 컴플라이언스 시스템. 위험성 평가부터 안전교육까지, 올인원 안전관리 솔루션.",
};

export const viewport: Viewport = {
  themeColor: "white",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn("light")}>
      <body className={`${pretendard.variable} antialiased max-w-screen overflow-x-hidden`}>
        <MainHeader />
        {children}
        <MainFooter />
      </body>
    </html>
  );
}
