"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SalaryType } from "@/types/enums.type";

const EmployeeSalaryTypeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial value from URL query params
  const initialSalaryType = searchParams.get("salaryType") || "";
  const [selectedType, setSelectedType] = useState<string>(initialSalaryType);

  // Update URL when selection changes
  const handleTypeChange = (value: string) => {
    setSelectedType(value);

    // Create new URLSearchParams from current params
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      // Set the salaryType param
      params.set("salaryType", value);
    } else {
      // Remove the param if empty
      params.delete("salaryType");
    }

    // Navigate to the new URL
    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : window.location.pathname;
    router.push(url);
  };

  // Salary type options
  const salaryTypeOptions = [
    { value: SalaryType.MONTHLY, label: "Monthly" },
    { value: SalaryType.DAILY, label: "Daily" },
    { value: SalaryType.HOURLY, label: "Hourly" },
  ];

  return (
    <div className="max-w-50">
      <Select
        value={selectedType}
        onValueChange={(value) => handleTypeChange(value as string)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Salary Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Salary Types</SelectItem>
          {salaryTypeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EmployeeSalaryTypeFilter;