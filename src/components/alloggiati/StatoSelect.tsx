import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";
import { searchStati, getStatoByNome, StatoData } from "@/data/stati";

interface StatoSelectProps {
  value: string;
  onChange: (stato: string) => void;
  placeholder?: string;
  label: string;
  required?: boolean;
  id?: string;
}

const StatoSelect: React.FC<StatoSelectProps> = ({
  value,
  onChange,
  placeholder = "Cerca stato...",
  label,
  required = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [filteredStati, setFilteredStati] = useState<StatoData[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Aggiorna il termine di ricerca quando cambia il valore esterno
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Filtra gli stati in base al termine di ricerca
  useEffect(() => {
    const results = searchStati(searchTerm);
    setFilteredStati(results);
  }, [searchTerm]);

  // Chiudi dropdown quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    setSearchTerm(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleSelectStato = (stato: StatoData) => {
    setSearchTerm(stato.nome);
    onChange(stato.nome);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Raggruppa stati per continente
  const statiPerContinente = filteredStati.reduce((acc, stato) => {
    if (!acc[stato.continente]) {
      acc[stato.continente] = [];
    }
    acc[stato.continente].push(stato);
    return acc;
  }, {} as Record<string, StatoData[]>);

  return (
    <div className="relative" ref={dropdownRef}>
      <Label htmlFor={id}>{label} {required && "*"}</Label>
      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          className="pr-8"
          autoComplete="off"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
          onClick={() => {
            setIsOpen(!isOpen);
            inputRef.current?.focus();
          }}
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {/* Dropdown */}
      {isOpen && filteredStati.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {Object.entries(statiPerContinente).map(([continente, stati]) => (
            <div key={continente}>
              <div className="px-3 py-1 bg-gray-50 text-xs font-medium text-gray-500 sticky top-0">
                {continente}
              </div>
              {stati.map((stato) => (
                <button
                  key={stato.codice}
                  type="button"
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center justify-between"
                  onClick={() => handleSelectStato(stato)}
                >
                  <div className="font-medium">{stato.nome}</div>
                  {searchTerm === stato.nome && (
                    <Check className="h-4 w-4 text-green-600" />
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Messaggio quando non ci sono risultati */}
      {isOpen && searchTerm.length >= 2 && filteredStati.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-3">
          <div className="text-sm text-gray-500 text-center">
            Nessuno stato trovato per "{searchTerm}"
          </div>
        </div>
      )}

      {/* Suggerimento */}
      {!isOpen && searchTerm.length === 0 && (
        <p className="text-xs text-gray-500 mt-1">
          Digita per cercare uno stato
        </p>
      )}
    </div>
  );
};

export default StatoSelect;
