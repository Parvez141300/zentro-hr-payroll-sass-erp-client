"use client";
import { deleteCompanyHr, getCompanyHrs } from "@/actions/hr.action";
import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ManageHrColumn } from "./ManageHrColumn";
import { IHrManager } from "@/types/hrManager.type";
import ViewHrDialog from "./ViewHrDialog";
import DeletePopUpDialog from "@/components/shared/tables/DeletePopUpDialog";

const ManageHrTable = ({ queryString }: { queryString: string }) => {
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

  const { data: hrResponse, isLoading } = useQuery({
    queryKey: ["companyHrManagers", queryString],
    queryFn: () => getCompanyHrs(queryString),
  });

  const hrManagersData = hrResponse?.data;
  const hrManagers = hrManagersData?.data;
  const paginationMeta = hrManagersData?.pagination;
  console.log("hr data", hrManagers);

  const [viewingHr, setViewingHr] = useState<IHrManager | null>(null);
  const [deletingHr, setDeletingHr] = useState<IHrManager | null>(null);

  const handleView = (hrManager: IHrManager) => {
    console.log("view hr manager", hrManager);
    setViewingHr(hrManager);
  };

  const handleDelete = (hrManager: IHrManager) => {
    console.log("delete hr manager", hrManager);
    setDeletingHr(hrManager);
  };

  return (
    <>
      {/* departments table */}
      <DataTable
        title="HR Managers"
        description="Manage your Hr Managers"
        data={hrManagers || []}
        columns={ManageHrColumn}
        isLoading={isLoading}
        emptyMessage="No Hr Managers found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search hr managers...",
          },
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
        }}
      />

      <ViewHrDialog
        hrData={viewingHr}
        open={!!viewingHr}
        onOpenChange={(open) => {
          if (!open) setViewingHr(null);
        }}
      />

      {/* delete department dialog */}
      <DeletePopUpDialog
        open={!!deletingHr}
        onOpenChange={(open) => {
          if (!open) setDeletingHr(null);
        }}
        title="Delete HR"
        itemName={deletingHr?.name}
        deleteAction={() => deleteCompanyHr(deletingHr!.id)}
        queryKey={["companyHrManagers"]}
        successMessage="HR deleted successfully"
        errorMessage="Failed to delete HR"
      />
    </>
  );
};

export default ManageHrTable;
