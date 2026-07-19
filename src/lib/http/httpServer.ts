import { serverTokenRefresh } from "../auth/refresh.server";
import { cookieUtils } from "../cookieUtilts";
import { tokenUtils } from "../tokenUtils";
import { axiosServerInstance } from "./axios.server";
import { IApiRequestOptions, IApiResponse } from "./types";
import { handleAxiosError } from "../axios/handleAxiosError";

async function getValidCookieHeader(): Promise<string> {
    let accessToken = await cookieUtils.getCookie("accessToken");
    const refreshToken = await cookieUtils.getCookie("refreshToken");
    const sessionToken = await cookieUtils.getCookie("better-auth.session_token");

    if (accessToken && refreshToken && sessionToken) {
        const accessExpired = await tokenUtils.isTokenExpired(accessToken);

        if (accessExpired) {
            const refreshExpired = await tokenUtils.isTokenExpired(refreshToken);

            if (refreshExpired) {
                throw new Error("Login Again");
            }

            const refreshed = await serverTokenRefresh(refreshToken, sessionToken);

            if (!refreshed) {
                throw new Error("Refresh Failed");
            }

            // রিফ্রেশের পর নতুন accessToken আবার কুকি থেকে পড়ুন
            accessToken = await cookieUtils.getCookie("accessToken");
        }
    }

    // Cookie header বানানো — যা যা আছে সব জুড়ে দিন
    const cookiePairs: string[] = [];
    if (accessToken) cookiePairs.push(`accessToken=${accessToken}`);
    if (refreshToken) cookiePairs.push(`refreshToken=${refreshToken}`);
    if (sessionToken) cookiePairs.push(`better-auth.session_token=${sessionToken}`);

    return cookiePairs.join("; ");
}

const serverGet = async <TData>(url: string, options?: IApiRequestOptions) => {
    const cookieHeader = await getValidCookieHeader();

    try {
        const response = await axiosServerInstance.get<IApiResponse<TData>>(url, {
            params: options?.params,
            headers: {
                ...options?.headers,
                Cookie: cookieHeader, // <- এখন backend req.cookies দিয়ে পড়তে পারবে
            },
        });

        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
}

const serverPost = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {
    const cookieHeader = await getValidCookieHeader();

    try {
        const response = await axiosServerInstance.post<IApiResponse<TData>>(url, data, {
            params: options?.params,
            headers: {
                ...options?.headers,
                Cookie: cookieHeader,
            },
        });

        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
}

const serverPut = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {
    const cookieHeader = await getValidCookieHeader();

    try {
        const response = await axiosServerInstance.put<IApiResponse<TData>>(url, data, {
            params: options?.params,
            headers: {
                ...options?.headers,
                Cookie: cookieHeader,
            },
        });

        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
}

const serverPatch = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {
    const cookieHeader = await getValidCookieHeader();

    try {
        const response = await axiosServerInstance.patch<IApiResponse<TData>>(url, data, {
            params: options?.params,
            headers: {
                ...options?.headers,
                Cookie: cookieHeader,
            },
        });

        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
}

const serverDelete = async <TData>(url: string, options?: IApiRequestOptions) => {
    const cookieHeader = await getValidCookieHeader();

    try {
        const response = await axiosServerInstance.delete<IApiResponse<TData>>(url, {
            params: options?.params,
            headers: {
                ...options?.headers,
                Cookie: cookieHeader,
            },
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