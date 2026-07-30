import Link from "next/link";
import StoryCardImage from "@/components/StoryCardImage";
import { ALL_STORIES } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Instabiogen.online",
  description: "Browse our latest collection of Instagram bios, captions and quotes.",
  alternates: {
    canonical: "https://instabiogen.online/blog",
  },
  openGraph: {
    title: "Blog - Instabiogen.online",
    description: "Browse our latest collection of Instagram bios, captions and quotes.",
    url: "https://instabiogen.online/blog",
    siteName: "Instabiogen.online",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://instabiogen.online/og-default.jpg", width: 1200, height: 630, alt: "Instabiogen.online Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Instabiogen.online",
    description: "Browse our latest collection of Instagram bios, captions and quotes.",
    images: ["https://instabiogen.online/og-default.jpg"],
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="page-section py-12 md:py-20 lg:py-24">
        <header className="mb-12 md:mb-16 lg:mb-20 space-y-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight text-balance">
            Our <span className="bg-clip-text text-transparent bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)]">Blog</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto px-2">
            Discover the best Instagram bios, tips, and trends to master your social media presence.
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {ALL_STORIES.map((story) => (
            <Link href={`/${story.slug}`} key={story.id} className="block group min-w-0 w-full">
              <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full cursor-pointer min-w-0">
                <StoryCardImage src={story.image} alt={story.title} />
                <div className="p-4 sm:p-6 flex flex-col flex-1 min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider bg-clip-text text-transparent bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] mb-3">
                    {story.tag}
                  </span>
                  <h3 className="text-xl font-medium mb-4 leading-snug text-gray-900 group-hover:text-[#D62976] transition-colors line-clamp-3">
                    {story.title}
                  </h3>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}