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
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE codigo_barras = ?', [barcode]);
        if (!rows.length) {
            return { success: false, message: 'Producto no encontrado' };
        }
        return { success: true, data: rows[0] };
    } catch (error) {
        console.error('Error al buscar producto por código de barras:', error);
        return { success: false, message: 'Error al buscar producto', error: error.message };
    }
}
async getProductByword(word) {
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE nombre LIKE ?', [`%${word}%`]);
        if (!rows.length) {
            return { success: false, message: 'Producto no encontrado' };
        }
        return { success: true, data: rows };
    } catch (error) {
        console.error('Error al buscar producto por nombre:', error);
        return { success: false, message: 'Error al buscar producto', error: error.message };
    }
}
}

module.exports = ProductsService;
