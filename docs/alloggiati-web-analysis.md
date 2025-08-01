# Analisi Sistema Alloggiati Web

## Formato Tracciato Schedine

Basandomi sui file di esempio, ogni riga ha 174 caratteri (con IDAppartamento) e segue questo schema:

### Esempio di riga analizzata:
```
1613/06/202503melioli                                           chiara                        223/12/1972409048017FI100000100100000100IDENTca01376bs           408035033
```

### Posizioni dei campi (0-based):
- **Tipo Alloggiato** (0-1): "16" = capo famiglia/gruppo
- **Data Arrivo** (2-11): "13/06/2025" 
- **Giorni Permanenza** (12-13): "03"
- **Cognome** (14-63): "melioli" + spazi (50 caratteri totali)
- **Nome** (64-93): "chiara" + spazi (30 caratteri totali)
- **Sesso** (94): "2" = femmina
- **Data Nascita** (95-104): "23/12/1972"
- **Comune Nascita** (105-113): "409048017" (9 caratteri)
- **Provincia Nascita** (114-115): "FI" (2 caratteri)
- **Stato Nascita** (116-124): "100000100" (9 caratteri)
- **Cittadinanza** (125-133): "100000100" (9 caratteri)
- **Tipo Documento** (134-138): "IDENT" (5 caratteri)
- **Numero Documento** (139-158): "ca01376bs" + spazi (20 caratteri)
- **Luogo Rilascio** (159-167): "408035033" (9 caratteri)
- **IDAppartamento** (168-173): "408035033" (6 caratteri)

## Codici Identificativi

### Tipo Alloggiato:
- 16 = Capo famiglia/gruppo
- 17 = Membro famiglia/gruppo
- 18 = Ospite singolo

### Sesso:
- 1 = Maschio
- 2 = Femmina

### Tipo Documento:
- IDENT = Carta d'identità
- PASSP = Passaporto
- PATEN = Patente

## Campi Obbligatori per Form

1. **Dati Anagrafici**:
   - Cognome (max 50 caratteri)
   - Nome (max 30 caratteri)
   - Sesso (M/F)
   - Data di nascita
   - Luogo di nascita (comune + provincia per italiani, stato per stranieri)
   - Cittadinanza

2. **Documento** (solo per capo famiglia/gruppo):
   - Tipo documento
   - Numero documento (max 20 caratteri)
   - Luogo di rilascio

3. **Soggiorno**:
   - Data di arrivo
   - Numero giorni permanenza (max 30)
   - Tipo alloggiato (singolo/capo famiglia/membro famiglia)

## Validazioni Necessarie

- Data arrivo: solo oggi o ieri
- Giorni permanenza: 1-30
- Cognome: max 50 caratteri, solo lettere
- Nome: max 30 caratteri, solo lettere
- Numero documento: max 20 caratteri alfanumerici
- Formato date: gg/mm/aaaa

## Output Finale

Il sistema deve generare un file .txt con:
- Una riga per ogni ospite
- 174 caratteri per riga (con IDAppartamento)
- Codifica UTF-8
- Terminatori di riga CR+LF (tranne ultima riga)
- Max 1000 righe per file
