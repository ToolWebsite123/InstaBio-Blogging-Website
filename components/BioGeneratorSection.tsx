import BioGenerator from "@/components/BioGenerator";

export default function BioGeneratorSection() {
  return (
    <section
      id="bio-generator"
      aria-labelledby="bio-generator-heading"
      className="relative w-full min-w-0 overflow-x-hidden border-t border-white/20 py-10 md:py-14 px-4 sm:px-6 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fff5f8] via-[#faf8ff] to-[#f8f9fa]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-56 w-[min(100%,48rem)] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,#962FBF_0%,#D62976_50%,#FA7E1E_100%)] opacity-[0.09] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-[10%] h-40 w-40 rounded-full bg-[#4F5BD5] opacity-[0.05] blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <h2
          id="bio-generator-heading"
          className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-[#FA7E1E] to-[#D62976] bg-clip-text text-transparent"
        >
          Instagram Bio Generator
        </h2>
        <div className="max-w-5xl mx-auto">
          <BioGenerator />
        </div>
      </div>
    </section>
  );
}
