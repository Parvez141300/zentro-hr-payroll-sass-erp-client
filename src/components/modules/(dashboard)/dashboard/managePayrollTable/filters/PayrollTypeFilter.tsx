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

const PayrollTypeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial value from URL query params
  const initialSalaryType = searchParams.get("salaryType") || "";
  const [selectedType, setSelectedType] = useState<string>(initialSalaryType);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("salaryType", value);
    } else {
      params.delete("salaryType");
    }

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
        onValueChange={(value: string | null) => handleTypeChange(value || "")}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Payroll Types</SelectItem>
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

export default PayrollTypeFilter;