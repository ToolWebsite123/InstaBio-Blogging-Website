import { Star } from "lucide-react";

const tools = [
  {
    title: "Stylish Text",
    description: "Convert normal text to 100+ fancy fonts",
    icon: Star,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Bio Generator",
    description: "AI-powered aesthetic bios for Insta",
    icon: Star,
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    title: "Caption Maker",
    description: "Viral captions for posts & reels",
    icon: Star,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Gaming Bios",
    description: "Cool bios for BGMI, Free Fire & more",
    icon: Star,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Love Status",
    description: "Romantic bios and status updates",
    icon: Star,
    color: "bg-red-500/10 text-red-500",
  },
  {
    title: "VIP Bios",
    description: "Professional & high-class bio styles",
    icon: Star,
    color: "bg-yellow-500/10 text-yellow-500",
  },
];

export default function QuickTools() {
  return (
    <section id="tools" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Quick Tools</h2>
          <p className="text-muted-foreground">Everything you need to level up your social game.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div 
              key={index} 
              className="card-premium group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${tool.color}`}>
                <tool.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {tool.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
