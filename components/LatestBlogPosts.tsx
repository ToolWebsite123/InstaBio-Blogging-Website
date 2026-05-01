import { Star } from "lucide-react";
import BlogCard from "./BlogCard";
import type { PostMeta } from "@/lib/mdx";

export default function LatestBlogPosts({ posts }: { posts: PostMeta[] }) {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-foreground">Latest from Blog</h2>
            <p className="text-muted-foreground">Tips and tricks to boost your social media presence.</p>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            Read All Posts <Star className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
