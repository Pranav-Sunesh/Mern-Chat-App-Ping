import { socketSendMessage } from "@/services/socket/socket";
import axios from "axios";

export const sendMessage = async( chatId: string| null, senderId: string | null, sender: string | null, content: string, timestamp: string) => {
    try {
        await axios.post('http://localhost:5000/chat/sendmessage', {chatId: chatId, sender: sender, senderId: senderId, content: content, timestamp: timestamp});
        socketSendMessage( { roomId: chatId, content: content, sender: sender, timestamp: timestamp} );
    } catch (error) {
        console.log(error);
    }
    
}