import { httpServer } from "@/lib/http/httpServer";
import { IAccountant } from "@/types/accountant.type";
import { IPaginatedData } from "@/types/pagination.type";

const getCompanyAccountants = async (queryString?: string) => {
    const result = await httpServer.get<IPaginatedData<IAccountant[]>>(`/api/v1/accountants?${queryString}`);

    return result
}

const deleteCompanyAccountant = async (accountantId: string) => {
    const result = await httpServer.delete(`/api/v1/accountants/${accountantId}`);

    return result;
}

export const accountantService = { 
    getCompanyAccountants, 
    deleteCompanyAccountant,
}