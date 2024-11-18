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
    })
})