import ManageSubscriptionPlanTable from "@/components/modules/(dashboard)/platformSuperAdminDashboard/ManageSubscriptionPlanTable/ManageSubscriptionPlanTable";
import { subscriptionPlanConfigService } from "@/services/subscriptionPlanConfig.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const ManageSubscriptionPlanPage = async ({
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
    queryKey: ["subscription-plans-config"],
    queryFn: () =>
      subscriptionPlanConfigService.getAllSubscriptionPlanConfig(queryString),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 1 day
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManageSubscriptionPlanTable queryString={queryString} />
    </HydrationBoundary>
  );
};

export default ManageSubscriptionPlanPage;
