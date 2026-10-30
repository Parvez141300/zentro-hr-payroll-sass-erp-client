"use client";

import { getAllSubscriptionPlanConfig } from "@/actions/subscriptionPlanConfig.action";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ManageSubscriptionPlanTable = ({
  queryString,
}: {
  queryString: string;
}) => {
  const { data: subscriptionPlanConfigResponse, isLoading, error } = useQuery({
    queryKey: ["subscription-plans-config"],
    queryFn: () => getAllSubscriptionPlanConfig(queryString),
  });
  console.log('subscription data:', subscriptionPlanConfigResponse);
  return <div>ManageSubscriptionPlanTable</div>;
};

export default ManageSubscriptionPlanTable;
