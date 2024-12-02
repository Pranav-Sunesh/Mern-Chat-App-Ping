import { Request, Response } from "express";
import { chats, requests, users } from "../../config/db";

export const sendRequest = async(req: Request ,res: Response): Promise<Response | any> => {
    const { username, sender } = req.body;
    const receiverDetails = await users.findOne({username: username});
    const receiverId = receiverDetails?._id;
    const senderDetails = await users.findOne({username: sender});
    const senderId = senderDetails?._id;

    try {
        // Does the user exist
        const userExist = await users.find({username: username}).toArray();
        if(userExist.length === 0){
            return res.status(404).json({error: "No such user"});
        }

        //Does the request already exist
        const isRequested = await requests.find({$and: [{user: receiverId}, {request: senderId}]}).toArray();
        if(isRequested.length !== 0){
            return res.status(409).json({error: 'Request already send'});
        }

        //Pending: If user Already users contact

        const isInChats = await chats.find({participants: {$all:[receiverId, senderId]}}).toArray();
        if(isInChats.length !== 0){
            return res.status(204).json('Requester is already a friend');
        }

        const result = await requests.updateOne({user: receiverId}, {$push: {request: senderId}}, {upsert: true});
        res.status(200).json('Request send');
    } catch (error) {
        console.log(error);
    }


}