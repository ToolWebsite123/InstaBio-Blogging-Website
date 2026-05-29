/**
 * Removes duplicate BioBanner tags from MDX posts.
 * - At most one banner per ## section (deduped by src)
 * - Banner placed before <BioGrid> when a grid exists
 * Run: node scripts/dedupe-banners.js [slug]   (omit slug for all posts)
 */
const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "..", "content", "posts");
const BANNER_LINE =
  /<BioBanner src="([^"]+)" title="([^"]*)" \/>/g;

function collectBanners(text) {
  const banners = [];
  let m;
  const re = new RegExp(BANNER_LINE.source, "g");
  while ((m = re.exec(text)) !== null) {
    banners.push({ src: m[1], title: m[2], full: m[0] });
  }
  return banners;
}

function uniqueBySrc(banners) {
  const seen = new Set();
  const out = [];
  for (const b of banners) {
    if (seen.has(b.src)) continue;
    seen.add(b.src);
    out.push(b);
  }
  return out;
}

function stripBanners(text) {
  return text.replace(/<BioBanner src="[^"]+" title="[^"]*" \/>\s*\n?/g, "");
}

function dedupeSection(section) {
  const banners = uniqueBySrc(collectBanners(section));
  if (banners.length === 0) return section;

  const banner = banners[0];
  let cleaned = stripBanners(section);

  if (/<BioGrid>/.test(cleaned)) {
    cleaned = cleaned.replace(/\n*<BioGrid>/, `\n\n${banner.full}\n\n<BioGrid>`);
    return cleaned;
  }

  const headingEnd = cleaned.indexOf("\n\n");
  if (headingEnd === -1) return `${cleaned.trimEnd()}\n\n${banner.full}\n`;

  const afterHeading = cleaned.slice(headingEnd + 2);
  if (!afterHeading.trim()) {
    return `${cleaned.trimEnd()}\n\n${banner.full}\n`;
  }

  return `${cleaned.trimEnd()}\n\n${banner.full}\n`;
}

function dedupeMdxContent(content) {
  const parts = content.split(/(?=^## )/m);
  if (parts.length <= 1) return content;

  const head = parts[0];
  const sections = parts.slice(1).map(dedupeSection);
  return head + sections.join("");
}

function dedupeFile(mdxPath) {
  const slug = path.basename(mdxPath, ".mdx");
  const before = (fs.readFileSync(mdxPath, "utf8").match(/<BioBanner/g) || [])
    .length;

  const content = dedupeMdxContent(fs.readFileSync(mdxPath, "utf8"));
  fs.writeFileSync(mdxPath, content, "utf8");

  const after = (content.match(/<BioBanner/g) || []).length;
  console.log(`${slug}: ${before} → ${after} banners`);
  return { before, after };
}

function main() {
  const slugArg = process.argv[2];
  const files = slugArg
    ? [path.join(POSTS_DIR, `${slugArg}.mdx`)]
    : fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const mdxPath = path.isAbsolute(file) ? file : path.join(POSTS_DIR, file);
    if (!fs.existsSync(mdxPath)) {
      console.warn(`Skip (missing): ${mdxPath}`);
      continue;
    }
    const { before, after } = dedupeFile(mdxPath);
    totalBefore += before;
    totalAfter += after;
  }

  console.log(`\nTotal: ${totalBefore} → ${totalAfter} banners`);
}

main();
