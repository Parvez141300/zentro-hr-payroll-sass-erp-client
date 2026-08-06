"use client";
import {
  deleteCompanyAccountant,
  getCompanyAccountants,
} from "@/actions/accountant.action";
import DataTable from "@/components/shared/tables/DataTable";
import DeletePopUpDialog from "@/components/shared/tables/DeletePopUpDialog";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { IAccountant } from "@/types/accountant.type";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { accountantColumns } from "./ManageAccountantColumn";
import ViewAccountantDialog from "./ViewAccountantDialog";

const ManageAccountantTable = ({ queryString }: { queryString: string }) => {
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

  const { data: accountantResponse, isLoading } = useQuery({
    queryKey: ["companyAccountants", queryString],
    queryFn: () => getCompanyAccountants(queryString),
  });

  const accountantData = accountantResponse?.data;
  const accountants = accountantData?.data;
  const paginationMeta = accountantData?.pagination;

  const [viewingAccountant, setViewingAccountant] =
    useState<IAccountant | null>(null);
  const [deletingAccountant, setDeletingAccountant] =
    useState<IAccountant | null>(null);

  const handleView = (accountant: IAccountant) => {
    setViewingAccountant(accountant); // শুধু state সেট করছি, dialog নিজে বাইরে render হবে
  };

  const handleDelete = (accountant: IAccountant) => {
    setDeletingAccountant(accountant); // শুধু state সেট করছি, dialog নিজে বাইরে render হবে
  };

  console.log("accoutant data ", accountants);

  return (
    <>
      {/* Accountant table */}
      <DataTable
        title="Accountants"
        description="Manage your accountants"
        data={accountants || []}
        columns={accountantColumns}
        isLoading={isLoading}
        emptyMessage="No Accountants found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search accountant...",
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

      {/* view accountant dialog */}
      <ViewAccountantDialog
        accountantData={viewingAccountant}
        open={!!viewingAccountant}
        onOpenChange={(open) => {
          if (!open) setViewingAccountant(null);
        }}
      />

      {/* Delete Accountant dialog */}
      <DeletePopUpDialog
        open={!!deletingAccountant}
        onOpenChange={(open) => {
          if (!open) setDeletingAccountant(null);
        }}
        title="Delete Accountant"
        itemName={deletingAccountant?.name}
        deleteAction={() => deleteCompanyAccountant(deletingAccountant!.id)}
        queryKey={["companyAccountants"]}
        successMessage="Accountant deleted successfully"
        errorMessage="Failed to delete accountant"
      />
    </>
  );
};

export default ManageAccountantTable;
