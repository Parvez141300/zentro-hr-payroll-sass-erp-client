import { httpServer } from "@/lib/http/httpServer";
import { IApiRequestOptions } from "@/lib/http/types";
import { ICreateCompanyLeaveType, ILeaveType } from "@/types/leaveType.type";
import { IPaginatedData } from "@/types/pagination.type";

const getCompanyLeaveTypes = async (queryString?: string) => {
    const result = await httpServer.get<IPaginatedData<ILeaveType[]>>(`/api/v1/leave-types?${queryString}`);

    return result
}

const createCompanyLeaveType = async (payload: ICreateCompanyLeaveType, options?: IApiRequestOptions) => {
    const result = await httpServer.post("/api/v1/leave-types", payload, options);

    return result;
}

const deleteCompanyLeaveType = async (leaveTypeId: string) => {
    const result = await httpServer.delete(`/api/v1/leave-types/${leaveTypeId}`);

    return result;
}

export const leaveTypeService = {
    getCompanyLeaveTypes,
    deleteCompanyLeaveType,
    createCompanyLeaveType,
};