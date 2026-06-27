const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');

// Expand the keyword map
const LINK_MAP = [
  { slug: 'best-instagram-bio-for-boys', keywords: ['Instagram bio for boys', 'Instagram bios for boys in 2026', 'best Instagram bio for boys', 'Gym Bio for Instagram for Boys', 'bio for boys'] },
  { slug: 'best-instagram-bio-for-girls', keywords: ['Instagram bio for girls', 'best Instagram bio for girls', 'Gym Bio For Instagram For Girls', 'bio for girls'] },
  { slug: 'aesthetic-bio-for-instagram-for-girl', keywords: ['aesthetic bio for Instagram for girl', 'Aesthetic Gym Bio for Instagram', 'aesthetic Instagram bio style for girls'] },
  { slug: 'instagram-bio-style-girl', keywords: ['Instagram bio style girl', 'stylish bio for Instagram for girls', 'attitude bio style for girls'] },
  { slug: 'best-free-fire-bio-for-instagram', keywords: ['free fire bio for Instagram', 'Free Fire boy', 'Free Fire girl', 'gaming bio'] },
  { slug: 'best-islamic-bio-for-instagram', keywords: ['Islamic bio for Instagram', 'Islamic bios for Instagram in 2026', 'Islamic bios'] },
  { slug: 'best-love-bio-for-instagram', keywords: ['love bio for Instagram', 'romantic bio'] },
  { slug: 'best-mahakal-bio-for-instagram', keywords: ['Mahakal bio for Instagram', 'Mahakal Bio'] },
  { slug: 'best-instagram-bio', keywords: ['best Instagram bio', 'best bio for Instagram'] },
  { slug: 'sigma-bio-for-instagram', keywords: ['sigma bio for Instagram', 'sigma bio'] },
  { slug: 'birthday-bio-for-instagram', keywords: ['birthday bio for Instagram'] },
  { slug: 'attractive-instagram-bio', keywords: ['attractive Instagram bio', 'attractive bio for Instagram', 'catchy Instagram bio', 'magnetic Instagram bio'] },
  { slug: 'interesting-bio-for-instagram', keywords: ['interesting bio for Instagram', 'creative bio for Instagram', 'cool and interesting bio'] },
  { slug: 'funny-instagram-bio', keywords: ['funny Instagram bio', 'funny bio'] },
  { slug: 'short-bio-for-instagram', keywords: ['short bio for Instagram', 'Short Instagram Bio for Girls', 'short bio'] },
  { slug: 'gangster-bio-for-instagram', keywords: ['gangster bio for Instagram', 'Gangster Bio For Instagram Copy And Paste', 'Instagram Bio For Gangster Boys', 'Best Gangster Bio For Instagram', 'Gangster Instagram Bio', 'Gangster Bio For Instagram For Boy'] },
  { slug: 'professional-instagram-bio', keywords: ['professional Instagram bio', 'professional bio'] },
  { slug: 'sad-bio-for-instagram', keywords: ['sad bio for Instagram', 'sad bio'] },
  { slug: 'gym-bio-for-instagram', keywords: ['gym bio for Instagram', 'Attitude Gym Bio for Instagram', 'Simple Gym Bio for Instagram', 'Stylish Gym Bio for Instagram', 'Fitness Bio for Instagram', 'Gym Bio For Instagram in English', 'Gym Lover Instagram Bio Ideas'] },
  { slug: 'vip-instagram-bio', keywords: ['VIP Instagram bio', 'VIP bio for Instagram', 'Instagram VIP Bio for Girls'] },
  { slug: 'cool-bio-for-instagram', keywords: ['cool bio for Instagram', 'cool Instagram bio', 'Cool Instagram Bio for Girls', 'cool and interesting bio for Instagram'] },
  { slug: 'cute-instagram-bio', keywords: ['cute Instagram bio', 'cute bio'] },
  { slug: 'classy-instagram-bio', keywords: ['classy Instagram bio', 'classy bio'] },
  { slug: 'emotional-instagram-bio', keywords: ['emotional Instagram bio', 'emotional bio'] },
  { slug: 'great-instagram-bio', keywords: ['great Instagram bio', 'great bio'] },
  { slug: 'instagram-bio-captions', keywords: ['Instagram bio captions', 'bio captions'] },
  { slug: 'instagram-bio-inspiration', keywords: ['Instagram bio inspiration', 'bio inspiration'] },
  { slug: 'king-and-queen-bio', keywords: ['king and queen bio', 'king bio', 'queen bio'] },
  { slug: 'photography-instagram-bio', keywords: ['photography Instagram bio', 'photography bio'] },
  { slug: 'unique-bio-for-instagram', keywords: ['unique bio for Instagram', 'unique Instagram bio'] },
];

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function processFile(filePath) {
  const fileName = path.basename(filePath, '.mdx');
  const content = fs.readFileSync(filePath, 'utf8');
  
  const firstIdx = content.indexOf('---');
  const secondIdx = content.indexOf('---', firstIdx + 3);
  if (firstIdx === -1 || secondIdx === -1) return;
  
  const frontmatter = content.substring(0, secondIdx + 3);
  const body = content.substring(secondIdx + 3);
  
  let changeCount = 0;
  
  const lines = body.split('\n');
  const processedLines = lines.map((line) => {
    let processedLine = line;
    
    // 1. Fix [/blog/] placeholders
    const blogLinkRegex = /\[(\*?\*?)([^\]]+)\1\]\(\/blog\/?\)/gi;
    processedLine = processedLine.replace(blogLinkRegex, (match, stars, text) => {
      let bestSlug = null;
      let lowerText = text.toLowerCase();
      
      // try to find matching slug
      for (const map of LINK_MAP) {
        for (const kw of map.keywords) {
          if (lowerText.includes(kw.toLowerCase())) {
            bestSlug = map.slug;
            break;
          }
        }
        if (bestSlug) break;
      }
      
      // if it's "stylish name", leave it as /blog/ for now
      if (lowerText.includes('stylish name')) {
        return match;
      }

      if (bestSlug) {
        if (bestSlug === fileName) {
          // self link -> remove link
          changeCount++;
          return `${stars}${text}${stars}`;
        } else {
          // update link
          changeCount++;
          return `[${stars}${text}${stars}](/${bestSlug})`;
        }
      }
      
      // Default fallback: if no slug found, just remove the link if it's /blog/ to avoid broken links
      // Or we can leave it as /blog/ if it's meant to go to the blog root. Let's leave it.
      return match;
    });

    // 2. Link unlinked bold text
    const unlinkedBoldRegex = /(?<!\[)\*\*([^*]+)\*\*(?!\]\()/g;
    processedLine = processedLine.replace(unlinkedBoldRegex, (match, text) => {
      let bestSlug = null;
      let lowerText = text.toLowerCase();
      
      for (const map of LINK_MAP) {
        if (map.slug === fileName) continue; // no self link
        for (const kw of map.keywords) {
          if (lowerText.includes(kw.toLowerCase())) {
            bestSlug = map.slug;
            break;
          }
        }
        if (bestSlug) break;
      }

      if (bestSlug) {
        changeCount++;
        return `[**${text}**](/${bestSlug})`;
      }
      return match;
    });

    return processedLine;
  });
  
  if (changeCount > 0) {
    const newContent = frontmatter + processedLines.join('\n');
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ ${fileName}.mdx — Fixed ${changeCount} links/placeholders`);
  }
}

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'));
files.forEach(f => processFile(path.join(POSTS_DIR, f)));
console.log('Done fixing blog links.');
