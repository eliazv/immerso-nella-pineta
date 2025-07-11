// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'booking.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Booking _$BookingFromJson(Map<String, dynamic> json) => Booking(
  id: json['id'] as String,
  guestName: json['guestName'] as String,
  ota: json['ota'] as String,
  checkIn: DateTime.parse(json['checkIn'] as String),
  checkOut: DateTime.parse(json['checkOut'] as String),
  nights: (json['nights'] as num).toInt(),
  adults: (json['adults'] as num).toInt(),
  children: (json['children'] as num).toInt(),
  pets: (json['pets'] as num).toInt(),
  totalClient: (json['totalClient'] as num).toDouble(),
  cleaningCost: (json['cleaningCost'] as num).toDouble(),
  discounts: (json['discounts'] as num).toDouble(),
  supplements: (json['supplements'] as num).toDouble(),
  otaCommission: (json['otaCommission'] as num).toDouble(),
  touristTax: (json['touristTax'] as num).toDouble(),
  flatTax: (json['flatTax'] as num).toDouble(),
  netTotal: (json['netTotal'] as num).toDouble(),
  notes: json['notes'] as String?,
  apartmentId: json['apartmentId'] as String,
  createdAt: DateTime.parse(json['createdAt'] as String),
  updatedAt: DateTime.parse(json['updatedAt'] as String),
);

Map<String, dynamic> _$BookingToJson(Booking instance) => <String, dynamic>{
  'id': instance.id,
  'guestName': instance.guestName,
  'ota': instance.ota,
  'checkIn': instance.checkIn.toIso8601String(),
  'checkOut': instance.checkOut.toIso8601String(),
  'nights': instance.nights,
  'adults': instance.adults,
  'children': instance.children,
  'pets': instance.pets,
  'totalClient': instance.totalClient,
  'cleaningCost': instance.cleaningCost,
  'discounts': instance.discounts,
  'supplements': instance.supplements,
  'otaCommission': instance.otaCommission,
  'touristTax': instance.touristTax,
  'flatTax': instance.flatTax,
  'netTotal': instance.netTotal,
  'notes': instance.notes,
  'apartmentId': instance.apartmentId,
  'createdAt': instance.createdAt.toIso8601String(),
  'updatedAt': instance.updatedAt.toIso8601String(),
};
