import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:intl/intl.dart';

import '../utils/constants.dart';
import '../providers/apartment_provider.dart';
import '../providers/booking_provider.dart';
import '../models/booking.dart';
import '../widgets/booking_form_modal.dart';
import '../widgets/booking_card.dart';

class CalendarBookingsScreen extends StatefulWidget {
  const CalendarBookingsScreen({super.key});

  @override
  State<CalendarBookingsScreen> createState() => _CalendarBookingsScreenState();
}

class _CalendarBookingsScreenState extends State<CalendarBookingsScreen>
    with TickerProviderStateMixin {
  late final TabController _tabController;
  late final ValueNotifier<List<Booking>> _selectedDayBookings;
  DateTime _selectedDay = DateTime.now();
  DateTime _focusedDay = DateTime.now();
  String _searchQuery = '';
  final TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _selectedDayBookings = ValueNotifier(_getBookingsForDay(_selectedDay));

    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<BookingProvider>().loadBookings();
      context.read<ApartmentProvider>().loadApartments();
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    _selectedDayBookings.dispose();
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.surface,
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(),
            _buildTabBar(),
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [_buildCalendarView(), _buildBookingsListView()],
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _showCreateBooking,
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.all(AppConstants.spacingL),
      child: Row(
        children: [
          Icon(
            Icons.calendar_today,
            color: AppColors.primary,
            size: AppConstants.iconL,
          ),
          const SizedBox(width: AppConstants.spacingM),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Calendario & Prenotazioni',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Consumer<BookingProvider>(
                  builder: (context, provider, child) {
                    return Text(
                      '${provider.bookings.length} prenotazioni totali',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: Theme.of(
                          context,
                        ).colorScheme.onSurface.withValues(alpha: 0.6),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
          Consumer<ApartmentProvider>(
            builder: (context, apartmentProvider, child) {
              if (apartmentProvider.apartments.isEmpty) {
                return const SizedBox.shrink();
              }

              return Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppConstants.spacingM,
                ),
                decoration: BoxDecoration(
                  border: Border.all(
                    color: Theme.of(context).colorScheme.outline,
                  ),
                  borderRadius: BorderRadius.circular(AppConstants.radiusM),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: apartmentProvider.selectedApartmentId,
                    hint: const Text('Tutti'),
                    items: [
                      const DropdownMenuItem(
                        value: 'all',
                        child: Text('Tutti gli appartamenti'),
                      ),
                      ...apartmentProvider.apartments.map((apartment) {
                        return DropdownMenuItem(
                          value: apartment.id,
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Container(
                                width: 12,
                                height: 12,
                                decoration: BoxDecoration(
                                  color: AppColors.fromHex(apartment.color),
                                  shape: BoxShape.circle,
                                ),
                              ),
                              const SizedBox(width: AppConstants.spacingXS),
                              Text(apartment.name),
                            ],
                          ),
                        );
                      }),
                    ],
                    onChanged: (value) {
                      if (value != null) {
                        apartmentProvider.setSelectedApartment(value);
                        _selectedDayBookings.value = _getBookingsForDay(
                          _selectedDay,
                        );
                      }
                    },
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildTabBar() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: AppConstants.spacingL),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        borderRadius: BorderRadius.circular(AppConstants.radiusL),
        border: Border.all(
          color: Theme.of(context).colorScheme.outline.withValues(alpha: 0.3),
        ),
      ),
      child: TabBar(
        controller: _tabController,
        indicator: BoxDecoration(
          color: AppColors.primary,
          borderRadius: BorderRadius.circular(AppConstants.radiusL),
        ),
        labelColor: Colors.white,
        unselectedLabelColor: Theme.of(
          context,
        ).colorScheme.onSurface.withValues(alpha: 0.6),
        dividerColor: Colors.transparent,
        tabs: const [
          Tab(icon: Icon(Icons.calendar_view_month), text: 'Calendario'),
          Tab(icon: Icon(Icons.list), text: 'Lista'),
        ],
      ),
    );
  }

  Widget _buildCalendarView() {
    return Column(
      children: [
        const SizedBox(height: AppConstants.spacingL),
        Expanded(
          child: Row(
            children: [
              // Calendar
              Expanded(
                flex: 3,
                child: Container(
                  margin: const EdgeInsets.only(left: AppConstants.spacingL),
                  padding: const EdgeInsets.all(AppConstants.spacingM),
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.surface,
                    borderRadius: BorderRadius.circular(AppConstants.radiusL),
                    border: Border.all(
                      color: Theme.of(
                        context,
                      ).colorScheme.outline.withValues(alpha: 0.3),
                    ),
                  ),
                  child: Consumer<BookingProvider>(
                    builder: (context, bookingProvider, child) {
                      return TableCalendar<Booking>(
                        firstDay: DateTime.utc(2020, 1, 1),
                        lastDay: DateTime.utc(2030, 12, 31),
                        focusedDay: _focusedDay,
                        selectedDayPredicate: (day) =>
                            isSameDay(_selectedDay, day),
                        eventLoader: _getBookingsForDay,
                        startingDayOfWeek: StartingDayOfWeek.monday,
                        calendarStyle: CalendarStyle(
                          outsideDaysVisible: false,
                          weekendTextStyle: TextStyle(color: AppColors.error),
                          holidayTextStyle: TextStyle(color: AppColors.error),
                          selectedDecoration: BoxDecoration(
                            color: AppColors.primary,
                            shape: BoxShape.circle,
                          ),
                          todayDecoration: BoxDecoration(
                            color: AppColors.accent,
                            shape: BoxShape.circle,
                          ),
                          markerDecoration: BoxDecoration(
                            color: AppColors.primary.withValues(alpha: 0.7),
                            shape: BoxShape.circle,
                          ),
                        ),
                        headerStyle: const HeaderStyle(
                          formatButtonVisible: false,
                          titleCentered: true,
                        ),
                        onDaySelected: (selectedDay, focusedDay) {
                          setState(() {
                            _selectedDay = selectedDay;
                            _focusedDay = focusedDay;
                          });
                          _selectedDayBookings.value = _getBookingsForDay(
                            selectedDay,
                          );
                        },
                        onPageChanged: (focusedDay) {
                          _focusedDay = focusedDay;
                        },
                        calendarBuilders: CalendarBuilders(
                          markerBuilder: (context, day, events) {
                            if (events.isNotEmpty) {
                              return Positioned(
                                right: 1,
                                bottom: 1,
                                child: Container(
                                  decoration: const BoxDecoration(
                                    color: AppColors.primary,
                                    shape: BoxShape.circle,
                                  ),
                                  width: 16,
                                  height: 16,
                                  child: Center(
                                    child: Text(
                                      '${events.length}',
                                      style: const TextStyle(
                                        color: Colors.white,
                                        fontSize: 12,
                                      ),
                                    ),
                                  ),
                                ),
                              );
                            }
                            return null;
                          },
                        ),
                      );
                    },
                  ),
                ),
              ),

              const SizedBox(width: AppConstants.spacingM),

              // Selected day bookings
              Expanded(
                flex: 2,
                child: Container(
                  margin: const EdgeInsets.only(right: AppConstants.spacingL),
                  padding: const EdgeInsets.all(AppConstants.spacingM),
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.surface,
                    borderRadius: BorderRadius.circular(AppConstants.radiusL),
                    border: Border.all(
                      color: Theme.of(
                        context,
                      ).colorScheme.outline.withValues(alpha: 0.3),
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.event, color: AppColors.primary),
                          const SizedBox(width: AppConstants.spacingS),
                          Text(
                            DateFormat(
                              'dd MMMM yyyy',
                              'it_IT',
                            ).format(_selectedDay),
                            style: Theme.of(context).textTheme.titleMedium
                                ?.copyWith(fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                      const SizedBox(height: AppConstants.spacingM),
                      Expanded(
                        child: ValueListenableBuilder<List<Booking>>(
                          valueListenable: _selectedDayBookings,
                          builder: (context, bookings, child) {
                            if (bookings.isEmpty) {
                              return Center(
                                child: SingleChildScrollView(
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Icon(
                                        Icons.event_available,
                                        size: 48,
                                        color: Theme.of(context)
                                            .colorScheme
                                            .onSurface
                                            .withValues(alpha: 0.3),
                                      ),
                                      const SizedBox(
                                        height: AppConstants.spacingM,
                                      ),
                                      Text(
                                        'Nessuna prenotazione',
                                        style: Theme.of(context)
                                            .textTheme
                                            .titleMedium
                                            ?.copyWith(
                                              color: Theme.of(context)
                                                  .colorScheme
                                                  .onSurface
                                                  .withValues(alpha: 0.6),
                                            ),
                                      ),
                                      Text(
                                        'per questa data',
                                        style: Theme.of(context)
                                            .textTheme
                                            .bodyMedium
                                            ?.copyWith(
                                              color: Theme.of(context)
                                                  .colorScheme
                                                  .onSurface
                                                  .withValues(alpha: 0.5),
                                            ),
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            }

                            return ListView.builder(
                              itemCount: bookings.length,
                              itemBuilder: (context, index) {
                                final booking = bookings[index];
                                return Padding(
                                  padding: const EdgeInsets.only(
                                    bottom: AppConstants.spacingS,
                                  ),
                                  child: BookingCard(
                                    booking: booking,
                                    onTap: () => _showBookingDetails(booking),
                                  ),
                                );
                              },
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildBookingsListView() {
    return Column(
      children: [
        const SizedBox(height: AppConstants.spacingL),
        // Search bar
        Container(
          margin: const EdgeInsets.symmetric(horizontal: AppConstants.spacingL),
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _searchController,
                  decoration: InputDecoration(
                    hintText: 'Cerca per nome ospite...',
                    prefixIcon: const Icon(Icons.search),
                    suffixIcon: _searchQuery.isNotEmpty
                        ? IconButton(
                            onPressed: () {
                              _searchController.clear();
                              setState(() {
                                _searchQuery = '';
                              });
                            },
                            icon: const Icon(Icons.clear),
                          )
                        : null,
                  ),
                  onChanged: (value) {
                    setState(() {
                      _searchQuery = value;
                    });
                  },
                ),
              ),
              const SizedBox(width: AppConstants.spacingM),
              Container(
                decoration: BoxDecoration(
                  color: AppColors.primary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(AppConstants.radiusM),
                ),
                child: IconButton(
                  onPressed: _showCreateBooking,
                  icon: Icon(Icons.add, color: AppColors.primary),
                  tooltip: 'Nuova prenotazione',
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: AppConstants.spacingL),
        // Bookings list
        Expanded(
          child: Consumer2<BookingProvider, ApartmentProvider>(
            builder: (context, bookingProvider, apartmentProvider, child) {
              if (bookingProvider.isLoading) {
                return const Center(child: CircularProgressIndicator());
              }

              if (bookingProvider.error != null) {
                return Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.error_outline,
                        size: 64,
                        color: Theme.of(context).colorScheme.error,
                      ),
                      const SizedBox(height: AppConstants.spacingM),
                      Text(
                        'Errore nel caricamento',
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const SizedBox(height: AppConstants.spacingS),
                      Text(
                        bookingProvider.error!,
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Theme.of(
                            context,
                          ).colorScheme.onSurface.withValues(alpha: 0.6),
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: AppConstants.spacingL),
                      ElevatedButton(
                        onPressed: () => bookingProvider.loadBookings(),
                        child: const Text('Riprova'),
                      ),
                    ],
                  ),
                );
              }

              List<Booking> filteredBookings = bookingProvider.bookings;

              // Filter by apartment
              if (apartmentProvider.selectedApartmentId != 'all') {
                filteredBookings = filteredBookings
                    .where(
                      (booking) =>
                          booking.apartmentId ==
                          apartmentProvider.selectedApartmentId,
                    )
                    .toList();
              }

              // Filter by search query
              if (_searchQuery.isNotEmpty) {
                filteredBookings = filteredBookings
                    .where(
                      (booking) => booking.guestName.toLowerCase().contains(
                        _searchQuery.toLowerCase(),
                      ),
                    )
                    .toList();
              }

              if (filteredBookings.isEmpty) {
                return Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.event_busy,
                        size: 64,
                        color: Theme.of(
                          context,
                        ).colorScheme.onSurface.withValues(alpha: 0.3),
                      ),
                      const SizedBox(height: AppConstants.spacingM),
                      Text(
                        _searchQuery.isNotEmpty
                            ? 'Nessun risultato'
                            : 'Nessuna prenotazione',
                        style: Theme.of(context).textTheme.titleMedium
                            ?.copyWith(
                              color: Theme.of(
                                context,
                              ).colorScheme.onSurface.withValues(alpha: 0.6),
                            ),
                      ),
                      const SizedBox(height: AppConstants.spacingS),
                      Text(
                        _searchQuery.isNotEmpty
                            ? 'Prova a modificare i criteri di ricerca'
                            : 'Aggiungi la tua prima prenotazione',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Theme.of(
                            context,
                          ).colorScheme.onSurface.withValues(alpha: 0.5),
                        ),
                        textAlign: TextAlign.center,
                      ),
                      if (_searchQuery.isEmpty) ...[
                        const SizedBox(height: AppConstants.spacingL),
                        ElevatedButton.icon(
                          onPressed: _showCreateBooking,
                          icon: const Icon(Icons.add),
                          label: const Text('Nuova Prenotazione'),
                        ),
                      ],
                    ],
                  ),
                );
              }

              return RefreshIndicator(
                onRefresh: () => bookingProvider.loadBookings(),
                child: ListView.builder(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppConstants.spacingL,
                  ),
                  itemCount: filteredBookings.length,
                  itemBuilder: (context, index) {
                    final booking = filteredBookings[index];
                    return Padding(
                      padding: const EdgeInsets.only(
                        bottom: AppConstants.spacingM,
                      ),
                      child: BookingCard(
                        booking: booking,
                        onTap: () => _showBookingDetails(booking),
                      ),
                    );
                  },
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  List<Booking> _getBookingsForDay(DateTime day) {
    final bookingProvider = context.read<BookingProvider>();
    final apartmentProvider = context.read<ApartmentProvider>();

    return bookingProvider.bookings.where((booking) {
      // Filter by selected apartment if not "all"
      if (apartmentProvider.selectedApartmentId != 'all' &&
          booking.apartmentId != apartmentProvider.selectedApartmentId) {
        return false;
      }

      // Check if booking overlaps with the selected day
      final bookingStart = DateTime(
        booking.checkIn.year,
        booking.checkIn.month,
        booking.checkIn.day,
      );
      final bookingEnd = DateTime(
        booking.checkOut.year,
        booking.checkOut.month,
        booking.checkOut.day,
      );
      final selectedDay = DateTime(day.year, day.month, day.day);

      return selectedDay.isAtSameMomentAs(bookingStart) ||
          selectedDay.isAtSameMomentAs(bookingEnd) ||
          (selectedDay.isAfter(bookingStart) &&
              selectedDay.isBefore(bookingEnd));
    }).toList();
  }

  Color _getBookingColor(Booking booking) {
    final apartmentProvider = context.read<ApartmentProvider>();
    try {
      final apartment = apartmentProvider.apartments.firstWhere(
        (apt) => apt.id == booking.apartmentId,
      );
      return AppColors.fromHex(apartment.color);
    } catch (e) {
      return AppColors.primary;
    }
  }

  void _showCreateBooking() {
    showDialog(
      context: context,
      builder: (context) => BookingFormModal(
        initialCheckIn: _selectedDay,
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
              _selectedDayBookings.value = _getBookingsForDay(_selectedDay);
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

  void _showBookingDetails(Booking booking) {
    showDialog(
      context: context,
      builder: (context) => BookingFormModal(
        booking: booking,
        onSave: (updatedBooking) async {
          try {
            await context.read<BookingProvider>().saveBooking(updatedBooking);
            if (mounted) {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text(AppConstants.bookingUpdatedMessage),
                  backgroundColor: AppColors.success,
                ),
              );
              _selectedDayBookings.value = _getBookingsForDay(_selectedDay);
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
}
