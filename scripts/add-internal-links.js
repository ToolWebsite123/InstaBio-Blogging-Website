const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');

// Keyword to slug mapping. Ordered from most specific to least specific.
// For each post, we define phrases that should link TO that post.
const LINK_MAP = [
  // === SPECIFIC COMPOUND PHRASES FIRST ===
  
  // Aesthetic Bio for Girl
  { keywords: [
    'aesthetic bio for Instagram for girl', 'aesthetic bio for instagram for girl',
    'aesthetic Instagram bio for girl', 'aesthetic instagram bio for girl',
    'aesthetic bio for Instagram for girls', 'aesthetic bio for instagram for girls',
    'Aesthetic Bio for Instagram for Girl', 'Aesthetic Bio For Instagram For Girl',
    'aesthetic bio for girls', 'aesthetic bio for girl',
  ], slug: 'aesthetic-bio-for-instagram-for-girl' },

  // Bio Style Girl
  { keywords: [
    'Instagram bio style girl', 'instagram bio style girl',
    'Instagram Bio Style Girl', 'Instagram Bio style girl',
    'bio style girl', 'bio style for girl',
  ], slug: 'instagram-bio-style-girl' },

  // Best Instagram Bio for Boys (BEFORE generic "best Instagram bio")
  { keywords: [
    'best Instagram bio for boys', 'best instagram bio for boys',
    'Best Instagram Bio for Boys', 'Best Instagram Bio For Boys',
    'Instagram bio for boys', 'instagram bio for boys',
    'Instagram Bio for Boys', 'Instagram Bio For Boys',
    'Instagram bios for boys', 'instagram bios for boys',
    'bio for boys',
  ], slug: 'best-instagram-bio-for-boys' },

  // Best Instagram Bio for Girls (BEFORE generic "best Instagram bio")  
  { keywords: [
    'best Instagram bio for girls', 'best instagram bio for girls',
    'Best Instagram Bio for Girls', 'Best Instagram Bio For Girls',
    'Instagram bio for girls', 'instagram bio for girls',
    'Instagram Bio for Girls', 'Instagram Bio For Girls',
    'Instagram bios for girls', 'instagram bios for girls',
    'bio for girls',
  ], slug: 'best-instagram-bio-for-girls' },

  // Free Fire / Gaming bio
  { keywords: [
    'free fire bio for Instagram', 'free fire bio for instagram',
    'Free Fire Bio for Instagram', 'Free Fire Bio For Instagram',
    'free fire Instagram bio', 'free fire instagram bio',
    'free fire bio', 'gaming bio for Instagram', 'gaming bio for instagram',
    'gaming bio',
  ], slug: 'best-free-fire-bio-for-instagram' },

  // Islamic bio
  { keywords: [
    'Islamic bio for Instagram', 'islamic bio for instagram',
    'Islamic Bio for Instagram', 'Islamic Bio For Instagram',
    'Islamic Instagram bio', 'islamic instagram bio',
    'Islamic bio', 'islamic bio', 'Muslim bio for Instagram',
  ], slug: 'best-islamic-bio-for-instagram' },

  // Love bio
  { keywords: [
    'love bio for Instagram', 'love bio for instagram',
    'Love Bio for Instagram', 'Love Bio For Instagram',
    'love Instagram bio', 'love instagram bio',
    'romantic bio for Instagram', 'romantic bio for instagram',
    'love bio', 'romantic bio',
  ], slug: 'best-love-bio-for-instagram' },

  // Mahakal bio
  { keywords: [
    'Mahakal bio for Instagram', 'mahakal bio for instagram',
    'Mahakal Bio for Instagram', 'Mahakal Bio For Instagram',
    'Mahakal Instagram bio', 'mahakal instagram bio',
    'Mahakal bio', 'mahakal bio',
  ], slug: 'best-mahakal-bio-for-instagram' },

  // Best Instagram Bio (generic - AFTER boys/girls)
  { keywords: [
    'best Instagram bio', 'best instagram bio',
    'Best Instagram Bio', 'Best Instagram bio',
    'best bio for Instagram', 'best bio for instagram',
    'best bios for Instagram', 'best bios for instagram',
  ], slug: 'best-instagram-bio' },

  // Sigma
  { keywords: [
    'sigma bio for Instagram', 'sigma bio for instagram',
    'Sigma Bio for Instagram', 'Sigma Bio For Instagram',
    'sigma Instagram bio', 'sigma instagram bio',
    'sigma bio',
  ], slug: 'sigma-bio-for-instagram' },

  // Birthday
  { keywords: [
    'birthday bio for Instagram', 'birthday bio for instagram',
    'Birthday Bio for Instagram', 'Birthday Bio For Instagram',
    'birthday Instagram bio', 'birthday instagram bio',
    'birthday bio',
  ], slug: 'birthday-bio-for-instagram' },

  // Attractive
  { keywords: [
    'attractive Instagram bio', 'attractive instagram bio',
    'Attractive Instagram Bio', 'Attractive Instagram bio',
    'attractive bio for Instagram', 'attractive bio for instagram',
    'attractive bio',
  ], slug: 'attractive-instagram-bio' },

  // Interesting
  { keywords: [
    'interesting bio for Instagram', 'interesting bio for instagram',
    'Interesting Bio for Instagram', 'Interesting Bio For Instagram',
    'interesting Instagram bio', 'interesting instagram bio',
    'interesting bio',
  ], slug: 'interesting-bio-for-instagram' },

  // Funny
  { keywords: [
    'funny Instagram bio', 'funny instagram bio',
    'Funny Instagram Bio', 'Funny Instagram bio',
    'funny bio for Instagram', 'funny bio for instagram',
    'funny Instagram bios', 'funny instagram bios',
    'funny bio',
  ], slug: 'funny-instagram-bio' },

  // Short Bio
  { keywords: [
    'short bio for Instagram', 'short bio for instagram',
    'Short Bio for Instagram', 'Short Bio For Instagram',
    'short Instagram bio', 'short instagram bio',
    'short bio',
  ], slug: 'short-bio-for-instagram' },

  // Gangster
  { keywords: [
    'gangster bio for Instagram', 'gangster bio for instagram',
    'Gangster Bio for Instagram', 'Gangster Bio For Instagram',
    'gangster Instagram bio', 'gangster instagram bio',
    'gangster bio',
  ], slug: 'gangster-bio-for-instagram' },

  // Professional
  { keywords: [
    'professional Instagram bio', 'professional instagram bio',
    'Professional Instagram Bio', 'Professional Instagram bio',
    'professional bio for Instagram', 'professional bio for instagram',
    'professional bio',
  ], slug: 'professional-instagram-bio' },

  // Sad
  { keywords: [
    'sad bio for Instagram', 'sad bio for instagram',
    'Sad Bio for Instagram', 'Sad Bio For Instagram',
    'sad Instagram bio', 'sad instagram bio',
    'sad bio',
  ], slug: 'sad-bio-for-instagram' },

  // Gym
  { keywords: [
    'gym bio for Instagram', 'gym bio for instagram',
    'Gym Bio for Instagram', 'Gym Bio For Instagram',
    'gym Instagram bio', 'gym instagram bio',
    'fitness bio for Instagram', 'fitness bio for instagram',
    'gym bio', 'fitness bio',
  ], slug: 'gym-bio-for-instagram' },

  // VIP
  { keywords: [
    'VIP Instagram bio', 'vip Instagram bio', 'VIP instagram bio', 'vip instagram bio',
    'VIP bio for Instagram', 'vip bio for Instagram',
    'VIP Bio for Instagram', 'VIP Bio For Instagram',
    'VIP bio', 'vip bio',
  ], slug: 'vip-instagram-bio' },

  // Cool
  { keywords: [
    'cool bio for Instagram', 'cool bio for instagram',
    'Cool Bio for Instagram', 'Cool Bio For Instagram',
    'cool Instagram bio', 'cool instagram bio',
    'cool bio',
  ], slug: 'cool-bio-for-instagram' },

  // Cute
  { keywords: [
    'cute Instagram bio', 'cute instagram bio',
    'Cute Instagram Bio', 'Cute Instagram bio',
    'cute bio for Instagram', 'cute bio for instagram',
    'cute Instagram bios', 'cute instagram bios',
    'cute bio',
  ], slug: 'cute-instagram-bio' },

  // Classy
  { keywords: [
    'classy Instagram bio', 'classy instagram bio',
    'Classy Instagram Bio', 'Classy Instagram bio',
    'classy bio for Instagram', 'classy bio for instagram',
    'classy bio',
  ], slug: 'classy-instagram-bio' },

  // Emotional
  { keywords: [
    'emotional Instagram bio', 'emotional instagram bio',
    'Emotional Instagram Bio', 'Emotional Instagram bio',
    'emotional bio for Instagram', 'emotional bio for instagram',
    'emotional bio',
  ], slug: 'emotional-instagram-bio' },

  // Great
  { keywords: [
    'great Instagram bio', 'great instagram bio',
    'Great Instagram Bio', 'Great Instagram bio',
    'great bio for Instagram', 'great bio for instagram',
    'great bio',
  ], slug: 'great-instagram-bio' },

  // Bio Captions
  { keywords: [
    'Instagram bio captions', 'instagram bio captions',
    'Instagram Bio Captions', 'Instagram Bio captions',
    'bio captions for Instagram', 'bio captions for instagram',
    'bio captions',
  ], slug: 'instagram-bio-captions' },

  // Bio Inspiration
  { keywords: [
    'Instagram bio inspiration', 'instagram bio inspiration',
    'Instagram Bio Inspiration', 'Instagram Bio inspiration',
    'bio inspiration for Instagram', 'bio inspiration for instagram',
    'bio inspiration',
  ], slug: 'instagram-bio-inspiration' },

  // King and Queen
  { keywords: [
    'king and queen bio', 'King and Queen bio',
    'King and Queen Bio', 'king and queen Bio',
    'king bio for Instagram', 'queen bio for Instagram',
    'king bio', 'queen bio',
  ], slug: 'king-and-queen-bio' },

  // Photography
  { keywords: [
    'photography Instagram bio', 'photography instagram bio',
    'Photography Instagram Bio', 'Photography Instagram bio',
    'photography bio for Instagram', 'photography bio for instagram',
    'photography bio',
  ], slug: 'photography-instagram-bio' },

  // Unique
  { keywords: [
    'unique bio for Instagram', 'unique bio for instagram',
    'Unique Bio for Instagram', 'Unique Bio For Instagram',
    'unique Instagram bio', 'unique instagram bio',
    'unique bio',
  ], slug: 'unique-bio-for-instagram' },
];

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function processFile(filePath) {
  const fileName = path.basename(filePath, '.mdx');
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Split content: frontmatter is between first two ---
  const firstIdx = content.indexOf('---');
  const secondIdx = content.indexOf('---', firstIdx + 3);
  if (firstIdx === -1 || secondIdx === -1) {
    console.log(`Skipping ${fileName}: No frontmatter found`);
    return;
  }
  
  const frontmatter = content.substring(0, secondIdx + 3);
  const body = content.substring(secondIdx + 3);
  
  let changeCount = 0;
  
  // Process line by line
  const lines = body.split('\n');
  const processedLines = lines.map((line) => {
    const trimmed = line.trim();
    // Skip non-paragraph lines
    if (!trimmed) return line;
    if (trimmed.startsWith('#')) return line;
    if (trimmed.startsWith('<')) return line;
    if (trimmed === '---') return line;
    
    let processedLine = line;
    
    // Track which slugs we've already linked on this line to avoid double-linking
    const linkedSlugs = new Set();
    
    for (const mapping of LINK_MAP) {
      // Skip linking to self
      if (mapping.slug === fileName) continue;
      if (linkedSlugs.has(mapping.slug)) continue;
      
      for (const keyword of mapping.keywords) {
        // Check if this keyword exists in the line at all (case-sensitive)
        if (!processedLine.includes(keyword)) continue;
        
        // 1) Already correctly linked - [**keyword**](/slug) or [keyword](/slug)
        const correctLinkRegex = new RegExp(
          `\\[\\*{0,2}${escapeRegex(keyword)}\\*{0,2}\\]\\(/${escapeRegex(mapping.slug)}/?\\)`,
          'g'
        );
        if (correctLinkRegex.test(processedLine)) {
          linkedSlugs.add(mapping.slug);
          break; // This keyword is already correctly linked
        }
        
        // 2) Wrongly linked - [**keyword**](/blog/) or [**keyword**](/wrong-slug/)
        const wrongLinkBoldRegex = new RegExp(
          `\\[\\*\\*${escapeRegex(keyword)}\\*\\*\\]\\(/[^)]*\\)`,
          'g'
        );
        if (wrongLinkBoldRegex.test(processedLine)) {
          processedLine = processedLine.replace(wrongLinkBoldRegex, `[**${keyword}**](/${mapping.slug})`);
          changeCount++;
          linkedSlugs.add(mapping.slug);
          break;
        }

        // 2b) Wrongly linked without bold
        const wrongLinkRegex = new RegExp(
          `\\[${escapeRegex(keyword)}\\]\\(/[^)]*\\)`,
          'g'
        );
        if (wrongLinkRegex.test(processedLine)) {
          processedLine = processedLine.replace(wrongLinkRegex, `[${keyword}](/${mapping.slug})`);
          changeCount++;
          linkedSlugs.add(mapping.slug);
          break;
        }
        
        // 3) Bold but unlinked - **keyword** (not inside a link)
        const boldUnlinkedRegex = new RegExp(
          `(?<!\\[)\\*\\*${escapeRegex(keyword)}\\*\\*(?!\\]\\()`,
          'g'
        );
        if (boldUnlinkedRegex.test(processedLine)) {
          // Only link the first occurrence
          processedLine = processedLine.replace(boldUnlinkedRegex, `[**${keyword}**](/${mapping.slug})`);
          changeCount++;
          linkedSlugs.add(mapping.slug);
          break;
        }
        
        // 4) Plain text mention (not inside link, not bold) - only in intro/outro paragraphs
        // Be more careful here - use word boundaries
        const plainRegex = new RegExp(
          `(?<!\\[\\*{0,2})(?<!\\/)(?<![\\w])${escapeRegex(keyword)}(?![\\w])(?!\\*{0,2}\\]\\()(?!\\))`,
          'i' // case insensitive for plain text
        );
        const match = processedLine.match(plainRegex);
        if (match) {
          // Only link the FIRST occurrence of plain text
          const actualMatch = match[0];
          processedLine = processedLine.replace(actualMatch, `[**${actualMatch}**](/${mapping.slug})`);
          changeCount++;
          linkedSlugs.add(mapping.slug);
          break;
        }
      }
    }
    
    return processedLine;
  });
  
  if (changeCount > 0) {
    const newContent = frontmatter + processedLines.join('\n');
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ ${fileName}.mdx — ${changeCount} links updated/added`);
  } else {
    console.log(`⏭️  ${fileName}.mdx — no changes needed`);
  }
}

// Main
console.log('🔗 Starting internal linking scan...\n');

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'));
console.log(`Found ${files.length} MDX files\n`);

for (const file of files) {
  processFile(path.join(POSTS_DIR, file));
}

console.log('\n✅ Internal linking complete!');
