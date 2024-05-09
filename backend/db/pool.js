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
