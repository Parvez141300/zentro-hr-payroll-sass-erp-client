import { httpServer } from "@/lib/http/httpServer";
import { IHrManager } from "@/types/hrManager.type";
import { IPaginatedData } from "@/types/pagination.type";

const getCompanyHrs = async (queryString?: string) => {
    const result = await httpServer.get<IPaginatedData<IHrManager[]>>(`/api/v1/hr-managers?${queryString}`);

    return result
}

const deleteCompanyHr = async (hrId: string) => {
    const result = await httpServer.delete(`/api/v1/hr-managers/${hrId}`);

    return result;
}

export const hrService = {
    getCompanyHrs,
    deleteCompanyHr,
}