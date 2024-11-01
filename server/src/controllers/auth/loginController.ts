import { Request,  Response } from 'express';
import { users } from '../../config/db';
import { passCompare } from '../../services/hashing/passCompare';
import { jwtSigning } from '../../services/hashing/jwtSigning';
import { strict } from 'assert';

export const loginCall = async(req: Request, res: Response) => {
    const { username, password } = req.body;
    
    try {
        const user = await users.find({username: username}).toArray();
        const userId: string = user[0].userId;
        const userPassword = user[0].password;
        const credValid = passCompare(password, userPassword);
        if(credValid){
            const token: string = jwtSigning(userId, username);
            res.status(200).json({token: token});
        }else{
            console.log("Cred invalid");
            res.status(400).json("invalid cred");
        }
    } catch (error) {
        console.log(error);
    }
}