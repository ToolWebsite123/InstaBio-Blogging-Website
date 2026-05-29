import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – Instabio.online | How We Protect Your Data",
  description: "Read the Privacy Policy of Instabio.online to understand how we collect, use, and protect your personal information. Your privacy is our priority.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  const brandGradient = "bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)]";
  
  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 md:py-20 px-4">
      <main className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-[#262626] tracking-tight text-balance break-words">
            Privacy Policy — <Link href="/" className={`bg-clip-text text-transparent ${brandGradient} hover:opacity-80 transition-opacity`}>Instabio.online</Link>
          </h1>
        </header>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl md:rounded-[30px] lg:rounded-[40px] shadow-sm border border-gray-100 p-6 sm:p-8 md:p-12 lg:p-16 space-y-12">
          
          {/* Introduction */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Privacy Policy</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              This Privacy Policy explains how <Link href="/" className="font-bold text-[#262626] hover:text-[#D62976]">Instabio.online</Link> collects, uses, and protects your personal information when you visit our website. By using our site, you agree to the terms described below.
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Information We Collect</h2>
            </div>
            <p className="text-gray-600 mb-6">We may collect the following types of information when you visit <span className="font-bold text-[#262626]">Instabio.online</span>:</p>
            <div className="space-y-3">
              {[
                { label: "Personal Information:", value: "Such as your name and email address if you voluntarily submit it through our contact form or newsletter subscription." },
                { label: "Usage Data:", value: "Automatically collected information including your IP address, browser type, operating system, referring URLs, and pages visited." },
                { label: "Cookies:", value: "Small data files stored on your device to enhance your browsing experience and analyze site traffic." }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50/80 p-4 rounded-xl text-sm md:text-base border border-gray-100">
                  <span className="font-bold text-[#262626]">{item.label}</span> <span className="text-gray-600">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">How We Use Your Information</h2>
            </div>
            <p className="text-gray-600 mb-6">We use collected information for the following purposes:</p>
            <ul className="space-y-3 mb-8">
              {[
                "To operate and improve the functionality of our website",
                "To respond to your inquiries and provide customer support",
                "To send newsletters or updates (only if you have subscribed)",
                "To analyze website traffic and understand user behavior",
                "To display relevant advertisements through third-party ad networks"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <div className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#D62976]"></div>
                  {text}
                </li>
              ))}
            </ul>
            <div className={`p-4 rounded-xl text-white text-center font-bold text-sm md:text-base tracking-wide ${brandGradient}`}>
              We value your privacy — your data is used only to improve your experience.
            </div>
          </section>

          {/* 3. Cookies & Tracking Technologies */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Cookies & Tracking Technologies</h2>
            </div>
            <p className="text-gray-600 mb-6"><span className="font-bold text-[#262626]">Instabio.online</span> uses cookies and similar tracking technologies to personalize your experience. These may include:</p>
            <div className="space-y-3 mb-6">
              {[
                { label: "Session Cookies:", value: "Temporary cookies that expire when you close your browser." },
                { label: "Persistent Cookies:", value: "Stored on your device to remember your preferences." },
                { label: "Third-Party Cookies:", value: "Set by services such as Google Analytics and Google AdSense to help us understand traffic and serve relevant ads." }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50/80 p-4 rounded-xl text-sm md:text-base border border-gray-100">
                  <span className="font-bold text-[#262626]">{item.label}</span> <span className="text-gray-600">{item.value}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm italic bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              You can control or disable cookies through your browser settings at any time. Please note that disabling cookies may affect certain features of our website.
            </p>
          </section>

          {/* 4. Third-Party Services */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Third-Party Services</h2>
            </div>
            <p className="text-gray-600 mb-6">We may use the following third-party services that have their own privacy policies:</p>
            <ul className="space-y-4 mb-6">
              {[
                { name: "Google Analytics:", desc: "For tracking website usage and visitor behavior." },
                { name: "Google AdSense:", desc: "For displaying contextual advertisements." },
                { name: "Social Media Platforms:", desc: "We may have sharing buttons or embedded content from platforms such as Instagram, Facebook, or Twitter." }
              ].map((item, i) => (
                <li key={i} className="text-gray-600">
                  <span className="font-bold text-[#262626]">{item.name}</span> {item.desc}
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-sm italic">
              We are not responsible for the privacy practices of these third-party services. We encourage you to review their respective privacy policies.
            </p>
          </section>

          {/* 5. Data Security */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Data Security</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We take reasonable precautions to protect your personal data from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* 6. Children's Privacy */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Children&apos;s Privacy</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <span className="font-bold text-[#262626]">Instabio.online</span> does not knowingly collect personal information from children under the age of 13. If you believe your child has provided us with personal information, please contact us immediately and we will take steps to remove that information.
            </p>
          </section>

          {/* 7. Your Rights */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Your Rights</h2>
            </div>
            <p className="text-gray-600 mb-6">You have the right to:</p>
            <ul className="space-y-3">
              {[
                "Request access to the personal data we hold about you",
                "Request correction or deletion of your personal data",
                "Withdraw consent for us to use your data at any time",
                "Opt out of marketing communications"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#962FBF]"></div>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 8. Changes to This Policy */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Changes to This Policy</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Footer Note */}
          <footer className="pt-8 border-t border-gray-50 text-center">
            <p className="text-gray-400 text-xs italic uppercase tracking-widest">
              Last Updated: April 30, 2026
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
