import Link from "next/link";

const categories = [
  { name: "All", slug: "all" },
  { name: "Instagram Bios", slug: "instagram-bios" },
  { name: "Captions", slug: "captions" },
  { name: "Attitude Status", slug: "attitude-status" },
  { name: "Urdu Quotes", slug: "urdu-quotes" },
  { name: "Growth Tips", slug: "growth-tips" },
];

export default function CategoryBar({ activeCategory = "all" }: { activeCategory?: string }) {
  return (
    <div className="w-full overflow-x-auto pb-4 no-scrollbar">
      <div className="flex gap-3 min-w-max">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={category.slug === "all" ? "/blog" : `/category/${category.slug}`}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category.slug
                ? "bg-primary-600 text-white shadow-md shadow-primary-600/20"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

