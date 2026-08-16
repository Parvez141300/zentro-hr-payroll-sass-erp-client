"use client";
import {
  deleteCompanyEmployee,
  getCompanyEmployees,
} from "@/actions/employee.action";
import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { IEmployee } from "@/types/employee.type";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { employeeColumn } from "./ManageEmployeeColumn";
import DeletePopUpDialog from "@/components/shared/tables/DeletePopUpDialog";
import ViewEmployeeDialog from "./ViewEmployeeDialog";
import EmploymentTypeFilter from "./filters/EmploymentTypeFilter";
import EmployeeStatusFilter from "./filters/EmployeeStatusFilter";
import EmployeeGenderFilter from "./filters/EmployeeGenderFilter";
import EmployeeDepartmentFilter from "./filters/EmployeeDepartmentFilter";
import EditEmployeeDialog from "./EditEmployeeDialog";

const ManageEmployeeTable = ({ queryString }: { queryString: string }) => {
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

  const { data: employeeResponse, isLoading } = useQuery({
    queryKey: ["companyEmployees", queryString],
    queryFn: () => getCompanyEmployees(queryString),
  });
  const employeeData = employeeResponse?.data;
  const employees = employeeData?.data;
  const paginationMeta = employeeData?.pagination;

  const [viewingEmployee, setViewingEmployee] = useState<IEmployee | null>(
    null,
  );
  const [deletingEmployee, setDeletingEmployee] = useState<IEmployee | null>(
    null,
  );
  const [editingEmployee, setEditingEmployee] = useState<IEmployee | null>(
    null,
  );

  const handleView = (employee: IEmployee) => {
    setViewingEmployee(employee); // শুধু state সেট করছি, dialog নিজে বাইরে render হবে
  };

  const handleEdit = (employee: IEmployee) => {
    console.log("edit employee", employee);
    setEditingEmployee(employee); // শুধু state সেট করছি, dialog নিজে বাইরে render হবে
  };

  const handleDelete = (employee: IEmployee) => {
    setDeletingEmployee(employee); // শুধু state সেট করছি, dialog নিজে বাইরে render হবে
  };

  console.log("employee data", employees);

  return (
    <>
      {/* Department Head table */}
      <DataTable
        title="Employees"
        description="Manage your employees here."
        data={employees || []}
        columns={employeeColumn}
        isLoading={isLoading}
        emptyMessage="No employees found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search employees...",
          },
          filters: (
            <>
              <EmploymentTypeFilter />
              <EmployeeStatusFilter />
              <EmployeeGenderFilter />
              <EmployeeDepartmentFilter />
            </>
          ),
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
          onEdit: handleEdit,
        }}
      />

      {/* View employee dialog */}
      <ViewEmployeeDialog
        employeeData={viewingEmployee}
        open={!!viewingEmployee}
        onOpenChange={(open) => {
          if (!open) setViewingEmployee(null);
        }}
      />

      {/* Edit employee dialog */}
      <EditEmployeeDialog
        open={!!editingEmployee}
        employeeData={editingEmployee}
        onOpenChange={(open: boolean) => {
          if (!open) setEditingEmployee(null);
        }}
      />

      {/* Delete employee dialog */}
      <DeletePopUpDialog
        open={!!deletingEmployee}
        onOpenChange={(open) => {
          if (!open) setDeletingEmployee(null);
        }}
        title="Delete Employee"
        itemName={deletingEmployee?.name}
        deleteAction={() => deleteCompanyEmployee(deletingEmployee!.id)}
        queryKey={["companyEmployees"]}
        successMessage="Employee deleted successfully"
        errorMessage="Failed to delete employee"
      />
    </>
  );
};

export default ManageEmployeeTable;
