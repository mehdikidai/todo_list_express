import mysql from "mysql2";
import confing from "../confing.js";

export const pool = mysql
    .createPool({
        host: confing.DB_HOST,
        user: confing.DB_USER,
        password: confing.DB_PASS,
        database: confing.DB_NAME,
    })
    .promise();

class Todo {
    constructor(pool) {
        this.pool = pool;
    }

    async all() {
        const [rows] = await pool.query(
            "SELECT * FROM todo  ORDER BY todo.id DESC"
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
        const [result] = await pool.query(
            `INSERT INTO todo (content) VALUES (?)`,
            [content]
        );
        return {
            id: result.insertId,
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
