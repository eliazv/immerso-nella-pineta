# RentPilot Flutter

Una moderna applicazione Flutter per la gestione di affitti brevi (Airbnb, Booking.com) completamente offline.

## Caratteristiche

### 🏠 **Gestione Appartamenti**

- CRUD completo per appartamenti
- Colori e icone personalizzabili
- Statistiche per appartamento
- Attivazione/disattivazione

### 📅 **Calendario Interattivo**

- Vista mensile con eventi colorati
- Filtro per appartamento
- Navigazione intuitiva
- Dettagli prenotazioni

### 📊 **Statistiche Avanzate**

- Dashboard con metriche chiave
- Grafici di occupazione e ricavi
- Analisi OTA e stagionalità
- Confronti annuali

### 📱 **Design Mobile-First**

- Material Design 3
- Tema personalizzato con palette colori
- Navigazione bottom con dropdown appartamenti
- Interfaccia responsive

### 💾 **Persistenza Offline**

- Database SQLite locale
- Import/Export JSON
- Import iCal da Airbnb/Booking
- Backup automatico

### 🔔 **Notifiche**

- Check-in/Check-out del giorno
- Promemoria pulizie
- Notifiche personalizzabili

## Tecnologie Utilizzate

- **Framework**: Flutter/Dart
- **Database**: SQLite (sqflite)
- **State Management**: Provider
- **UI**: Material Design 3
- **Charts**: fl_chart
- **Calendar**: table_calendar
- **Notifications**: flutter_local_notifications
- **File Operations**: file_picker, path_provider
- **Typography**: Google Fonts (Inter)

## Struttura del Progetto

```
lib/
├── main.dart                 # Entry point
├── models/                   # Data models
│   ├── apartment.dart
│   ├── booking.dart
│   └── dashboard_stats.dart
├── providers/                # State management
│   ├── apartment_provider.dart
│   ├── booking_provider.dart
│   └── dashboard_provider.dart
├── screens/                  # UI screens
│   ├── main_screen.dart
│   ├── home_screen.dart
│   ├── calendar_screen.dart
│   ├── statistics_screen.dart
│   └── apartments_screen.dart
├── widgets/                  # Reusable widgets
│   ├── summary_card.dart
│   ├── booking_card.dart
│   ├── apartment_card.dart
│   └── occupancy_chart.dart
├── services/                 # Business logic
│   ├── database_service.dart
│   ├── notification_service.dart
│   └── import_export_service.dart
└── utils/                    # Constants and helpers
    ├── constants.dart
    └── theme.dart
```

## Installazione

1. **Clona il repository**

   ```bash
   git clone <repository-url>
   cd rentpilot_flutter
   ```

2. **Installa le dipendenze**

   ```bash
   flutter pub get
   ```

3. **Genera i file di codice**

   ```bash
   dart run build_runner build
   ```

4. **Esegui l'app**
   ```bash
   flutter run
   ```

## Configurazione

### Database

Il database SQLite viene creato automaticamente al primo avvio. Include:

- Tabella `apartments` per gli appartamenti
- Tabella `bookings` per le prenotazioni
- Indici per performance ottimali

### Notifiche

Le notifiche locali sono configurate per:

- Check-in alle 9:00
- Check-out alle 10:00
- Pulizie alle 11:00

### Tema

Palette colori personalizzata:

- **Primary**: #3DA9A9 (Teal)
- **Secondary**: #37474F (Slate Gray)
- **Background**: #F7F9FA (Light Gray)
- **Accent**: #60D394 (Mint Green)
- **Error**: #FF6B6B (Coral Red)

## Funzionalità Principali

### Home Dashboard

- Statistiche rapide (ricavi, occupazione, prenotazioni)
- Attività del giorno (check-in/check-out)
- Lista appartamenti con metriche
- FAB per creazione rapida

### Calendario

- Vista mensile con table_calendar
- Eventi colorati per appartamento
- Filtro dinamico per appartamento
- Dettagli prenotazioni al tap

### Statistiche

- Cards riassuntive con metriche chiave
- Grafico occupazione (6 settimane/6 mesi)
- Grafico ricavi mensili
- Grafico distribuzione OTA (pie chart)
- Selezione anno dinamica

### Gestione Appartamenti

- Lista con card informative
- Modal per creazione/modifica
- Validazione form completa
- Eliminazione con conferma

## Import/Export

### Formati Supportati

- **JSON**: Backup completo di appartamenti e prenotazioni
- **iCal**: Import da Airbnb, Booking.com e altri OTA

### Processo Import

1. Seleziona file tramite file picker
2. Validazione formato e struttura
3. Import con gestione errori
4. Report risultati dettagliato

## Performance

### Ottimizzazioni

- Lazy loading per liste lunghe
- Caching provider per dati frequenti
- Indici database per query veloci
- Widget rebuilding ottimizzato

### Limiti

- Max 50 appartamenti
- Max 1000 prenotazioni per appartamento
- Dati storici fino a 10 anni

## Testing

```bash
# Unit tests
flutter test

# Widget tests
flutter test test/widget_test.dart

# Integration tests
flutter drive --target=test_driver/app.dart
```

## Build Release

### Android

```bash
flutter build apk --release
flutter build appbundle --release
```

### iOS

```bash
flutter build ios --release
```

## Contributi

1. Fork del progetto
2. Crea feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## Licenza

Distribuito sotto licenza MIT. Vedi `LICENSE` per maggiori informazioni.

## Contatti

- **Progetto**: RentPilot Flutter
- **Versione**: 1.0.0
- **Flutter**: >=3.0.0
