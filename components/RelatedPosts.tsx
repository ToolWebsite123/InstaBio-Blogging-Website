import Link from "next/link";
import { getRelatedPosts } from "@/lib/relatedTopics";

interface RelatedPostsProps {
  currentSlug: string;
}

export default function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  const related = getRelatedPosts(currentSlug, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Related Bios & Guides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((story) => (
          <Link
            key={story.slug}
            href={`/${story.slug}`}
            className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 hover:border-gray-200 transition-all group block"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#962FBF] block mb-1">
              {story.tag}
            </span>
            <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#D62976] transition-colors line-clamp-2">
              {story.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
