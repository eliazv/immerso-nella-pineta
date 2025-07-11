import 'dart:convert';
import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:path_provider/path_provider.dart';
import 'package:intl/intl.dart';

import '../models/apartment.dart';
import '../models/booking.dart';
import '../utils/constants.dart';
import 'database_service.dart';

class ImportExportService {
  static final ImportExportService _instance = ImportExportService._internal();
  factory ImportExportService() => _instance;
  ImportExportService._internal();

  final DatabaseService _databaseService = DatabaseService();

  // Export data to JSON
  Future<String?> exportToJson() async {
    try {
      final apartments = await _databaseService.getApartments();
      final bookings = await _databaseService.getBookings();

      final exportData = {
        'version': AppConstants.appVersion,
        'exportDate': DateTime.now().toIso8601String(),
        'apartments': apartments.map((apt) => apt.toJson()).toList(),
        'bookings': bookings.map((booking) => booking.toJson()).toList(),
      };

      final jsonString = const JsonEncoder.withIndent('  ').convert(exportData);
      
      // Save to downloads directory
      final directory = await getApplicationDocumentsDirectory();
      final timestamp = DateFormat('yyyyMMdd_HHmmss').format(DateTime.now());
      final fileName = '${AppConstants.backupFilePrefix}$timestamp${AppConstants.backupFileExtension}';
      final file = File('${directory.path}/$fileName');
      
      await file.writeAsString(jsonString);
      
      return file.path;
    } catch (e) {
      throw Exception('Errore durante l\'esportazione: $e');
    }
  }

  // Import data from JSON
  Future<ImportResult> importFromJson() async {
    try {
      final result = await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: ['json'],
        allowMultiple: false,
      );

      if (result == null || result.files.isEmpty) {
        return ImportResult(success: false, message: 'Nessun file selezionato');
      }

      final file = File(result.files.first.path!);
      final jsonString = await file.readAsString();
      final data = jsonDecode(jsonString) as Map<String, dynamic>;

      // Validate data structure
      if (!data.containsKey('apartments') || !data.containsKey('bookings')) {
        return ImportResult(
          success: false, 
          message: 'Formato file non valido'
        );
      }

      int apartmentsImported = 0;
      int bookingsImported = 0;

      // Import apartments
      final apartmentsData = data['apartments'] as List<dynamic>;
      for (final apartmentJson in apartmentsData) {
        try {
          final apartment = Apartment.fromJson(apartmentJson as Map<String, dynamic>);
          await _databaseService.insertApartment(apartment);
          apartmentsImported++;
        } catch (e) {
          // Skip invalid apartments
          continue;
        }
      }

      // Import bookings
      final bookingsData = data['bookings'] as List<dynamic>;
      for (final bookingJson in bookingsData) {
        try {
          final booking = Booking.fromJson(bookingJson as Map<String, dynamic>);
          await _databaseService.insertBooking(booking);
          bookingsImported++;
        } catch (e) {
          // Skip invalid bookings
          continue;
        }
      }

      return ImportResult(
        success: true,
        message: 'Importazione completata: $apartmentsImported appartamenti, $bookingsImported prenotazioni',
        apartmentsImported: apartmentsImported,
        bookingsImported: bookingsImported,
      );
    } catch (e) {
      return ImportResult(
        success: false,
        message: 'Errore durante l\'importazione: $e',
      );
    }
  }

  // Import iCal file (simplified implementation)
  Future<ImportResult> importFromICal() async {
    try {
      final result = await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: ['ics'],
        allowMultiple: false,
      );

      if (result == null || result.files.isEmpty) {
        return ImportResult(success: false, message: 'Nessun file selezionato');
      }

      final file = File(result.files.first.path!);
      final icalContent = await file.readAsString();

      // Parse iCal content (simplified)
      final bookings = _parseICalContent(icalContent);
      
      int bookingsImported = 0;
      for (final booking in bookings) {
        try {
          await _databaseService.insertBooking(booking);
          bookingsImported++;
        } catch (e) {
          // Skip invalid bookings
          continue;
        }
      }

      return ImportResult(
        success: true,
        message: 'Importazione iCal completata: $bookingsImported prenotazioni',
        bookingsImported: bookingsImported,
      );
    } catch (e) {
      return ImportResult(
        success: false,
        message: 'Errore durante l\'importazione iCal: $e',
      );
    }
  }

  // Simplified iCal parser
  List<Booking> _parseICalContent(String content) {
    final bookings = <Booking>[];
    final lines = content.split('\n');
    
    String? summary;
    DateTime? dtStart;
    DateTime? dtEnd;
    String? description;

    for (final line in lines) {
      final trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('SUMMARY:')) {
        summary = trimmedLine.substring(8);
      } else if (trimmedLine.startsWith('DTSTART:')) {
        dtStart = _parseICalDate(trimmedLine.substring(8));
      } else if (trimmedLine.startsWith('DTEND:')) {
        dtEnd = _parseICalDate(trimmedLine.substring(6));
      } else if (trimmedLine.startsWith('DESCRIPTION:')) {
        description = trimmedLine.substring(12);
      } else if (trimmedLine == 'END:VEVENT') {
        // End of event, create booking if we have required data
        if (summary != null && dtStart != null && dtEnd != null) {
          final booking = Booking(
            id: DateTime.now().millisecondsSinceEpoch.toString(),
            guestName: summary,
            ota: 'Imported',
            checkIn: dtStart,
            checkOut: dtEnd,
            nights: dtEnd.difference(dtStart).inDays,
            adults: 2, // Default
            children: 0,
            pets: 0,
            totalClient: 0.0, // Will need to be updated manually
            cleaningCost: 0.0,
            discounts: 0.0,
            supplements: 0.0,
            otaCommission: 0.0,
            touristTax: 0.0,
            flatTax: 0.0,
            netTotal: 0.0,
            notes: description,
            apartmentId: '', // Will need to be assigned manually
            createdAt: DateTime.now(),
            updatedAt: DateTime.now(),
          );
          
          bookings.add(booking);
        }
        
        // Reset for next event
        summary = null;
        dtStart = null;
        dtEnd = null;
        description = null;
      }
    }
    
    return bookings;
  }

  DateTime? _parseICalDate(String dateString) {
    try {
      // Handle different iCal date formats
      if (dateString.contains('T')) {
        // DateTime format: 20231225T140000Z
        final cleanDate = dateString.replaceAll('Z', '').replaceAll('T', '');
        if (cleanDate.length >= 8) {
          final year = int.parse(cleanDate.substring(0, 4));
          final month = int.parse(cleanDate.substring(4, 6));
          final day = int.parse(cleanDate.substring(6, 8));
          
          if (cleanDate.length >= 14) {
            final hour = int.parse(cleanDate.substring(8, 10));
            final minute = int.parse(cleanDate.substring(10, 12));
            final second = int.parse(cleanDate.substring(12, 14));
            return DateTime(year, month, day, hour, minute, second);
          } else {
            return DateTime(year, month, day);
          }
        }
      } else {
        // Date only format: 20231225
        if (dateString.length >= 8) {
          final year = int.parse(dateString.substring(0, 4));
          final month = int.parse(dateString.substring(4, 6));
          final day = int.parse(dateString.substring(6, 8));
          return DateTime(year, month, day);
        }
      }
    } catch (e) {
      // Return null if parsing fails
    }
    
    return null;
  }

  // Clear all data
  Future<bool> clearAllData() async {
    try {
      await _databaseService.clearAllData();
      return true;
    } catch (e) {
      return false;
    }
  }
}

class ImportResult {
  final bool success;
  final String message;
  final int apartmentsImported;
  final int bookingsImported;

  ImportResult({
    required this.success,
    required this.message,
    this.apartmentsImported = 0,
    this.bookingsImported = 0,
  });
}
