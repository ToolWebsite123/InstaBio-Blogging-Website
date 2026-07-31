const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const POSTS_DIR = path.join(__dirname, "..", "content", "posts");

function cleanAndReserialize() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  console.log(`Cleaning and re-serializing ${files.length} MDX posts...`);

  let count = 0;

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    let raw = fs.readFileSync(filePath, "utf8");

    // Remove any extra frontmatter indentation added by previous script
    const parts = raw.split(/^---$/m);
    if (parts.length >= 3) {
      let fmText = parts[1];
      const bodyText = parts.slice(2).join("---");

      // Fix lines starting with 2 spaces before key:
      const lines = fmText.split("\n").map((line) => {
        if (/^\s{2}[a-zA-Z0-9_-]+:/.test(line)) {
          return line.trim();
        }
        // Fix 2-space indentation under answer: >- or text: >- inside list items
        if (/^\s{2,4}[^\s-]/.test(line) && !line.startsWith("  -") && !line.startsWith("    ")) {
          return `      ${line.trim()}`;
        }
        return line;
      });

      const fixedRaw = `---${lines.join("\n")}---${bodyText}`;

      try {
        const parsed = matter(fixedRaw);
        const cleanContent = matter.stringify(parsed.content, parsed.data);
        fs.writeFileSync(filePath, cleanContent, "utf8");
        count++;
      } catch (err) {
        console.error(`Error in ${file}: ${err.message}`);
      }
    }
  }

  console.log(`Re-serialized ${count}/${files.length} files successfully!`);
}

cleanAndReserialize();
