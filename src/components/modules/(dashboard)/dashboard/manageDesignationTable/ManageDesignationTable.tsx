"use client";
import { getCompanyDesignations } from "@/actions/designation.action";
import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { IDesignation } from "@/types/designation.type";
import { designationColumns } from "./ManageDesignationColumn";
import CreateDesignationDialog from "./CreateDesignationDialog";

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

  console.log("designation & paginationMeta", designations, paginationMeta);

  const handleEdit = (designation: IDesignation) => {
    console.log("Edit designation:", designation);
  };

  const handleDelete = (designation: IDesignation) => {
    console.log("Delete designation:", designation);
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
      {/* <UpdateDepartmentDialog
        departmentData={editingDepartment}
        open={!!editingDepartment}
        onOpenChange={(open) => {
          if (!open) setEditingDepartment(null);
        }}
      /> */}

      {/* delete department dialog */}
      {/* <DeleteDepartmentDialog
        departmentData={deletingDepartment}
        open={!!deletingDepartment}
        onOpenChange={(open) => {
          if (!open) setDeletingDepartment(null);
        }}
      /> */}
    </>
  );
};

export default ManageDesignationTable;
