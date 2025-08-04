import React from "react";
import { AccommodationManager } from "@/components/backoffice/AccommodationManager";
import { AlloggiatiQuickActions } from "@/components/backoffice/AlloggiatiQuickActions";

const Accommodations: React.FC = () => {
  return (
    <div className="container mx-auto px-4  max-w-6xl ">
      <div>
        <h1 className="text-2xl font-bold mb-2">Altri strumenti</h1>
      </div>

      {/* Alloggiati Section */}
      <AlloggiatiQuickActions />

      {/* Apartments Section */}
      <AccommodationManager />
    </div>
  );
};

export default Accommodations;
