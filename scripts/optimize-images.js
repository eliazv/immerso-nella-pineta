import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const inputDir = path.join(process.cwd(), "public", "images");
const outputDir = path.join(process.cwd(), "public", "images", "optimized");
const sizes = [320, 640, 1024]; // responsive widths

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function processFile(filePath, relPath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext)) return;

  const baseName = path.basename(filePath, ext);
  const destFolder = path.join(outputDir, path.dirname(relPath));
  await ensureDir(destFolder);

  const inputBuffer = await fs.readFile(filePath);
  // generate multiple sizes in webp and avif
  await Promise.all(
    sizes.map(async (w) => {
      const webpPath = path.join(destFolder, `${baseName}-${w}.webp`);
      const avifPath = path.join(destFolder, `${baseName}-${w}.avif`);
      await sharp(inputBuffer)
        .resize({ width: w })
        .webp({ quality: 80 })
        .toFile(webpPath);
      await sharp(inputBuffer)
        .resize({ width: w })
        .avif({ quality: 60 })
        .toFile(avifPath);
    }),
  );

  // also generate a placeholder small blurred image
  const placeholderPath = path.join(destFolder, `${baseName}-placeholder.jpg`);
  await sharp(inputBuffer)
    .resize({ width: 20 })
    .blur()
    .jpeg({ quality: 30 })
    .toFile(placeholderPath);
}

async function walk(dir, base = "") {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      await walk(full, rel);
    } else {
      await processFile(full, rel);
    }
  }
}

(async () => {
  try {
    await ensureDir(outputDir);
    await walk(inputDir);
    console.log("Immagini ottimizzate in:", outputDir);
  } catch (err) {
    console.error("Errore optimizing images:", err);
    process.exit(1);
  }
})();
