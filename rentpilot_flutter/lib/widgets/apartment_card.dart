import 'package:flutter/material.dart';
import '../models/apartment.dart';
import '../utils/constants.dart';

class ApartmentCard extends StatelessWidget {
  final Apartment apartment;
  final VoidCallback? onTap;

  const ApartmentCard({super.key, required this.apartment, this.onTap});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(AppConstants.radiusL),
        child: Padding(
          padding: const EdgeInsets.all(AppConstants.spacingL),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(AppConstants.spacingS),
                    decoration: BoxDecoration(
                      color: AppColors.fromHex(
                        apartment.color,
                      ).withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(AppConstants.radiusS),
                    ),
                    child: Icon(
                      _getIconData(apartment.icon),
                      color: AppColors.fromHex(apartment.color),
                      size: AppConstants.iconM,
                    ),
                  ),
                  const SizedBox(width: AppConstants.spacingM),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          apartment.name,
                          style: Theme.of(context).textTheme.titleLarge
                              ?.copyWith(fontWeight: FontWeight.w600),
                        ),
                        if (apartment.description != null) ...[
                          const SizedBox(height: AppConstants.spacingXS),
                          Text(
                            apartment.description!,
                            style: Theme.of(context).textTheme.bodySmall
                                ?.copyWith(
                                  color: Theme.of(context).colorScheme.onSurface
                                      .withValues(alpha: 0.6),
                                ),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: AppConstants.spacingS,
                      vertical: AppConstants.spacingXS,
                    ),
                    decoration: BoxDecoration(
                      color: apartment.isActive
                          ? AppColors.success.withValues(alpha: 0.1)
                          : AppColors.neutral300.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(AppConstants.radiusS),
                    ),
                    child: Text(
                      apartment.isActive ? 'Attivo' : 'Inattivo',
                      style: Theme.of(context).textTheme.labelSmall?.copyWith(
                        color: apartment.isActive
                            ? AppColors.success
                            : AppColors.neutral500,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppConstants.spacingL),
              Row(
                children: [
                  _buildInfoItem(
                    context,
                    Icons.people,
                    '${apartment.maxGuests} ospiti',
                  ),
                  const SizedBox(width: AppConstants.spacingL),
                  _buildInfoItem(
                    context,
                    Icons.euro,
                    '${apartment.basePrice.toStringAsFixed(0)}/notte',
                  ),
                ],
              ),
              const SizedBox(height: AppConstants.spacingM),
              // Simplified stats display without FutureBuilder to avoid setState during build
              Row(
                children: [
                  _buildInfoItem(context, Icons.trending_up, 'Statistiche'),
                  const SizedBox(width: AppConstants.spacingL),
                  _buildInfoItem(context, Icons.calendar_today, 'Prenotazioni'),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInfoItem(BuildContext context, IconData icon, String text) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(
          icon,
          size: AppConstants.iconS,
          color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.5),
        ),
        const SizedBox(width: AppConstants.spacingXS),
        Text(
          text,
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
            color: Theme.of(
              context,
            ).colorScheme.onSurface.withValues(alpha: 0.7),
          ),
        ),
      ],
    );
  }

  IconData _getIconData(String iconName) {
    switch (iconName.toLowerCase()) {
      case 'home':
        return Icons.home;
      case 'house':
        return Icons.house;
      case 'apartment':
        return Icons.apartment;
      case 'villa':
        return Icons.villa;
      case 'cottage':
        return Icons.cottage;
      case 'cabin':
        return Icons.cabin;
      case 'hotel':
        return Icons.hotel;
      case 'business':
        return Icons.business;
      default:
        return Icons.home;
    }
  }
}
