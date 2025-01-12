const express = require('express');
const ProductsService = require('./Services');
const ProductsController = require('./Controller');
const router = express.Router();
const productsService = new ProductsService();

// Create an instance of ProductsController
const productsController = new ProductsController();

router.get('/', (req, res, next) => {
    productsService.getProducts()
        .then(result => res.json(result))
        .catch(next);
});

router.post('/', async (req, res) => {
    try {
        const { name, barcode, quantityForBox } = req.body;
        const result = await productsService.createProduct(name, barcode, quantityForBox);
        
        return res.status(result.success ? 201 : 400).json(result);
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor',
            error: err.message 
        });
    }
});

router.get('/search/:word', productsController.getProductsbyId);
router.get('/barcode/:barcode', (req, res, next) => productsController.getProductsbyBarcode(req, res, next));

module.exports = router;
