const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const POSTS_DIR = path.join(__dirname, "..", "content", "posts");

function cleanString(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/\s*For more creative ideas, check out our \[([^\]]+)\]\(\/([a-z0-9-]+)\)\./g, "")
    .replace(/\s*For more creative ideas, check out our [^.]+\./g, "")
    .replace(/\s*If you want more inspiration, check out our collection of [^.]+\./g, "")
    .replace(/\s*You can also explore our [^.]+\./g, "")
    .replace(/\[([^\]]+)\]\(\/([a-z0-9-]+)\)/g, "$1");
}

function restoreCleanMdx() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  console.log(`Cleaning frontmatter across ${files.length} MDX posts...`);

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    let raw = fs.readFileSync(filePath, "utf8");

    // Remove any link phrases in frontmatter text before second ---
    const parts = raw.split(/^---$/m);
    if (parts.length >= 3) {
      let fmText = parts[1];
      let bodyText = parts.slice(2).join("---");

      // Clean frontmatter text
      fmText = fmText
        .replace(/For more creative ideas, check out our [^\n]+/g, "")
        .replace(/If you want more inspiration, check out our collection of [^\n]+/g, "")
        .replace(/You can also explore our [^\n]+/g, "");

      // Clean body text from duplicated sentences
      bodyText = bodyText
        .replace(/\s*For more creative ideas, check out our \[([^\]]+)\]\(\/([a-z0-9-]+)\)\./g, "")
        .replace(/\s*For more creative ideas, check out our [^.]+\./g, "");

      const cleanedContent = `---${fmText}---${bodyText}`;
      fs.writeFileSync(filePath, cleanedContent, "utf8");
    }
  }

  console.log("Cleaned frontmatter!");
}

restoreCleanMdx();
