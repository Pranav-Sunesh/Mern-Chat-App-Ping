import axios, { AxiosResponse } from "axios"

export const getMessages = async(messagesIds: string[]) => {
    const response: AxiosResponse = await axios.post('http://localhost:5000/chat/getmessages', {messagesIds: messagesIds});
    const messages = response.data.messages;
    return messages;
}