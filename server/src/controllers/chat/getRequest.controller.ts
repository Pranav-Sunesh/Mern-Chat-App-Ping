import { Request, Response } from "express";
import { requests } from "../../config/db";

export const getRequest = async(req: Request, res: Response): Promise<Response | any> => {
    // Request confict should be resolved... Once requst accepted the request should be removed from the other user
    const { username } = req.params;
    try {
        const result = await requests.find({user: username}).toArray();
        if(result.length === 0){
            return res.json({request: []});
        }
        const request = result[0].request;
        res.json({request: request});
    } catch (error) {
        console.log(error);
    }
}   