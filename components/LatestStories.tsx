"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ALL_STORIES } from "@/lib/constants";

export default function LatestStories() {
  const [visiblePosts, setVisiblePosts] = useState(6);

  const loadMore = () => {
    setVisiblePosts((prev) => prev + 6);
  };

  const currentStories = ALL_STORIES.slice(0, visiblePosts);
  const hasMore = visiblePosts < ALL_STORIES.length;

  return (
    <section className="page-section pb-16 md:pb-20">
      <div className="mb-8 md:mb-10 flex items-center">
        <div className="w-1 h-6 bg-[linear-gradient(to_bottom,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] mr-3 rounded-full"></div>
        <h2 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-widest md:tracking-wide">
          Latest Stories
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {currentStories.map((story) => (
          <Link href={`/blog/${story.slug}`} key={story.id} className="block group min-w-0 w-full">
            <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full cursor-pointer min-w-0">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-gray-100">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
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

      {hasMore && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="relative group inline-block p-[2px] rounded-full bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span className="block px-8 py-3 rounded-full bg-white transition-colors group-hover:bg-transparent">
              <span className="font-semibold bg-clip-text text-transparent bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] group-hover:text-white transition-colors">
                Load More Posts
              </span>
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
