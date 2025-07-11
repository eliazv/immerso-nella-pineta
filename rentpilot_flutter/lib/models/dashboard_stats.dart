import 'package:json_annotation/json_annotation.dart';

part 'dashboard_stats.g.dart';

@JsonSerializable()
class DashboardStats {
  final OccupancyStats occupancy;
  final RevenueStats revenue;
  final OtaStats ota;
  final SeasonalityStats seasonality;
  final List<MonthlyData> topMonths;
  final List<MonthlyData> worstMonths;

  const DashboardStats({
    required this.occupancy,
    required this.revenue,
    required this.ota,
    required this.seasonality,
    required this.topMonths,
    required this.worstMonths,
  });

  factory DashboardStats.fromJson(Map<String, dynamic> json) =>
      _$DashboardStatsFromJson(json);

  Map<String, dynamic> toJson() => _$DashboardStatsToJson(this);
}

@JsonSerializable()
class OccupancyStats {
  final int totalDays;
  final int occupiedDays;
  final double occupancyRate;
  final List<MonthlyOccupancy> monthlyOccupancy;

  const OccupancyStats({
    required this.totalDays,
    required this.occupiedDays,
    required this.occupancyRate,
    required this.monthlyOccupancy,
  });

  factory OccupancyStats.fromJson(Map<String, dynamic> json) =>
      _$OccupancyStatsFromJson(json);

  Map<String, dynamic> toJson() => _$OccupancyStatsToJson(this);
}

@JsonSerializable()
class RevenueStats {
  final double totalRevenue;
  final double averagePerNight;
  final double averagePerBooking;
  final List<MonthlyRevenue> monthlyRevenue;
  final List<YearlyRevenue> yearlyRevenue;

  const RevenueStats({
    required this.totalRevenue,
    required this.averagePerNight,
    required this.averagePerBooking,
    required this.monthlyRevenue,
    required this.yearlyRevenue,
  });

  factory RevenueStats.fromJson(Map<String, dynamic> json) =>
      _$RevenueStatsFromJson(json);

  Map<String, dynamic> toJson() => _$RevenueStatsToJson(this);
}

@JsonSerializable()
class OtaStats {
  final List<OtaBookingCount> bookingCount;
  final List<OtaRevenue> revenue;
  final List<OtaAveragePerNight> averagePerNight;

  const OtaStats({
    required this.bookingCount,
    required this.revenue,
    required this.averagePerNight,
  });

  factory OtaStats.fromJson(Map<String, dynamic> json) =>
      _$OtaStatsFromJson(json);

  Map<String, dynamic> toJson() => _$OtaStatsToJson(this);
}

@JsonSerializable()
class SeasonalityStats {
  final List<MonthlyBookings> monthlyBookings;
  final List<MonthlyAvgPrice> monthlyAvgPrice;

  const SeasonalityStats({
    required this.monthlyBookings,
    required this.monthlyAvgPrice,
  });

  factory SeasonalityStats.fromJson(Map<String, dynamic> json) =>
      _$SeasonalityStatsFromJson(json);

  Map<String, dynamic> toJson() => _$SeasonalityStatsToJson(this);
}

// Supporting classes
@JsonSerializable()
class MonthlyOccupancy {
  final String month;
  final double rate;

  const MonthlyOccupancy({
    required this.month,
    required this.rate,
  });

  factory MonthlyOccupancy.fromJson(Map<String, dynamic> json) =>
      _$MonthlyOccupancyFromJson(json);

  Map<String, dynamic> toJson() => _$MonthlyOccupancyToJson(this);
}

@JsonSerializable()
class MonthlyRevenue {
  final String month;
  final double revenue;

  const MonthlyRevenue({
    required this.month,
    required this.revenue,
  });

  factory MonthlyRevenue.fromJson(Map<String, dynamic> json) =>
      _$MonthlyRevenueFromJson(json);

  Map<String, dynamic> toJson() => _$MonthlyRevenueToJson(this);
}

@JsonSerializable()
class YearlyRevenue {
  final String year;
  final double revenue;

  const YearlyRevenue({
    required this.year,
    required this.revenue,
  });

  factory YearlyRevenue.fromJson(Map<String, dynamic> json) =>
      _$YearlyRevenueFromJson(json);

  Map<String, dynamic> toJson() => _$YearlyRevenueToJson(this);
}

@JsonSerializable()
class OtaBookingCount {
  final String ota;
  final int count;

  const OtaBookingCount({
    required this.ota,
    required this.count,
  });

  factory OtaBookingCount.fromJson(Map<String, dynamic> json) =>
      _$OtaBookingCountFromJson(json);

  Map<String, dynamic> toJson() => _$OtaBookingCountToJson(this);
}

@JsonSerializable()
class OtaRevenue {
  final String ota;
  final double revenue;

  const OtaRevenue({
    required this.ota,
    required this.revenue,
  });

  factory OtaRevenue.fromJson(Map<String, dynamic> json) =>
      _$OtaRevenueFromJson(json);

  Map<String, dynamic> toJson() => _$OtaRevenueToJson(this);
}

@JsonSerializable()
class OtaAveragePerNight {
  final String ota;
  final double average;

  const OtaAveragePerNight({
    required this.ota,
    required this.average,
  });

  factory OtaAveragePerNight.fromJson(Map<String, dynamic> json) =>
      _$OtaAveragePerNightFromJson(json);

  Map<String, dynamic> toJson() => _$OtaAveragePerNightToJson(this);
}

@JsonSerializable()
class MonthlyBookings {
  final String month;
  final int count;

  const MonthlyBookings({
    required this.month,
    required this.count,
  });

  factory MonthlyBookings.fromJson(Map<String, dynamic> json) =>
      _$MonthlyBookingsFromJson(json);

  Map<String, dynamic> toJson() => _$MonthlyBookingsToJson(this);
}

@JsonSerializable()
class MonthlyAvgPrice {
  final String month;
  final double price;

  const MonthlyAvgPrice({
    required this.month,
    required this.price,
  });

  factory MonthlyAvgPrice.fromJson(Map<String, dynamic> json) =>
      _$MonthlyAvgPriceFromJson(json);

  Map<String, dynamic> toJson() => _$MonthlyAvgPriceToJson(this);
}

@JsonSerializable()
class MonthlyData {
  final String month;
  final double occupancyRate;
  final double revenue;

  const MonthlyData({
    required this.month,
    required this.occupancyRate,
    required this.revenue,
  });

  factory MonthlyData.fromJson(Map<String, dynamic> json) =>
      _$MonthlyDataFromJson(json);

  Map<String, dynamic> toJson() => _$MonthlyDataToJson(this);
}
