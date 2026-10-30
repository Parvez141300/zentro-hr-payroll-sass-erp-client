/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpServer } from "@/lib/http/httpServer";
import { IApiRequestOptions } from "@/lib/http/types";
import { IPaginatedData } from "@/types/pagination.type";
import { IUser } from "@/types/user.type";


const createCompanyHr = async (payload: any, options?: IApiRequestOptions) => {
    const result = await httpServer.post("/api/v1/users/create-company-hr", payload, options);

    return result;
}

const createCompanyAccountant = async (payload: any, options?: IApiRequestOptions) => {
    const result = await httpServer.post("/api/v1/users/create-company-accountant", payload, options);

    return result;
}

const createCompanyDepartmentHead = async (payload: any, options?: IApiRequestOptions) => {
    const result = await httpServer.post("/api/v1/users/create-company-department-head", payload, options);

    return result;
}

const createCompanyEmployee = async (payload: any, options?: IApiRequestOptions) => {
    const result = await httpServer.post("/api/v1/users/create-company-employee", payload, options);

    return result;
}

const getAllUser = async (queryString?: string) => {
    const result = await httpServer.get<IPaginatedData<IUser[]>>(`/api/v1/users/all-users?${queryString}`);

    return result;
}

const deleteUser = async (userId: string) => {
    const result = await httpServer.delete(`/api/v1/users/delete/${userId}`);

    return result;
}

export const userService = {
    createCompanyHr,
    createCompanyAccountant,
    createCompanyDepartmentHead,
    createCompanyEmployee,
    getAllUser,
    deleteUser,
};