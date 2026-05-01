import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import BioCard from "@/components/BioCard";
import BioGrid from "@/components/BioGrid";
import TOC from "@/components/TOC";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    const seoTitle = post.seoTitle || post.title;
    const seoDescription = post.seoDescription || post.excerpt;

    return {
      title: seoTitle,
      description: seoDescription,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [{ url: post.image }],
      },
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch (error) {
    console.error("Error loading post:", slug, error);
    notFound();
  }

  const components = {
    h2: ({ children, ...props }: any) => {
      const text = Array.isArray(children) ? children.join('') : children;
      const slug = text?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      return (
        <div className="mt-12 mb-8 first:mt-0">
          <div className="flex items-center">
            <div className="w-1.5 h-8 bg-[linear-gradient(to_bottom,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] mr-4 rounded-full"></div>
            <h2 id={slug} className="text-2xl md:text-3xl font-bold text-gray-900" {...props}>{children}</h2>
          </div>
        </div>
      );
    },
    h3: ({ children, ...props }: any) => {
      const text = Array.isArray(children) ? children.join('') : children;
      const slug = text?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      return <h3 id={slug} className="text-xl font-semibold mt-10 mb-4 text-gray-800" {...props}>{children}</h3>;
    },
    p: ({ children, ...props }: any) => (
      <p className="text-[15px] leading-relaxed text-gray-600 mb-5" {...props}>{children}</p>
    ),
    blockquote: ({ children, ...props }: any) => (
      <div className="bg-[#F3E8FF] rounded-r-xl border-l-4 border-transparent [border-image:linear-gradient(to_bottom,#4F5BD5,#D62976,#FEDA77)_1] p-6 my-8">
        <span className="block text-xs font-bold uppercase tracking-widest text-[#962FBF] mb-2">Pro Tip</span>
        <div className="text-[#962FBF] font-medium text-[15px] italic" {...props}>{children}</div>
      </div>
    ),
    strong: ({ children, ...props }: any) => (
      <strong className="font-bold text-gray-900" {...props}>{children}</strong>
    ),
    BioCard: (props: any) => <BioCard {...props} />,
    BioGrid: (props: any) => <BioGrid {...props} />,
    TOC: (props: any) => <TOC {...props} />
  };

  const relatedPosts = getAllPosts().filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="min-h-screen bg-white">
      <header className="w-full bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] pt-16 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white mb-8">
            {post.title}
          </h1>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none 
          prose-ul:list-none prose-ul:pl-0 
          prose-a:text-[#D62976] prose-a:no-underline hover:prose-a:underline">
          <MDXRemote source={post.content} components={components} />
        </div>
      </main>
    </article>
  );
}