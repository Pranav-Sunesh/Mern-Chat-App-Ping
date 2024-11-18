import { Request,  Response } from 'express';
import { users } from '../../config/db';
import { passCompare } from '../../services/hashing/passCompare';
import { jwtSigning } from '../../services/jwtSigning';

export const loginCall = async(req: Request, res: Response): Promise<Response | any> => {
    const { username, password } = req.body;
    
    try {
        const user = await users.find({username: username}).toArray();
        if(user.length === 0){
            return res.status(404).json({error: "User does not exist"});
        }
        const userId: string = user[0].userId;
        const userPassword = user[0].password;
        const credValid = passCompare(password, userPassword);
        if(credValid){
            const token: string = jwtSigning(userId, username);
            res.status(200).json({token: token});
        }else{
            console.log("Cred invalid");
            res.status(400).json({error: "Invalid cred"});
        }
    } catch (error) {
        console.log(error);
    }
}