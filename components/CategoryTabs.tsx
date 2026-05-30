import Link from "next/link";

const categories = [
  { name: "Boys Bio", href: "/best-instagram-bio-for-boys" },
  { name: "Girls Bio", href: "/best-instagram-bio-for-girls" },
  { name: "Love Bio", href: "/best-love-bio-for-instagram" },
  { name: "Attitude Bio", href: "/best-instagram-bio-for-boys" },
  { name: "VIP Bio", href: "/best-instagram-bio-for-boys" },
  { name: "Gaming Bio", href: "/best-free-fire-bio-for-instagram" },
];

export default function CategoryTabs() {
  return (
    <div id="categories" className="border-b border-border bg-background sticky top-16 z-40">
      <div className="container-wide py-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-8 whitespace-nowrap">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-r border-border pr-6">
            Categories
          </span>
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              href={cat.href}
              className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
