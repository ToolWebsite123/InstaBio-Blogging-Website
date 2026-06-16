import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import BioGeneratorSection from "@/components/BioGeneratorSection";

const siteUrl = "https://instabio.online";

export const metadata: Metadata = {
  title: "Instabio.online | Best Instagram Bio Ideas, Captions & Quotes",
  description:
    "Discover thousands of stylish, trendy & creative Instagram bios for boys, girls, lovers & professionals. Find the perfect bio that matches your vibe — only at Instabio.online",
  alternates: {
    canonical: "/",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Instabio.online",
    url: `${siteUrl}/`,
    description:
      "Best Instagram bio ideas, captions, and stylish names for boys, girls, and professionals.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/blog/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Instabio.online",
    url: `${siteUrl}/`,
    logo: `${siteUrl}/icon.svg`,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Instabio.online | Best Instagram Bio Ideas, Captions & Quotes",
    url: `${siteUrl}/`,
    isPartOf: { "@type": "WebSite", url: `${siteUrl}/` },
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans w-full min-w-0 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <BioGeneratorSection />
    </div>
  );
}
