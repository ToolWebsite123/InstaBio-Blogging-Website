const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "..", "content", "posts");

function fixYamlIndentation() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  console.log(`Fixing YAML indentation for ${files.length} MDX posts...`);

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, "utf8");

    const parts = content.split(/^---$/m);
    if (parts.length >= 3) {
      const fm = parts[1];
      const body = parts.slice(2).join("---");

      // Fix lines inside multiline block scalars `>-` or `|` in frontmatter
      const fmLines = fm.split("\n");
      const cleanFmLines = [];
      let inMultilineScalar = false;

      for (let i = 0; i < fmLines.length; i++) {
        const line = fmLines[i];
        if (line.trim().startsWith("title:") || line.trim().startsWith("seoTitle:")) {
          inMultilineScalar = false;
          // Ensure quotes around title strings containing colons or dashes
          const key = line.substring(0, line.indexOf(":") + 1);
          let val = line.substring(line.indexOf(":") + 1).trim();
          if (val.startsWith(">")) {
            cleanFmLines.push(line);
            inMultilineScalar = true;
          } else {
            if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
              cleanFmLines.push(`${key} ${val}`);
            } else {
              val = val.replace(/^['"]|['"]$/g, "");
              cleanFmLines.push(`${key} '${val.replace(/'/g, "''")}'`);
            }
          }
        } else if (
          line.trim().startsWith("excerpt:") ||
          line.trim().startsWith("seoDescription:") ||
          line.trim().startsWith("text:") ||
          line.trim().startsWith("answer:")
        ) {
          if (line.includes(">-") || line.includes(">") || line.includes("|")) {
            inMultilineScalar = true;
            cleanFmLines.push(line);
          } else {
            inMultilineScalar = false;
            cleanFmLines.push(line);
          }
        } else if (inMultilineScalar && line.length > 0 && !line.includes(":")) {
          // Indent lines belonging to multiline scalars
          cleanFmLines.push(`  ${line.trim()}`);
        } else {
          if (line.includes(":")) inMultilineScalar = false;
          cleanFmLines.push(line);
        }
      }

      const newContent = `---${cleanFmLines.join("\n")}---${body}`;
      fs.writeFileSync(filePath, newContent, "utf8");
    }
  }

  console.log("YAML indentation fixed!");
}

fixYamlIndentation();
