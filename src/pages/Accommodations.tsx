import React, { useState } from 'react';
import { AccommodationManager } from '@/components/backoffice/AccommodationManager';
import { AlloggiatiManager } from '@/components/backoffice/AlloggiatiManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Users } from 'lucide-react';

const Accommodations: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <Tabs defaultValue="accommodations" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="accommodations" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Appartamenti
          </TabsTrigger>
          <TabsTrigger value="alloggiati" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Alloggiati
          </TabsTrigger>
        </TabsList>
        <TabsContent value="accommodations" className="mt-6">
          <AccommodationManager />
        </TabsContent>
        <TabsContent value="alloggiati" className="mt-6">
          <AlloggiatiManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Accommodations;