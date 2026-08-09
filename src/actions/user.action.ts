/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiRequestOptions } from "@/lib/http/types";
import { userService } from "@/services/user.service";

export const createCompanyHr = async (payload: any, options?: IApiRequestOptions) => {
    const result = await userService.createCompanyHr(payload, options);

    return result;
};