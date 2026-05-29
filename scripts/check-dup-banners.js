const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "..", "content", "posts");

for (const file of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"))) {
  const content = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const sections = content.split(/(?=^## )/m);

  for (const section of sections) {
    const banners = [...section.matchAll(/<BioBanner src="([^"]+)"/g)].map((m) => m[1]);
    if (banners.length <= 1) continue;
    const title = (section.match(/^## (.+)/m) || ["", "(intro)"])[1];
    console.log(`${file} | ${title}`);
    console.log(`  count=${banners.length}`, banners);
  }
}
