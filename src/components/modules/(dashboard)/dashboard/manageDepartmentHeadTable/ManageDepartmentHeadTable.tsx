"use client";
import {
  deleteCompanyDepartmentHead,
  getCompanyDepartmentHeads,
} from "@/actions/departmentHead.action";
import DataTable from "@/components/shared/tables/DataTable";
import DeletePopUpDialog from "@/components/shared/tables/DeletePopUpDialog";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { IDepartmentHead } from "@/types/departmentHead.type";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { departmentHeadColumn } from "./ManageDepartmentHeadColumn";
import ViewDepartmentHeadDialog from "./ViewDepartmentHeadDialog";

const ManageDepartmentHeadTable = ({
  queryString,
}: {
  queryString: string;
}) => {
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

  const { data: departmentHeadResponse, isLoading } = useQuery({
    queryKey: ["companyDepartmentHeads", queryString],
    queryFn: () => getCompanyDepartmentHeads(queryString),
  });
  const departmentHeadData = departmentHeadResponse?.data;
  const departmentHeads = departmentHeadData?.data;
  const paginationMeta = departmentHeadData?.pagination;

  const [viewingDepartmentHead, setViewingDepartmentHead] =
    useState<IDepartmentHead | null>(null);
  const [deletingDepartmentHead, setDeletingDepartmentHead] =
    useState<IDepartmentHead | null>(null);

  const handleView = (departmentHead: IDepartmentHead) => {
    setViewingDepartmentHead(departmentHead);
  };

  const handleDelete = (departmentHead: IDepartmentHead) => {
    setDeletingDepartmentHead(departmentHead);
  };

  console.log("department head data", departmentHeads);

  return (
    <>
      {/* Department Head table */}
      <DataTable
        title="Department Heads"
        description="Manage your department heads here."
        data={departmentHeads || []}
        columns={departmentHeadColumn}
        isLoading={isLoading}
        emptyMessage="No department heads found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search department heads...",
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

      {/* view department head dialog */}
      <ViewDepartmentHeadDialog
        departmentHeadData={viewingDepartmentHead}
        open={!!viewingDepartmentHead}
        onOpenChange={(open) => {
          if (!open) setViewingDepartmentHead(null);
        }}
      />

      {/* Delete department head dialog */}
      <DeletePopUpDialog
        open={!!deletingDepartmentHead}
        onOpenChange={(open) => {
          if (!open) setDeletingDepartmentHead(null);
        }}
        title="Delete Accountant"
        itemName={deletingDepartmentHead?.name}
        deleteAction={() =>
          deleteCompanyDepartmentHead(deletingDepartmentHead!.id)
        }
        queryKey={["companyDepartmentHeads"]}
        successMessage="Department head deleted successfully"
        errorMessage="Failed to delete department head"
      />
    </>
  );
};

export default ManageDepartmentHeadTable;
