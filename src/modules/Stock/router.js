const express = require('express');
const router = express.Router();
const StockService = require('./services');
const stockService = new StockService();
router.get('/', (req, res, next) => {
    stockService.getStock()
        .then(result => res.json(result))
        .catch(next);
});
router.post('/', (req, res, next) => {
    const { barcode, quantityIndividuos,quantityForBox,dateExpiration} = req.body;
    stockService.updateStock(barcode, quantityIndividuos,quantityForBox,dateExpiration)
        .then(result => res.json(result))
        .catch(next);
});
module.exports = router;