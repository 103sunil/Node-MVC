const pool = require("../config/db");

const creteUserTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
)
    `;

    try {
        await pool.query(queryText);
        console.log("user table created if not exists")
    } catch (error) {
        console.log("error creating users table", error)
    }
}

module.exports = creteUserTable;