import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseAsyncOperationOptions {
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseAsyncOperationReturn<T> {
  isLoading: boolean;
  error: Error | null;
  execute: (operation: () => Promise<T>) => Promise<T | null>;
  reset: () => void;
}

/**
 * Hook personalizzato per gestire operazioni asincrone con stati di caricamento,
 * gestione errori e notifiche toast automatiche
 */
export function useAsyncOperation<T = any>(
  options: UseAsyncOperationOptions = {}
): UseAsyncOperationReturn<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const execute = useCallback(
    async (operation: () => Promise<T>): Promise<T | null> => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await operation();
        
        if (options.successMessage) {
          toast({
            title: "Successo",
            description: options.successMessage,
            variant: "default",
          });
        }
        
        if (options.onSuccess) {
          options.onSuccess();
        }
        
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Errore sconosciuto");
        setError(error);
        
        const errorMessage = options.errorMessage || error.message;
        toast({
          title: "Errore",
          description: errorMessage,
          variant: "destructive",
        });
        
        if (options.onError) {
          options.onError(error);
        }
        
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [toast, options]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    execute,
    reset,
  };
}

/**
 * Hook semplificato per operazioni CRUD comuni
 */
export function useCrudOperation() {
  const createOperation = useAsyncOperation({
    successMessage: "Elemento creato con successo",
    errorMessage: "Errore durante la creazione",
  });

  const updateOperation = useAsyncOperation({
    successMessage: "Elemento aggiornato con successo",
    errorMessage: "Errore durante l'aggiornamento",
  });

  const deleteOperation = useAsyncOperation({
    successMessage: "Elemento eliminato con successo",
    errorMessage: "Errore durante l'eliminazione",
  });

  return {
    create: createOperation,
    update: updateOperation,
    delete: deleteOperation,
  };
}
