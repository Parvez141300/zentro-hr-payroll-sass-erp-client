import { httpServer } from "@/lib/http/httpServer"

const getAllSubscriptionPlanConfig = async (queryString?: string) => {
    const result = await httpServer.get(`/api/v1/subscription-plans-config?search=${queryString}`);

    return result;
}

export const subscriptionPlanConfigService = {
    getAllSubscriptionPlanConfig
}