const pool = require('../../config/db');


class ProductsService {
    async getProducts() {
        try {
            const [rows] = await pool.query('SELECT * FROM productos');
            if (!rows.length) {
                return { success: false, message: 'No se encontraron productos', data: [] };
            }
            return { success: true, data: rows };
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return { success: false, message: 'Error al obtener productos', error: error.message };
        }
    }
    async createProduct(name, barcode, quantityForBox) {
       try {
           const [result] = await pool.query(
               'INSERT INTO productos (nombre, codigo_barras, cantidad_por_caja) VALUES (?, ?, ?)',
              [name, barcode, quantityForBox]
           );

           if (result.affectedRows === 1) {
               return { success: true, message: 'Producto creado exitosamente', productId: result.insertId };
           } else {
               return { success: false, message: 'No se pudo crear el producto' };
           }
       } catch (error) {
           console.error('Error al crear el producto:', error);
           return { success: false, message: 'Error al crear el producto', error: error.message };
       }
   }
   async getProductByBarcode(barcode) {
    const [rows] = await pool.query('SELECT * FROM productos WHERE codigo_barras = ?', [barcode]);
    return rows[0];
}
}

module.exports = ProductsService;
