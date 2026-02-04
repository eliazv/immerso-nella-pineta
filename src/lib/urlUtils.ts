/**
 * Utility per gestire URL dinamici del sito
 * Supporta automaticamente tutti i domini (Vercel, custom domains, localhost)
 */

import { getSiteUrl, getCanonicalUrl } from "./config";

/**
 * Genera URL completo per una pagina
 * @param path - Path relativo (es. "/blog", "/pineta3/book")
 * @returns URL completo (es. "https://immerso.eliazavatta.it/blog")
 */
export const getPageUrl = (path: string): string => {
  return getCanonicalUrl(path);
};

/**
 * Genera URL per articolo blog
 * @param slug - Slug dell'articolo (es. "cosa-fare-pinarella")
 * @returns URL completo articolo
 */
export const getBlogPostUrl = (slug: string): string => {
  return getCanonicalUrl(`/blog/${slug}`);
};

/**
 * Genera URL per immagini
 * @param imagePath - Path immagine (es. "/images/logo.nobg.png")
 * @returns URL completo immagine
 */
export const getImageUrl = (imagePath: string): string => {
  const siteUrl = getSiteUrl();
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${siteUrl}${cleanPath}`;
};

/**
 * URL costanti del sito (usano getSiteUrl dinamicamente)
 */
export const SITE_URLS = {
  home: () => getSiteUrl(),
  blog: () => getPageUrl("/blog"),
  faq: () => getPageUrl("/faq"),
  chiSiamo: () => getPageUrl("/chi-siamo"),
  pinarellaGuide: () => getPageUrl("/pinarella-guida"),
  attractions: () => getPageUrl("/attractions"),
  book: () => getPageUrl("/pineta3/book"),
  pineta3: () => getPageUrl("/pineta3"),
  pineta8: () => getPageUrl("/pineta8"),
  gallery: () => getPageUrl("/gallery"),
  rules: () => getPageUrl("/rules"),

  // Blog posts
  blogPosts: {
    pinarellaGuide: () => getBlogPostUrl("pinarella-guida"),
    cosaFare: () => getBlogPostUrl("cosa-fare-pinarella-cervia"),
    ristoranti: () => getBlogPostUrl("migliori-ristoranti-pinarella-cervia"),
    comeArrivare: () => getBlogPostUrl("come-arrivare-pinarella"),
    eventi: () => getBlogPostUrl("eventi-pinarella-cervia"),
    festivalAquilone: () => getBlogPostUrl("festival-aquilone-cervia"),
    summerFestival: () => getBlogPostUrl("pinarella-summer-festival"),
    mercatinoArtigianato: () => getBlogPostUrl("mercatino-artigianato-cervia"),
    bellezze: () => getBlogPostUrl("bellezze-pinarella-cervia"),
    mare: () => getBlogPostUrl("mare-pinarella-cervia"),
    mercatoSerale: () => getBlogPostUrl("mercato-serale-pinarella"),
    bambini: () => getBlogPostUrl("dove-dormire-pinarella-cervia-bambini"),
  },
};

/**
 * Ottiene dominio attuale senza protocollo
 * @returns Dominio (es. "immerso.eliazavatta.it")
 */
export const getCurrentDomain = (): string => {
  if (typeof window !== "undefined") {
    return window.location.host;
  }
  return getSiteUrl().replace(/^https?:\/\//, "");
};

/**
 * Controlla se siamo su un dominio specifico
 * @param domain - Dominio da verificare
 * @returns true se match
 */
export const isOnDomain = (domain: string): boolean => {
  return getCurrentDomain() === domain;
};

/**
 * Rileva ambiente corrente
 */
export const getEnvironment = (): "production" | "preview" | "development" => {
  if (typeof window === "undefined") {
    return "production";
  }

  const domain = getCurrentDomain();

  if (domain.includes("localhost") || domain.includes("127.0.0.1")) {
    return "development";
  }

  if (
    domain.includes("vercel.app") &&
    !domain.includes("immerso-nella-pineta")
  ) {
    return "preview";
  }

  return "production";
};
