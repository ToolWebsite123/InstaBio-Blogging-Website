const fs = require('fs');
const path = require('path');

const postsDir = 'd:/Project/Instagram Bio Blog Website/content/posts';
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

files.forEach(file => {
    const filePath = path.join(postsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Regex to match consecutive BioCard lines
    // It matches lines starting with <BioCard and ending with />
    const regex = /(?:^<BioCard text=".*?" \/>\s*)+/gm;
    content = content.replace(regex, (match) => {
        return `<BioGrid>\n${match.trim()}\n</BioGrid>\n\n`;
    });
    
    fs.writeFileSync(filePath, content);
});
console.log('Processed ' + files.length + ' files.');
