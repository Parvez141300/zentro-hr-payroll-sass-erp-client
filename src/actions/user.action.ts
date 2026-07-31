/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { userService } from "@/services/user.service";

export const createCompanyHr = async (payload: any) => {
    const result = await userService.createCompanyHr(payload);

    return result;
};