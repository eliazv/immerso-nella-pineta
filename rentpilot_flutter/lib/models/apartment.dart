import 'package:json_annotation/json_annotation.dart';

part 'apartment.g.dart';

@JsonSerializable()
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

  const Apartment({
    required this.id,
    required this.name,
    this.description,
    required this.maxGuests,
    this.address,
    required this.amenities,
    required this.basePrice,
    required this.cleaningFee,
    required this.isActive,
    required this.color,
    required this.icon,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Apartment.fromJson(Map<String, dynamic> json) =>
      _$ApartmentFromJson(json);

  Map<String, dynamic> toJson() => _$ApartmentToJson(this);

  // Factory constructor for creating from database
  factory Apartment.fromMap(Map<String, dynamic> map) {
    return Apartment(
      id: map['id'] as String,
      name: map['name'] as String,
      description: map['description'] as String?,
      maxGuests: map['max_guests'] as int,
      address: map['address'] as String?,
      amenities: (map['amenities'] as String?)?.split(',') ?? [],
      basePrice: (map['base_price'] as num?)?.toDouble() ?? 0.0,
      cleaningFee: (map['cleaning_fee'] as num?)?.toDouble() ?? 0.0,
      isActive: (map['is_active'] as int) == 1,
      color: map['color'] as String,
      icon: map['icon'] as String,
      createdAt: DateTime.parse(map['created_at'] as String),
      updatedAt: DateTime.parse(map['updated_at'] as String),
    );
  }

  // Convert to database map
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'max_guests': maxGuests,
      'address': address,
      'amenities': amenities.join(','),
      'base_price': basePrice,
      'cleaning_fee': cleaningFee,
      'is_active': isActive ? 1 : 0,
      'color': color,
      'icon': icon,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }

  // Copy with method for updates
  Apartment copyWith({
    String? id,
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
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Apartment(
      id: id ?? this.id,
      name: name ?? this.name,
      description: description ?? this.description,
      maxGuests: maxGuests ?? this.maxGuests,
      address: address ?? this.address,
      amenities: amenities ?? this.amenities,
      basePrice: basePrice ?? this.basePrice,
      cleaningFee: cleaningFee ?? this.cleaningFee,
      isActive: isActive ?? this.isActive,
      color: color ?? this.color,
      icon: icon ?? this.icon,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is Apartment && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return 'Apartment(id: $id, name: $name, isActive: $isActive)';
  }
}
