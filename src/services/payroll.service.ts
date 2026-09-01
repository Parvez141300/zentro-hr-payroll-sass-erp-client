import { httpServer } from "@/lib/http/httpServer";
import { IPaginatedData } from "@/types/pagination.type";
import { IGeneratePayroll, IPayroll } from "@/types/payroll.type";

const getCompanyPayroll = async (queryString?: string) => {
    const response = await httpServer.get<IPaginatedData<IPayroll[]>>(`/api/v1/payrolls?${queryString}`);

    return response;
};

const generateCompanyPayroll = async (payload: IGeneratePayroll) => {
    const response = await httpServer.post("/api/v1/payrolls", payload);

    return response;
};

const deleteCompanyPayroll = async (payrollId: string) => {
    const response = await httpServer.delete(`/api/v1/payrolls/${payrollId}`);

    return response;
};

export const payrollService = {
    getCompanyPayroll,
    deleteCompanyPayroll,
    generateCompanyPayroll,
};