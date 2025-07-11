import 'dart:async';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import '../models/apartment.dart';
import '../models/booking.dart';

class DatabaseService {
  static final DatabaseService _instance = DatabaseService._internal();
  factory DatabaseService() => _instance;
  DatabaseService._internal();

  static Database? _database;

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }

  Future<Database> _initDatabase() async {
    String path = join(await getDatabasesPath(), 'rentpilot.db');
    
    return await openDatabase(
      path,
      version: 1,
      onCreate: _onCreate,
      onUpgrade: _onUpgrade,
    );
  }

  Future<void> _onCreate(Database db, int version) async {
    // Create apartments table
    await db.execute('''
      CREATE TABLE apartments (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        max_guests INTEGER NOT NULL,
        address TEXT,
        amenities TEXT,
        base_price REAL,
        cleaning_fee REAL,
        is_active INTEGER NOT NULL,
        color TEXT NOT NULL,
        icon TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    ''');

    // Create bookings table
    await db.execute('''
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
      )
    ''');

    // Create indexes for better performance
    await db.execute('CREATE INDEX idx_bookings_apartment_id ON bookings(apartment_id)');
    await db.execute('CREATE INDEX idx_bookings_check_in ON bookings(check_in)');
    await db.execute('CREATE INDEX idx_bookings_check_out ON bookings(check_out)');
    await db.execute('CREATE INDEX idx_apartments_is_active ON apartments(is_active)');
  }

  Future<void> _onUpgrade(Database db, int oldVersion, int newVersion) async {
    // Handle database upgrades here
    if (oldVersion < newVersion) {
      // Add migration logic here when needed
    }
  }

  // Apartment CRUD operations
  Future<String> insertApartment(Apartment apartment) async {
    final db = await database;
    await db.insert('apartments', apartment.toMap());
    return apartment.id;
  }

  Future<List<Apartment>> getApartments() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query('apartments');
    return List.generate(maps.length, (i) => Apartment.fromMap(maps[i]));
  }

  Future<List<Apartment>> getActiveApartments() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'apartments',
      where: 'is_active = ?',
      whereArgs: [1],
    );
    return List.generate(maps.length, (i) => Apartment.fromMap(maps[i]));
  }

  Future<Apartment?> getApartmentById(String id) async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'apartments',
      where: 'id = ?',
      whereArgs: [id],
    );
    
    if (maps.isNotEmpty) {
      return Apartment.fromMap(maps.first);
    }
    return null;
  }

  Future<int> updateApartment(Apartment apartment) async {
    final db = await database;
    return await db.update(
      'apartments',
      apartment.toMap(),
      where: 'id = ?',
      whereArgs: [apartment.id],
    );
  }

  Future<int> deleteApartment(String id) async {
    final db = await database;
    return await db.delete(
      'apartments',
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  // Booking CRUD operations
  Future<String> insertBooking(Booking booking) async {
    final db = await database;
    await db.insert('bookings', booking.toMap());
    return booking.id;
  }

  Future<List<Booking>> getBookings() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query('bookings');
    return List.generate(maps.length, (i) => Booking.fromMap(maps[i]));
  }

  Future<List<Booking>> getBookingsByApartment(String apartmentId) async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'bookings',
      where: 'apartment_id = ?',
      whereArgs: [apartmentId],
    );
    return List.generate(maps.length, (i) => Booking.fromMap(maps[i]));
  }

  Future<List<Booking>> getBookingsByDateRange(DateTime start, DateTime end) async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'bookings',
      where: 'check_in >= ? AND check_out <= ?',
      whereArgs: [start.toIso8601String(), end.toIso8601String()],
    );
    return List.generate(maps.length, (i) => Booking.fromMap(maps[i]));
  }

  Future<List<Booking>> getTodayBookings() async {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final tomorrow = today.add(const Duration(days: 1));
    
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.rawQuery('''
      SELECT * FROM bookings 
      WHERE (DATE(check_in) = DATE(?)) OR (DATE(check_out) = DATE(?))
      ORDER BY check_in ASC
    ''', [today.toIso8601String(), today.toIso8601String()]);
    
    return List.generate(maps.length, (i) => Booking.fromMap(maps[i]));
  }

  Future<Booking?> getBookingById(String id) async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'bookings',
      where: 'id = ?',
      whereArgs: [id],
    );
    
    if (maps.isNotEmpty) {
      return Booking.fromMap(maps.first);
    }
    return null;
  }

  Future<int> updateBooking(Booking booking) async {
    final db = await database;
    return await db.update(
      'bookings',
      booking.toMap(),
      where: 'id = ?',
      whereArgs: [booking.id],
    );
  }

  Future<int> deleteBooking(String id) async {
    final db = await database;
    return await db.delete(
      'bookings',
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  // Utility methods
  Future<void> clearAllData() async {
    final db = await database;
    await db.delete('bookings');
    await db.delete('apartments');
  }

  Future<void> close() async {
    final db = await database;
    await db.close();
  }

  // Statistics queries
  Future<Map<String, dynamic>> getOccupancyStats(String? apartmentId, int year) async {
    final db = await database;
    
    String whereClause = "strftime('%Y', check_in) = ?";
    List<dynamic> whereArgs = [year.toString()];
    
    if (apartmentId != null && apartmentId != 'all') {
      whereClause += " AND apartment_id = ?";
      whereArgs.add(apartmentId);
    }
    
    final List<Map<String, dynamic>> maps = await db.query(
      'bookings',
      where: whereClause,
      whereArgs: whereArgs,
    );
    
    // Calculate occupancy statistics
    int totalNights = 0;
    for (var map in maps) {
      totalNights += map['nights'] as int;
    }
    
    return {
      'totalBookings': maps.length,
      'totalNights': totalNights,
    };
  }

  Future<Map<String, dynamic>> getRevenueStats(String? apartmentId, int year) async {
    final db = await database;
    
    String whereClause = "strftime('%Y', check_in) = ?";
    List<dynamic> whereArgs = [year.toString()];
    
    if (apartmentId != null && apartmentId != 'all') {
      whereClause += " AND apartment_id = ?";
      whereArgs.add(apartmentId);
    }
    
    final List<Map<String, dynamic>> result = await db.rawQuery('''
      SELECT 
        SUM(net_total) as total_revenue,
        AVG(net_total) as avg_per_booking,
        SUM(nights) as total_nights
      FROM bookings 
      WHERE $whereClause
    ''', whereArgs);
    
    final data = result.first;
    final totalRevenue = (data['total_revenue'] as num?)?.toDouble() ?? 0.0;
    final totalNights = (data['total_nights'] as num?)?.toInt() ?? 0;
    final avgPerBooking = (data['avg_per_booking'] as num?)?.toDouble() ?? 0.0;
    final avgPerNight = totalNights > 0 ? totalRevenue / totalNights : 0.0;
    
    return {
      'totalRevenue': totalRevenue,
      'avgPerBooking': avgPerBooking,
      'avgPerNight': avgPerNight,
      'totalNights': totalNights,
    };
  }
}
