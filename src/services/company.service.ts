/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpServer } from "@/lib/http/httpServer";
import { IApiRequestOptions } from "@/lib/http/types";
import { ICompany } from "@/types/company.type";

const getCompanyDetails = async () => {
    const result = await httpServer.get<ICompany>("/api/v1/companies/own-company");

    return result;
}

const updateCompanyDetails = async (payload: any, options?: IApiRequestOptions) => {
    const result = await httpServer.patch("/api/v1/companies/own-company", payload, options);

    return result;
}

export const companyService = {
    getCompanyDetails,
    updateCompanyDetails,
};