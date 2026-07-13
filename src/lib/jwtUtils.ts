import jwt, { JwtPayload } from "jsonwebtoken";

const verifyToken = async (token: string, secret: string) => {
    try {
        const decoded = jwt.verify(token, secret);
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