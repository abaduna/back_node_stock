const { v4: uuidv4 } = require('uuid');
const pool = require('../../config/db');

class UsersService {
    async login(email, password) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        return rows[0];
    }
    async register(email, password) {
        const userId = uuidv4();
        const [rows] = await pool.query('INSERT INTO users (id, email, password) VALUES (?, ?, ?)', [userId, email, password]);
        return rows[0];
    }
}

module.exports = UsersService; 