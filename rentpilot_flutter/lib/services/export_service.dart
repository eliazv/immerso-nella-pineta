import 'dart:convert';
import 'dart:html' as html;
import 'package:intl/intl.dart';

import '../models/booking.dart';
import '../models/apartment.dart';

class ExportService {
  static void exportBookingsToCSV(List<Booking> bookings, List<Apartment> apartments) {
    final csvData = _generateCSVData(bookings, apartments);
    final fileName = 'prenotazioni_${DateFormat('yyyy-MM-dd').format(DateTime.now())}.csv';
    _downloadFile(csvData, fileName, 'text/csv');
  }

  static void exportBookingsToJSON(List<Booking> bookings, List<Apartment> apartments) {
    final jsonData = _generateJSONData(bookings, apartments);
    final fileName = 'prenotazioni_${DateFormat('yyyy-MM-dd').format(DateTime.now())}.json';
    _downloadFile(jsonData, fileName, 'application/json');
  }

  static void exportApartmentsToCSV(List<Apartment> apartments) {
    final csvData = _generateApartmentsCSVData(apartments);
    final fileName = 'appartamenti_${DateFormat('yyyy-MM-dd').format(DateTime.now())}.csv';
    _downloadFile(csvData, fileName, 'text/csv');
  }

  static void exportApartmentsToJSON(List<Apartment> apartments) {
    final jsonData = _generateApartmentsJSONData(apartments);
    final fileName = 'appartamenti_${DateFormat('yyyy-MM-dd').format(DateTime.now())}.json';
    _downloadFile(jsonData, fileName, 'application/json');
  }

  static String _generateCSVData(List<Booking> bookings, List<Apartment> apartments) {
    final buffer = StringBuffer();
    
    // Header
    buffer.writeln('ID,Nome Ospite,OTA,Check-in,Check-out,Notti,Adulti,Bambini,Animali,'
        'Totale Cliente,Costo Pulizie,Sconti,Supplementi,Commissione OTA,'
        'Tassa Soggiorno,Tassa Fissa,Totale Netto,Note,Appartamento,Data Creazione');

    // Data rows
    for (final booking in bookings) {
      final apartment = apartments.firstWhere(
        (apt) => apt.id == booking.apartmentId,
        orElse: () => Apartment(
          id: '',
          name: 'Sconosciuto',
          maxGuests: 0,
          basePrice: 0,
          cleaningFee: 0,
          isActive: false,
          color: '#3DA9A9',
          icon: 'home',
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        ),
      );

      buffer.writeln([
        booking.id,
        _escapeCsvField(booking.guestName),
        _escapeCsvField(booking.ota),
        DateFormat('dd/MM/yyyy').format(booking.checkIn),
        DateFormat('dd/MM/yyyy').format(booking.checkOut),
        booking.nights,
        booking.adults,
        booking.children,
        booking.pets,
        booking.totalClient.toStringAsFixed(2),
        booking.cleaningCost.toStringAsFixed(2),
        booking.discounts.toStringAsFixed(2),
        booking.supplements.toStringAsFixed(2),
        booking.otaCommission.toStringAsFixed(2),
        booking.touristTax.toStringAsFixed(2),
        booking.flatTax.toStringAsFixed(2),
        booking.netTotal.toStringAsFixed(2),
        _escapeCsvField(booking.notes ?? ''),
        _escapeCsvField(apartment.name),
        DateFormat('dd/MM/yyyy HH:mm').format(booking.createdAt),
      ].join(','));
    }

    return buffer.toString();
  }

  static String _generateJSONData(List<Booking> bookings, List<Apartment> apartments) {
    final data = {
      'export_date': DateTime.now().toIso8601String(),
      'total_bookings': bookings.length,
      'bookings': bookings.map((booking) {
        final apartment = apartments.firstWhere(
          (apt) => apt.id == booking.apartmentId,
          orElse: () => Apartment(
            id: '',
            name: 'Sconosciuto',
            maxGuests: 0,
            basePrice: 0,
            cleaningFee: 0,
            isActive: false,
            color: '#3DA9A9',
            icon: 'home',
            createdAt: DateTime.now(),
            updatedAt: DateTime.now(),
          ),
        );

        return {
          'id': booking.id,
          'guest_name': booking.guestName,
          'ota': booking.ota,
          'check_in': booking.checkIn.toIso8601String(),
          'check_out': booking.checkOut.toIso8601String(),
          'nights': booking.nights,
          'adults': booking.adults,
          'children': booking.children,
          'pets': booking.pets,
          'total_client': booking.totalClient,
          'cleaning_cost': booking.cleaningCost,
          'discounts': booking.discounts,
          'supplements': booking.supplements,
          'ota_commission': booking.otaCommission,
          'tourist_tax': booking.touristTax,
          'flat_tax': booking.flatTax,
          'net_total': booking.netTotal,
          'notes': booking.notes,
          'apartment': {
            'id': apartment.id,
            'name': apartment.name,
            'color': apartment.color,
            'icon': apartment.icon,
          },
          'created_at': booking.createdAt.toIso8601String(),
          'updated_at': booking.updatedAt.toIso8601String(),
        };
      }).toList(),
    };

    return const JsonEncoder.withIndent('  ').convert(data);
  }

  static String _generateApartmentsCSVData(List<Apartment> apartments) {
    final buffer = StringBuffer();
    
    // Header
    buffer.writeln('ID,Nome,Descrizione,Max Ospiti,Indirizzo,Prezzo Base,Costo Pulizie,'
        'Attivo,Colore,Icona,Servizi,Data Creazione');

    // Data rows
    for (final apartment in apartments) {
      buffer.writeln([
        apartment.id,
        _escapeCsvField(apartment.name),
        _escapeCsvField(apartment.description ?? ''),
        apartment.maxGuests,
        _escapeCsvField(apartment.address ?? ''),
        apartment.basePrice.toStringAsFixed(2),
        apartment.cleaningFee.toStringAsFixed(2),
        apartment.isActive ? 'Sì' : 'No',
        apartment.color,
        apartment.icon,
        _escapeCsvField(apartment.amenities.join('; ')),
        DateFormat('dd/MM/yyyy HH:mm').format(apartment.createdAt),
      ].join(','));
    }

    return buffer.toString();
  }

  static String _generateApartmentsJSONData(List<Apartment> apartments) {
    final data = {
      'export_date': DateTime.now().toIso8601String(),
      'total_apartments': apartments.length,
      'apartments': apartments.map((apartment) => {
        'id': apartment.id,
        'name': apartment.name,
        'description': apartment.description,
        'max_guests': apartment.maxGuests,
        'address': apartment.address,
        'amenities': apartment.amenities,
        'base_price': apartment.basePrice,
        'cleaning_fee': apartment.cleaningFee,
        'is_active': apartment.isActive,
        'color': apartment.color,
        'icon': apartment.icon,
        'created_at': apartment.createdAt.toIso8601String(),
        'updated_at': apartment.updatedAt.toIso8601String(),
      }).toList(),
    };

    return const JsonEncoder.withIndent('  ').convert(data);
  }

  static String _escapeCsvField(String field) {
    if (field.contains(',') || field.contains('"') || field.contains('\n')) {
      return '"${field.replaceAll('"', '""')}"';
    }
    return field;
  }

  static void _downloadFile(String content, String fileName, String mimeType) {
    final bytes = utf8.encode(content);
    final blob = html.Blob([bytes], mimeType);
    final url = html.Url.createObjectUrlFromBlob(blob);
    
    final anchor = html.AnchorElement(href: url)
      ..setAttribute('download', fileName)
      ..click();
    
    html.Url.revokeObjectUrl(url);
  }

  // Generate summary report
  static void exportSummaryReport(
    List<Booking> bookings,
    List<Apartment> apartments,
    DateTime startDate,
    DateTime endDate,
  ) {
    final filteredBookings = bookings.where((booking) =>
      booking.checkIn.isAfter(startDate.subtract(const Duration(days: 1))) &&
      booking.checkIn.isBefore(endDate.add(const Duration(days: 1)))
    ).toList();

    final totalRevenue = filteredBookings.fold(0.0, (sum, booking) => sum + booking.netTotal);
    final totalBookings = filteredBookings.length;
    final averageStay = filteredBookings.isEmpty ? 0.0 : 
      filteredBookings.fold(0, (sum, booking) => sum + booking.nights) / filteredBookings.length;

    final reportData = {
      'report_period': {
        'start_date': DateFormat('dd/MM/yyyy').format(startDate),
        'end_date': DateFormat('dd/MM/yyyy').format(endDate),
      },
      'summary': {
        'total_bookings': totalBookings,
        'total_revenue': totalRevenue,
        'average_stay': averageStay,
        'active_apartments': apartments.where((apt) => apt.isActive).length,
      },
      'bookings_by_ota': _groupBookingsByOTA(filteredBookings),
      'bookings_by_apartment': _groupBookingsByApartment(filteredBookings, apartments),
      'monthly_breakdown': _getMonthlyBreakdown(filteredBookings),
      'generated_at': DateTime.now().toIso8601String(),
    };

    final jsonContent = const JsonEncoder.withIndent('  ').convert(reportData);
    final fileName = 'report_${DateFormat('yyyy-MM-dd').format(DateTime.now())}.json';
    _downloadFile(jsonContent, fileName, 'application/json');
  }

  static Map<String, dynamic> _groupBookingsByOTA(List<Booking> bookings) {
    final grouped = <String, List<Booking>>{};
    for (final booking in bookings) {
      grouped.putIfAbsent(booking.ota, () => []).add(booking);
    }

    return grouped.map((ota, bookingList) => MapEntry(ota, {
      'count': bookingList.length,
      'revenue': bookingList.fold(0.0, (sum, booking) => sum + booking.netTotal),
    }));
  }

  static Map<String, dynamic> _groupBookingsByApartment(
    List<Booking> bookings,
    List<Apartment> apartments,
  ) {
    final grouped = <String, List<Booking>>{};
    for (final booking in bookings) {
      grouped.putIfAbsent(booking.apartmentId, () => []).add(booking);
    }

    return grouped.map((apartmentId, bookingList) {
      final apartment = apartments.firstWhere(
        (apt) => apt.id == apartmentId,
        orElse: () => Apartment(
          id: apartmentId,
          name: 'Sconosciuto',
          maxGuests: 0,
          basePrice: 0,
          cleaningFee: 0,
          isActive: false,
          color: '#3DA9A9',
          icon: 'home',
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        ),
      );

      return MapEntry(apartment.name, {
        'count': bookingList.length,
        'revenue': bookingList.fold(0.0, (sum, booking) => sum + booking.netTotal),
        'occupancy_nights': bookingList.fold(0, (sum, booking) => sum + booking.nights),
      });
    });
  }

  static Map<String, dynamic> _getMonthlyBreakdown(List<Booking> bookings) {
    final monthly = <String, List<Booking>>{};
    for (final booking in bookings) {
      final monthKey = DateFormat('yyyy-MM').format(booking.checkIn);
      monthly.putIfAbsent(monthKey, () => []).add(booking);
    }

    return monthly.map((month, bookingList) => MapEntry(month, {
      'count': bookingList.length,
      'revenue': bookingList.fold(0.0, (sum, booking) => sum + booking.netTotal),
      'nights': bookingList.fold(0, (sum, booking) => sum + booking.nights),
    }));
  }
}
