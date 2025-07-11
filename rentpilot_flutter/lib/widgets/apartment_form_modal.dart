import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:lucide_icons/lucide_icons.dart';

import '../models/apartment.dart';
import '../utils/constants.dart';

class ApartmentFormModal extends StatefulWidget {
  final Apartment? apartment; // null per creazione, non-null per modifica
  final Function(Apartment) onSave;

  const ApartmentFormModal({
    super.key,
    this.apartment,
    required this.onSave,
  });

  @override
  State<ApartmentFormModal> createState() => _ApartmentFormModalState();
}

class _ApartmentFormModalState extends State<ApartmentFormModal> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _maxGuestsController = TextEditingController();
  final _addressController = TextEditingController();
  final _basePriceController = TextEditingController();
  final _cleaningFeeController = TextEditingController();

  String _selectedColor = AppColors.primary.value.toRadixString(16);
  String _selectedIcon = 'home';
  bool _isActive = true;
  List<String> _amenities = [];

  final List<String> _availableAmenities = [
    'WiFi',
    'Aria Condizionata',
    'Riscaldamento',
    'Cucina',
    'Lavatrice',
    'Asciugatrice',
    'Parcheggio',
    'Balcone',
    'Terrazza',
    'Giardino',
    'Piscina',
    'Palestra',
    'TV',
    'Netflix',
    'Animali Ammessi',
  ];

  final List<Map<String, dynamic>> _availableColors = [
    {'name': 'Teal', 'color': AppColors.primary},
    {'name': 'Blu', 'color': Colors.blue},
    {'name': 'Verde', 'color': Colors.green},
    {'name': 'Arancione', 'color': Colors.orange},
    {'name': 'Rosso', 'color': Colors.red},
    {'name': 'Viola', 'color': Colors.purple},
    {'name': 'Rosa', 'color': Colors.pink},
    {'name': 'Indigo', 'color': Colors.indigo},
  ];

  final List<Map<String, dynamic>> _availableIcons = [
    {'name': 'Casa', 'icon': 'home'},
    {'name': 'Appartamento', 'icon': 'building'},
    {'name': 'Villa', 'icon': 'house'},
    {'name': 'Loft', 'icon': 'warehouse'},
    {'name': 'Studio', 'icon': 'square'},
    {'name': 'Attico', 'icon': 'crown'},
  ];

  @override
  void initState() {
    super.initState();
    if (widget.apartment != null) {
      _loadApartmentData();
    }
  }

  void _loadApartmentData() {
    final apartment = widget.apartment!;
    _nameController.text = apartment.name;
    _descriptionController.text = apartment.description ?? '';
    _maxGuestsController.text = apartment.maxGuests.toString();
    _addressController.text = apartment.address ?? '';
    _basePriceController.text = apartment.basePrice.toString();
    _cleaningFeeController.text = apartment.cleaningFee.toString();
    _selectedColor = apartment.color;
    _selectedIcon = apartment.icon;
    _isActive = apartment.isActive;
    _amenities = List.from(apartment.amenities);
  }

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
        width: MediaQuery.of(context).size.width * 0.9,
        height: MediaQuery.of(context).size.height * 0.9,
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
                      _buildBasicInfo(),
                      const SizedBox(height: AppConstants.spacingL),
                      _buildAppearance(),
                      const SizedBox(height: AppConstants.spacingL),
                      _buildPricing(),
                      const SizedBox(height: AppConstants.spacingL),
                      _buildAmenities(),
                      const SizedBox(height: AppConstants.spacingL),
                      _buildSettings(),
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
          _getIconData(_selectedIcon),
          color: AppColors.fromHex(_selectedColor),
          size: AppConstants.iconL,
        ),
        const SizedBox(width: AppConstants.spacingM),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                widget.apartment == null ? 'Nuovo Appartamento' : 'Modifica Appartamento',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                widget.apartment == null ? 'Aggiungi un nuovo appartamento' : 'Modifica i dettagli dell\'appartamento',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.6),
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

  Widget _buildBasicInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Informazioni Base',
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: AppConstants.spacingM),
        TextFormField(
          controller: _nameController,
          decoration: const InputDecoration(
            labelText: 'Nome Appartamento *',
            hintText: 'es. Casa Vacanze Centro',
            prefixIcon: Icon(Icons.home),
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
            hintText: 'Descrivi l\'appartamento...',
            prefixIcon: Icon(Icons.description),
          ),
          maxLines: 3,
        ),
        const SizedBox(height: AppConstants.spacingM),
        Row(
          children: [
            Expanded(
              child: TextFormField(
                controller: _maxGuestsController,
                decoration: const InputDecoration(
                  labelText: 'Max Ospiti *',
                  prefixIcon: Icon(Icons.people),
                ),
                keyboardType: TextInputType.number,
                inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Obbligatorio';
                  }
                  final guests = int.tryParse(value);
                  if (guests == null || guests < 1 || guests > 20) {
                    return 'Da 1 a 20';
                  }
                  return null;
                },
              ),
            ),
            const SizedBox(width: AppConstants.spacingM),
            Expanded(
              child: TextFormField(
                controller: _addressController,
                decoration: const InputDecoration(
                  labelText: 'Indirizzo',
                  prefixIcon: Icon(Icons.location_on),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildAppearance() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Aspetto',
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: AppConstants.spacingM),
        Text(
          'Colore',
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: AppConstants.spacingS),
        Wrap(
          spacing: AppConstants.spacingS,
          children: _availableColors.map((colorData) {
            final color = colorData['color'] as Color;
            final colorHex = color.value.toRadixString(16);
            final isSelected = _selectedColor == colorHex;
            
            return GestureDetector(
              onTap: () => setState(() => _selectedColor = colorHex),
              child: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: color,
                  shape: BoxShape.circle,
                  border: isSelected ? Border.all(color: Colors.black, width: 3) : null,
                ),
                child: isSelected ? const Icon(Icons.check, color: Colors.white) : null,
              ),
            );
          }).toList(),
        ),
        const SizedBox(height: AppConstants.spacingM),
        Text(
          'Icona',
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: AppConstants.spacingS),
        Wrap(
          spacing: AppConstants.spacingS,
          children: _availableIcons.map((iconData) {
            final iconName = iconData['icon'] as String;
            final isSelected = _selectedIcon == iconName;
            
            return GestureDetector(
              onTap: () => setState(() => _selectedIcon = iconName),
              child: Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  color: isSelected ? AppColors.fromHex(_selectedColor) : Colors.grey.withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(AppConstants.radiusM),
                ),
                child: Icon(
                  _getIconData(iconName),
                  color: isSelected ? Colors.white : Colors.grey,
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildPricing() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Prezzi',
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: AppConstants.spacingM),
        Row(
          children: [
            Expanded(
              child: TextFormField(
                controller: _basePriceController,
                decoration: const InputDecoration(
                  labelText: 'Prezzo Base/Notte *',
                  prefixIcon: Icon(Icons.euro),
                  suffixText: '€',
                ),
                keyboardType: const TextInputType.numberWithOptions(decimal: true),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Obbligatorio';
                  }
                  final price = double.tryParse(value);
                  if (price == null || price < 0) {
                    return 'Prezzo non valido';
                  }
                  return null;
                },
              ),
            ),
            const SizedBox(width: AppConstants.spacingM),
            Expanded(
              child: TextFormField(
                controller: _cleaningFeeController,
                decoration: const InputDecoration(
                  labelText: 'Costo Pulizie',
                  prefixIcon: Icon(Icons.cleaning_services),
                  suffixText: '€',
                ),
                keyboardType: const TextInputType.numberWithOptions(decimal: true),
                validator: (value) {
                  if (value != null && value.isNotEmpty) {
                    final fee = double.tryParse(value);
                    if (fee == null || fee < 0) {
                      return 'Costo non valido';
                    }
                  }
                  return null;
                },
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildAmenities() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Servizi',
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: AppConstants.spacingM),
        Wrap(
          spacing: AppConstants.spacingS,
          runSpacing: AppConstants.spacingS,
          children: _availableAmenities.map((amenity) {
            final isSelected = _amenities.contains(amenity);
            
            return FilterChip(
              label: Text(amenity),
              selected: isSelected,
              onSelected: (selected) {
                setState(() {
                  if (selected) {
                    _amenities.add(amenity);
                  } else {
                    _amenities.remove(amenity);
                  }
                });
              },
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildSettings() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Impostazioni',
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: AppConstants.spacingM),
        SwitchListTile(
          title: const Text('Appartamento Attivo'),
          subtitle: const Text('L\'appartamento è disponibile per prenotazioni'),
          value: _isActive,
          onChanged: (value) => setState(() => _isActive = value),
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
            onPressed: _saveApartment,
            child: Text(widget.apartment == null ? 'Crea' : 'Salva'),
          ),
        ),
      ],
    );
  }

  void _saveApartment() {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    final apartment = Apartment(
      id: widget.apartment?.id ?? DateTime.now().millisecondsSinceEpoch.toString(),
      name: _nameController.text.trim(),
      description: _descriptionController.text.trim().isEmpty ? null : _descriptionController.text.trim(),
      maxGuests: int.parse(_maxGuestsController.text),
      address: _addressController.text.trim().isEmpty ? null : _addressController.text.trim(),
      amenities: _amenities,
      basePrice: double.parse(_basePriceController.text),
      cleaningFee: _cleaningFeeController.text.isEmpty ? 0.0 : double.parse(_cleaningFeeController.text),
      isActive: _isActive,
      color: _selectedColor,
      icon: _selectedIcon,
      createdAt: widget.apartment?.createdAt ?? DateTime.now(),
      updatedAt: DateTime.now(),
    );

    widget.onSave(apartment);
    Navigator.of(context).pop();
  }

  IconData _getIconData(String iconName) {
    switch (iconName.toLowerCase()) {
      case 'home':
        return Icons.home;
      case 'building':
        return Icons.apartment;
      case 'house':
        return Icons.house;
      case 'warehouse':
        return Icons.warehouse;
      case 'square':
        return Icons.square;
      case 'crown':
        return Icons.star;
      default:
        return Icons.home;
    }
  }
}
