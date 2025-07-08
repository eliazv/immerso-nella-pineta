import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, AlertTriangle, CheckCircle, Info, Trash2, RotateCcw } from "lucide-react";
import { 
  migrateAllBookings, 
  migrateBookingsFromSheet, 
  clearAllBookings, 
  restoreFromBackup,
  getMigrationStats,
  validateMigratedData
} from "@/services/migrationService";
import { CalendarType } from "@/types/calendar";

const DataMigration: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [migrationResults, setMigrationResults] = useState<any>(null);
  const [validationResults, setValidationResults] = useState<any>(null);
  const { toast } = useToast();

  const handleMigrateAll = async () => {
    setIsLoading(true);
    try {
      const results = await migrateAllBookings();
      setMigrationResults(results);
      toast({
        title: "Migrazione completata",
        description: `Migrate ${results.total} prenotazioni totali`
      });
      
      // Valida i dati migrati
      const validation = validateMigratedData();
      setValidationResults(validation);
      
    } catch (error) {
      toast({
        title: "Errore nella migrazione",
        description: error instanceof Error ? error.message : "Errore sconosciuto",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMigrateSingle = async (calendarType: CalendarType) => {
    if (calendarType === "all") return;
    
    setIsLoading(true);
    try {
      const count = await migrateBookingsFromSheet(calendarType);
      toast({
        title: "Migrazione completata",
        description: `Migrate ${count} prenotazioni per ${calendarType}`
      });
    } catch (error) {
      toast({
        title: "Errore nella migrazione",
        description: error instanceof Error ? error.message : "Errore sconosciuto",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = () => {
    if (!confirm("Sei sicuro di voler eliminare tutte le prenotazioni? Verrà creato un backup automatico.")) {
      return;
    }
    
    try {
      clearAllBookings();
      toast({
        title: "Dati eliminati",
        description: "Tutte le prenotazioni sono state eliminate. Backup salvato."
      });
      setMigrationResults(null);
      setValidationResults(null);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Errore nell'eliminazione dei dati",
        variant: "destructive"
      });
    }
  };

  const handleRestore = () => {
    if (!confirm("Sei sicuro di voler ripristinare dal backup?")) {
      return;
    }
    
    try {
      const success = restoreFromBackup();
      if (success) {
        toast({
          title: "Ripristino completato",
          description: "I dati sono stati ripristinati dal backup"
        });
      } else {
        toast({
          title: "Errore nel ripristino",
          description: "Nessun backup trovato o errore nel ripristino",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Errore nel ripristino",
        description: "Errore durante il ripristino dal backup",
        variant: "destructive"
      });
    }
  };

  const handleValidate = () => {
    const validation = validateMigratedData();
    setValidationResults(validation);
    
    if (validation.isValid) {
      toast({
        title: "Validazione completata",
        description: "Tutti i dati sono validi"
      });
    } else {
      toast({
        title: "Problemi rilevati",
        description: `${validation.errors.length} errori trovati`,
        variant: "destructive"
      });
    }
  };

  const stats = getMigrationStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Migrazione Dati</h2>
        <p className="text-muted-foreground">
          Importa dati esistenti da Google Sheets allo store locale
        </p>
      </div>

      {/* Statistiche attuali */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Stato Attuale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.apartments}</div>
              <div className="text-sm text-muted-foreground">Appartamenti</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <div className="text-sm text-muted-foreground">Prenotazioni Totali</div>
            </div>
            {Object.entries(stats.bookingsByApartment).map(([name, count]) => (
              <div key={name} className="text-center">
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm text-muted-foreground">{name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Azioni di migrazione */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Importa da Google Sheets
            </CardTitle>
            <CardDescription>
              Importa prenotazioni esistenti da Google Sheets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleMigrateAll} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Migrazione in corso..." : "Migra Tutte le Prenotazioni"}
            </Button>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Oppure migra singolarmente:</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleMigrateSingle("principale")}
                  disabled={isLoading}
                >
                  N° 3
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleMigrateSingle("secondario")}
                  disabled={isLoading}
                >
                  N° 4
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleMigrateSingle("terziario")}
                  disabled={isLoading}
                >
                  N° 8
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Gestione Dati
            </CardTitle>
            <CardDescription>
              Valida, pulisci o ripristina i dati locali
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleValidate}
              variant="outline"
              className="w-full"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Valida Dati
            </Button>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleRestore}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Ripristina Backup
              </Button>
              <Button 
                onClick={handleClearAll}
                variant="destructive"
                size="sm"
                className="flex-1"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Pulisci Tutto
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risultati migrazione */}
      {migrationResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Risultati Migrazione
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Badge variant="outline">{migrationResults.principale}</Badge>
                <div className="text-sm text-muted-foreground mt-1">N° 3</div>
              </div>
              <div className="text-center">
                <Badge variant="outline">{migrationResults.secondario}</Badge>
                <div className="text-sm text-muted-foreground mt-1">N° 4</div>
              </div>
              <div className="text-center">
                <Badge variant="outline">{migrationResults.terziario}</Badge>
                <div className="text-sm text-muted-foreground mt-1">N° 8</div>
              </div>
              <div className="text-center">
                <Badge>{migrationResults.total}</Badge>
                <div className="text-sm text-muted-foreground mt-1">Totale</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risultati validazione */}
      {validationResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {validationResults.isValid ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              )}
              Risultati Validazione
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {validationResults.isValid ? (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Tutti i dati sono validi e consistenti.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                {validationResults.errors.length > 0 && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Errori trovati:</strong>
                      <ul className="mt-2 list-disc list-inside">
                        {validationResults.errors.map((error: string, index: number) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
                
                {validationResults.warnings.length > 0 && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Avvisi:</strong>
                      <ul className="mt-2 list-disc list-inside">
                        {validationResults.warnings.map((warning: string, index: number) => (
                          <li key={index}>{warning}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Avviso importante */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Importante:</strong> La migrazione importa i dati da Google Sheets ma non li elimina. 
          I dati rimarranno disponibili sia localmente che su Google Sheets. 
          Le prenotazioni duplicate vengono automaticamente ignorate.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DataMigration;
