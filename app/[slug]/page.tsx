import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import MdxPostImage from "@/components/MdxPostImage";
import BioCard from "@/components/BioCard";
import BioGrid from "@/components/BioGrid";
import BioBanner from "@/components/BioBanner";
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
  try {
    const resolvedParams = await params;
    const post = getPostBySlug(resolvedParams.slug);
    const seoTitle = post.seoTitle || post.title;
    const seoDescription = post.seoDescription || post.excerpt;

    return {
      title: seoTitle,
      description: seoDescription,
      alternates: {
        canonical: `/${resolvedParams.slug}`,
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
  let post;
  try {
    const resolvedParams = await params;
    post = getPostBySlug(resolvedParams.slug);
  } catch (error) {
    console.error("Error loading post:", error);
    notFound();
  }

  const components = {
    h2: ({ children, ...props }: any) => {
      const text = Array.isArray(children) ? children.join('') : children;
      const slug = text?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      return (
        <div className="mt-8 sm:mt-12 mb-6 sm:mb-8 first:mt-0">
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <div className="w-1.5 h-7 sm:h-8 shrink-0 mt-1.5 bg-[linear-gradient(to_bottom,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] rounded-full"></div>
            <h2 id={slug} className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words min-w-0" {...props}>{children}</h2>
          </div>
        </div>
      );
    },
    h3: ({ children, ...props }: any) => {
      const text = Array.isArray(children) ? children.join('') : children;
      const slug = text?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      return <h3 id={slug} className="text-lg sm:text-xl font-semibold mt-8 sm:mt-10 mb-3 sm:mb-4 text-gray-800 break-words" {...props}>{children}</h3>;
    },
    p: ({ children, ...props }: any) => (
      <p className="text-sm sm:text-[15px] leading-relaxed text-gray-600 mb-5" {...props}>{children}</p>
    ),
    blockquote: ({ children, ...props }: any) => (
      <div className="bg-[#F3E8FF] rounded-r-xl border-l-4 border-transparent [border-image:linear-gradient(to_bottom,#4F5BD5,#D62976,#FEDA77)_1] p-4 sm:p-6 my-6 sm:my-8 overflow-hidden">
        <span className="block text-xs font-bold uppercase tracking-widest text-[#962FBF] mb-2">Pro Tip</span>
        <div className="text-[#962FBF] font-medium text-sm sm:text-[15px] italic" {...props}>{children}</div>
      </div>
    ),
    strong: ({ children, ...props }: any) => (
      <strong className="font-bold text-gray-900" {...props}>{children}</strong>
    ),
    BioCard: (props: any) => <BioCard {...props} />,
    BioGrid: (props: any) => <BioGrid {...props} />,
    BioBanner: (props: any) => <BioBanner {...props} />,
    TOC: (props: any) => <TOC {...props} />,
    img: ({ src, alt }: { src: string; alt?: string }) => (
      <MdxPostImage src={src} alt={alt} />
    ),
  };

  const relatedPosts = getAllPosts().filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="min-h-screen bg-white w-full min-w-0 overflow-x-hidden">

      {/* Header Section */}
      <header className="w-full bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-16 md:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white mb-4 md:mb-8 text-balance">
            {post.title}
          </h1>

        </div>
      </header>

      {/* Content Section */}
      <main className="w-full min-w-0 max-w-[800px] mx-auto px-4 sm:px-6 py-10 md:py-16 overflow-x-hidden">
        <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none min-w-0 prose-bio prose-bio-content
          prose-ul:list-none prose-ul:pl-0 
          prose-a:text-[#D62976] prose-a:no-underline hover:prose-a:underline">
          <MDXRemote source={post.content} components={components} />
        </div>

      </main>



    </article>
  );
}
