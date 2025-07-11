import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';

import '../models/booking.dart';
import '../models/apartment.dart';
import '../providers/apartment_provider.dart';
import '../providers/booking_provider.dart';
import '../utils/constants.dart';
import '../widgets/booking_form_modal.dart';

class BookingDetailsModal extends StatelessWidget {
  final Booking booking;

  const BookingDetailsModal({super.key, required this.booking});

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Container(
        width: MediaQuery.of(context).size.width * 0.9,
        height: MediaQuery.of(context).size.height * 0.8,
        padding: const EdgeInsets.all(AppConstants.spacingL),
        child: Column(
          children: [
            _buildHeader(context),
            const SizedBox(height: AppConstants.spacingL),
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildGuestInfo(context),
                    const SizedBox(height: AppConstants.spacingL),
                    _buildBookingInfo(context),
                    const SizedBox(height: AppConstants.spacingL),
                    _buildFinancialInfo(context),
                    if (booking.notes != null) ...[
                      const SizedBox(height: AppConstants.spacingL),
                      _buildNotes(context),
                    ],
                  ],
                ),
              ),
            ),
            const SizedBox(height: AppConstants.spacingL),
            _buildActions(context),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(AppConstants.spacingS),
          decoration: BoxDecoration(
            color: AppColors.primary.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(AppConstants.radiusM),
          ),
          child: Icon(
            Icons.event_note,
            color: AppColors.primary,
            size: AppConstants.iconL,
          ),
        ),
        const SizedBox(width: AppConstants.spacingM),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                booking.guestName,
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                'Prenotazione ${booking.ota}',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(
                    context,
                  ).colorScheme.onSurface.withValues(alpha: 0.6),
                ),
              ),
            ],
          ),
        ),
        IconButton(
          onPressed: () => Navigator.of(context).pop(),
          icon: const Icon(Icons.close),
        ),
      ],
    );
  }

  Widget _buildGuestInfo(BuildContext context) {
    return _buildSection(
      context,
      title: 'Informazioni Ospite',
      icon: Icons.person,
      children: [
        _buildInfoRow(context, 'Nome', booking.guestName),
        _buildInfoRow(context, 'Canale', booking.ota),
        _buildInfoRow(context, 'Adulti', booking.adults.toString()),
        if (booking.children > 0)
          _buildInfoRow(context, 'Bambini', booking.children.toString()),
        if (booking.pets > 0)
          _buildInfoRow(context, 'Animali', booking.pets.toString()),
      ],
    );
  }

  Widget _buildBookingInfo(BuildContext context) {
    return _buildSection(
      context,
      title: 'Dettagli Soggiorno',
      icon: Icons.calendar_today,
      children: [
        Consumer<ApartmentProvider>(
          builder: (context, apartmentProvider, child) {
            final apartment = apartmentProvider.apartments.firstWhere(
              (apt) => apt.id == booking.apartmentId,
              orElse: () => Apartment(
                id: '',
                name: 'Appartamento non trovato',
                maxGuests: 0,
                basePrice: 0,
                cleaningFee: 0,
                isActive: false,
                color: '#3DA9A9',
                icon: 'home',
                amenities: const [],
                createdAt: DateTime.now(),
                updatedAt: DateTime.now(),
              ),
            );

            return _buildInfoRow(
              context,
              'Appartamento',
              apartment.name,
              color: AppColors.fromHex(apartment.color),
            );
          },
        ),
        _buildInfoRow(
          context,
          'Check-in',
          DateFormat('dd/MM/yyyy').format(booking.checkIn),
        ),
        _buildInfoRow(
          context,
          'Check-out',
          DateFormat('dd/MM/yyyy').format(booking.checkOut),
        ),
        _buildInfoRow(context, 'Notti', booking.nights.toString()),
      ],
    );
  }

  Widget _buildFinancialInfo(BuildContext context) {
    return _buildSection(
      context,
      title: 'Dettagli Finanziari',
      icon: Icons.euro,
      children: [
        _buildInfoRow(
          context,
          'Totale Cliente',
          '${AppConstants.currencySymbol}${booking.totalClient.toStringAsFixed(2)}',
        ),
        if (booking.cleaningCost > 0)
          _buildInfoRow(
            context,
            'Costo Pulizie',
            '${AppConstants.currencySymbol}${booking.cleaningCost.toStringAsFixed(2)}',
          ),
        if (booking.discounts > 0)
          _buildInfoRow(
            context,
            'Sconti',
            '-${AppConstants.currencySymbol}${booking.discounts.toStringAsFixed(2)}',
            color: AppColors.success,
          ),
        if (booking.supplements > 0)
          _buildInfoRow(
            context,
            'Supplementi',
            '+${AppConstants.currencySymbol}${booking.supplements.toStringAsFixed(2)}',
          ),
        if (booking.otaCommission > 0)
          _buildInfoRow(
            context,
            'Commissione OTA',
            '-${AppConstants.currencySymbol}${booking.otaCommission.toStringAsFixed(2)}',
            color: AppColors.error,
          ),
        if (booking.touristTax > 0)
          _buildInfoRow(
            context,
            'Tassa Soggiorno',
            '-${AppConstants.currencySymbol}${booking.touristTax.toStringAsFixed(2)}',
          ),
        if (booking.flatTax > 0)
          _buildInfoRow(
            context,
            'Tassa Fissa',
            '-${AppConstants.currencySymbol}${booking.flatTax.toStringAsFixed(2)}',
          ),
        const Divider(),
        _buildInfoRow(
          context,
          'Totale Netto',
          '${AppConstants.currencySymbol}${booking.netTotal.toStringAsFixed(2)}',
          isHighlighted: true,
        ),
      ],
    );
  }

  Widget _buildNotes(BuildContext context) {
    return _buildSection(
      context,
      title: 'Note',
      icon: Icons.note,
      children: [
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(AppConstants.spacingM),
          decoration: BoxDecoration(
            color: Theme.of(context).colorScheme.surface,
            borderRadius: BorderRadius.circular(AppConstants.radiusM),
            border: Border.all(
              color: Theme.of(
                context,
              ).colorScheme.outline.withValues(alpha: 0.3),
            ),
          ),
          child: Text(
            booking.notes!,
            style: Theme.of(context).textTheme.bodyMedium,
          ),
        ),
      ],
    );
  }

  Widget _buildSection(
    BuildContext context, {
    required String title,
    required IconData icon,
    required List<Widget> children,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(icon, size: AppConstants.iconM, color: AppColors.primary),
            const SizedBox(width: AppConstants.spacingS),
            Text(
              title,
              style: Theme.of(
                context,
              ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600),
            ),
          ],
        ),
        const SizedBox(height: AppConstants.spacingM),
        ...children,
      ],
    );
  }

  Widget _buildInfoRow(
    BuildContext context,
    String label,
    String value, {
    Color? color,
    bool isHighlighted = false,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: AppConstants.spacingS),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 120,
            child: Text(
              '$label:',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w500,
                color: Theme.of(
                  context,
                ).colorScheme.onSurface.withValues(alpha: 0.7),
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                fontWeight: isHighlighted ? FontWeight.bold : FontWeight.normal,
                color: color ?? (isHighlighted ? AppColors.primary : null),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActions(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: OutlinedButton(
            onPressed: () => _editBooking(context),
            child: const Text('Modifica'),
          ),
        ),
        const SizedBox(width: AppConstants.spacingM),
        Expanded(
          child: ElevatedButton(
            onPressed: () => _deleteBooking(context),
            style: ElevatedButton.styleFrom(
              backgroundColor: Theme.of(context).colorScheme.error,
              foregroundColor: Theme.of(context).colorScheme.onError,
            ),
            child: const Text('Elimina'),
          ),
        ),
      ],
    );
  }

  void _editBooking(BuildContext context) {
    Navigator.of(context).pop(); // Close details modal
    showDialog(
      context: context,
      builder: (context) => BookingFormModal(
        booking: booking,
        onSave: (updatedBooking) async {
          try {
            await context.read<BookingProvider>().saveBooking(updatedBooking);
            if (context.mounted) {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text(AppConstants.bookingUpdatedMessage),
                  backgroundColor: AppColors.success,
                ),
              );
            }
          } catch (e) {
            if (context.mounted) {
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

  void _deleteBooking(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Elimina Prenotazione'),
        content: Text(
          'Sei sicuro di voler eliminare la prenotazione di ${booking.guestName}?\n\nQuesta azione non può essere annullata.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Annulla'),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.of(context).pop(); // Close confirmation dialog
              Navigator.of(context).pop(); // Close details modal

              try {
                await context.read<BookingProvider>().removeBooking(booking.id);
                if (context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text(AppConstants.bookingDeletedMessage),
                      backgroundColor: AppColors.success,
                    ),
                  );
                }
              } catch (e) {
                if (context.mounted) {
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
