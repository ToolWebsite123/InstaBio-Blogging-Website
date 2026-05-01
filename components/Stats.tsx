import { Star } from "lucide-react";

const stats = [
  { label: "Bios Generated", value: "100K+", icon: Star, color: "text-blue-500" },
  { label: "Active Users", value: "50K+", icon: Star, color: "text-purple-500" },
  { label: "Daily Visitors", value: "10K+", icon: Star, color: "text-green-500" },
];

export default function Stats() {
  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4 group">
              <div className={`p-4 rounded-2xl bg-muted/50 group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-4xl font-extrabold text-foreground">{stat.value}</h3>
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
