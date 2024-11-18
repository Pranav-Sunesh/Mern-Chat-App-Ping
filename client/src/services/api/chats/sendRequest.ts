import { popAddModal } from "@/redux/slices/chatSlice";
import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { title } from "process";


export const sendRequest = async(e: React.FormEvent, dispatch: Dispatch, toast: any, username: string): Promise<void> => {
    e.preventDefault();
    dispatch(popAddModal(false));
    
    try {
        const response: AxiosResponse = await axios.post("http://localhost:5000/chat/sendrequest", {username: username , sender: localStorage.getItem('username')});
        {
            toast({
                title: "Request send",
                description: username,
                duration: 1500
            });
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        const status = axiosError?.response?.status;
        if(status === 404){
            toast({
                title: "User not Found",
                variant: 'destructive',
                duration: 1500
            });
        }else if(status === 409){
            toast({
                title: "Request already send",
                variant: 'destructive',
                duration: 1500
            })
        }
        }
}       