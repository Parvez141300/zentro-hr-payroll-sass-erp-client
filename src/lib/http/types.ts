export interface IApiRequestOptions {
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
}

export interface IApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}