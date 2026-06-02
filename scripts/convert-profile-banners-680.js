/**
 * Converts instagram-profile-*.html banners to fixed 680×380 for BioBanner iframes.
 * Run: node scripts/convert-profile-banners-680.js
 */
const fs = require("fs");
const path = require("path");

const DIRS = [
  path.join(__dirname, "..", "public", "All instagram bio", "Interesing bio for instagram"),
  path.join(__dirname, "..", "public", "All instagram bio", "Instagram Bio Style Girl"),
];

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseProfileHtml(html) {
  const username =
    html.match(/class="uname"[^>]*>([^<]+)</)?.[1]?.trim() || "instabio.user";
  const badge =
    html.match(/class="badge"[^>]*>([^<]+)</)?.[1]?.trim() || "✨ Bio Ideas";
  const biolink =
    html.match(/class="biolink"[^>]*>([^<]+)</)?.[1]?.trim() ||
    "🔗 instabio.online";
  const bioLines = [...html.matchAll(/class="bioline"[^>]*>([^<]+)</g)].map((m) =>
    m[1].trim()
  );
  const statNums = [...html.matchAll(/class="sn"[^>]*>([^<]+)</g)].map((m) =>
    m[1].trim()
  );
  const statLbls = [...html.matchAll(/class="sl"[^>]*>([^<]+)</g)].map((m) =>
    m[1].trim()
  );
  const avatarSrc =
    html.match(/id="dpimg"[^>]*src="([^"]+)"/)?.[1] ||
    html.match(/<img[^>]+src="(data:image[^"]+)"/)?.[1] ||
    "";

  const stats = [0, 1, 2].map((i) => ({
    num: statNums[i] || "0",
    lbl: statLbls[i] || ["Posts", "Followers", "Following"][i],
  }));

  return {
    username,
    badge,
    biolink,
    bioLines: bioLines.slice(0, 5),
    stats,
    avatarSrc,
    title: html.match(/<title>([^<]+)<\/title>/)?.[1]?.trim() || username,
  };
}

function bioLineHtml(line) {
  return `<div class="bioline">${escapeHtml(line)}</div>`;
}

function buildProfileBanner680(data) {
  const lines = data.bioLines.length
    ? data.bioLines
    : ["✨ Copy your favorite bio from instabio.online"];
  const bioHtml = lines.map(bioLineHtml).join("");
  const statsHtml = data.stats
    .map(
      (s) =>
        `<div class="stat"><span class="sn">${escapeHtml(s.num)}</span><span class="sl">${escapeHtml(s.lbl)}</span></div>`
    )
    .join("");
  const avatar = data.avatarSrc
    ? `<img src="${data.avatarSrc}" alt="" />`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>${escapeHtml(data.title)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{
  width:680px;height:380px;overflow:hidden;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  background:#f0f0f0;
  display:flex;align-items:center;justify-content:center;
}
.card{
  background:#fff;border-radius:12px;border:1px solid #dbdbdb;
  width:648px;padding:14px 14px 0;
  box-shadow:0 4px 20px rgba(0,0,0,0.08);
}
.top-row{display:flex;align-items:center;gap:22px;margin-bottom:10px;}
.dp-wrap{
  width:72px;height:72px;border-radius:50%;padding:2px;flex-shrink:0;
  background:conic-gradient(#f9ce34 0%,#ee2a7b 40%,#6228d7 80%,#f9ce34 100%);
}
.dp-inner{
  width:100%;height:100%;border-radius:50%;border:2px solid #fff;
  overflow:hidden;background:#efefef;
}
.dp-inner img{width:100%;height:100%;object-fit:cover;display:block;}
.stats{flex:1;display:flex;justify-content:space-around;}
.stat{text-align:center;}
.sn{display:block;font-size:16px;font-weight:700;color:#262626;line-height:1.2;}
.sl{display:block;font-size:12px;color:#262626;}
.uname{font-size:14px;font-weight:700;color:#262626;margin-bottom:4px;}
.badge-wrap{margin-bottom:5px;}
.badge{
  display:inline-flex;align-items:center;gap:4px;
  background:#f0f0f0;border:1px solid #dbdbdb;border-radius:20px;
  padding:2px 10px;font-size:11px;font-weight:600;color:#262626;
}
.biolink{
  display:block;font-size:12px;font-weight:700;color:#00376b;
  margin-bottom:4px;text-decoration:none;
}
.bioline{
  display:block;font-size:11.5px;color:#262626;
  line-height:1.45;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.btn-row{display:flex;gap:6px;padding:10px 0 12px;}
.bedit,.bfollow{
  flex:1;border-radius:7px;padding:7px 0;font-size:12px;font-weight:700;
  cursor:pointer;font-family:inherit;
}
.bedit{background:#efefef;border:1px solid #dbdbdb;color:#262626;}
.bfollow{background:#0095f6;border:none;color:#fff;}
.bmore{
  background:#efefef;border:1px solid #dbdbdb;border-radius:7px;
  padding:7px 10px;font-size:12px;color:#262626;font-family:inherit;
}
</style>
</head>
<body>
<div class="card">
  <div class="top-row">
    <div class="dp-wrap"><div class="dp-inner">${avatar}</div></div>
    <div class="stats">${statsHtml}</div>
  </div>
  <div class="uname">${escapeHtml(data.username)}</div>
  <div class="badge-wrap"><span class="badge">${escapeHtml(data.badge)}</span></div>
  <span class="biolink">${escapeHtml(data.biolink)}</span>
  ${bioHtml}
  <div class="btn-row">
    <button type="button" class="bedit">Edit Profile</button>
    <button type="button" class="bfollow">Follow</button>
    <button type="button" class="bmore">&#8964;</button>
  </div>
</div>
</body>
</html>`;
}

function convertDir(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`Missing folder: ${dir}`);
    return 0;
  }
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".html") && f.includes("instagram-profile"))
    .sort();

  let count = 0;
  for (const file of files) {
    const filePath = path.join(dir, file);
    const html = fs.readFileSync(filePath, "utf8");
    if (
      html.includes("body{width:680px;height:380px") &&
      !html.includes("min-height:100vh")
    ) {
      console.log(`Skipped (already 680×380): ${path.basename(dir)}/${file}`);
      continue;
    }
    const data = parseProfileHtml(html);
    fs.writeFileSync(filePath, buildProfileBanner680(data), "utf8");
    console.log(`Converted: ${path.basename(dir)}/${file}`);
    count++;
  }
  return count;
}

function main() {
  let total = 0;
  for (const dir of DIRS) {
    total += convertDir(dir);
  }
  console.log(`\nDone. ${total} profile banners are now 680×380.`);
}

main();
