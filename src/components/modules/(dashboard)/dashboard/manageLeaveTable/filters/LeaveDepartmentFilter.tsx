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

const LeaveDepartmentFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: departmentsData, isLoading: isDepartmentsLoading } = useQuery({
    queryKey: ["companyDepartments"],
    queryFn: () => getCompanyDepartments(),
  });

  const initialDepartmentId = searchParams.get("departmentId") || "";
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>(initialDepartmentId);

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("departmentId", value);
    } else {
      params.delete("departmentId");
    }

    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : window.location.pathname;
    router.push(url);
  };

  const departments = useMemo(() => {
    return departmentsData?.data?.data || [];
  }, [departmentsData]);

  const departmentOptions = useMemo(() => {
    return departments.map((dept: IDepartment) => ({
      value: dept.id,
      label: dept.name,
    }));
  }, [departments]);

  return (
    <div className="max-w-50">
      <Select
        value={selectedDepartment}
        onValueChange={handleDepartmentChange}
        disabled={isDepartmentsLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Departments" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Departments</SelectItem>
          {departmentOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LeaveDepartmentFilter;
