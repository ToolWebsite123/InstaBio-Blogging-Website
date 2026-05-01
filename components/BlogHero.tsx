import { Search } from "lucide-react";

export default function BlogHero() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container-wide text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          Best Instagram Bios, Captions & <br /> Stylish Names
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The ultimate source for creative social media content. Copy and paste 
          aesthetic bios, viral captions, and stylish text ideas in seconds.
        </p>
        
        <div className="max-w-xl mx-auto relative pt-4">
          <input 
            type="text" 
            placeholder="Search for bios, captions, or categories..." 
            className="search-input text-lg pr-12"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6 mt-2" />
        </div>
      </div>
    </section>
  );
}
