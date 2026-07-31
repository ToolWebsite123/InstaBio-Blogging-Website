import { ALL_STORIES } from "./constants";

export type StoryItem = (typeof ALL_STORIES)[number];

export const TOPIC_CLUSTERS: Record<string, string[]> = {
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

export function getClusterForSlug(slug: string): string {
  for (const [clusterName, slugs] of Object.entries(TOPIC_CLUSTERS)) {
    if (slugs.includes(slug)) {
      return clusterName;
    }
  }
  return "general_utility_bios";
}

export function getRelatedPosts(currentSlug: string, count = 4): StoryItem[] {
  const currentCluster = getClusterForSlug(currentSlug);
  const clusterSlugs = TOPIC_CLUSTERS[currentCluster] || [];

  // Same cluster posts excluding current
  const sameClusterStories = ALL_STORIES.filter(
    (story) => story.slug !== currentSlug && clusterSlugs.includes(story.slug)
  );

  // Other cluster posts excluding current
  const otherStories = ALL_STORIES.filter(
    (story) => story.slug !== currentSlug && !clusterSlugs.includes(story.slug)
  );

  const combined = [...sameClusterStories, ...otherStories];
  return combined.slice(0, count);
}
