const OrdersService = require('./OrdersServices');

class OrdersController {
    async getOrders(req, res, next) {
        const { status } = req.query;
        const ordersService = new OrdersService();
        const result = await ordersService.getOrders(status);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'No se encontraron ordenes' });
        }
    }
    async createOrder(req, res, next) {
        try {
            const { idShop, items } = req.body;
            console.log(req.body);
            if (!idShop) {
                return res.status(400).json({ error: 'idShop is required' });
            }
            
            if (!items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ error: 'items array is required and cannot be empty' });
                }

            const ordersService = new OrdersService();
            const result = await ordersService.createOrder(req.params.idUser, req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    async getOrder(req, res, next) {
        const ordersService = new OrdersService();
        const result = await ordersService.getOrder(req.params.idOrder);
        res.status(200).json(result);
    }
    async sendOrder(req, res, next) {
        const ordersService = new OrdersService();
        const result = await ordersService.sendOrder(req.params.idOrder);
        res.status(200).json(result);
    }
}

module.exports = OrdersController;

