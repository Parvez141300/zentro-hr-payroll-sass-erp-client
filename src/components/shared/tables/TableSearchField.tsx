import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React from "react";

interface ITableSearchFieldProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TableSearchField = ({
  placeholder,
  value,
  onChange,
  className,
}: ITableSearchFieldProps) => {
  return (
    <div className={cn("relative w-full max-w-xs", className)}>
      <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8"
      />
    </div>
  );
};

export default TableSearchField;
