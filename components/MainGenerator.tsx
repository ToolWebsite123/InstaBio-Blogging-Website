"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const mockBios = {
  Attitude: [
    "Born to stand out. Not to fit in. 👑",
    "My life, my rules, my attitude. 🔥",
    "Don't like my attitude? Stop talking to me. ✌️",
  ],
  Love: [
    "Collecting moments, not things. ❤️",
    "You are my sunshine on a rainy day. ☀️",
    "Love is all you need. ✨",
  ],
  Sad: [
    "Hurting but still smiling. 🥀",
    "Rainy days and quiet thoughts. 🌧️",
    "Finding beauty in the broken. 🕯️",
  ],
  Funny: [
    "I'm not lazy, I'm just on energy-saving mode. 🔋",
    "Professional overthinker. 🤔",
    "Life is short. Smile while you still have teeth. 😁",
  ],
  VIP: [
    "Living the dream. ✨",
    "Work hard, stay humble. 🏆",
    "Success is my only option. 🚀",
  ]
};

export default function MainGenerator() {
  const [mood, setMood] = useState("Attitude");
  const [input, setInput] = useState("");
  const [results, setResults] = useState(mockBios["Attitude"]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = () => {
    const baseBios = mockBios[mood as keyof typeof mockBios] || mockBios.Attitude;
    const transformed = baseBios.map(bio => input ? `${input} | ${bio}` : bio);
    setResults(transformed);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="generator" className="py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Master Bio Generator</h2>
          <p className="text-muted-foreground">Pick a mood, enter your name, and get instant results.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-8 bg-card p-8 rounded-3xl border border-border shadow-xl">
            <div className="space-y-4">
              <label className="text-sm font-bold text-foreground uppercase tracking-wider">Mood / Style</label>
              <select 
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border focus:ring-2 focus:ring-primary/50 transition-all outline-none"
              >
                {Object.keys(mockBios).map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-foreground uppercase tracking-wider">Your Name / Keyword</label>
              <input 
                type="text" 
                placeholder="Optional: Enter your name..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border focus:ring-2 focus:ring-primary/50 transition-all outline-none"
              />
            </div>

            <button 
              onClick={handleGenerate}
              className="w-full btn-primary flex items-center justify-center gap-2 py-4"
            >
              <Star className="w-5 h-5" />
              Generate Magic Bios
            </button>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex justify-between items-center px-4">
              <h3 className="font-bold text-lg">Live Results</h3>
              <button 
                onClick={handleGenerate}
                className="text-primary text-sm font-semibold flex items-center gap-2 hover:opacity-80"
              >
                <Star className="w-4 h-4" /> Refresh
              </button>
            </div>

            <div className="grid gap-4">
              {results.map((bio, index) => (
                <div 
                  key={index} 
                  className="group flex items-center justify-between p-6 bg-card border border-border rounded-2xl hover:border-primary/40 transition-all shadow-sm"
                >
                  <p className="text-lg text-foreground font-medium">{bio}</p>
                  <button 
                    onClick={() => copyToClipboard(bio, index)}
                    className={`p-3 rounded-xl transition-all ${
                      copiedIndex === index 
                        ? "bg-green-500/10 text-green-500" 
                        : "bg-primary/10 text-primary opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
