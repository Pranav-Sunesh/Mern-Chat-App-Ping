import { Request, Response } from "express";
import { users } from "../../config/db";
import { ObjectId } from "mongodb";
import cloudinary from "../../config/cloudinary.config";

export const deleteProfilePicture = async(req: Request, res: Response): Promise<void> => {
    const { userId } = req.body;
    try {
        const profilePicPublicId = await users.findOne({_id: new ObjectId(userId)}).then(user => user?.profilePicPublicId);
        console.log(profilePicPublicId);
        const result = await cloudinary.uploader.destroy(`Ping/pfp/${profilePicPublicId}`);
        console.log(result);
        const deleteProfilePicURL = await users.updateOne({_id: new ObjectId(userId)}, {$set: {profilePicURL: ''}});
        console.log('deleteProfilePicURL:', deleteProfilePicURL)
        res.status(200).json("Pfp deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json("Error! Please try again");
    }
}