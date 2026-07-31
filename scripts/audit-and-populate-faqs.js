const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const POSTS_DIR = path.join(__dirname, "..", "content", "posts");

const POST_FAQS = {
  "aesthetic-bio-for-instagram-for-girl": [
    { question: "What elements make an Instagram bio aesthetic for girls?", answer: "An aesthetic bio uses soft Unicode fonts, minimalist spacing, pastel emojis (🌱, ✨, 🌸), and brief personal mantras under 100 characters." },
    { question: "Can I use custom fonts in an aesthetic Instagram bio?", answer: "Yes, you can copy formatted Unicode fonts directly from Instabiogen.online and paste them into your Instagram edit profile page." },
    { question: "How long should an aesthetic Instagram bio be?", answer: "Keep aesthetic bios between 40 and 120 characters spanning 2 to 4 clean lines for optimal mobile readability." }
  ],
  "attractive-instagram-bio": [
    { question: "How do I make my Instagram bio attractive to new visitors?", answer: "Use a clear profile headline, a 1-line value hook, 2–3 relevant emojis, and a clear call-to-action link." },
    { question: "What is the secret to an eye-catching bio?", answer: "Visual contrast—combining bold keywords, clean line breaks, and selective emoji accents instead of plain wall-of-text blocks." },
    { question: "How many characters fit in an Instagram bio?", answer: "Instagram limits bio text to exactly 150 characters, including spaces and emojis." }
  ],
  "best-free-fire-bio-for-instagram": [
    { question: "What are the best Free Fire bio styles for Instagram?", answer: "Popular styles include UID highlight bios, guild rank tags (Pro Gamer, Rank Pusher), and sharp gaming attitude quotes." },
    { question: "How can I display my Free Fire UID in my bio?", answer: "Add a line like 🎮 FF UID: 123456789 | Guild Leader to make your gaming profile easy to find for squad invites." },
    { question: "What emojis fit a Free Fire Instagram bio?", answer: "Use gaming and fire symbols like 🎯, ⚡, 🏆, 🔥, 🔫, and 👑." }
  ],
  "best-instagram-bio-for-boys": [
    { question: "What is the best bio for Instagram for boys in 2026?", answer: "A winning bio balances confidence, personal passion (fitness, coding, gaming), and clean vertical line formatting." },
    { question: "Should boys use emojis in their Instagram bio?", answer: "Yes, 2 to 4 bold emojis like 🚀, 💼, ⚡, or 📍 add visual structure without cluttering your profile." },
    { question: "How do I make my bio sound confident but humble?", answer: "Focus on goals and real passions (e.g., Building my dream | 🏋️ Fitness | 📍 NYC) rather than boastful claims." }
  ],
  "best-instagram-bio-for-girls": [
    { question: "How do I write a stylish Instagram bio for girls?", answer: "Combine a warm intro tagline, clean line breaks, subtle emojis (✨, 🌷), and a link to your store or blog." },
    { question: "What bio font looks best on Instagram for girls?", answer: "Serif, script, and small-caps Unicode fonts created on Instabiogen.online offer the cleanest aesthetic appearance." },
    { question: "Can I add custom symbols to my girl bio?", answer: "Yes, decorative symbols like ✦, 𓆩♡𓆪, and 🌸 can be pasted directly into Instagram." }
  ],
  "best-islamic-bio-for-instagram": [
    { question: "What are meaningful Islamic bio ideas for Instagram?", answer: "Include Quranic verses (e.g., 'Alhamdulillah for everything'), Hadith quotes, or expressions of gratitude and faith." },
    { question: "Can I write an Islamic bio in Arabic script?", answer: "Yes, Instagram fully supports Arabic Unicode characters like 'الحمد لله' and 'ما شاء الله'." },
    { question: "What emojis suit an Islamic Instagram bio?", answer: "Respectful choices include 🕋, 🌙, 📖, ✨, and 🤲." }
  ],
  "best-love-bio-for-instagram": [
    { question: "How do couples display love bios on Instagram?", answer: "Include anniversary dates (e.g., 💍 12.05.2024), matching taglines, or tag your partner's handle directly in the bio." },
    { question: "What is a romantic 1-line bio for Instagram?", answer: "Short lines like 'You are my favorite notification ❤️' or 'Building a life together 💑' work best." },
    { question: "Can I use matching bios with my partner?", answer: "Yes, split-sentence bios (e.g., Part 1: 'He has my heart' / Part 2: 'She has my soul') are very popular." }
  ],
  "best-mahakal-bio-for-instagram": [
    { question: "What is a Mahakal bio for Instagram?", answer: "A Mahakal bio expresses devotion to Lord Shiva with chants like 'Mahadev Bhakt 🕉️' or 'Har Har Mahadev'." },
    { question: "What symbols are used in Mahakal bios?", answer: "Common symbols include 🔱 (Trishul), 🕉️ (Om), 🔱⚡, and 🚩." },
    { question: "Is Mahakal bio popular among youth?", answer: "Yes, spiritual attitude bios combining Mahakal quotes with stylish typography are widely used across India and Nepal." }
  ],
  "birthday-bio-for-instagram": [
    { question: "How do I announce my birthday in my Instagram bio?", answer: "Add a countdown line like 'Level 22 unlocked on Oct 14 🎂' or 'Official Birthday: 15th Aug 🎉'." },
    { question: "What emojis fit a birthday bio?", answer: "Use festive emojis like 🎂, 🎈, 🥂, 🎉, 🎁, and 👑." },
    { question: "When should I update my birthday bio?", answer: "Update it 1–2 weeks before your birthday for a countdown, or set it on your birth date for celebrations." }
  ],
  "cool-bio-for-instagram": [
    { question: "What defines a cool Instagram bio?", answer: "A cool bio uses clever wordplay, short 1-line statements, and relaxed confidence rather than long paragraphs." },
    { question: "How do I make a cool bio in under 50 characters?", answer: "Use punchy phrases like 'Creating my own sunshine ⚡' or 'Simplicity is key 🗝️'." },
    { question: "Do cool bios work for business accounts?", answer: "Yes, concise taglines paired with professional brand value statements boost engagement." }
  ],
  "cute-instagram-bio": [
    { question: "What makes an Instagram bio cute?", answer: "Cute bios use playful phrasing, sweet quotes, and friendly emojis (🧸, 🌸, 🍬, ✨)." },
    { question: "Can cute bios be short?", answer: "Yes, 3-to-5 word cute bios like 'Chasing sunsets & smiles 🌅' are extremely effective." },
    { question: "What fonts work best for cute bios?", answer: "Rounded and handwritten-style Unicode fonts give a soft, approachable look." }
  ],
  "funny-instagram-bio": [
    { question: "How do I write a funny Instagram bio?", answer: "Use self-deprecating humor, relatable daily struggles (e.g., '1% talent, 99% caffeine'), or unexpected jokes." },
    { question: "What are some short funny bio ideas?", answer: "Examples include: 'I put the ELITE in defeat 🏆' and 'Professional overthinker 🧠'." },
    { question: "Will a funny bio help gain followers?", answer: "Yes, humor creates immediate rapport and makes your profile memorable to visitors." }
  ],
  "gangster-bio-for-instagram": [
    { question: "What is a gangster bio for Instagram?", answer: "A gangster bio uses bold attitude statements, loyalty quotes, and street-style fonts to convey high confidence." },
    { question: "What emojis match a gangster bio?", answer: "Popular choices include 👑, 🥊, ♠️, 🎯, 🔥, and ⚡." },
    { question: "How long should a gangster attitude bio be?", answer: "Keep it under 100 characters in 2–3 sharp bulleted lines." }
  ],
  "gym-bio-for-instagram": [
    { question: "What should be included in a gym Instagram bio?", answer: "Include your fitness goals, PR metrics (e.g., 200kg Deadlift), training discipline, and motivational quotes." },
    { question: "What emojis fit a fitness bio?", answer: "Use 🏋️‍♂️, 💪, 🥗, ⏱️, 💥, and 🏆." },
    { question: "Should I mention my personal trainer status in my bio?", answer: "Yes, add your certification (e.g., 'NASM Certified PT | DM for online coaching') to attract clients." }
  ],
  "instagram-bio-inspiration": [
    { question: "Where can I find inspiration for my Instagram bio?", answer: "Browse categories on Instabiogen.online by personality, interest, font style, and niche." },
    { question: "How often should I change my bio for inspiration?", answer: "Refreshing your bio every 1 to 3 months keeps your profile dynamic for returning followers." },
    { question: "How do I format inspirational quotes in a bio?", answer: "Place quotes between quotation marks or italic Unicode text, accompanied by a single complementary emoji." }
  ],
  "instagram-bio-style-girl": [
    { question: "What is the most stylish Instagram bio layout for girls?", answer: "A centered or left-aligned 3-line layout: Line 1 (Name/Vibe), Line 2 (Interests), Line 3 (Location/Link)." },
    { question: "How can I copy stylish fonts into my Instagram profile?", answer: "Generate your text on Instabiogen.online, tap copy, open Instagram Edit Profile, and paste directly." },
    { question: "Do stylish fonts work on all mobile devices?", answer: "Standard Unicode fonts generated on Instabiogen.online are compatible across iOS, Android, and Web browsers." }
  ],
  "interesting-bio-for-instagram": [
    { question: "What makes an Instagram bio interesting?", answer: "An interesting bio sparks curiosity through unique hobbies, intriguing questions, or unexpected facts." },
    { question: "How do I write an attention-grabbing first line?", answer: "Start with an unexpected personal statement like 'Collector of rare vinyl & rainy days 🌧️'." },
    { question: "How many lines should an interesting bio have?", answer: "3 to 4 short lines work best to maintain visual pace." }
  ],
  "king-and-queen-bio": [
    { question: "What is a King & Queen Instagram bio?", answer: "A bio theme celebrating royal attitude, self-confidence, and high standards for individual or couple profiles." },
    { question: "What emojis suit King & Queen bios?", answer: "Use 👑, 🏰, 💎, ⚔️, 🦁, and ⚜️." },
    { question: "Can singles use King and Queen bios?", answer: "Yes, 'King of my own world 👑' or 'Queen ruling her own life 👸' are popular single bios." }
  ],
  "photography-instagram-bio": [
    { question: "What should a photographer put in their Instagram bio?", answer: "Include your gear (e.g., Sony A7IV), photography niche (portrait, wedding, street), location, and booking link." },
    { question: "What emojis fit a photography bio?", answer: "Use 📸, 📷, 🎞️, 🌆, 🎨, and 📍." },
    { question: "Should I include my portfolio link in my photography bio?", answer: "Yes, always place your website or portfolio gallery link on the final line of your bio." }
  ],
  "professional-instagram-bio": [
    { question: "How do I write a professional Instagram bio for business?", answer: "State your job title, key achievement, value proposition, and a clear call-to-action (e.g., 'Book a call 👇')." },
    { question: "Should I use emojis in a professional bio?", answer: "Use 1–3 clean functional emojis like 💼, 📧, or 🌐 to organize information neatly." },
    { question: "What character limit applies to professional bios?", answer: "150 characters maximum, so keep every word targeted to your business offer." }
  ],
  "sad-bio-for-instagram": [
    { question: "What is a sad Instagram bio?", answer: "A bio expressing feelings of heartbreak, solitude, reflection, or emotional healing." },
    { question: "What emojis suit a sad bio?", answer: "Use subtle symbols like 🥀, 🖤, 🌧️, 🕊️, and 💔." },
    { question: "Can sad bios be short?", answer: "Yes, 1-line sad bios like 'Silence speaks when words fail 🌧️' carry strong emotional resonance." }
  ],
  "short-bio-for-instagram": [
    { question: "Why choose a short Instagram bio?", answer: "Short bios (under 50 characters) load faster visually, look clean on mobile, and deliver high impact." },
    { question: "What are examples of 1-word or 1-line short bios?", answer: "Examples: 'Unstoppable ⚡', 'Less perfection, more authenticity ✨', and 'Just getting started 🚀'." },
    { question: "Do short bios increase link clicks?", answer: "Yes, because minimal text draws direct visual attention to the link below it." }
  ],
  "sigma-bio-for-instagram": [
    { question: "What is a Sigma bio for Instagram?", answer: "A Sigma bio focuses on independence, quiet discipline, self-mastery, and goal-driven mindset." },
    { question: "What quotes fit a Sigma bio?", answer: "Quotes like 'Silent hustle, loud results 🤫' or 'Focusing on the mission 🎯' are ideal." },
    { question: "What emojis suit a Sigma bio?", answer: "Use 🐺, 🎯, 🤫, 💼, ⚡, and 🗿." }
  ],
  "unique-bio-for-instagram": [
    { question: "How do I make my Instagram bio unique?", answer: "Avoid generic quotes. Combine a distinct personal interest with custom font styling and custom layout." },
    { question: "Where can I find unique bio ideas?", answer: "Instabiogen.online features over 10,000 unique bios categorized by vibe, profession, and aesthetic." },
    { question: "Can custom Unicode fonts make a bio unique?", answer: "Yes, using distinct text styles makes your profile stand out visually in feed recommendations." }
  ],
  "vip-instagram-bio": [
    { question: "What is a VIP Instagram bio?", answer: "A VIP bio features premium formatting, royal symbols (👑, 💎), and high-status attitude statements." },
    { question: "What symbols are used in VIP bios?", answer: "Popular VIP symbols include 👑, 💎, 🔱, 🏆, ⚡, and 🌟." },
    { question: "How do I format a VIP bio for boys and girls?", answer: "Use uppercase headers, bulleted lines with premium symbols, and stylish Unicode fonts." }
  ]
};

function main() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  console.log(`Auditing ${files.length} MDX files...`);

  let updatedCount = 0;

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, "utf8");
    const parsed = matter(content);

    let modified = false;

    // 1. Ensure faqs exists and is populated
    if (!parsed.data.faqs || !Array.isArray(parsed.data.faqs) || parsed.data.faqs.length === 0) {
      if (POST_FAQS[slug]) {
        parsed.data.faqs = POST_FAQS[slug];
        modified = true;
      }
    }

    // 2. Ensure howTo exists for posts with step-by-step guidance
    if (!parsed.data.howTo) {
      parsed.data.howTo = [
        { name: "Step 1: Choose Your Bio Style", text: "Select a bio category and style from our collection that matches your personal vibe or brand." },
        { name: "Step 2: Customize & Format", text: "Add your name, custom Unicode fonts, emojis, and relevant line breaks using Instabiogen.online." },
        { name: "Step 3: Copy & Paste to Instagram", text: "Copy your formatted bio text, open Instagram Edit Profile, and paste directly into your bio field." }
      ];
      modified = true;
    }

    if (modified) {
      const updatedContent = matter.stringify(parsed.content, parsed.data);
      fs.writeFileSync(filePath, updatedContent, "utf8");
      updatedCount++;
      console.log(`Updated frontmatter for: ${slug}`);
    }
  }

  console.log(`Done! Updated ${updatedCount} MDX posts with structured FAQs and HowTo steps.`);
}

main();
