import { Request, Response } from "express";
import cloudinary from "../../config/cloudinary.config";
import fs from 'fs';
import { users } from "../../config/db";
import { ObjectId } from "mongodb";

export const profileUpdate = async(req: Request, res: Response): Promise<any> => {
    const image = req.file;
    const { username , bio , userId} = req.body;
    console.log('username: ', username);
    console.log("bio: ", bio);
    console.log("userId: ", userId);

    try {
            
        const updateBio = await users.updateOne({_id: new ObjectId(userId)}, {$set: {bio: bio}});
        if(image){
            const publicId = await users.findOne({_id: new ObjectId(userId)})
                .then(user => user?.profilePicPublicId)
            const result = await cloudinary.uploader.upload(image.path,{
                folder: 'Ping/pfp',
                public_id: publicId,
                overwrite: true 
            });
            fs.unlinkSync(image.path);
            const userUpdateResult = await users.updateOne({
                    _id: new ObjectId(userId)}, {
                        $set: 
                        {
                            profilePicURL: result.secure_url, 
                        }});
        }
        if(username !== ""){
            const isUserExist = await users.find({username: username}).toArray();
            if(isUserExist.length !== 0){
                console.log("username already taken");
                return res.status(204).json("This username is already taken");
            }
            const usernameUpdate = await users.updateOne({_id: new ObjectId(userId)}, {$set: {username: username}})
        }
        const userName = await users.findOne({_id: new ObjectId(userId)}).then(user => user?.username);
        console.log(userName);
        
        res.status(200).json({ data: "Successfully Updated", userName: userName});
    } catch (error) {
        console.log(error);
    }
}