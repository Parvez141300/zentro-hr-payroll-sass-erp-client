"use client";

import { getCompanyEmployees } from "@/actions/employee.action";
import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { markEmployeeAttendanceColumn } from "./MarkAttendanceColumn";
import EmploymentTypeFilter from "./filters/EmploymentTypeFilter";
import EmployeeStatusFilter from "./filters/EmployeeStatusFilter";
import EmployeeGenderFilter from "./filters/EmployeeGenderFilter";
import EmployeeDepartmentFilter from "./filters/EmployeeDepartmentFilter";

const MarkAttendanceTable = ({ queryString }: { queryString: string }) => {
  const {
    sortingState,
    handleSortingChange,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    searchValue,
    handleSearchChange,
    clearFilterKeys,
  } = useTableQueryParams();

  const { data: employeeResponse, isLoading } = useQuery({
    queryKey: ["markEmployeesAttendance", queryString],
    queryFn: () => getCompanyEmployees(queryString),
  });
  const employeeData = employeeResponse?.data;
  const employees = employeeData?.data;
  const paginationMeta = employeeData?.pagination;

  console.log("employee data", employees);

  return (
    <>
      {/* Department Head table */}
      <DataTable
        title="Employees"
        description="Manage your employees here."
        data={employees || []}
        columns={markEmployeeAttendanceColumn}
        isLoading={isLoading}
        emptyMessage="No employees found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search employees...",
          },
          filters: (
            <>
              <EmploymentTypeFilter />
              <EmployeeStatusFilter />
              <EmployeeGenderFilter />
              <EmployeeDepartmentFilter />
            </>
          ),
          onClearFilters: () =>
            clearFilterKeys([
              "status",
              "departmentId",
              "gender",
              "employeeType",
            ]),
        }}
        pagination={
          paginationMeta
            ? {
                page,
                limit,
                total: paginationMeta.total,
                totalPages: paginationMeta.totalPages,
                onPageChange: handlePageChange,
                onLimitChange: handleLimitChange,
              }
            : undefined
        }
      />
    </>
  );
};

export default MarkAttendanceTable;
