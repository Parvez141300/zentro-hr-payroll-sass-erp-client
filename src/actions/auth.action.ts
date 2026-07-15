// /* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { authService } from "@/services/auth.service";
import { ILoginPayload, IRegisterPayload } from "@/types/auth.type";

// import { cookieUtils } from "@/lib/cookieUtilts";
// import { envVars } from "@/lib/env";
// import { headers } from "next/headers";

// export const getNewTokenWithRefreshToken = async (refreshToken: string, betterAuthSessionToken: string) => {
//     try {
//         const requestHeaders = await headers();

//         let response;

//         response = await fetch(`${envVars.BACKEND_URL}/api/v1/refresh-token`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Cookie: `refreshToken=${refreshToken}; better-auth.session_token=${betterAuthSessionToken}`
//             }
//         });

//         if (requestHeaders.get("X-Refresh-Token-Refresh")) {
//             response = await fetch(`${envVars.BACKEND_URL}/api/v1/refresh-token`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Cookie: `refreshToken=${refreshToken}; better-auth.session_token=${betterAuthSessionToken}`
//                 }
//             });
//         }

//         if (response.ok) {

//             const data = await response.json();

//             const { accessToken, refreshToken: newRefreshToken, betterAuthSessionToken: newBetterAuthSessionToken } = data;

//             // Set the new tokens in cookies

//             if (accessToken) {
//                 // set access token for 1 day
//                 await cookieUtils.setCookie("accessToken", accessToken, 60 * 60 * 24);
//             }
//             if (newRefreshToken) {
//                 // set refresh token for 7 days
//                 await cookieUtils.setCookie("refreshToken", newRefreshToken, 60 * 60 * 24 * 7);
//             }
//             if (newBetterAuthSessionToken) {
//                 // set better auth session token for 1 day
//                 await cookieUtils.setCookie("better-auth.session_token", newBetterAuthSessionToken, 60 * 60 * 24);
//             }

//             return true;
//         }
//         else {
//             return false;
//         }
//     } catch (error: any) {
//         console.error("Error refreshing token:", error.message);
//         return false;
//     }
// };

export const registerSuperAdmin = async (payload: IRegisterPayload) => {
    const result = await authService.registerSuperAdminUser(payload);

    return result;
};

export const loginUser = async (payload: ILoginPayload, redirectPath?: string) => {
    const result = await authService.loginUser(payload, redirectPath);

    return result;
};
