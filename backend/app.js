import express from "express";
import cors from "cors";
import GetData from "./db/index.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 3000;

app.use(cors());



app.get("/",async (req, res) => {

    const rows = await GetData.getTodo()
    res.json(rows);

});

app.post("/todo",async (req, res) => {

    const rows = await GetData.addTodo(req.body.content)
    res.status(201).json(rows);

});

app.put("/todo",async (req, res) => {

    const rows = await GetData.done(req.body.id)
    res.status(201).json(rows);
    
});

app.delete("/todo/:id",async (req, res) => {

    const rows = await GetData.deleteTodo(req.params.id)
    res.status(201).json(rows);

});




app.listen(port, () => {
    console.log(`app runnig - port ${port}`);
});
