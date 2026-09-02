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
import { Gender } from "@/types/enums.type";

const EmployeeGenderFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial value from URL query params
  const initialEmployeeGender = searchParams.get("gender") || "";
  const [selectedGender, setSelectedGender] = useState<string>(
    initialEmployeeGender,
  );

  // Update URL when selection changes
  const handleGenderChange = (value: string) => {
    setSelectedGender(value);

    // Create new URLSearchParams from current params
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      // Set the gender param
      params.set("gender", value);
    } else {
      // Remove the param if empty
      params.delete("gender");
    }

    // Navigate to the new URL
    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : window.location.pathname;
    router.push(url);
  };

  // Gender options
  const genderOptions = [
    { value: Gender.MALE, label: "Male" },
    { value: Gender.FEMALE, label: "Female" },
    { value: Gender.OTHER, label: "Other" },
  ];

  return (
    <div className="max-w-50">
      <Select
        value={selectedGender}
        onValueChange={(value) => handleGenderChange(value as string)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Genders" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Genders</SelectItem>
          {genderOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EmployeeGenderFilter;
