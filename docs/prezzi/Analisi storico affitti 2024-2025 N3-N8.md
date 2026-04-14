# Analisi storico affitti 2024-2025 - N3 e N8

Data aggiornamento: 14 aprile 2026
Sorgenti: `excel/Appartamenti Pinarella - Affitti3.csv` e `excel/Appartamenti Pinarella - Affitti8.csv`

## Obiettivo

Usare lo storico reale per affinare il pricing, evitando che alcune prenotazioni a ribasso (soprattutto da canale `Agenzia`) distorcano il prezzo target dei canali principali (`Airbnb`, `Booking`, `Diretto`).

## Sintesi numerica per canale

### N3 (Affitti3)

| Canale  | Prenotazioni valide | Min EUR/notte | Media EUR/notte | Max EUR/notte |
| ------- | ------------------- | ------------- | --------------- | ------------- |
| Agenzia | 4                   | 39            | 71.75           | 89            |
| Airbnb  | 12                  | 50            | 83.05           | 118           |
| Booking | 8                   | 63            | 79.31           | 99            |
| Extra   | 3                   | 100           | 101             | 103           |

Lettura operativa N3:

- Le prenotazioni Agenzia sono in media sotto Airbnb e spesso collegate a soggiorni lunghi.
- Il minimo `39 EUR/notte` e fortemente anomalo rispetto al range OTA della stagione.
- Per il listino pubblico, Airbnb e Booking restano i riferimenti principali.

### N8 (Affitti8)

| Canale  | Prenotazioni valide | Min EUR/notte | Media EUR/notte | Max EUR/notte |
| ------- | ------------------- | ------------- | --------------- | ------------- |
| Agenzia | 8                   | 41            | 106             | 124           |
| Airbnb  | 1                   | 124           | 124             | 124           |

Lettura operativa N8:

- Storico dominato da Agenzia, con ampia variabilita (da `41` a `124 EUR/notte`).
- Il valore `41 EUR/notte` e fuori scala per un 6 posti in stagione e non deve guidare il listino OTA.
- Campione Airbnb ridotto: per N8 serve monitoraggio continuo delle nuove prenotazioni dirette/OTA per consolidare il benchmark.

## Regole di pulizia dati (raccomandate)

1. Non usare automaticamente i minimi Agenzia come base prezzo OTA.
2. Segmentare i report in almeno tre blocchi: `Agenzia`, `OTA` (Airbnb+Booking), `Diretto/Extra`.
3. Considerare outlier i prezzi notte troppo distanti dal corpo principale del mese (es. trattative speciali o soggiorni molto lunghi).
4. Validare il prezzo target mensile su tre input insieme:
   - storico OTA dello stesso periodo;
   - benchmark esterno area Pinarella/Cervia;
   - saturazione calendario e lead time corrente.

## Impatto sul listino operativo 2026

- Mantenere il listino semimensile come riferimento in dashboard:
  - N3: base Airbnb circa `55-130 EUR/notte` a seconda di mese e meta mese.
  - N8: base Airbnb circa `65-200 EUR/notte` a seconda di mese e meta mese.
- Calcolare `Diretto` come sconto controllato rispetto ad Airbnb (tipicamente 8%-12%).
- Calcolare `Booking` con markup su Airbnb (tipicamente 12%-18%), coerente con fee e tasse del canale.
- Usare i prezzi Agenzia come leva tattica per riempire slot difficili, non come ancoraggio del listino pubblico.

## Collegamento dashboard

Nella pagina `/dashboard` sono state aggiunte:

- card `Listino meta mese 2026` per consultazione rapida H1/H2;
- card `Preventivo rapido` per simulare totale in base a alloggio, mese, meta mese, notti e piattaforma.

Questo riduce il rischio di applicare prezzi non coerenti quando arrivano richieste veloci su WhatsApp o OTA.
