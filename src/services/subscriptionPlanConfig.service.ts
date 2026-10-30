import { httpServer } from "@/lib/http/httpServer"
import { IPaginatedData } from "@/types/pagination.type";
import { ISubscriptionPlanConfig, IUpdateSubscriptionPlanConfig } from "@/types/subscriptionPlanConfig.type";

const getAllSubscriptionPlanConfig = async (queryString?: string) => {
    const result = await httpServer.get<IPaginatedData<ISubscriptionPlanConfig[]>>(`/api/v1/subscription-plans-config?${queryString}`);

    return result;
}

const updateSubscriptionPlanConfig = async (planId: string, payload: IUpdateSubscriptionPlanConfig) => {
    const result = await httpServer.patch(
        `/api/v1/subscription-plans-config/${planId}`,
        payload
    );

    return result;
}

const deleteSubscriptionPlanConfig = async (planId: string) => {
    const result = await httpServer.delete(`/api/v1/subscription-plans-config/${planId}`);

    return result;
}

export const subscriptionPlanConfigService = {
    getAllSubscriptionPlanConfig,
    deleteSubscriptionPlanConfig,
    updateSubscriptionPlanConfig,
}