import mysql from "mysql2";

export const pool = mysql
    .createPool({
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "todo",
    })
    .promise();

class GetData {


    constructor(pool) {
        this.pool = pool;
    }


    async getTodo() {
        const [rows] = await pool.query("SELECT * FROM todo");
        return rows;
    }

    async addTodo(content) {
        const [result] = await pool.query(
            `INSERT INTO todo (content) VALUES (?)`,
            [content]
        );
        return {
            id:result.insertId
        };
    }

    async deleteTodo(id) {
        const [result] = await pool.query(
            `DELETE FROM todo WHERE todo.id = ?`,
            [id]
        );
        return {
            affectedRows:result.affectedRows
        };
    }

    async done(id){

        const [result] = await pool.query(`UPDATE todo SET done = 1 ^ done WHERE todo.id = ?`,[id])

        return {
            changedRows:result.changedRows
        };

    }

}

export default new GetData(pool);
