const ProductsService = require('./Services');

class ProductsController {
   async getProductsbyBarcode(req, res, next) {
    const { barcode } = req.params;
    const productsService = new ProductsService();
    productsService.getProductByBarcode(barcode)
    .then(result => {
        if (!result) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.status(200).json("producto encontrado");
    })
    .catch(error => res.status(500).json({ error: 'Error al obtener el producto' }));
   }
   async getProductsbyId(req, res, next) {
    const { word } = req.params;
    
    if (!word || word.length < 3) {
      return res.status(400).json({ error: 'La búsqueda debe contener al menos 3 caracteres' });
    }

    const productsService = new ProductsService();
    const result = await productsService.getProductByword(word);
    if (!result.success) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    return res.status(200).json(result.data);
   }
}

module.exports = ProductsController;
