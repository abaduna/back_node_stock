const UsersService = require('./UsersServices');

class UsersController {
    async login(req, res, next) {
        const usersService = new UsersService();
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }
            const result = await usersService.login(email, password);
            if (!result) {
                return res.status(403).json({
                    success: false,
                    message: 'Authentication failed'
                });
            }
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
                res.status(403).json({ 
                success: false,
                message: 'Authentication failed'
            });
        }
    }
    async register(req, res, next) {
        const usersService = new UsersService();
        const result = await usersService.register(req.body.email, req.body.password);
        res.status(200).json({
            success: true,
            message: "creado con exito",
            data: result
        });
    }
}

module.exports = UsersController;