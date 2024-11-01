import { popAddModal } from "@/redux/slices/chatSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { title } from "process";


export const sendRequest = (e: React.FormEvent, dispatch: Dispatch, toast: any, username: string) => {
    e.preventDefault();
    dispatch(popAddModal(false));
    toast({
        title: "Request send",
        description: username,
    })
    
}       