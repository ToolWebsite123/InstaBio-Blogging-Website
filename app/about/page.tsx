import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us – Instabio.online | Where Your Instagram Story Begins",
  description: "We don't just write bios — we craft your first impression. Instabio.online was built for dreamers, creators & go-getters who refuse to be ordinary. Your perfect bio starts here.",
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutPage() {
  const brandGradient = "bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)]";
  
  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 md:py-20 px-4">
      <main className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-[#262626] tracking-tight text-balance break-words">
            About Us — <Link href="/" className={`bg-clip-text text-transparent ${brandGradient} hover:opacity-80 transition-opacity`}>Instabio.online</Link>
          </h1>
        </header>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl md:rounded-[30px] lg:rounded-[40px] shadow-sm border border-gray-100 p-6 sm:p-8 md:p-12 lg:p-16 space-y-16">
          
          {/* About Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#262626] mb-4 sm:mb-6">About Instabio.online</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Welcome to <Link href="/" className="font-bold text-[#262626] hover:text-[#D62976]">Instabio.online</Link> — your go-to destination for creative, inspiring, and ready-to-use Instagram bio ideas, captions, and personal branding tips. We help individuals, influencers, and businesses craft the perfect online identity.
            </p>
          </section>

          {/* Our Mission */}
          <section className="bg-gray-50/50 p-8 md:p-10 rounded-[30px] border border-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
              <div className={`w-12 h-12 rounded-2xl ${brandGradient} flex items-center justify-center text-white shrink-0 shadow-lg`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#262626]">Our Mission</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 text-lg leading-relaxed">
                At <span className="font-bold text-[#262626]">Instabio.online</span>, our mission is simple: help you express yourself online with confidence. Whether you&apos;re building a personal brand, growing a business, or just trying to stand out on social media — we provide the words and ideas that make it happen.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed italic border-l-4 border-[#D62976] pl-6 py-2">
                We believe a great bio is more than just text. It&apos;s your first impression, your digital handshake, and your story — all in a few short lines. That&apos;s why we work hard to bring you fresh, relevant, and creative content every day.
              </p>
            </div>
          </section>

          {/* What We Offer */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#262626] shrink-0">What We Offer</h2>
              <div className={`h-1 flex-1 rounded-full ${brandGradient} opacity-20`}></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Hundreds of curated Instagram bio ideas for every niche",
                "Attitude, funny, aesthetic, and professional bio templates",
                "Bio writing tips and personal branding guides",
                "Regular content updates aligned with trending social media styles",
                "Free resources to help you build a stronger online presence"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-[#D62976]/30 transition-colors shadow-sm group">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#D62976] group-hover:bg-[#D62976] group-hover:text-white transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Our Story */}
          <section className="relative overflow-hidden p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-[30px] lg:rounded-[40px] bg-[#262626] text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] opacity-10 blur-3xl -mr-20 -mt-20 rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Our Story</h2>
            <div className="space-y-6 relative z-10">
              <p className="text-gray-300 text-lg leading-relaxed">
                <span className="font-bold text-white">Instabio.online</span> was started by a passionate team of writers and digital creators who were frustrated by the lack of quality bio inspiration online. We saw millions of people struggling to write just 150 characters about themselves — and we knew we could help.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                From a small blog to a growing resource hub, we have expanded our content library to serve users across the globe. Our readers come from Pakistan, India, UAE, UK, USA, and beyond — all united by the desire to present their best selves online.
              </p>
            </div>
          </section>

          {/* Our Values */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#262626] mb-2">Our Values</h2>
              <p className="text-gray-500">The core principles that drive us every day.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Creativity", desc: "We celebrate originality and fresh ideas in every piece of content." },
                { title: "Authenticity", desc: "We encourage users to be genuinely themselves." },
                { title: "Accessibility", desc: "All our content is free and easy to use." },
                { title: "Consistency", desc: "We publish regularly so you always have something new to explore." }
              ].map((value, i) => (
                <div key={i} className="text-center space-y-3">
                  <div className={`w-12 h-12 rounded-2xl ${brandGradient} mx-auto flex items-center justify-center text-white font-black text-xl shadow-md`}>
                    {value.title[0]}
                  </div>
                  <h3 className="font-bold text-[#262626]">{value.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Note */}
          <footer className="pt-10 border-t border-gray-50 text-center">
            <p className="text-gray-400 text-xs italic uppercase tracking-widest">
              Crafted with ❤️ for the aesthetic era.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
