"use client";

import {
  deleteEmployeeAttendance,
  getCompanyAttendance,
} from "@/actions/attendance.action";
import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { attendanceColumn } from "./ManageAttendanceColumn";
import { IAttendance } from "@/types/attendance.type";
import ViewAttendanceDialog from "./ViewAttendanceDialog";
import DeletePopUpDialog from "@/components/shared/tables/DeletePopUpDialog";
import EmployeeAttendanceDepartmentFilter from "./filters/EmployeeAttendanceDepartmentFilter";
import EmployeeAttendanceStatusFilter from "./filters/EmployeeAttendanceStatus";
import EmployeeAttendanceDateRangeFilter from "./filters/EmployeeAttendanceDateRangeFilter";

const ManageAttendanceTable = ({ queryString }: { queryString: string }) => {
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

  const { data: attendanceResponse, isLoading } = useQuery({
    queryKey: ["companyAttendances", queryString],
    queryFn: () => getCompanyAttendance(queryString),
  });

  const attendanceData = attendanceResponse?.data;
  const attendances = attendanceData?.data;
  const paginationMeta = attendanceData?.pagination;

  const [viewingAttendance, setViewingAttendance] =
    useState<IAttendance | null>(null);
  const [deletingAttendance, setDeletingAttendance] =
    useState<IAttendance | null>(null);

  const handleView = (attendance: IAttendance) => {
    console.log("view attendance", attendance);
    setViewingAttendance(attendance);
  };
  const handleDelete = (attendance: IAttendance) => {
    console.log("delete attendance", attendance);
    setDeletingAttendance(attendance);
  };

  const handleEdit = (attendance: IAttendance) => {
    console.log("edit attendance", attendance);
  };

  return (
    <>
      {/* attendance table */}
      <DataTable
        title="Attendances"
        description="Manage your attendances"
        data={attendances || []}
        columns={attendanceColumn}
        isLoading={isLoading}
        emptyMessage="No Attendances found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search by employee data...",
          },
          filters: (
            <>
              <EmployeeAttendanceDepartmentFilter />
              <EmployeeAttendanceStatusFilter />
              <EmployeeAttendanceDateRangeFilter />
            </>
          ),
          onClearFilters: () =>
            clearFilterKeys(["status", "departmentId", "startDate", "endDate"]),
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

      {/* view dialog */}
      <ViewAttendanceDialog
        attendanceData={viewingAttendance}
        open={!!viewingAttendance}
        onOpenChange={(open) => {
          if (!open) setViewingAttendance(null);
        }}
      />

      {/* delete dialog */}
      <DeletePopUpDialog
        open={!!deletingAttendance}
        onOpenChange={(open) => {
          if (!open) setDeletingAttendance(null);
        }}
        title="Delete Employee Attendance"
        itemName={`${deletingAttendance?.employee?.name} Attendance`}
        deleteAction={() =>
          deleteEmployeeAttendance(deletingAttendance?.id as string)
        }
        queryKey={["companyAttendances"]}
        successMessage="Employee Attendance deleted successfully"
        errorMessage="Failed to delete employee Attendance"
      />
    </>
  );
};

export default ManageAttendanceTable;
