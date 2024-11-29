import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { messages, users } from "../../config/db";

export const getMessages = async(req: Request, res: Response): Promise<Response | any> =>{
    let { messagesIds } = req.body;
    messagesIds = messagesIds.map((element: string) => {
        return new ObjectId(element);
    });
    let messagesArray = await messages.find({_id: {$in: messagesIds}}).toArray();
    let senderArray = messagesArray.map(message => {return message.sender});
    senderArray = [...new Set(senderArray.map(id => id.toString()))].map(id => new ObjectId(id));
    const userMap = await users.find({_id: {$in: senderArray}}).toArray()
        .then(users => 
                users.reduce((acc: any, user: any) => {
                    acc[user._id.toString()] = user.username;
                    return acc;
                }, {})
        );
    messagesArray = messagesArray.map(messages => {
        return {
            ...messages,
            senderUserName: userMap[messages.sender.toString()]
        }
    })
    messagesArray.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
    res.json({messages: messagesArray});
}