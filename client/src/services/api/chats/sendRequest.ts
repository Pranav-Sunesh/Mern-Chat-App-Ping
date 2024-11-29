
import { sendRequestReturnType } from "@/@types";
import axios, { AxiosError, AxiosResponse } from "axios";



export const sendRequest = async(username: string): Promise<sendRequestReturnType> => {
    
    try {
        const response: AxiosResponse = await axios.post("http://localhost:5000/chat/sendrequest", {username: username , sender: localStorage.getItem('username')});
        if(response.status === 204){
            return {data: "User already a friend", type: "default"};
        }
        return {data: "Request send", type: "default"}
    } catch (error) {
        const axiosError = error as AxiosError;
        const status = axiosError?.response?.status;
        if(status === 404){
            return {data: 'User not found', type: 'destructive'};
        }else if(status === 409){
            return {data: 'Request already send', type: 'destructive'};
        }
        return {data: 'Unexpected Error occured', type: "destructive"}
        }
}       