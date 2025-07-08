import React from "react";
import ApartmentManagement from "@/components/backoffice/ApartmentManagement";

/**
 * Pagina per la gestione degli alloggi
 */
const Apartments: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <ApartmentManagement />
    </div>
  );
};

export default Apartments;
