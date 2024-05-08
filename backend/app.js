import express from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";



const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 3000;

app.use(cors());

const data = [];

app.get("/test", async (req, res) => {
   
});

app.get("/", (req, res) => {
    res.json(data);
});

app.post("/todo", (req, res) => {
    data.unshift({
        id: uuidv4(),
        content: req.body.content,
        done: false,
    });
    res.status(201).json(data);
});

app.put("/todo", (req, res) => {
    const findTodoId = data.findIndex((t) => t.id == req.body.id);

    if (findTodoId == -1) {
        res.status(401);
        return;
    }

    data[findTodoId].done = !data[findTodoId].done;

    res.status(201).json({ s: "ok" });
});

app.delete("/todo/:id", (req, res) => {
    const findTodoId = data.findIndex((t) => t.id == req.params.id);
    if (findTodoId == -1) {
        res.status(401);
        return;
    }
    data.splice(findTodoId, 1);
    res.status(201).json({ s: "ok" });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
