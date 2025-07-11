import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../utils/constants.dart';
import '../providers/apartment_provider.dart';
import '../models/apartment.dart';
import '../widgets/apartment_card.dart';
import '../widgets/apartment_form_modal.dart';

class ApartmentsScreen extends StatefulWidget {
  const ApartmentsScreen({super.key});

  @override
  State<ApartmentsScreen> createState() => _ApartmentsScreenState();
}

class _ApartmentsScreenState extends State<ApartmentsScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.background,
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(),
            Expanded(child: _buildApartmentsList()),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showCreateApartment(),
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
            Icons.business,
            color: Theme.of(context).colorScheme.primary,
            size: AppConstants.iconL,
          ),
          const SizedBox(width: AppConstants.spacingM),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Appartamenti',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Consumer<ApartmentProvider>(
                  builder: (context, apartmentProvider, child) {
                    final totalApartments = apartmentProvider.apartments.length;
                    final activeApartments =
                        apartmentProvider.activeApartments.length;
                    return Text(
                      '$activeApartments di $totalApartments attivi',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
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
            onPressed: () => _showApartmentOptions(),
            icon: const Icon(Icons.more_vert),
          ),
        ],
      ),
    );
  }

  Widget _buildApartmentsList() {
    return Consumer<ApartmentProvider>(
      builder: (context, apartmentProvider, child) {
        if (apartmentProvider.isLoading) {
          return const Center(child: CircularProgressIndicator());
        }

        final apartments = apartmentProvider.apartments;

        if (apartments.isEmpty) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(AppConstants.spacingL),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.home_outlined,
                    size: 80,
                    color: Theme.of(
                      context,
                    ).colorScheme.onSurface.withOpacity(0.3),
                  ),
                  const SizedBox(height: AppConstants.spacingL),
                  Text(
                    'Nessun appartamento',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      color: Theme.of(
                        context,
                      ).colorScheme.onSurface.withOpacity(0.6),
                    ),
                  ),
                  const SizedBox(height: AppConstants.spacingM),
                  Text(
                    'Aggiungi il tuo primo appartamento per iniziare a gestire le prenotazioni',
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      color: Theme.of(
                        context,
                      ).colorScheme.onSurface.withOpacity(0.5),
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: AppConstants.spacingXL),
                  ElevatedButton.icon(
                    onPressed: () => _showCreateApartment(),
                    icon: const Icon(Icons.add),
                    label: const Text('Aggiungi Appartamento'),
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(
                        horizontal: AppConstants.spacingXL,
                        vertical: AppConstants.spacingL,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        }

        return RefreshIndicator(
          onRefresh: () => apartmentProvider.loadApartments(),
          child: ListView.builder(
            padding: const EdgeInsets.all(AppConstants.spacingL),
            itemCount: apartments.length,
            itemBuilder: (context, index) {
              final apartment = apartments[index];
              return Padding(
                padding: const EdgeInsets.only(bottom: AppConstants.spacingM),
                child: ApartmentCard(
                  apartment: apartment,
                  onTap: () => _showApartmentDetails(apartment),
                ),
              );
            },
          ),
        );
      },
    );
  }

  void _showApartmentOptions() {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: const EdgeInsets.all(AppConstants.spacingL),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Opzioni Appartamenti',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: AppConstants.spacingL),
            ListTile(
              leading: const Icon(Icons.refresh),
              title: const Text('Aggiorna Lista'),
              onTap: () {
                Navigator.pop(context);
                context.read<ApartmentProvider>().loadApartments();
              },
            ),
            ListTile(
              leading: const Icon(Icons.import_export),
              title: const Text('Importa/Esporta'),
              onTap: () {
                Navigator.pop(context);
                _showImportExportOptions();
              },
            ),
          ],
        ),
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

  void _showApartmentDetails(Apartment apartment) {
    showDialog(
      context: context,
      builder: (context) => ApartmentDetailsDialog(apartment: apartment),
    );
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

  void _showDeleteConfirmation(Apartment apartment) {
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
              Navigator.of(context).pop(); // Close confirmation dialog

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

  void _showImportExportOptions() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Funzionalità in arrivo: Import/Export')),
    );
  }
}

class CreateApartmentDialog extends StatefulWidget {
  const CreateApartmentDialog({super.key});

  @override
  State<CreateApartmentDialog> createState() => _CreateApartmentDialogState();
}

class _CreateApartmentDialogState extends State<CreateApartmentDialog> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _maxGuestsController = TextEditingController(text: '2');
  final _addressController = TextEditingController();
  final _basePriceController = TextEditingController(text: '50');
  final _cleaningFeeController = TextEditingController(text: '25');

  String _selectedColor = AppConstants.apartmentColors.first;
  String _selectedIcon = AppConstants.apartmentIcons.first;
  bool _isActive = true;

  @override
  void dispose() {
    _nameController.dispose();
    _descriptionController.dispose();
    _maxGuestsController.dispose();
    _addressController.dispose();
    _basePriceController.dispose();
    _cleaningFeeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Container(
        constraints: const BoxConstraints(maxWidth: 500, maxHeight: 600),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(AppConstants.spacingL),
              child: Row(
                children: [
                  Text(
                    'Nuovo Appartamento',
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const Spacer(),
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.close),
                  ),
                ],
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppConstants.spacingL,
                ),
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      TextFormField(
                        controller: _nameController,
                        decoration: const InputDecoration(
                          labelText: 'Nome Appartamento *',
                          hintText: 'es. Casa Vacanze Centro',
                        ),
                        validator: (value) {
                          if (value == null || value.trim().isEmpty) {
                            return 'Il nome è obbligatorio';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: AppConstants.spacingM),
                      TextFormField(
                        controller: _descriptionController,
                        decoration: const InputDecoration(
                          labelText: 'Descrizione',
                          hintText: 'Breve descrizione dell\'appartamento',
                        ),
                        maxLines: 2,
                      ),
                      const SizedBox(height: AppConstants.spacingM),
                      Row(
                        children: [
                          Expanded(
                            child: TextFormField(
                              controller: _maxGuestsController,
                              decoration: const InputDecoration(
                                labelText: 'Max Ospiti *',
                              ),
                              keyboardType: TextInputType.number,
                              validator: (value) {
                                if (value == null || value.trim().isEmpty) {
                                  return 'Obbligatorio';
                                }
                                final guests = int.tryParse(value);
                                if (guests == null || guests < 1) {
                                  return 'Numero non valido';
                                }
                                return null;
                              },
                            ),
                          ),
                          const SizedBox(width: AppConstants.spacingM),
                          Expanded(
                            child: TextFormField(
                              controller: _basePriceController,
                              decoration: const InputDecoration(
                                labelText: 'Prezzo Base (€)',
                              ),
                              keyboardType: TextInputType.number,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: AppConstants.spacingM),
                      TextFormField(
                        controller: _addressController,
                        decoration: const InputDecoration(
                          labelText: 'Indirizzo',
                          hintText: 'Via, Città',
                        ),
                      ),
                      const SizedBox(height: AppConstants.spacingM),
                      TextFormField(
                        controller: _cleaningFeeController,
                        decoration: const InputDecoration(
                          labelText: 'Costo Pulizie (€)',
                        ),
                        keyboardType: TextInputType.number,
                      ),
                      const SizedBox(height: AppConstants.spacingL),
                      // Color and Icon selection would go here
                      // For brevity, using simple dropdowns
                    ],
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(AppConstants.spacingL),
              child: Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Annulla'),
                    ),
                  ),
                  const SizedBox(width: AppConstants.spacingM),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: _createApartment,
                      child: const Text('Crea'),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _createApartment() async {
    if (!_formKey.currentState!.validate()) return;

    final apartmentProvider = context.read<ApartmentProvider>();

    final success = await apartmentProvider.createApartment(
      name: _nameController.text.trim(),
      description: _descriptionController.text.trim().isEmpty
          ? null
          : _descriptionController.text.trim(),
      maxGuests: int.parse(_maxGuestsController.text),
      address: _addressController.text.trim().isEmpty
          ? null
          : _addressController.text.trim(),
      basePrice: double.tryParse(_basePriceController.text) ?? 0.0,
      cleaningFee: double.tryParse(_cleaningFeeController.text) ?? 0.0,
      isActive: _isActive,
      color: _selectedColor,
      icon: _selectedIcon,
    );

    if (success && mounted) {
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text(AppConstants.apartmentCreatedMessage)),
      );
    }
  }
}

class ApartmentDetailsDialog extends StatelessWidget {
  final Apartment apartment;

  const ApartmentDetailsDialog({super.key, required this.apartment});

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Container(
        constraints: const BoxConstraints(maxWidth: 400, maxHeight: 500),
        padding: const EdgeInsets.all(AppConstants.spacingL),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(AppConstants.spacingS),
                  decoration: BoxDecoration(
                    color: AppColors.fromHex(apartment.color).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(AppConstants.radiusS),
                  ),
                  child: Icon(
                    Icons.home, // Simplified icon
                    color: AppColors.fromHex(apartment.color),
                    size: AppConstants.iconM,
                  ),
                ),
                const SizedBox(width: AppConstants.spacingM),
                Expanded(
                  child: Text(
                    apartment.name,
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close),
                ),
              ],
            ),
            const SizedBox(height: AppConstants.spacingL),
            if (apartment.description != null) ...[
              Text(
                apartment.description!,
                style: Theme.of(context).textTheme.bodyLarge,
              ),
              const SizedBox(height: AppConstants.spacingM),
            ],
            _buildDetailRow(context, 'Max Ospiti', '${apartment.maxGuests}'),
            _buildDetailRow(
              context,
              'Prezzo Base',
              '${AppConstants.currencySymbol}${apartment.basePrice.toStringAsFixed(0)}/notte',
            ),
            _buildDetailRow(
              context,
              'Costo Pulizie',
              '${AppConstants.currencySymbol}${apartment.cleaningFee.toStringAsFixed(0)}',
            ),
            if (apartment.address != null)
              _buildDetailRow(context, 'Indirizzo', apartment.address!),
            _buildDetailRow(
              context,
              'Stato',
              apartment.isActive ? 'Attivo' : 'Inattivo',
            ),
            const Spacer(),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () {
                      Navigator.pop(context);
                      // TODO: Implement edit functionality
                    },
                    child: const Text('Modifica'),
                  ),
                ),
                const SizedBox(width: AppConstants.spacingM),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.pop(context);
                      // TODO: Implement delete functionality
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Theme.of(context).colorScheme.error,
                    ),
                    child: const Text('Elimina'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailRow(BuildContext context, String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: AppConstants.spacingS),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 100,
            child: Text(
              '$label:',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w500,
                color: Theme.of(context).colorScheme.onSurface.withOpacity(0.7),
              ),
            ),
          ),
          Expanded(
            child: Text(value, style: Theme.of(context).textTheme.bodyMedium),
          ),
        ],
      ),
    );
  }
}
