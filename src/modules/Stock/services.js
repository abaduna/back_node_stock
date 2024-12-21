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
            const productService = new ProductService();
            const product = await productService.getProductByBarcode(barcode);
            if (!product) {
                return { success: false, message: 'Producto no encontrado' };
            }
            product.quantityForBox = quantityForBox;
            const quantityTotal = quantityIndividuos + quantityForBox*product.quantityForBox;
            const [result] = await pool.query('INSERT INTO stock (id_producto, cantidad_productos_individuales, fecha_de_vencimiento) VALUES (?, ?, ?)',
                 [product.id, quantityTotal, dateExpiration]);
            return { success: true, message: 'Stock actualizado exitosamente', data: result };
        } catch (error) {
            console.error('Error al actualizar stock:', error);
            return { success: false, message: 'Error al actualizar stock', error: error.message };
        }
    }
}

module.exports = StockService;
