const fs = require('fs');
const path = require('path');

const targetDir = 'd:\\Project\\InstaBio-Blogging-Website';
const excludeDirs = ['node_modules', '.next', '.git', 'out'];

function replaceInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Case-insensitive replacement can be tricky, let's just do exact case or regex with case-insensitive
    // But since `instabiogen.online` can appear with capital I, let's replace case insensitively but preserving case if possible?
    // "Instabiogen.online" -> "Instabiogen.online"
    // "instabiogen.online" -> "instabiogen.online"
    
    // We can do this using a replacer function
    const newContent = content.replace(/instabio\.online/gi, (match) => {
      if (match === 'Instabiogen.online') return 'Instabiogen.online';
      if (match === 'instabiogen.online') return 'instabiogen.online';
      if (match === 'INSTABIOGEN.ONLINE') return 'INSTABIOGEN.ONLINE';
      return 'instabiogen.online'; // fallback
    });

    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) {
        traverse(fullPath);
      }
    } else {
      // Only process text files (js, jsx, ts, tsx, md, mdx, json, html, css, xml)
      const ext = path.extname(file);
      if (['.js', '.jsx', '.ts', '.tsx', '.md', '.mdx', '.json', '.html', '.css', '.xml', '.svg'].includes(ext) || file === '.env') {
        replaceInFile(fullPath);
      }
    }
  }
}

traverse(targetDir);
console.log('Done.');
