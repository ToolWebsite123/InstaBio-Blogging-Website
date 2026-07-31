import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updatedDate?: string;
  category: string;
  image: string;
  readTime: string;
  seoTitle?: string;
  seoDescription?: string;
  faqs?: FaqItem[];
  howTo?: HowToStep[];
}

export interface Post extends PostMeta {
  content: string;
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${fullPath}`);
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const bannerMatch = content.match(/<BioBanner\s+src="([^"]+)"/);
  const bannerSrc = bannerMatch ? bannerMatch[1] : null;

  return {
    slug: realSlug,
    title: data.title,
    excerpt: data.excerpt || data.description || "",
    date: data.date,
    updatedDate: data.updatedDate || data.lastmod || data.date,
    category: data.category,
    image: bannerSrc || data.image || "/images/placeholder.jpg",
    readTime: data.readTime || "3 min read",
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    faqs: Array.isArray(data.faqs) ? data.faqs : undefined,
    howTo: Array.isArray(data.howTo) ? data.howTo : undefined,
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getPostsByCategory(categorySlug: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter(
    (post) => post.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );
}
