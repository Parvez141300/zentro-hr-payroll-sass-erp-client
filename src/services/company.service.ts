import { httpServer } from "@/lib/http/httpServer";
import { ICompany } from "@/types/company.type";

const getCompanyDetails = async () => {
    const result = await httpServer.get<ICompany>("/api/v1/companies/own-company");

    return result;
}

export const companyService = { 
    getCompanyDetails 
};