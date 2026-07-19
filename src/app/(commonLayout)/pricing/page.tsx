
import PricingData from "@/components/modules/common/pricing/PricingData";
import { subscriptionPlanConfigService } from "@/services/subscriptionPlanConfig.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const PricingPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["subscription-plans-config"],
    queryFn: () => subscriptionPlanConfigService.getAllSubscriptionPlanConfig(),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 1 day
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PricingData />
    </HydrationBoundary>
  );
};

export default PricingPage;
