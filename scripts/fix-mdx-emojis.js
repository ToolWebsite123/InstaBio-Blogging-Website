const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "..", "content", "posts");

function fixEmojiEscapes() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  let count = 0;

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    let content = fs.readFileSync(filePath, "utf8");

    if (content.includes("\\U")) {
      const fixed = content.replace(/\\U([0-9A-FA-f]{8})/g, (_, hex) => {
        const codePoint = parseInt(hex, 16);
        return String.fromCodePoint(codePoint);
      });

      if (fixed !== content) {
        fs.writeFileSync(filePath, fixed, "utf8");
        count++;
        console.log(`Cleaned emoji escapes in: ${file}`);
      }
    }
  }

  console.log(`Finished! Cleaned emoji escapes in ${count} files.`);
}

fixEmojiEscapes();
