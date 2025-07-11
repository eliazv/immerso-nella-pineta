import 'package:flutter/foundation.dart';
import 'package:intl/intl.dart';
import '../models/booking.dart';
import '../models/apartment.dart';
import '../models/dashboard_stats.dart';
import '../services/database_service.dart';

class DashboardProvider with ChangeNotifier {
  final DatabaseService _databaseService = DatabaseService();

  DashboardStats? _stats;
  bool _isLoading = false;
  String? _error;
  int _selectedYear = DateTime.now().year;

  // Getters
  DashboardStats? get stats => _stats;
  bool get isLoading => _isLoading;
  String? get error => _error;
  int get selectedYear => _selectedYear;

  // Set selected year
  void setSelectedYear(int year) {
    if (_selectedYear != year) {
      _selectedYear = year;
      notifyListeners();
    }
  }

  // Load dashboard statistics
  Future<void> loadStats(String? apartmentId) async {
    _setLoading(true);
    _setError(null);

    try {
      final bookings = await _databaseService.getBookings();
      final apartments = await _databaseService.getApartments();
      
      // Filter bookings by apartment if specified
      List<Booking> filteredBookings = bookings;
      if (apartmentId != null && apartmentId != 'all') {
        filteredBookings = bookings.where((b) => b.apartmentId == apartmentId).toList();
      }

      // Filter by selected year
      final yearBookings = filteredBookings.where((booking) {
        return booking.checkIn.year == _selectedYear;
      }).toList();

      _stats = _calculateStats(yearBookings, apartments, apartmentId);
      notifyListeners();
    } catch (e) {
      _setError('Failed to load statistics: $e');
    } finally {
      _setLoading(false);
    }
  }

  // Calculate comprehensive statistics
  DashboardStats _calculateStats(List<Booking> bookings, List<Apartment> apartments, String? apartmentId) {
    // Occupancy calculations
    final occupancyStats = _calculateOccupancyStats(bookings, apartmentId);
    
    // Revenue calculations
    final revenueStats = _calculateRevenueStats(bookings);
    
    // OTA statistics
    final otaStats = _calculateOtaStats(bookings);
    
    // Seasonality statistics
    final seasonalityStats = _calculateSeasonalityStats(bookings);
    
    // Top and worst performing months
    final monthlyData = _calculateMonthlyPerformance(bookings);

    return DashboardStats(
      occupancy: occupancyStats,
      revenue: revenueStats,
      ota: otaStats,
      seasonality: seasonalityStats,
      topMonths: monthlyData['top'] ?? [],
      worstMonths: monthlyData['worst'] ?? [],
    );
  }

  // Calculate occupancy statistics
  OccupancyStats _calculateOccupancyStats(List<Booking> bookings, String? apartmentId) {
    final totalDaysInYear = _isLeapYear(_selectedYear) ? 366 : 365;
    
    // Calculate total available days (considering apartment count)
    int totalAvailableDays = totalDaysInYear;
    if (apartmentId == null || apartmentId == 'all') {
      // For all apartments, multiply by number of active apartments
      // This is a simplified calculation - in reality you'd want to consider
      // when each apartment was active during the year
      totalAvailableDays = totalDaysInYear; // Simplified for now
    }

    // Calculate occupied days
    int occupiedDays = 0;
    for (final booking in bookings) {
      occupiedDays += booking.nights;
    }

    final occupancyRate = totalAvailableDays > 0 ? (occupiedDays / totalAvailableDays) * 100 : 0.0;

    // Monthly occupancy
    final monthlyOccupancy = <MonthlyOccupancy>[];
    for (int month = 1; month <= 12; month++) {
      final monthBookings = bookings.where((b) => b.checkIn.month == month).toList();
      final monthOccupiedDays = monthBookings.fold<int>(0, (sum, b) => sum + b.nights);
      final daysInMonth = DateTime(_selectedYear, month + 1, 0).day;
      final monthRate = daysInMonth > 0 ? (monthOccupiedDays / daysInMonth) * 100 : 0.0;
      
      monthlyOccupancy.add(MonthlyOccupancy(
        month: DateFormat('MMM').format(DateTime(_selectedYear, month)),
        rate: monthRate,
      ));
    }

    return OccupancyStats(
      totalDays: totalAvailableDays,
      occupiedDays: occupiedDays,
      occupancyRate: occupancyRate,
      monthlyOccupancy: monthlyOccupancy,
    );
  }

  // Calculate revenue statistics
  RevenueStats _calculateRevenueStats(List<Booking> bookings) {
    final totalRevenue = bookings.fold<double>(0, (sum, b) => sum + b.netTotal);
    final totalNights = bookings.fold<int>(0, (sum, b) => sum + b.nights);
    
    final averagePerBooking = bookings.isNotEmpty ? totalRevenue / bookings.length : 0.0;
    final averagePerNight = totalNights > 0 ? totalRevenue / totalNights : 0.0;

    // Monthly revenue
    final monthlyRevenue = <MonthlyRevenue>[];
    for (int month = 1; month <= 12; month++) {
      final monthBookings = bookings.where((b) => b.checkIn.month == month).toList();
      final monthRevenue = monthBookings.fold<double>(0, (sum, b) => sum + b.netTotal);
      
      monthlyRevenue.add(MonthlyRevenue(
        month: DateFormat('MMM').format(DateTime(_selectedYear, month)),
        revenue: monthRevenue,
      ));
    }

    // Yearly revenue (for trends)
    final yearlyRevenue = <YearlyRevenue>[
      YearlyRevenue(year: _selectedYear.toString(), revenue: totalRevenue),
    ];

    return RevenueStats(
      totalRevenue: totalRevenue,
      averagePerNight: averagePerNight,
      averagePerBooking: averagePerBooking,
      monthlyRevenue: monthlyRevenue,
      yearlyRevenue: yearlyRevenue,
    );
  }

  // Calculate OTA statistics
  OtaStats _calculateOtaStats(List<Booking> bookings) {
    final otaGroups = <String, List<Booking>>{};
    
    for (final booking in bookings) {
      otaGroups.putIfAbsent(booking.ota, () => []).add(booking);
    }

    final bookingCount = otaGroups.entries.map((entry) => 
      OtaBookingCount(ota: entry.key, count: entry.value.length)
    ).toList();

    final revenue = otaGroups.entries.map((entry) => 
      OtaRevenue(
        ota: entry.key, 
        revenue: entry.value.fold<double>(0, (sum, b) => sum + b.netTotal)
      )
    ).toList();

    final averagePerNight = otaGroups.entries.map((entry) {
      final totalRevenue = entry.value.fold<double>(0, (sum, b) => sum + b.netTotal);
      final totalNights = entry.value.fold<int>(0, (sum, b) => sum + b.nights);
      final average = totalNights > 0 ? totalRevenue / totalNights : 0.0;
      
      return OtaAveragePerNight(ota: entry.key, average: average);
    }).toList();

    return OtaStats(
      bookingCount: bookingCount,
      revenue: revenue,
      averagePerNight: averagePerNight,
    );
  }

  // Calculate seasonality statistics
  SeasonalityStats _calculateSeasonalityStats(List<Booking> bookings) {
    final monthlyBookings = <MonthlyBookings>[];
    final monthlyAvgPrice = <MonthlyAvgPrice>[];

    for (int month = 1; month <= 12; month++) {
      final monthBookings = bookings.where((b) => b.checkIn.month == month).toList();
      final count = monthBookings.length;
      final avgPrice = monthBookings.isNotEmpty 
          ? monthBookings.fold<double>(0, (sum, b) => sum + b.netTotal) / monthBookings.length
          : 0.0;

      monthlyBookings.add(MonthlyBookings(
        month: DateFormat('MMM').format(DateTime(_selectedYear, month)),
        count: count,
      ));

      monthlyAvgPrice.add(MonthlyAvgPrice(
        month: DateFormat('MMM').format(DateTime(_selectedYear, month)),
        price: avgPrice,
      ));
    }

    return SeasonalityStats(
      monthlyBookings: monthlyBookings,
      monthlyAvgPrice: monthlyAvgPrice,
    );
  }

  // Calculate monthly performance for top/worst months
  Map<String, List<MonthlyData>> _calculateMonthlyPerformance(List<Booking> bookings) {
    final monthlyData = <MonthlyData>[];

    for (int month = 1; month <= 12; month++) {
      final monthBookings = bookings.where((b) => b.checkIn.month == month).toList();
      final revenue = monthBookings.fold<double>(0, (sum, b) => sum + b.netTotal);
      final occupiedDays = monthBookings.fold<int>(0, (sum, b) => sum + b.nights);
      final daysInMonth = DateTime(_selectedYear, month + 1, 0).day;
      final occupancyRate = daysInMonth > 0 ? (occupiedDays / daysInMonth) * 100 : 0.0;

      monthlyData.add(MonthlyData(
        month: DateFormat('MMM').format(DateTime(_selectedYear, month)),
        occupancyRate: occupancyRate,
        revenue: revenue,
      ));
    }

    // Sort by revenue for top/worst
    monthlyData.sort((a, b) => b.revenue.compareTo(a.revenue));

    return {
      'top': monthlyData.take(3).toList(),
      'worst': monthlyData.reversed.take(3).toList(),
    };
  }

  // Helper method to check if year is leap year
  bool _isLeapYear(int year) {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
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
}
