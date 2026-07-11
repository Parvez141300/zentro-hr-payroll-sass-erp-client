
interface IEnvVariableConfig {
    FRONTEND_URL: string;
    BACKEND_URL: string;
    NEXT_PUBLIC_FRONTEND_URL: string;
    NEXT_PUBLIC_BACKEND_URL: string;
}

export const loadEnvVariables = (): IEnvVariableConfig => {
    const requiredEnvVariables = [
        "FRONTEND_URL",
        "BACKEND_URL",
        "NEXT_PUBLIC_FRONTEND_URL",
        "NEXT_PUBLIC_BACKEND_URL",
    ]
    requiredEnvVariables.forEach((envVariable) => {
        if (!process.env[envVariable]) {
            throw new Error(`Missing environment variable: ${envVariable}`)
        }
    });
    return {
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        BACKEND_URL: process.env.BACKEND_URL as string,
        NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL as string,
        NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    }
}

export const envVars = loadEnvVariables();