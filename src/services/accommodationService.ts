import { Accommodation, DEFAULT_ACCOMMODATIONS } from '@/types/accommodation';

const STORAGE_KEY = 'accommodations';

export class AccommodationService {
  // Get all accommodations from localStorage or return defaults
  static getAccommodations(): Accommodation[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const accommodations = JSON.parse(stored);
        // Merge with defaults to ensure all required properties exist
        return accommodations.map((acc: any) => ({
          ...acc,
          isActive: acc.isActive !== undefined ? acc.isActive : true
        }));
      }
    } catch (error) {
      console.error('Error loading accommodations:', error);
    }
    
    // Return defaults if nothing in storage or error occurred
    this.saveAccommodations(DEFAULT_ACCOMMODATIONS);
    return DEFAULT_ACCOMMODATIONS;
  }

  // Get only active accommodations
  static getActiveAccommodations(): Accommodation[] {
    return this.getAccommodations().filter(acc => acc.isActive);
  }

  // Get accommodation by ID
  static getAccommodationById(id: string): Accommodation | undefined {
    return this.getAccommodations().find(acc => acc.id === id);
  }

  // Save accommodations to localStorage
  static saveAccommodations(accommodations: Accommodation[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(accommodations));
    } catch (error) {
      console.error('Error saving accommodations:', error);
      throw new Error('Failed to save accommodations');
    }
  }

  // Add new accommodation
  static addAccommodation(accommodation: Omit<Accommodation, 'id' | 'created_at' | 'updated_at'>): Accommodation {
    const accommodations = this.getAccommodations();
    
    // Generate unique ID
    const id = this.generateId(accommodation.name);
    
    // Check if ID already exists
    if (accommodations.some(acc => acc.id === id)) {
      throw new Error('An accommodation with this name already exists');
    }

    const newAccommodation: Accommodation = {
      ...accommodation,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    accommodations.push(newAccommodation);
    this.saveAccommodations(accommodations);
    
    return newAccommodation;
  }

  // Update accommodation
  static updateAccommodation(id: string, updates: Partial<Omit<Accommodation, 'id' | 'created_at'>>): Accommodation {
    const accommodations = this.getAccommodations();
    const index = accommodations.findIndex(acc => acc.id === id);
    
    if (index === -1) {
      throw new Error('Accommodation not found');
    }

    const updatedAccommodation: Accommodation = {
      ...accommodations[index],
      ...updates,
      id, // Ensure ID doesn't change
      updated_at: new Date().toISOString()
    };

    accommodations[index] = updatedAccommodation;
    this.saveAccommodations(accommodations);
    
    return updatedAccommodation;
  }

  // Delete accommodation (soft delete by setting isActive to false)
  static deleteAccommodation(id: string): void {
    const accommodations = this.getAccommodations();
    const index = accommodations.findIndex(acc => acc.id === id);
    
    if (index === -1) {
      throw new Error('Accommodation not found');
    }

    // Soft delete - just mark as inactive
    accommodations[index].isActive = false;
    accommodations[index].updated_at = new Date().toISOString();
    
    this.saveAccommodations(accommodations);
  }

  // Permanently remove accommodation
  static permanentlyDeleteAccommodation(id: string): void {
    const accommodations = this.getAccommodations();
    const filtered = accommodations.filter(acc => acc.id !== id);
    
    if (filtered.length === accommodations.length) {
      throw new Error('Accommodation not found');
    }
    
    this.saveAccommodations(filtered);
  }

  // Generate ID from name
  private static generateId(name: string): string {
    return name
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '')
      .substring(0, 20);
  }

  // Get accommodation mapping for calendar types (backwards compatibility)
  static getCalendarTypeMapping(): Record<string, string> {
    const accommodations = this.getActiveAccommodations();
    const mapping: Record<string, string> = {};
    
    accommodations.forEach(acc => {
      mapping[acc.id] = acc.name;
    });
    
    // Add special "all" type
    mapping.all = 'Tutti gli appartamenti';
    
    return mapping;
  }

  // Get short name mapping for events
  static getShortNameMapping(): Record<string, string> {
    const accommodations = this.getActiveAccommodations();
    const mapping: Record<string, string> = {};
    
    accommodations.forEach(acc => {
      mapping[acc.id] = acc.shortName;
    });
    
    return mapping;
  }

  // Get color mapping for calendar events
  static getColorMapping(): Record<string, string> {
    const accommodations = this.getActiveAccommodations();
    const mapping: Record<string, string> = {};
    
    accommodations.forEach(acc => {
      mapping[acc.id] = acc.color;
    });
    
    return mapping;
  }

  // Reset to defaults
  static resetToDefaults(): void {
    this.saveAccommodations(DEFAULT_ACCOMMODATIONS);
  }
}