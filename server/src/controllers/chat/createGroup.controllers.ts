import { Request, Response } from "express";
import { chats, groups, messages, users } from "../../config/db";
import { ObjectId } from "mongodb";
import cloudinary from "../../config/cloudinary.config";
import fs from "fs"

export const createGroup = async(req: Request, res: Response) =>{
    const { groupName, bio, user } = req.body;
    let participants = JSON.parse(req.body.participants);
    participants = participants.map((participant: string) => new ObjectId(participant));
    console.log("Participants: ", participants)
    console.log(user, bio, groupName);
    let profilePicURL = '';
    let publicId = ''
    const image = req.file;
    try{
        if(image){
            const result = await cloudinary.uploader.upload(image.path, {
                folder: 'Ping/pfp',
            });
            profilePicURL = result.secure_url;
            publicId = result.public_id;
            fs.unlinkSync(image.path);
        }
        const userId = await users.findOne({username: user}).then(user => user?._id);
        participants.push(userId);
        const { insertedId } = await groups.insertOne({
            groupName: groupName,
            bio: bio,
            profilePicURL: profilePicURL,
            profilePicPublicId: publicId,
            admin: userId
        });
        const createChat = await chats.insertOne({
            type: "group",
            groupId: insertedId,
            participants: participants,
            messages: [],
            lastMessage: {},
            updatedTimestamp: new Date().toString()            
        })
        res.status(200).json({data: 'Group created', chatId: createChat.insertedId});

    }catch(error){
        console.log(error);
        res.status(500).json('Error! Please try again')
    }
}