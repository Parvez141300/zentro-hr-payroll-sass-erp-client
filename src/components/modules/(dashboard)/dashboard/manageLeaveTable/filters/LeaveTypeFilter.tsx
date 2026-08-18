"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getCompanyLeaveTypes } from "@/actions/leaveType.action";
import { ILeaveType } from "@/types/leaveType.type";

const LeaveTypeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch leave types
  const { data: leaveTypesData, isLoading: isLeaveTypesLoading } = useQuery({
    queryKey: ["companyLeaveTypes"],
    queryFn: async() => await getCompanyLeaveTypes(),
  });

  // Get initial value from URL query params
  const initialLeaveType = searchParams.get("leaveType") || "";
  const [selectedType, setSelectedType] = useState<string>(initialLeaveType);

  // Update URL when selection changes
  const handleTypeChange = (value: string) => {
    setSelectedType(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("leaveType", value);
    } else {
      params.delete("leaveType");
    }

    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : window.location.pathname;
    router.push(url);
  };

  // Prepare leave type options from API response
  const leaveTypes = useMemo(() => {
    return leaveTypesData?.data?.data || [];
  }, [leaveTypesData]);

  const leaveTypeOptions = useMemo(() => {
    return leaveTypes.map((type: ILeaveType) => ({
      value: type.id,
      label: type.name,
    }));
  }, [leaveTypes]);

  return (
    <div className="max-w-50">
      <Select
        value={selectedType}
        onValueChange={(value: string) => handleTypeChange(value as string)}
        disabled={isLeaveTypesLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={isLeaveTypesLoading ? "Loading..." : "All Types"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Types</SelectItem>
          {leaveTypeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
          {leaveTypeOptions.length === 0 && !isLeaveTypesLoading && (
            <div className="px-2 py-1.5 text-sm text-muted-foreground">
              No leave types found
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LeaveTypeFilter;
