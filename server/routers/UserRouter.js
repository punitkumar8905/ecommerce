const express = require('express');
const  UserRouter = express.Router();
const { register, login} = require('../controllers/UserController');
const { syncCart } = require('../controllers/CartController');



UserRouter.post('/register', register)

UserRouter.post('/login', login);
UserRouter.post('/sync-cart', syncCart);


module.exports = UserRouter;
