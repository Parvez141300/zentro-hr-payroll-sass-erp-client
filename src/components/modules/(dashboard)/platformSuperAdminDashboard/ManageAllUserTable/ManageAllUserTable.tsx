"use client";

import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { IUser } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { userColumn } from "./AllUserColumn";
import { getAllUser } from "@/actions/user.action";

const ManageAllUserTable = ({ queryString }: { queryString: string }) => {
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

  const { data: usersResponse, isLoading } = useQuery({
    queryKey: ["all-user"],
    queryFn: () => getAllUser(queryString),
  });
  console.log("subscription data:", usersResponse);
  const usersData = usersResponse?.data;
  const users = usersData?.data;
  const paginationMeta = usersData?.pagination;

  const [viewing, setViewing] = useState<IUser | null>(null);
  const [deleting, setDeleting] = useState<IUser | null>(null);

  const handleView = (employee: IUser) => {
    setViewing(employee); // শুধু state সেট করছি, dialog নিজে বাইরে render হবে
  };

  const handleDelete = (employee: IUser) => {
    setDeleting(employee); // শুধু state সেট করছি, dialog নিজে বাইরে render হবে
  };

  return (
    <>
      <DataTable
        title="Manage Users"
        description="Manage your site users here."
        data={users ?? []}
        columns={userColumn}
        isLoading={isLoading}
        emptyMessage="No users found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search users...",
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
    </>
  );
};

export default ManageAllUserTable;
