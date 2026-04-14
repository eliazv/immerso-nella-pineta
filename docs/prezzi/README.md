# Repository Prezzi - Immerso nella Pineta (N3 e N8)

Questa cartella e il riferimento operativo per costruire, aggiornare e verificare i prezzi notte di:

- Immerso nella Pineta 3 (N3)
- Immerso nella Pineta 8 (N8)

## Struttura consigliata

- `N3 descrizione.md`
  Scheda completa alloggio N3: posizione, stanze, posti letto, dotazioni, punti di forza/debolezza e leve prezzo.

- `N8 descrizione.md`
  Scheda completa alloggio N8: posizione, stanze, posti letto, dotazioni, punti di forza/debolezza e leve prezzo.

- `Appartamenti Pinarella - Prezzi.csv`
  Listino mensile di lavoro per Airbnb e Booking (base 2026).

- `Airbnb-Booking differenza prezzi.md`
  Logica commissionale e fiscale che giustifica differenze tariffarie tra OTA.

- `Strategia prezzi 2026 N3-N8.md`
  Prezzi consigliati per mese, per piattaforma (Diretto/Airbnb/Booking), con regole di applicazione.

- `Analisi storico affitti 2024-2025 N3-N8.md`
  Analisi dati reali da `excel/Affitti3` e `excel/Affitti8`, con evidenza outlier (soprattutto canale Agenzia) e regole di pulizia.

- `Ricerca online benchmark Pinarella 2026.md`
  Ricerca di mercato online (fonti + sintesi) su benchmark prezzo e stagionalita locale.

- `excel/Appartamenti Pinarella - Affitti3.csv`
  Storico prenotazioni N3 (mix Agenzia, Airbnb, Booking, Extra).

- `excel/Appartamenti Pinarella - Affitti8.csv`
  Storico prenotazioni N8 (prevalenza Agenzia + alcuni dati Airbnb).

## Flusso operativo rapido

1. Verifica i dati strutturali in `N3 descrizione.md` e `N8 descrizione.md`.
2. Aggiorna i benchmark in `Ricerca online benchmark Pinarella 2026.md` (almeno 1 volta/mese in stagione).
3. Analizza gli ultimi dati reali in `Analisi storico affitti 2024-2025 N3-N8.md` (separando i casi Agenzia dal prezzo target OTA).
4. Aggiorna il listino in `Strategia prezzi 2026 N3-N8.md` e poi sincronizza il CSV `Appartamenti Pinarella - Prezzi.csv`.
5. Controlla la coerenza con la logica commissioni in `Airbnb-Booking differenza prezzi.md`.

## Note importanti

- Le OTA cambiano dinamicamente i prezzi in base a disponibilita residua, cancellazioni e algoritmo di domanda.
- Le date evento (es. Artevento, Ferragosto, Ironman) vanno gestite con sovrapprezzo dedicato rispetto al prezzo mese standard.
- Il prezzo diretto consigliato resta inferiore alle OTA, ma non deve scendere sotto il margine minimo obiettivo.
- Le prenotazioni Agenzia molto lunghe e a tariffa ridotta non devono abbassare automaticamente il listino Airbnb/Booking: trattarle come segmento separato o outlier commerciale.
