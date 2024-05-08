import express from "express";
import cors from "cors";
import Todo from "./db/index.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 3000;

app.use(cors());



app.get("/",async (req, res) => {

    const rows = await Todo.all()
    res.json(rows);

});

app.post("/todo",async (req, res) => {

    const row = await Todo.addTodo(req.body.content)
    res.status(201).json(row);

});

app.get("/todo/:id([0-9]{1,4})",async (req, res) => {

    const [row] = await Todo.find(req.params.id)
    res.status(201).json(row);

});

app.put("/todo",async (req, res) => {

    const row = await Todo.done(req.body.id)
    res.status(201).json(row);
    
});

app.delete("/todo/:id([0-9]{1,4})",async (req, res) => {

    const row = await Todo.deleteTodo(req.params.id)
    res.status(201).json(row);

});




app.listen(port, () => {
    console.log(`app runnig - port ${port}`);
});
