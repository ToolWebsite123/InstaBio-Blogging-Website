import BioGenerator from "@/components/BioGenerator";

export default function BioGeneratorSection() {
  return (
    <section
      id="bio-generator"
      aria-labelledby="bio-generator-heading"
      className="w-full min-w-0 overflow-x-hidden bg-[#f8f9fa] border-t border-gray-200/60 py-10 md:py-14 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-7xl mx-auto">
        <h2
          id="bio-generator-heading"
          className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10 bg-gradient-to-r from-[#FA7E1E] to-[#D62976] bg-clip-text text-transparent"
        >
          Instagram Bio Generator
        </h2>
        <BioGenerator />
      </div>
    </section>
  );
}
