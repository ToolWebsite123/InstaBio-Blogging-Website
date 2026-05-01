import { Star } from "lucide-react";

const trendingItems = [
  {
    category: "Attitude Bio",
    bios: [
      "I don't have an attitude, I have a personality you can't handle. 🔥",
      "Stay focused. Your soul has a purpose. ✨",
    ]
  },
  {
    category: "Aesthetic Bio",
    bios: [
      "Sunshine mixed with a little hurricane. 🌪️",
      "Living life in warm yellows. 🌼",
    ]
  },
  {
    category: "Gaming Bio",
    bios: [
      "Level up. Game on. 🎮",
      "Eat. Sleep. Game. Repeat. 🏆",
    ]
  }
];

export default function Trending() {
  return (
    <section className="py-24 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
              <Star className="w-4 h-4 fill-primary" />
              <span>Hot Picks</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground">Trending Right Now</h2>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            View All Trends <Star className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingItems.map((item, index) => (
            <div key={index} className="card-premium flex flex-col h-full bg-card/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
              <div className="space-y-4 flex-1">
                {item.bios.map((bio, i) => (
                  <div key={i} className="group relative p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-all">
                    <p className="text-sm text-foreground leading-relaxed pr-8">{bio}</p>
                    <button className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-8 w-full py-3 rounded-xl border border-primary/20 text-primary font-semibold hover:bg-primary/5 transition-colors text-sm">
                Explore More {item.category}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
