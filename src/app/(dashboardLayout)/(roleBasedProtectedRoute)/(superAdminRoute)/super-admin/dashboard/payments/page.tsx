import { QueryClient } from "@tanstack/react-query";
import React from "react";

const PaymentsPage = async ({
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
    queryKey: ["company-payments", queryString],
    // queryFn: () => (queryString),
  });
  return <div>PaymentsPage</div>;
};

export default PaymentsPage;
