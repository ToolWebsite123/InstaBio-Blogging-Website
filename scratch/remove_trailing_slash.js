const fs = require('fs');
const path = require('path');

// 1. Update scripts/generate-sitemap.js
const sitemapScriptPath = 'd:\\Project\\InstaBio-Blogging-Website\\scripts\\generate-sitemap.js';
if (fs.existsSync(sitemapScriptPath)) {
  let content = fs.readFileSync(sitemapScriptPath, 'utf8');
  content = content.replace(
    /function pageUrl\(path\) \{[\s\S]*?\}/,
    `function pageUrl(path) {
  if (path === "/") return BASE_URL;
  return \`\${BASE_URL}\${path.endsWith("/") ? path.slice(0, -1) : path}\`;
}`
  );
  fs.writeFileSync(sitemapScriptPath, content, 'utf8');
  console.log('Updated generate-sitemap.js');
}

// 2. Update canonical links in app files
const appDir = 'd:\\Project\\InstaBio-Blogging-Website\\app';

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      traverse(fullPath);
    } else if (file === 'page.tsx' || file === 'layout.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      // regex to match canonical: "/something/" or `/something/`
      // We want to replace canonical: "/some/" with canonical: "/some"
      // Note: canonical: "/" should probably stay as is or become "" but wait, nextjs alternates canonical expects a valid path.
      // Usually canonical: "/" is correct for home page.
      // Let's explicitly replace specific ones
      
      // Match `canonical: "/path/"` -> `canonical: "/path"`
      const newContent = content.replace(/canonical:\s*["'](\/[^"']+)["']/g, (match, p1) => {
        if (p1 === '/') return match; // Keep canonical: "/" as is
        if (p1.endsWith('/')) {
          modified = true;
          return `canonical: "${p1.slice(0, -1)}"`;
        }
        return match;
      });
      
      // Match `canonical: \`/path/\`` -> `canonical: \`/path\``
      const newContent2 = newContent.replace(/canonical:\s*`(\/[^`]+)`/g, (match, p1) => {
        if (p1 === '/') return match;
        if (p1.endsWith('/')) {
          modified = true;
          return `canonical: \`${p1.slice(0, -1)}\``;
        }
        return match;
      });

      if (modified) {
        fs.writeFileSync(fullPath, newContent2, 'utf8');
        console.log(`Updated canonical in ${fullPath}`);
      }
    }
  }
}

traverse(appDir);

console.log('Done fixing trailing slashes.');
