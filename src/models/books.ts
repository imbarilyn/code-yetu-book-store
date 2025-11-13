import { pool } from "../db.js";

export const createBooksTable = async ()=>{
    const query =
        `CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        year INT NOT NULL,
        synopsis TEXT
    )`;

    try {
        await pool.query(query);
        console.log("Books table created or already exists.");
    } catch (error) {
        console.error("Error creating books table:", error);
    }
}