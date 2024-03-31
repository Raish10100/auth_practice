const express = require('express');
const authRoute = express.Router();
const { signup,signin,getUser,logout } = require('../controller/authController')
const jwtAuth = require('../middleware/jwtAuth');

authRoute.post('/signup',signup);
authRoute.post('/signin',signin);
authRoute.get('/user',jwtAuth,getUser);
authRoute.get('/logout',jwtAuth,logout);


module.exports = authRoute;