import { Star } from "lucide-react";

const categories = [
  { title: "Boys Bio", icon: Star, gradient: "from-blue-500 to-cyan-500" },
  { title: "Girls Bio", icon: Star, gradient: "from-pink-500 to-rose-500" },
  { title: "Love Bio", icon: Star, gradient: "from-red-500 to-orange-500" },
  { title: "Attitude Bio", icon: Star, gradient: "from-purple-500 to-indigo-500" },
  { title: "VIP Bio", icon: Star, gradient: "from-yellow-500 to-amber-500" },
  { title: "Gaming Bio", icon: Star, gradient: "from-green-500 to-emerald-500" },
  { title: "Music Lover", icon: Star, gradient: "from-violet-500 to-purple-500" },
  { title: "Funny Bio", icon: Star, gradient: "from-orange-500 to-yellow-500" },
];

export default function CategoriesGrid() {
  return (
    <section id="categories" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-foreground">Explore Categories</h2>
          <p className="text-muted-foreground">Browse our vast collection of handpicked bios and status.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90 transition-transform duration-500 group-hover:scale-110`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 z-10">
                <cat.icon className="w-12 h-12 mb-4 drop-shadow-lg" />
                <h3 className="text-xl font-bold text-center drop-shadow-md">{cat.title}</h3>
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
