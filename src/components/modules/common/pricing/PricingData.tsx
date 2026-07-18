// src/app/(common)/pricing/page.tsx
"use client";

import { getAllSubscriptionPlanConfig } from "@/actions/subscriptionPlanConfig.action";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Loader2 } from "lucide-react";
import PricingPlans, { Plan } from "./PricingPlans";

export default function PricingPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subscription-plans-config"],
    queryFn: () => getAllSubscriptionPlanConfig(),
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Failed to load pricing plans</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  const plans = (data?.data as Plan[]) || [];

  console.log("Pricing plans:", plans);
  if (plans.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No pricing plans available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <PricingPlans plans={plans} />
    </div>
  );
}
