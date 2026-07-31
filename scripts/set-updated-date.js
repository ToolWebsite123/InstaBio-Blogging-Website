const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const POSTS_DIR = path.join(__dirname, "..", "content", "posts");
const TODAY = "2026-07-31";

function setUpdatedDate() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  console.log(`Updating updatedDate in ${files.length} MDX posts...`);

  let count = 0;

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, "utf8");
    const parsed = matter(content);

    parsed.data.updatedDate = TODAY;

    const updated = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, updated, "utf8");
    count++;
  }

  console.log(`Successfully updated updatedDate to ${TODAY} across ${count} posts.`);
}

setUpdatedDate();
