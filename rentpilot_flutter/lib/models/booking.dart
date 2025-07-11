import 'package:json_annotation/json_annotation.dart';

part 'booking.g.dart';

@JsonSerializable()
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
  final DateTime createdAt;
  final DateTime updatedAt;

  const Booking({
    required this.id,
    required this.guestName,
    required this.ota,
    required this.checkIn,
    required this.checkOut,
    required this.nights,
    required this.adults,
    required this.children,
    required this.pets,
    required this.totalClient,
    required this.cleaningCost,
    required this.discounts,
    required this.supplements,
    required this.otaCommission,
    required this.touristTax,
    required this.flatTax,
    required this.netTotal,
    this.notes,
    required this.apartmentId,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Booking.fromJson(Map<String, dynamic> json) =>
      _$BookingFromJson(json);

  Map<String, dynamic> toJson() => _$BookingToJson(this);

  // Factory constructor for creating from database
  factory Booking.fromMap(Map<String, dynamic> map) {
    return Booking(
      id: map['id'] as String,
      guestName: map['guest_name'] as String,
      ota: map['ota'] as String,
      checkIn: DateTime.parse(map['check_in'] as String),
      checkOut: DateTime.parse(map['check_out'] as String),
      nights: map['nights'] as int,
      adults: map['adults'] as int,
      children: map['children'] as int? ?? 0,
      pets: map['pets'] as int? ?? 0,
      totalClient: (map['total_client'] as num).toDouble(),
      cleaningCost: (map['cleaning_cost'] as num?)?.toDouble() ?? 0.0,
      discounts: (map['discounts'] as num?)?.toDouble() ?? 0.0,
      supplements: (map['supplements'] as num?)?.toDouble() ?? 0.0,
      otaCommission: (map['ota_commission'] as num?)?.toDouble() ?? 0.0,
      touristTax: (map['tourist_tax'] as num?)?.toDouble() ?? 0.0,
      flatTax: (map['flat_tax'] as num?)?.toDouble() ?? 0.0,
      netTotal: (map['net_total'] as num).toDouble(),
      notes: map['notes'] as String?,
      apartmentId: map['apartment_id'] as String,
      createdAt: DateTime.parse(map['created_at'] as String),
      updatedAt: DateTime.parse(map['updated_at'] as String),
    );
  }

  // Convert to database map
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'guest_name': guestName,
      'ota': ota,
      'check_in': checkIn.toIso8601String(),
      'check_out': checkOut.toIso8601String(),
      'nights': nights,
      'adults': adults,
      'children': children,
      'pets': pets,
      'total_client': totalClient,
      'cleaning_cost': cleaningCost,
      'discounts': discounts,
      'supplements': supplements,
      'ota_commission': otaCommission,
      'tourist_tax': touristTax,
      'flat_tax': flatTax,
      'net_total': netTotal,
      'notes': notes,
      'apartment_id': apartmentId,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }

  // Copy with method for updates
  Booking copyWith({
    String? id,
    String? guestName,
    String? ota,
    DateTime? checkIn,
    DateTime? checkOut,
    int? nights,
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
    double? netTotal,
    String? notes,
    String? apartmentId,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Booking(
      id: id ?? this.id,
      guestName: guestName ?? this.guestName,
      ota: ota ?? this.ota,
      checkIn: checkIn ?? this.checkIn,
      checkOut: checkOut ?? this.checkOut,
      nights: nights ?? this.nights,
      adults: adults ?? this.adults,
      children: children ?? this.children,
      pets: pets ?? this.pets,
      totalClient: totalClient ?? this.totalClient,
      cleaningCost: cleaningCost ?? this.cleaningCost,
      discounts: discounts ?? this.discounts,
      supplements: supplements ?? this.supplements,
      otaCommission: otaCommission ?? this.otaCommission,
      touristTax: touristTax ?? this.touristTax,
      flatTax: flatTax ?? this.flatTax,
      netTotal: netTotal ?? this.netTotal,
      notes: notes ?? this.notes,
      apartmentId: apartmentId ?? this.apartmentId,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  // Helper getters
  Duration get duration => checkOut.difference(checkIn);
  
  bool get isToday {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final checkInDate = DateTime(checkIn.year, checkIn.month, checkIn.day);
    final checkOutDate = DateTime(checkOut.year, checkOut.month, checkOut.day);
    
    return checkInDate == today || checkOutDate == today;
  }

  bool get isCheckInToday {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final checkInDate = DateTime(checkIn.year, checkIn.month, checkIn.day);
    
    return checkInDate == today;
  }

  bool get isCheckOutToday {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final checkOutDate = DateTime(checkOut.year, checkOut.month, checkOut.day);
    
    return checkOutDate == today;
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is Booking && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return 'Booking(id: $id, guestName: $guestName, checkIn: $checkIn, checkOut: $checkOut)';
  }
}
