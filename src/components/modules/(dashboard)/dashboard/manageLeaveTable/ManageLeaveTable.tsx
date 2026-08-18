"use client";

import { deleteEmployeeLeave, getCompanyLeaves } from "@/actions/leave.action";
import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ILeave } from "@/types/leave.type";
import { leaveColumn } from "./ManageLeaveColumn";
import LeaveDepartmentFilter from "./filters/LeaveDepartmentFilter";
import LeaveStatusFilter from "./filters/LeaveStatusFilter";
import LeaveTypeFilter from "./filters/LeaveTypeFilter";
import LeaveDateRangeFilter from "./filters/LeaveDateRangeFilter";
import DeletePopUpDialog from "@/components/shared/tables/DeletePopUpDialog";
import ViewLeaveDialog from "./ViewLeaveDialog";

const ManageLeaveTable = ({ queryString }: { queryString: string }) => {
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

  const { data: leaveResponse, isLoading } = useQuery({
    queryKey: ["companyLeaves", queryString],
    queryFn: () => getCompanyLeaves(queryString),
  });

  const leaveData = leaveResponse?.data;
  const leaves = leaveData?.data;
  const paginationMeta = leaveData?.pagination;

  const [viewingLeave, setViewingLeave] = useState<ILeave | null>(null);
  const [deletingLeave, setDeletingLeave] = useState<ILeave | null>(null);

  const handleView = (leave: ILeave) => {
    console.log("view leave", leave);
    setViewingLeave(leave);
  };

  const handleDelete = (leave: ILeave) => {
    console.log("delete leave", leave);
    setDeletingLeave(leave);
  };

  const handleEdit = (leave: ILeave) => {
    console.log("edit leave", leave);
    // Set editing state when implemented
  };

  console.log('leave data', leaves);

  return (
    <>
      {/* Leave table */}
      <DataTable
        title="Leaves"
        description="Manage your leave requests"
        data={leaves || []}
        columns={leaveColumn}
        isLoading={isLoading}
        emptyMessage="No Leaves found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search by employee data...",
          },
          filters: (
            <>
              <LeaveDepartmentFilter />
              <LeaveStatusFilter />
              <LeaveTypeFilter />
              <LeaveDateRangeFilter />
            </>
          ),
          onClearFilters: () =>
            clearFilterKeys([
              "status",
              "departmentId",
              "startDate",
              "endDate",
              "leaveType",
            ]),
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

      {/* View leave dialog */}
      <ViewLeaveDialog
        leaveData={viewingLeave}
        open={!!viewingLeave}
        onOpenChange={(open) => {
          if (!open) setViewingLeave(null);
        }}
      />

      {/* Delete leave dialog */}
      <DeletePopUpDialog
        open={!!deletingLeave}
        onOpenChange={(open) => {
          if (!open) setDeletingLeave(null);
        }}
        title="Delete Leave Request"
        itemName={`${deletingLeave?.employee?.name}'s Leave`}
        deleteAction={() => deleteEmployeeLeave(deletingLeave?.id as string)}
        queryKey={["companyLeaves"]}
        successMessage="Leave request deleted successfully"
        errorMessage="Failed to delete leave request"
      />
    </>
  );
};

export default ManageLeaveTable;
