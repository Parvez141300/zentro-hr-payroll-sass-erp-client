"use server";

import { subscriptionPlanConfigService } from "@/services/subscriptionPlanConfig.service";

export const getAllSubscriptionPlanConfig = async (queryString?: string) => {
    const result = await subscriptionPlanConfigService.getAllSubscriptionPlanConfig(queryString);

    return result;
}

export const deleteSubscriptionPlanConfig = async (planId: string) => {
    const result = await subscriptionPlanConfigService.deleteSubscriptionPlanConfig(planId);

    return result
}