import Link from "next/link";
import { ALL_STORIES } from "@/lib/constants";

interface RelatedPostsProps {
  currentSlug: string;
}

export default function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  const current = ALL_STORIES.find((story) => story.slug === currentSlug);
  const sameTag = ALL_STORIES.filter(
    (story) => story.slug !== currentSlug && story.tag === current?.tag
  );
  const others = ALL_STORIES.filter(
    (story) => story.slug !== currentSlug && story.tag !== current?.tag
  );
  const related = [...sameTag, ...others].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Related Bios</h2>
      <ul className="space-y-3">
        {related.map((story) => (
          <li key={story.slug}>
            <Link
              href={`/${story.slug}/`}
              className="text-[#D62976] hover:underline font-medium"
            >
              {story.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
