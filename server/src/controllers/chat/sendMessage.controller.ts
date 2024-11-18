import { Request, Response } from "express";
import { chats, messages } from "../../config/db";
import { ObjectId } from "mongodb";

export const sendMessage = async(req: Request, res: Response): Promise<Response | any> => {
    const { chatId, sender, content , timestamp } = req.body;
    const objectId = new ObjectId(chatId);
    console.log(objectId, sender, content);

    const { insertedId } = await messages.insertOne({sender: sender, content: content, timestamp: timestamp });
    const result = await chats.updateOne({_id: objectId}, {$push: {messages: insertedId}});
    
    res.json("successfuly inserted");
    //Messages

        // {
        //     chatId,
        //     senderId, 
        //     content,
        //     timestamp,

        // }
}