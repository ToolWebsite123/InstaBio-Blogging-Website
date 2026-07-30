const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const INPUT_DIR = path.join(__dirname, "..", "public", "All instagram bio");
const OUTPUT_DIR = path.join(__dirname, "..", "public", "banner-images");

function getAllHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file.endsWith(".html")) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function convertHtmlToWebp() {
  console.log("Searching for HTML banners in:", INPUT_DIR);
  const htmlFiles = getAllHtmlFiles(INPUT_DIR);
  console.log(`Found ${htmlFiles.length} HTML banner files to convert.`);

  if (htmlFiles.length === 0) {
    console.warn("No HTML files found.");
    return;
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 680, height: 380, deviceScaleFactor: 1 });

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < htmlFiles.length; i++) {
    const htmlFile = htmlFiles[i];
    const relativePath = path.relative(INPUT_DIR, htmlFile);
    const outputPath = path.join(
      OUTPUT_DIR,
      relativePath.replace(/\.html$/, ".webp")
    );

    const outputFolder = path.dirname(outputPath);
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    try {
      const fileUrl = `file://${path.resolve(htmlFile).replace(/\\/g, "/")}`;
      await page.goto(fileUrl, { waitUntil: "networkidle0" });

      await page.screenshot({
        path: outputPath,
        type: "webp",
        quality: 85,
        clip: { x: 0, y: 0, width: 680, height: 380 },
      });

      successCount++;
      if (successCount % 50 === 0 || i === htmlFiles.length - 1) {
        console.log(`Progress: ${i + 1}/${htmlFiles.length} converted.`);
      }
    } catch (err) {
      failCount++;
      console.error(`Failed to screenshot ${relativePath}:`, err.message);
    }
  }

  await browser.close();
  console.log(
    `Done! Successfully converted ${successCount} files. Failed: ${failCount}.`
  );
}

convertHtmlToWebp().catch((err) => {
  console.error("Fatal error during conversion:", err);
  process.exit(1);
});
