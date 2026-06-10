const fs = require('fs');
const path = require('path');
const dir = 'd:/Project/InstaBio-Blogging-Website/public/All instagram bio/birthday instagram bio';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;
for (const file of files) {
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');
  if (content.includes('</div>\n  </div>\n  </div>\n\n  <div class="domain-bar">')) {
    content = content.replace('</div>\n  </div>\n  </div>\n\n  <div class="domain-bar">', '</div>\n  </div>\n\n  <div class="domain-bar">');
    fs.writeFileSync(p, content);
    count++;
  } else if (content.includes('</div>\r\n  </div>\r\n  </div>\r\n\r\n  <div class="domain-bar">')) {
    content = content.replace('</div>\r\n  </div>\r\n  </div>\r\n\r\n  <div class="domain-bar">', '</div>\r\n  </div>\r\n\r\n  <div class="domain-bar">');
    fs.writeFileSync(p, content);
    count++;
  }
}
console.log('Fixed ' + count + ' files.');
