# Immerso nella Pineta - Case Study

## Panoramica del Progetto

**Immerso nella Pineta** è un'applicazione web completa per la gestione di case vacanza situate a Pinarella di Cervia, sulla costa romagnola. Il progetto nasce con un duplice obiettivo: presentare al pubblico le strutture ricettive con un sito web professionale ottimizzato per la SEO, e fornire al proprietario un sistema di backoffice per la gestione delle prenotazioni, l'integrazione con OTA (Online Travel Agencies) e la conformità alle normative italiane sulla registrazione degli ospiti.

Il progetto comprende tre appartamenti indipendenti gestiti come strutture ricettive: Pineta 3 (appartamento principale), Pineta 4 (appartamento secondario) e Pineta 8 (appartamento terziario). L'architettura del sistema permette di gestire tutte e tre le strutture da un'unica piattaforma, con viste separate o aggregate a seconda delle esigenze.

---

## Obiettivi del Progetto

### Obiettivo Primario: Presenza Web Professionale

Il sito pubblico serve come vetrina digitale per le strutture ricettive. Gli obiettivi specifici includono:

- **Generazione di prenotazioni dirette**: Ridurre la dipendenza dalle OTA mostrando disponibilità in tempo reale e permettendo ai potenziali ospiti di prenotare direttamente, senza intermediari.
- **Ottimizzazione SEO locale**: Posizionare il sito per le ricerche relative a vacanze a Pinarella di Cervia, con contenuti locali, recensioni e guide turistiche.
- **Costruzione di fiducia**: Presentare informazioni complete sulla struttura, regole della casa, galleria fotografica e testimonianze di ospiti precedenti.

### Obiettivo Secondario: Sistema di Gestione Backoffice

Il backoffice permette al proprietario di gestire operativamente le strutture:

- **Gestione centralizzata delle prenotazioni**: Calendario unificato con vista su tutti e tre gli appartamenti.
- **Integrazione OTA**: Visualizzazione di prenotazioni da Booking.com, Airbnb e canali diretti.
- **Analytics e reporting**: Statistiche su occupazione, ricavi e performance per canale.
- **Conformità normativa**: Sistema automatico di generazione delle schedine Alloggiati Web per la Questura.

---

## Architettura Tecnica

### Stack Tecnologico

L'applicazione utilizza un stack moderno basato su tecnologie frontend consolidate:

- **Framework**: React 18 con TypeScript per type safety e manutenibilità del codice.
- **Build Tool**: Vite per performance ottimali in sviluppo e produzione.
- **UI Components**: shadcn/ui basato su Radix UI Primitives, con Tailwind CSS per lo styling.
- **State Management**: React Query (@tanstack/react-query) per la gestione del caching e delle chiamate asincrone.
- **Form Handling**: React Hook Form con Zod per validazione schema-based.
- **Routing**: React Router DOM per la navigazione.
- **Date Handling**: date-fns, react-calendar, @fullcalendar/react per la gestione del calendario.
- **Charts**: Recharts per le visualizzazioni della dashboard.
- **Email**: EmailJS per l'invio di notifiche e documenti via email.

### Struttura del Progetto

Il codebase segue una struttura modulare che separa chiaramente le responsabilità:

```
src/
├── components/           # Componenti React riutilizzabili
│   ├── ui/              # Componenti base shadcn/ui
│   ├── alloggiati/      # Componenti per il sistema Alloggiati
│   ├── backoffice/      # Layout e componenti del backoffice
│   ├── calendar/        # Componenti per il calendario prenotazioni
│   └── dashboard/       # Componenti per la dashboard analytics
├── pages/               # Pagine principali dell'applicazione
│   ├── blog/            # Pagine del blog SEO
│   └── *.tsx           # Pagine principali
├── services/            # Servizi business logic
│   ├── alloggiatiService.ts    # Generazione schedine Questura
│   ├── bookingService.ts      # Gestione prenotazioni Google Sheets
│   ├── dashboardService.ts    # Calcolo statistiche
│   ├── authService.ts         # Autenticazione PIN
│   ├── uploadService.ts       # Upload documenti
│   └── ...
├── types/               # Definizioni TypeScript
├── data/                # Dati statici (comuni italiani, paesi)
├── contexts/            # React Context per state global
└── hooks/              # Custom hooks
```

### Integrazione Google Sheets

Le prenotazioni sono memorizzate in fogli Google Sheets, rendendo il sistema accessibile anche senza un database backend tradizionale. L'applicazione utilizza:

- **Lettura**: OpenSheet API (opensheet.elk.sh) per letture CORS-friendly dei dati.
- **Scrittura**: Google Apps Script endpoint per aggiornamenti e cancellazioni.
- **Caching**: LocalStorage con scadenza di 6 ore per ridurre le chiamate API.

Questa architettura permette al proprietario di gestire le prenotazioni direttamente da Excel/Google Sheets, mantenendo i dati accessibili e modificabili anche offline.

---

## Funzionalità Implementate

### 1. Sito Pubblico

#### Homepage e Presentazione

La homepage presenta ciascun appartamento con una hero section full-screen, informazioni sulle caratteristiche della struttura (camere, bagni, parcheggio, vicinanza al mare) e call-to-action per la prenotazione. Il design è mobile-first, con layout responsivo che si adatta a tutti i dispositivi.

#### Sistema di Selezione Alloggi

Un selettore iniziale permette agli utenti di scegliere quale appartamento visualizzare. La selezione viene mantenuta nel context dell'applicazione e si riflette su tutte le pagine, permettendo di navigare tra i tre appartamenti mantenendo il contesto.

#### Galleria Fotografica

Galleria interattiva con lightbox, ottimizzazioni per il lazy loading delle immagini e transizioni fluide. Le immagini sono organizzate per categoria (interni, esterni, vista, dettagli).

#### Calendario Disponibilità Pubblico

Il sito pubblico mostra un calendario delle disponibilità in sola lettura, aggiornato in tempo reale dalle stesse fonti dei fogli Google Sheets. Gli utenti possono vedere quali periodi sono già prenotati prima di procedere con la richiesta di prenotazione.

#### Pagine SEO

Il sito include numerose pagine ottimizzate per i motori ricerca, focalizzate su keyword locali:

- **Guide turistiche**: Cosa fare a Pinarella, ristoranti, eventi locali, come arrivare da varie città.
- **Informazioni stagionali**: Meteo, prezzi, mercatini, festival.
- **Confronto con località vicine**: Pinarella vs Milano Marittima.
- **Consigli per famiglie**: Dove dormire con bambini.

Ogni pagina include meta tags appropriati, schema.org markup per local business, e breadcrumbs SEO.

#### Modulo di Prenotazione

Form completo per la richiesta di prenotazione con validazione lato client, calcolo automatico del prezzo in base alle notti selezionate e integrazione WhatsApp per messaggi diretti.

#### Regole della Casa e PDF

Pagina dedicata alle regole della casa con possibilità di download PDF, utile per gli ospiti che vogliono consultare le informazioni offline.

### 2. Sistema Alloggiati Web

Una delle funzionalità più sophisticated è l'integrazione con il sistema **Alloggiati Web** della Polizia di Stato italiana. Questo sistema richiede che tutti gli esercizi ricettivi registrino i propri ospiti entro 24 ore dall'arrivo.

#### Generazione Automatica delle Schedine

Il servizio `alloggiatiService.ts` implementa la generazione automatica dei file nel formato richiesto dalla Questura:

- **Formato record fisso**: Ogni riga è esattamente 169 caratteri, con campi posizionali.
- **Gestione multi-ospite**: Possibilità di inserire gruppi familiari con un solo capo famiglia che riporta i documenti.
- **Supporto cittadini italiani e stranieri**: Codici differenti per comune di nascita (codice ISTAT) e stato estero.
- **Validazione completa**: Controllo di tutti i campi obbligatori prima della generazione.

#### Interfaccia di Inserimento Ospiti

Form completo per l'inserimento dei dati degli ospiti:

- Selezione tipo ospite (singolo, capo famiglia, membro famiglia).
- Documenti supportati: Carta d'identità, Passaporto, Patente, Permesso di soggiorno.
- Ricerca automatica comuni italiani con codici ISTAT.
- Calcolo automatico giorni di permanenza.
- Upload documenti (fronte/retro) con compressione automatica.

#### Condivisione URL

I dati del modulo possono essere condivisi tra dispositivi tramite URL codificato, permettendo ad esempio di compilare i dati su PC e poi visualizzarli sullo smartphone in struttura.

#### Download e Invio Email

- Download del file schedina in formato .txt pronto per il portale Questura.
- Invio automatico via email con attachment del file generato.

### 3. Backoffice e Calendario Prenotazioni

#### Calendario Interattivo

Calendario mensile con FullCalendar che mostra:

- **Codifica colori per appartamento**: Blu per principale, rosso per secondario, verde per terziario.
- **Codifica colori per OTA**: Blu per Booking.com, rosso scuro per Airbnb, verde per prenotazioni dirette.
- **Vista aggregata**: Possibilità di vedere tutti e tre gli appartamenti contemporaneamente.
- **Dettagli prenotazione**: Click su un evento per vedere tutti i dettagli (nome ospite, notti, prezzo, note).

#### Gestione Prenotazioni

- **Aggiornamento**: Modifica dei dettagli di una prenotazione esistente.
- **Cancellazione**: Rimozione di prenotazioni con aggiornamento automatico del foglio Google.
- **Creazione manuale**: Possibilità di aggiungere nuove prenotazioni direttamente dal backoffice.

#### Filtri e Ricerca

- Filtro per appartamento.
- Filtro per anno.
- Lista prenotazioni con ordinamento e ricerca.

### 4. Dashboard Analytics

La dashboard fornisce insight dettagliati sulle performance delle strutture:

#### Statistiche di Occupazione

- Giorni totali, giorni occupati, tasso di occupazione percentuale.
- Occupazione mensile con grafico a barre.
- Confronto anno su anno.

#### Statistiche di Ricavo

- Ricavo totale annuale.
- Media prezzo per notte.
- Media prezzo per prenotazione.
- Andamento mensile dei ricavi con grafico.
- Ricavi storici per anno.

#### Statistiche per OTA

- Numero prenotazioni per canale.
- Ricavi totali per canale.
- Prezzo medio per notte per canale.
- Confronto visivo con grafici a torta e barre.

#### Stagionalità

- Numero prenotazioni mensili.
- Prezzo medio per notte mensile.
- Identificazione mesi migliori e peggiori.

### 5. Autenticazione

Sistema di autenticazione PIN per l'accesso al backoffice:

- PIN configurabile via variabile d'ambiente.
- Sessione mantenuta in localStorage.
- Redirect automatico dalla pagina calendar se non autenticato.

---

## Implementazioni Chiave

### Sistema di Caching Intelligente

L'applicazione implementa un sistema di caching multilivello:

1. **React Query**: Cache delle query con invalidazione automatica.
2. **LocalStorage**: Cache delle prenotazioni con scadenza configurabile (6 ore).
3. **Stato in memoria**: Componenti con useState per dati temporanei.

Questo approccio garantisce tempi di caricamento rapidi anche con connessioni lente, riducendo il carico sulle API esterne.

### Gestione Errori e Fallback

Ogni servizio implementa try/catch con fallback a dati vuoti in caso di errore, garantendo che l'applicazione rimanga utilizzabile anche in caso di problemi di rete o API.

### Ottimizzazioni SEO

- **Meta Tags dinamici**: Ogni pagina ha title, description e keywords specifici.
- **Schema.org**: Markup JSON-LD per LocalBusiness, FAQ, BreadcrumbList.
- **Sitemap automatica**: Generazione script della mappa del sito.
- **Semantic HTML**: Uso corretto di header, main, section, article.
- **Performance**: Code splitting, lazy loading immagini, bundle ottimizzato.

### Responsive Design

Tutte le componenti seguono un approccio mobile-first:

- Breakpoint Tailwind configurati (sm, md, lg, xl, 2xl).
- Touch-friendly: Bottoni e aree cliccabili adeguate per schermi touch.
- Navigazione mobile: Menu hamburger con drawer.

### Integrazione Mobile (Capacitor)

L'applicazione è configurata per essere impacchettata come app Android nativa tramite Capacitor, con:

- Configurazione per apertura diretta alla pagina calendar.
- Status bar configuration.
- PWA manifest per installazione.

---

## Sfide Tecniche e Soluzioni

### Sfida 1: CORS con Google Sheets

**Problema**: Le chiamate dirette a Google Sheets da browser subiscono restrizioni CORS.

**Soluzione**: Utilizzo di OpenSheet (opensheet.elk.sh) come proxy CORS-friendly per la lettura. Per la scrittura, utilizzo di Google Apps Script con tecnica window.open per aggirare le limitazioni.

### Sfida 2: Formato Alloggiati Web

**Problema**: Il formato delle schedine Questura è un formato fisso a lunghezza fissa con posizioni dei caratteri specifiche, non documentato in modo accessibile.

**Soluzione**: Analisi di file di esempio esistenti e implementazione di un parser/generatore che rispetta esattamente le specifiche: 169 caratteri per riga, campi posizionali, padding con spazi.

### Sfida 3: Sincronizzazione Dati

**Problema**: Più fonti dati (Google Sheets, localStorage, URL condivisi) devono rimanere sincronizzate.

**Soluzione**: Implementazione di cache con scadenza, invalidazione esplicita dopo modifiche, e feedback visivo all'utente sul fatto che i dati potrebbero essere in cache.

### Sfida 4: Multi-apartamento

**Problema**: Gestire tre appartamenti con dati separati ma visualizzazioni aggregate.

**Soluzione**: Context React per gestione dello stato dell'appartamento selezionato, servizi che supportano parametro per tipo calendario, vista "all" che aggrega i dati.

---

## Competenze Dimostrate

Lo sviluppo di questo progetto ha richiesto e dimostrato competenze in:

- **React Advanced**: Context, Hooks personalizzati, Code splitting, Lazy loading.
- **TypeScript**: Type safety, generics, utility types.
- **UI/UX Design**: shadcn/ui, Tailwind CSS, design system, responsive design.
- **Integrazione API**: REST APIs, Google Apps Script, gestione CORS.
- **SEO**: Meta tags, Schema.org, sitemap, performance optimization.
- **Form Handling**: React Hook Form, Zod validation, file upload.
- **Data Visualization**: Recharts, grafici per analytics.
- **Regulatory Compliance**: Formati governativi italiani, gestione dati personali.
- **Mobile Development**: PWA, Capacitor, responsive design estremo.

---

## Potenziali Sviluppi Futuri

Il progetto è strutturato per permettere espansioni future:

- **Payment integration**: Stripe o altro provider per pagamenti diretti.
- **Channel manager**: Sincronizzazione bidirezionale con OTA.
- **Booking engine avanzato**: Pagamento anticipato, coupon sconto, pacchetti.
- **Portal per ospiti**: Area riservata agli ospiti con documenti, check-in online.
- **Multi-lingua**: Supporto inglese e altre lingue.
- **Analytics avanzato**: Google Analytics 4, conversion tracking.
- **Notifiche push**: Service workers per promemoria e aggiornamenti.

---

## Conclusione

**Immerso nella Pineta** rappresenta un'applicazione web completa che bilancia esigenze contrastanti: un sito pubblico ottimizzato per la conversion e la SEO, affiancato da un sistema di backoffice potente per la gestione operativa. L'architettura basata su tecnologie moderne e best practices garantisce performance, manutenibilità e scalabilità.

Il progetto dimostra la capacità di integrare sistemi esterni (Google Sheets, Questura), implementare funzionalità complesse (generazione file regulatory), e creare un'esperienza utente coerente su multiple piattaforme (web, mobile, app nativa).
