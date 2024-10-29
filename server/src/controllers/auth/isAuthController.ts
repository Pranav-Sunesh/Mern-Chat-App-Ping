import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secretKey } from "../../config/envConfig";

export const isAuthCall = async(req: Request, res: Response): Promise<void> => {
    const token: string = req.headers.authorization?.split(' ')[1]!;
    jwt.verify(token, secretKey, (err, decode) => {
        if(err){
            return res.json({auth: false})
        }
        res.json({auth: true});
    })
}   