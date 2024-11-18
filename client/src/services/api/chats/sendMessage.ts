import { socketSendMessage } from "@/services/socket/socket";
import axios, { AxiosResponse } from "axios";

export const sendMessage = async(e: React.FormEvent, chatId: string| null, sender: string | null, content: string, timestamp: string) => {
    e.preventDefault();
    const response: AxiosResponse = await axios.post('http://localhost:5000/chat/sendmessage', {chatId: chatId, sender: sender, content: content, timestamp: timestamp});
    socketSendMessage( { roomId: chatId, content: content, sender: sender, timestamp: timestamp} );
}