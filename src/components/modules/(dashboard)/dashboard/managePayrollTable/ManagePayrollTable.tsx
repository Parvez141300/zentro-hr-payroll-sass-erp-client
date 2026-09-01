"use client";
import { getCompanyPayroll } from "@/actions/payroll.action";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { IPayroll } from "@/types/payroll.type";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

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
  } = useTableQueryParams();

  const { data: payrollResponse, isLoading } = useQuery({
    queryKey: ["companyPayrolls", queryString],
    queryFn: () => getCompanyPayroll(queryString),
  });

  const payrollData = payrollResponse?.data;
  const payrolls = payrollData?.data;
  const paginationMeta = payrollData?.pagination;

  const [viewingPayroll, setViewingPayroll] = useState<IPayroll | null>(
    null,
  );
  const [deletingPayroll, setDeletingPayroll] = useState<IPayroll | null>(
    null,
  );
  const [editingPayroll, setEditingPayroll] = useState<IPayroll | null>(
    null,
  );

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
  return <div>ManagePayrollTable</div>;
};

export default ManagePayrollTable;
