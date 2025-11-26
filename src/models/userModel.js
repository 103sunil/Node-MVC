const pool = require('../config/db.js');

const getAllUsersService = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
}

const getUsersByIdService = async (id) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );
    return result.rows[0];
}

const createUsersService = async (email, name) => {
    const result = await pool.query(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
        [name, email]
    );
    return result.rows[0];
}

const updateUsersService = async (id, name, email) => {
    const result = await pool.query(
        "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
        [name, email, id] 
    );
    return result.rows[0];
}

const deleteUsersService = async (id) => {   
    const result = await pool.query(
        "DELETE FROM users WHERE id=$1 RETURNING *",
        [id]
    );
    return result.rows[0];
}

module.exports = {
    getAllUsersService,
    getUsersByIdService,
    createUsersService,
    updateUsersService,
    deleteUsersService
};
