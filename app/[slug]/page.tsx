import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import MdxPostImage from "@/components/MdxPostImage";
import BioCard from "@/components/BioCard";
import BioGrid from "@/components/BioGrid";
import BioBanner from "@/components/BioBanner";
import TOC from "@/components/TOC";
import RelatedPosts from "@/components/RelatedPosts";

const siteUrl = "https://instabiogen.online";
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post;
  try {
    post = getPostBySlug(resolvedParams.slug);
  } catch {
    notFound();
  }

  const seoTitle = post.seoTitle || post.title;
  const seoDescription = post.seoDescription || post.excerpt;
  const pageUrl = `${siteUrl}/${resolvedParams.slug}/`;
  const imageUrl = post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: pageUrl,
      siteName: "Instabiogen.online",
      locale: "en_US",
      type: "article",
      images: [{ url: imageUrl }],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  let post;
  try {
    const resolvedParams = await params;
    post = getPostBySlug(resolvedParams.slug);
  } catch {
    notFound();
  }

  const pageUrl = `${siteUrl}/${post.slug}/`;
  const imageUrl = post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Instabiogen.online",
      url: `${siteUrl}/`,
    },
    publisher: {
      "@type": "Organization",
      name: "Instabiogen.online",
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.svg`,
      },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.seoTitle || post.title,
        item: pageUrl,
      },
    ],
  };

  const jsonLd = [articleLd, breadcrumbLd];

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

  return (
    <article className="min-h-screen bg-white w-full min-w-0 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
          <RelatedPosts currentSlug={post.slug} />
        </div>

      </main>



    </article>
  );
}
