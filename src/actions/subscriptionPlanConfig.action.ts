"use server";

import { subscriptionPlanConfigService } from "@/services/subscriptionPlanConfig.service";

export const getAllSubscriptionPlanConfig = async () => {
    const result = await subscriptionPlanConfigService.getAllSubscriptionPlanConfig();

    return result;
}