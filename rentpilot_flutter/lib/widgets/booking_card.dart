import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/booking.dart';
import '../utils/constants.dart';

class BookingCard extends StatelessWidget {
  final Booking booking;
  final VoidCallback? onTap;
  final bool showApartment;

  const BookingCard({
    super.key,
    required this.booking,
    this.onTap,
    this.showApartment = true,
  });

  @override
  Widget build(BuildContext context) {
    final isCheckIn = booking.isCheckInToday;
    final isCheckOut = booking.isCheckOutToday;
    
    return Card(
      elevation: 1,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(AppConstants.radiusL),
        child: Padding(
          padding: const EdgeInsets.all(AppConstants.spacingM),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      booking.guestName,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: AppConstants.spacingS,
                      vertical: AppConstants.spacingXS,
                    ),
                    decoration: BoxDecoration(
                      color: _getOtaColor(booking.ota).withOpacity(0.1),
                      borderRadius: BorderRadius.circular(AppConstants.radiusS),
                    ),
                    child: Text(
                      booking.ota,
                      style: Theme.of(context).textTheme.labelSmall?.copyWith(
                        color: _getOtaColor(booking.ota),
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppConstants.spacingS),
              Row(
                children: [
                  Icon(
                    isCheckIn ? Icons.login : Icons.logout,
                    size: AppConstants.iconS,
                    color: isCheckIn ? AppColors.success : AppColors.warning,
                  ),
                  const SizedBox(width: AppConstants.spacingXS),
                  Text(
                    isCheckIn 
                        ? 'Check-in: ${DateFormat(AppConstants.dateFormat).format(booking.checkIn)}'
                        : 'Check-out: ${DateFormat(AppConstants.dateFormat).format(booking.checkOut)}',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: Theme.of(context).colorScheme.onSurface.withOpacity(0.7),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppConstants.spacingS),
              Row(
                children: [
                  Icon(
                    Icons.nights_stay,
                    size: AppConstants.iconS,
                    color: Theme.of(context).colorScheme.onSurface.withOpacity(0.5),
                  ),
                  const SizedBox(width: AppConstants.spacingXS),
                  Text(
                    '${booking.nights} notti',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: Theme.of(context).colorScheme.onSurface.withOpacity(0.7),
                    ),
                  ),
                  const Spacer(),
                  Text(
                    '${AppConstants.currencySymbol}${booking.netTotal.toStringAsFixed(0)}',
                    style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.w600,
                      color: Theme.of(context).colorScheme.primary,
                    ),
                  ),
                ],
              ),
              if (showApartment) ...[
                const SizedBox(height: AppConstants.spacingS),
                Row(
                  children: [
                    Icon(
                      Icons.home,
                      size: AppConstants.iconS,
                      color: Theme.of(context).colorScheme.onSurface.withOpacity(0.5),
                    ),
                    const SizedBox(width: AppConstants.spacingXS),
                    Text(
                      'Appartamento: ${booking.apartmentId}', // TODO: Get apartment name
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: Theme.of(context).colorScheme.onSurface.withOpacity(0.7),
                      ),
                    ),
                  ],
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Color _getOtaColor(String ota) {
    switch (ota.toLowerCase()) {
      case 'airbnb':
        return const Color(0xFFFF5A5F);
      case 'booking.com':
      case 'booking':
        return const Color(0xFF003580);
      case 'direct':
        return AppColors.success;
      default:
        return AppColors.neutral500;
    }
  }
}
