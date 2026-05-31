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

  const displayStories = [
    ALL_STORIES[currentIndex],
    ALL_STORIES[(currentIndex + 1) % ALL_STORIES.length],
  ];

  return (
    <section className="page-section py-10 md:py-14">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 md:mb-8 flex items-center">
          <div className="w-1 h-6 bg-[linear-gradient(to_bottom,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] mr-3 rounded-full"></div>
          <h2 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-widest">
            Featured Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-start">
          {displayStories.map((story) => (
            <Link
              href={`/${story.slug}`}
              key={story.id}
              className="block group transition-all duration-500 min-w-0 w-full"
            >
              <article className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col cursor-pointer min-w-0">
                <StoryCardImage
                  src={story.image}
                  alt={story.title}
                  sizes={STORY_CARD_SIZES_FEATURED}
                  priority
                />
                <div className="p-4 sm:p-5 flex flex-col min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-clip-text text-transparent bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] mb-2">
                    {story.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold leading-snug text-gray-900 group-hover:text-[#D62976] transition-colors line-clamp-3 min-h-[4.5rem] sm:min-h-[5rem]">
                    {story.title}
                  </h3>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
