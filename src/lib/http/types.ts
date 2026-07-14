export interface ApiRequestOptions {
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}