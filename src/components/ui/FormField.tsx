import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id?: string;
  label?: string;
  type?: "text" | "number" | "email" | "password" | "textarea";
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  required?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  className?: string;
  rows?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
  step,
  className = "",
  rows = 3,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = type === "number" ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(newValue);
  };

  return (
    <div className="space-y-1">
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {type === "textarea" ? (
        <Textarea
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          className={`bg-white min-h-[80px] break-words resize-none ${className}`}
          rows={rows}
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          step={step}
          className={`bg-white ${className}`}
        />
      )}
    </div>
  );
};

export default FormField;
