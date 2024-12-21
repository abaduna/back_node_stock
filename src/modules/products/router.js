const express = require('express');
const ProductsService = require('./Services');

const router = express.Router();
const productsService = new ProductsService();

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

module.exports = router;
