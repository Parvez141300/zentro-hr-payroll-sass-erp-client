import { getCompanyDesignations } from "@/actions/designation.action";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

const ManageDesignation = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObject = await searchParams;

  const queryString = Object.keys(queryParamsObject)
    .map((key) => `${key}=${queryParamsObject[key]}`)
    .join("&");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["companyDesignations", queryString],
    queryFn: () => getCompanyDesignations(queryString),
  });
  return <div>ManageDesignation</div>;
};

export default ManageDesignation;
