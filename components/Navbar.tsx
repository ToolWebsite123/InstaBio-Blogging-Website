"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", shortName: "Home", href: "/" },
    { name: "Instagram Bio for Girl", shortName: "Bio for Girls", href: "/blog/best-instagram-bio-for-girls" },
    { name: "Instagram Bio for Boy", shortName: "Bio for Boys", href: "/blog/best-instagram-bio-for-boys" },
    { name: "Instagram Bio for Free Fire", shortName: "Free Fire", href: "/blog/best-free-fire-bio-for-instagram" },
    { name: "Instagram Blog", shortName: "Blog", href: "/blog" },
  ];

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isMobileMenuOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }
    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-[100]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 md:h-20 flex items-center justify-between gap-2 min-w-0 w-full">
        <Link
          href="/"
          className="min-w-0 max-w-[58%] sm:max-w-none text-base sm:text-xl md:text-2xl font-black bg-clip-text text-transparent bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] tracking-tighter hover:opacity-80 transition-opacity shrink"
        >
          <span className="sm:hidden">Instabio</span>
          <span className="hidden sm:inline">Instabio.online</span>
        </Link>

        <nav className="hidden lg:flex items-center justify-end gap-4 xl:gap-6 flex-1 min-w-0 ml-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              title={link.name}
              className="text-xs xl:text-sm font-semibold text-[#262626] hover:text-[#D62976] transition-all duration-300 relative group whitespace-nowrap"
            >
              {link.shortName}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[linear-gradient(90deg,#4F5BD5,#D62976)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="lg:hidden p-2.5 -mr-1 rounded-lg text-[#262626] hover:bg-gray-50 active:bg-gray-100 transition-colors shrink-0 touch-manipulation"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu className="w-6 h-6" aria-hidden />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[120] bg-white lg:hidden flex flex-col safe-bottom safe-x"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16 border-b border-gray-100 shrink-0">
            <span className="font-bold text-lg text-gray-900">Menu</span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" aria-hidden />
            </button>
          </div>
          <nav className="flex flex-col flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[15px] sm:text-base font-medium text-[#262626] py-3.5 border-b border-gray-100 last:border-0 active:text-[#D62976] break-words leading-snug"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
