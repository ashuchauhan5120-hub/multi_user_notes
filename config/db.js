require("dotenv").config();
const { Pool } = require("pg")

const pool = new Pool({
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'multi_user_notes_v2',
})

module.exports = {
    pool
};
