
// import { cookieUtils } from "../cookieUtilts"
// import { tokenUtils } from "../tokenUtils";
// import { getNewTokenWithRefreshToken } from "@/actions/auth.action";
// import axios from "axios";
// import { envVars } from "../env";


// export const axiosInstance = async () => {
//     const accessToken = await cookieUtils.getCookie("accessToken");
//     const refreshToken = await cookieUtils.getCookie("refreshToken");
//     const betterAuthSessionToken = await cookieUtils.getCookie("better-auth.session_token");

//     if (accessToken && refreshToken && betterAuthSessionToken) {
//         const accessTokenExpired = await tokenUtils.isTokenExpired(accessToken as string);
//         const refreshTokenExpired = await tokenUtils.isTokenExpired(refreshToken as string);
//         if (refreshTokenExpired) {
//             // logout
//             throw new Error("Refresh token expired. Please login again.");
//         }
//         if (accessTokenExpired) {
//             await getNewTokenWithRefreshToken(refreshToken as string, betterAuthSessionToken as string);
//         }
//     }

//     const instance = axios.create({
//         baseURL: envVars.NEXT_PUBLIC_BACKEND_URL,
//         timeout: 5000, // 5 seconds if no response then error
//         withCredentials: true,
//     });

//     return instance;
// }

// export interface IApiRequestOptions {
//     params: Record<string, unknown>;
//     headers: Record<string, string>;
// }

// export interface IApiResponse<TData> {
//     success: boolean;
//     message: string;
//     data: TData;
// }

// const httpGet = async <TData>(url: string, options?: IApiRequestOptions) => {
//     const instance = await axiosInstance();

//     const response = await instance.get<IApiResponse<TData>>(url, {
//         params: options?.params,
//         headers: options?.headers,
//     });

//     return response.data;
// }

// const httpPost = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {
//     const instance = await axiosInstance();

//     const response = await instance.post<IApiResponse<TData>>(url, data, {
//         params: options?.params,
//         headers: options?.headers,
//     });

//     return response.data;
// }

// const httpPatch = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {
//     const instance = await axiosInstance();

//     const response = await instance.patch<IApiResponse<TData>>(url, data, {
//         params: options?.params,
//         headers: options?.headers,
//     });

//     return response.data;
// }

// const httpPut = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {
//     const instance = await axiosInstance();

//     const response = await instance.put<IApiResponse<TData>>(url, data, {
//         params: options?.params,
//         headers: options?.headers,
//     });

//     return response.data;
// }

// const httpDelete = async <TData>(url: string, options?: IApiRequestOptions) => {
//     const instance = await axiosInstance();

//     const response = await instance.delete<IApiResponse<TData>>(url, {
//         params: options?.params,
//         headers: options?.headers,
//     });

//     return response.data;
// }

// // export const httpClient = {
// //     get: httpGet,
// //     post: httpPost,
// //     patch: httpPatch,
// //     put: httpPut,
// //     delete: httpDelete,
// // }