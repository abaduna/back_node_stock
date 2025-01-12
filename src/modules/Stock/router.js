const express = require('express');
const router = express.Router();
const StockService = require('./services');
const stockService = new StockService();

router.get('/', async (req, res, next) => {
    try {
        const result = await stockService.getStock();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});
router.get('/:id/:quantityForBox', async (req, res, next) => {
    try {
        const result = await stockService.getStockById(req.params.id, req.params.quantityForBox);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: 'Stock no encontrado' });
    }
});

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const { barcode, quantityIndividuos, quantityForBox, dateExpiration } = req.body;
        if (!barcode || !quantityIndividuos || !quantityForBox || !dateExpiration) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        const result = await stockService.updateStock(barcode, quantityIndividuos, quantityForBox, dateExpiration);
        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;