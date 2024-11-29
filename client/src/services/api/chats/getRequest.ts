import { RequestSectionType } from "@/@types";
import axios, { AxiosResponse } from "axios"

export const getRequest = async(username: string | null):Promise<RequestSectionType[] | []> => {
    const response: AxiosResponse = await axios.get(`http://localhost:5000/chat/getrequest/${username}`);
    const requests: RequestSectionType[] | [] = response.data.request;
    return requests;
}