// src/lib/env.ts

interface IClientEnv {
    NEXT_PUBLIC_FRONTEND_URL: string;
    NEXT_PUBLIC_BACKEND_URL: string;
}

interface IServerEnv {
    APP_ENV: string;
    FRONTEND_URL: string;
    BACKEND_URL: string;
    JWT_TOKEN_SECRET: string;
}

const isServer = typeof window === "undefined";

// ─── Validate client env (runs both server & client, safe) ───
function loadClientEnv(): IClientEnv {
    const frontend = process.env.NEXT_PUBLIC_FRONTEND_URL; // ✅ Literal, will be inlined
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL;   // ✅ Literal, will be inlined

    if (!frontend) throw new Error("Missing environment variable: NEXT_PUBLIC_FRONTEND_URL");
    if (!backend) throw new Error("Missing environment variable: NEXT_PUBLIC_BACKEND_URL");

    return {
        NEXT_PUBLIC_FRONTEND_URL: frontend,
        NEXT_PUBLIC_BACKEND_URL: backend,
    };
}

// ─── Validate server env (runs only on server) ───
function loadServerEnv(): IServerEnv {
    const required = ["APP_ENV", "FRONTEND_URL", "BACKEND_URL", "JWT_TOKEN_SECRET"] as const;

    required.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing environment variable: ${key}`);
        }
    });

    return {
        APP_ENV: process.env.APP_ENV as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        BACKEND_URL: process.env.BACKEND_URL as string,
        JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET as string,
    };
}

// ─── Exports ───
// Safe to import anywhere (client or server)
export const clientEnv = loadClientEnv();

// Server-only — throws if imported in a client component
export const serverEnv: IServerEnv = isServer
    ? loadServerEnv()
    : (new Proxy({} as IServerEnv, {
        get() {
            throw new Error(
                "serverEnv cannot be used in client components. Use clientEnv instead."
            );
        },
    }));

// Convenience: for server-only files that need everything
export const envVars = { ...clientEnv, ...serverEnv };