import { httpServer } from "@/lib/http/httpServer"
import { IPaginatedData } from "@/types/pagination.type";
import { ISubscriptionPlanConfig } from "@/types/subscriptionPlanConfig.type";

const getAllSubscriptionPlanConfig = async (queryString?: string) => {
    const result = await httpServer.get<IPaginatedData<ISubscriptionPlanConfig[]>>(`/api/v1/subscription-plans-config?search=${queryString}`);

    return result;
}

export const subscriptionPlanConfigService = {
    getAllSubscriptionPlanConfig
}