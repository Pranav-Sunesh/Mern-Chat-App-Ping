import axios, { AxiosResponse } from "axios"

export const getChats = async(username: string | null) => {
    const response: AxiosResponse = await axios.get(`http://localhost:5000/chat/getchats/${username}`);
    const chats = response.data.chats;
    return chats;
}