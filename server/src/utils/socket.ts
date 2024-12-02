import { createServer } from "http";
import { app } from "../app";
import { Server } from "socket.io";
import { getRoomId } from "../services/getRoomId";

export const server = createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log(socket.id, " connected");
    socket.on('disconnect',() => {
        console.log(socket.id, " disconnected");
    })

    socket.on('setup', (msg) => {
        socket.join(msg);
        console.log('Joined room', msg);
    })

    socket.on('joinRoom', (msg) => {
        console.log("Joining room: ", msg);
        socket.join(msg);
    });
    
    socket.on('send message', (msg) => {    
        socket.to(msg.roomId).emit('receive message', { chatId: msg.roomId, content: msg.content, sender: msg.sender, timestamp: msg.timestamp });
    })

    socket.on('typing', (msg) => {
        socket.to(msg.chatId).emit('typing listener', msg);  
    })
    
    socket.on('receive request', (msg) => {
        socket.to(msg).emit('receive request response');
    })

    socket.on('leave room', (chatId) => {
        console.log("chatId: ", chatId);
        socket.leave(chatId);
    })

    socket.on('delete chat', (chatId) => {
        console.log('Deleted chat Id: ', chatId);
        socket.to(chatId).emit('delete chat listener');
    })
})