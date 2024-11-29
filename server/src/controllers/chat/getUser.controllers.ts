import { Request, Response } from "express";
import { users } from "../../config/db";

export const getUsers = async(req: Request, res: Response): Promise<void> => {
    const { username } = req.params;

    const userDetails = await users.findOne({username: username});

    res.json({userDetails: {_id: userDetails?._id, userName: userDetails?.username, profilePicURL: userDetails?.profilePicURL, bio: userDetails?.bio}}); 
}