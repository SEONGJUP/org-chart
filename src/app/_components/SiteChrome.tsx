"use client";

import { usePathname } from "next/navigation";

import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

const chromeVisiblePaths = new Set(["/homepage"]);

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showChrome = chromeVisiblePaths.has(pathname);

  return (
    <>
      {showChrome && <MainHeader />}
      {children}
      {showChrome && <MainFooter />}
    </>
  );
}
