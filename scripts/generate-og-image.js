const puppeteer = require("puppeteer");
const path = require("path");

async function generateOgImage() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 0;
          width: 1200px;
          height: 630px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #4F5BD5 0%, #962FBF 35%, #D62976 70%, #FA7E1E 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: white;
          text-align: center;
          box-sizing: border-box;
        }
        .container {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(10px);
          padding: 60px 80px;
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          max-width: 1000px;
        }
        h1 {
          font-size: 64px;
          font-weight: 900;
          margin: 0 0 20px 0;
          letter-spacing: -1px;
        }
        p {
          font-size: 28px;
          font-weight: 500;
          margin: 0;
          opacity: 0.95;
          line-height: 1.4;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Instabiogen.online</h1>
        <p>Best Instagram Bio Ideas, Captions & Quotes</p>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html);
  const outputPath = path.join(__dirname, "..", "public", "og-default.jpg");
  await page.screenshot({ path: outputPath, type: "jpeg", quality: 90 });
  await browser.close();
  console.log("Generated og-default.jpg successfully!");
}

generateOgImage().catch(console.error);
