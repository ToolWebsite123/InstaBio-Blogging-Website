import HeroHeading from "@/components/Hero";

export default function HeroSection() {
  return (
    <section className="w-full min-w-0 overflow-x-hidden bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-14 md:pb-16 lg:pb-20 text-center px-4 sm:px-6">
      <HeroHeading />
    </section>
  );
}
