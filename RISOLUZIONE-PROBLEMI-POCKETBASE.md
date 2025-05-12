# Guida alla risoluzione dei problemi di PocketBase

## Introduzione

Questo documento fornisce una guida per la risoluzione dei problemi comuni che potresti incontrare con PocketBase nell'applicazione "Immerso nella Pineta".

## Prerequisiti

1. Assicurati di avere Node.js installato (versione 16 o superiore)
2. Verifica che PocketBase sia scaricato e configurato nella cartella `pocketbase`

## Problemi comuni e soluzioni

### 1. PocketBase non si avvia

**Sintomi:**

- Messaggi di errore "PocketBase non disponibile" nell'applicazione
- Il calendario di disponibilità non mostra le date corrette

**Soluzioni:**

1. Verifica che PocketBase sia in esecuzione eseguendo lo script di test:

   ```
   node scripts\testPocketBaseEsm.js
   ```

2. Se non è in esecuzione, avvialo manualmente:

   ```
   start-pocketbase.bat
   ```

3. Verifica che la porta 8090 non sia occupata da altre applicazioni

### 2. Le collezioni non esistono o sono vuote

**Sintomi:**

- L'applicazione mostra un calendario vuoto anche se PocketBase è in esecuzione
- Errori di tipo "Collezione non trovata"

**Soluzioni:**

1. Esegui lo script di migrazione per creare le collezioni e importare i dati:

   ```
   node scripts\migrateEsm.js
   ```

2. Verifica che le collezioni siano state create correttamente accedendo all'interfaccia amministrativa di PocketBase:

   - http://127.0.0.1:8090/_/

3. Se le collezioni esistono ma sono vuote, controlla i log per errori durante la migrazione

### 3. Errori di formato data

**Sintomi:**

- Date mancanti nel calendario
- Messaggi di errore relativi a date non valide nella console

**Soluzioni:**

1. Verifica il formato delle date nei tuoi dati originali
2. I formati supportati sono:

   - DD/MM/YYYY (es. 01/05/2023)
   - YYYY-MM-DD (es. 2023-05-01)

3. Se necessario, correggi manualmente i formati delle date dall'interfaccia amministrativa di PocketBase

### 4. Cache obsoleta

**Sintomi:**

- I dati visualizzati sono vecchi o non riflettono le modifiche recenti

**Soluzioni:**

1. Svuota la cache del browser
2. Forza un aggiornamento della cache nell'applicazione:
   - Dal pannello amministrativo, utilizza il pulsante "Aggiorna dati"
   - Oppure riavvia completamente l'applicazione

## Come testare PocketBase

Abbiamo creato uno script di test dedicato che verifica se PocketBase è configurato correttamente:

```
node scripts\testPocketBaseEsm.js
```

Questo script controlla:

1. Se PocketBase è in esecuzione
2. Se le collezioni necessarie esistono
3. Se è possibile accedere ai dati

## Contatti per assistenza

Se continui a riscontrare problemi dopo aver seguito questa guida, contatta l'amministratore di sistema.
