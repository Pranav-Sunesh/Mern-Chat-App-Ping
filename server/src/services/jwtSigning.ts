import jwt from "jsonwebtoken";
import { secretKey } from "../config/envConfig";

export const jwtSigning = ( userId: string, username: string) => {
    const token = jwt.sign(
        {userId: userId, username: username},
        secretKey,
        {expiresIn: '1h'}
    );
    return token;
}