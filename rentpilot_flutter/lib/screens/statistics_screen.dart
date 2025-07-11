import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:intl/intl.dart';

import '../utils/constants.dart';
import '../providers/apartment_provider.dart';
import '../providers/dashboard_provider.dart';
import '../widgets/summary_card.dart';
import '../widgets/occupancy_chart.dart';

class StatisticsScreen extends StatefulWidget {
  const StatisticsScreen({super.key});

  @override
  State<StatisticsScreen> createState() => _StatisticsScreenState();
}

class _StatisticsScreenState extends State<StatisticsScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadStats();
    });
  }

  Future<void> _loadStats() async {
    final apartmentProvider = context.read<ApartmentProvider>();
    final dashboardProvider = context.read<DashboardProvider>();

    await dashboardProvider.loadStats(apartmentProvider.selectedApartmentId);
  }

  IconData _getIconData(String iconName) {
    switch (iconName) {
      case 'home':
        return Icons.home;
      case 'apartment':
        return Icons.apartment;
      case 'house':
        return Icons.house;
      case 'villa':
        return Icons.villa;
      case 'cottage':
        return Icons.cottage;
      default:
        return Icons.home;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.background,
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _loadStats,
          child: CustomScrollView(
            slivers: [
              _buildHeader(),
              _buildYearSelector(),
              _buildSummaryCards(),
              _buildOccupancyChart(),
              _buildRevenueChart(),
              _buildOtaChart(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return SliverToBoxAdapter(
      child: Container(
        padding: const EdgeInsets.all(AppConstants.spacingL),
        child: Row(
          children: [
            Icon(
              Icons.bar_chart,
              color: Theme.of(context).colorScheme.primary,
              size: AppConstants.iconL,
            ),
            const SizedBox(width: AppConstants.spacingM),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Statistiche',
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    'Dati aggiornati al ${DateFormat('dd/MM/yyyy').format(DateTime.now())}',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Theme.of(
                        context,
                      ).colorScheme.onSurface.withValues(alpha: 0.6),
                    ),
                  ),
                ],
              ),
            ),

            // Apartment selector
            Consumer<ApartmentProvider>(
              builder: (context, apartmentProvider, child) {
                if (apartmentProvider.apartments.isEmpty) {
                  return const SizedBox.shrink();
                }

                return Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppConstants.spacingM,
                    vertical: AppConstants.spacingS,
                  ),
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.surface,
                    border: Border.all(
                      color: AppColors.primary.withValues(alpha: 0.3),
                      width: 1.5,
                    ),
                    borderRadius: BorderRadius.circular(AppConstants.radiusL),
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.primary.withValues(alpha: 0.1),
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      value: apartmentProvider.selectedApartmentId,
                      hint: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(
                            Icons.apartment,
                            size: 18,
                            color: AppColors.primary,
                          ),
                          const SizedBox(width: AppConstants.spacingS),
                          const Text('Tutti'),
                        ],
                      ),
                      items: [
                        DropdownMenuItem(
                          value: 'all',
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(
                                Icons.apartment,
                                size: 18,
                                color: AppColors.primary,
                              ),
                              const SizedBox(width: AppConstants.spacingS),
                              const Text('Tutti'),
                            ],
                          ),
                        ),
                        ...apartmentProvider.apartments.map((apartment) {
                          return DropdownMenuItem(
                            value: apartment.id,
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Container(
                                  width: 24,
                                  height: 24,
                                  decoration: BoxDecoration(
                                    color: AppColors.fromHex(apartment.color),
                                    borderRadius: BorderRadius.circular(6),
                                  ),
                                  child: Icon(
                                    _getIconData(apartment.icon),
                                    size: 14,
                                    color: Colors.white,
                                  ),
                                ),
                                const SizedBox(width: AppConstants.spacingS),
                                Flexible(
                                  child: Text(
                                    apartment.name,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                              ],
                            ),
                          );
                        }),
                      ],
                      onChanged: (value) {
                        if (value != null) {
                          apartmentProvider.setSelectedApartment(value);
                        }
                      },
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildYearSelector() {
    return SliverToBoxAdapter(
      child: Consumer<DashboardProvider>(
        builder: (context, dashboardProvider, child) {
          final currentYear = DateTime.now().year;
          final selectedYear = dashboardProvider.selectedYear;

          return Container(
            padding: const EdgeInsets.symmetric(
              horizontal: AppConstants.spacingL,
            ),
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(AppConstants.spacingM),
                child: Row(
                  children: [
                    Text(
                      'Anno:',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(width: AppConstants.spacingM),
                    Expanded(
                      child: DropdownButton<int>(
                        value: selectedYear,
                        isExpanded: true,
                        items: List.generate(6, (index) {
                          final year = currentYear - 2 + index;
                          return DropdownMenuItem(
                            value: year,
                            child: Text(year.toString()),
                          );
                        }),
                        onChanged: (year) {
                          if (year != null) {
                            dashboardProvider.setSelectedYear(year);
                            _loadStats();
                          }
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildSummaryCards() {
    return SliverToBoxAdapter(
      child: Consumer<DashboardProvider>(
        builder: (context, dashboardProvider, child) {
          final stats = dashboardProvider.stats;

          if (dashboardProvider.isLoading) {
            return const Padding(
              padding: EdgeInsets.all(AppConstants.spacingL),
              child: Center(child: CircularProgressIndicator()),
            );
          }

          if (stats == null) {
            return const SizedBox.shrink();
          }

          return Padding(
            padding: const EdgeInsets.all(AppConstants.spacingL),
            child: Column(
              children: [
                Row(
                  children: [
                    Expanded(
                      child: SummaryCard(
                        title: 'Ricavi Totali',
                        value:
                            '${AppConstants.currencySymbol}${stats.revenue.totalRevenue.toStringAsFixed(0)}',
                        icon: Icons.euro,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                    const SizedBox(width: AppConstants.spacingM),
                    Expanded(
                      child: SummaryCard(
                        title: 'Tasso Occupazione',
                        value:
                            '${stats.occupancy.occupancyRate.toStringAsFixed(1)}%',
                        icon: Icons.calendar_today,
                        color: AppColors.accent,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: AppConstants.spacingM),
                Row(
                  children: [
                    Expanded(
                      child: SummaryCard(
                        title: 'Media/Prenotazione',
                        value:
                            '${AppConstants.currencySymbol}${stats.revenue.averagePerBooking.toStringAsFixed(0)}',
                        icon: Icons.receipt,
                        color: AppColors.info,
                      ),
                    ),
                    const SizedBox(width: AppConstants.spacingM),
                    Expanded(
                      child: SummaryCard(
                        title: 'Media/Notte',
                        value:
                            '${AppConstants.currencySymbol}${stats.revenue.averagePerNight.toStringAsFixed(0)}',
                        icon: Icons.nights_stay,
                        color: AppColors.warning,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildOccupancyChart() {
    return SliverToBoxAdapter(
      child: Consumer2<DashboardProvider, ApartmentProvider>(
        builder: (context, dashboardProvider, apartmentProvider, child) {
          return Padding(
            padding: const EdgeInsets.all(AppConstants.spacingL),
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(AppConstants.spacingL),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Tasso di Occupazione',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: AppConstants.spacingL),
                    SizedBox(
                      height: 200,
                      child: OccupancyChart(
                        selectedCalendar: apartmentProvider.selectedApartmentId,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildRevenueChart() {
    return SliverToBoxAdapter(
      child: Consumer<DashboardProvider>(
        builder: (context, dashboardProvider, child) {
          final stats = dashboardProvider.stats;

          if (stats == null) return const SizedBox.shrink();

          return Padding(
            padding: const EdgeInsets.all(AppConstants.spacingL),
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(AppConstants.spacingL),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Ricavi Mensili',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: AppConstants.spacingL),
                    SizedBox(
                      height: 200,
                      child: BarChart(
                        BarChartData(
                          alignment: BarChartAlignment.spaceAround,
                          maxY: stats.revenue.monthlyRevenue.isNotEmpty
                              ? stats.revenue.monthlyRevenue
                                        .map((e) => e.revenue)
                                        .reduce((a, b) => a > b ? a : b) *
                                    1.2
                              : 100,
                          barTouchData: BarTouchData(enabled: false),
                          titlesData: FlTitlesData(
                            show: true,
                            bottomTitles: AxisTitles(
                              sideTitles: SideTitles(
                                showTitles: true,
                                getTitlesWidget: (value, meta) {
                                  if (value.toInt() <
                                      stats.revenue.monthlyRevenue.length) {
                                    return Text(
                                      stats
                                          .revenue
                                          .monthlyRevenue[value.toInt()]
                                          .month,
                                      style: Theme.of(
                                        context,
                                      ).textTheme.bodySmall,
                                    );
                                  }
                                  return const Text('');
                                },
                              ),
                            ),
                            leftTitles: const AxisTitles(
                              sideTitles: SideTitles(showTitles: false),
                            ),
                            topTitles: const AxisTitles(
                              sideTitles: SideTitles(showTitles: false),
                            ),
                            rightTitles: const AxisTitles(
                              sideTitles: SideTitles(showTitles: false),
                            ),
                          ),
                          borderData: FlBorderData(show: false),
                          barGroups: stats.revenue.monthlyRevenue
                              .asMap()
                              .entries
                              .map(
                                (entry) => BarChartGroupData(
                                  x: entry.key,
                                  barRods: [
                                    BarChartRodData(
                                      toY: entry.value.revenue,
                                      color: Theme.of(
                                        context,
                                      ).colorScheme.primary,
                                      width: 16,
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                  ],
                                ),
                              )
                              .toList(),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildOtaChart() {
    return SliverToBoxAdapter(
      child: Consumer<DashboardProvider>(
        builder: (context, dashboardProvider, child) {
          final stats = dashboardProvider.stats;

          if (stats == null || stats.ota.revenue.isEmpty)
            return const SizedBox.shrink();

          return Padding(
            padding: const EdgeInsets.all(AppConstants.spacingL),
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(AppConstants.spacingL),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Ricavi per OTA',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: AppConstants.spacingL),
                    SizedBox(
                      height: 200,
                      child: PieChart(
                        PieChartData(
                          sections: stats.ota.revenue
                              .asMap()
                              .entries
                              .map(
                                (entry) => PieChartSectionData(
                                  color:
                                      AppConstants.chartColors[entry.key %
                                          AppConstants.chartColors.length],
                                  value: entry.value.revenue,
                                  title:
                                      '${entry.value.ota}\n${AppConstants.currencySymbol}${entry.value.revenue.toStringAsFixed(0)}',
                                  radius: 80,
                                  titleStyle: Theme.of(context)
                                      .textTheme
                                      .bodySmall
                                      ?.copyWith(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                      ),
                                ),
                              )
                              .toList(),
                          centerSpaceRadius: 40,
                          sectionsSpace: 2,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
