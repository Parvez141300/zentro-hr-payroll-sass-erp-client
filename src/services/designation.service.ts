import { httpServer } from "@/lib/http/httpServer";
import { IDesignation } from "@/types/designation.type";
import { IPaginatedData } from "@/types/pagination.type";

const getCompanyDesignations = async (queryString?: string) => {
    const response = await httpServer.get<IPaginatedData<IDesignation[]>>(`/api/v1/designations?${queryString}`);

    return response;
};

export const designationService = {
    getCompanyDesignations
};