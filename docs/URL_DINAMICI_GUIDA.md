# 🌐 Sistema URL Dinamici - Immerso nella Pineta

## 📋 Panoramica

Il sito ora supporta **automaticamente** domini multipli senza bisogno di configurazione. Gli URL si adattano dinamicamente al dominio corrente.

## ✅ Domini Supportati

Il sito funziona perfettamente su:

- ✅ `https://immerso-nella-pineta.vercel.app` (Vercel default)
- ✅ `https://immerso.eliazavatta.it` (custom domain)
- ✅ `https://pinarella.eliazavatta.it` (custom domain)
- ✅ `http://localhost:5173` (development)
- ✅ Qualsiasi futuro dominio personalizzato

## 🛠️ Come Funziona

### 1. Rilevamento Automatico

Il sistema rileva automaticamente l'URL corrente:

```typescript
// In browser
window.location.origin → "https://immerso.eliazavatta.it"

// In SSR/build
process.env.VERCEL_URL → "immerso-nella-pineta.vercel.app"
process.env.VITE_SITE_URL → custom domain (se impostato)
```

### 2. Funzioni Utility

**File**: `src/lib/config.ts`

```typescript
import { getSiteUrl, getCanonicalUrl } from "@/lib/config";

// Ottiene URL base dinamico
const siteUrl = getSiteUrl();
// → "https://immerso.eliazavatta.it"

// Genera URL canonico completo
const url = getCanonicalUrl("/blog/cosa-fare-pinarella");
// → "https://immerso.eliazavatta.it/blog/cosa-fare-pinarella"
```

### 3. Helper URL

**File**: `src/lib/urlUtils.ts`

```typescript
import { getPageUrl, getBlogPostUrl, SITE_URLS } from "@/lib/urlUtils";

// URL pagine
const blogUrl = SITE_URLS.blog(); // Dynamic!
const faqUrl = SITE_URLS.faq();

// URL articoli blog
const articleUrl = getBlogPostUrl("cosa-fare-pinarella");
// → Current domain + /blog/cosa-fare-pinarella

// URL immagini
const logoUrl = getImageUrl("/images/logo.png");
// → Current domain + /images/logo.png
```

## 🔧 Componenti Aggiornati

### MetaTags

```tsx
import MetaTags from "@/components/MetaTags";

<MetaTags
  title="Blog Pinarella"
  description="..."
  canonicalUrl="/blog" // Relativo! Si adatta automaticamente
/>;
// Genera: <link rel="canonical" href="https://[current-domain]/blog" />
```

### SEO Schema

```tsx
import { getSiteUrl } from "@/lib/config";

const SEOSchema = () => {
  const siteUrl = getSiteUrl(); // Dinamico!

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: siteUrl, // Si adatta al dominio corrente
  };
};
```

### Blog Posts

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  url: getCanonicalUrl("/blog/mio-articolo"), // Dinamico!
};
```

## 🚀 Aggiungere un Nuovo Dominio

### Opzione 1: Zero Config (Automatico)

Basta puntare il DNS e funziona subito! ✨

### Opzione 2: Con Environment Variable

Se vuoi forzare un dominio specifico nel build:

```bash
# .env.local o Vercel Environment Variables
VITE_SITE_URL=https://pinarella.eliazavatta.it
```

## 📝 Best Practices

### ✅ DA FARE

```typescript
// Usa getSiteUrl() o urlUtils
const url = getSiteUrl();
const blogUrl = getBlogPostUrl("slug");
const canonical = getCanonicalUrl("/path");
```

### ❌ DA NON FARE

```typescript
// Mai hardcodare URL!
const url = "https://immerso-nella-pineta.vercel.app"; // ❌
const blogUrl = "https://immerso-nella-pineta.vercel.app/blog"; // ❌
```

## 🧪 Testing

### Development

```bash
npm run dev
# → http://localhost:5173
# Tutti gli URL useranno localhost automaticamente
```

### Preview (Vercel)

Ogni PR crea un preview URL unico:

```
https://immerso-nella-pineta-git-feature-abc123.vercel.app
```

Gli URL si adatteranno automaticamente al preview domain.

### Production

```bash
# Vercel domain
https://immerso-nella-pineta.vercel.app

# Custom domain
https://immerso.eliazavatta.it

# Tutti funzionano identicamente! ✨
```

## 🔍 Debugging

### Controllare dominio corrente

```typescript
import { getCurrentDomain, getEnvironment } from "@/lib/urlUtils";

console.log(getCurrentDomain());
// → "immerso.eliazavatta.it"

console.log(getEnvironment());
// → "production" | "preview" | "development"
```

### Verificare URL generati

Apri DevTools Console:

```typescript
import { getSiteUrl } from "@/lib/config";
console.log("Current site URL:", getSiteUrl());
```

## 🎯 Vantaggi

1. **Zero configurazione** per nuovi domini
2. **Failsafe**: Fallback automatico a dominio default
3. **DRY**: Un'unica fonte di verità per gli URL
4. **SEO**: Canonical URL sempre corretti
5. **Testabile**: Funziona in dev, preview e production
6. **Scalabile**: Aggiungi infiniti domini senza toccare codice

## 📚 File Modificati

### Core

- ✅ `src/lib/config.ts` - Funzioni base
- ✅ `src/lib/urlUtils.ts` - Helper utility
- ✅ `src/lib/contactConfig.ts` - CONTACT_INFO.website dinamico

### Componenti

- ✅ `src/components/MetaTags.tsx`
- ✅ `src/components/SEOSchema.tsx`
- ✅ `src/components/AdvancedSEOSchema.tsx`
- ✅ `src/components/LocalSEO.tsx`

### Pagine

Tutti i canonical URL nelle pagine ora si adattano automaticamente:

- ✅ Blog.tsx
- ✅ FAQ.tsx
- ✅ ChiSiamo.tsx
- ✅ PinarellaGuide.tsx
- ✅ Tutti gli articoli blog

## 🔄 Migration Guide

Se aggiungi nuovi componenti/pagine:

### Prima (Vecchio modo - ❌)

```tsx
const canonicalUrl = "https://immerso-nella-pineta.vercel.app/nuova-pagina";
```

### Dopo (Nuovo modo - ✅)

```tsx
import { getCanonicalUrl } from "@/lib/config";
const canonicalUrl = getCanonicalUrl("/nuova-pagina");
```

## 💡 Tips

1. **Usa sempre path relativi** per canonical: `/blog` invece di `https://...`
2. **Import utils** invece di ricostruire URL manualmente
3. **Test su localhost** prima di deploy
4. **Verifica Schema.org** con Google Rich Results Test

## 📞 Supporto

Per domande o problemi, vedi:

- 📖 `docs/ANALISI_SEO_COMPLETA_2026.md` - Analisi completa SEO
- 📖 `docs/SEO_IMPROVEMENTS_2026.md` - Miglioramenti implementati
- 🐛 Issue tracker: [GitHub Issues]

---

**Ultima modifica**: 4 Febbraio 2026
**Status**: ✅ Produzione
