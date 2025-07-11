import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:intl/intl.dart';

import '../utils/constants.dart';
import '../providers/booking_provider.dart';

class OccupancyChart extends StatefulWidget {
  final String? selectedCalendar;
  final String title;

  const OccupancyChart({
    super.key,
    this.selectedCalendar = 'all',
    this.title = 'Tasso di Occupazione',
  });

  @override
  State<OccupancyChart> createState() => _OccupancyChartState();
}

class _OccupancyChartState extends State<OccupancyChart> {
  String _viewType = '6 settimane';
  DateTime _currentDate = DateTime.now();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(
              widget.title,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            const Spacer(),
            _buildViewTypeSelector(),
          ],
        ),
        const SizedBox(height: AppConstants.spacingM),
        Row(
          children: [
            IconButton(
              onPressed: _previousPeriod,
              icon: const Icon(Icons.chevron_left),
            ),
            Expanded(
              child: Text(
                _getPeriodTitle(),
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.bodyMedium,
              ),
            ),
            IconButton(
              onPressed: _nextPeriod,
              icon: const Icon(Icons.chevron_right),
            ),
          ],
        ),
        const SizedBox(height: AppConstants.spacingM),
        Expanded(
          child: Consumer<BookingProvider>(
            builder: (context, bookingProvider, child) {
              final chartData = _calculateChartData(bookingProvider.bookings);
              
              if (chartData.isEmpty) {
                return Center(
                  child: Text(
                    'Nessun dato disponibile',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Theme.of(context).colorScheme.onSurface.withOpacity(0.5),
                    ),
                  ),
                );
              }

              return BarChart(
                BarChartData(
                  alignment: BarChartAlignment.spaceAround,
                  maxY: 100,
                  barTouchData: BarTouchData(
                    touchTooltipData: BarTouchTooltipData(
                      tooltipBgColor: Theme.of(context).colorScheme.surface,
                      getTooltipItem: (group, groupIndex, rod, rodIndex) {
                        return BarTooltipItem(
                          '${rod.toY.toStringAsFixed(1)}%',
                          Theme.of(context).textTheme.bodySmall!,
                        );
                      },
                    ),
                  ),
                  titlesData: FlTitlesData(
                    show: true,
                    bottomTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        getTitlesWidget: (value, meta) {
                          if (value.toInt() < chartData.length) {
                            return Padding(
                              padding: const EdgeInsets.only(top: 8.0),
                              child: Text(
                                chartData[value.toInt()].label,
                                style: Theme.of(context).textTheme.bodySmall,
                              ),
                            );
                          }
                          return const Text('');
                        },
                      ),
                    ),
                    leftTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        reservedSize: 40,
                        getTitlesWidget: (value, meta) {
                          return Text(
                            '${value.toInt()}%',
                            style: Theme.of(context).textTheme.bodySmall,
                          );
                        },
                      ),
                    ),
                    topTitles: const AxisTitles(
                      sideTitles: SideTitles(showTitles: false),
                    ),
                    rightTitles: const AxisTitles(
                      sideTitles: SideTitles(showTitles: false),
                    ),
                  ),
                  borderData: FlBorderData(show: false),
                  barGroups: chartData
                      .asMap()
                      .entries
                      .map((entry) => BarChartGroupData(
                            x: entry.key,
                            barRods: [
                              BarChartRodData(
                                toY: entry.value.occupancyRate,
                                color: _getBarColor(entry.value.occupancyRate),
                                width: 16,
                                borderRadius: BorderRadius.circular(4),
                              ),
                            ],
                          ))
                      .toList(),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildViewTypeSelector() {
    return DropdownButton<String>(
      value: _viewType,
      items: const [
        DropdownMenuItem(value: '6 settimane', child: Text('6 settimane')),
        DropdownMenuItem(value: '6 mesi', child: Text('6 mesi')),
      ],
      onChanged: (value) {
        if (value != null) {
          setState(() {
            _viewType = value;
            _currentDate = DateTime.now();
          });
        }
      },
    );
  }

  String _getPeriodTitle() {
    if (_viewType == '6 settimane') {
      final startOfWeek = _currentDate.subtract(Duration(days: _currentDate.weekday - 1));
      final endOfWeek = startOfWeek.add(const Duration(days: 41)); // 6 weeks
      return '${DateFormat('dd MMM').format(startOfWeek)} - ${DateFormat('dd MMM yyyy').format(endOfWeek)}';
    } else {
      final startOfPeriod = DateTime(_currentDate.year, _currentDate.month - 5, 1);
      final endOfPeriod = DateTime(_currentDate.year, _currentDate.month + 1, 0);
      return '${DateFormat('MMM yyyy').format(startOfPeriod)} - ${DateFormat('MMM yyyy').format(endOfPeriod)}';
    }
  }

  void _previousPeriod() {
    setState(() {
      if (_viewType == '6 settimane') {
        _currentDate = _currentDate.subtract(const Duration(days: 42));
      } else {
        _currentDate = DateTime(_currentDate.year, _currentDate.month - 6, 1);
      }
    });
  }

  void _nextPeriod() {
    setState(() {
      if (_viewType == '6 settimane') {
        _currentDate = _currentDate.add(const Duration(days: 42));
      } else {
        _currentDate = DateTime(_currentDate.year, _currentDate.month + 6, 1);
      }
    });
  }

  List<ChartDataPoint> _calculateChartData(List<dynamic> allBookings) {
    List<ChartDataPoint> data = [];
    
    if (_viewType == '6 settimane') {
      final startOfWeek = _currentDate.subtract(Duration(days: _currentDate.weekday - 1));
      
      for (int i = 0; i < 6; i++) {
        final weekStart = startOfWeek.add(Duration(days: i * 7));
        final weekEnd = weekStart.add(const Duration(days: 6));
        
        final occupancyRate = _calculateOccupancyForPeriod(
          allBookings, 
          weekStart, 
          weekEnd,
        );
        
        data.add(ChartDataPoint(
          label: 'S${i + 1}',
          occupancyRate: occupancyRate,
          period: weekStart,
        ));
      }
    } else {
      for (int i = 0; i < 6; i++) {
        final month = DateTime(_currentDate.year, _currentDate.month - 5 + i, 1);
        final monthEnd = DateTime(_currentDate.year, _currentDate.month - 5 + i + 1, 0);
        
        final occupancyRate = _calculateOccupancyForPeriod(
          allBookings,
          month,
          monthEnd,
        );
        
        data.add(ChartDataPoint(
          label: DateFormat('MMM').format(month),
          occupancyRate: occupancyRate,
          period: month,
        ));
      }
    }
    
    return data;
  }

  double _calculateOccupancyForPeriod(
    List<dynamic> allBookings,
    DateTime start,
    DateTime end,
  ) {
    // Filter bookings by apartment if specified
    List<dynamic> bookings = allBookings;
    if (widget.selectedCalendar != null && widget.selectedCalendar != 'all') {
      bookings = allBookings.where((booking) => 
          booking.apartmentId == widget.selectedCalendar).toList();
    }
    
    // Calculate total days in period
    final totalDays = end.difference(start).inDays + 1;
    
    if (totalDays <= 0) return 0.0;
    
    // Calculate occupied days
    int occupiedDays = 0;
    
    for (final booking in bookings) {
      final checkIn = booking.checkIn as DateTime;
      final checkOut = booking.checkOut as DateTime;
      
      // Check if booking overlaps with the period
      if (checkIn.isBefore(end.add(const Duration(days: 1))) && 
          checkOut.isAfter(start)) {
        
        // Calculate overlap
        final overlapStart = checkIn.isAfter(start) ? checkIn : start;
        final overlapEnd = checkOut.isBefore(end.add(const Duration(days: 1))) 
            ? checkOut 
            : end.add(const Duration(days: 1));
        
        final overlapDays = overlapEnd.difference(overlapStart).inDays;
        occupiedDays += overlapDays > 0 ? overlapDays : 0;
      }
    }
    
    return totalDays > 0 ? (occupiedDays / totalDays) * 100 : 0.0;
  }

  Color _getBarColor(double occupancyRate) {
    if (occupancyRate >= 80) {
      return AppColors.success;
    } else if (occupancyRate >= 60) {
      return AppColors.warning;
    } else if (occupancyRate >= 40) {
      return Theme.of(context).colorScheme.primary;
    } else {
      return AppColors.error;
    }
  }
}

class ChartDataPoint {
  final String label;
  final double occupancyRate;
  final DateTime period;

  ChartDataPoint({
    required this.label,
    required this.occupancyRate,
    required this.period,
  });
}
