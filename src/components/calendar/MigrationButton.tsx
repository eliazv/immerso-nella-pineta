import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { runMigration } from "@/scripts/migrateTursoBrowser";
import { toast } from "@/components/ui/use-toast";

export const MigrationButton = () => {
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationDone, setMigrationDone] = useState(false);

  const handleMigration = async () => {
    if (migrationDone) {
      toast({
        title: "Migrazione già completata",
        description: "I dati sono già stati migrati da Google Sheets",
      });
      return;
    }

    setIsMigrating(true);
    
    try {
      await runMigration();
      setMigrationDone(true);
      toast({
        title: "Migrazione completata!",
        description: "Tutti i dati sono stati trasferiti da Google Sheets a Turso",
      });
      
      // Ricarica la pagina per vedere i dati migrati
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error("Migration failed:", error);
      toast({
        title: "Errore migrazione",
        description: "Controlla la console per i dettagli",
        variant: "destructive",
      });
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <Button
      onClick={handleMigration}
      disabled={isMigrating}
      variant={migrationDone ? "outline" : "default"}
      size="sm"
      className="gap-2"
    >
      {isMigrating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {isMigrating ? "Migrando..." : migrationDone ? "Migrazione completata" : "Migra da Google Sheets"}
    </Button>
  );
};