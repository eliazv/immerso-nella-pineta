// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'dashboard_stats.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

DashboardStats _$DashboardStatsFromJson(Map<String, dynamic> json) =>
    DashboardStats(
      occupancy: OccupancyStats.fromJson(
        json['occupancy'] as Map<String, dynamic>,
      ),
      revenue: RevenueStats.fromJson(json['revenue'] as Map<String, dynamic>),
      ota: OtaStats.fromJson(json['ota'] as Map<String, dynamic>),
      seasonality: SeasonalityStats.fromJson(
        json['seasonality'] as Map<String, dynamic>,
      ),
      topMonths: (json['topMonths'] as List<dynamic>)
          .map((e) => MonthlyData.fromJson(e as Map<String, dynamic>))
          .toList(),
      worstMonths: (json['worstMonths'] as List<dynamic>)
          .map((e) => MonthlyData.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$DashboardStatsToJson(DashboardStats instance) =>
    <String, dynamic>{
      'occupancy': instance.occupancy,
      'revenue': instance.revenue,
      'ota': instance.ota,
      'seasonality': instance.seasonality,
      'topMonths': instance.topMonths,
      'worstMonths': instance.worstMonths,
    };

OccupancyStats _$OccupancyStatsFromJson(Map<String, dynamic> json) =>
    OccupancyStats(
      totalDays: (json['totalDays'] as num).toInt(),
      occupiedDays: (json['occupiedDays'] as num).toInt(),
      occupancyRate: (json['occupancyRate'] as num).toDouble(),
      monthlyOccupancy: (json['monthlyOccupancy'] as List<dynamic>)
          .map((e) => MonthlyOccupancy.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$OccupancyStatsToJson(OccupancyStats instance) =>
    <String, dynamic>{
      'totalDays': instance.totalDays,
      'occupiedDays': instance.occupiedDays,
      'occupancyRate': instance.occupancyRate,
      'monthlyOccupancy': instance.monthlyOccupancy,
    };

RevenueStats _$RevenueStatsFromJson(Map<String, dynamic> json) => RevenueStats(
  totalRevenue: (json['totalRevenue'] as num).toDouble(),
  averagePerNight: (json['averagePerNight'] as num).toDouble(),
  averagePerBooking: (json['averagePerBooking'] as num).toDouble(),
  monthlyRevenue: (json['monthlyRevenue'] as List<dynamic>)
      .map((e) => MonthlyRevenue.fromJson(e as Map<String, dynamic>))
      .toList(),
  yearlyRevenue: (json['yearlyRevenue'] as List<dynamic>)
      .map((e) => YearlyRevenue.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$RevenueStatsToJson(RevenueStats instance) =>
    <String, dynamic>{
      'totalRevenue': instance.totalRevenue,
      'averagePerNight': instance.averagePerNight,
      'averagePerBooking': instance.averagePerBooking,
      'monthlyRevenue': instance.monthlyRevenue,
      'yearlyRevenue': instance.yearlyRevenue,
    };

OtaStats _$OtaStatsFromJson(Map<String, dynamic> json) => OtaStats(
  bookingCount: (json['bookingCount'] as List<dynamic>)
      .map((e) => OtaBookingCount.fromJson(e as Map<String, dynamic>))
      .toList(),
  revenue: (json['revenue'] as List<dynamic>)
      .map((e) => OtaRevenue.fromJson(e as Map<String, dynamic>))
      .toList(),
  averagePerNight: (json['averagePerNight'] as List<dynamic>)
      .map((e) => OtaAveragePerNight.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$OtaStatsToJson(OtaStats instance) => <String, dynamic>{
  'bookingCount': instance.bookingCount,
  'revenue': instance.revenue,
  'averagePerNight': instance.averagePerNight,
};

SeasonalityStats _$SeasonalityStatsFromJson(Map<String, dynamic> json) =>
    SeasonalityStats(
      monthlyBookings: (json['monthlyBookings'] as List<dynamic>)
          .map((e) => MonthlyBookings.fromJson(e as Map<String, dynamic>))
          .toList(),
      monthlyAvgPrice: (json['monthlyAvgPrice'] as List<dynamic>)
          .map((e) => MonthlyAvgPrice.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$SeasonalityStatsToJson(SeasonalityStats instance) =>
    <String, dynamic>{
      'monthlyBookings': instance.monthlyBookings,
      'monthlyAvgPrice': instance.monthlyAvgPrice,
    };

MonthlyOccupancy _$MonthlyOccupancyFromJson(Map<String, dynamic> json) =>
    MonthlyOccupancy(
      month: json['month'] as String,
      rate: (json['rate'] as num).toDouble(),
    );

Map<String, dynamic> _$MonthlyOccupancyToJson(MonthlyOccupancy instance) =>
    <String, dynamic>{'month': instance.month, 'rate': instance.rate};

MonthlyRevenue _$MonthlyRevenueFromJson(Map<String, dynamic> json) =>
    MonthlyRevenue(
      month: json['month'] as String,
      revenue: (json['revenue'] as num).toDouble(),
    );

Map<String, dynamic> _$MonthlyRevenueToJson(MonthlyRevenue instance) =>
    <String, dynamic>{'month': instance.month, 'revenue': instance.revenue};

YearlyRevenue _$YearlyRevenueFromJson(Map<String, dynamic> json) =>
    YearlyRevenue(
      year: json['year'] as String,
      revenue: (json['revenue'] as num).toDouble(),
    );

Map<String, dynamic> _$YearlyRevenueToJson(YearlyRevenue instance) =>
    <String, dynamic>{'year': instance.year, 'revenue': instance.revenue};

OtaBookingCount _$OtaBookingCountFromJson(Map<String, dynamic> json) =>
    OtaBookingCount(
      ota: json['ota'] as String,
      count: (json['count'] as num).toInt(),
    );

Map<String, dynamic> _$OtaBookingCountToJson(OtaBookingCount instance) =>
    <String, dynamic>{'ota': instance.ota, 'count': instance.count};

OtaRevenue _$OtaRevenueFromJson(Map<String, dynamic> json) => OtaRevenue(
  ota: json['ota'] as String,
  revenue: (json['revenue'] as num).toDouble(),
);

Map<String, dynamic> _$OtaRevenueToJson(OtaRevenue instance) =>
    <String, dynamic>{'ota': instance.ota, 'revenue': instance.revenue};

OtaAveragePerNight _$OtaAveragePerNightFromJson(Map<String, dynamic> json) =>
    OtaAveragePerNight(
      ota: json['ota'] as String,
      average: (json['average'] as num).toDouble(),
    );

Map<String, dynamic> _$OtaAveragePerNightToJson(OtaAveragePerNight instance) =>
    <String, dynamic>{'ota': instance.ota, 'average': instance.average};

MonthlyBookings _$MonthlyBookingsFromJson(Map<String, dynamic> json) =>
    MonthlyBookings(
      month: json['month'] as String,
      count: (json['count'] as num).toInt(),
    );

Map<String, dynamic> _$MonthlyBookingsToJson(MonthlyBookings instance) =>
    <String, dynamic>{'month': instance.month, 'count': instance.count};

MonthlyAvgPrice _$MonthlyAvgPriceFromJson(Map<String, dynamic> json) =>
    MonthlyAvgPrice(
      month: json['month'] as String,
      price: (json['price'] as num).toDouble(),
    );

Map<String, dynamic> _$MonthlyAvgPriceToJson(MonthlyAvgPrice instance) =>
    <String, dynamic>{'month': instance.month, 'price': instance.price};

MonthlyData _$MonthlyDataFromJson(Map<String, dynamic> json) => MonthlyData(
  month: json['month'] as String,
  occupancyRate: (json['occupancyRate'] as num).toDouble(),
  revenue: (json['revenue'] as num).toDouble(),
);

Map<String, dynamic> _$MonthlyDataToJson(MonthlyData instance) =>
    <String, dynamic>{
      'month': instance.month,
      'occupancyRate': instance.occupancyRate,
      'revenue': instance.revenue,
    };
