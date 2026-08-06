"use client";
import {
  deleteCompanyDesignation,
  getCompanyDesignations,
} from "@/actions/designation.action";
import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { IDesignation } from "@/types/designation.type";
import { designationColumns } from "./ManageDesignationColumn";
import CreateDesignationDialog from "./CreateDesignationDialog";
import UpdateDesignationDialog from "./UpdateDesignationDialog";
import DeletePopUpDialog from "@/components/shared/tables/DeletePopUpDialog";

const ManageDesignationTable = ({ queryString }: { queryString?: string }) => {
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

  const { data: departmentResponse, isLoading } = useQuery({
    queryKey: ["companyDesignations", queryString],
    queryFn: () => getCompanyDesignations(queryString),
  });

  const departmentData = departmentResponse?.data;
  const designations = departmentData?.data;
  const paginationMeta = departmentData?.pagination;

  const [editingDesignation, setEditingDesignation] =
    useState<IDesignation | null>(null);
  const [deletingDesignation, setDeletingDesignation] =
    useState<IDesignation | null>(null);

  console.log("designation & paginationMeta", designations, paginationMeta);

  const handleEdit = (designation: IDesignation) => {
    setEditingDesignation(designation);
  };

  const handleDelete = (designation: IDesignation) => {
    setDeletingDesignation(designation);
  };

  return (
    <>
      {/* departments table */}
      <DataTable
        title="Designation"
        description="Manage your designations."
        data={designations || []}
        columns={designationColumns}
        isLoading={isLoading}
        emptyMessage="No Designation found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search designations...",
          },
          actions: <CreateDesignationDialog />,
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
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
      />

      {/* টেবিলের বাইরে একবারই render হচ্ছে, open/departmentData state দিয়ে control হচ্ছে */}
      <UpdateDesignationDialog
        designationData={editingDesignation}
        open={!!editingDesignation}
        onOpenChange={(open) => {
          if (!open) setEditingDesignation(null);
        }}
      />

      {/* delete designation dialog */}
      <DeletePopUpDialog
        open={!!deletingDesignation}
        onOpenChange={(open) => {
          if (!open) setDeletingDesignation(null);
        }}
        title="Delete Designation"
        itemName={deletingDesignation?.title}
        deleteAction={() => deleteCompanyDesignation(deletingDesignation!.id)}
        queryKey={["companyDesignations"]}
        successMessage="Designation deleted successfully"
        errorMessage="Failed to delete Designation"
      />
    </>
  );
};

export default ManageDesignationTable;
