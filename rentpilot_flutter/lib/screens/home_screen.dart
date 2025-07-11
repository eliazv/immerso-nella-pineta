import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';

import '../utils/constants.dart';
import '../providers/apartment_provider.dart';
import '../providers/booking_provider.dart';
import '../providers/dashboard_provider.dart';
import '../models/booking.dart';
import '../widgets/summary_card.dart';
import '../widgets/booking_card.dart';
import '../widgets/apartment_card.dart';
import '../widgets/booking_form_modal.dart';
import '../widgets/apartment_form_modal.dart';
import '../models/apartment.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadData();
    });
  }

  Future<void> _loadData() async {
    final apartmentProvider = context.read<ApartmentProvider>();
    final dashboardProvider = context.read<DashboardProvider>();
    final bookingProvider = context.read<BookingProvider>();

    await Future.wait([
      dashboardProvider.loadStats(apartmentProvider.selectedApartmentId),
      bookingProvider.loadBookings(),
      apartmentProvider.loadApartments(),
    ]);

    // TODO: Generate notifications after loading data
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.background,
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _loadData,
          child: CustomScrollView(
            slivers: [
              _buildHeader(),
              _buildSummaryCards(),
              _buildTodayBookings(),
              _buildApartmentsList(),
            ],
          ),
        ),
      ),
      floatingActionButton: _buildFloatingActionButton(),
    );
  }

  Widget _buildHeader() {
    return SliverToBoxAdapter(
      child: Container(
        padding: const EdgeInsets.all(AppConstants.spacingL),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                // Logo placeholder
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.primary,
                    borderRadius: BorderRadius.circular(AppConstants.radiusM),
                  ),
                  child: Icon(
                    Icons.home,
                    color: Theme.of(context).colorScheme.onPrimary,
                    size: AppConstants.iconM,
                  ),
                ),
                const SizedBox(width: AppConstants.spacingM),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        AppConstants.appName,
                        style: Theme.of(context).textTheme.headlineSmall
                            ?.copyWith(fontWeight: FontWeight.bold),
                      ),
                      Text(
                        'Dashboard',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Theme.of(
                            context,
                          ).colorScheme.onBackground.withOpacity(0.6),
                        ),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  onPressed: _showNotifications,
                  icon: Icon(
                    Icons.notifications_outlined,
                    color: Theme.of(context).colorScheme.onSurface,
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppConstants.spacingM),
            Text(
              'Benvenuto! Ecco un riepilogo delle tue attività.',
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                color: Theme.of(
                  context,
                ).colorScheme.onBackground.withOpacity(0.8),
              ),
            ),
          ],
        ),
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
            padding: const EdgeInsets.symmetric(
              horizontal: AppConstants.spacingL,
            ),
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
                        color: Theme.of(context).colorScheme.secondary,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: AppConstants.spacingM),
                Row(
                  children: [
                    Expanded(
                      child: Consumer<BookingProvider>(
                        builder: (context, bookingProvider, child) {
                          final totalBookings = bookingProvider.bookings.length;
                          return SummaryCard(
                            title: 'Prenotazioni',
                            value: totalBookings.toString(),
                            icon: Icons.book,
                            color: AppColors.accent,
                          );
                        },
                      ),
                    ),
                    const SizedBox(width: AppConstants.spacingM),
                    Expanded(
                      child: SummaryCard(
                        title: 'Media/Notte',
                        value:
                            '${AppConstants.currencySymbol}${stats.revenue.averagePerNight.toStringAsFixed(0)}',
                        icon: Icons.nights_stay,
                        color: AppColors.info,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: AppConstants.spacingM),
                Row(
                  children: [
                    Expanded(
                      child: Consumer<BookingProvider>(
                        builder: (context, bookingProvider, child) {
                          final today = DateTime.now();
                          final todayCheckIns = bookingProvider.bookings
                              .where(
                                (booking) =>
                                    booking.checkIn.year == today.year &&
                                    booking.checkIn.month == today.month &&
                                    booking.checkIn.day == today.day,
                              )
                              .length;
                          return SummaryCard(
                            title: 'Check-in Oggi',
                            value: todayCheckIns.toString(),
                            icon: Icons.login,
                            color: AppColors.success,
                          );
                        },
                      ),
                    ),
                    const SizedBox(width: AppConstants.spacingM),
                    Expanded(
                      child: Consumer<BookingProvider>(
                        builder: (context, bookingProvider, child) {
                          final today = DateTime.now();
                          final todayCheckOuts = bookingProvider.bookings
                              .where(
                                (booking) =>
                                    booking.checkOut.year == today.year &&
                                    booking.checkOut.month == today.month &&
                                    booking.checkOut.day == today.day,
                              )
                              .length;
                          return SummaryCard(
                            title: 'Check-out Oggi',
                            value: todayCheckOuts.toString(),
                            icon: Icons.logout,
                            color: AppColors.error,
                          );
                        },
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: AppConstants.spacingM),
                Row(
                  children: [
                    Expanded(
                      child: Consumer<ApartmentProvider>(
                        builder: (context, apartmentProvider, child) {
                          final activeApartments = apartmentProvider.apartments
                              .where((apt) => apt.isActive)
                              .length;
                          return SummaryCard(
                            title: 'Appartamenti Attivi',
                            value: activeApartments.toString(),
                            icon: Icons.apartment,
                            color: AppColors.primary,
                          );
                        },
                      ),
                    ),
                    const SizedBox(width: AppConstants.spacingM),
                    Expanded(
                      child: Consumer<BookingProvider>(
                        builder: (context, bookingProvider, child) {
                          final now = DateTime.now();
                          final monthlyBookings = bookingProvider.bookings
                              .where(
                                (booking) =>
                                    booking.checkIn.year == now.year &&
                                    booking.checkIn.month == now.month,
                              )
                              .length;
                          return SummaryCard(
                            title: 'Prenotazioni Mese',
                            value: monthlyBookings.toString(),
                            icon: Icons.calendar_month,
                            color: AppColors.accent,
                          );
                        },
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

  Widget _buildTodayBookings() {
    return SliverToBoxAdapter(
      child: Consumer<BookingProvider>(
        builder: (context, bookingProvider, child) {
          final todayBookings = bookingProvider.todayBookings;

          if (todayBookings.isEmpty) {
            return const SizedBox.shrink();
          }

          return Padding(
            padding: const EdgeInsets.all(AppConstants.spacingL),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Attività di Oggi',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: AppConstants.spacingM),
                ...todayBookings.map(
                  (booking) => Padding(
                    padding: const EdgeInsets.only(
                      bottom: AppConstants.spacingS,
                    ),
                    child: BookingCard(booking: booking),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildApartmentsList() {
    return SliverToBoxAdapter(
      child: Consumer<ApartmentProvider>(
        builder: (context, apartmentProvider, child) {
          final apartments = apartmentProvider.activeApartments;

          if (apartments.isEmpty) {
            return Padding(
              padding: const EdgeInsets.all(AppConstants.spacingL),
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(AppConstants.spacingL),
                  child: Column(
                    children: [
                      Icon(
                        Icons.home_outlined,
                        size: 48,
                        color: Theme.of(
                          context,
                        ).colorScheme.onSurface.withOpacity(0.5),
                      ),
                      const SizedBox(height: AppConstants.spacingM),
                      Text(
                        'Nessun appartamento',
                        style: Theme.of(context).textTheme.headlineSmall,
                      ),
                      const SizedBox(height: AppConstants.spacingS),
                      Text(
                        'Aggiungi il tuo primo appartamento per iniziare',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Theme.of(
                            context,
                          ).colorScheme.onSurface.withOpacity(0.6),
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: AppConstants.spacingL),
                      ElevatedButton.icon(
                        onPressed: () {
                          // TODO: Navigate to add apartment
                        },
                        icon: const Icon(Icons.add),
                        label: const Text('Aggiungi Appartamento'),
                      ),
                    ],
                  ),
                ),
              ),
            );
          }

          return Padding(
            padding: const EdgeInsets.all(AppConstants.spacingL),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'I Tuoi Appartamenti',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: AppConstants.spacingM),
                ...apartments.map(
                  (apartment) => Padding(
                    padding: const EdgeInsets.only(
                      bottom: AppConstants.spacingM,
                    ),
                    child: ApartmentCard(apartment: apartment),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildFloatingActionButton() {
    return FloatingActionButton(
      onPressed: () => _showCreateOptions(),
      child: const Icon(Icons.add),
    );
  }

  void _showCreateOptions() {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: const EdgeInsets.all(AppConstants.spacingL),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Cosa vuoi creare?',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: AppConstants.spacingL),
            ListTile(
              leading: const Icon(Icons.book),
              title: const Text('Nuova Prenotazione'),
              onTap: () {
                Navigator.pop(context);
                _showCreateBooking();
              },
            ),
            ListTile(
              leading: const Icon(Icons.home),
              title: const Text('Nuovo Appartamento'),
              onTap: () {
                Navigator.pop(context);
                _showCreateApartment();
              },
            ),
            ListTile(
              leading: const Icon(Icons.file_upload),
              title: const Text('Importa iCal'),
              onTap: () {
                Navigator.pop(context);
                _showImportICal();
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showCreateBooking() {
    showDialog(
      context: context,
      builder: (context) => BookingFormModal(
        onSave: (booking) async {
          try {
            await context.read<BookingProvider>().addBooking(booking);
            if (mounted) {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text(AppConstants.bookingCreatedMessage),
                  backgroundColor: AppColors.success,
                ),
              );
              _loadData();
            }
          } catch (e) {
            if (mounted) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Errore nella creazione: $e'),
                  backgroundColor: AppColors.error,
                ),
              );
            }
          }
        },
      ),
    );
  }

  void _showCreateApartment() {
    showDialog(
      context: context,
      builder: (context) => ApartmentFormModal(
        onSave: (apartment) async {
          try {
            await context.read<ApartmentProvider>().addApartment(apartment);
            if (mounted) {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text(AppConstants.apartmentCreatedMessage),
                  backgroundColor: AppColors.success,
                ),
              );
              _loadData();
            }
          } catch (e) {
            if (mounted) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Errore nella creazione: $e'),
                  backgroundColor: AppColors.error,
                ),
              );
            }
          }
        },
      ),
    );
  }

  void _showImportICal() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Funzionalità Import iCal in arrivo'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _showNotifications() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Funzionalità Notifiche in arrivo'),
        backgroundColor: AppColors.info,
      ),
    );
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

  void _showEditApartment(Apartment apartment) {
    showDialog(
      context: context,
      builder: (context) => ApartmentFormModal(
        apartment: apartment,
        onSave: (updatedApartment) async {
          try {
            await context.read<ApartmentProvider>().saveApartment(
              updatedApartment,
            );
            if (mounted) {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text(AppConstants.apartmentUpdatedMessage),
                  backgroundColor: AppColors.success,
                ),
              );
              _loadData();
            }
          } catch (e) {
            if (mounted) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Errore nell\'aggiornamento: $e'),
                  backgroundColor: AppColors.error,
                ),
              );
            }
          }
        },
      ),
    );
  }

  void _showDeleteApartment(Apartment apartment) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Elimina Appartamento'),
        content: Text(
          'Sei sicuro di voler eliminare "${apartment.name}"?\n\nQuesta azione non può essere annullata.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Annulla'),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.of(context).pop();

              try {
                await context.read<ApartmentProvider>().deleteApartment(
                  apartment.id,
                );
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text(AppConstants.apartmentDeletedMessage),
                      backgroundColor: AppColors.success,
                    ),
                  );
                  _loadData();
                }
              } catch (e) {
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Errore nell\'eliminazione: $e'),
                      backgroundColor: AppColors.error,
                    ),
                  );
                }
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Theme.of(context).colorScheme.error,
              foregroundColor: Theme.of(context).colorScheme.onError,
            ),
            child: const Text('Elimina'),
          ),
        ],
      ),
    );
  }
}
