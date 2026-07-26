/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpServer } from "@/lib/http/httpServer";
import { IApiRequestOptions } from "@/lib/http/types";

const updateSuperAdminProfile = async (endpoint: string, payload: any, options: IApiRequestOptions) => {
    const response = await httpServer.patch(endpoint, payload, options);
    return response;
};


export const superAdminService = { updateSuperAdminProfile };