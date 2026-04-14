# Strategia Prezzi 2026 - N3 e N8

Data versione: 14 aprile 2026

Questo file traduce dati interni + benchmark esterni in un listino pratico per piattaforma.

## Regole base canale

- `Diretto`: prezzo migliore per il cliente finale, normalmente sotto Airbnb.
- `Airbnb`: canale base di riferimento.
- `Booking`: normalmente sopra Airbnb per allineare il netto host.

Regola rapida:

- Booking = Airbnb x 1,15 -> 1,20
- Diretto = Airbnb x 0,88 -> 0,95

## Prezzi consigliati N3 (4 posti)

| Mese      | Diretto (EUR/notte) | Airbnb (EUR/notte) | Booking (EUR/notte) | Nota operativa                    |
| --------- | ------------------- | ------------------ | ------------------- | --------------------------------- |
| Gennaio   | 49-52               | 55                 | 62                  | Bassa stagione                    |
| Febbraio  | 49-52               | 55                 | 62                  | Bassa stagione                    |
| Marzo     | 49-52               | 55                 | 62                  | Pre-stagione                      |
| Aprile    | 54-72               | 60-80              | 67-90               | Artevento/festivita alzano picchi |
| Maggio    | 58-68               | 65-75              | 73-84               | Domanda in crescita               |
| Giugno    | 72-81               | 80-90              | 90-101              | Inizio estate                     |
| Luglio    | 103-112             | 115-125            | 129-140             | Alta stagione                     |
| Agosto    | 108-117             | 120-130            | 134-146             | Ferragosto picco                  |
| Settembre | 72-81               | 80-90              | 90-101              | IRONMAN su date mirate            |
| Ottobre   | 63-68               | 70-75              | 79-84               | Calo domanda ma eventi locali     |
| Novembre  | 49-52               | 55                 | 62                  | Bassa stagione                    |
| Dicembre  | 49-63               | 55-70              | 62-79               | Natale/Capodanno su weekend       |

## Prezzi consigliati N8 (6 posti)

| Mese      | Diretto (EUR/notte) | Airbnb (EUR/notte) | Booking (EUR/notte) | Nota operativa               |
| --------- | ------------------- | ------------------ | ------------------- | ---------------------------- |
| Gennaio   | 58-63               | 65                 | 73                  | Bassa stagione               |
| Febbraio  | 58-63               | 65                 | 73                  | Bassa stagione               |
| Marzo     | 63-68               | 70                 | 78                  | Domanda lieve                |
| Aprile    | 76-95               | 85-105             | 95-118              | Artevento + ponti            |
| Maggio    | 85-95               | 95-105             | 106-118             | Spalla forte                 |
| Giugno    | 103-117             | 115-130            | 129-146             | Ingresso alta stagione       |
| Luglio    | 153-162             | 170-180            | 190-202             | Alta stagione piena          |
| Agosto    | 171-180             | 190-200            | 213-224             | Ferragosto massimi           |
| Settembre | 103-112             | 115-125            | 129-140             | IRONMAN su finestre dedicate |
| Ottobre   | 85-99               | 95-110             | 106-123             | Spalla autunnale             |
| Novembre  | 67-72               | 75                 | 84                  | Bassa stagione               |
| Dicembre  | 72-85               | 80-95              | 90-106              | Festivita                    |

## Finestre evento (override prezzo mese)

- Artevento (23 aprile - 3 maggio):
  - N3: +15% a +30%
  - N8: +15% a +30%
- Ferragosto (settimana centrale agosto):
  - N3: +20% a +35%
  - N8: +20% a +35%
- IRONMAN (17-20 settembre):
  - N3: +20% a +40%
  - N8: +20% a +45%

## Regole di ottimizzazione in stagione

- A 45-30 giorni: se occupancy mese < target, riduci 5%-8% su giorni feriali.
- A 21-14 giorni: se occupancy resta debole, riduci altri 5% su buchi 2-3 notti.
- A 10-7 giorni: se domanda forte e pochi slot, aumenta 8%-12%.
- Last minute (<= 5 giorni):
  - se invenduto, prezzo aggressivo ma mai sotto margine minimo.

## KPI minimi da tracciare ogni settimana

- Occupancy per mese (N3/N8)
- ADR (average daily rate) per canale
- Lead time medio prenotazione
- Conversione richieste diretto (WhatsApp/modulo)
- Delta prezzo diretto vs OTA

## Coerenza con file di base

I valori di Airbnb/Booking sono coerenti con il file `Appartamenti Pinarella - Prezzi.csv`, con aggiunta del canale diretto e regole evento.
