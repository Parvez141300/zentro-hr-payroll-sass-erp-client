import { cn } from "@/lib/utils";
import { AnyFieldApi } from "@tanstack/react-form";
import React from "react";
import { Label } from "../../ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../ui/input-group";
import { FieldError } from "@/components/ui/field";

type AppFieldProps = {
  field: AnyFieldApi;
  label: string;
  type: "text" | "email" | "password";
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
};

const AppField = ({
  field,
  label,
  type,
  placeholder,
  className,
  disabled,
  append,
  prepend,
}: AppFieldProps) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={field.name}>{label}</Label>
      <InputGroup>
        <InputGroupInput
          id={field.name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${field.name}-error` : undefined}
        />
        {prepend && <InputGroupAddon>{prepend}</InputGroupAddon>}
        {append && (
          <InputGroupAddon align="inline-end">{append}</InputGroupAddon>
        )}
      </InputGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </div>
  );
};

export default AppField;
