import Todo from "../model/index.js";

class TodoController {

    static index = async (req, res) => {
        const rows = await Todo.all();
        res.status(201).json(rows);
    };

    // --------------

    static store = async (req, res) => {
        const t = req.body.content
        const row = await Todo.addTodo(t.replace(/["'/]/gi, ''));
        res.status(201).json(row);
    };

    // --------------

    static update = async (req, res) => {
        const { id, content } = req.body;
        const row = await Todo.update(id, content.replace(/["'/]/gi, ''));
        res.status(201).json(row);
    };

    // --------------

    static show = async (req, res) => {
        const [row] = await Todo.find(req.params.id);
        if (row == null) {
            res.status(401).json({ msg: "mkin walo" });
            return;
        }
        res.status(200).json(row);
    };

    // --------------

    static done = async (req, res) => {
        const row = await Todo.done(req.body.id);
        res.status(201).json(row);
    };

    // --------------

    static destroy = async (req, res) => {
        const row = await Todo.deleteTodo(req.params.id);
        res.status(201).json(row);
    };
}

export default TodoController;
