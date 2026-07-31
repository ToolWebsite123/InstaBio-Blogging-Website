const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "..", "content", "posts");
const CONSTANTS_FILE = path.join(__dirname, "..", "lib", "constants.ts");

// Parse ALL_STORIES properly from constants.ts
const constantsContent = fs.readFileSync(CONSTANTS_FILE, "utf8");
const storyBlocks = [...constantsContent.matchAll(/{\s*id:\s*\d+,\s*tag:\s*"([^"]+)",[\s\S]*?slug:\s*"([^"]+)",\s*}/g)];
const ALL_STORIES = storyBlocks.map((m) => ({ tag: m[1], slug: m[2] }));

const TOPIC_CLUSTERS = {
  gender_bios: [
    "best-instagram-bio-for-boys",
    "best-instagram-bio-for-girls",
    "instagram-bio-style-girl",
    "aesthetic-bio-for-instagram-for-girl",
    "king-and-queen-bio",
  ],
  attitude_vibe_bios: [
    "sigma-bio-for-instagram",
    "gangster-bio-for-instagram",
    "vip-instagram-bio",
    "best-mahakal-bio-for-instagram",
    "cool-bio-for-instagram",
  ],
  mood_aesthetic_bios: [
    "cute-instagram-bio",
    "classy-instagram-bio",
    "sad-bio-for-instagram",
    "emotional-instagram-bio",
    "funny-instagram-bio",
    "attractive-instagram-bio",
  ],
  niche_lifestyle_bios: [
    "gym-bio-for-instagram",
    "best-free-fire-bio-for-instagram",
    "photography-instagram-bio",
    "professional-instagram-bio",
    "best-islamic-bio-for-instagram",
    "best-love-bio-for-instagram",
    "birthday-bio-for-instagram",
  ],
  general_utility_bios: [
    "best-instagram-bio",
    "great-instagram-bio",
    "unique-bio-for-instagram",
    "short-bio-for-instagram",
    "instagram-bio-captions",
    "instagram-bio-inspiration",
    "interesting-bio-for-instagram",
  ],
};

function getClusterForSlug(slug) {
  for (const [clusterName, slugs] of Object.entries(TOPIC_CLUSTERS)) {
    if (slugs.includes(slug)) return clusterName;
  }
  return "general_utility_bios";
}

function getRelatedPosts(currentSlug, count = 4) {
  const currentCluster = getClusterForSlug(currentSlug);
  const clusterSlugs = TOPIC_CLUSTERS[currentCluster] || [];

  const sameClusterStories = ALL_STORIES.filter(
    (story) => story.slug !== currentSlug && clusterSlugs.includes(story.slug)
  );

  const otherStories = ALL_STORIES.filter(
    (story) => story.slug !== currentSlug && !clusterSlugs.includes(story.slug)
  );

  return [...sameClusterStories, ...otherStories].slice(0, count);
}

function auditInternalLinks() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const allSlugs = files.map((f) => f.replace(/\.mdx$/, ""));

  const outboundMap = {};
  const inboundMap = {};

  allSlugs.forEach((slug) => {
    outboundMap[slug] = [];
    inboundMap[slug] = [];
  });

  // 1. Audit In-Content links
  files.forEach((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const content = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");

    const matches = [...content.matchAll(/\[([^\]]+)\]\(\/([a-z0-9-]+)\)/g)];
    matches.forEach((m) => {
      const targetSlug = m[2];
      if (allSlugs.includes(targetSlug) && targetSlug !== slug) {
        outboundMap[slug].push(targetSlug);
        inboundMap[targetSlug].push(`in-content:${slug}`);
      }
    });
  });

  // 2. Audit RelatedPosts widget links
  allSlugs.forEach((slug) => {
    const related = getRelatedPosts(slug, 4);
    related.forEach((story) => {
      if (allSlugs.includes(story.slug) && story.slug !== slug) {
        inboundMap[story.slug].push(`related-widget:${slug}`);
      }
    });
  });

  console.log("=========================================================================");
  console.log("              INTERNAL LINK AUDIT REPORT (30 MDX POSTS)");
  console.log("=========================================================================\n");

  let minInbound = 999;
  let maxInbound = 0;
  let belowThresholdCount = 0;

  allSlugs.forEach((slug) => {
    const outboundCount = outboundMap[slug].length;
    const uniqueInboundSources = new Set(inboundMap[slug].map((s) => s.split(":")[1]));
    const inboundCount = uniqueInboundSources.size;

    if (inboundCount < minInbound) minInbound = inboundCount;
    if (inboundCount > maxInbound) maxInbound = inboundCount;
    if (inboundCount < 3) belowThresholdCount++;

    console.log(
      `${slug.padEnd(42)} | Outbound (body): ${outboundCount} | Total Unique Inbound Sources: ${inboundCount}`
    );
  });

  console.log("\n=========================================================================");
  console.log(`Min Inbound Internal Link Sources Per Post: ${minInbound}`);
  console.log(`Max Inbound Internal Link Sources Per Post: ${maxInbound}`);
  console.log(`Posts with < 3 Inbound Links: ${belowThresholdCount}`);
  console.log("=========================================================================");
}

auditInternalLinks();
