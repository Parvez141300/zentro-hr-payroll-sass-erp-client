import { httpServer } from "@/lib/http/httpServer";
import { ILeave } from "@/types/leave.type";
import { IPaginatedData } from "@/types/pagination.type";

const getCompanyLeaves = async (queryString?: string) => {
    const result = await httpServer.get<IPaginatedData<ILeave[]>>(`/api/v1/leaves?${queryString}`);

    return result;
}

const deleteEmployeeLeave = async (leaveId: string) => {
    const result = await httpServer.delete(`/api/v1/leaves/${leaveId}`);

    return result;
}

export const leaveService = {
    getCompanyLeaves,
    deleteEmployeeLeave,
}