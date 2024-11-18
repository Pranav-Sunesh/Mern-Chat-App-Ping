import { Request, Response } from "express";
import { requests, users } from "../../config/db";

export const sendRequest = async(req: Request ,res: Response): Promise<Response | any> => {
    const { username, sender } = req.body;
    try {
        // Is the User existing
        const userExist = await users.find({username: username}).toArray();
        if(userExist.length === 0){
            return res.status(404).json({error: "No such user"});
        }

        //Is the already requested
        const isRequested = await requests.find({$and: [{user: username}, {request: sender}]}).toArray();
        if(isRequested.length !== 0){
            return res.status(409).json({error: 'Request already send'});
        }

        //Pending: If user Already users contact

        const result = await requests.updateOne({user: username}, {$push: {request: sender}}, {upsert: true});
        console.log(result);
    } catch (error) {
        console.log(error);
    }


}