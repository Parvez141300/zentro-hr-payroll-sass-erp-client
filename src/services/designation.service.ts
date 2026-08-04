import { httpServer } from "@/lib/http/httpServer";
import { ICreateCompanyDesignation, IDesignation } from "@/types/designation.type";
import { IPaginatedData } from "@/types/pagination.type";

const getCompanyDesignations = async (queryString?: string) => {
    const response = await httpServer.get<IPaginatedData<IDesignation[]>>(`/api/v1/designations?${queryString}`);

    return response;
};

const createCompanyDesignation = async (payload: ICreateCompanyDesignation) => {
    const response = await httpServer.post("/api/v1/designations", payload);

    return response;
};

export const designationService = {
    getCompanyDesignations,
    createCompanyDesignation,
};