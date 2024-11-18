import { StatesType } from "@/@types";
import axios, { AxiosError, AxiosResponse } from "axios"

export const loginCall = async(states: StatesType, toast: any): Promise<any> => {
    try {
        const response: AxiosResponse = await axios.post(`http://localhost:5000/auth/login`,{username: states.user, password: states.password});
        const token:string = response.data.token;
        if(token){
            localStorage.setItem("username", states.user);
        }
        return {token: token}
    } catch (error) {
        const axiosError = error as AxiosError;
        const status = axiosError?.response?.status;
        if(status === 404){
            toast({
                title: "User does not exist",
                variant: 'destructive'
            })
            return {error: "User Does not exist"}
        }
        if(status === 400){
            toast({
                title: "Password Incorrect",
                variant: 'destructive'
            })
            return {error: "Password Incorrect"}
        }
    }
}