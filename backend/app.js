import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import router from "./router/todo.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 3000;

app.use(cors());

app.use('/todo',router)




io.on("connection", (socket) => {
    //console.log("a user connected");
    socket.on("action", (action) => {

        //console.log(action)
        socket.broadcast.emit('new todo', action)

    });

});



server.listen(port, () => {
    console.log(`app runnig - port ${port}`);
});
