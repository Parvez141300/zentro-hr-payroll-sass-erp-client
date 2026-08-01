"use client";

import { getCompanyDepartments } from "@/actions/department.action";
import DataTable from "@/components/shared/tables/DataTable";
import { IDepartment } from "@/types/department.type";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { departmentColumns } from "./ManageDepartmentColumn";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import CreateDepartmentDialog from "./CreateDepartmentDialog";
// import CreateDepartmentDialog from "./CreateDepartmentDialog";

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

  const handleView = (department: IDepartment) => console.log("View", department);
  const handleEdit = (department: IDepartment) => console.log("Edit", department);
  const handleDelete = (department: IDepartment) => console.log("Delete", department);

  return (
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
        // filters দেওয়া হয়নি — department table এ filter লাগবে না
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
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDelete,
      }}
    />
  );
};

export default ManageDepartmentTable;