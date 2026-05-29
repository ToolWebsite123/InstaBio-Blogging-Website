import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { PostMeta } from "@/lib/mdx";

export default function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col md:flex-row border border-border rounded-lg overflow-hidden bg-card hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
      <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:min-h-[320px] overflow-hidden border-b md:border-b-0 md:border-r border-border shrink-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      
      <div className="flex flex-col flex-1 p-6 md:p-8 lg:p-10 justify-center">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            {post.category}
          </span>
        </div>
        
        <h2 className="font-bold text-2xl md:text-3xl text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-4 leading-tight">
          {post.title}
        </h2>
        
        <p className="text-muted-foreground text-base md:text-lg line-clamp-3 leading-relaxed mb-6">
          {post.excerpt}
        </p>
        
        <div className="mt-auto flex items-center text-sm text-muted-foreground gap-3">
          <span className="font-medium text-foreground">Editorial Team</span>
          <span>&middot;</span>
          <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
          <span>&middot;</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

