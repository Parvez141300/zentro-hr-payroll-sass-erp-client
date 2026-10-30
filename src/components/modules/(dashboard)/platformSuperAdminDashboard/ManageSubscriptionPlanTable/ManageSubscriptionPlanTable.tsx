"use client";

import {
  deleteSubscriptionPlanConfig,
  getAllSubscriptionPlanConfig,
} from "@/actions/subscriptionPlanConfig.action";
import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { ISubscriptionPlanConfig } from "@/types/subscriptionPlanConfig.type";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { subscriptionPlanConfigColumn } from "./SubscriptionPlanConfigColumn";
import ViewSubscriptionPlanDialog from "./ViewSubscriptionPlanDialog";
import DeletePopUpDialog from "@/components/shared/tables/DeletePopUpDialog";
import EditSubscriptionPlanConfigDialog from "./EditSubscriptionPlanConfigDialog";

const ManageSubscriptionPlanTable = ({
  queryString,
}: {
  queryString: string;
}) => {
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

  const { data: subscriptionPlanConfigResponse, isLoading } = useQuery({
    queryKey: ["subscription-plans-config"],
    queryFn: () => getAllSubscriptionPlanConfig(queryString),
  });
  console.log("subscription data:", subscriptionPlanConfigResponse);
  const planData = subscriptionPlanConfigResponse?.data;
  const plans = planData?.data;
  const paginationMeta = planData?.pagination;

  const [viewing, setViewing] = useState<ISubscriptionPlanConfig | null>(null);
  const [deleting, setDeleting] = useState<ISubscriptionPlanConfig | null>(
    null,
  );
  const [editing, setEditing] = useState<ISubscriptionPlanConfig | null>(null);

  const handleView = (employee: ISubscriptionPlanConfig) => {
    setViewing(employee); // শুধু state সেট করছি, dialog নিজে বাইরে render হবে
  };

  const handleEdit = (employee: ISubscriptionPlanConfig) => {
    console.log("edit employee", employee);
    setEditing(employee); // শুধু state সেট করছি, dialog নিজে বাইরে render হবে
  };

  const handleDelete = (employee: ISubscriptionPlanConfig) => {
    setDeleting(employee); // শুধু state সেট করছি, dialog নিজে বাইরে render হবে
  };

  return (
    <>
      {/* subscirption plan config table */}
      <DataTable
        title="Subscription Plan"
        description="Manage your Subscription Plan Configuration here."
        data={plans || []}
        columns={subscriptionPlanConfigColumn}
        isLoading={isLoading}
        emptyMessage="No employees found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search employees...",
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
          onEdit: handleEdit,
        }}
      />

      {/* view subscription plan dialog */}
      <ViewSubscriptionPlanDialog
        planData={viewing}
        open={!!viewing}
        onOpenChange={(open) => {
          if (!open) setViewing(null);
        }}
      />

      {/* ✅ Edit dialog — THIS IS WHERE YOU USE IT */}
      <EditSubscriptionPlanConfigDialog
        planData={editing}
        open={!!editing}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
      />

      {/* Delete employee dialog */}
      <DeletePopUpDialog
        open={!!deleting}
        onOpenChange={(open) => {
          if (!open) setDeleting(null);
        }}
        title="Delete Employee"
        itemName={deleting?.name}
        deleteAction={() => deleteSubscriptionPlanConfig(deleting!.id)}
        queryKey={["companyEmployees"]}
        successMessage="Employee deleted successfully"
        errorMessage="Failed to delete employee"
      />
    </>
  );
};

export default ManageSubscriptionPlanTable;
