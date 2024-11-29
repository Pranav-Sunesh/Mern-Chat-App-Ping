import { Request, Response } from "express";
import { chats, messages } from "../../config/db";
import { ObjectId } from "mongodb";

export const sendMessage = async(req: Request, res: Response): Promise<Response | any> => {
    const { chatId, senderId, sender, content , timestamp } = req.body;
    const objectId = new ObjectId(chatId);
    console.log(content);
    const { insertedId } = await messages.insertOne({sender: new ObjectId   (senderId), content: content, timestamp: timestamp });
    const result = await chats.updateOne({_id: objectId}, {$push: {messages: insertedId}, $set: {lastMessage: {content: content, sender: sender}, updatedTimestamp: timestamp}});
    
    res.json("successfuly inserted");
    //Messages

        // {
        //     chatId,
        //     senderId, 
        //     content,
        //     timestamp,

        // }
}