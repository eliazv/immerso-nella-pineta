// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'apartment.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Apartment _$ApartmentFromJson(Map<String, dynamic> json) => Apartment(
  id: json['id'] as String,
  name: json['name'] as String,
  description: json['description'] as String?,
  maxGuests: (json['maxGuests'] as num).toInt(),
  address: json['address'] as String?,
  amenities: (json['amenities'] as List<dynamic>)
      .map((e) => e as String)
      .toList(),
  basePrice: (json['basePrice'] as num).toDouble(),
  cleaningFee: (json['cleaningFee'] as num).toDouble(),
  isActive: json['isActive'] as bool,
  color: json['color'] as String,
  icon: json['icon'] as String,
  createdAt: DateTime.parse(json['createdAt'] as String),
  updatedAt: DateTime.parse(json['updatedAt'] as String),
);

Map<String, dynamic> _$ApartmentToJson(Apartment instance) => <String, dynamic>{
  'id': instance.id,
  'name': instance.name,
  'description': instance.description,
  'maxGuests': instance.maxGuests,
  'address': instance.address,
  'amenities': instance.amenities,
  'basePrice': instance.basePrice,
  'cleaningFee': instance.cleaningFee,
  'isActive': instance.isActive,
  'color': instance.color,
  'icon': instance.icon,
  'createdAt': instance.createdAt.toIso8601String(),
  'updatedAt': instance.updatedAt.toIso8601String(),
};
