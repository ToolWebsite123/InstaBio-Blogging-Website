"use client";

import dynamic from "next/dynamic";

const BioGenerator = dynamic(() => import("@/components/BioGenerator"), {
  ssr: false,
  loading: () => (
    <div className="p-8 min-h-[420px] flex flex-col items-center justify-center space-y-6 animate-pulse bg-gray-50/50 rounded-2xl">
      <div className="h-7 bg-gray-200 rounded-lg w-48 mx-auto" />
      <div className="w-full max-w-lg space-y-3">
        <div className="h-10 bg-gray-200 rounded-xl w-full" />
        <div className="h-28 bg-gray-200 rounded-xl w-full" />
        <div className="h-12 bg-gray-200 rounded-xl w-3/4 mx-auto" />
      </div>
    </div>
  ),
});

export default function BioGeneratorSection() {
  return (
    <section
      id="bio-generator"
      aria-labelledby="bio-generator-heading"
      className="relative w-full min-w-0 overflow-x-hidden bg-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <h2
          id="bio-generator-heading"
          className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#FA7E1E] to-[#D62976] bg-clip-text text-transparent"
        >
          Instagram Bio Generator
        </h2>
        <div className="max-w-[900px] mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
          <BioGenerator />
        </div>
      </div>
    </section>
  );
}
