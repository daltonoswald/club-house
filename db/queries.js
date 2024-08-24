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
    // const { rows } = await pool.query('SELECT * FROM messages;');
    const { rows } = await pool.query('SELECT messages.*, users.username FROM messages LEFT JOIN users ON messages.user_id = users.id');

    return rows;
    // 'SELECT * FROM messages'
    // 'INNER JOIN users'
    // 'ON messages.user_id = users.id;'

}

async function createUser(first_name, last_name, username, password) {
    await pool.query("INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [
        first_name,
        last_name,
        username,
        await bcryptjs.hash(password, 10),
    ]);
}

async function createPost(userId, title, text) {
    await pool.query("INSERT INTO messages (user_id, title, text) VALUES ($1, $2, $3)", [
        userId,
        title,
        text
    ])
}

async function JoinClub(userId) {
    await pool.query("UPDATE users SET isMember=true WHERE id = $1", [userId])
}

module.exports = {
    findUserByUsername,
    deserializeUser,
    getAllMessages,
    createUser,
    createPost,
    JoinClub
}