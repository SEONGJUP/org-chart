"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { assetPathProvider } from "@/config/asset_path_provider";

const navItems = [
  { label: "홈", id: "home" },
  { label: "회사소개", id: "company" },
  { label: "서비스", id: "service" },
  { label: "문의", id: "contact" },
];

const MainHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        data-main-site-header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1140px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection("home");
            }}
            className="flex items-center"
          >
            <Image
              src={assetPathProvider.logo.seiim}
              width={100}
              height={32}
              priority={true}
              alt="SEIIM"
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection(item.id);
                }}
                className={`px-4 py-2 rounded-lg text-[15px] font-semibold transition-colors cursor-pointer ${
                  scrolled
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    : "text-gray-700 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection("contact");
              }}
              className="ml-4 px-5 py-2.5 bg-gray-900 text-white text-[14px] font-semibold rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
            >
              도입 문의
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            aria-label="메뉴"
          >
            <span
              className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-[72px] md:hidden">
          <nav className="flex flex-col p-6 gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection(item.id);
                }}
                className="px-4 py-4 text-lg font-semibold text-gray-800 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection("contact");
              }}
              className="mt-4 px-4 py-4 bg-gray-900 text-white text-lg font-semibold rounded-xl text-center cursor-pointer"
            >
              도입 문의
            </a>
          </nav>
        </div>
      )}
    </>
  );
};

export default MainHeader;
