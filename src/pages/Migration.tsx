import React from "react";
import DataMigration from "@/components/backoffice/DataMigration";

/**
 * Pagina per la migrazione dei dati da Google Sheets
 */
const Migration: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <DataMigration />
    </div>
  );
};

export default Migration;
