/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiRequestOptions } from "@/lib/http/types";
import { superAdminService } from "@/services/superAdmin.service";

export const updateSuperAdminProfile = async (endpoint: string, payload: any, options: IApiRequestOptions) => {
    const result = await superAdminService.updateSuperAdminProfile(endpoint, payload, options);

    return result;
};