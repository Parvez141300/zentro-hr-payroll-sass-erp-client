import { httpServer } from "@/lib/http/httpServer";
import { ILeaveType } from "@/types/leaveType.type";
import { IPaginatedData } from "@/types/pagination.type";

const getCompanyLeaveTypes = async (queryString?: string) => {
    const result = await httpServer.get<IPaginatedData<ILeaveType[]>>(`/api/v1/leave-types?${queryString}`);

    return result
}

export const leaveTypeService = {
    getCompanyLeaveTypes,
};