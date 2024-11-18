import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initializeSocket = () => {
    socket = io("ws://localhost:5000");
    // socket.on('connect', () => {
    //     console.log("connected");
    // })
}; 

export const joinRoom = ( chatId: string)  => {
    socket.emit('joinRoom', chatId);
}

export const socketClose = () => {
    socket.close();
} 

export const socketSendMessage = (message: string) => {
    socket.emit('send message', message);
}