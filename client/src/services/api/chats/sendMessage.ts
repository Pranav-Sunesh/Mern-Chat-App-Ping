import axios, { AxiosResponse } from "axios";

export const sendMessage = async(e: React.FormEvent, chatId: string| null, sender: string | null, content: string) => {
    e.preventDefault();
    const timestamp = new Date();
    const response: AxiosResponse = await axios.post('http://localhost:5000/chat/sendmessage', {chatId: chatId, sender: sender, content: content, timestamp: timestamp});

}