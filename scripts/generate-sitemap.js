const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const BASE_URL = "https://instabiogen.online";
const ROOT = path.join(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const OUTPUT = path.join(ROOT, "public", "sitemap.xml");

const today = new Date().toISOString().split("T")[0];

function pageUrl(path) {
  if (path === "/") return BASE_URL;
  return `${BASE_URL}${path.endsWith("/") ? path.slice(0, -1) : path}`;
}

const STATIC_PAGES = [
  { loc: pageUrl("/"), priority: "1.0", lastmod: today },
  { loc: pageUrl("/blog"), priority: "0.5", lastmod: today },
  { loc: pageUrl("/about"), priority: "0.5", lastmod: today },
  { loc: pageUrl("/contact"), priority: "0.5", lastmod: today },
  { loc: pageUrl("/privacy"), priority: "0.3", lastmod: today },
  { loc: pageUrl("/terms"), priority: "0.3", lastmod: today },
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
  if (!date) return today;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return today;
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
        loc: pageUrl(`/${slug}`),
        priority: "0.9",
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
