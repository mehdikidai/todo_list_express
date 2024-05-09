import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import Todo from "./db/index.js";

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

app.get("/", async (req, res) => {
    const rows = await Todo.all();
    res.json(rows);
});

app.post("/todo", async (req, res) => {
    const row = await Todo.addTodo(req.body.content);
    res.status(201).json(row);
});

app.post("/update/todo", async (req, res) => {
    const { id, content } = req.body;
    const row = await Todo.update(id, content);
    res.status(201).json(row);
});

app.get("/todo/:id([0-9]{1,4})", async (req, res) => {
    const [row] = await Todo.find(req.params.id);
    if (row == null) {
        res.status(401).json({ msg: "mkin walo" });
        return;
    }
    res.status(201).json(row);
});

app.put("/todo", async (req, res) => {
    const row = await Todo.done(req.body.id);
    res.status(201).json(row);
});

app.delete("/todo/:id([0-9]{1,4})", async (req, res) => {
    const row = await Todo.deleteTodo(req.params.id);
    res.status(201).json(row);
});

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
