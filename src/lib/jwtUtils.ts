import jwt, { JwtPayload } from "jsonwebtoken";

export interface JwtResponse {
    companyId: string;
    userId: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    isDeleted: boolean;
    iat: number;
    exp: number;
}

const verifyToken = async (token: string, secret: string) => {
    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        return decoded;
    } catch (error) {
        console.log('This error is from verifyToken: ', error);
    }
}

const decodedToken = async (token: string) => {
    const decoded = jwt.decode(token) as JwtPayload;
    return decoded
}

export const jwtUtils = {
    verifyToken,
    decodedToken,
}