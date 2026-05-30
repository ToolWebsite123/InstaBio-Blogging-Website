"use client";

import Link from "next/link";
import StoryCardImage, { STORY_CARD_SIZES_FEATURED } from "@/components/StoryCardImage";
import { useState, useEffect } from "react";
import { ALL_STORIES } from "@/lib/constants";

export default function FeaturedStories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % ALL_STORIES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Get two stories starting from currentIndex
  const displayStories = [
    ALL_STORIES[currentIndex],
    ALL_STORIES[(currentIndex + 1) % ALL_STORIES.length],
  ];

  return (
    <section className="page-section py-12 md:py-20">
      <div className="mb-8 md:mb-10 flex items-center">
        <div className="w-1 h-6 bg-[linear-gradient(to_bottom,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] mr-3 rounded-full"></div>
        <h2 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-widest">
          Featured Stories
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {displayStories.map((story) => (
          <Link
            href={`/${story.slug}`}
            key={story.id}
            className="block group transition-all duration-500 min-w-0 w-full"
          >
            <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full cursor-pointer min-w-0">
              <StoryCardImage
                src={story.image}
                alt={story.title}
                sizes={STORY_CARD_SIZES_FEATURED}
                priority
              />
              <div className="p-4 sm:p-5 md:p-8 flex flex-col flex-1 min-w-0">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider bg-clip-text text-transparent bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] mb-2 md:mb-4">
                  {story.tag}
                </span>
                <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 leading-tight text-gray-900 group-hover:text-[#D62976] transition-colors line-clamp-3">
                  {story.title}
                </h3>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
