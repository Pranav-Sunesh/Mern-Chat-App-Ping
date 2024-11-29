import { Request, Response } from "express";
import { chats } from "../../config/db";
import { ObjectId } from "mongodb";

export const deleteChats = async(req: Request, res: Response ): Promise<void> => {
    const { chatId } = req.body;
    try {
        const result = await chats.deleteOne({_id: new ObjectId(chatId)});
        res.status(200).json("Chat deleted");
    } catch (error) {
        console.log(error);
        res.status(500).json("Error! Please try again");
    }
}