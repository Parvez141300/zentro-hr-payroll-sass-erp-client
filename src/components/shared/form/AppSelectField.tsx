import { cn } from "@/lib/utils";
import { AnyFieldApi } from "@tanstack/react-form";
import React, { useMemo } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldError } from "@/components/ui/field";

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  field: AnyFieldApi;
  label: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

const AppSelectField = ({
  field,
  label,
  placeholder,
  onValueChange,
  options,
  className,
  disabled,
  loading,
}: SelectFieldProps) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  // Get the label for the current value
  const getSelectedLabel = useMemo(() => {
    if (!field.state.value) return null;
    const option = options.find((opt) => opt.value === field.state.value);
    return option?.label || null;
  }, [field.state.value, options]);

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={field.name}>{label}</Label>
      <Select
        value={field.state.value}
        onValueChange={(value) => {
          field.handleChange(value);
          onValueChange?.(value);
        }}
        disabled={disabled || loading}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              loading ? "Loading..." : placeholder || "Select an option"
            }
          >
            {/* Explicitly render the label instead of the value */}
            {getSelectedLabel}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
          {options.length === 0 && !loading && (
            <div className="px-2 py-1.5 text-sm text-muted-foreground">
              No options available
            </div>
          )}
        </SelectContent>
      </Select>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </div>
  );
};

export default AppSelectField;
