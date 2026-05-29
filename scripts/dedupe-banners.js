/**
 * Removes duplicate BioBanner tags from MDX (after </BioGrid> and back-to-back duplicates).
 * Run: node scripts/dedupe-banners.js [slug]
 */
const fs = require("fs");
const path = require("path");

const slug = process.argv[2] || "best-love-bio-for-instagram";
const mdxPath = path.join(__dirname, "..", "content", "posts", `${slug}.mdx`);

let content = fs.readFileSync(mdxPath, "utf8");
const before = (content.match(/<BioBanner/g) || []).length;

content = content.replace(
  /<\/BioGrid>\r?\n\r?\n<BioBanner[^>]+\/>\r?\n\r?\n/g,
  "</BioGrid>\n\n"
);

let prev = "";
while (prev !== content) {
  prev = content;
  content = content.replace(
    /(<BioBanner src="[^"]+" title="[^"]*" \/>)\n\n\1\n\n/g,
    "$1\n\n"
  );
}

fs.writeFileSync(mdxPath, content, "utf8");
const after = (content.match(/<BioBanner/g) || []).length;
console.log(`${slug}: ${before} → ${after} banners`);
