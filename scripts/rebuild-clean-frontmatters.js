const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const POSTS_DIR = path.join(__dirname, "..", "content", "posts");

function rebuildCleanFrontmatter() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  console.log(`Fixing frontmatter formatting across ${files.length} MDX posts...`);

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    let raw = fs.readFileSync(filePath, "utf8");

    // Remove any inline link phrases inserted into frontmatter lines before the second ---
    const parts = raw.split(/^---$/m);
    if (parts.length >= 3) {
      let fmText = parts[1];
      const bodyText = parts.slice(2).join("---");

      // Remove added sentence patterns from frontmatter text
      fmText = fmText
        .replace(/\s*For more creative ideas, check out our [^\n]+/g, "")
        .replace(/\s*If you want more inspiration, check out our collection of [^\n]+/g, "")
        .replace(/\s*You can also explore our [^\n]+/g, "");

      // Ensure proper YAML formatting by re-evaluating or fixing invalid multiline line breaks
      const cleanFmText = fmText
        .replace(/(\n\s*title:\s*)([^\n']+)(\n)/g, "$1'$2'$3")
        .replace(/(\n\s*seoTitle:\s*)([^\n']+)(\n)/g, "$1'$2'$3");

      const reconstructed = `---${cleanFmText}---${bodyText}`;

      // Try gray-matter parsing
      try {
        const parsed = matter(reconstructed);
        // Clean any residual link artifacts in frontmatter strings
        if (parsed.data.title) parsed.data.title = parsed.data.title.replace(/\s*For more creative ideas[^\n]*/g, "").trim();
        if (parsed.data.excerpt) parsed.data.excerpt = parsed.data.excerpt.replace(/\s*For more creative ideas[^\n]*/g, "").trim();
        if (parsed.data.seoTitle) parsed.data.seoTitle = parsed.data.seoTitle.replace(/\s*For more creative ideas[^\n]*/g, "").trim();
        if (parsed.data.seoDescription) parsed.data.seoDescription = parsed.data.seoDescription.replace(/\s*For more creative ideas[^\n]*/g, "").trim();

        const cleanOutput = matter.stringify(parsed.content, parsed.data);
        fs.writeFileSync(filePath, cleanOutput, "utf8");
      } catch (err) {
        console.error(`Warning fixing ${file}: ${err.message}`);
      }
    }
  }

  console.log("Rebuilt clean frontmatters!");
}

rebuildCleanFrontmatter();
