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
import { LeaveStatus } from "@/types/enums.type";

const LeaveStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialStatus = searchParams.get("status") || "";
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : window.location.pathname;
    router.push(url);
  };

  const statusOptions = [
    { value: LeaveStatus.PENDING, label: "Pending" },
    { value: LeaveStatus.APPROVED, label: "Approved" },
    { value: LeaveStatus.REJECTED, label: "Rejected" },
    { value: LeaveStatus.CANCELLED, label: "Cancelled" },
  ];

  return (
    <div className="max-w-50">
      <Select
        value={selectedStatus}
        onValueChange={(value: string) => handleStatusChange(value as string)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Status</SelectItem>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LeaveStatusFilter;
