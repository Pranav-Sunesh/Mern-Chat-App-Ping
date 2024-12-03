import { io, Socket } from "socket.io-client";

export let socket: Socket;

export const socketReceiveMessage = (callback: any) => {
    if(!socket){
        return
    }
    socket.on('receive message', callback);
}

export const initializeSocket = () => {
    socket = io("ws://localhost:5000");
    // socket.on('connect', () => {
    //     socketReceiveMessage(callback);
    // });
    // socket.on('disconnect', () => {
    //     removeSocketReceiveMessage(callback);
    // })
}; 

export const joinRoom = ( chatId: string[] | string)  => {
    socket.emit('joinRoom', chatId);
}

export const socketClose = () => {
    socket.close();
} 

export const socketSendMessage = (message: any) => {
    socket.emit('send message', message);
}


export const removeSocketReceiveMessage = (callback: any) => {
    socket.off('receive message', callback);
}

export const typingEvent = (data: {chatId: string, isTyping: boolean, sender: string}) => {
    socket.emit('typing', data);
}

export const typingListener = (callback: any) => {
    socket.on('typing listener', callback);
}

export const receiveRequest = (userId: string| string[] ) => {
    socket.emit('receive request', userId);
}

export const receiveRequestResponse = (callback: () => void) => {
    socket.on('receive request response', callback);
}

export const leaveRoom = (chatId: string) => {
    socket.emit('leave room', chatId);
}

export const deleteChat = (chatId: string) => {
    socket.emit('delete chat', chatId);
}
export const deleteChatListener = (callback: () => void) => {
    socket.on('delete chat listener', callback)
}