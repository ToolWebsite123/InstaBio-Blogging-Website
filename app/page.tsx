import HeroSection from "@/components/HeroSection";
import BioGeneratorSection from "@/components/BioGeneratorSection";
import FeaturedStories from "@/components/FeaturedStories";
import LatestStories from "@/components/LatestStories";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans w-full min-w-0 overflow-x-hidden">
      <HeroSection />
      <BioGeneratorSection />
      <FeaturedStories />
      <LatestStories />
    </div>
  );
}
