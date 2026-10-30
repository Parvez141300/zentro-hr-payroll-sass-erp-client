"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/types/enums.type";

const RoleFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ✅ Derive from URL directly — no local state
  const selectedRole = searchParams.get("role") || "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("role", value);
    } else {
      params.delete("role");
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  // ✅ Role options matching UserRole enum
  const roleOptions = [
    { value: UserRole.SUPER_ADMIN, label: "Super Admin" },
    { value: UserRole.HR_MANAGER, label: "HR Manager" },
    { value: UserRole.ACCOUNTANT, label: "Accountant" },
    { value: UserRole.DEPARTMENT_HEAD, label: "Department Head" },
    { value: UserRole.EMPLOYEE, label: "Employee" },
  ];

  return (
    <div className="max-w-50">
      <Select
        value={selectedRole}
        onValueChange={(value) => handleChange(value || "")}
      >
        <SelectTrigger className="w-full" aria-label="Filter by role">
          <SelectValue placeholder="All Roles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Roles</SelectItem>
          {roleOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleFilter;
