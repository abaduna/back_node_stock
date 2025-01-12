const pool = require('../../config/db');
const { v4: uuidv4 } = require('uuid');
class OrdersService {
    async getOrders(status) {
        const [rows] = await pool.query(
            `SELECT orders.id,
                    orders.idordersIndividual,
                    users.email as userEmail,
                    shops.name as shopName,
                    orders.status
             FROM orders 
             LEFT JOIN shops ON orders.idShop = shops.idShop 
             LEFT JOIN users ON orders.idUser = users.id 
             WHERE orders.status = ?`, 
            [status]
        );
        return rows;
    }
    async createOrder(idUser, body) {
        const { items, idShop } = body;
        
        try {
            const connection = await pool.getConnection();
            await connection.beginTransaction();
            
            try {
                // Modified query to include idShop
                const idOrdersIndividual = uuidv4();
                const [orderResult] = await connection.query(
                    'INSERT INTO orders (idUser, idordersIndividual, idShop) VALUES (?, ?, ?)',
                    [idUser, idOrdersIndividual, idShop]
                );
                const orderId = orderResult.insertId;
                
                // Insert individual items
                for (const item of items) {
                    await connection.query(
                        'INSERT INTO ordersIndividual ( idProduct, quantity, idOrders) VALUES ( ?, ?, ?)',
                        [ item.idProduct, item.quantity, idOrdersIndividual]
                    );
                    const [stockResult] = await connection.query(
                        'SELECT * FROM stock WHERE id_producto = ?',
                        [item.idProduct]
                    );
                    const stock = stockResult[0];
                    
                    if (stock.cantidad_productos_individuales < item.quantity) {
                        throw new Error('No hay suficiente stock para el producto ' + item.idProduct);
                    }
                    await connection.query(
                        'UPDATE stock SET cantidad_productos_individuales = cantidad_productos_individuales - ? WHERE id_producto = ?',
                        [item.quantity, item.idProduct]
                    );
                }
                
                await connection.commit();
                return { orderId };
                
            } catch (error) {
                await connection.rollback();
                throw error;
            } finally {
                connection.release();
            }
        } catch (error) {
            throw error;
        }
    }
    async getOrder(idOrder) {
        const [rows] = await pool.query(
            `SELECT oi.id, 
                    p.nombre as productName,
                    oi.quantity, 
                    oi.idOrders
             FROM ordersindividual oi
             LEFT JOIN productos p ON oi.idProduct = p.id 
             WHERE oi.idOrders = ?`, 
            [idOrder]
        );
        return rows;
    }
    async sendOrder(idOrder) {
        const status = 'send';
        const [rows] = await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, idOrder]);
        return rows;
    }
}

module.exports = OrdersService;