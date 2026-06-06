import Link from "next/link";
import HTMLBannerImage from "@/components/HTMLBannerImage";
import type { Post } from "@/lib/mdx";

export default function LatestGrid({ posts }: { posts: Post[] }) {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main List */}
          <div className="flex-1 space-y-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground border-b border-border pb-4">
              Latest Stories
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {posts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/${post.slug}`}
                  className="group block blog-card"
                >
                  <div className="space-y-5">
                    <div className="relative aspect-[3/2] overflow-hidden rounded bg-muted shrink-0">
                      <HTMLBannerImage 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-accent uppercase tracking-[0.1em]">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-bold text-foreground leading-snug group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="pt-8 text-center">
              <button className="px-10 py-3 rounded-full border border-border text-sm font-semibold hover:bg-muted transition-all">
                Load More Posts
              </button>
            </div>
          </div>

          {/* Sidebar - Trending / Tools */}
          <aside className="lg:w-80 space-y-16">
            {/* Trending */}
            <div className="space-y-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-border pb-4">
                Popular on Instabio.online
              </h2>
              <div className="space-y-6">
                {posts.slice(0, 4).map((post, i) => (
                  <Link 
                    key={post.slug} 
                    href={`/${post.slug}`}
                    className="flex gap-4 group"
                  >
                    <span className="text-2xl font-bold text-muted/30 font-['Playfair_Display',serif]">
                      0{i + 1}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                        {post.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Simple Tools Links */}
            <div className="p-6 rounded-lg bg-muted/50 border border-border space-y-4">
              <h3 className="text-sm font-bold text-foreground">Creative Tools</h3>
              <p className="text-xs text-muted-foreground">Try our simple generators for instant results.</p>
              <div className="space-y-2">
                <Link href="/tools/bio-generator" className="block text-sm font-medium text-accent hover:underline">
                  AI Bio Generator &rarr;
                </Link>
                <Link href="/tools/stylish-text" className="block text-sm font-medium text-accent hover:underline">
                  Stylish Text Tool &rarr;
                </Link>
                <Link href="/tools/caption-maker" className="block text-sm font-medium text-accent hover:underline">
                  Caption Maker &rarr;
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
