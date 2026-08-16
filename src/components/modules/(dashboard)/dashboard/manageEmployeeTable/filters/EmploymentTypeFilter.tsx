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
import { EmploymentType } from "@/types/enums.type";

const EmploymentTypeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial value from URL query params
  const initialEmployeeType =
    searchParams.get("employeeType") || "";
  const [selectedType, setSelectedType] = useState<string>(initialEmployeeType);

  // Update URL when selection changes
  const handleTypeChange = (value: string) => {
    setSelectedType(value);

    // Create new URLSearchParams from current params
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      // Set the employeeType param
      params.set("employmentType", value);
    } else {
      // Remove the param if empty
      params.delete("employmentType");
    }

    // Navigate to the new URL
    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : window.location.pathname;
    router.push(url);
  };

  // Employment type options
  const employmentTypeOptions = [
    { value: EmploymentType.FULL_TIME, label: "Full Time" },
    { value: EmploymentType.PART_TIME, label: "Part Time" },
    { value: EmploymentType.CONTRACT, label: "Contract" },
    { value: EmploymentType.INTERN, label: "Intern" },
  ];

  return (
    <div className="max-w-50">
      <Select
        value={selectedType}
        onValueChange={(value) => handleTypeChange(value as string)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Types</SelectItem>
          {employmentTypeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EmploymentTypeFilter;
