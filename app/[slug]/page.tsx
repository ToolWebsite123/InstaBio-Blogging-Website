import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps, ReactNode } from "react";
import MdxPostImage from "@/components/MdxPostImage";
import BioCard from "@/components/BioCard";
import BioGrid from "@/components/BioGrid";
import BioBanner from "@/components/BioBanner";
import TOC from "@/components/TOC";
import RelatedPosts from "@/components/RelatedPosts";

const siteUrl = "https://instabiogen.online";

function getHeadingText(children: ReactNode) {
  return Array.isArray(children) ? children.join("") : children?.toString() ?? "";
}

function getHeadingSlug(children: ReactNode) {
  return getHeadingText(children)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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
  const pageUrl = `${siteUrl}/${resolvedParams.slug}`;
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
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [imageUrl],
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

  const pageUrl = `${siteUrl}/${post.slug}`;
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
    dateModified: post.updatedDate || post.date,
    author: {
      "@type": "Person",
      name: "InstaBioGen Editorial Team",
      url: `${siteUrl}/about`,
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

  const jsonLd: Array<Record<string, unknown>> = [articleLd, breadcrumbLd];

  if (post.faqs && post.faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    });
  }

  if (post.howTo && post.howTo.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to Choose & Style ${post.title}`,
      description: post.excerpt,
      step: post.howTo.map((step, idx) => ({
        "@type": "HowToStep",
        position: idx + 1,
        name: step.name,
        text: step.text,
      })),
    });
  }

  const components = {
    h2: ({ children, ...props }: ComponentProps<"h2">) => {
      const slug = getHeadingSlug(children);
      return (
        <div className="mt-8 sm:mt-12 mb-6 sm:mb-8 first:mt-0">
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <div className="w-1.5 h-7 sm:h-8 shrink-0 mt-1.5 bg-[linear-gradient(to_bottom,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] rounded-full"></div>
            <h2 id={slug} className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words min-w-0" {...props}>{children}</h2>
          </div>
        </div>
      );
    },
    h3: ({ children, ...props }: ComponentProps<"h3">) => {
      const slug = getHeadingSlug(children);
      return <h3 id={slug} className="text-lg sm:text-xl font-semibold mt-8 sm:mt-10 mb-3 sm:mb-4 text-gray-800 break-words" {...props}>{children}</h3>;
    },
    p: ({ children, ...props }: ComponentProps<"p">) => (
      <p className="text-sm sm:text-[15px] leading-relaxed text-gray-600 mb-5" {...props}>{children}</p>
    ),
    blockquote: ({ children, ...props }: ComponentProps<"div">) => (
      <div className="bg-[#F3E8FF] rounded-r-xl border-l-4 border-transparent [border-image:linear-gradient(to_bottom,#4F5BD5,#D62976,#FEDA77)_1] p-4 sm:p-6 my-6 sm:my-8 overflow-hidden">
        <span className="block text-xs font-bold uppercase tracking-widest text-[#962FBF] mb-2">Pro Tip</span>
        <div className="text-[#962FBF] font-medium text-sm sm:text-[15px] italic" {...props}>{children}</div>
      </div>
    ),
    strong: ({ children, ...props }: ComponentProps<"strong">) => (
      <strong className="font-bold text-gray-900" {...props}>{children}</strong>
    ),
    BioCard: (props: ComponentProps<typeof BioCard>) => <BioCard {...props} />,
    BioGrid: (props: ComponentProps<typeof BioGrid>) => <BioGrid {...props} />,
    BioBanner: (props: ComponentProps<typeof BioBanner>) => <BioBanner {...props} />,
    TOC: () => <TOC />,
    img: ({ src, alt }: { src: string; alt?: string }) => (
      <MdxPostImage src={src} alt={alt ?? ""} />
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
          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-12 pt-8 border-t border-gray-100 not-prose">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-7 shrink-0 bg-[linear-gradient(to_bottom,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] rounded-full" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-4">
                {post.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group bg-gray-50 rounded-xl border border-gray-100 p-5 [&_summary::-webkit-details-marker]:none"
                  >
                    <summary className="flex items-center justify-between font-semibold text-gray-900 cursor-pointer list-none">
                      <span>{faq.question}</span>
                      <span className="transition group-open:rotate-180 text-gray-500">
                        <svg
                          fill="none"
                          height="24"
                          shapeRendering="geometricPrecision"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
          <RelatedPosts currentSlug={post.slug} />
        </div>

      </main>



    </article>
  );
}
