const ProductService = require('../products/Services');
const pool = require('../../config/db');

class StockService {
    async getStock() {
        try {
            const [rows] = await pool.query('SELECT * FROM stock');
            if (!rows.length) {
                return { success: false, message: 'No se encontraron stocks', data: [] };
            }
            return { success: true, data: rows };
        } catch (error) {
            console.error('Error al obtener stocks:', error);
            return { success: false, message: 'Error al obtener stocks', error: error.message };
        }
    }
    async updateStock(barcode, quantityIndividuos,quantityForBox,dateExpiration) {
        try {
            console.log(barcode);
            const productService = new ProductService();
            const product = await productService.getProductByBarcode(barcode);
            if (!product) {
                return { success: false, message: 'Producto no encontrado' };
            }
            product.quantityForBox = quantityForBox;
            const quantityTotal = quantityIndividuos + quantityForBox*product.quantityForBox;
            const [result] = await pool.query('INSERT INTO stock (id_producto, cantidad_productos_individuales, fecha_de_vencimiento) VALUES (?, ?, ?)',
                 [product.data.id, quantityTotal, dateExpiration]);
            return { success: true, message: 'Stock actualizado exitosamente', data: result };
        } catch (error) {
            console.error('Error al actualizar stock:', error);
            return { success: false, message: 'Error al actualizar stock', error: error.message };
        }
    }
    async getStockById(id, quantityForBox) {
        const [rows] = await pool.query('SELECT * FROM stock WHERE id_producto = ?', [id]);
        if (!rows[0]) return null;
        
        const stock = rows[0];
        const totalUnits = stock.cantidad_productos_individuales;
        const boxes = Math.floor(totalUnits / quantityForBox);
        const individuals = totalUnits % quantityForBox;
        
        return {
            ...stock,
            cajas: boxes,
            individuales: individuals
        };
    }
}

module.exports = StockService;
