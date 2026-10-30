"use client";

import { getAllCompany } from "@/actions/company.action";
import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { ICompany } from "@/types/company.type";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { companyColumn } from "./ManageAllCompanyColumn";

const ManageAllCompanyTable = ({ queryString }: { queryString?: string }) => {
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

  const { data: companyResponse, isLoading } = useQuery({
    queryKey: ["manage-companies"],
    queryFn: () => getAllCompany(queryString),
  });
  console.log("all company", companyResponse);
  const companyData = companyResponse?.data;
  const companies = companyData?.data;
  const paginationMeta = companyData?.pagination;

  console.log('companies', companies);

  const [viewing, setViewing] = useState<ICompany | null>(null);
  const [deleting, setDeleting] = useState<ICompany | null>(null);

  const handleView = (employee: ICompany) => {
    setViewing(employee); // শুধু state সেট করছি, dialog নিজে বাইরে render হবে
  };

  const handleDelete = (employee: ICompany) => {
    setDeleting(employee); // শুধু state সেট করছি, dialog নিজে বাইরে render হবে
  };

  return (
    <>
      {/* manage all company table */}
      <DataTable
        title="Manage All Company"
        description="Manage All Company here."
        data={companies}
        columns={companyColumn}
        isLoading={isLoading}
        emptyMessage="No employees found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search employees...",
          },
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
          onDelete: handleDelete,
        }}
      />
    </>
  );
};

export default ManageAllCompanyTable;
