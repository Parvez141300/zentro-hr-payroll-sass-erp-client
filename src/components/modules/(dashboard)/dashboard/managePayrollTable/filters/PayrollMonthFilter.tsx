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

const PayrollMonthFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialMonth = searchParams.get("month") || "";
  const [selectedMonth, setSelectedMonth] = useState<string>(initialMonth);

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("month", value);
    } else {
      params.delete("month");
    }

    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : window.location.pathname;
    router.push(url);
  };

  const monthOptions = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  return (
    <div className="max-w-50">
      <Select
        value={selectedMonth}
        onValueChange={(value: string | null) => handleMonthChange(value || "")}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Months" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Months</SelectItem>
          {monthOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PayrollMonthFilter;
