const fs = require('fs');
const path = require('path');

const categories = [
    { name: 'Unique Bio for Instagram 2026', file: '01_unique_bio_2026.html' },
    { name: 'Unique Bio for Instagram for Boys', file: '02_unique_boys.html' },
    { name: 'Unique Bio for Instagram for Girls', file: '03_unique_girls.html' },
    { name: 'Unique Attitude Bio for Instagram', file: '04_unique_attitude.html' },
    { name: 'Unique Funny Bio for Instagram', file: '05_unique_funny.html' },
    { name: 'Unique Short Bio for Instagram', file: '06_unique_short.html' },
    { name: 'Unique Deep Bio for Instagram', file: '07_unique_deep.html' },
    { name: 'Unique Aesthetic Bio for Instagram', file: '08_unique_aesthetic.html' },
    { name: 'Unique Motivational Bio for Instagram', file: '09_unique_motivational.html' },
    { name: 'Unique Bio for Instagram for Students', file: '10_unique_students.html' },
    { name: 'Unique Savage Bio for Instagram', file: '11_unique_savage.html' },
    { name: 'Unique Simple Bio for Instagram', file: '12_unique_simple.html' },
    { name: 'Unique VIP Bio for Instagram', file: '13_unique_vip.html' },
    { name: 'Unique Bio for Instagram with Emoji', file: '14_unique_with_emoji.html' },
    { name: 'Unique Bio for Instagram in English', file: '15_unique_english.html' },
    { name: 'Unique Stylish Bio for Instagram', file: '16_unique_stylish.html' },
    { name: 'Unique One Liner Bio for Instagram', file: '17_unique_one_liner.html' },
    { name: 'Unique Bio for Instagram for Best Friends', file: '18_unique_best_friends.html' }
];

const content = fs.readFileSync(path.join(__dirname, 'temp_unique_bios.txt'), 'utf8');
const lines = content.split('\n').map(l => l.trim());

let mdx = `---
title: "Unique Bio for Instagram 2026 – Creative & Original"
excerpt: "Stop copying the same old bios! Explore 999+ unique Instagram bios for boys & girls – attitude, aesthetic, funny & deep. Find a bio that is genuinely one of a kind!"
seoTitle: "Unique Bio for Instagram 2026 – Creative & Original"
seoDescription: "Stop copying the same old bios! Explore 999+ unique Instagram bios for boys & girls – attitude, aesthetic, funny & deep. Find a bio that is genuinely one of a kind!"
date: "2026-06-12"
category: "Instagram Bios"
image: "/images/boy_bio_3.jpeg"
readTime: "12 min read"
---

Hey everyone! Are you tired of copying the same Instagram bio that thousands of other people are already using? Are you searching for a genuinely unique bio for Instagram that makes your profile stand out the moment someone lands on it?

We have assembled 999+ unique Instagram bios spanning every personality type, every creative energy, and every original life perspective imaginable. From unique bios for boys to unique bios for girls, from unique attitude bios to unique aesthetic bios, from unique funny bios to unique deep bios, from unique short one-liners to unique full creative paragraphs — every category is here and every single bio is 100% original. Everything is freshly written and ready to use immediately.

<TOC />

`;

let currentCategory = null;
let isParsingBio = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) {
        if (isParsingBio) mdx += '\n';
        continue;
    }
    
    const cat = categories.find(c => line === c.name);
    if (cat) {
        if (currentCategory !== null) {
            mdx += '</BioGrid>\n\n';
        }
        currentCategory = cat;
        mdx += `## ${cat.name}\n\n`;
        mdx += `<BioBanner src="/All%20instagram%20bio/Unique%20insta%20bio/${cat.file}" title="${cat.name}" />\n\n`;
        mdx += '<BioGrid>\n';
        isParsingBio = true;
        continue;
    }
    
    if (isParsingBio) {
        let escapedText = line.replace(/"/g, '&quot;');
        mdx += `<BioCard text="${escapedText}" />\n`;
    }
}

if (currentCategory !== null) {
    mdx += '</BioGrid>\n\n';
}

fs.writeFileSync(path.join(__dirname, 'content/posts/unique-bio-for-instagram.mdx'), mdx);
console.log('Unique MDX generated successfully!');
