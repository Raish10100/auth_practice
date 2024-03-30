const express = require('express');
const authRoute = express.Router();
const { signup } = require('../controller/authController')

authRoute.post('/signup',signup);



module.exports = authRoute;