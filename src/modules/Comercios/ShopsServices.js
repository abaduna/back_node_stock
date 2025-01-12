const pool = require('../../config/db');

class ShopsService {
   async getShops(idUser) {
        const [rows] = await pool.query('SELECT * FROM shops WHERE idUser = ?', [idUser]);
        return rows;
    }
    async createShop(idUser, body) {
        const { name, address } = body;
        const [rows] = await pool.query('INSERT INTO shops (idUser, name, adress) VALUES (?, ?, ?)', [idUser, name, address]);
        return rows;
    }
    async deleteShop(idUser, idShop) {
        const [rows] = await pool.query('DELETE FROM shops WHERE idUser = ? AND idShop = ?', [idUser, idShop]);
        return rows;
    }
}

module.exports = ShopsService;

