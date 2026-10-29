"use client";
import { getCompanyDepartmentHeads } from "@/actions/departmentHead.action";
import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { IDepartmentHead } from "@/types/departmentHead.type";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { departmentHeadColumn } from "./AllDepartmentHeadColumn";
import ViewDepartmentHeadDialog from "./ViewDepartmentHeadDialog";

const AllDepartmentHeadTable = ({ queryString }: { queryString?: string }) => {
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

  const { data: depatmentHeadsResponse, isLoading } = useQuery({
    queryKey: ["all-department-heads", queryString],
    queryFn: () => getCompanyDepartmentHeads(queryString),
  });
  const deaptmentHeadsData = depatmentHeadsResponse?.data;
  const departmentHeads = deaptmentHeadsData?.data;
  const paginationMeta = deaptmentHeadsData?.pagination;

  const [viewingDepartmentHead, setViewingDepartmentHead] =
    useState<IDepartmentHead | null>(null);

  const handleView = (departmentHead: IDepartmentHead) => {
    setViewingDepartmentHead(departmentHead); // শুধু state সেট করছি, dialog নিজে বাইরে render হবে
  };

  console.log('department head data', viewingDepartmentHead);

  return (
    <>
      {/* Department Head table */}
      <DataTable
        title="Depatment Heads"
        description="See all department head here in this company."
        data={departmentHeads || []}
        columns={departmentHeadColumn}
        isLoading={isLoading}
        emptyMessage="No department head found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search department head...",
          },
          onClearFilters: () =>
            clearFilterKeys([
              "page",
              "sortBy",
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
            {/* ✅ This is where you use it */}
      <ViewDepartmentHeadDialog
        headData={viewingDepartmentHead}
        open={!!viewingDepartmentHead}
        onOpenChange={(open) => {
          if (!open) setViewingDepartmentHead(null);
        }}
      />
    </>
  );
};

export default AllDepartmentHeadTable;
