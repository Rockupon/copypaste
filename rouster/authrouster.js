const express = require('express');
const routes =  express.Router();
const {
    register,
    login,
    logout,
} = require('../controllers/auth')

routes.route('/register').post(register);
routes.route('/login').post(login);
routes.route('/logout').post(logout);

module.exports = routes;