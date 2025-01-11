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

router.post('/', (req, res, next) => {
    const { name, barcode, quantityForBox } = req.body;
    productsService.createProduct(name, barcode,quantityForBox)
        .then(result => res.json(result))
        .catch(next);
});
router.get('/search/:word', productsController.getProductsbyId);
router.get('/barcode/:barcode', (req, res, next) => productsController.getProductsbyBarcode(req, res, next));

module.exports = router;
