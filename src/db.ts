import pg from "pg";
import {config} from "./config.js";

const { Pool } = pg

// export const pool = new Pool({
//     user: config.DB_USER,
//     host: config.DB_HOST,
//     database: config.DATABASE,
//     password: config.DB_PASSWORD,
//     port: Number(config.DB_PORT),
//     max:10,
//     min: 4,
//     idleTimeoutMillis: 600000,
//     ssl: { rejectUnauthorized: false}
// })

export const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {rejectUnauthorized: false},
})