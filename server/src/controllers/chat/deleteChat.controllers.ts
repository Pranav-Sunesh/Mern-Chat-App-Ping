import { Request, Response } from "express";
import { chats, groups } from "../../config/db";
import { ObjectId } from "mongodb";

export const deleteChats = async(req: Request, res: Response ): Promise<void> => {
    const { chatId } = req.body;
    try {
        const chat = await chats.findOne({_id: new ObjectId(chatId)}).then(chat => ({
            type: chat?.type,
            groupId: chat?.groupId
        }));
        const result = await chats.deleteOne({_id: new ObjectId(chatId)});
        if(chat.type === 'group'){
            const deleteGroup = await groups.deleteOne({_id: chat.groupId});
            
        }
        res.status(200).json("Chat deleted");
    } catch (error) {
        console.log(error);
        res.status(500).json("Error! Please try again");
    }
}