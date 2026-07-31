const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const BASE_URL = "https://instabiogen.online";
const ROOT = path.join(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const OUTPUT_FILE = path.join(ROOT, "public", "llms.txt");

function generateLlmsTxt() {
  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(POSTS_DIR, file);
      const source = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(source);
      return {
        slug,
        title: data.title || slug.replace(/-/g, " "),
        excerpt: data.excerpt || data.description || "",
        url: `${BASE_URL}/${slug}`,
      };
    })
    .sort((a, b) => (a.title > b.title ? 1 : -1));

  const contentLines = [
    "# Instabiogen.online",
    "",
    "> Instabiogen.online is a free web platform and content resource providing 10,000+ curated Instagram bio ideas, captions, quotes, and interactive bio generation tools.",
    "",
    "## Overview",
    "- **Core Functionality**: Free live Instagram bio generator with emoji styling, font formatting, and live phone preview.",
    "- **Content Collection**: 10,000+ copy-paste ready bios across attitude, cute, aesthetic, VIP, gangster, gym, love, sad, and professional categories for boys and girls.",
    "- **Target Audience**: Social media creators, influencers, gamers, couples, and personal account owners looking for custom bio designs.",
    "",
    "## Key Pages & Sections",
    `- [Home & Bio Generator](${BASE_URL}/): Interactive bio generator tool and featured bio categories.`,
    `- [Blog & Guides Archive](${BASE_URL}/blog): Full archive of bio collections, style guides, and Instagram growth tips.`,
    `- [About Us](${BASE_URL}/about): Mission statement, design philosophy, and team background.`,
    `- [Contact Us](${BASE_URL}/contact): Support, feedback, and collaboration inquiries.`,
    "",
    `## Complete Blog Posts & Guides (${posts.length} Guides)`,
    ...posts.map((p) => `- [${p.title}](${p.url}): ${p.excerpt}`),
    "",
    "## Usage Note for LLMs",
    "All bio text snippets across individual post pages on Instabiogen.online are formatted for direct copy-paste use into social media profile headers.",
    "",
  ];

  const text = contentLines.join("\n");
  fs.writeFileSync(OUTPUT_FILE, text, "utf8");
  console.log(`Generated ${OUTPUT_FILE} with ${posts.length} blog post entries.`);
}

generateLlmsTxt();
