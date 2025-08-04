import React from 'react';
import { AccommodationManager } from '@/components/backoffice/AccommodationManager';
import { AlloggiatiQuickActions } from '@/components/backoffice/AlloggiatiQuickActions';

const Accommodations: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Impostazioni</h1>
        <p className="text-muted-foreground">
          Gestisci il sistema alloggiati e gli appartamenti della tua struttura.
        </p>
      </div>

      {/* Alloggiati Section */}
      <AlloggiatiQuickActions />

      {/* Apartments Section */}
      <AccommodationManager />
    </div>
  );
};

export default Accommodations;