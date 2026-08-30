import { httpServer } from "@/lib/http/httpServer";
import { IApiRequestOptions } from "@/lib/http/types";
import { ICreateCompanyLeaveType, ILeaveType, IUpdateLeaveType } from "@/types/leaveType.type";
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

const updateCompanyLeaveType = async (leaveTypeId: string, payload: IUpdateLeaveType, options?: IApiRequestOptions) => {
    const result = await httpServer.patch(`/api/v1/leave-types/${leaveTypeId}`, payload, options);

    return result;
}

export const leaveTypeService = {
    getCompanyLeaveTypes,
    deleteCompanyLeaveType,
    createCompanyLeaveType,
    updateCompanyLeaveType,
};