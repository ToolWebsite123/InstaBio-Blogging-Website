const fs = require("fs");
const path = require("path");

const UNIQUE_BIO_DIR = path.join(
  __dirname,
  "..",
  "public",
  "All instagram bio",
  "Unique insta bio"
);

const txtContent = fs.readFileSync(path.join(__dirname, '..', 'temp_unique_bios.txt'), 'utf8');
const lines = txtContent.split('\n').map(l => l.trim());

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

function escapeHtml(s) {
  if (!s) return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function bioLineHtml(line, index) {
  const opacities = [1, 0.94, 0.88, 0.82, 0.76];
  const opacity = opacities[index] ?? 0.76;
  const weight = index === 0 ? 700 : 500;
  const size = index === 0 ? "13px" : "12.2px";
  return `<div style="font-size:${size};font-weight:${weight};color:#111;opacity:${opacity};padding:2.6px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${line}</div>`;
}

function buildBanner680(data) {
  const bioHtml = data.bioLines.map((line, i) => bioLineHtml(escapeHtml(line), i)).join("");
  const [posts, followers, following] = data.statNums;
  const [postsLbl, followersLbl, followingLbl] = data.statLbls;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{width:680px;height:380px;overflow:hidden;font-family:'Segoe UI',system-ui,sans-serif;}
.bg{
  width:680px;height:380px;
  background:linear-gradient(135deg,#0c1220,#1a365d,#0c1220);
  position:relative;display:flex;flex-direction:column;
  align-items:center;justify-content:space-between;
  padding:9px 36px 7px;
}
.glow1{position:absolute;top:-70px;left:-70px;width:230px;height:230px;border-radius:50%;background:#60a5fa;opacity:0.08;filter:blur(48px);pointer-events:none;}
.glow2{position:absolute;bottom:-70px;right:-70px;width:260px;height:260px;border-radius:50%;background:#93c5fd;opacity:0.06;filter:blur(52px);pointer-events:none;}
.geo-line{position:absolute;top:0;right:90px;width:1px;height:100%;background:linear-gradient(to bottom,transparent,#60a5fa,transparent);opacity:0.1;pointer-events:none;}
.head-wrap{text-align:center;z-index:2;padding-top:0px;}
.headline{color:#fff;font-size:20px;font-weight:900;text-shadow:0 2px 14px rgba(0,0,0,0.6);letter-spacing:-0.4px;line-height:1.2;}
.subtitle{color:#93c5fd;font-size:11.5px;font-weight:700;margin-top:3px;letter-spacing:0.3px;text-shadow:0 1px 8px rgba(0,0,0,0.5);}
.card{background:#fff;border-radius:18px;width:608px;box-shadow:0 16px 50px rgba(0,0,0,0.42);overflow:hidden;z-index:2;border:1px solid rgba(255,255,255,0.06);}
.card-top{display:flex;align-items:center;padding:12px 15px 10px;gap:13px;background:#fff;border-bottom:1.5px solid #f0f0f0;}
.av-outer{flex-shrink:0;width:80px;height:80px;border-radius:50%;padding:3px;background:linear-gradient(135deg,#0c1220,#1a365d,#0c1220);box-shadow:0 4px 18px rgba(0,0,0,0.35);}
.av-inner{width:74px;height:74px;border-radius:50%;overflow:hidden;border:2.5px solid #fff;}
.av-inner img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;}
.mid-col{display:flex;flex-direction:column;gap:4px;flex-shrink:0;}
.uname{font-size:13px;font-weight:800;color:#111;letter-spacing:-0.2px;}
.badge-pill{display:inline-block;background:linear-gradient(135deg,#0c1220,#1a365d,#0c1220);color:#fff;font-size:9.5px;font-weight:700;padding:2px 10px;border-radius:20px;width:fit-content;}
.right-col{flex:1;display:flex;flex-direction:column;gap:8px;}
.stats-row{display:flex;gap:16px;justify-content:center;}
.stat{text-align:center;}
.snum{font-size:16px;font-weight:800;color:#111;}
.slabel{font-size:9.5px;color:#888;margin-top:1px;}
.btn-row{display:flex;gap:7px;}
.edit-btn{background:#fff;border:1.5px solid #dbdbdb;border-radius:8px;padding:5px 13px;font-size:11px;font-weight:600;color:#111;}
.follow-btn{background:#60a5fa;border:none;border-radius:8px;padding:5px 12px;font-size:11px;font-weight:700;color:#fff;}
.ig-badge{width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#0c1220,#1a365d,#0c1220);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 2px 12px rgba(0,0,0,0.25);}
.bio-area{padding:9px 16px 9px;background:#fff;}
.site-link{font-size:10.5px;font-weight:700;color:#60a5fa;margin-bottom:4px;display:block;}
.domain-bar{text-align:center;z-index:2;display:flex;align-items:center;justify-content:center;gap:8px;}
.domain{color:rgba(255,255,255,0.72);font-size:10.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;}
.dpill{background:#60a5fa;color:#000;font-size:9px;font-weight:800;padding:2px 8px;border-radius:10px;}
</style>
</head>
<body>
<div class="bg">
  <div class="glow1"></div><div class="glow2"></div>
  <div class="geo-line"></div>
  <div class="head-wrap">
    <div class="headline">${escapeHtml(data.headline)}</div>
    <div class="subtitle">${escapeHtml(data.subtitle)}</div>
  </div>
  <div class="card">
    <div class="card-top">
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex-shrink:0;">
        <div class="av-outer"><div class="av-inner"><img src="${data.avatarSrc}" alt="DP"></div></div>
        <div class="badge-pill">✨ Unique Bios</div>
      </div>
      <div class="mid-col" style="flex:1;padding-left:4px;">
        <div class="uname">${escapeHtml(data.username)}</div>
        <div class="stats-row">
          <div class="stat"><div class="snum">${escapeHtml(posts)}</div><div class="slabel">${escapeHtml(postsLbl)}</div></div>
          <div class="stat"><div class="snum">${escapeHtml(followers)}</div><div class="slabel">${escapeHtml(followersLbl)}</div></div>
          <div class="stat"><div class="snum">${escapeHtml(following)}</div><div class="slabel">${escapeHtml(followingLbl)}</div></div>
        </div>
        <div class="btn-row">
          <button class="edit-btn">Edit Profile</button>
          <button class="follow-btn">Follow</button>
        </div>
      </div>
      <div class="ig-badge">
        <svg width="27" height="27" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="6" stroke="white" stroke-width="2.2"/>
          <circle cx="12" cy="12" r="4.5" stroke="white" stroke-width="2.2"/>
          <circle cx="17.5" cy="6.5" r="1.3" fill="white"/>
        </svg>
      </div>
    </div>
    <div class="bio-area">
      <span class="site-link">🔗 instabio.online</span>
      ${bioHtml}
    </div>
  </div>
  <div class="domain-bar">
    <span class="domain">instabio.online</span>
    <span class="dpill">2026</span>
  </div>
</div>
</body>
</html>`;
}

function main() {
  for (const cat of categories) {
    const catIdx = lines.indexOf(cat.name);
    let bioLines = [];
    if (catIdx !== -1) {
      for (let i = catIdx + 1; i < lines.length; i++) {
        if (!lines[i]) continue;
        const isCat = categories.some(c => c.name === lines[i]);
        if (isCat) break;
        bioLines.push(lines[i]);
        if (bioLines.length >= 5) break;
      }
    }

    const filePath = path.join(UNIQUE_BIO_DIR, cat.file);
    if (fs.existsSync(filePath)) {
      const html = fs.readFileSync(filePath, "utf8");
      
      const avatarSrc = html.match(/<img src="(data:image[^"]+)"/)?.[1] || "";
      
      const data = {
        headline: cat.name.replace("Bio for Instagram", "Bio").replace(" in English", ""),
        subtitle: "✨ " + cat.name,
        username: "instabio.online",
        bioLines,
        statNums: ["312", "67.4K", "891"],
        statLbls: ["Posts", "Followers", "Following"],
        avatarSrc
      };
      
      const out = buildBanner680(data);
      fs.writeFileSync(filePath, out, "utf8");
      console.log(`Converted: ${cat.file} (${bioLines.length} bio lines)`);
    } else {
      console.log(`Not found: ${filePath}`);
    }
  }
}

main();
