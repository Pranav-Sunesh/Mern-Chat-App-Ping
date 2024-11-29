import { Request, Response } from "express";
import { requests, users } from "../../config/db";

export const deleteRequest = async(req: Request, res: Response): Promise<void>  => {
    const { username, requesterName } = req.body;
    const userId = await users.findOne({username: username}).then(user => user?._id);
    const requesterId = await users.findOne({username: username}).then(user => user?._id);
    console.log(username, requesterName);   
    try{
        const removeRequest = await requests.updateOne({user: userId}, {$pull: {request: requesterId}});
        res.status(200).json('Request removed');
    }catch(error){
        console.log(error);
        res.status(500).json('Server error');
    }
}