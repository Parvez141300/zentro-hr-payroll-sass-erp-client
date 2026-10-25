"use client";
import { getCompanyAttendance } from "@/actions/attendance.action";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { IAttendance } from "@/types/attendance.type";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

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

    console.log('attendance data', attendanceData);
  
    const [viewingAttendance, setViewingAttendance] =
      useState<IAttendance | null>(null);

  return <div>AttendanceTable</div>;
};

export default AttendanceTable;
