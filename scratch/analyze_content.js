const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = 'd:\\Project\\InstaBio-Blogging-Website\\content\\posts';
const constantsPath = 'd:\\Project\\InstaBio-Blogging-Website\\lib\\constants.ts';

console.log("Analyzing MDX files for title, description, and images...\n");

let mdxErrors = 0;
let mdxTotal = 0;

if (fs.existsSync(postsDir)) {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));
  files.forEach(file => {
    mdxTotal++;
    const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const { data } = matter(content);
    
    let hasError = false;
    let errors = [];

    if (!data.title) {
      hasError = true;
      errors.push("Missing 'title'");
    }
    if (!data.seoTitle) {
      hasError = true;
      errors.push("Missing 'seoTitle'");
    }
    if (!data.seoDescription) {
      hasError = true;
      errors.push("Missing 'seoDescription'");
    }
    if (!data.image) {
      hasError = true;
      errors.push("Missing 'image'");
    }

    if (hasError) {
      mdxErrors++;
      console.log(`[MDX] ${file}: ${errors.join(', ')}`);
    }
  });
  console.log(`Checked ${mdxTotal} MDX files. Found errors in ${mdxErrors} files.\n`);
}

console.log("Analyzing constants.ts (ALL_STORIES)...\n");

const constantsContent = fs.readFileSync(constantsPath, 'utf8');
const storiesRegex = /id:\s*'[^']+',\s*title:\s*'[^']+',\s*image:\s*'[^']+',\s*tag:\s*'[^']+',\s*slug:\s*'[^']+'/g;

// A simpler way: we can just check if any story is missing image or title.
// Actually, let's load it by compiling it or just regexing.
let constantsMatch;
let missingInConstants = 0;
const blocks = constantsContent.split('id:');
blocks.shift(); // remove first part before the first id
blocks.forEach((block, index) => {
  if (!block.includes('title:')) {
    console.log(`[Constants] Story ${index + 1} is missing 'title'`);
    missingInConstants++;
  }
  if (!block.includes('image:')) {
    console.log(`[Constants] Story ${index + 1} is missing 'image'`);
    missingInConstants++;
  }
});
console.log(`Checked ALL_STORIES in constants.ts. Found ${missingInConstants} errors.\n`);

console.log("Analysis Complete.");
