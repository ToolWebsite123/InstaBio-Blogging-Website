import Hero from "@/components/Hero";
import FeaturedStories from "@/components/FeaturedStories";
import LatestStories from "@/components/LatestStories";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] font-sans">
      <Hero />
      <FeaturedStories />
      <LatestStories />
    </main>
  );
}
