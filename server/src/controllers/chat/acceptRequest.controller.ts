import { Request, Response } from "express";
import { chats, messages, requests } from "../../config/db";

export const acceptRequest = async(req: Request, res: Response) => {
    const { username, requesterName } = req.body;
    try {
        const removeRequest = await requests.updateOne({user: username}, {$pull: {request: requesterName}});

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
        const { insertedId } = await chats.insertOne({type: 'personal', participants: [username, requesterName], messages: [], lastMessage: '' ,updatedTimestamp: new Date()});
        res.json("success");
    } catch (error) {
        console.log(error);
    }
}