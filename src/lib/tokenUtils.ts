import { JwtPayload } from "jsonwebtoken";
import { envVars } from "./env";
import { jwtUtils } from "./jwtUtils";
import { cookieUtils } from "./cookieUtilts";

const getTokenSecondsRemaining = async (token: string) => {
    if (!token) return 0;

    const decoded = await jwtUtils.verifyToken(token, envVars.JWT_TOKEN_SECRET) as JwtPayload;

    const secondsRemaining = (decoded.exp as number) - (Date.now() / 1000) as number;

    return secondsRemaining > 0 ? secondsRemaining : 0;
}

const setTokenInCookie = async (name: string, value: string, fallbackMaxAgeInSeconds = 60 * 60 * 24) => {
    let maxAgeInSeconds;

    if(name !== "better-auth.session_token") {
        maxAgeInSeconds = 60 * 60 * 24;
    } else {
        maxAgeInSeconds = fallbackMaxAgeInSeconds;
    }

    await cookieUtils.setCookie(name, value, maxAgeInSeconds);
}

const isTokenExpired = async (token: string) => {
    const secondsRemaining = await getTokenSecondsRemaining(token);
    return secondsRemaining === 0;
}

export const tokenUtils = {
    getTokenSecondsRemaining,
    setTokenInCookie,
    isTokenExpired,
}