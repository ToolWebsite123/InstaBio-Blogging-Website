import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/mdx";

export default function FeaturedPosts({ posts }: { posts: Post[] }) {
  return (
    <section className="py-16 bg-background">
      <div className="container-wide">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8 border-b border-border pb-4">
          Featured Stories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.slice(0, 2).map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group space-y-6"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted shrink-0">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">
                  {post.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight group-hover:underline decoration-accent/30 decoration-2 underline-offset-4">
                  {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 pt-2 text-xs font-medium text-muted-foreground">
                  <span>{post.date}</span>
                  <span>&bull;</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
