const express = require('express');
const router = express.Router();
const ShopsController = require('./ShopsControllers');
const shopsController = new ShopsController();

router.get('/:idUser', shopsController.getShops);
router.post('/:idUser', shopsController.createShop);
router.delete('/:idUser/:idShop', shopsController.deleteShop);

module.exports = router;
