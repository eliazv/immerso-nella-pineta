import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';

import '../models/booking.dart';
import '../models/apartment.dart';
import '../providers/apartment_provider.dart';
import '../utils/constants.dart';

class BookingFormModal extends StatefulWidget {
  final Booking? booking; // null per creazione, non-null per modifica
  final Function(Booking) onSave;
  final DateTime? initialCheckIn;
  final DateTime? initialCheckOut;

  const BookingFormModal({
    super.key,
    this.booking,
    required this.onSave,
    this.initialCheckIn,
    this.initialCheckOut,
  });

  @override
  State<BookingFormModal> createState() => _BookingFormModalState();
}

class _BookingFormModalState extends State<BookingFormModal> {
  final _formKey = GlobalKey<FormState>();
  final _guestNameController = TextEditingController();
  final _notesController = TextEditingController();
  final _adultsController = TextEditingController();
  final _childrenController = TextEditingController();
  final _petsController = TextEditingController();
  final _totalClientController = TextEditingController();
  final _cleaningCostController = TextEditingController();
  final _discountsController = TextEditingController();
  final _supplementsController = TextEditingController();
  final _otaCommissionController = TextEditingController();
  final _touristTaxController = TextEditingController();
  final _flatTaxController = TextEditingController();

  DateTime? _checkInDate;
  DateTime? _checkOutDate;
  String _selectedOta = 'Airbnb';
  String? _selectedApartmentId;
  double _netTotal = 0.0;

  @override
  void initState() {
    super.initState();
    _initializeForm();
  }

  void _initializeForm() {
    if (widget.booking != null) {
      _loadBookingData();
    } else {
      _checkInDate = widget.initialCheckIn;
      _checkOutDate = widget.initialCheckOut;
      _adultsController.text = '2';
      _childrenController.text = '0';
      _petsController.text = '0';
      _cleaningCostController.text = '0';
      _discountsController.text = '0';
      _supplementsController.text = '0';
      _otaCommissionController.text = '0';
      _touristTaxController.text = '0';
      _flatTaxController.text = '0';
    }
  }

  void _loadBookingData() {
    final booking = widget.booking!;
    _guestNameController.text = booking.guestName;
    _notesController.text = booking.notes ?? '';
    _adultsController.text = booking.adults.toString();
    _childrenController.text = booking.children.toString();
    _petsController.text = booking.pets.toString();
    _totalClientController.text = booking.totalClient.toString();
    _cleaningCostController.text = booking.cleaningCost.toString();
    _discountsController.text = booking.discounts.toString();
    _supplementsController.text = booking.supplements.toString();
    _otaCommissionController.text = booking.otaCommission.toString();
    _touristTaxController.text = booking.touristTax.toString();
    _flatTaxController.text = booking.flatTax.toString();
    _checkInDate = booking.checkIn;
    _checkOutDate = booking.checkOut;
    _selectedOta = booking.ota;
    _selectedApartmentId = booking.apartmentId;
    _netTotal = booking.netTotal;
  }

  @override
  void dispose() {
    _guestNameController.dispose();
    _notesController.dispose();
    _adultsController.dispose();
    _childrenController.dispose();
    _petsController.dispose();
    _totalClientController.dispose();
    _cleaningCostController.dispose();
    _discountsController.dispose();
    _supplementsController.dispose();
    _otaCommissionController.dispose();
    _touristTaxController.dispose();
    _flatTaxController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Container(
        width: MediaQuery.of(context).size.width * 0.95,
        height: MediaQuery.of(context).size.height * 0.95,
        padding: const EdgeInsets.all(AppConstants.spacingL),
        child: Column(
          children: [
            _buildHeader(),
            const SizedBox(height: AppConstants.spacingL),
            Expanded(
              child: Form(
                key: _formKey,
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildGuestInfo(),
                      const SizedBox(height: AppConstants.spacingL),
                      _buildDatesAndApartment(),
                      const SizedBox(height: AppConstants.spacingL),
                      _buildGuestDetails(),
                      const SizedBox(height: AppConstants.spacingL),
                      _buildFinancialDetails(),
                      const SizedBox(height: AppConstants.spacingL),
                      _buildNotes(),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(height: AppConstants.spacingL),
            _buildActions(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Row(
      children: [
        Icon(
          Icons.event_note,
          color: AppColors.primary,
          size: AppConstants.iconL,
        ),
        const SizedBox(width: AppConstants.spacingM),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                widget.booking == null
                    ? 'Nuova Prenotazione'
                    : 'Modifica Prenotazione',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                widget.booking == null
                    ? 'Aggiungi una nuova prenotazione'
                    : 'Modifica i dettagli della prenotazione',
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

  Widget _buildGuestInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Informazioni Ospite',
          style: Theme.of(
            context,
          ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600),
        ),
        const SizedBox(height: AppConstants.spacingM),
        TextFormField(
          controller: _guestNameController,
          decoration: const InputDecoration(
            labelText: 'Nome Ospite *',
            hintText: 'es. Mario Rossi',
            prefixIcon: Icon(Icons.person),
          ),
          validator: (value) {
            if (value == null || value.trim().isEmpty) {
              return 'Il nome ospite è obbligatorio';
            }
            return null;
          },
        ),
        const SizedBox(height: AppConstants.spacingM),
        DropdownButtonFormField<String>(
          value: _selectedOta,
          decoration: const InputDecoration(
            labelText: 'Canale/OTA *',
            prefixIcon: Icon(Icons.business),
          ),
          items: AppConstants.otaOptions.map((ota) {
            return DropdownMenuItem(value: ota, child: Text(ota));
          }).toList(),
          onChanged: (value) {
            setState(() {
              _selectedOta = value!;
            });
          },
        ),
      ],
    );
  }

  Widget _buildDatesAndApartment() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Date e Appartamento',
          style: Theme.of(
            context,
          ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600),
        ),
        const SizedBox(height: AppConstants.spacingM),
        Row(
          children: [
            Expanded(
              child: InkWell(
                onTap: () => _selectCheckInDate(),
                child: InputDecorator(
                  decoration: const InputDecoration(
                    labelText: 'Check-in *',
                    prefixIcon: Icon(Icons.login),
                  ),
                  child: Text(
                    _checkInDate != null
                        ? DateFormat('dd/MM/yyyy').format(_checkInDate!)
                        : 'Seleziona data',
                  ),
                ),
              ),
            ),
            const SizedBox(width: AppConstants.spacingM),
            Expanded(
              child: InkWell(
                onTap: () => _selectCheckOutDate(),
                child: InputDecorator(
                  decoration: const InputDecoration(
                    labelText: 'Check-out *',
                    prefixIcon: Icon(Icons.logout),
                  ),
                  child: Text(
                    _checkOutDate != null
                        ? DateFormat('dd/MM/yyyy').format(_checkOutDate!)
                        : 'Seleziona data',
                  ),
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: AppConstants.spacingM),
        Consumer<ApartmentProvider>(
          builder: (context, apartmentProvider, child) {
            final apartments = apartmentProvider.activeApartments;

            if (apartments.isEmpty) {
              return Container(
                padding: const EdgeInsets.all(AppConstants.spacingM),
                decoration: BoxDecoration(
                  color: AppColors.warning.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(AppConstants.radiusM),
                ),
                child: Row(
                  children: [
                    Icon(Icons.warning, color: AppColors.warning),
                    const SizedBox(width: AppConstants.spacingM),
                    Expanded(
                      child: Text(
                        'Nessun appartamento disponibile. Crea prima un appartamento.',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                    ),
                  ],
                ),
              );
            }

            return DropdownButtonFormField<String>(
              value: _selectedApartmentId,
              decoration: const InputDecoration(
                labelText: 'Appartamento *',
                prefixIcon: Icon(Icons.home),
              ),
              items: apartments.map((apartment) {
                return DropdownMenuItem(
                  value: apartment.id,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        width: 20,
                        height: 20,
                        decoration: BoxDecoration(
                          color: AppColors.fromHex(apartment.color),
                          shape: BoxShape.circle,
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
              }).toList(),
              onChanged: (value) {
                setState(() {
                  _selectedApartmentId = value;
                });
              },
              validator: (value) {
                if (value == null) {
                  return 'Seleziona un appartamento';
                }
                return null;
              },
            );
          },
        ),
      ],
    );
  }

  Widget _buildGuestDetails() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Dettagli Ospiti',
          style: Theme.of(
            context,
          ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600),
        ),
        const SizedBox(height: AppConstants.spacingM),
        Row(
          children: [
            Expanded(
              child: TextFormField(
                controller: _adultsController,
                decoration: const InputDecoration(
                  labelText: 'Adulti *',
                  prefixIcon: Icon(Icons.person),
                ),
                keyboardType: TextInputType.number,
                inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Obbligatorio';
                  }
                  final adults = int.tryParse(value);
                  if (adults == null || adults < 1) {
                    return 'Min 1';
                  }
                  return null;
                },
              ),
            ),
            const SizedBox(width: AppConstants.spacingM),
            Expanded(
              child: TextFormField(
                controller: _childrenController,
                decoration: const InputDecoration(
                  labelText: 'Bambini',
                  prefixIcon: Icon(Icons.child_care),
                ),
                keyboardType: TextInputType.number,
                inputFormatters: [FilteringTextInputFormatter.digitsOnly],
              ),
            ),
            const SizedBox(width: AppConstants.spacingM),
            Expanded(
              child: TextFormField(
                controller: _petsController,
                decoration: const InputDecoration(
                  labelText: 'Animali',
                  prefixIcon: Icon(Icons.pets),
                ),
                keyboardType: TextInputType.number,
                inputFormatters: [FilteringTextInputFormatter.digitsOnly],
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildFinancialDetails() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Dettagli Finanziari',
          style: Theme.of(
            context,
          ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600),
        ),
        const SizedBox(height: AppConstants.spacingM),
        TextFormField(
          controller: _totalClientController,
          decoration: const InputDecoration(
            labelText: 'Totale Cliente *',
            prefixIcon: Icon(Icons.euro),
            suffixText: '€',
          ),
          keyboardType: const TextInputType.numberWithOptions(decimal: true),
          onChanged: (_) => _calculateNetTotal(),
          validator: (value) {
            if (value == null || value.isEmpty) {
              return 'Obbligatorio';
            }
            final total = double.tryParse(value);
            if (total == null || total < 0) {
              return 'Importo non valido';
            }
            return null;
          },
        ),
        const SizedBox(height: AppConstants.spacingM),
        Container(
          padding: const EdgeInsets.all(AppConstants.spacingM),
          decoration: BoxDecoration(
            color: AppColors.primary.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(AppConstants.radiusM),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Totale Netto:',
                style: Theme.of(
                  context,
                ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
              ),
              Text(
                '${AppConstants.currencySymbol}${_netTotal.toStringAsFixed(2)}',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppColors.primary,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildNotes() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Note',
          style: Theme.of(
            context,
          ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600),
        ),
        const SizedBox(height: AppConstants.spacingM),
        TextFormField(
          controller: _notesController,
          decoration: const InputDecoration(
            labelText: 'Note aggiuntive',
            hintText: 'Aggiungi note sulla prenotazione...',
            prefixIcon: Icon(Icons.note),
          ),
          maxLines: 3,
          maxLength: AppConstants.maxNotesLength,
        ),
      ],
    );
  }

  Widget _buildActions() {
    return Row(
      children: [
        Expanded(
          child: OutlinedButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Annulla'),
          ),
        ),
        const SizedBox(width: AppConstants.spacingM),
        Expanded(
          child: ElevatedButton(
            onPressed: _saveBooking,
            child: Text(widget.booking == null ? 'Crea' : 'Salva'),
          ),
        ),
      ],
    );
  }

  void _calculateNetTotal() {
    final totalClient = double.tryParse(_totalClientController.text) ?? 0.0;
    final cleaningCost = double.tryParse(_cleaningCostController.text) ?? 0.0;
    final discounts = double.tryParse(_discountsController.text) ?? 0.0;
    final supplements = double.tryParse(_supplementsController.text) ?? 0.0;
    final otaCommission = double.tryParse(_otaCommissionController.text) ?? 0.0;
    final touristTax = double.tryParse(_touristTaxController.text) ?? 0.0;
    final flatTax = double.tryParse(_flatTaxController.text) ?? 0.0;

    setState(() {
      _netTotal =
          totalClient +
          supplements -
          discounts -
          otaCommission -
          touristTax -
          flatTax;
    });
  }

  Future<void> _selectCheckInDate() async {
    final date = await showDatePicker(
      context: context,
      initialDate: _checkInDate ?? DateTime.now(),
      firstDate: DateTime.now().subtract(const Duration(days: 365)),
      lastDate: DateTime.now().add(const Duration(days: 365 * 2)),
    );

    if (date != null) {
      setState(() {
        _checkInDate = date;
        // Auto-set checkout to next day if not set
        if (_checkOutDate == null || _checkOutDate!.isBefore(date)) {
          _checkOutDate = date.add(const Duration(days: 1));
        }
      });
    }
  }

  Future<void> _selectCheckOutDate() async {
    final date = await showDatePicker(
      context: context,
      initialDate:
          _checkOutDate ??
          (_checkInDate?.add(const Duration(days: 1)) ??
              DateTime.now().add(const Duration(days: 1))),
      firstDate: _checkInDate ?? DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 365 * 2)),
    );

    if (date != null) {
      setState(() {
        _checkOutDate = date;
      });
    }
  }

  void _saveBooking() {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    if (_checkInDate == null || _checkOutDate == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Seleziona le date di check-in e check-out'),
          backgroundColor: AppColors.error,
        ),
      );
      return;
    }

    if (_checkOutDate!.isBefore(_checkInDate!) ||
        _checkOutDate!.isAtSameMomentAs(_checkInDate!)) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('La data di check-out deve essere dopo il check-in'),
          backgroundColor: AppColors.error,
        ),
      );
      return;
    }

    final nights = _checkOutDate!.difference(_checkInDate!).inDays;

    final booking = Booking(
      id:
          widget.booking?.id ??
          DateTime.now().millisecondsSinceEpoch.toString(),
      guestName: _guestNameController.text.trim(),
      ota: _selectedOta,
      checkIn: _checkInDate!,
      checkOut: _checkOutDate!,
      nights: nights,
      adults: int.parse(_adultsController.text),
      children: int.tryParse(_childrenController.text) ?? 0,
      pets: int.tryParse(_petsController.text) ?? 0,
      totalClient: double.parse(_totalClientController.text),
      cleaningCost: double.tryParse(_cleaningCostController.text) ?? 0.0,
      discounts: double.tryParse(_discountsController.text) ?? 0.0,
      supplements: double.tryParse(_supplementsController.text) ?? 0.0,
      otaCommission: double.tryParse(_otaCommissionController.text) ?? 0.0,
      touristTax: double.tryParse(_touristTaxController.text) ?? 0.0,
      flatTax: double.tryParse(_flatTaxController.text) ?? 0.0,
      netTotal: _netTotal,
      notes: _notesController.text.trim().isEmpty
          ? null
          : _notesController.text.trim(),
      apartmentId: _selectedApartmentId!,
      createdAt: widget.booking?.createdAt ?? DateTime.now(),
      updatedAt: DateTime.now(),
    );

    widget.onSave(booking);
    Navigator.of(context).pop();
  }
}
