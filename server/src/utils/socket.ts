import { createServer } from "http";
import { app } from "../app";
import { Server } from "socket.io";

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
})