import { httpServer } from "@/lib/http/httpServer"

const getAllSubscriptionPlanConfig = async () => {
    const result = await httpServer.get("/api/v1/subscription-plans-config");

    return result;
}

export const subscriptionPlanConfigService = { 
    getAllSubscriptionPlanConfig
}