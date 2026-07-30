const puppeteer = require("puppeteer");
const path = require("path");

async function generatePngIcons() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const svgPath = path.resolve(__dirname, "..", "public", "apple-icon.svg");
  const fileUrl = `file://${svgPath.replace(/\\/g, "/")}`;

  // 1. Generate icon.png (32x32)
  const page32 = await browser.newPage();
  await page32.setViewport({ width: 32, height: 32, deviceScaleFactor: 1 });
  await page32.goto(fileUrl, { waitUntil: "networkidle0" });
  const iconPath = path.join(__dirname, "..", "public", "icon.png");
  await page32.screenshot({ path: iconPath, type: "png", omitBackground: true });
  await page32.close();
  console.log("Generated public/icon.png (32x32)");

  // 2. Generate apple-icon.png (180x180)
  const page180 = await browser.newPage();
  await page180.setViewport({ width: 180, height: 180, deviceScaleFactor: 1 });
  await page180.goto(fileUrl, { waitUntil: "networkidle0" });
  const appleIconPath = path.join(__dirname, "..", "public", "apple-icon.png");
  await page180.screenshot({ path: appleIconPath, type: "png", omitBackground: true });
  await page180.close();
  console.log("Generated public/apple-icon.png (180x180)");

  await browser.close();
}

generatePngIcons().catch(console.error);
