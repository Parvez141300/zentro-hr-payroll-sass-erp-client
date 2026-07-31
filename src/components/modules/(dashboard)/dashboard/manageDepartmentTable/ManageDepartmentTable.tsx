"use client";

import { getCompanyDepartments } from "@/actions/department.action";
import DataTable from "@/components/shared/tables/DataTable";
import { IDepartment } from "@/types/department.type";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { departmentColumns } from "./ManageDepartmentColumn";

const ManageDepartmentTable = () => {

  const { data: departmentResponse, isLoading } = useQuery({
    queryKey: ["companyDepartments"],
    queryFn: () => getCompanyDepartments(),
  });

  console.log("departmentResponse", departmentResponse);

  const departmentData = departmentResponse?.data;
  const departments = departmentData?.data;

  const handleView = (deparrtment: IDepartment) => {
    console.log("View department", deparrtment);
  };

  const handleEdit = (deparrtment: IDepartment) => {
    console.log("Edit department", deparrtment);
  };

  const handleDelete = (deparrtment: IDepartment) => {
    console.log("Delete department", deparrtment);
  };

  return (
    <DataTable
      data={departments || []}
      columns={departmentColumns}
      isLoading={isLoading}
      actions={{
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDelete,
      }}
      emptyMessage="No Departments found!"
    />
  );
};

export default ManageDepartmentTable;
