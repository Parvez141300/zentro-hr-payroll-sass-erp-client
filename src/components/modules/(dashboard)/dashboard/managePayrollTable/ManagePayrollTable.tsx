"use client";
import {
  deleteCompanyPayroll,
  getCompanyPayroll,
} from "@/actions/payroll.action";
import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { IPayroll } from "@/types/payroll.type";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { payrollColumn } from "./ManagePayrollColumn";
import DeletePopUpDialog from "@/components/shared/tables/DeletePopUpDialog";
import PayrollStatusFilter from "./filters/PayrollStatusFilter";
import PayrollMonthFilter from "./filters/PayrollMonthFilter";

const ManagePayrollTable = ({ queryString }: { queryString?: string }) => {
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
    queryKey: ["companyPayrolls", queryString],
    queryFn: () => getCompanyPayroll(queryString),
  });

  const payrollData = payrollResponse?.data;
  const payrolls = payrollData?.data || [];
  const paginationMeta = payrollData?.pagination;

  const [viewingPayroll, setViewingPayroll] = useState<IPayroll | null>(null);
  const [deletingPayroll, setDeletingPayroll] = useState<IPayroll | null>(null);
  const [editingPayroll, setEditingPayroll] = useState<IPayroll | null>(null);

  const handleView = (payroll: IPayroll) => {
    console.log("view leave type", payroll);
    setViewingPayroll(payroll);
  };

  const handleDelete = (payroll: IPayroll) => {
    console.log("delete leave type", payroll);
    setDeletingPayroll(payroll);
  };

  const handleEdit = (payroll: IPayroll) => {
    console.log("edit leave type", payroll);
    setEditingPayroll(payroll);
    // Set editing state when implemented
  };

  console.log("leave type data", payrolls);
  return (
    <>
      {/* Payroll table */}
      <DataTable
        title="Payroll"
        description="Manage your payroll records here"
        data={payrolls || []}
        columns={payrollColumn}
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
              <PayrollMonthFilter />
              {/* <PayrollYearFilter /> */}
            </>
          ),
          onClearFilters: () => clearFilterKeys(["status", "month", "year"]),
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
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
      />

      {/* Delete payroll dialog */}
      <DeletePopUpDialog
        open={!!deletingPayroll}
        onOpenChange={(open) => {
          if (!open) setDeletingPayroll(null);
        }}
        title="Delete Payroll Record"
        itemName={`${deletingPayroll?.employee?.name}'s Payroll (${deletingPayroll?.month}/${deletingPayroll?.year})`}
        deleteAction={() => deleteCompanyPayroll(deletingPayroll?.id as string)}
        queryKey={["companyPayrolls"]}
        successMessage="Payroll record deleted successfully"
        errorMessage="Failed to delete payroll record"
      />
    </>
  );
};

export default ManagePayrollTable;
