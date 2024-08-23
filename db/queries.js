const pool = require('./pool');
const bcryptjs = require('bcryptjs');

async function findUserByUsername(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
}

async function deserializeUser(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0];
}

async function getAllMessages() {
    const { rows } = await pool.query('SELECT * FROM messages;');
    return rows;
}

async function createUser(first_name, last_name, username, password) {
    await pool.query("INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [
        first_name,
        last_name,
        username,
        await bcryptjs.hash(password, 10),
    ]);
}

module.exports = {
    findUserByUsername,
    deserializeUser,
    getAllMessages,
    createUser
}