import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SelectFieldProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  className?: string;
  renderValue?: (option: SelectOption) => React.ReactNode;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Seleziona un'opzione",
  required = false,
  className = "",
  renderValue,
}) => {
  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="space-y-1">
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder}>
            {selectedOption && renderValue ? (
              renderValue(selectedOption)
            ) : (
              <div className="flex items-center gap-2">
                {selectedOption?.icon}
                <span>{selectedOption?.label}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                {option.icon}
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectField;
