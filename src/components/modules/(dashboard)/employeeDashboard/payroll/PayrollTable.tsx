"use client";
import { getCompanyPayroll } from "@/actions/payroll.action";
import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { IPayroll } from "@/types/payroll.type";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { employeePayrollColumn } from "./ManageEmployeePayrollColumn";
import PayrollStatusFilter from "../../dashboard/managePayrollTable/filters/PayrollStatusFilter";
import PayrollTypeFilter from "../../dashboard/managePayrollTable/filters/PayrollTypeFilter";
import PayrollMonthFilter from "../../dashboard/managePayrollTable/filters/PayrollMonthFilter";
import PayrollYearFilter from "../../dashboard/managePayrollTable/filters/PayrollYearFilter";
import PayrollDateFilter from "../../dashboard/managePayrollTable/filters/PayrollDateFilter";
import ViewPayrollDialog from "../../dashboard/managePayrollTable/ViewPayrollDialog";

const PayrollTable = ({ queryString }: { queryString?: string }) => {
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

  const { data: payrollResponse, isLoading } = useQuery({
    queryKey: ["companyEmployeePayrolls", queryString],
    queryFn: () => getCompanyPayroll(queryString),
  });

  const payrollData = payrollResponse?.data;
  const payrolls = payrollData?.data || [];
  const paginationMeta = payrollData?.pagination;

  const [viewingPayroll, setViewingPayroll] = useState<IPayroll | null>(null);

  const handleView = (payroll: IPayroll) => {
    console.log("view leave type", payroll);
    setViewingPayroll(payroll);
  };

  return (
    <>
      {/* Payroll table */}
      <DataTable
        title="Payroll"
        description="Manage your payroll records here"
        data={payrolls || []}
        columns={employeePayrollColumn}
        isLoading={isLoading}
        emptyMessage="No Payroll records found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search payroll by employee...",
          },
          filters: (
            <>
              <PayrollStatusFilter />
              <PayrollTypeFilter />
              <PayrollMonthFilter />
              <PayrollYearFilter />
              <PayrollDateFilter />
            </>
          ),
          onClearFilters: () =>
            clearFilterKeys([
              "status",
              "month",
              "year",
              "startDate",
              "endDate",
              "salaryType",
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
        actions={{
          onView: handleView,
        }}
      />

      {/* View payroll Dialog */}
      <ViewPayrollDialog
        open={!!viewingPayroll}
        onOpenChange={(open) => {
          if (!open) setViewingPayroll(null);
        }}
        payrollData={viewingPayroll}
      />
    </>
  );
};

export default PayrollTable;
