"use server";

import { IApiRequestOptions } from "@/lib/http/types";
import { leaveTypeService } from "@/services/leaveType.service";
import { ICreateCompanyLeaveType } from "@/types/leaveType.type";

export const getCompanyLeaveTypes = async (queryString?: string) => {
    const result = await leaveTypeService.getCompanyLeaveTypes(queryString);

    return result
};

export const createCompanyLeaveType = async (payload: ICreateCompanyLeaveType, options?: IApiRequestOptions) => {
    const result = await leaveTypeService.createCompanyLeaveType(payload, options);

    return result
}

export const deleteCompanyLeaveType = async (leaveTypeId: string) => {
    const result = await leaveTypeService.deleteCompanyLeaveType(leaveTypeId);

    return result
};