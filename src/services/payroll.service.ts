import { httpServer } from "@/lib/http/httpServer";
import { IPaginatedData } from "@/types/pagination.type";
import { IPayroll } from "@/types/payroll.type";

const getCompanyPayroll = async (queryString?: string) => {
    const response = await httpServer.get<IPaginatedData<IPayroll>>(`/api/v1/payrolls?${queryString}`);

    return response;
};

export const payrollService = {
    getCompanyPayroll,
};