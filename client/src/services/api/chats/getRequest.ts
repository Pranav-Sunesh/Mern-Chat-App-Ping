import axios, { AxiosResponse } from "axios"

export const getRequest = async(username: string | null):Promise<string[] | []> => {
    const response: AxiosResponse = await axios.get(`http://localhost:5000/chat/getrequest/${username}`);
    const requests: string[] = response.data.request;
    console.log("Getting request");
    return requests;
}