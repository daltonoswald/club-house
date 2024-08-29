const { Client } = require('pg');
require('dotenv').config();

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    username VARCHAR(25) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isMember BOOLEAN DEFAULT FALSE,
    isAdmin BOOLEAN DEFAULT FALSE
    );

    INSERT INTO users (first_name, last_name, username, password, isMember, isAdmin)
    VALUES
        ('Dougie', 'Graves', 'Kharon', 'minecraft12', false, false),
        ('John', 'Doe', 'Jodney', 'minecraft12', false, false),
        ('Ana', 'Shantay', 'Inabarrel', 'minecraft12', false, false);

    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL,
    title VARCHAR(50) NOT NULL,
    text VARCHAR(255) NOT NULL,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    INSERT INTO messages (user_id, title, text, posted_at)
    VALUES 
        (1, 'First', 'Hello I am Kharon.', '2024-08-20'),
        (2, 'Second', 'Hi I am Jodney.', '2024-08-21'),
        (3, 'Third', 'Heya I am Ana.', '2024-08-22');
`;

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: process.env.CONNECTION_STRING || CONNECTION_STRING
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();
