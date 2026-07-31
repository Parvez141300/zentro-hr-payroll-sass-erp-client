/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpServer } from "@/lib/http/httpServer";


const createCompanyHr = async (payload: any) => {
    const result = await httpServer.post("/api/v1/users/create-company-hr", payload);

    return result;
}

export const userService = {
    createCompanyHr,
};