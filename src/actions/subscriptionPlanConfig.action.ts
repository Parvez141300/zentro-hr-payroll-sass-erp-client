"use server";

import { subscriptionPlanConfigService } from "@/services/subscriptionPlanConfig.service";
import { IUpdateSubscriptionPlanConfig } from "@/types/subscriptionPlanConfig.type";

export const getAllSubscriptionPlanConfig = async (queryString?: string) => {
    const result = await subscriptionPlanConfigService.getAllSubscriptionPlanConfig(queryString);

    return result;
}

export const updateSubscriptionPlanConfig = async (planId: string, payload: IUpdateSubscriptionPlanConfig) => {
    const result = await subscriptionPlanConfigService.updateSubscriptionPlanConfig(planId, payload);

    return result;
}

export const deleteSubscriptionPlanConfig = async (planId: string) => {
    const result = await subscriptionPlanConfigService.deleteSubscriptionPlanConfig(planId);

    return result
}