import 'package:flutter/material.dart';
import '../utils/constants.dart';

class SummaryCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  final Color color;
  final String? subtitle;
  final VoidCallback? onTap;

  const SummaryCard({
    super.key,
    required this.title,
    required this.value,
    required this.icon,
    required this.color,
    this.subtitle,
    this.onTap,
  });

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
                      color: color.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(AppConstants.radiusS),
                    ),
                    child: Icon(
                      icon,
                      color: color,
                      size: AppConstants.iconM,
                    ),
                  ),
                  const Spacer(),
                  if (onTap != null)
                    Icon(
                      Icons.arrow_forward_ios,
                      size: AppConstants.iconS,
                      color: Theme.of(context).colorScheme.onSurface.withOpacity(0.4),
                    ),
                ],
              ),
              const SizedBox(height: AppConstants.spacingM),
              Text(
                value,
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: color,
                ),
              ),
              const SizedBox(height: AppConstants.spacingXS),
              Text(
                title,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurface.withOpacity(0.7),
                ),
              ),
              if (subtitle != null) ...[
                const SizedBox(height: AppConstants.spacingXS),
                Text(
                  subtitle!,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Theme.of(context).colorScheme.onSurface.withOpacity(0.5),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
