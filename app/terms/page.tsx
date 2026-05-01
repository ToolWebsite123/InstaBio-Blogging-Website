import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions – Instabio.online | Rules & Guidelines",
  description: "Review the Terms & Conditions of Instabio.online. Learn about content usage rules, intellectual property rights, user conduct, and our legal disclaimers.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  const brandGradient = "bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)]";
  
  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 md:py-20 px-4">
      <main className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-[#262626] tracking-tight">
            Terms & Conditions — <Link href="/" className={`bg-clip-text text-transparent ${brandGradient} hover:opacity-80 transition-opacity`}>Instabio.online</Link>
          </h1>
        </header>

        {/* Main Content Card */}
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 md:p-16 space-y-12">
          
          {/* Introduction */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Terms & Conditions</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Please read these Terms & Conditions carefully before using <Link href="/" className="font-bold text-[#262626] hover:text-[#D62976]">Instabio.online</Link>. By accessing or using our website, you agree to be bound by these terms.
            </p>
          </section>

          {/* 1. Acceptance of Terms */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Acceptance of Terms</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using <span className="font-bold text-[#262626]">Instabio.online</span>, you accept and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, please do not use our website.
            </p>
          </section>

          {/* 2. Use of Content */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Use of Content</h2>
            </div>
            <p className="text-gray-600 mb-6">All content published on <span className="font-bold text-[#262626]">Instabio.online</span> — including blog posts, bio templates, captions, articles, and images — is for personal, non-commercial use only.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <h3 className="font-bold text-green-800 mb-3 uppercase text-xs tracking-widest">You MAY:</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex gap-2"><span>•</span> Read and use bio ideas and templates for your personal social media profiles</li>
                  <li className="flex gap-2"><span>•</span> Share our content by linking back to our original articles</li>
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h3 className="font-bold text-red-800 mb-3 uppercase text-xs tracking-widest">You may NOT:</h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li className="flex gap-2"><span>•</span> Copy, reproduce, or republish our content on another website without prior written permission</li>
                  <li className="flex gap-2"><span>•</span> Use our content for commercial purposes without authorization</li>
                  <li className="flex gap-2"><span>•</span> Modify or create derivative works based on our content without credit</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Intellectual Property */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Intellectual Property</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              All original content, design, and materials on <span className="font-bold text-[#262626]">Instabio.online</span> are the intellectual property of <span className="font-bold text-[#262626]">Instabio.online</span> unless otherwise stated. Unauthorized use of our content may result in legal action.
            </p>
          </section>

          {/* 4. User Conduct */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">User Conduct</h2>
            </div>
            <p className="text-gray-600 mb-6">When using our website, you agree not to:</p>
            <ul className="space-y-3">
              {[
                "Engage in any activity that disrupts or interferes with the website's functioning",
                "Attempt to gain unauthorized access to our systems or data",
                "Submit false, misleading, or harmful information through any forms on our site",
                "Use our website for any unlawful or fraudulent purpose",
                "Distribute spam, malware, or harmful content through our platform"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <div className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-red-400"></div>
                  {text}
                </li>
              ))}
            </ul>
          </section>

          {/* 5. Third-Party Links */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Third-Party Links</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
            </p>
          </section>

          {/* 6. Disclaimer of Warranties */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Disclaimer of Warranties</h2>
            </div>
            <p className="text-gray-600 leading-relaxed italic">
              <span className="font-bold text-[#262626]">Instabio.online</span> is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties, expressed or implied, regarding the accuracy, completeness, or reliability of any content on our website. We do not guarantee that our website will be available at all times or free from errors.
            </p>
          </section>

          {/* 7. Limitation of Liability */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Limitation of Liability</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To the fullest extent permitted by law, <span className="font-bold text-[#262626]">Instabio.online</span> shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use or inability to use our website, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          {/* 8. Advertising */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Advertising</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <span className="font-bold text-[#262626]">Instabio.online</span> may display advertisements provided by third-party ad networks, including Google AdSense. We are not responsible for the content of these advertisements. Clicking on third-party ads may direct you to external websites, and we are not responsible for the content or privacy practices of those sites.
            </p>
          </section>

          {/* 9. Comments & User Submissions */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Comments & User Submissions</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              If our website allows user comments or submissions, you grant <span className="font-bold text-[#262626]">Instabio.online</span> a non-exclusive, royalty-free license to use, reproduce, and display such content. You are solely responsible for any content you submit and agree that it does not violate any third-party rights or applicable laws.
            </p>
          </section>

          {/* 10. Modifications to Terms */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Modifications to Terms</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting. Your continued use of the website after changes are posted constitutes your acceptance of the updated terms.
            </p>
          </section>

          {/* 11. Governing Law */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Governing Law</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              These Terms & Conditions shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the relevant courts.
            </p>
          </section>

          {/* 12. Contact */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Contact</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              For questions regarding these Terms & Conditions, please contact us at:{' '}
              <a href="mailto:contact@instabio.online" className="text-[#D62976] font-bold hover:underline">contact@instabio.online</a>
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
