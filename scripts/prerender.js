import http from "http";
import handler from "serve-handler";
import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";

const DIST_DIR = path.join(process.cwd(), "dist");
const PORT = 4173;

// Routes to prerender (exclude /alloggiati)
const ROUTES = [
  "/",
  "/pinarella-guida",
  "/blog",
  "/blog/cosa-fare-pinarella-cervia",
  "/blog/migliori-ristoranti-pinarella-cervia",
  "/blog/come-arrivare-pinarella",
  "/blog/eventi-pinarella-cervia",
  "/blog/festival-aquilone-cervia",
  "/blog/pinarella-summer-festival",
  "/blog/mercatino-artigianato-cervia",
  "/chi-siamo",
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function prerender() {
  const server = http.createServer((req, res) =>
    handler(req, res, { public: DIST_DIR }),
  );

  server.listen(PORT, async () => {
    console.log(`Serving ${DIST_DIR} on http://localhost:${PORT}`);

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    for (const route of ROUTES) {
      const url = `http://localhost:${PORT}${route}`;
      console.log("Prerendering", url);
      try {
        await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
        const html = await page.content();

        // Determine output path
        const outPath = path.join(DIST_DIR, route === "/" ? "" : route);
        await ensureDir(outPath);
        const filePath = path.join(outPath, "index.html");
        await fs.writeFile(filePath, html, "utf8");
        console.log("Saved", filePath);
      } catch (err) {
        console.error("Failed to prerender", url, err);
      }
    }

    await browser.close();
    server.close();
    console.log("Prerender complete");
  });
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
