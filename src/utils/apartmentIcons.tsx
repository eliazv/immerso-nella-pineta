import React from 'react';
import { 
  Home, 
  Building, 
  Castle, 
  House, 
  Building2, 
  TreePine,
  Waves,
  Mountain,
  Sun,
  Star,
  LucideIcon
} from 'lucide-react';

// Mappa delle icone disponibili
const iconMap: Record<string, LucideIcon> = {
  Home,
  Building,
  Castle,
  House,
  Building2,
  TreePine,
  Waves,
  Mountain,
  Sun,
  Star,
};

interface ApartmentIconProps {
  iconName?: string;
  color?: string;
  size?: number;
  className?: string;
}

export const ApartmentIcon: React.FC<ApartmentIconProps> = ({ 
  iconName = 'Home', 
  color = '#3DA9A9', 
  size = 16,
  className = '' 
}) => {
  const IconComponent = iconMap[iconName] || Home;
  
  return (
    <IconComponent 
      size={size} 
      style={{ color }} 
      className={className}
    />
  );
};

export const getApartmentIcon = (iconName?: string): LucideIcon => {
  return iconMap[iconName || 'Home'] || Home;
};
