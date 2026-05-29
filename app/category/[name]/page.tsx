import { ALL_STORIES } from "@/lib/constants";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const tags = [...new Set(ALL_STORIES.map((story) =>
    story.tag.toLowerCase().replace(/\s+/g, "-")
  ))];
  return tags.map((name) => ({ name }));
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const formatted = name.replace(/-/g, " ").toUpperCase();
  return {
    title: `${formatted} — Instagram Bios`,
    description: `Browse the best ${formatted} Instagram bios.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;

  const stories = ALL_STORIES.filter(
    (story) => story.tag.toLowerCase().replace(/\s+/g, "-") === name
  );

  if (stories.length === 0) notFound();

  const formatted = name.replace(/-/g, " ").toUpperCase();

  return (
    <main className="min-h-screen bg-white">
      <header className="w-full bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] pt-10 pb-10 md:pt-16 md:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white text-balance">{formatted}</h1>
        </div>
      </header>

      <section className="page-section py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Link href={`/blog/${story.slug}`} key={story.id} className="block group min-w-0 w-full">
              <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full min-w-0">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-1 min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider bg-clip-text text-transparent bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] mb-3">
                    {story.tag}
                  </span>
                  <h3 className="text-xl font-medium leading-snug text-gray-900 group-hover:text-[#D62976] transition-colors line-clamp-3">
                    {story.title}
                  </h3>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}