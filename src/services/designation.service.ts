import { httpServer } from "@/lib/http/httpServer";

const getCompanyDesignations = async (queryString?: string) => {
    const response = await httpServer.get(`/api/v1/designations?${queryString}`);

    return response;
};

export const designationService = {
    getCompanyDesignations
};