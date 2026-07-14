import { clientTokenRefresh } from "../auth/refresh.client";
import { axiosClientInstance } from "./axios.client";
import { IApiRequestOptions, IApiResponse } from "./types";


// Track if token refresh is in progress
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

// Process the queue of failed requests
const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });
    failedQueue = [];
};

// Response interceptor
axiosClientInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If refresh is already in progress, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        // Retry the original request with new token
                        return axiosClientInstance(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshed = await clientTokenRefresh();

                if (refreshed) {
                    // Refresh successful - process queue
                    processQueue(null);
                    // Retry the original request
                    return axiosClientInstance(originalRequest);
                } else {
                    // Refresh failed - reject all queued requests
                    processQueue(new Error("Refresh token failed"));
                    // Redirect to login
                    if (typeof window !== "undefined") {
                        window.location.href = "/login";
                    }
                    return Promise.reject(error);
                }
            } catch (refreshError) {
                processQueue(refreshError as Error);
                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);


const clientGet = async <TData>(url: string, options?: IApiRequestOptions) => {

    const response = await axiosClientInstance.get<IApiResponse<TData>>(url, {
        params: options?.params,
        headers: options?.headers,
    });

    return response.data;
}

const clientPost = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {

    const response = await axiosClientInstance.post<IApiResponse<TData>>(url, data, {
        params: options?.params,
        headers: options?.headers,
    });

    return response.data;
}

const clientPut = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {

    const response = await axiosClientInstance.put<IApiResponse<TData>>(url, data, {
        params: options?.params,
        headers: options?.headers,
    });

    return response.data;
}

const clientPatch = async <TData>(url: string, data?: unknown, options?: IApiRequestOptions) => {

    const response = await axiosClientInstance.patch<IApiResponse<TData>>(url, data, {
        params: options?.params,
        headers: options?.headers,
    });

    return response.data;
}

const clientDelete = async <TData>(url: string, options?: IApiRequestOptions) => {

    const response = await axiosClientInstance.delete<IApiResponse<TData>>(url, {
        params: options?.params,
        headers: options?.headers,
    });

    return response.data;
}

export const httpClient = {
    get: clientGet,
    post: clientPost,
    patch: clientPatch,
    put: clientPut,
    delete: clientDelete,
}