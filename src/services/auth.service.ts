
import { cookieUtils } from "@/lib/cookieUtilts";
import { httpServer } from "@/lib/http/httpServer";
import { ILoginPayload, ILoginResponse, IRegisterPayload, IRegisterResponse, IResetPasswordPayload } from "@/types/auth.type";


const registerSuperAdminUser = async (payload: IRegisterPayload) => {

    const registerSuperAdmin = await httpServer.post<IRegisterResponse>("/api/v1/auth/super-admin/register", payload);

    return registerSuperAdmin;
}

const loginUser = async (payload: ILoginPayload, redirectPath?: string) => {
    try {
        console.log("login service", payload);
        const login = await httpServer.post<ILoginResponse>("/api/v1/auth/login", payload);
        const { token, accessToken, refreshToken } = login.data;

        // set token in cookie
        await cookieUtils.setCookie("better-auth.session_token", token, 60 * 60 * 24);
        await cookieUtils.setCookie("accessToken", accessToken, 60 * 60 * 24);
        await cookieUtils.setCookie("refreshToken", refreshToken, 60 * 60 * 24 * 7);

        if (redirectPath) {
            // todo: redirect to dashboard
        }

        return login;
    } catch (error) {
        console.log("This error is from login service", error);
    }
}

const forgotPassword = async (email: string) => {
    const result = await httpServer.post("/api/v1/auth/forget-password", { email });

    return result;
}

const resetPassword = async (payload: IResetPasswordPayload) => {
    const result = await httpServer.post("/api/v1/auth/reset-password", payload);

    return result;
}

const getClientLoggedInUserInfo = async () => {
    const info = await httpServer.get("/api/v1/auth/me");

    return info;
}

export const authService = {
    registerSuperAdminUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getClientLoggedInUserInfo,
}