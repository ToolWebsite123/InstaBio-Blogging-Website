import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import BioGeneratorSection from "@/components/BioGeneratorSection";
import HomeContent from "@/components/HomeContent";

const siteUrl = "https://instabiogen.online";

export const metadata: Metadata = {
  title: "Best Instagram Bio Generator Ideas, Captions & Quotes",
  description:
    "Discover thousands of stylish, trendy & creative Instagram bios for boys, girls, lovers & professionals. Find the perfect bio that matches your vibe — only at Instabiogen.online",
  alternates: {
    canonical: "https://instabiogen.online",
  },
  openGraph: {
    title: "Best Instagram Bio Generator Ideas, Captions & Quotes",
    description:
      "Discover thousands of stylish, trendy & creative Instagram bios for boys, girls, lovers & professionals. Find the perfect bio that matches your vibe — only at Instabiogen.online",
    url: siteUrl,
    siteName: "Instabiogen.online",
    locale: "en_US",
    type: "website",
    images: [{ url: `${siteUrl}/og-default.jpg`, width: 1200, height: 630, alt: "Instabiogen.online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Instagram Bio Generator Ideas, Captions & Quotes",
    description:
      "Discover thousands of stylish, trendy & creative Instagram bios for boys, girls, lovers & professionals. Find the perfect bio that matches your vibe — only at Instabiogen.online",
    images: [`${siteUrl}/og-default.jpg`],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Instabiogen.online",
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
    name: "Instabiogen.online",
    url: `${siteUrl}/`,
    logo: `${siteUrl}/icon.svg`,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Instabiogen.online | Best Instagram Bio Ideas, Captions & Quotes",
    url: `${siteUrl}/`,
    isPartOf: { "@type": "WebSite", url: `${siteUrl}/` },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Instabiogen Bio Generator",
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    description: "Generate stylish, trendy & creative Instagram bios with emojis, text styles, and live preview.",
    url: `${siteUrl}/`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  }
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
      <HomeContent />
    </div>
  );
}
