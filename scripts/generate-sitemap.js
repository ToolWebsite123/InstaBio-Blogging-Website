const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const BASE_URL = "https://instabio.online";
const ROOT = path.join(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const OUTPUT = path.join(ROOT, "public", "sitemap.xml");

const STATIC_PAGES = [
  { loc: BASE_URL, priority: "1.0", lastmod: "2026-05-28" },
  { loc: `${BASE_URL}/blog`, priority: "0.8", lastmod: "2026-05-28" },
  { loc: `${BASE_URL}/about`, priority: "0.8", lastmod: "2026-05-28" },
  { loc: `${BASE_URL}/contact`, priority: "0.8", lastmod: "2026-05-28" },
  { loc: `${BASE_URL}/privacy`, priority: "0.8", lastmod: "2026-05-28" },
  { loc: `${BASE_URL}/terms`, priority: "0.8", lastmod: "2026-05-28" },
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toLastmod(date) {
  if (!date) return "2026-05-28";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "2026-05-28";
  return parsed.toISOString().split("T")[0];
}

function getBlogEntries() {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const source = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(source);
      return {
        loc: `${BASE_URL}/blog/${slug}`,
        priority: "0.8",
        lastmod: toLastmod(data.date),
      };
    })
    .sort((a, b) => (a.loc > b.loc ? 1 : -1));
}

function buildUrlEntry({ loc, lastmod, priority }) {
  return [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
    `    <priority>${escapeXml(priority)}</priority>`,
    "  </url>",
  ].join("\n");
}

function generateSitemap() {
  const entries = [...STATIC_PAGES, ...getBlogEntries()];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(buildUrlEntry),
    "</urlset>",
    "",
  ].join("\n");

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, xml, "utf8");

  console.log(`Generated ${OUTPUT} with ${entries.length} URLs.`);
}

generateSitemap();
