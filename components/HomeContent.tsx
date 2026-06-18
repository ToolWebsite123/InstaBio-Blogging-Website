"use client";

import React, { useState } from "react";
import { Sparkles, PenTool, Copy, Check, ChevronDown, ListChecks, MessageSquare, Hash, User, UserPlus, Gamepad2, ArrowRight } from "lucide-react";

function FAQItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${
        open ? "border-purple-200 shadow-md shadow-purple-100/50" : "border-gray-100 hover:border-gray-200 hover:shadow-md"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex cursor-pointer items-center justify-between w-full px-6 py-5 outline-none text-left gap-4"
        aria-expanded={open}
      >
        <h3 className="font-semibold text-gray-800 text-[15px] sm:text-base leading-snug pr-2">{q}</h3>
        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            open
              ? "bg-gradient-to-r from-[#962FBF] to-[#FA7E1E] rotate-180"
              : "bg-gray-100"
          }`}
        >
          <ChevronDown className={`w-4 h-4 transition-colors ${open ? "text-white" : "text-gray-500"}`} />
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 pt-0">
            <div className="h-px bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 mb-4"></div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeContent() {
  return (
    <>
      {/* SECTION - WHAT IS / HOW TO USE */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/30 to-pink-100/20 rounded-full blur-3xl -z-0 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">


          <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="group bg-white rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8 hover:shadow-xl hover:shadow-purple-100/40 transition-all duration-500 border border-gray-100 relative overflow-hidden items-start">
              {/* Accent border left on desktop, top on mobile */}
              <div className="absolute top-0 left-0 right-0 h-1 sm:h-full sm:w-1 sm:right-auto bg-gradient-to-r sm:bg-gradient-to-b from-[#962FBF] to-[#FA7E1E]"></div>
              

              
              <div className="flex-1">
                <div className="text-center mb-6">
                  
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                    What is Instagram Bio Generator?
                  </h3>
                </div>
                <p className="text-gray-500 text-[15px] sm:text-base leading-relaxed mb-4">
                  Instagram Bio Generator is a free AI-powered tool that helps you create stylish, creative, and personalized bios for your Insta profile in just a few seconds. Whether you are an influencer, a student, a small business owner, or just someone who wants their profile to stand out — Instagram Bio Generator makes it effortless to craft the perfect bio that truly represents you.
                </p>
                <p className="text-gray-500 text-[15px] sm:text-base leading-relaxed">
                  Your Instagram bio is the very first thing someone sees when they visit your profile. With only 150 characters to make an impression, every word counts. Instagram Bio Generator takes away the stress of writing by generating unique, ready-to-use bios based on your tone, personality, and goals.
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8 hover:shadow-xl hover:shadow-purple-100/40 transition-all duration-500 border border-gray-100 relative overflow-hidden items-start">
              {/* Accent border left on desktop, top on mobile */}
              <div className="absolute top-0 left-0 right-0 h-1 sm:h-full sm:w-1 sm:right-auto bg-gradient-to-r sm:bg-gradient-to-b from-[#FA7E1E] to-[#D62976]"></div>
              

              
              <div className="flex-1 flex flex-col h-full">
                <div className="text-center mb-6">
                 
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                    How to Use This Instagram Bio Generator
                  </h3>
                </div>
                <p className="text-gray-500 text-[15px] sm:text-base leading-relaxed mb-6">
                  You already know the magic behind this tool — it is AI. Our Instagram Bio Generator uses advanced artificial intelligence to build the best bios for your profile. But even the smartest AI works better with a little input from you.
                </p>
                <div className="bg-gradient-to-br from-orange-50/40 to-pink-50/40 p-5 rounded-xl mt-auto border border-orange-100/50">
                  <p className="text-gray-700 text-[15px] font-semibold leading-relaxed flex items-start sm:items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[#FA7E1E] shrink-0 mt-0.5 sm:mt-0" />
                    Want to create an Insta bio that people actually remember? Good news — it takes less than a minute.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION - HOW IT WORKS */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              How Does the Instagram Bio Generator Work?
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Instagram Bio Generator uses Artificial Intelligence to generate personalized Insta bios based on your input. Here is how it works step by step:
            </p>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 relative z-10">
              {[
                { step: "1", title: "Describe Yourself", desc: "Type a few words about who you are, what you do, or what your profile is about. For example: \"fitness coach,\" \"travel blogger,\" or \"college student who loves music.\"", icon: User, color: "from-[#4F5BD5] to-[#962FBF]" },
                { step: "2", title: "Select Your Tone", desc: "Choose a tone that matches your personality or brand — such as Aesthetic, Attitude, Cool, Funny, Professional, Motivational, Love, VIP, and 30+ more categories to explore.", icon: ListChecks, color: "from-[#962FBF] to-[#D62976]" },
                { step: "3", title: "Click Generate", desc: "Hit the Generate button and Instagram Bio Generator instantly creates multiple unique bio options for you to choose from.", icon: Sparkles, color: "from-[#D62976] to-[#FA7E1E]" },
                { step: "4", title: "Copy and Paste", desc: "Simply copy your favorite bio and paste it directly into your Instagram profile. No formatting required, no technical skills needed.", icon: Copy, color: "from-[#FA7E1E] to-[#FEDA77]" }
              ].map((item, idx) => (
                <div key={idx} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg hover:shadow-purple-100/30 transition-all duration-300 flex items-start gap-4 h-full border border-gray-100 hover:border-purple-100">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-md shadow-purple-200/30 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2 text-[15px]">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION - WHAT MAKES A GOOD BIO */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-purple-50 via-pink-50/30 to-orange-50/20 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-purple-100/40 to-transparent rounded-full blur-3xl -z-0 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-14">
          
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              What Makes a Good Instagram Bio?
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              A great Instagram bio does three things at once — it tells people who you are, what you do, and why they should follow you. Here are the best practices:
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { title: "Keep it concise", desc: "Instagram allows only 150 characters in your bio. Make every word count and avoid unnecessary filler text." },
              { title: "Show your personality", desc: "Whether you are funny, professional, or inspirational — let your bio reflect the real you." },
              { title: "Use relevant keywords", desc: "Including words related to your niche (fitness, fashion, food, travel) makes your profile easier to discover in Instagram searches." },
              { title: "Add a Call-to-Action", desc: "Guide your visitors — whether it is \"Check my latest reel\" or \"DM for collabs\" — a CTA encourages action." },
              { title: "Use emojis wisely", desc: "Emojis can make your bio more visual and expressive, but do not overdo it. 2 to 3 well-placed emojis work best." },
            ].map((item, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg hover:shadow-purple-100/30 transition-all duration-300 flex items-start gap-4 h-full border border-white hover:border-purple-100">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#962FBF] to-[#FA7E1E] flex items-center justify-center shrink-0 shadow-md shadow-purple-200/30 group-hover:scale-110 transition-transform duration-300">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2 text-[15px]">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION - EXPLORE OTHER FREE TOOLS */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-14">

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Explore Other Free Tools by Instagram Bio Generator
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              In addition to the Instagram Bio Generator, our platform offers a variety of free tools to help you build a stronger Instagram presence:
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { title: "Instagram Bio for Girls", desc: "Generate cute, aesthetic, attitude, and stylish bios specifically crafted for girls.", icon: User, gradient: "from-[#D62976] to-[#FA7E1E]" },
              { title: "Instagram Bio for Boys", desc: "Create confident, stylish, funny, and motivational bios tailored for boys and men.", icon: UserPlus, gradient: "from-[#4F5BD5] to-[#962FBF]" },
              { title: "Instagram Bio for Free Fire", desc: "Generate gaming-themed bios for Free Fire players, squads, and fan pages.", icon: Gamepad2, gradient: "from-[#FA7E1E] to-[#FEDA77]" },
              { title: "Instagram Caption Generator", desc: "Craft compelling captions for your Instagram posts instantly.", icon: MessageSquare, gradient: "from-[#962FBF] to-[#D62976]" },
              { title: "Instagram Hashtag Generator", desc: "Generate relevant hashtags to increase your content's reach and visibility.", icon: Hash, gradient: "from-[#4F5BD5] to-[#D62976]" },
            ].map((tool, idx) => (
              <div key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-xl hover:shadow-purple-100/30 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer relative overflow-hidden">
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}></div>
                
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 shadow-lg shadow-purple-100/30 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  <tool.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 text-base mb-2 relative z-10">{tool.title}</h3>
                <p className="text-sm text-gray-500 mb-4 flex-grow leading-relaxed relative z-10">{tool.desc}</p>
               
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION - FAQ */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-gradient-to-r from-purple-100/20 to-transparent rounded-full blur-3xl -z-0 pointer-events-none -translate-y-1/2"></div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-14">
           
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Got questions? We've got answers. Here is everything you need to know about our generator.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              {
                q: "Is Instagram Bio Generator Free to Use?",
                a: "Yes — Instagram Bio Generator is completely free. There are no hidden charges, no subscription plans, and no credit card required. You can generate as many Insta bios as you want, as many times as you want, without any restrictions."
              },
              {
                q: "Is There a Limit on How Many Bios I Can Generate?",
                a: "No. Instagram Bio Generator places no limit on the number of bios you can create. You can generate, refresh, and try different tones unlimited times until you find the one that perfectly represents you."
              },
              {
                q: "Can I Edit the Bio After It Is Generated?",
                a: "Absolutely. Every bio generated by Instagram Bio Generator is fully editable. You can copy it, tweak any word, add your personal touch, or combine parts of different generated bios to create something uniquely yours."
              },
              {
                q: "Does Instagram Bio Generator Work on Mobile Devices?",
                a: "Yes. Instagram Bio Generator is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. You can generate your perfect Instagram bio directly from your phone — no app download required."
              },
              {
                q: "Do I Need to Sign Up or Log In to Use Instagram Bio Generator?",
                a: "No. You can use Instagram Bio Generator without creating an account or logging in. Simply open the tool, enter your details, and generate your bio instantly — it is that convenient."
              }
            ].map((faq, idx) => (
              <FAQItem key={idx} q={faq.q} a={faq.a} idx={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
