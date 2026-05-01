import { Star } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/10 -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl -z-10" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-3 bg-primary/20 rounded-2xl animate-float">
            <Star className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
          Ready to Elevate Your <br /> 
          <span className="gradient-text">Social Media Presence?</span>
        </h2>
        
        <p className="text-xl text-muted-foreground max-w-xl mx-auto">
          Join 50K+ users who are creating stunning bios and captions with Instabio.online every day.
        </p>

        <div className="flex justify-center">
          <button className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
            Start Generating Now
            <Star className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
