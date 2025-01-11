const ShopsService = require('./ShopsServices');
const shopsService = new ShopsService();

class ShopsController {
        
   async getShops(req, res, next) {
        try {
            const result = await shopsService.getShops(req.params.idUser);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createShop(req, res, next) {
        try {
            const result = await shopsService.createShop(req.params.idUser, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteShop(req, res, next) {
        try {
            const result = await shopsService.deleteShop(req.params.idUser, req.params.idShop);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ShopsController;
