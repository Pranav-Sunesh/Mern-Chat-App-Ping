import { Request, Response } from "express";
import { users } from "../../config/db";

export const getUsers = async(req: Request, res: Response): Promise<void> => {
    const { username } = req.params;

    const userDetails = await users.find({username: username}).toArray();

    res.json(userDetails[0]._id); 
}