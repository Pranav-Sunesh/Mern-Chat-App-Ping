import { StatesType } from "@/@types/auth";
import axios, { AxiosResponse } from "axios"

export const loginCall = async(states: StatesType): Promise<string> => {
    const response: AxiosResponse = await axios.post(`http://localhost:5000/auth/login`,{username: states.user, password: states.password});
    const token:string = response.data.token;
    return token
}