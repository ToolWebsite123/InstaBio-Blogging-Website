import BioGenerator from "@/components/BioGenerator";

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
