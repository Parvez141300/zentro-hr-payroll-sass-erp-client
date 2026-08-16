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
import { EmployeeStatus } from "@/types/enums.type";

const EmployeeStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial value from URL query params
  const initialEmployeeStatus = searchParams.get("employeeStatus") || "";
  const [selectedStatus, setSelectedStatus] = useState<string>(
    initialEmployeeStatus,
  );

  // Update URL when selection changes
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);

    // Create new URLSearchParams from current params
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      // Set the employeeStatus param
      params.set("status", value);
    } else {
      // Remove the param if empty
      params.delete("status");
    }

    // Navigate to the new URL
    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : window.location.pathname;
    router.push(url);
  };

  // Employee status options
  const employeeStatusOptions = [
    { value: EmployeeStatus.ACTIVE, label: "Active" },
    { value: EmployeeStatus.INACTIVE, label: "Inactive" },
    { value: EmployeeStatus.TERMINATED, label: "Terminated" },
    { value: EmployeeStatus.ON_LEAVE, label: "On Leave" },
  ];

  return (
    <div className="max-w-50">
      <Select
        value={selectedStatus}
        onValueChange={(value) => handleStatusChange(value as string)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Status</SelectItem>
          {employeeStatusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EmployeeStatusFilter;
