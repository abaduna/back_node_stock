const express = require('express');
const router = express.Router();
const UsersController = require('./UsersControllers');
const usersController = new UsersController();

router.post('/login', usersController.login);
router.post('/register', usersController.register);
module.exports = router;