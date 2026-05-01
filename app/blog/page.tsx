import Image from "next/image";
import Link from "next/link";
import { ALL_STORIES } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Instabio.online",
  description: "Browse our latest collection of Instagram bios, captions and quotes. From attitude to aesthetic, funny to romantic — new content added daily. Read, copy and make your profile stand out!",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const searchQuery = typeof resolvedParams.search === 'string' ? resolvedParams.search.toLowerCase() : '';

  const filteredStories = ALL_STORIES.filter(story => {
    if (!searchQuery) return true;
    return (
      story.title.toLowerCase().includes(searchQuery) ||
      story.tag.toLowerCase().includes(searchQuery)
    );
  });

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        <header className="mb-20 space-y-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            {searchQuery ? (
              <>Search <span className="bg-clip-text text-transparent bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)]">Results</span></>
            ) : (
              <>Our <span className="bg-clip-text text-transparent bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)]">Blog</span></>
            )}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            {searchQuery
              ? `Showing results for "${searchQuery}"`
              : "Discover the best Instagram bios, tips, and trends to master your social media presence."
            }
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {filteredStories.length > 0 ? (
            filteredStories.map((story) => (
              <Link href={`/blog/${story.slug}`} key={story.id} className="block group">
                <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full cursor-pointer">
                  <div className="h-48 w-full relative overflow-hidden">
                    <Image src={story.image} alt={story.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider bg-clip-text text-transparent bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] mb-3">
                      {story.tag}
                    </span>
                    <h3 className="text-xl font-medium mb-4 leading-snug text-gray-900 group-hover:text-[#D62976] transition-colors">
                      {story.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No results found for "{searchQuery}". Try searching for something else.</p>
              <Link href="/blog" className="inline-block mt-4 text-[#D62976] hover:underline font-medium">
                View all posts
              </Link>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}