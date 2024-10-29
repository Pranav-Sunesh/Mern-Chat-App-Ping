import { Request , Response } from "express";
import { users } from "../../config/db";
import { passwordHash } from "../../services/hashing/paswordHash";
import { uniqueIdGen } from "../../services/hashing/uniqueIdGen";
import { jwtSigning } from "../../services/hashing/jwtSigning";


export const signupCall = async(req: Request, res: Response) => {
    const { user, password, email, firstName, lastName } = req.body;

    try {
        const userName = await users.find({username: user}).toArray();
        if(userName.length == 0){
            const hashed_password = passwordHash(password);
            const uniqueId = uniqueIdGen();
            const result = await users.insertOne({ userId: uniqueId, username: user, password: hashed_password, email: email, firstName: firstName, lastName: lastName});
            const token = jwtSigning(uniqueId, user);
            console.log({acknowledged: result.acknowledged, token: token});
            res.status(200).json({acknowledged: result.acknowledged, token: token});
        }else{
            console.log("User already exist")
            res.json({error: "User already exist"});
        }
    } catch (error) {
        console.log(error);
    }

    

}