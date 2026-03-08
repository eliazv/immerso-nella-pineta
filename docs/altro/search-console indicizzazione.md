su search console mi dice che ci sono 29 pagine nelal sitemap ma solo 2 sono indicizzate, come mai? possiamo correggere dato che sono solo 2 pagine indicizzate e tante altre non vengomo mai indicizzte? inoltre analizza i dati di docs\search-console\https*\_\_immerso.eliazavatta.it*-Performance-on-Search-2026-03-05 , ha smesso di fare impressioni il sito dal 21 febbraio come mai? analizza la struttura dell'app , la divisione dei 2 alloggi è fattoa bene? ci sono problemi di indicizzazione? si pottrebbe fare meglio al divisione senza stravogere nulla? i blog sono adtti? sono migliroabili o ci sono blog importanti da aggiungere per SEO?
puoi contorllare? inotlre voglio che per i blog fai una struttura miglriore visivamente e piu bella e professionale , ottimizzata da mobile metti link ad altri articoli dove serve e in fodno metti sempre tasto epr portare a prenotaizone o a sceglere appartamenteo (porta a pagina principale). miglrioa gli articoli epr seo . avevi iiziato refactoring dei blog continua

Sitemap

/sitemap.xml
Ultima lettura
08/02/26
Pagine rilevate
29
Video rilevati
0

Sitemap elaborata correttamente

Indicizzazione delle pagine
Ultimo aggiornamento: 24/02/26
Impressioni
Pagine
05/12/25
16/12/25
27/12/25
07/01/26
18/01/26
29/01/26
09/02/26
20/02/26
30
20
10
0
2
2
2
info_filled
Perché le pagine non sono indicizzate
Le pagine che non sono indicizzate non possono essere pubblicate su Google
Ragione Sorgente

Convalida Tendenza Pagine
Soft 404 Sito web

Non iniziata
1
Pagina scansionata, ma attualmente non indicizzata Sistemi di Google

Non iniziata
1
Rilevata, ma attualmente non indicizzata Sistemi di Google
N/D
0
Righe per pagina:
1-3 di 3

# analisi gemini

Analisi SEO e Struttura App - Immerso nella Pineta

1. Perché solo 2 pagine indicizzate e crollo impressioni dal 21 Febbraio
   Il problema principale è che l'applicazione è una Single Page Application (SPA) basata su React e Vite. Attualmente su Vercel:

Il comando di build eseguito è npm run build che genera solo il file
index.html
vuoto per la SPA (Client-Side Rendering).
Il file
scripts/prerender.js
(che genera l'HTML statico leggibile da Google) non viene eseguito durante il deploy standard.
Inoltre, le regole nel file
vercel.json
forzano il server a restituire sempre
index.html
ignorando qualsiasi file statico generato con il prerendering.
Di conseguenza, Googlebot per tutte e 29 le pagine della sitemap ha visto sempre lo stesso file vuoto iniziale, scartando le pagine come "Soft 404" o "Rilevata, ma non indicizzata" a causa dei contenuti duplicati o non immediatamente visibili. Il crollo del 21 Febbraio è dovuto quasi sicuramente al fatto che Googlebot ha smesso di provare a renderizzare le pagine tramite Javascript dopo ripetuti tentativi infruttuosi o aggiornamenti dell'algoritmo che hanno penalizzato questo approccio puro CSR per il sito. 2. Struttura dell'App (I 2 Alloggi)
La divisione degli alloggi (/pineta3 e /pineta8) utilizzando un contesto React (
AccommodationContext
) che cambia contenuto in base all'URL è fatta bene dal punto di vista dello sviluppo, in quanto limita la duplicazione di codice (DRY). Tuttavia presenta criticità dal punto di vista SEO finché non viene applicato correttamente il prerendering.

Problema attuale: C'è un problema di contenuti duplicati nella pagina attrazioni. Attualmente
sitemap.xml
elenca sia /pineta3/attractions che /pineta8/attractions, ma nel file
App.tsx
queste rotte reindirizzano alla pagina unificata /attractions. Dobbiamo rimuovere le vecchie rotte divise dalla sitemap e tenere solo /attractions.

Come migliorare senza stravolgere: Dobbiamo solo assicurarci che lo script
prerender.js
navighi con Puppeteer su tutte le rotte valide della sitemap per generare un HTML statico perfetto per ogni alloggio.

Blog importanti da aggiungere:

"Appartamenti vacanze Pinarella animali ammessi" (Molto ricercato, la struttura li accetta).
"Dove dormire a Pinarella vicino alla pineta" o "Case vacanze con giardino a Pinarella".
"Miglior periodo per andare a Pinarella di Cervia con i bambini". 4. Miglioramento Interfaccia Blog
L'utente ha segnalato che l'interfaccia attuale del blog è migliorabile:

Hero Image: Aggiungere un'immagine stock accattivante in alto in ogni articolo.
Navigazione: Il tasto "Torna al blog" è mal posizionato (sotto l'header) e difficile da cliccare. Va spostato e reso più visibile.
Struttura: Unificare la struttura delle pagine tramite un componente BlogPostLayout.
Call to Action: Inserire sempre un tasto di prenotazione a fondo pagina.
Internal Linking: Aggiungere link tra gli articoli correlati per migliorare l'engagement e la SEO.
Proposed Changes
Configuration
Modificheremo le impostazioni del progetto per generare e servire correttamente i contenuti HTML a Google.

[MODIFY]
package.json
Modificare lo script "build" per includere l'esecuzione del prerendering: "build": "node ./scripts/generate-sitemap.js && vite build && node ./scripts/prerender.js"
[MODIFY]
vercel.json
Modificare il file per attivare cleanUrls: true e regolare il fallback (rewrites) in modo che Vercel serva i file HTML prerenderizzati se esistono, prima di ricadere sull'index.html della SPA.
SEO e Prerendering Scripts
[MODIFY]
scripts/generate-sitemap.js
Rimuovere /pineta3/attractions e /pineta8/attractions e aggiungere la singola voce /attractions.
Esportare l'elenco delle rotte in modo che possa essere utilizzato dallo script di prerendering o esportare un JSON temporaneo in fase di build.
[MODIFY]
scripts/prerender.js
Correggere l'importazione mancante di routes da
generate-sitemap.js
.
Modificare lo script affinché legga dinamicamente TUTTE le rotte definite per la sitemap.
UI Components
[NEW] src/components/blog/BlogPostLayout.tsx
Creare un layout condiviso per tutti gli articoli del blog che includa:
Hero image dinamica.
Tasto "Torna al Blog" ben posizionato e stilizzato.
Sezione contenuto con Prose (Tailwind Typography).
Sezione CTA di prenotazione a fondo pagina.
Link agli altri articoli.
[MODIFY] src/pages/blog/\*.tsx
Refactor di tutti i file del blog per utilizzare il nuovo BlogPostLayout.
Verification Plan
Verifica della build locale: Eseguire npm run build e verificare che la cartella dist contenga sottocartelle per ogni rotta (es. dist/pineta3/index.html, dist/blog/cosa-fare-pinarella/index.html) e che questi file HTML contengano il testo corretto dell'app.
Distribuzione su Vercel: Una volta verificata la build in locale, inviare le modifiche. Vercel adesso eseguirà
prerender.js
.
Verifica dell'indicizzazione: Accedere nuovamente a Google Search Console e per una URL di test (es. /blog/cosa-fare-pinarella) cliccare su "Richiedi Indicizzazione" e verificare tramite l'opzione "Visualizza Pagina Testata" che l'HTML scaricato da Google sia competo di testi e SEO tags.
