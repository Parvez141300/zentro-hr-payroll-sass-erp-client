"use client";

import { getAllCompany } from "@/actions/company.action";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { IUser } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

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
    queryFn: () => getAllCompany(queryString),
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

  return <div>ManageAllUserTable</div>;
};

export default ManageAllUserTable;
