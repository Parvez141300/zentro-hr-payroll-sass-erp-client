import axios from "axios";

export const handleAxiosError = (error: unknown): never => {
    if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data?.message || error.message);
    }
    throw error;
}