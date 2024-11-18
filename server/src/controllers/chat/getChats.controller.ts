import { Request, Response } from "express";
import { chats } from "../../config/db";

export const getChats = async(req: Request,res: Response): Promise<Response | any> => {
    const { username } = req.params;
    let result: any = await chats.find({participants: username}).toArray();
    result = result.map((element: any) => {
        return{
            ...element,
            participants: element.participants.filter((participant: string) => participant !== username)
        }
         
    })
    res.json({chats: result});
}