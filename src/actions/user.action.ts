/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiRequestOptions } from "@/lib/http/types";
import { userService } from "@/services/user.service";

export const createCompanyHr = async (payload: any, options?: IApiRequestOptions) => {
    const result = await userService.createCompanyHr(payload, options);

    return result;
};

export const createCompanyAccountant = async (payload: any, options?: IApiRequestOptions) => {
    const result = await userService.createCompanyAccountant(payload, options);

    return result;
};

export const createCompanyDepartmentHead = async (payload: any, options?: IApiRequestOptions) => {
    const result = await userService.createCompanyDepartmentHead(payload, options);

    return result;
};

export const createCompanyEmployee = async (payload: any, options?: IApiRequestOptions) => {
    const result = await userService.createCompanyEmployee(payload, options);

    return result;
};

export const getAllUser = async (queryString?: string) => {
    const result = await userService.getAllUser(queryString);

    return result;
}

export const deleteUser =async (userId: string) => {
    const result = await userService.deleteUser(userId);

    return result;
}