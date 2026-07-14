import { axiosClientInstance } from "../http/axios.client";

export const clientTokenRefresh = async () => {
    try {
        await axiosClientInstance.post("/api/v1/refresh-token");

        return true;
    } catch {
        return false;
    }
}
