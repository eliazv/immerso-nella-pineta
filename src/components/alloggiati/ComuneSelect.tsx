import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";
import { searchComuni, getComuneByNome, ComuneData } from "@/data/comuni";

interface ComuneSelectProps {
  value: string;
  onChange: (comune: string, provincia?: string) => void;
  placeholder?: string;
  label: string;
  required?: boolean;
  id?: string;
}

const ComuneSelect: React.FC<ComuneSelectProps> = ({
  value,
  onChange,
  placeholder = "Cerca comune...",
  label,
  required = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [filteredComuni, setFilteredComuni] = useState<ComuneData[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Aggiorna il termine di ricerca quando cambia il valore esterno
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Filtra i comuni in base al termine di ricerca
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const results = searchComuni(searchTerm);
      setFilteredComuni(results);
    } else {
      setFilteredComuni([]);
    }
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
    
    if (newValue.length >= 2) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelectComune = (comune: ComuneData) => {
    setSearchTerm(comune.nome);
    onChange(comune.nome, comune.sigla);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    if (searchTerm.length >= 2) {
      setIsOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

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
            if (searchTerm.length >= 2) {
              setIsOpen(!isOpen);
            }
            inputRef.current?.focus();
          }}
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {/* Dropdown */}
      {isOpen && filteredComuni.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredComuni.map((comune) => (
            <button
              key={comune.codice}
              type="button"
              className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center justify-between"
              onClick={() => handleSelectComune(comune)}
            >
              <div>
                <div className="font-medium">{comune.nome}</div>
                <div className="text-sm text-gray-500">
                  {comune.provincia} ({comune.sigla})
                </div>
              </div>
              {searchTerm === comune.nome && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Messaggio quando non ci sono risultati */}
      {isOpen && searchTerm.length >= 2 && filteredComuni.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-3">
          <div className="text-sm text-gray-500 text-center">
            Nessun comune trovato per "{searchTerm}"
          </div>
        </div>
      )}

      {/* Suggerimento */}
      {!isOpen && searchTerm.length < 2 && searchTerm.length > 0 && (
        <p className="text-xs text-gray-500 mt-1">
          Digita almeno 2 caratteri per cercare
        </p>
      )}
    </div>
  );
};

export default ComuneSelect;
