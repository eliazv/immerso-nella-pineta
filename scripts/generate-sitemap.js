import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurazione base
// Dominio principale ufficiale
const SITE_URL = "https://immerso.eliazavatta.it";
const CURRENT_DATE = new Date().toISOString().split("T")[0];

// Definizione di tutte le routes del sito
const routes = [
  {
    path: "/",
    changefreq: "monthly",
    priority: "1.0",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/pineta3",
    changefreq: "monthly",
    priority: "0.9",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/pineta8",
    changefreq: "monthly",
    priority: "0.9",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/pineta3/gallery",
    changefreq: "monthly",
    priority: "0.8",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/pineta8/gallery",
    changefreq: "monthly",
    priority: "0.8",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/pineta3/book",
    changefreq: "weekly",
    priority: "0.9",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/pineta8/book",
    changefreq: "weekly",
    priority: "0.9",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/pineta3/attractions",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/pineta8/attractions",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/pineta3/rules",
    changefreq: "monthly",
    priority: "0.6",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/pineta8/rules",
    changefreq: "monthly",
    priority: "0.6",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/pinarella-guida",
    changefreq: "monthly",
    priority: "0.8",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/faq",
    changefreq: "monthly",
    priority: "0.9",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/blog",
    changefreq: "weekly",
    priority: "0.8",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/blog/cosa-fare-pinarella",
    changefreq: "monthly",
    priority: "0.8",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/blog/ristoranti-pinarella",
    changefreq: "monthly",
    priority: "0.8",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/blog/come-arrivare-pinarella",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/blog/eventi-pinarella",
    changefreq: "weekly",
    priority: "0.7",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/blog/festival-aquilone-cervia",
    changefreq: "yearly",
    priority: "0.6",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/blog/pinarella-summer-festival",
    changefreq: "yearly",
    priority: "0.6",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/blog/mercatino-artigianato-cervia",
    changefreq: "monthly",
    priority: "0.6",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/blog/bellezze-pinarella",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/blog/mare-pinarella",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/blog/mercato-serale-pinarella",
    changefreq: "weekly",
    priority: "0.6",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/blog/prezzi-pinarella",
    changefreq: "monthly",
    priority: "0.8",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/blog/spiagge-libere-stabilimenti",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/blog/pinarella-vs-milano-marittima",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/blog/meteo-pinarella",
    changefreq: "daily",
    priority: "0.6",
    lastmod: CURRENT_DATE,
  },
  {
    path: "/chi-siamo",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: CURRENT_DATE,
  },
];

// Genera il contenuto XML della sitemap
function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml +=
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  routes.forEach((route) => {
    const fullUrl = `${SITE_URL}${route.path}`;
    xml += "  <url>\n";
    xml += `    <loc>${fullUrl}</loc>\n`;
    xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="it" href="${fullUrl}" />\n`;
    xml += "  </url>\n";
  });

  xml += "</urlset>";
  return xml;
}

// Salva la sitemap
function saveSitemap() {
  const sitemapContent = generateSitemap();
  const publicDir = path.join(__dirname, "..", "public");
  const sitemapPath = path.join(publicDir, "sitemap.xml");

  // Assicurati che la directory public esista
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(sitemapPath, sitemapContent, "utf8");
  console.log(`✅ Sitemap generata con successo: ${sitemapPath}`);
  console.log(`📝 ${routes.length} URL inclusi nella sitemap`);
  console.log(`📅 Data ultima modifica: ${CURRENT_DATE}`);
}

// Esegui la generazione
try {
  saveSitemap();
} catch (error) {
  console.error("❌ Errore durante la generazione della sitemap:", error);
  process.exit(1);
}
