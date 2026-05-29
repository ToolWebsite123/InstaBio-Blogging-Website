"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-12 md:pt-16 lg:pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[linear-gradient(90deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)]"></div>

      <div className="page-section relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 mb-12 md:mb-16">
          <div className="lg:col-span-5 sm:col-span-2">
            <Link href="/" className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] tracking-tighter mb-6 inline-block hover:opacity-80 transition-opacity">
              Instabio.online
            </Link>
            <p className="text-[#8e8e8e] text-base sm:text-lg max-w-md leading-relaxed mb-8">
              Elevate your social presence with the web&apos;s most aesthetic collection of Instagram bios, viral captions, and stylish text.
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="font-bold text-[#262626] text-lg mb-6 md:mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[linear-gradient(90deg,#D62976,#FA7E1E)] rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-[#8e8e8e] font-medium hover:text-[#D62976] transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-[#D62976] mr-0 group-hover:mr-2 transition-all"></span>Home</Link></li>
              <li><Link href="/blog" className="text-[#8e8e8e] font-medium hover:text-[#D62976] transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-[#D62976] mr-0 group-hover:mr-2 transition-all"></span>Blog</Link></li>
              <li><Link href="/about" className="text-[#8e8e8e] font-medium hover:text-[#D62976] transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-[#D62976] mr-0 group-hover:mr-2 transition-all"></span>About</Link></li>
              <li><Link href="/contact" className="text-[#8e8e8e] font-medium hover:text-[#D62976] transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-[#D62976] mr-0 group-hover:mr-2 transition-all"></span>Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-bold text-[#262626] text-lg mb-6 md:mb-8 relative inline-block">
              Support
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[linear-gradient(90deg,#D62976,#FA7E1E)] rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-[#8e8e8e] font-medium hover:text-[#D62976] transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-[#D62976] mr-0 group-hover:mr-2 transition-all"></span>Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[#8e8e8e] font-medium hover:text-[#D62976] transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[2px] bg-[#D62976] mr-0 group-hover:mr-2 transition-all"></span>Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 md:pt-10 border-t border-gray-50 text-center">
          <p className="text-[#8e8e8e] text-sm font-medium">
            &copy; {new Date().getFullYear()} <Link href="/" className="font-bold text-[#262626] hover:text-[#D62976]">Instabio.online</Link>. Crafted for the aesthetic era.
          </p>
        </div>
      </div>
    </footer>
  );
}
