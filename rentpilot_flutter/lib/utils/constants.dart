import 'package:flutter/material.dart';

// App Constants
class AppConstants {
  static const String appName = 'RentPilot';
  static const String appVersion = '1.0.0';
  
  // Database
  static const String databaseName = 'rentpilot.db';
  static const int databaseVersion = 1;
  
  // Shared Preferences Keys
  static const String selectedApartmentKey = 'selected_apartment';
  static const String selectedYearKey = 'selected_year';
  static const String themeKey = 'theme_mode';
  
  // OTA Options
  static const List<String> otaOptions = [
    'Airbnb',
    'Booking.com',
    'Direct',
    'Other',
  ];
  
  // Apartment Icons (Material Icons)
  static const List<String> apartmentIcons = [
    'home',
    'house',
    'apartment',
    'villa',
    'cottage',
    'cabin',
    'hotel',
    'business',
  ];
  
  // Default Colors for Apartments
  static const List<String> apartmentColors = [
    '#3DA9A9', // Primary Teal
    '#60D394', // Mint Green
    '#FF6B6B', // Coral Red
    '#4ECDC4', // Turquoise
    '#45B7D1', // Sky Blue
    '#96CEB4', // Sage Green
    '#FFEAA7', // Warm Yellow
    '#DDA0DD', // Plum
    '#98D8C8', // Mint
    '#F7DC6F', // Light Yellow
  ];
  
  // Animation Durations
  static const Duration shortAnimation = Duration(milliseconds: 200);
  static const Duration mediumAnimation = Duration(milliseconds: 300);
  static const Duration longAnimation = Duration(milliseconds: 500);
  
  // Spacing
  static const double spacingXS = 4.0;
  static const double spacingS = 8.0;
  static const double spacingM = 16.0;
  static const double spacingL = 24.0;
  static const double spacingXL = 32.0;
  static const double spacingXXL = 48.0;
  
  // Border Radius
  static const double radiusS = 8.0;
  static const double radiusM = 12.0;
  static const double radiusL = 16.0;
  static const double radiusXL = 24.0;
  
  // Icon Sizes
  static const double iconS = 16.0;
  static const double iconM = 24.0;
  static const double iconL = 32.0;
  static const double iconXL = 48.0;
  
  // Chart Colors
  static const List<Color> chartColors = [
    Color(0xFF3DA9A9), // Primary
    Color(0xFF60D394), // Accent
    Color(0xFF45B7D1), // Blue
    Color(0xFF96CEB4), // Green
    Color(0xFFFFEAA7), // Yellow
    Color(0xFFFF6B6B), // Red
    Color(0xFFDDA0DD), // Purple
    Color(0xFF98D8C8), // Mint
  ];
  
  // Validation
  static const int maxGuestNameLength = 100;
  static const int maxApartmentNameLength = 50;
  static const int maxNotesLength = 500;
  static const int maxAddressLength = 200;
  static const int maxDescriptionLength = 300;
  
  // Date Formats
  static const String dateFormat = 'dd/MM/yyyy';
  static const String dateTimeFormat = 'dd/MM/yyyy HH:mm';
  static const String monthYearFormat = 'MMM yyyy';
  static const String monthFormat = 'MMM';
  
  // Currency
  static const String currencySymbol = '€';
  static const String currencyCode = 'EUR';
  
  // Notification IDs
  static const int checkInNotificationId = 1;
  static const int checkOutNotificationId = 2;
  static const int cleaningNotificationId = 3;
  
  // File Extensions
  static const List<String> supportedImageExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'webp',
  ];
  
  static const List<String> supportedImportExtensions = [
    'json',
    'ics',
    'csv',
  ];
  
  // URLs
  static const String privacyPolicyUrl = 'https://rentpilot.com/privacy';
  static const String termsOfServiceUrl = 'https://rentpilot.com/terms';
  static const String supportUrl = 'https://rentpilot.com/support';
  
  // Error Messages
  static const String genericErrorMessage = 'An error occurred. Please try again.';
  static const String networkErrorMessage = 'Network error. Please check your connection.';
  static const String validationErrorMessage = 'Please check your input and try again.';
  
  // Success Messages
  static const String apartmentCreatedMessage = 'Apartment created successfully';
  static const String apartmentUpdatedMessage = 'Apartment updated successfully';
  static const String apartmentDeletedMessage = 'Apartment deleted successfully';
  static const String bookingCreatedMessage = 'Booking created successfully';
  static const String bookingUpdatedMessage = 'Booking updated successfully';
  static const String bookingDeletedMessage = 'Booking deleted successfully';
  
  // Limits
  static const int maxApartments = 50;
  static const int maxBookingsPerApartment = 1000;
  static const int maxYearsBack = 10;
  static const int maxYearsForward = 5;
  
  // Chart Limits
  static const int maxChartDataPoints = 12; // For monthly data
  static const int maxOccupancyPeriods = 6; // 6 weeks or 6 months
  
  // Backup
  static const String backupFilePrefix = 'rentpilot_backup_';
  static const String backupFileExtension = '.json';
}

// Helper class for getting colors
class AppColors {
  static const Color primary = Color(0xFF3DA9A9);      // Teal
  static const Color secondary = Color(0xFF37474F);    // Slate gray
  static const Color background = Color(0xFFF7F9FA);   // Light gray
  static const Color accent = Color(0xFF60D394);       // Mint green
  static const Color error = Color(0xFFFF6B6B);        // Coral red
  static const Color surface = Colors.white;
  static const Color onPrimary = Colors.white;
  static const Color onSecondary = Colors.white;
  static const Color onBackground = Color(0xFF37474F);
  static const Color onSurface = Color(0xFF37474F);
  static const Color onError = Colors.white;
  
  // Additional colors
  static const Color success = Color(0xFF60D394);
  static const Color warning = Color(0xFFFFEAA7);
  static const Color info = Color(0xFF45B7D1);
  
  // Neutral colors
  static const Color neutral50 = Color(0xFFFAFAFA);
  static const Color neutral100 = Color(0xFFF5F5F5);
  static const Color neutral200 = Color(0xFFEEEEEE);
  static const Color neutral300 = Color(0xFFE0E0E0);
  static const Color neutral400 = Color(0xFFBDBDBD);
  static const Color neutral500 = Color(0xFF9E9E9E);
  static const Color neutral600 = Color(0xFF757575);
  static const Color neutral700 = Color(0xFF616161);
  static const Color neutral800 = Color(0xFF424242);
  static const Color neutral900 = Color(0xFF212121);
  
  // Get color from hex string
  static Color fromHex(String hexString) {
    final buffer = StringBuffer();
    if (hexString.length == 6 || hexString.length == 7) buffer.write('ff');
    buffer.write(hexString.replaceFirst('#', ''));
    return Color(int.parse(buffer.toString(), radix: 16));
  }
  
  // Convert color to hex string
  static String toHex(Color color) {
    return '#${color.value.toRadixString(16).substring(2)}';
  }
}
