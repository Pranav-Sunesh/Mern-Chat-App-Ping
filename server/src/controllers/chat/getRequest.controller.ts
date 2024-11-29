import { Request, Response } from "express";
import { requests, users } from "../../config/db";

export const getRequest = async(req: Request, res: Response): Promise<Response | any> => {
    // Request confict should be resolved... Once requst accepted the request should be removed from the other user
    const { username } = req.params;
    try {
        const userId = await users.findOne({username: username})
            .then(user => user?._id);
        let requestArray = await requests.findOne({user: userId})   // Array of requested users object id
            .then(req => req === null? [] : req.request);
        if(requestArray.length === 0){
            return res.json({request: []});
        }
        const requestedUsers = await users
            .find({_id: {$in: requestArray}})   // Requested users from users collection
            .project({username: 1})
            .toArray();

        const requestMap = requestedUsers.reduce((acc: any, user: any) => {     //A map to map id to username
            acc[user._id.toString()] = user.username;
            return acc;
        }, {});

        requestArray = requestArray.map((req: any) => ({
            _id: req,
            username: requestMap[req]
        })); // Mapping id to username

        res.json({request: requestArray});
    } catch (error) {
        console.log(error);
    }
}   