import { serverTokenRefresh } from "../auth/refresh.server";
import { cookieUtils } from "../cookieUtilts";
import { tokenUtils } from "../tokenUtils";
import { axiosServerInstance } from "./axios.server";
import { IApiRequestOptions, IApiResponse } from "./types";
import { handleAxiosError } from "../axios/handleAxiosError";

async function checkAndRefreshToken() {

    const accessToken =
        await cookieUtils.getCookie("accessToken");

    const refreshToken =
        await cookieUtils.getCookie("refreshToken");

    const sessionToken =
        await cookieUtils.getCookie("better-auth.session_token");

    if (
        !accessToken ||
        !refreshToken ||
        !sessionToken
    ) {
        return;
    }

    const accessExpired =
        await tokenUtils.isTokenExpired(accessToken);

    if (!accessExpired) {
        return;
    }

    const refreshExpired =
        await tokenUtils.isTokenExpired(refreshToken);

    if (refreshExpired) {
        throw new Error("Login Again");
    }

    const refreshed =
        await serverTokenRefresh(refreshToken, sessionToken);

    if (!refreshed) {
        throw new Error("Refresh Failed");
    }
}

const serverGet = async <TData>(url: string, options?: IApiRequestOptions) => {
    await checkAndRefreshToken();

    try {
        const response = await axiosServerInstance.get<IApiResponse<TData>>(url, {
            params: options?.params,
            headers: options?.headers,
        });

        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
}

const serverPost = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {
    await checkAndRefreshToken();

    try {
        const response = await axiosServerInstance.post<IApiResponse<TData>>(url, data, {
            params: options?.params,
            headers: options?.headers,
        });

        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
}

const serverPut = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {
    await checkAndRefreshToken();

    try {
        const response = await axiosServerInstance.put<IApiResponse<TData>>(url, data, {
            params: options?.params,
            headers: options?.headers,
        });

        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
}

const serverPatch = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {
    await checkAndRefreshToken();

    try {
        const response = await axiosServerInstance.patch<IApiResponse<TData>>(url, data, {
            params: options?.params,
            headers: options?.headers,
        });

        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
}

const serverDelete = async <TData>(url: string, options?: IApiRequestOptions) => {
    await checkAndRefreshToken();

    try {
        const response = await axiosServerInstance.delete<IApiResponse<TData>>(url, {
            params: options?.params,
            headers: options?.headers,
        });

        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
}

export const httpServer = {
    get: serverGet,
    post: serverPost,
    put: serverPut,
    patch: serverPatch,
    delete: serverDelete,
}