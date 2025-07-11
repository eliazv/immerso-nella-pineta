import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../utils/constants.dart';
import '../providers/apartment_provider.dart';
import '../providers/booking_provider.dart';
import '../providers/dashboard_provider.dart';
import 'home_screen.dart';
import 'calendar_bookings_screen.dart';
import 'statistics_screen.dart';
import 'apartments_screen.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const HomeScreen(),
    const CalendarBookingsScreen(),
    const StatisticsScreen(),
  ];

  // Removed automatic initialization to avoid setState during build
  // Providers will be initialized manually when needed

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(index: _currentIndex, children: _screens),
      bottomNavigationBar: _buildBottomNavigationBar(),
    );
  }

  Widget _buildBottomNavigationBar() {
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: AppConstants.spacingM,
            vertical: AppConstants.spacingS,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItem(
                icon: Icons.home_outlined,
                activeIcon: Icons.home,
                label: 'Home',
                index: 0,
              ),
              _buildNavItem(
                icon: Icons.calendar_today_outlined,
                activeIcon: Icons.calendar_today,
                label: 'Calendario',
                index: 1,
              ),
              _buildNavItem(
                icon: Icons.bar_chart_outlined,
                activeIcon: Icons.bar_chart,
                label: 'Statistiche',
                index: 2,
              ),
              _buildApartmentDropdown(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem({
    required IconData icon,
    required IconData activeIcon,
    required String label,
    required int index,
  }) {
    final isActive = _currentIndex == index;

    return GestureDetector(
      onTap: () => setState(() => _currentIndex = index),
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: AppConstants.spacingM,
          vertical: AppConstants.spacingS,
        ),
        decoration: BoxDecoration(
          color: isActive
              ? Theme.of(context).colorScheme.primary.withValues(alpha: 0.1)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(AppConstants.radiusM),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              isActive ? activeIcon : icon,
              color: isActive
                  ? Theme.of(context).colorScheme.primary
                  : Theme.of(
                      context,
                    ).colorScheme.onSurface.withValues(alpha: 0.6),
              size: AppConstants.iconM,
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: Theme.of(context).textTheme.labelSmall?.copyWith(
                color: isActive
                    ? Theme.of(context).colorScheme.primary
                    : Theme.of(
                        context,
                      ).colorScheme.onSurface.withValues(alpha: 0.6),
                fontWeight: isActive ? FontWeight.w600 : FontWeight.w400,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildApartmentDropdown() {
    return Consumer<ApartmentProvider>(
      builder: (context, apartmentProvider, child) {
        final apartments = apartmentProvider.activeApartments;
        final selectedId = apartmentProvider.selectedApartmentId;

        return PopupMenuButton<String>(
          onSelected: (value) {
            if (value == 'settings') {
              // Navigate to apartments screen
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const ApartmentsScreen(),
                ),
              );
            } else {
              apartmentProvider.setSelectedApartment(value);
            }
          },
          itemBuilder: (context) => [
            PopupMenuItem<String>(
              value: 'all',
              child: Row(
                children: [
                  Icon(
                    Icons.apartment,
                    color: Theme.of(context).colorScheme.primary,
                    size: AppConstants.iconS,
                  ),
                  const SizedBox(width: AppConstants.spacingS),
                  const Text('Tutti gli appartamenti'),
                  if (selectedId == 'all') ...[
                    const Spacer(),
                    Icon(
                      Icons.check,
                      color: Theme.of(context).colorScheme.primary,
                      size: AppConstants.iconS,
                    ),
                  ],
                ],
              ),
            ),
            ...apartments.map(
              (apartment) => PopupMenuItem<String>(
                value: apartment.id,
                child: Row(
                  children: [
                    Container(
                      width: 16,
                      height: 16,
                      decoration: BoxDecoration(
                        color: Color(
                          int.parse(apartment.color.substring(1), radix: 16) +
                              0xFF000000,
                        ),
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: AppConstants.spacingS),
                    Expanded(child: Text(apartment.name)),
                    if (selectedId == apartment.id) ...[
                      const SizedBox(width: AppConstants.spacingS),
                      Icon(
                        Icons.check,
                        color: Theme.of(context).colorScheme.primary,
                        size: AppConstants.iconS,
                      ),
                    ],
                  ],
                ),
              ),
            ),
            const PopupMenuDivider(),
            PopupMenuItem<String>(
              value: 'settings',
              child: Row(
                children: [
                  Icon(
                    Icons.settings,
                    color: Theme.of(
                      context,
                    ).colorScheme.onSurface.withValues(alpha: 0.6),
                    size: AppConstants.iconS,
                  ),
                  const SizedBox(width: AppConstants.spacingS),
                  const Text('Gestisci appartamenti'),
                ],
              ),
            ),
          ],
          child: Container(
            padding: const EdgeInsets.symmetric(
              horizontal: AppConstants.spacingM,
              vertical: AppConstants.spacingS,
            ),
            decoration: BoxDecoration(
              color: _currentIndex == 3
                  ? Theme.of(context).colorScheme.primary.withValues(alpha: 0.1)
                  : Colors.transparent,
              borderRadius: BorderRadius.circular(AppConstants.radiusM),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  Icons.business,
                  color: _currentIndex == 3
                      ? Theme.of(context).colorScheme.primary
                      : Theme.of(
                          context,
                        ).colorScheme.onSurface.withValues(alpha: 0.6),
                  size: AppConstants.iconM,
                ),
                const SizedBox(height: 4),
                Text(
                  'Appartamenti',
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(
                    color: _currentIndex == 3
                        ? Theme.of(context).colorScheme.primary
                        : Theme.of(
                            context,
                          ).colorScheme.onSurface.withValues(alpha: 0.6),
                    fontWeight: _currentIndex == 3
                        ? FontWeight.w600
                        : FontWeight.w400,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
