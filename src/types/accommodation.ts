export interface Accommodation {
  id: string;
  name: string;
  shortName: string;
  description?: string;
  color: string;
  isActive: boolean;
  created_at?: string;
  updated_at?: string;
}

// Default accommodations data
export const DEFAULT_ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'principale',
    name: 'Appartamento 3',
    shortName: 'App.3',
    description: 'Appartamento principale con vista mare',
    color: '#3498db',
    isActive: true
  },
  {
    id: 'secondario', 
    name: 'Appartamento 4',
    shortName: 'App.4',
    description: 'Appartamento secondario con terrazza',
    color: '#e74c3c',
    isActive: true
  },
  {
    id: 'terziario',
    name: 'Appartamento 8', 
    shortName: 'App.8',
    description: 'Appartamento con giardino privato',
    color: '#2ecc71',
    isActive: true
  }
];