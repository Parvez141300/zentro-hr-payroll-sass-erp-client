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
import { PayrollStatus } from "@/types/enums.type";

const PayrollStatusFilter = () => {
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
    { value: PayrollStatus.DRAFT, label: "Draft" },
    { value: PayrollStatus.APPROVED, label: "Approved" },
    { value: PayrollStatus.PAID, label: "Paid" },
    { value: PayrollStatus.GENERATED, label: "Generated" },
    { value: PayrollStatus.CANCELLED, label: "Cancelled" },
  ];

  return (
    <div className="max-w-50">
      <Select
        value={selectedStatus}
        onValueChange={(value: string | null) => handleStatusChange(value || "")}
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

export default PayrollStatusFilter;
