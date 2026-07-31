const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const POSTS_DIR = path.join(__dirname, "..", "content", "posts");

const POST_LINKS = {
  "aesthetic-bio-for-instagram-for-girl": [
    { target: "best-instagram-bio-for-girls", anchor: "stylish Instagram bios for girls" },
    { target: "instagram-bio-style-girl", anchor: "aesthetic girl bio fonts and styles" },
    { target: "cute-instagram-bio", anchor: "cute bio ideas for Instagram" },
    { target: "short-bio-for-instagram", anchor: "minimalist short bio ideas" }
  ],
  "attractive-instagram-bio": [
    { target: "unique-bio-for-instagram", anchor: "creative unique bio ideas" },
    { target: "cool-bio-for-instagram", anchor: "savage cool bios" },
    { target: "vip-instagram-bio", anchor: "royal VIP Instagram bios" },
    { target: "great-instagram-bio", anchor: "great bio ideas for Instagram" }
  ],
  "best-free-fire-bio-for-instagram": [
    { target: "sigma-bio-for-instagram", anchor: "sigma attitude bios for gamers" },
    { target: "gangster-bio-for-instagram", anchor: "bad boy gangster bio quotes" },
    { target: "best-instagram-bio-for-boys", anchor: "attitude bios for boys" },
    { target: "gym-bio-for-instagram", anchor: "fitness and gym motivation bios" }
  ],
  "best-instagram-bio-for-boys": [
    { target: "sigma-bio-for-instagram", anchor: "sigma lone wolf bios" },
    { target: "best-free-fire-bio-for-instagram", anchor: "Free Fire gaming bios" },
    { target: "cool-bio-for-instagram", anchor: "cool & savage bios for boys" },
    { target: "best-mahakal-bio-for-instagram", anchor: "Mahakal bio styles for boys" }
  ],
  "best-instagram-bio-for-girls": [
    { target: "aesthetic-bio-for-instagram-for-girl", anchor: "soft aesthetic bio ideas for girls" },
    { target: "cute-instagram-bio", anchor: "cute and sweet Instagram bios" },
    { target: "classy-instagram-bio", anchor: "elegant classy bios for girls" },
    { target: "king-and-queen-bio", anchor: "queen attitude bios for Instagram" }
  ],
  "best-instagram-bio": [
    { target: "best-instagram-bio-for-boys", anchor: "best Instagram bios for boys" },
    { target: "best-instagram-bio-for-girls", anchor: "best Instagram bios for girls" },
    { target: "best-free-fire-bio-for-instagram", anchor: "Free Fire gamer bio ideas" },
    { target: "unique-bio-for-instagram", anchor: "unique bio collections" }
  ],
  "best-islamic-bio-for-instagram": [
    { target: "short-bio-for-instagram", anchor: "short Islamic quotes for bio" },
    { target: "best-love-bio-for-instagram", anchor: "love and family bios" },
    { target: "professional-instagram-bio", anchor: "simple & respectful professional bios" },
    { target: "unique-bio-for-instagram", anchor: "unique bio formatting tips" }
  ],
  "best-love-bio-for-instagram": [
    { target: "king-and-queen-bio", anchor: "matching King & Queen couple bios" },
    { target: "cute-instagram-bio", anchor: "cute bio quotes for lovers" },
    { target: "emotional-instagram-bio", anchor: "deep feeling emotional bios" },
    { target: "birthday-bio-for-instagram", anchor: "birthday bios for your partner" }
  ],
  "best-mahakal-bio-for-instagram": [
    { target: "sigma-bio-for-instagram", anchor: "attitude sigma bios" },
    { target: "best-instagram-bio-for-boys", anchor: "attitude bios for boys" },
    { target: "best-free-fire-bio-for-instagram", anchor: "gaming Free Fire bios" },
    { target: "best-islamic-bio-for-instagram", anchor: "devotional spiritual bio ideas" }
  ],
  "birthday-bio-for-instagram": [
    { target: "funny-instagram-bio", anchor: "funny birthday bio captions" },
    { target: "cute-instagram-bio", anchor: "cute birthday bios for girls" },
    { target: "best-instagram-bio-for-boys", anchor: "cool birthday bios for boys" },
    { target: "instagram-bio-captions", anchor: "creative bio captions for celebrations" }
  ],
  "classy-instagram-bio": [
    { target: "professional-instagram-bio", anchor: "professional and polished bios" },
    { target: "aesthetic-bio-for-instagram-for-girl", anchor: "soft aesthetic bios" },
    { target: "vip-instagram-bio", anchor: "royal VIP bio formatting" },
    { target: "photography-instagram-bio", anchor: "creative photography bios" }
  ],
  "cool-bio-for-instagram": [
    { target: "gangster-bio-for-instagram", anchor: "cool gangster bio quotes" },
    { target: "sigma-bio-for-instagram", anchor: "sigma mindset bios" },
    { target: "best-free-fire-bio-for-instagram", anchor: "savage Free Fire gamer bios" },
    { target: "attractive-instagram-bio", anchor: "attractive profile bios" }
  ],
  "cute-instagram-bio": [
    { target: "aesthetic-bio-for-instagram-for-girl", anchor: "aesthetic girl bio ideas" },
    { target: "best-instagram-bio-for-girls", anchor: "stylish bio ideas for girls" },
    { target: "emotional-instagram-bio", anchor: "emotional bio quotes" },
    { target: "funny-instagram-bio", anchor: "funny & playful cute bios" }
  ],
  "emotional-instagram-bio": [
    { target: "sad-bio-for-instagram", anchor: "sad and heartbreak bio quotes" },
    { target: "best-love-bio-for-instagram", anchor: "deep love bios" },
    { target: "short-bio-for-instagram", anchor: "short 1-line emotional bios" },
    { target: "instagram-bio-inspiration", anchor: "inspirational bio quotes" }
  ],
  "funny-instagram-bio": [
    { target: "cool-bio-for-instagram", anchor: "cool & witty Instagram bios" },
    { target: "short-bio-for-instagram", anchor: "short 1-line funny bios" },
    { target: "best-instagram-bio-for-boys", anchor: "funny bios for boys" },
    { target: "cute-instagram-bio", anchor: "cute & funny bios for girls" }
  ],
  "gangster-bio-for-instagram": [
    { target: "sigma-bio-for-instagram", anchor: "sigma attitude bios" },
    { target: "vip-instagram-bio", anchor: "VIP royal attitude bios" },
    { target: "best-free-fire-bio-for-instagram", anchor: "gaming gamer bios for boys" },
    { target: "best-instagram-bio-for-boys", anchor: "bad boy attitude bios" }
  ],
  "great-instagram-bio": [
    { target: "best-instagram-bio", anchor: "best Instagram bio collection" },
    { target: "unique-bio-for-instagram", anchor: "unique bio ideas" },
    { target: "attractive-instagram-bio", anchor: "attractive bio formatting" },
    { target: "instagram-bio-inspiration", anchor: "bio inspiration guide" }
  ],
  "gym-bio-for-instagram": [
    { target: "sigma-bio-for-instagram", anchor: "sigma workout mindset bios" },
    { target: "best-instagram-bio-for-boys", anchor: "fitness bios for boys" },
    { target: "best-free-fire-bio-for-instagram", anchor: "Free Fire gaming bios" },
    { target: "professional-instagram-bio", anchor: "personal trainer professional bios" }
  ],
  "instagram-bio-captions": [
    { target: "short-bio-for-instagram", anchor: "short bio captions" },
    { target: "unique-bio-for-instagram", anchor: "unique bio quotes" },
    { target: "instagram-bio-inspiration", anchor: "bio inspiration ideas" },
    { target: "emotional-instagram-bio", anchor: "emotional bio captions" }
  ],
  "instagram-bio-inspiration": [
    { target: "great-instagram-bio", anchor: "great bio ideas for Instagram" },
    { target: "unique-bio-for-instagram", anchor: "unique bio concepts" },
    { target: "aesthetic-bio-for-instagram-for-girl", anchor: "aesthetic bio styles" },
    { target: "professional-instagram-bio", anchor: "professional bio examples" }
  ],
  "instagram-bio-style-girl": [
    { target: "aesthetic-bio-for-instagram-for-girl", anchor: "soft aesthetic girl bios" },
    { target: "best-instagram-bio-for-girls", anchor: "best bios for girls" },
    { target: "classy-instagram-bio", anchor: "classy bio styles" },
    { target: "cute-instagram-bio", anchor: "cute Instagram bio ideas" }
  ],
  "interesting-bio-for-instagram": [
    { target: "unique-bio-for-instagram", anchor: "unique bio ideas" },
    { target: "cool-bio-for-instagram", anchor: "cool bio formatting" },
    { target: "photography-instagram-bio", anchor: "creative photography bios" },
    { target: "instagram-bio-inspiration", anchor: "bio inspiration quotes" }
  ],
  "king-and-queen-bio": [
    { target: "best-love-bio-for-instagram", anchor: "romantic love bios" },
    { target: "vip-instagram-bio", anchor: "royal VIP bio styles" },
    { target: "best-instagram-bio-for-girls", anchor: "queen attitude bios for girls" },
    { target: "best-instagram-bio-for-boys", anchor: "king attitude bios for boys" }
  ],
  "photography-instagram-bio": [
    { target: "professional-instagram-bio", anchor: "professional portfolio bios" },
    { target: "aesthetic-bio-for-instagram-for-girl", anchor: "aesthetic photography bios" },
    { target: "interesting-bio-for-instagram", anchor: "creative bio ideas" },
    { target: "unique-bio-for-instagram", anchor: "unique Instagram bios" }
  ],
  "professional-instagram-bio": [
    { target: "photography-instagram-bio", anchor: "creator and photography bios" },
    { target: "classy-instagram-bio", anchor: "classy bio designs" },
    { target: "short-bio-for-instagram", anchor: "short professional bios" },
    { target: "gym-bio-for-instagram", anchor: "fitness coach bios" }
  ],
  "sad-bio-for-instagram": [
    { target: "emotional-instagram-bio", anchor: "emotional bio quotes" },
    { target: "short-bio-for-instagram", anchor: "short 1-line sad bios" },
    { target: "best-love-bio-for-instagram", anchor: "heartbreak love bios" },
    { target: "instagram-bio-inspiration", anchor: "healing bio inspiration" }
  ],
  "short-bio-for-instagram": [
    { target: "unique-bio-for-instagram", anchor: "unique short bios" },
    { target: "cool-bio-for-instagram", anchor: "cool 1-line bios" },
    { target: "funny-instagram-bio", anchor: "funny short bios" },
    { target: "best-instagram-bio-for-boys", anchor: "short bios for boys" }
  ],
  "sigma-bio-for-instagram": [
    { target: "gangster-bio-for-instagram", anchor: "gangster attitude bios" },
    { target: "best-instagram-bio-for-boys", anchor: "attitude bios for boys" },
    { target: "best-free-fire-bio-for-instagram", anchor: "Free Fire gaming bios" },
    { target: "vip-instagram-bio", anchor: "VIP lone wolf bios" }
  ],
  "unique-bio-for-instagram": [
    { target: "great-instagram-bio", anchor: "great bio collections" },
    { target: "interesting-bio-for-instagram", anchor: "interesting bio ideas" },
    { target: "short-bio-for-instagram", anchor: "short unique bios" },
    { target: "photography-instagram-bio", anchor: "creative photography bios" }
  ],
  "vip-instagram-bio": [
    { target: "sigma-bio-for-instagram", anchor: "sigma VIP attitude bios" },
    { target: "gangster-bio-for-instagram", anchor: "gangster royal bios" },
    { target: "king-and-queen-bio", anchor: "King & Queen VIP bios" },
    { target: "best-instagram-bio-for-boys", anchor: "VIP bios for boys" }
  ]
};

function main() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  console.log(`Processing ${files.length} MDX posts...`);

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(POSTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const linksToInject = POST_LINKS[slug] || [];
    if (linksToInject.length === 0) continue;

    const parsed = matter(fileContent);
    let body = parsed.content;

    // Thoroughly clean any previous added link sentence patterns
    body = body.replace(/\s*For more creative ideas, (check out|explore) [^\.]+\./gi, "");
    body = body.replace(/\s*If you want more inspiration, check out our collection of [^\.]+\./gi, "");
    body = body.replace(/\s*You can also explore [^\.]+\./gi, "");

    const lines = body.split("\n");
    let inserted = 0;

    for (let i = 0; i < lines.length && inserted < linksToInject.length; i++) {
      const line = lines[i].trim();
      if (
        line.length > 30 &&
        !line.startsWith("#") &&
        !line.startsWith("<") &&
        !line.startsWith("-") &&
        !line.includes("http")
      ) {
        const linkInfo = linksToInject[inserted];
        const mdLink = `[${linkInfo.anchor}](/${linkInfo.target})`;
        lines[i] = `${lines[i]} For more creative ideas, check out our ${mdLink}.`;
        inserted++;
      }
    }

    parsed.content = lines.join("\n");
    const updatedContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, updatedContent, "utf8");
    console.log(`Updated ${slug}: ${inserted} links inserted into body.`);
  }

  console.log("Done!");
}

main();
