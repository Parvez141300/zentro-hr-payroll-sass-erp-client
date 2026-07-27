import axios from "axios";
import { envVars } from "../env";

export const axiosServerInstance = axios.create({
    baseURL: envVars.BACKEND_URL,
    timeout: 60000, // 60 seconds
    withCredentials: true,
});