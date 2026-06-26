import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us – Instabiogen.online",
  description: "Thanks for visiting Instabiogen.online! Got questions, suggestions or collaboration ideas? Our team is always ready to help.",
  alternates: {
    canonical: "https://instabiogen.online/contact",
  },
};

export default function ContactPage() {
  const brandGradient = "bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)]";
  
  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 md:py-20 px-4">
      <main className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-[#262626] tracking-tight text-balance break-words">
            Contact Us — <Link href="/" className={`bg-clip-text text-transparent ${brandGradient} hover:opacity-80 transition-opacity`}>Instabiogen.online</Link>
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
              <h2 className="text-2xl font-bold text-[#262626]">Contact Us</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              Have a question, suggestion, or collaboration idea? We&apos;d love to hear from you. Fill out the contact form on our website or reach us directly through the details provided below.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl ${brandGradient} flex items-center justify-center text-white shrink-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[#262626]">Contact Information</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50/80 p-4 sm:p-6 rounded-2xl border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#D62976]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Email</p>
                    <a href="mailto:contact@instabiogen.online" className="text-base sm:text-lg font-bold text-[#262626] hover:text-[#D62976] transition-colors break-all">contact@instabiogen.online</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#962FBF]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Website</p>
                    <Link href="/" className="text-base sm:text-lg font-bold text-[#262626] hover:text-[#D62976] transition-colors break-all">https://instabiogen.online</Link>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#FA7E1E]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Response Time</p>
                  <p className="text-base sm:text-lg font-bold text-[#262626]">Within 24–48 hours on business days</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="pt-12 border-t border-gray-50">
            <h2 className="text-2xl font-bold text-[#262626] mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#D62976]/20 outline-none transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#D62976]/20 outline-none transition-all"
                />
              </div>
              <textarea 
                placeholder="Your Message" 
                rows={6}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#D62976]/20 outline-none transition-all resize-none"
              ></textarea>
              <button className={`w-full py-5 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${brandGradient}`}>
                Submit Request
              </button>
            </form>
          </section>

          {/* Footer Note */}
          <footer className="pt-8 text-center">
            <p className="text-gray-400 text-xs italic uppercase tracking-widest">
              We value your feedback and will get back to you shortly.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
