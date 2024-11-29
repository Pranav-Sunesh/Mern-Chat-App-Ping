import axios, { AxiosResponse } from "axios"

export const getMessages = async(messagesIds: string[], senderArray: string[]) => {
    const response: AxiosResponse = await axios.post('http://localhost:5000/chat/getmessages', {messagesIds: messagesIds, senderArray: senderArray});
    const messages = response.data.messages;
    return messages;
}