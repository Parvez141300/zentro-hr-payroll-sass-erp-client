import axios from "axios";
import { envVars } from "../env";

export const axiosInstance = axios.create({
    baseURL: envVars.NEXT_PUBLIC_BACKEND_URL,
    timeout: 10000,
    withCredentials: true,
});