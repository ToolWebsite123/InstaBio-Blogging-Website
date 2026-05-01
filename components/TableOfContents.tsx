"use client";

import { useEffect, useState } from "react";

interface Heading {
  level: number;
  text: string;
  slug: string;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-10% 0px -40% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
        Table of Contents
      </h3>
      <nav className="border-l border-border pl-4 space-y-3">
        {headings.map((heading) => (
          <a
            key={heading.slug}
            href={`#${heading.slug}`}
            className={`block text-[13px] leading-relaxed transition-colors duration-200 ${
              activeId === heading.slug
                ? "text-[#7C3AED] dark:text-[#A78BFA] font-semibold"
                : "text-muted-foreground hover:text-foreground"
            } ${heading.level === 3 ? "ml-3" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.slug)?.scrollIntoView({
                behavior: "smooth",
              });
              // Give time for scroll to finish before forcing active state, or just let observer handle it
              setTimeout(() => setActiveId(heading.slug), 100);
            }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

