import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { messages } from "../../config/db";

export const getMessages = async(req: Request, res: Response): Promise<Response | any> =>{
    let { messagesIds } = req.body;
    messagesIds = messagesIds.map((element: string) => {
        return new ObjectId(element);
    });
    const messagesArray = await messages.find({_id: {$in: messagesIds}}).toArray();
    messagesArray.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
    res.json({messages: messagesArray});
}