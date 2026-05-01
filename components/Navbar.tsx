"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Instagram Bio for Girl", href: "/blog/best-instagram-bio-for-girls" },
    { name: "Instagram Bio for Boy", href: "/blog/best-instagram-bio-for-boys" },
    { name: "Instagram Bio for Free Fire", href: "/blog/best-free-fire-bio-for-instagram" },
    { name: "Instagram Blog", href: "/blog" },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] tracking-tighter hover:opacity-80 transition-opacity">
          Instabio.online
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[15px] font-semibold text-[#262626] hover:text-[#D62976] transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[linear-gradient(90deg,#4F5BD5,#D62976)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg text-[#262626] hover:bg-gray-50 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[100] shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <span className="font-bold text-lg">Menu</span>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-gray-500"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col p-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-[#262626] py-3 border-b border-gray-50 last:border-0 active:text-[#D62976]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
