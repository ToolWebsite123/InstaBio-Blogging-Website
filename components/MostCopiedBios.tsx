"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const topBios = [
  { text: "In a world where you can be anything, be kind. ✨", copied: "12K times" },
  { text: "My life is a beautiful mess. 🎨", copied: "10K times" },
  { text: "Success is not for the lazy. 🏆", copied: "9K times" },
  { text: "Stay humble, work hard, be kind. 🌟", copied: "8.5K times" },
  { text: "Dream big, pray more, work hard. 🙏", copied: "7.2K times" },
];

export default function MostCopiedBios() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="py-24 bg-accent/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-4">
            <Star className="w-4 h-4" />
            <span>Popular Choice</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground">Most Copied Bios</h2>
        </div>

        <div className="space-y-4">
          {topBios.map((bio, index) => (
            <div 
              key={index} 
              className="group flex items-center justify-between p-5 bg-card border border-border rounded-2xl hover:shadow-lg transition-all"
            >
              <div className="flex flex-col gap-1">
                <p className="text-lg text-foreground font-medium">{bio.text}</p>
                <span className="text-xs text-muted-foreground flex items-center gap-1 font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Trending: Copied {bio.copied}
                </span>
              </div>
              <button 
                onClick={() => copyToClipboard(bio.text, index)}
                className={`p-3 rounded-xl transition-all ${
                  copiedIndex === index 
                    ? "bg-green-500/10 text-green-500" 
                    : "bg-primary/5 text-primary group-hover:bg-primary/10"
                }`}
              >
                <Star className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
