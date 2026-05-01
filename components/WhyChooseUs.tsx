import { Star } from "lucide-react";

const features = [
  {
    title: "Fast & Free",
    description: "Generate stylish text and bios in milliseconds without spending a dime.",
    icon: Star,
    color: "bg-yellow-500/10 text-yellow-500"
  },
  {
    title: "Stylish Output",
    description: "Our algorithms ensure every output is aesthetic and trend-ready.",
    icon: Star,
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    title: "Mobile Friendly",
    description: "Designed to work perfectly on any device, from desktop to mobile.",
    icon: Star,
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    title: "Daily Updates",
    description: "We update our library daily with the latest viral trends and bios.",
    icon: Star,
    color: "bg-green-500/10 text-green-500"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Why Creators Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Instabio.online is built for the modern social media era, focusing on speed, style, and ease of use.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-3xl border border-border bg-card/50 hover:bg-card transition-all hover:shadow-xl group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12 ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
