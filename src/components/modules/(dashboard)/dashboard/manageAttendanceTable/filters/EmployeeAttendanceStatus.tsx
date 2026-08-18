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
import { AttendanceStatus } from "@/types/enums.type";

const EmployeeAttendanceStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial value from URL query params
  const initialAttendanceStatus = searchParams.get("attendanceStatus") || "";
  const [selectedStatus, setSelectedStatus] = useState<string>(
    initialAttendanceStatus,
  );

  // Update URL when selection changes
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);

    // Create new URLSearchParams from current params
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      // Set the attendanceStatus param
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

  // Attendance status options
  const attendanceStatusOptions = [
    { value: AttendanceStatus.PRESENT, label: "Present" },
    { value: AttendanceStatus.ABSENT, label: "Absent" },
    { value: AttendanceStatus.LATE, label: "Late" },
    { value: AttendanceStatus.HALF_DAY, label: "Half Day" },
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
          {attendanceStatusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EmployeeAttendanceStatusFilter;
