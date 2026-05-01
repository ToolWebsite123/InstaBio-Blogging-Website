"use client";

import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface TOCItem {
  title: string;
  slug: string;
  level: number;
}

const TOC: React.FC = () => {
  const [items, setItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    // Find all h2 and h3 headings that have an id
    const headings = Array.from(document.querySelectorAll('h2[id], h3[id]'));
    const tocItems: TOCItem[] = headings.map((heading) => ({
      title: heading.textContent || "",
      slug: heading.id,
      level: parseInt(heading.tagName.replace('H', ''), 10)
    }));
    setItems(tocItems);
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="my-10 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-sm overflow-hidden relative group">
      {/* Abstract Background Decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[linear-gradient(45deg,#4F5BD5,#962FBF,#D62976)] opacity-[0.05] rounded-full blur-3xl group-hover:opacity-10 transition-opacity"></div>
      
      <div className="flex items-center mb-6">
        <div className="w-1.5 h-6 bg-[linear-gradient(to_bottom,#4F5BD5,#962FBF,#D62976,#FA7E1E,#FEDA77)] mr-3 rounded-full"></div>
        <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Quick Navigation</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {items.map((item, index) => (
          <a
            key={index}
            href={`#${item.slug}`}
            className={`flex items-center group/item py-2 px-3 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300 ${item.level === 3 ? "ml-6 opacity-80 scale-95" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(item.slug);
              if (element) {
                const offset = 100; // Offset for sticky headers
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
                });
              }
            }}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold border border-gray-100 transition-colors mr-3 shadow-sm ${item.level === 3 ? "text-gray-400" : "text-[#D62976] group-hover/item:border-[#D62976]/30 group-hover/item:bg-[#D62976]/5"}`}>
              {index + 1}
            </div>
            <span className={`font-medium transition-colors line-clamp-1 ${item.level === 3 ? "text-[13px] text-gray-500" : "text-[15px] text-gray-600 group-hover/item:text-[#D62976]"}`}>
              {item.title}
            </span>
            <ChevronRight className={`w-4 h-4 ml-auto text-gray-300 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all`} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default TOC;

