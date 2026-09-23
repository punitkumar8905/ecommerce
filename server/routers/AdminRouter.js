const express = require('express');
const AdminRouter = express.Router();
const { register, login} = require('../controllers/AdminController')



AdminRouter.post('/register', register)

AdminRouter.post('/login', login);


module.exports = AdminRouter;
