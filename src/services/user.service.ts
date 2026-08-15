/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpServer } from "@/lib/http/httpServer";
import { IApiRequestOptions } from "@/lib/http/types";


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

export const userService = {
    createCompanyHr,
    createCompanyAccountant,
    createCompanyDepartmentHead,
    createCompanyEmployee,
};