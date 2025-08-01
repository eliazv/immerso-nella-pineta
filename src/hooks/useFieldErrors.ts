import { useState, useCallback } from 'react';

export interface FieldError {
  field: string;
  message: string;
}

export interface UseFieldErrorsReturn {
  errors: FieldError[];
  getFieldError: (field: string) => string | undefined;
  setFieldError: (field: string, message: string) => void;
  clearFieldError: (field: string) => void;
  clearAllErrors: () => void;
  hasErrors: boolean;
}

export const useFieldErrors = (): UseFieldErrorsReturn => {
  const [errors, setErrors] = useState<FieldError[]>([]);

  const getFieldError = useCallback((field: string): string | undefined => {
    const error = errors.find(e => e.field === field);
    return error?.message;
  }, [errors]);

  const setFieldError = useCallback((field: string, message: string) => {
    setErrors(prev => {
      // Rimuovi errore esistente per questo campo
      const filtered = prev.filter(e => e.field !== field);
      // Aggiungi nuovo errore
      return [...filtered, { field, message }];
    });
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => prev.filter(e => e.field !== field));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const hasErrors = errors.length > 0;

  return {
    errors,
    getFieldError,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    hasErrors
  };
};
