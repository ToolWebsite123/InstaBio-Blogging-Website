const fs = require('fs');
const path = require('path');

const dir = 'd:/Project/InstaBio-Blogging-Website/content/posts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

files.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = c.split('\n');
  const textLines = lines.filter(l => {
    const t = l.trim();
    return t && !t.startsWith('#') && !t.startsWith('<') && t !== '---' && !t.startsWith('---');
  });
  if (textLines.length > 0) {
    console.log(`\n=== ${f} (${textLines.length} text lines) ===`);
    textLines.forEach(l => console.log(l.substring(0, 250)));
  }
});
