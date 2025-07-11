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

class CalendarScreen extends StatefulWidget {
  const CalendarScreen({super.key});

  @override
  State<CalendarScreen> createState() => _CalendarScreenState();
}

class _CalendarScreenState extends State<CalendarScreen> {
  late final ValueNotifier<List<Booking>> _selectedBookings;
  CalendarFormat _calendarFormat = CalendarFormat.month;
  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;

  @override
  void initState() {
    super.initState();
    _selectedDay = DateTime.now();
    _selectedBookings = ValueNotifier(_getBookingsForDay(_selectedDay!));
  }

  @override
  void dispose() {
    _selectedBookings.dispose();
    super.dispose();
  }

  List<Booking> _getBookingsForDay(DateTime day) {
    final bookingProvider = context.read<BookingProvider>();
    final apartmentProvider = context.read<ApartmentProvider>();

    List<Booking> bookings = bookingProvider.bookings;

    // Filter by selected apartment if not 'all'
    if (apartmentProvider.selectedApartmentId != 'all') {
      bookings = bookings
          .where(
            (booking) =>
                booking.apartmentId == apartmentProvider.selectedApartmentId,
          )
          .toList();
    }

    // Filter by day
    return bookings.where((booking) {
      return day.isAfter(booking.checkIn.subtract(const Duration(days: 1))) &&
          day.isBefore(booking.checkOut);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.background,
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(),
            _buildCalendar(),
            _buildSelectedDayBookings(),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showCreateBooking(),
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.all(AppConstants.spacingL),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.calendar_today,
                color: Theme.of(context).colorScheme.primary,
                size: AppConstants.iconL,
              ),
              const SizedBox(width: AppConstants.spacingM),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Calendario',
                      style: Theme.of(context).textTheme.headlineSmall
                          ?.copyWith(fontWeight: FontWeight.bold),
                    ),
                    Consumer<ApartmentProvider>(
                      builder: (context, apartmentProvider, child) {
                        final selectedApartment =
                            apartmentProvider.selectedApartment;
                        return Text(
                          selectedApartment?.name ?? 'Tutti gli appartamenti',
                          style: Theme.of(context).textTheme.bodyMedium
                              ?.copyWith(
                                color: Theme.of(
                                  context,
                                ).colorScheme.onBackground.withOpacity(0.6),
                              ),
                        );
                      },
                    ),
                  ],
                ),
              ),
              IconButton(
                onPressed: () => _showCalendarOptions(),
                icon: const Icon(Icons.more_vert),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCalendar() {
    return Consumer2<BookingProvider, ApartmentProvider>(
      builder: (context, bookingProvider, apartmentProvider, child) {
        return Card(
          margin: const EdgeInsets.symmetric(horizontal: AppConstants.spacingL),
          child: Padding(
            padding: const EdgeInsets.all(AppConstants.spacingM),
            child: TableCalendar<Booking>(
              firstDay: DateTime.utc(2020, 1, 1),
              lastDay: DateTime.utc(2030, 12, 31),
              focusedDay: _focusedDay,
              calendarFormat: _calendarFormat,
              eventLoader: _getBookingsForDay,
              startingDayOfWeek: StartingDayOfWeek.monday,
              selectedDayPredicate: (day) {
                return isSameDay(_selectedDay, day);
              },
              onDaySelected: (selectedDay, focusedDay) {
                if (!isSameDay(_selectedDay, selectedDay)) {
                  setState(() {
                    _selectedDay = selectedDay;
                    _focusedDay = focusedDay;
                  });
                  _selectedBookings.value = _getBookingsForDay(selectedDay);
                }
              },
              onFormatChanged: (format) {
                if (_calendarFormat != format) {
                  setState(() {
                    _calendarFormat = format;
                  });
                }
              },
              onPageChanged: (focusedDay) {
                _focusedDay = focusedDay;
              },
              calendarStyle: CalendarStyle(
                outsideDaysVisible: false,
                weekendTextStyle: TextStyle(
                  color: Theme.of(context).colorScheme.error,
                ),
                holidayTextStyle: TextStyle(
                  color: Theme.of(context).colorScheme.error,
                ),
                selectedDecoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primary,
                  shape: BoxShape.circle,
                ),
                todayDecoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primary.withOpacity(0.5),
                  shape: BoxShape.circle,
                ),
                markerDecoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.secondary,
                  shape: BoxShape.circle,
                ),
              ),
              headerStyle: HeaderStyle(
                formatButtonVisible: true,
                titleCentered: true,
                formatButtonShowsNext: false,
                formatButtonDecoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primary,
                  borderRadius: BorderRadius.circular(AppConstants.radiusS),
                ),
                formatButtonTextStyle: TextStyle(
                  color: Theme.of(context).colorScheme.onPrimary,
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildSelectedDayBookings() {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(AppConstants.spacingL),
            child: Text(
              _selectedDay != null
                  ? 'Prenotazioni del ${DateFormat('dd MMMM yyyy', 'it').format(_selectedDay!)}'
                  : 'Seleziona una data',
              style: Theme.of(
                context,
              ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w600),
            ),
          ),
          Expanded(
            child: ValueListenableBuilder<List<Booking>>(
              valueListenable: _selectedBookings,
              builder: (context, bookings, child) {
                if (bookings.isEmpty) {
                  return Center(
                    child: SingleChildScrollView(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.event_busy,
                            size: 64,
                            color: Theme.of(
                              context,
                            ).colorScheme.onSurface.withOpacity(0.3),
                          ),
                          const SizedBox(height: AppConstants.spacingM),
                          Text(
                            'Nessuna prenotazione',
                            style: Theme.of(context).textTheme.titleMedium
                                ?.copyWith(
                                  color: Theme.of(
                                    context,
                                  ).colorScheme.onSurface.withOpacity(0.6),
                                ),
                          ),
                          const SizedBox(height: AppConstants.spacingS),
                          Text(
                            'Aggiungi una nuova prenotazione per questa data',
                            style: Theme.of(context).textTheme.bodyMedium
                                ?.copyWith(
                                  color: Theme.of(
                                    context,
                                  ).colorScheme.onSurface.withOpacity(0.4),
                                ),
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                    ),
                  );
                }

                return ListView.builder(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppConstants.spacingL,
                  ),
                  itemCount: bookings.length,
                  itemBuilder: (context, index) {
                    final booking = bookings[index];
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
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  void _showCalendarOptions() {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: const EdgeInsets.all(AppConstants.spacingL),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Opzioni Calendario',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: AppConstants.spacingL),
            ListTile(
              leading: const Icon(Icons.today),
              title: const Text('Vai a Oggi'),
              onTap: () {
                Navigator.pop(context);
                setState(() {
                  _focusedDay = DateTime.now();
                  _selectedDay = DateTime.now();
                });
                _selectedBookings.value = _getBookingsForDay(DateTime.now());
              },
            ),
            ListTile(
              leading: const Icon(Icons.refresh),
              title: const Text('Aggiorna'),
              onTap: () {
                Navigator.pop(context);
                context.read<BookingProvider>().loadBookings();
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
              _selectedBookings.value = _getBookingsForDay(
                _selectedDay ?? DateTime.now(),
              );
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
              _selectedBookings.value = _getBookingsForDay(
                _selectedDay ?? DateTime.now(),
              );
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

  Color _getBookingColor(Booking booking) {
    final apartmentProvider = context.read<ApartmentProvider>();
    final apartment = apartmentProvider.apartments.firstWhere(
      (apt) => apt.id == booking.apartmentId,
      orElse: () => apartmentProvider.apartments.first,
    );
    return AppColors.fromHex(apartment.color);
  }
}
