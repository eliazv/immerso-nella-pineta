import 'package:flutter/foundation.dart';
import 'package:uuid/uuid.dart';
import '../models/booking.dart';
import '../services/database_service.dart';

class BookingProvider with ChangeNotifier {
  final DatabaseService _databaseService = DatabaseService();
  final Uuid _uuid = const Uuid();

  List<Booking> _bookings = [];
  bool _isLoading = false;
  String? _error;

  // Getters
  List<Booking> get bookings => _bookings;
  bool get isLoading => _isLoading;
  String? get error => _error;

  // Get bookings filtered by apartment
  List<Booking> getBookingsByApartment(String apartmentId) {
    if (apartmentId == 'all') return _bookings;
    return _bookings
        .where((booking) => booking.apartmentId == apartmentId)
        .toList();
  }

  // Get today's bookings (check-ins and check-outs)
  List<Booking> get todayBookings {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);

    return _bookings.where((booking) {
      final checkInDate = DateTime(
        booking.checkIn.year,
        booking.checkIn.month,
        booking.checkIn.day,
      );
      final checkOutDate = DateTime(
        booking.checkOut.year,
        booking.checkOut.month,
        booking.checkOut.day,
      );

      return checkInDate == today || checkOutDate == today;
    }).toList();
  }

  // Get upcoming bookings (next 7 days)
  List<Booking> get upcomingBookings {
    final now = DateTime.now();
    final nextWeek = now.add(const Duration(days: 7));

    return _bookings.where((booking) {
      return booking.checkIn.isAfter(now) && booking.checkIn.isBefore(nextWeek);
    }).toList()..sort((a, b) => a.checkIn.compareTo(b.checkIn));
  }

  // Get bookings for a specific date range
  List<Booking> getBookingsInRange(DateTime start, DateTime end) {
    return _bookings.where((booking) {
      return booking.checkIn.isBefore(end) && booking.checkOut.isAfter(start);
    }).toList();
  }

  // Initialize and load bookings
  Future<void> initialize() async {
    await loadBookings();
  }

  // Load all bookings from database
  Future<void> loadBookings() async {
    _setLoading(true);
    _setError(null);

    try {
      _bookings = await _databaseService.getBookings();
      _bookings.sort(
        (a, b) => b.checkIn.compareTo(a.checkIn),
      ); // Sort by check-in date, newest first
      notifyListeners();
    } catch (e) {
      _setError('Failed to load bookings: $e');
    } finally {
      _setLoading(false);
    }
  }

  // Create new booking
  Future<bool> createBooking({
    required String guestName,
    required String ota,
    required DateTime checkIn,
    required DateTime checkOut,
    required int adults,
    int? children,
    int? pets,
    required double totalClient,
    double? cleaningCost,
    double? discounts,
    double? supplements,
    double? otaCommission,
    double? touristTax,
    double? flatTax,
    String? notes,
    required String apartmentId,
  }) async {
    _setLoading(true);
    _setError(null);

    try {
      // Calculate nights
      final nights = checkOut.difference(checkIn).inDays;

      // Calculate net total
      final netTotal =
          totalClient -
          (cleaningCost ?? 0) -
          (discounts ?? 0) -
          (otaCommission ?? 0) -
          (touristTax ?? 0) -
          (flatTax ?? 0) +
          (supplements ?? 0);

      final now = DateTime.now();
      final booking = Booking(
        id: _uuid.v4(),
        guestName: guestName,
        ota: ota,
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights,
        adults: adults,
        children: children ?? 0,
        pets: pets ?? 0,
        totalClient: totalClient,
        cleaningCost: cleaningCost ?? 0.0,
        discounts: discounts ?? 0.0,
        supplements: supplements ?? 0.0,
        otaCommission: otaCommission ?? 0.0,
        touristTax: touristTax ?? 0.0,
        flatTax: flatTax ?? 0.0,
        netTotal: netTotal,
        notes: notes,
        apartmentId: apartmentId,
        createdAt: now,
        updatedAt: now,
      );

      await _databaseService.insertBooking(booking);
      await loadBookings();
      return true;
    } catch (e) {
      _setError('Failed to create booking: $e');
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Update existing booking
  Future<bool> updateBooking(
    String id, {
    String? guestName,
    String? ota,
    DateTime? checkIn,
    DateTime? checkOut,
    int? adults,
    int? children,
    int? pets,
    double? totalClient,
    double? cleaningCost,
    double? discounts,
    double? supplements,
    double? otaCommission,
    double? touristTax,
    double? flatTax,
    String? notes,
    String? apartmentId,
  }) async {
    _setLoading(true);
    _setError(null);

    try {
      final existingBooking = _bookings.firstWhere(
        (booking) => booking.id == id,
      );

      final updatedCheckIn = checkIn ?? existingBooking.checkIn;
      final updatedCheckOut = checkOut ?? existingBooking.checkOut;
      final nights = updatedCheckOut.difference(updatedCheckIn).inDays;

      final updatedTotalClient = totalClient ?? existingBooking.totalClient;
      final updatedCleaningCost = cleaningCost ?? existingBooking.cleaningCost;
      final updatedDiscounts = discounts ?? existingBooking.discounts;
      final updatedSupplements = supplements ?? existingBooking.supplements;
      final updatedOtaCommission =
          otaCommission ?? existingBooking.otaCommission;
      final updatedTouristTax = touristTax ?? existingBooking.touristTax;
      final updatedFlatTax = flatTax ?? existingBooking.flatTax;

      final netTotal =
          updatedTotalClient -
          updatedCleaningCost -
          updatedDiscounts -
          updatedOtaCommission -
          updatedTouristTax -
          updatedFlatTax +
          updatedSupplements;

      final updatedBooking = existingBooking.copyWith(
        guestName: guestName,
        ota: ota,
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights,
        adults: adults,
        children: children,
        pets: pets,
        totalClient: totalClient,
        cleaningCost: cleaningCost,
        discounts: discounts,
        supplements: supplements,
        otaCommission: otaCommission,
        touristTax: touristTax,
        flatTax: flatTax,
        netTotal: netTotal,
        notes: notes,
        apartmentId: apartmentId,
        updatedAt: DateTime.now(),
      );

      await _databaseService.updateBooking(updatedBooking);
      await loadBookings();
      return true;
    } catch (e) {
      _setError('Failed to update booking: $e');
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Delete booking
  Future<bool> deleteBooking(String id) async {
    _setLoading(true);
    _setError(null);

    try {
      await _databaseService.deleteBooking(id);
      await loadBookings();
      return true;
    } catch (e) {
      _setError('Failed to delete booking: $e');
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Get booking by ID
  Booking? getBookingById(String id) {
    try {
      return _bookings.firstWhere((booking) => booking.id == id);
    } catch (e) {
      return null;
    }
  }

  // Check for booking conflicts
  bool hasConflict(
    DateTime checkIn,
    DateTime checkOut,
    String apartmentId, {
    String? excludeBookingId,
  }) {
    return _bookings.any((booking) {
      if (booking.id == excludeBookingId) return false;
      if (booking.apartmentId != apartmentId) return false;

      return checkIn.isBefore(booking.checkOut) &&
          checkOut.isAfter(booking.checkIn);
    });
  }

  // Clear error
  void clearError() {
    _error = null;
    notifyListeners();
  }

  // Private helper methods
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String? error) {
    _error = error;
    notifyListeners();
  }

  // Add booking (accepts Booking object)
  Future<void> addBooking(Booking booking) async {
    try {
      await _databaseService.insertBooking(booking);
      _bookings.add(booking);
      _bookings.sort((a, b) => b.checkIn.compareTo(a.checkIn));
      notifyListeners();
    } catch (e) {
      _setError('Failed to add booking: $e');
      rethrow;
    }
  }

  // Save booking (accepts Booking object for update)
  Future<void> saveBooking(Booking booking) async {
    try {
      await _databaseService.updateBooking(booking);
      final index = _bookings.indexWhere((b) => b.id == booking.id);
      if (index != -1) {
        _bookings[index] = booking;
        _bookings.sort((a, b) => b.checkIn.compareTo(a.checkIn));
        notifyListeners();
      }
    } catch (e) {
      _setError('Failed to update booking: $e');
      rethrow;
    }
  }

  // Delete booking
  Future<void> removeBooking(String bookingId) async {
    try {
      await _databaseService.deleteBooking(bookingId);
      _bookings.removeWhere((b) => b.id == bookingId);
      notifyListeners();
    } catch (e) {
      _setError('Failed to delete booking: $e');
      rethrow;
    }
  }
}
