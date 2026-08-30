"use client";

import {
  deleteCompanyLeaveType,
  getCompanyLeaveTypes,
} from "@/actions/leaveType.action";
import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ILeaveType } from "@/types/leaveType.type";
import DeletePopUpDialog from "@/components/shared/tables/DeletePopUpDialog";
import { leaveTypeColumn } from "./ManageLeaveTypeColumn";
import CreateLeaveTypeDialog from "./CreateLeaveTypeDialog";
import ViewLeaveTypeDialog from "./ViewLeaveTypeDialog";
import EditLeaveTypeDialog from "./EditLeaveTypeDialog";

const ManageLeaveTypeTable = ({ queryString }: { queryString: string }) => {
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

  const { data: leaveTypeResponse, isLoading } = useQuery({
    queryKey: ["companyLeaveTypes", queryString],
    queryFn: () => getCompanyLeaveTypes(queryString),
  });

  const leaveTypeData = leaveTypeResponse?.data;
  const leaveTypes = leaveTypeData?.data;
  const paginationMeta = leaveTypeData?.pagination;

  const [viewingLeaveType, setViewingLeaveType] = useState<ILeaveType | null>(
    null,
  );
  const [deletingLeaveType, setDeletingLeaveType] = useState<ILeaveType | null>(
    null,
  );
  const [editingLeaveType, setEditingLeaveType] = useState<ILeaveType | null>(
    null,
  );

  const handleView = (leaveType: ILeaveType) => {
    console.log("view leave type", leaveType);
    setViewingLeaveType(leaveType);
  };

  const handleDelete = (leaveType: ILeaveType) => {
    console.log("delete leave type", leaveType);
    setDeletingLeaveType(leaveType);
  };

  const handleEdit = (leaveType: ILeaveType) => {
    console.log("edit leave type", leaveType);
    setEditingLeaveType(leaveType);
    // Set editing state when implemented
  };

  console.log("leave type data", leaveTypes);

  return (
    <>
      {/* Leave Type table */}
      <DataTable
        title="Leave Types"
        description="Manage your leave types here"
        data={leaveTypes || []}
        columns={leaveTypeColumn}
        isLoading={isLoading}
        emptyMessage="No Leave Types found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search leave types...",
          },
          actions: (
            <>
              <CreateLeaveTypeDialog />
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
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
      />

      {/* View leave type dialog */}
      <ViewLeaveTypeDialog
        leaveTypeData={viewingLeaveType}
        open={!!viewingLeaveType}
        onOpenChange={(open) => {
          if (!open) setViewingLeaveType(null);
        }}
      />

      {/* Delete leave type dialog */}
      <DeletePopUpDialog
        open={!!deletingLeaveType}
        onOpenChange={(open) => {
          if (!open) setDeletingLeaveType(null);
        }}
        title="Delete Leave Type"
        itemName={deletingLeaveType?.name}
        deleteAction={() =>
          deleteCompanyLeaveType(deletingLeaveType?.id as string)
        }
        queryKey={["companyLeaveTypes"]}
        successMessage="Leave type deleted successfully"
        errorMessage="Failed to delete leave type"
      />

      {/* Edit leave type dialog - to be implemented */}
      <EditLeaveTypeDialog
        leaveTypeData={editingLeaveType}
        open={!!editingLeaveType}
        onOpenChange={(open) => {
          if (!open) setEditingLeaveType(null);
        }}
      />
    </>
  );
};

export default ManageLeaveTypeTable;
