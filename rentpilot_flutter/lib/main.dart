import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:sqflite_common_ffi_web/sqflite_ffi_web.dart';
import 'package:sqflite/sqflite.dart';

import 'utils/theme.dart';
import 'utils/constants.dart';
import 'providers/apartment_provider.dart';
import 'providers/booking_provider.dart';
import 'providers/dashboard_provider.dart';
import 'screens/main_screen.dart';
import 'services/database_service.dart';

// Global notification plugin instance
final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
    FlutterLocalNotificationsPlugin();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize database factory for web
  if (kIsWeb) {
    databaseFactory = databaseFactoryFfiWeb;
  }

  // Initialize date formatting
  await initializeDateFormatting('it_IT', null);

  // Initialize notifications
  await _initializeNotifications();

  // Initialize database
  await DatabaseService().database;

  runApp(const RentPilotApp());
}

Future<void> _initializeNotifications() async {
  const AndroidInitializationSettings initializationSettingsAndroid =
      AndroidInitializationSettings('@mipmap/ic_launcher');

  const InitializationSettings initializationSettings = InitializationSettings(
    android: initializationSettingsAndroid,
  );

  await flutterLocalNotificationsPlugin.initialize(initializationSettings);
}

class RentPilotApp extends StatelessWidget {
  const RentPilotApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ApartmentProvider()),
        ChangeNotifierProvider(create: (_) => BookingProvider()),
        ChangeNotifierProvider(create: (_) => DashboardProvider()),
      ],
      child: MaterialApp(
        title: AppConstants.appName,
        theme: AppTheme.lightTheme,
        home: const MainScreen(),
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}
