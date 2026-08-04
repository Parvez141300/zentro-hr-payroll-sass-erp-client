"use client";
import { getCompanyDesignations } from "@/actions/designation.action";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ManageDesignationTable = ({ queryString }: { queryString?: string }) => {
    const { data: departmentResponse, isLoading } = useQuery({
    queryKey: ["companyDesignations", queryString],
    queryFn: () => getCompanyDesignations(queryString),
  });

  const departmentData = departmentResponse?.data;
  const designations = departmentData?.data;
  const paginationMeta = departmentData?.pagination;

  console.log('designation & paginationMeta', designations, paginationMeta);

  return <div>ManageDesignationTable</div>;
};

export default ManageDesignationTable;
