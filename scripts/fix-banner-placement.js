/**
 * Fixes banner placement in MDX:
 * - Banners only live in sections that have a BioGrid
 * - Orphan banners (section with banner but no grid) move to the next section with a grid
 * - If that section already has a banner, the orphan is removed
 *
 * Run: node scripts/fix-banner-placement.js
 */
const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "..", "content", "posts");
const BANNER_RE = /<BioBanner src="[^"]+" title="[^"]*" \/>/;

function extractBanner(section) {
  const match = section.match(BANNER_RE);
  return match ? match[0] : null;
}

function stripBanners(section) {
  return section.replace(/<BioBanner src="[^"]+" title="[^"]*" \/>\s*\n?/g, "");
}

function insertBeforeGrid(section, banner) {
  if (!banner) return section;
  const cleaned = stripBanners(section);
  if (!/<BioGrid>/.test(cleaned)) return cleaned;
  return cleaned.replace(/\n*<BioGrid>/, `\n\n${banner}\n\n<BioGrid>`);
}

function fixContent(content) {
  const parts = content.split(/(?=^## )/m);
  if (parts.length <= 1) return content;

  const head = parts[0];
  let pendingBanner = null;
  const fixed = [];

  for (const section of parts.slice(1)) {
    let working = section;
    const hasGrid = /<BioGrid>/.test(working);
    const hasBanner = BANNER_RE.test(working);

    if (!hasGrid && hasBanner) {
      pendingBanner = extractBanner(working) || pendingBanner;
      working = stripBanners(working);
    }

    if (hasGrid) {
      if (pendingBanner && !hasBanner) {
        working = insertBeforeGrid(working, pendingBanner);
        pendingBanner = null;
      } else if (pendingBanner && hasBanner) {
        pendingBanner = null;
      }
    }

    fixed.push(working);
  }

  return head + fixed.join("");
}

function main() {
  for (const file of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"))) {
    const mdxPath = path.join(POSTS_DIR, file);
    const before = (fs.readFileSync(mdxPath, "utf8").match(/<BioBanner/g) || []).length;
    const next = fixContent(fs.readFileSync(mdxPath, "utf8"));
    fs.writeFileSync(mdxPath, next, "utf8");
    const after = (next.match(/<BioBanner/g) || []).length;
    if (before !== after) {
      console.log(`${file}: ${before} → ${after} banners`);
    }
  }
  console.log("Done.");
}

main();
