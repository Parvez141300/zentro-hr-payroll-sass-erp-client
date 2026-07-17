"use client";
import { getAllSubscriptionPlanConfig } from "@/actions/subscriptionPlanConfig.action";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PricingData = () => {
  const { data } = useQuery({
    queryKey: ["subscription-plans-config"],
    queryFn: () => getAllSubscriptionPlanConfig(),
  });
  console.log('pricing data', data);
  return <div>PricingData</div>;
};

export default PricingData;
