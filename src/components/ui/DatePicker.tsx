import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DatePickerProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  id,
  label,
  value,
  onChange,
  min,
  max,
  required = false,
  className = "",
  placeholder,
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        required={required}
        className={`bg-white ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DatePicker;
