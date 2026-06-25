"use client";

import { usePathname } from "next/navigation";

import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

const chromeHiddenPaths = new Set(["/org-chart"]);

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = chromeHiddenPaths.has(pathname);

  return (
    <>
      {!hideChrome && <MainHeader />}
      {children}
      {!hideChrome && <MainFooter />}
    </>
  );
}
