/**
 * Maps HTML bio banners to MDX sections and inserts <BioBanner /> after each BioGrid.
 * Run: node scripts/insert-banner-images.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BANNER_ROOT = path.join(ROOT, "public", "All instagram bio");
const POSTS_DIR = path.join(ROOT, "content", "posts");

const POST_FOLDER_MAP = {
  "gym-bio-for-instagram": "Gym bio for instagram",
  "best-instagram-bio-for-boys": "Instagram Bio for Boys",
  "best-instagram-bio-for-girls": "instagram bio or girls",
  "best-islamic-bio-for-instagram": "Islamic Bio for Instagram",
  "sad-bio-for-instagram": "sad bio for instagram",
  "professional-instagram-bio": "professional instagram bio",
  "best-free-fire-bio-for-instagram": "free fire instagram bio",
};

const HEADLINE_TO_SECTION = {
  "deep emotional sad bio for instagram": "emotional sad bio for instagram",
  "islamic bio boys edition": "islamic bio for instagram for boys",
  "instagram vip bio for girls": "instagram vip bio for girls",
  "stylish name ideas for islamic profiles": "short islamic bio for instagram",
  "stylish name ideas for instagram": "short instagram bio for boys",
  "stylish name ideas for free fire profiles": "free fire bio for instagram in english",
  "sad bio for instagram for boys": "best sad bio for instagram",
  "attitude bio for instagram for girls": "instagram bio for girls attitude",
  "attitude girls instagram bios": "instagram bio for girls attitude",
};

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHeadline(html) {
  const m = html.match(/class="headline"[^>]*>([^<]+)</);
  return m ? m[1].trim() : null;
}

function sectionKey(headline) {
  const n = normalize(headline);
  return HEADLINE_TO_SECTION[n] || n;
}

function parseMdxSections(content) {
  const sections = [];
  const re = /^## (.+)$/gm;
  let m;
  while ((m = re.exec(content)) !== null) {
    sections.push({ title: m[1].trim(), key: normalize(m[1]) });
  }
  return sections;
}

function findSectionKey(headline, sectionKeys) {
  const key = sectionKey(headline);
  if (sectionKeys.includes(key)) return key;
  return (
    sectionKeys.find((s) => s.includes(key) || key.includes(s)) || null
  );
}

function publicBannerPath(folderName, fileName) {
  const encoded = encodeURI(`/All instagram bio/${folderName}/${fileName}`);
  return encoded;
}

function insertBannersIntoMdx(slug, mappings) {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) return 0;

  let content = fs.readFileSync(mdxPath, "utf8");
  let inserted = 0;

  for (const { sectionKey: sk, bannerSrc, title } of mappings) {
    const sectionTitle = parseMdxSections(content).find((s) => s.key === sk)?.title;
    if (!sectionTitle) continue;

    const tag = `<BioBanner src="${bannerSrc}" title="${title.replace(/"/g, "'")}" />`;

    const escaped = sectionTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Stop at next ## so we never span multiple sections
    let sectionRe = new RegExp(
      `(## ${escaped}(?:(?!\\n## )[\\s\\S])*?</BioGrid>)\\n(?:\\n(?:!\\[[^\\]]*\\]\\([^)]+\\)|<BioBanner[^/]*/>)\\n)?`,
      "m"
    );
    let next = content.replace(sectionRe, `$1\n\n${tag}\n`);

    // Section without BioGrid (intro-only blocks)
    if (next === content) {
      sectionRe = new RegExp(
        `(## ${escaped}(?:(?!\\n## )[\\s\\S])*?)(?=\\n## )`,
        "m"
      );
      next = content.replace(sectionRe, `$1\n\n${tag}\n`);
    }
    if (next !== content) {
      content = next;
      inserted++;
    }
  }

  fs.writeFileSync(mdxPath, content, "utf8");
  return inserted;
}

function main() {
  const slugByFolder = Object.fromEntries(
    Object.entries(POST_FOLDER_MAP).map(([slug, folder]) => [folder, slug])
  );

  const mdxUpdates = {};

  for (const folderName of fs.readdirSync(BANNER_ROOT)) {
    const folderPath = path.join(BANNER_ROOT, folderName);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const slug = slugByFolder[folderName];
    if (!slug) continue;

    const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
    const sectionKeys = parseMdxSections(fs.readFileSync(mdxPath, "utf8")).map(
      (s) => s.key
    );

    const htmlFiles = fs
      .readdirSync(folderPath)
      .filter((f) => f.endsWith(".html"))
      .sort();

    console.log(`${folderName} → ${slug}`);

    for (const file of htmlFiles) {
      const html = fs.readFileSync(path.join(folderPath, file), "utf8");
      const headline = extractHeadline(html);
      if (!headline) continue;

      const sk = findSectionKey(headline, sectionKeys);
      const bannerSrc = publicBannerPath(folderName, file);

      if (sk) {
        if (!mdxUpdates[slug]) mdxUpdates[slug] = [];
        mdxUpdates[slug].push({
          sectionKey: sk,
          bannerSrc,
          title: headline.replace(/👑/g, "").trim(),
        });
      } else {
        console.warn(`  No section: "${headline}" (${file})`);
      }
    }
  }

  console.log("\nUpdating MDX...");
  let total = 0;
  for (const [slug, mappings] of Object.entries(mdxUpdates)) {
    const n = insertBannersIntoMdx(slug, mappings);
    total += n;
    console.log(`  ${slug}: ${n} banners`);
  }
  console.log(`\nDone. ${total} banners inserted.`);
}

main();
