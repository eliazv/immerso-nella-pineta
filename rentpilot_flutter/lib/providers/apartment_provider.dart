import 'package:flutter/foundation.dart';
import 'package:uuid/uuid.dart';
import '../models/apartment.dart';
import '../services/database_service.dart';

class ApartmentProvider with ChangeNotifier {
  final DatabaseService _databaseService = DatabaseService();
  final Uuid _uuid = const Uuid();

  List<Apartment> _apartments = [];
  String _selectedApartmentId = 'all';
  bool _isLoading = false;
  String? _error;

  // Getters
  List<Apartment> get apartments => _apartments;
  List<Apartment> get activeApartments =>
      _apartments.where((apt) => apt.isActive).toList();
  String get selectedApartmentId => _selectedApartmentId;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Apartment? get selectedApartment {
    if (_selectedApartmentId == 'all') return null;
    try {
      return _apartments.firstWhere((apt) => apt.id == _selectedApartmentId);
    } catch (e) {
      return _apartments.isNotEmpty ? _apartments.first : null;
    }
  }

  // Initialize and load apartments
  Future<void> initialize() async {
    await _loadApartmentsInitial();
  }

  // Load apartments during initialization (without loading state)
  Future<void> _loadApartmentsInitial() async {
    try {
      _apartments = await _databaseService.getApartments();

      // If no apartments exist and selectedApartmentId is not 'all',
      // reset to 'all'
      if (_apartments.isEmpty && _selectedApartmentId != 'all') {
        _selectedApartmentId = 'all';
      }

      // If selectedApartmentId is not 'all' but the apartment doesn't exist,
      // reset to first apartment or 'all'
      if (_selectedApartmentId != 'all' &&
          !_apartments.any((apt) => apt.id == _selectedApartmentId)) {
        _selectedApartmentId = _apartments.isNotEmpty
            ? _apartments.first.id
            : 'all';
      }
    } catch (e) {
      _error = 'Failed to load apartments: $e';
    }
  }

  // Load all apartments from database
  Future<void> loadApartments() async {
    _setLoading(true);
    _setError(null);

    try {
      _apartments = await _databaseService.getApartments();

      // If no apartments exist and selectedApartmentId is not 'all',
      // reset to 'all'
      if (_apartments.isEmpty && _selectedApartmentId != 'all') {
        _selectedApartmentId = 'all';
      }

      // If selectedApartmentId is not 'all' but the apartment doesn't exist,
      // reset to first apartment or 'all'
      if (_selectedApartmentId != 'all' &&
          !_apartments.any((apt) => apt.id == _selectedApartmentId)) {
        _selectedApartmentId = _apartments.isNotEmpty
            ? _apartments.first.id
            : 'all';
      }

      notifyListeners();
    } catch (e) {
      _setError('Failed to load apartments: $e');
    } finally {
      _setLoading(false);
    }
  }

  // Create new apartment
  Future<bool> createApartment({
    required String name,
    String? description,
    required int maxGuests,
    String? address,
    List<String>? amenities,
    double? basePrice,
    double? cleaningFee,
    bool? isActive,
    String? color,
    String? icon,
  }) async {
    _setLoading(true);
    _setError(null);

    try {
      final now = DateTime.now();
      final apartment = Apartment(
        id: _uuid.v4(),
        name: name,
        description: description,
        maxGuests: maxGuests,
        address: address,
        amenities: amenities ?? [],
        basePrice: basePrice ?? 0.0,
        cleaningFee: cleaningFee ?? 0.0,
        isActive: isActive ?? true,
        color: color ?? '#3DA9A9',
        icon: icon ?? 'home',
        createdAt: now,
        updatedAt: now,
      );

      await _databaseService.insertApartment(apartment);
      await loadApartments();
      return true;
    } catch (e) {
      _setError('Failed to create apartment: $e');
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Add apartment (accepts Apartment object)
  Future<void> addApartment(Apartment apartment) async {
    try {
      await _databaseService.insertApartment(apartment);
      _apartments.add(apartment);
      notifyListeners();
    } catch (e) {
      _setError('Failed to add apartment: $e');
      rethrow;
    }
  }

  // Save apartment (accepts Apartment object for update)
  Future<void> saveApartment(Apartment apartment) async {
    try {
      await _databaseService.updateApartment(apartment);
      final index = _apartments.indexWhere((apt) => apt.id == apartment.id);
      if (index != -1) {
        _apartments[index] = apartment;
        notifyListeners();
      }
    } catch (e) {
      _setError('Failed to update apartment: $e');
      rethrow;
    }
  }

  // Update existing apartment
  Future<bool> updateApartment(
    String id, {
    String? name,
    String? description,
    int? maxGuests,
    String? address,
    List<String>? amenities,
    double? basePrice,
    double? cleaningFee,
    bool? isActive,
    String? color,
    String? icon,
  }) async {
    _setLoading(true);
    _setError(null);

    try {
      final existingApartment = _apartments.firstWhere((apt) => apt.id == id);
      final updatedApartment = existingApartment.copyWith(
        name: name,
        description: description,
        maxGuests: maxGuests,
        address: address,
        amenities: amenities,
        basePrice: basePrice,
        cleaningFee: cleaningFee,
        isActive: isActive,
        color: color,
        icon: icon,
        updatedAt: DateTime.now(),
      );

      await _databaseService.updateApartment(updatedApartment);
      await loadApartments();
      return true;
    } catch (e) {
      _setError('Failed to update apartment: $e');
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Delete apartment
  Future<bool> deleteApartment(String id) async {
    _setLoading(true);
    _setError(null);

    try {
      await _databaseService.deleteApartment(id);

      // If the deleted apartment was selected, reset selection
      if (_selectedApartmentId == id) {
        _selectedApartmentId = 'all';
      }

      await loadApartments();
      return true;
    } catch (e) {
      _setError('Failed to delete apartment: $e');
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Set selected apartment
  void setSelectedApartment(String apartmentId) {
    if (_selectedApartmentId != apartmentId) {
      _selectedApartmentId = apartmentId;
      notifyListeners();
    }
  }

  // Get apartment by ID
  Apartment? getApartmentById(String id) {
    try {
      return _apartments.firstWhere((apt) => apt.id == id);
    } catch (e) {
      return null;
    }
  }

  // Get apartment statistics
  Future<Map<String, dynamic>> getApartmentStats(String apartmentId) async {
    try {
      final occupancyStats = await _databaseService.getOccupancyStats(
        apartmentId == 'all' ? null : apartmentId,
        DateTime.now().year,
      );

      final revenueStats = await _databaseService.getRevenueStats(
        apartmentId == 'all' ? null : apartmentId,
        DateTime.now().year,
      );

      return {...occupancyStats, ...revenueStats};
    } catch (e) {
      return {
        'totalBookings': 0,
        'totalNights': 0,
        'totalRevenue': 0.0,
        'avgPerBooking': 0.0,
        'avgPerNight': 0.0,
      };
    }
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

  @override
  void dispose() {
    super.dispose();
  }
}
