

import { cookieUtils } from "@/lib/cookieUtilts";
import { envVars } from "@/lib/env";

export const serverTokenRefresh = async (refreshToken: string, betterAuthSessionToken: string) => {
    try {
        const response = await fetch(`${envVars.BACKEND_URL}/api/v1/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `refreshToken=${refreshToken}; better-auth.session_token=${betterAuthSessionToken}`,
            },
        });

        if (!response.ok) return null;

        const data = await response.json();
        const { accessToken, refreshToken: newRefreshToken, betterAuthSessionToken: newSession } = data;

        // কুকি সেট করার চেষ্টা (Server Component-এ fail করতে পারে, তাই try/catch)
        try {
            if (accessToken) await cookieUtils.setCookie("accessToken", accessToken, 60 * 60 * 24);
            if (newRefreshToken) await cookieUtils.setCookie("refreshToken", newRefreshToken, 60 * 60 * 24 * 7);
            if (newSession) await cookieUtils.setCookie("better-auth.session_token", newSession, 60 * 60 * 24);
        } catch {
            // Server Component থেকে call হলে কুকি সেট হবে না, কিন্তু এই রিকোয়েস্ট চালাতে টোকেন রিটার্ন করছি
        }

        return {
            accessToken: accessToken as string | undefined,
            refreshToken: (newRefreshToken ?? refreshToken) as string,
            sessionToken: (newSession ?? betterAuthSessionToken) as string,
        };
    } catch (error) {
        console.error("Error refreshing token:", error instanceof Error ? error.message : error);
        return null;
    }
};