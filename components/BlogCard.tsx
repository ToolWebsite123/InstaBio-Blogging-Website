import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { PostMeta } from "@/lib/mdx";

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full border border-border rounded-lg overflow-hidden bg-card hover:shadow-md transition-all duration-300">
      <div className="relative aspect-video w-full overflow-hidden border-b border-border">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-3">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase border border-border text-foreground">
            {post.category}
          </span>
        </div>
        
        <h3 className="font-bold text-lg text-foreground group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA] transition-colors mb-2 line-clamp-2 leading-snug">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed mb-4">
          {post.excerpt}
        </p>
        
        <div className="mt-auto pt-4 flex items-center text-xs text-muted-foreground gap-3">
          <span className="font-medium text-foreground">Admin</span>
          <span>&middot;</span>
          <time dateTime={post.date}>{format(new Date(post.date), "MMM d, yyyy")}</time>
          <span>&middot;</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
