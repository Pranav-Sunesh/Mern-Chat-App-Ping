import { Request, Response } from "express";
import { chats, users } from "../../config/db";
import { ObjectId } from "mongodb";

export const removeParticipant = async(req: Request, res: Response) => {
    const { user , chatId } = req.body;
    try {
        const userId = await users.findOne({username: user}).then(user => user?._id);
        const removeParticipant = await chats.updateOne({_id: new ObjectId(chatId)}, {$pull: {participants: userId}});
        console.log(user,chatId);
        res.status(200).json("Group left");
    } catch (error) {
        console.log(error);
        res.status(500).json("Error! try again later");
    }
    
}