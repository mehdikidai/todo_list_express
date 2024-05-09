import { pool } from "./pool.js";

class Todo {
    constructor(pool) {
        this.pool = pool;
    }

    async all() {
        const [rows] = await pool.query(
            "SELECT * FROM todo  ORDER BY todo.id DESC LIMIT 8"
        );
        return rows;
    }

    async find(id) {
        const [rows] = await pool.query("SELECT * FROM todo WHERE id = ?", [
            id,
        ]);
        return rows;
    }

    async addTodo(content) {
        const newContent = content.replace(/<[^>]+>/g, "");

        const [result] = await pool.query(
            `INSERT INTO todo (content) VALUES (?)`,
            [newContent]
        );
        return {
            id: result.insertId,
        };
    }

    async update(id, content) {
        const newContent = content.replace(/<[^>]+>/g, "");
        const [result] = await pool.query(
            `UPDATE todo SET content = ? WHERE todo.id = ?`,
            [newContent, id]
        );
        return {
            affectedRows: result,
        };
    }

    async deleteTodo(id) {
        const [result] = await pool.query(
            `DELETE FROM todo WHERE todo.id = ?`,
            [id]
        );
        return {
            affectedRows: result.affectedRows,
        };
    }

    async done(id) {
        const [result] = await pool.query(
            `UPDATE todo SET done = 1 ^ done WHERE todo.id = ?`,
            [id]
        );

        return {
            changedRows: result.changedRows,
        };
    }
}

export default new Todo(pool);
