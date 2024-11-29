import { Request, Response } from "express";
import { chats, users } from "../../config/db";
import { ObjectId } from "mongodb";

export const getChats = async(req: Request,res: Response): Promise<Response | any> => {
    const { username } = req.params;
    const userDetails = await users.findOne({username: username});
    const userId = userDetails?._id;

    let chatResults: any = await chats.find({participants: userId}).toArray();  //Get chats for the given username
    chatResults = chatResults.map((element: any) => {
        return{
            ...element,
            participants: element.participants.filter((participant: ObjectId) => !participant.equals(userId)) // Filtering out the the same user from participants arrya
        }
         
    })
    const participantsArrary = chatResults.flatMap((chat: any) => chat.participants);   //Making a participants array which has all the participants of the current user

    const participantsMap = await users.find({_id: {$in: participantsArrary}}).toArray()    // Creating a map for the participants with key as the id and the value as the array
        .then(users => 
            users.reduce((acc: any, user: any) => {
                acc[user._id.toString()] = {
                    username: user.username,
                    profilePicURL: user.profilePicURL,
                    bio: user.bio,
                };       
                return acc;
            }, {})
        );
    
    chatResults = chatResults.map((chat: any) => ({
        ...chat,
        participants: chat.participants.map((participant: any) => ({
            id: participant,
            name: participantsMap[participant.toString()].username,
            profilePicURL: participantsMap[participant.toString()].profilePicURL,
            bio: participantsMap[participant.toString()].bio,   //Mapping id as well as name to the participants array
        }))
    }))
        

    
    res.json({chats: chatResults});
}