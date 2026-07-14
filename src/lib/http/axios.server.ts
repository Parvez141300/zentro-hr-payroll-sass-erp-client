import axios from "axios";
import { envVars } from "../env";

export const axiosServerInstance = axios.create({
    baseURL: envVars.BACKEND_URL,
    timeout: 10000,
    withCredentials: true,
});