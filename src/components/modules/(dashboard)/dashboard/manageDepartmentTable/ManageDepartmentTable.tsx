"use client";

import DataTable from "@/components/shared/tables/DataTable";
import { IDepartment } from "@/types/department.type";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { departmentColumns } from "./ManageDepartmentColumn";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import CreateDepartmentDialog from "./CreateDepartmentDialog";
import UpdateDepartmentDialog from "./UpdateDepartmentDialog";
import { getCompanyDepartments } from "@/actions/department.action";

const ManageDepartmentTable = ({ queryString }: { queryString?: string }) => {
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
    queryKey: ["companyDepartments", queryString],
    queryFn: () => getCompanyDepartments(queryString),
  });

  const departmentData = departmentResponse?.data;
  const departments = departmentData?.data;
  const paginationMeta = departmentData?.pagination;

  // edit dialog এর জন্য state — কোন department edit হচ্ছে সেটা এখানেই রাখা হচ্ছে
  const [editingDepartment, setEditingDepartment] =
    useState<IDepartment | null>(null);

  const handleEdit = (department: IDepartment) => {
    setEditingDepartment(department); // শুধু state সেট করছি, dialog নিজে বাইরে render হবে
  };

  const handleDelete = (department: IDepartment) =>
    console.log("Delete", department);

  return (
    <>
      <DataTable
        data={departments || []}
        columns={departmentColumns}
        isLoading={isLoading}
        emptyMessage="No Departments found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search departments...",
          },
          actions: <CreateDepartmentDialog />,
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
      <UpdateDepartmentDialog
        departmentData={editingDepartment}
        open={!!editingDepartment}
        onOpenChange={(open) => {
          if (!open) setEditingDepartment(null);
        }}
      />
    </>
  );
};

export default ManageDepartmentTable;
