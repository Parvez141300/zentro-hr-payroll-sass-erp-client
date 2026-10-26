"use client";
import { getCompanyAttendance } from "@/actions/attendance.action";
import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { IAttendance } from "@/types/attendance.type";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { employeeAttendanceColumn } from "./EmployeeAttendanceColumn";
import EmployeeAttendanceDateRangeFilter from "../../dashboard/manageAttendanceTable/filters/EmployeeAttendanceDateRangeFilter";
import EmployeeAttendanceStatusFilter from "../../dashboard/manageAttendanceTable/filters/EmployeeAttendanceStatus";
import ViewAttendanceDialog from "../../dashboard/manageAttendanceTable/ViewAttendanceDialog";

const AttendanceTable = ({ queryString }: { queryString: string }) => {
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
    queryKey: ["companyEmployeeAttendances", queryString],
    queryFn: () => getCompanyAttendance(queryString),
  });

  const attendanceData = attendanceResponse?.data;
  const attendances = attendanceData?.data;
  const paginationMeta = attendanceData?.pagination;

  console.log("attendance data", attendanceData);

  const [viewingAttendance, setViewingAttendance] =
    useState<IAttendance | null>(null);

  const handleView = (attendance: IAttendance) => {
    console.log("view attendance", attendance);
    setViewingAttendance(attendance);
  };

  return (
    <>
      {/* attendance table */}
      <DataTable
        title="Attendances"
        description="Your attendances"
        data={attendances || []}
        columns={employeeAttendanceColumn}
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
    </>
  );
};

export default AttendanceTable;
