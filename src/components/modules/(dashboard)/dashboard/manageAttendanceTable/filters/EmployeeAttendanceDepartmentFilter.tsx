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
import { getCompanyDepartments } from "@/actions/department.action";
import { IDepartment } from "@/types/department.type";

const EmployeeAttendanceDepartmentFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch departments
  const { data: departmentsData, isLoading: isDepartmentsLoading } = useQuery({
    queryKey: ["companyDepartments"],
    queryFn: async () => await getCompanyDepartments(),
  });

  // Get initial value from URL query params
  const initialDepartmentId = searchParams.get("departmentId") || "";
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>(initialDepartmentId);

  // Update URL when selection changes
  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);

    // Create new URLSearchParams from current params
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      // Set the departmentId param
      params.set("departmentId", value);
    } else {
      // Remove the param if empty
      params.delete("departmentId");
    }

    // Navigate to the new URL
    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : window.location.pathname;
    router.push(url);
  };

  // Wrap departments in useMemo to prevent unnecessary re-renders
  const departments = useMemo(() => {
    return departmentsData?.data?.data || [];
  }, [departmentsData]);

  // Prepare department options - also wrap in useMemo
  const departmentOptions = useMemo(() => {
    return departments.map((dept: IDepartment) => ({
      value: dept.id,
      label: dept.name,
    }));
  }, [departments]);

  // Get the label for the selected value
  const getSelectedLabel = useMemo(() => {
    if (!selectedDepartment) return null;
    const option = departmentOptions.find(
      (opt) => opt.value === selectedDepartment,
    );
    return option?.label || null;
  }, [selectedDepartment, departmentOptions]);

  return (
    <div className="max-w-50">
      <Select
        value={selectedDepartment}
        onValueChange={(value) => handleDepartmentChange(value as string)}
        disabled={isDepartmentsLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              isDepartmentsLoading ? "Loading..." : "All Departments"
            }
          >
            {getSelectedLabel}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Departments</SelectItem>
          {departmentOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
          {departmentOptions.length === 0 && !isDepartmentsLoading && (
            <div className="px-2 py-1.5 text-sm text-muted-foreground">
              No departments found
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EmployeeAttendanceDepartmentFilter;
