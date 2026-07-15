
import { httpServer } from "@/lib/http/httpServer";
import { RegisterPayload } from "@/types/auth.type";


const registerSuperAdminUser = async (payload: RegisterPayload) => {

    const registerSuperAdmin = await httpServer.post("/api/v1/auth/super-admin/register", payload);

    return registerSuperAdmin;
}

export const authService = {
    registerSuperAdminUser,
}