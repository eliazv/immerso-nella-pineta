# Prompt per Ricreare l'App RentPilot in Flutter/Dart

## Descrizione Generale
Crea un'applicazione Flutter per la gestione di affitti brevi (Airbnb, Booking.com) chiamata **RentPilot**. L'app deve essere completamente offline con persistenza locale dei dati e interfaccia mobile-first.

## Architettura e Tecnologie

### Stack Tecnologico
- **Framework**: Flutter/Dart
- **Persistenza**: SQLite con `sqflite` package
- **State Management**: Provider o Riverpod
- **UI**: Material Design 3 con tema personalizzato
- **Calendario**: `table_calendar` package
- **Charts**: `fl_chart` package
- **File Import**: `file_picker` per import iCal/JSON
- **Notifiche**: `flutter_local_notifications`

### Architettura
```
lib/
├── main.dart
├── models/
│   ├── apartment.dart
│   ├── booking.dart
│   └── dashboard_stats.dart
├── services/
│   ├── database_service.dart
│   ├── booking_service.dart
│   ├── apartment_service.dart
│   └── dashboard_service.dart
├── providers/
│   ├── apartment_provider.dart
│   ├── booking_provider.dart
│   └── dashboard_provider.dart
├── screens/
│   ├── home_screen.dart
│   ├── calendar_screen.dart
│   ├── statistics_screen.dart
│   └── apartments_screen.dart
├── widgets/
│   ├── apartment_card.dart
│   ├── booking_modal.dart
│   ├── statistics_cards.dart
│   └── bottom_navigation.dart
└── utils/
    ├── constants.dart
    ├── theme.dart
    └── helpers.dart
```

## Modelli di Dati

### Apartment Model
```dart
class Apartment {
  final String id;
  final String name;
  final String? description;
  final int maxGuests;
  final String? address;
  final List<String> amenities;
  final double basePrice;
  final double cleaningFee;
  final bool isActive;
  final String color; // Hex color
  final String icon; // Material icon name
  final DateTime createdAt;
  final DateTime updatedAt;
}
```

### Booking Model
```dart
class Booking {
  final String id;
  final String guestName;
  final String ota; // Airbnb, Booking, Direct, Other
  final DateTime checkIn;
  final DateTime checkOut;
  final int nights;
  final int adults;
  final int children;
  final int pets;
  final double totalClient;
  final double cleaningCost;
  final double discounts;
  final double supplements;
  final double otaCommission;
  final double touristTax;
  final double flatTax;
  final double netTotal;
  final String? notes;
  final String apartmentId;
}
```

## Funzionalità Principali

### 1. Home Dashboard
- **Statistiche rapide**: Ricavi totali, tasso occupazione, prenotazioni
- **Prossimi check-in/check-out** (oggi e domani)
- **Lista appartamenti** con statistiche individuali
- **Floating Action Button** con 3 opzioni:
  - Nuova prenotazione
  - Nuovo appartamento
  - Import iCal/JSON

### 2. Calendario
- **Vista mensile** con eventi colorati per appartamento
- **Filtro per appartamento** o "Tutti gli appartamenti"
- **Tap su evento** apre dettagli prenotazione
- **Colori dinamici** basati sull'appartamento assegnato
- **Legenda colori** quando visualizza tutti gli appartamenti

### 3. Statistiche
- **Filtro per appartamento** e anno
- **Grafici**:
  - Tasso di occupazione (6 settimane/6 mesi)
  - Ricavi mensili
  - Confronto OTA
  - Stagionalità
- **Cards riassuntive** con percentuali di variazione
- **Top/Worst months**

### 4. Gestione Appartamenti
- **CRUD completo** per appartamenti
- **Selezione colore** e icona personalizzata
- **Statistiche per appartamento**
- **Attivazione/disattivazione**

### 5. Gestione Prenotazioni
- **Modal per creazione/modifica**
- **Validazione date** (checkout > checkin)
- **Calcolo automatico** notti e totali
- **Campi finanziari dettagliati**:
  - Totale cliente
  - Costi pulizia
  - Sconti e supplementi
  - Commissioni OTA
  - Tasse
  - Totale netto

## Design System

### Palette Colori
```dart
class AppColors {
  static const Color primary = Color(0xFF3DA9A9);      // Teal
  static const Color secondary = Color(0xFF37474F);    // Slate gray
  static const Color background = Color(0xFFF7F9FA);   // Light gray
  static const Color accent = Color(0xFF60D394);       // Mint green
  static const Color error = Color(0xFFFF6B6B);        // Coral red
  static const Color surface = Colors.white;
}
```

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: Display, Headline, Title, Body, Label

### Components
- **Cards**: Rounded corners (16px), subtle shadows
- **Buttons**: Rounded (12px), primary/outline variants
- **Bottom Navigation**: Floating style con 4 tab
- **Modals**: Scrollable, action buttons side-by-side

## Navigazione

### Bottom Navigation (4 tab)
1. **Home** (House icon)
2. **Calendario** (Calendar icon)
3. **Statistiche** (BarChart icon)
4. **Dropdown Appartamenti** (Building icon + dropdown)

### Dropdown Appartamenti
- Lista appartamenti con icona e colore
- "Tutti gli appartamenti" option
- "Impostazioni" (naviga a gestione appartamenti)

## Persistenza Dati

### Database Schema (SQLite)
```sql
-- Apartments table
CREATE TABLE apartments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  max_guests INTEGER NOT NULL,
  address TEXT,
  amenities TEXT, -- JSON array
  base_price REAL,
  cleaning_fee REAL,
  is_active INTEGER NOT NULL,
  color TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Bookings table
CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  guest_name TEXT NOT NULL,
  ota TEXT NOT NULL,
  check_in TEXT NOT NULL,
  check_out TEXT NOT NULL,
  nights INTEGER NOT NULL,
  adults INTEGER NOT NULL,
  children INTEGER DEFAULT 0,
  pets INTEGER DEFAULT 0,
  total_client REAL NOT NULL,
  cleaning_cost REAL DEFAULT 0,
  discounts REAL DEFAULT 0,
  supplements REAL DEFAULT 0,
  ota_commission REAL DEFAULT 0,
  tourist_tax REAL DEFAULT 0,
  flat_tax REAL DEFAULT 0,
  net_total REAL NOT NULL,
  notes TEXT,
  apartment_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (apartment_id) REFERENCES apartments (id)
);
```

## Funzionalità Avanzate

### Import/Export
- **Import iCal**: Parser per file .ics da Airbnb/Booking
- **Import JSON**: Backup/restore dati
- **Export JSON**: Backup completo

### Notifiche
- **Check-in oggi**: Notifica mattutina
- **Check-out oggi**: Notifica mattutina
- **Promemoria pulizie**: Basato su check-out

### Calcoli Automatici
- **Occupancy Rate**: Giorni occupati / giorni totali
- **Revenue**: Somma totali netti per periodo
- **Average per night**: Revenue / notti totali
- **Seasonal trends**: Analisi mensile

## UI/UX Specifiche

### Responsive Design
- **Mobile-first**: Ottimizzato per smartphone
- **Tablet support**: Layout adattivo
- **Landscape**: Supporto orientamento orizzontale

### Interazioni
- **Pull-to-refresh**: Su liste e dashboard
- **Swipe actions**: Su booking cards (edit/delete)
- **Long press**: Context menu
- **Haptic feedback**: Su azioni importanti

### Loading States
- **Shimmer effects**: Durante caricamento dati
- **Progress indicators**: Per operazioni lunghe
- **Empty states**: Con illustrazioni e CTA

## Testing e Qualità

### Test Coverage
- **Unit tests**: Modelli e servizi
- **Widget tests**: Componenti UI
- **Integration tests**: Flussi completi

### Performance
- **Lazy loading**: Per liste lunghe
- **Image optimization**: Per icone e assets
- **Database indexing**: Su campi frequenti

## Deployment

### Build Configuration
- **Android**: minSdkVersion 21, targetSdkVersion 34
- **iOS**: iOS 12.0+
- **Release builds**: Obfuscated, optimized

### Assets
- **App icon**: Adaptive per Android, multiple sizes iOS
- **Splash screen**: Branded con logo RentPilot
- **Fonts**: Inter embedded

## Prompt di Implementazione

**"Crea un'app Flutter completa per gestione affitti brevi chiamata RentPilot seguendo esattamente le specifiche sopra. Implementa tutti i modelli, servizi, provider, schermate e widget descritti. Usa Material Design 3 con la palette colori specificata, SQLite per persistenza, e Provider per state management. L'app deve essere completamente offline-first con tutte le funzionalità CRUD per appartamenti e prenotazioni, dashboard con statistiche, calendario con eventi colorati, e sistema di import/export. Includi validazioni, error handling, e loading states appropriati."**

---

*Questo documento fornisce una roadmap completa per ricreare l'app RentPilot in Flutter mantenendo tutte le funzionalità e il design dell'implementazione React/TypeScript originale.*
