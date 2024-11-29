import { Request, Response } from "express";
import { chats, messages, requests, users } from "../../config/db";

export const acceptRequest = async(req: Request, res: Response) => {
    const { username, requesterName } = req.body;
    try {
        //Pending change the name with objectId

        

        const receiverId = await users.findOne({username: username}).then(receiver => receiver?._id)
        const requesterId = await users.findOne({username: requesterName}).then(requester => requester?._id);

        await requests.updateOne({user: receiverId}, {$pull: {request: requesterId}});
        await requests.updateOne({user: requesterId}, {$pull: {request: receiverId}});

        // {
        //     id,
        //     type,
        //     participants,
        //     lastMessage,
        // }

        //Messages

        // {
        //     chatId,
        //     senderId, 
        //     content,
        //     timestamp,

        // }
        const { insertedId } = await chats.insertOne({type: 'personal', participants: [receiverId, requesterId], messages: [], lastMessage: '' ,updatedTimestamp: new Date()});
        res.json("success");
    } catch (error) {
        console.log(error);
    }
}