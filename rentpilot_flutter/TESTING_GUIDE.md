# Guida al Testing - RentPilot Flutter

## Setup Iniziale

### 1. Installazione Dipendenze
```bash
cd rentpilot_flutter
flutter pub get
dart run build_runner build --delete-conflicting-outputs
```

### 2. Verifica Configurazione
```bash
flutter doctor
flutter devices
```

### 3. Esecuzione App
```bash
# Debug mode
flutter run

# Release mode
flutter run --release

# Specifica device
flutter run -d <device-id>
```

## Test Funzionalità

### 🏠 **Test Gestione Appartamenti**

#### Creazione Appartamento
1. Apri l'app
2. Vai alla tab "Appartamenti" (ultima icona)
3. Tap sul FAB (+)
4. Compila il form:
   - Nome: "Casa Vacanze Centro"
   - Descrizione: "Appartamento nel centro storico"
   - Max Ospiti: 4
   - Prezzo Base: 80
   - Costo Pulizie: 30
5. Tap "Crea"
6. ✅ Verifica che l'appartamento appaia nella lista

#### Modifica Appartamento
1. Tap su un appartamento esistente
2. Tap "Modifica"
3. Cambia alcuni valori
4. Salva
5. ✅ Verifica che le modifiche siano persistenti

### 📅 **Test Calendario**

#### Navigazione Calendario
1. Vai alla tab "Calendario"
2. Naviga tra i mesi usando le frecce
3. Cambia formato (mese/settimana) se disponibile
4. ✅ Verifica che la navigazione sia fluida

#### Filtro Appartamenti
1. Nel calendario, usa il dropdown appartamenti
2. Seleziona "Tutti gli appartamenti"
3. Seleziona un appartamento specifico
4. ✅ Verifica che il filtro funzioni correttamente

### 📊 **Test Statistiche**

#### Visualizzazione Grafici
1. Vai alla tab "Statistiche"
2. Verifica che i grafici si caricino:
   - Tasso di Occupazione
   - Ricavi Mensili
   - Distribuzione OTA
3. ✅ Controlla che non ci siano errori di rendering

#### Cambio Anno
1. Nelle statistiche, cambia l'anno dal dropdown
2. ✅ Verifica che i dati si aggiornino

#### Filtro Appartamenti
1. Cambia appartamento dal dropdown bottom
2. ✅ Verifica che le statistiche si aggiornino

### 🏡 **Test Home Dashboard**

#### Cards Riassuntive
1. Vai alla tab "Home"
2. Verifica che le cards mostrino:
   - Ricavi Totali
   - Tasso Occupazione
   - Numero Prenotazioni
   - Media per Notte
3. ✅ Controlla che i valori siano coerenti

#### FAB Opzioni
1. Tap sul FAB (+) nella home
2. Verifica che appaia il bottom sheet con opzioni:
   - Nuova Prenotazione
   - Nuovo Appartamento
   - Importa iCal
3. ✅ Testa che ogni opzione risponda correttamente

## Test Persistenza Dati

### Database SQLite
1. Crea alcuni appartamenti
2. Chiudi completamente l'app
3. Riapri l'app
4. ✅ Verifica che i dati siano ancora presenti

### State Management
1. Cambia appartamento selezionato
2. Naviga tra le tab
3. ✅ Verifica che la selezione sia mantenuta

## Test UI/UX

### Responsive Design
1. Ruota il device (portrait/landscape)
2. ✅ Verifica che il layout si adatti correttamente

### Tema e Colori
1. Verifica che i colori seguano la palette:
   - Primary: #3DA9A9 (Teal)
   - Accent: #60D394 (Mint Green)
   - Background: #F7F9FA (Light Gray)
2. ✅ Controlla che il font Inter sia applicato

### Navigazione Bottom
1. Tap su ogni tab della bottom navigation
2. ✅ Verifica che:
   - Le icone cambino stato (outline/filled)
   - I colori si aggiornino
   - Le schermate si caricino correttamente

### Dropdown Appartamenti
1. Tap sull'ultima tab (Appartamenti)
2. ✅ Verifica che il dropdown mostri:
   - "Tutti gli appartamenti"
   - Lista appartamenti con colori
   - "Gestisci appartamenti"

## Test Performance

### Caricamento Dati
1. Crea molti appartamenti (10+)
2. ✅ Verifica che le liste scorrano fluidamente

### Navigazione
1. Naviga rapidamente tra le tab
2. ✅ Verifica che non ci siano lag o freeze

### Memory Usage
1. Usa l'app per 10+ minuti
2. ✅ Monitora che non ci siano memory leak

## Test Error Handling

### Validazione Form
1. Prova a creare un appartamento senza nome
2. ✅ Verifica che appaia un errore di validazione

### Dati Mancanti
1. Apri statistiche senza dati
2. ✅ Verifica che mostri stati vuoti appropriati

### Network (se applicabile)
1. Disabilita internet
2. ✅ Verifica che l'app funzioni offline

## Test su Diversi Device

### Android
- Testa su Android 7+ (API 24+)
- Verifica permessi notifiche
- Testa file picker per import

### iOS (se disponibile)
- Testa su iOS 12+
- Verifica permessi file system
- Testa notifiche locali

## Checklist Finale

### Funzionalità Core
- [ ] Creazione/modifica/eliminazione appartamenti
- [ ] Navigazione calendario
- [ ] Visualizzazione statistiche
- [ ] Persistenza dati
- [ ] Filtri appartamenti

### UI/UX
- [ ] Tema applicato correttamente
- [ ] Navigazione fluida
- [ ] Responsive design
- [ ] Stati di caricamento
- [ ] Gestione errori

### Performance
- [ ] Avvio app < 3 secondi
- [ ] Navigazione tab < 500ms
- [ ] Scroll liste fluido
- [ ] Nessun memory leak

### Compatibilità
- [ ] Android 7+ funzionante
- [ ] Orientamento portrait/landscape
- [ ] Diverse dimensioni schermo

## Problemi Comuni

### Build Errors
```bash
# Pulisci build cache
flutter clean
flutter pub get
dart run build_runner build --delete-conflicting-outputs
```

### Database Issues
```bash
# Reset database (elimina dati)
flutter clean
# Oppure disinstalla e reinstalla l'app
```

### Dependency Conflicts
```bash
# Aggiorna dipendenze
flutter pub upgrade
dart run build_runner build --delete-conflicting-outputs
```

## Report Bug

Quando trovi un bug, includi:
1. **Device**: Modello e OS version
2. **Steps**: Passi per riprodurre
3. **Expected**: Comportamento atteso
4. **Actual**: Comportamento osservato
5. **Logs**: Output console se disponibile

```bash
# Per ottenere logs dettagliati
flutter run --verbose
```

## Metriche di Successo

L'app è considerata pronta quando:
- ✅ Tutti i test core passano
- ✅ Performance accettabili
- ✅ UI coerente e responsive
- ✅ Nessun crash durante uso normale
- ✅ Dati persistenti correttamente
