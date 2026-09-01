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

const PayrollYearFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialYear = searchParams.get("year") || "";
  const [selectedYear, setSelectedYear] = useState<string>(initialYear);

  const handleYearChange = (value: string) => {
    setSelectedYear(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("year", value);
    } else {
      params.delete("year");
    }

    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : window.location.pathname;
    router.push(url);
  };

  // Generate year options (current year and 21 years back)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 21 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString(),
  }));

  return (
    <div className="max-w-50">
      <Select
        value={selectedYear}
        onValueChange={(value: string | null) => handleYearChange(value || "")}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Years" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Years</SelectItem>
          {yearOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PayrollYearFilter;
