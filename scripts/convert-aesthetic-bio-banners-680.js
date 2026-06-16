/**
 * Converts aesthetic bio bio HTML banners to 680×380 (same as gym/sad/love for BioBanner iframe).
 * Run: node scripts/convert-aesthetic bio-banners-680.js
 */
const fs = require("fs");
const path = require("path");

const AESTHETIC_BIO_DIR = path.join(
  __dirname,
  "..",
  "public",
  "All instagram bio",
  "Aesthetic instgram bio for girls"
);

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function firstHex(str, fallback = "#D62976") {
  const m = (str || "").match(/#([0-9a-fA-F]{3,8})/);
  return m ? m[0] : fallback;
}

function parseBannerHtml(html) {
  const mainTitle =
    html.match(/class="main-title"[^>]*>([^<]+)</)?.[1]?.trim() || "aesthetic bio Bio";
  const subTagline =
    html.match(/class="sub-tagline"[^>]*>([^<]+)</)?.[1]?.trim() || "";
  const username =
    html.match(/class="username"[^>]*>([^<]+)</)?.[1]?.trim() ||
    "aesthetic bio.bio.2026";
  const bioLines = [...html.matchAll(/class="bio-line"[^>]*>([^<]+)</g)].map(
    (m) => m[1].trim()
  );
  const statNums = [...html.matchAll(/class="stat-num"[^>]*>([^<]+)</g)].map(
    (m) => m[1].trim()
  );
  const statLbls = [...html.matchAll(/class="stat-lbl"[^>]*>([^<]+)</g)].map(
    (m) => m[1].trim()
  );
  const avatarSrc = html.match(/<img src="(data:image[^"]+)"/)?.[1] || "";

  const bannerTopBg =
    html.match(/\.banner-top\s*\{\s*background:\s*([^;}\n]+)/)?.[1]?.trim() ||
    "linear-gradient(135deg,#0a0a0a,#1a1a1a,#0d0d0d)";
  const subTaglineColor =
    html.match(/\.sub-tagline\s*\{\s*color:\s*([^;}\n]+)/)?.[1]?.trim() ||
    "#D62976";
  const avatarRing =
    html.match(/\.avatar-ring\s*\{\s*background:\s*([^;}\n]+)/)?.[1]?.trim() ||
    "linear-gradient(135deg,#b8860b,#D62976,#daa520)";
  const followBtn =
    html.match(/\.btn-follow\s*\{[^}]*background:\s*([^;}\n]+)/)?.[1]?.trim() ||
    "linear-gradient(90deg,#b8860b,#D62976)";

  const accent = firstHex(subTaglineColor, firstHex(followBtn, "#D62976"));

  return {
    mainTitle,
    subTagline,
    username,
    bioLines: bioLines.slice(0, 5),
    statNums:
      statNums.length >= 3 ? statNums : ["324", "42.6k", "528"],
    statLbls:
      statLbls.length >= 3 ? statLbls : ["Posts", "Followers", "Following"],
    avatarSrc,
    bannerTopBg,
    subTaglineColor,
    avatarRing,
    accent,
  };
}

function bioLineHtml(line, index) {
  const opacities = [1, 0.94, 0.88, 0.82, 0.76];
  const opacity = opacities[index] ?? 0.76;
  const weight = index === 0 ? 700 : 500;
  const size = index === 0 ? "13.5px" : "12.5px";
  return `<div style="font-size:${size};font-weight:${weight};color:#1a1a1a;opacity:${opacity};padding:2.5px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(line)}</div>`;
}

function buildBanner680(data) {
  const bioHtml = data.bioLines.map(bioLineHtml).join("");
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
  background:${data.bannerTopBg};
  position:relative;display:flex;flex-direction:column;
  align-items:center;justify-content:space-between;
  padding:10px 38px 8px;
}
.blob{position:absolute;border-radius:50%;pointer-events:none;}
.b1{width:220px;height:220px;top:-70px;left:-70px;background:${data.accent};opacity:0.12;filter:blur(40px);}
.b2{width:280px;height:280px;bottom:-90px;right:-90px;background:${data.accent};opacity:0.1;filter:blur(50px);}
.b3{width:100px;height:100px;top:40px;right:80px;background:${data.accent};opacity:0.08;filter:blur(20px);}
.head-wrap{text-align:center;z-index:2;padding-top:2px;}
.headline{
  color:#ffffff;font-size:20px;font-weight:900;
  text-shadow:0 2px 16px rgba(0,0,0,0.7);
  letter-spacing:-0.3px;line-height:1.2;
}
.subtitle{
  color:${data.subTaglineColor};font-size:12.5px;font-weight:700;
  margin-top:3px;letter-spacing:0.3px;
  text-shadow:0 1px 8px rgba(0,0,0,0.5);
}
.card{
  background:#fff;border-radius:18px;width:604px;
  box-shadow:0 16px 48px rgba(0,0,0,0.45);
  overflow:hidden;z-index:2;
  border:1px solid rgba(255,255,255,0.08);
}
.card-top{
  display:flex;align-items:center;
  padding:13px 16px 11px;gap:14px;
  background:#fff;border-bottom:1.5px solid #f0f0f0;
}
.av-outer{
  flex-shrink:0;width:78px;height:78px;border-radius:50%;
  padding:3px;background:${data.avatarRing};
  box-shadow:0 4px 18px rgba(0,0,0,0.3);
}
.av-inner{
  width:72px;height:72px;border-radius:50%;
  overflow:hidden;border:2.5px solid #fff;
}
.av-inner img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;}
.right-col{flex:1;display:flex;flex-direction:column;gap:9px;}
.stats-row{display:flex;gap:18px;}
.stat{text-align:center;}
.snum{font-size:16px;font-weight:800;color:#111;}
.slabel{font-size:10px;color:#888;margin-top:1px;}
.btn-row{display:flex;gap:8px;align-items:center;}
.edit-btn{
  background:#fff;border:1.5px solid #dbdbdb;
  border-radius:8px;padding:5px 16px;
  font-size:11.5px;font-weight:600;color:#111;
}
.follow-btn{
  background:${data.accent};border:none;
  border-radius:8px;padding:5px 14px;
  font-size:11.5px;font-weight:700;color:#111;
}
.ig-badge{
  width:50px;height:50px;border-radius:12px;
  background:${data.avatarRing};
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;box-shadow:0 2px 12px rgba(0,0,0,0.25);
  border:1px solid rgba(255,255,255,0.1);
}
.bio-area{padding:10px 18px 10px;background:#fff;}
.uname-row{
  font-size:12.5px;font-weight:800;color:#111;
  margin-bottom:5px;display:flex;align-items:center;gap:6px;
}
.udot{
  display:inline-block;width:7px;height:7px;
  border-radius:50%;background:${data.accent};
}
.site-tag{
  font-size:10.5px;font-weight:600;
  color:${data.accent};opacity:0.85;
}
.domain-bar{text-align:center;z-index:2;padding-bottom:2px;}
.domain{
  color:rgba(255,255,255,0.75);font-size:11px;
  font-weight:700;letter-spacing:2px;text-transform:uppercase;
}
.domain-dot{
  display:inline-block;width:5px;height:5px;
  border-radius:50%;background:${data.accent};
  margin:0 6px;vertical-align:middle;
}
</style>
</head>
<body>
<div class="bg">
  <div class="blob b1"></div>
  <div class="blob b2"></div>
  <div class="blob b3"></div>

  <div class="head-wrap">
    <div class="headline">${escapeHtml(data.mainTitle)}</div>
    <div class="subtitle">${escapeHtml(data.subTagline)}</div>
  </div>

  <div class="card">
    <div class="card-top">
      <div class="av-outer">
        <div class="av-inner">
          <img src="${data.avatarSrc}" alt="DP">
        </div>
      </div>
      <div class="right-col">
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
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="6" stroke="white" stroke-width="2.2"/>
          <circle cx="12" cy="12" r="4.5" stroke="white" stroke-width="2.2"/>
          <circle cx="17.5" cy="6.5" r="1.3" fill="white"/>
        </svg>
      </div>
    </div>
    <div class="bio-area">
      <div class="uname-row">
        <span class="udot"></span>
        <span>${escapeHtml(data.username)}</span>
        <span class="site-tag">✦ instabiogen.online</span>
      </div>
      ${bioHtml}
    </div>
  </div>

  <div class="domain-bar">
    <span class="domain">instabio</span>
    <span class="domain-dot"></span>
    <span class="domain">online</span>
  </div>
</div>
</body>
</html>`;
}

function main() {
  const files = fs
    .readdirSync(AESTHETIC_BIO_DIR)
    .filter((f) => f.endsWith(".html"))
    .sort();

  for (const file of files) {
    const filePath = path.join(AESTHETIC_BIO_DIR, file);
    const html = fs.readFileSync(filePath, "utf8");
    if (html.includes("body{width:680px;height:380px")) {
      console.log(`Skipped (already 680×380): ${file}`);
      continue;
    }
    const data = parseBannerHtml(html);
    const out = buildBanner680(data);
    fs.writeFileSync(filePath, out, "utf8");
    console.log(`Converted: ${file}`);
  }

  console.log(`\nDone. aesthetic bio banners are now 680×380.`);
}

main();
