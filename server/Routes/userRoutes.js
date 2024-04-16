const express = require('express');
const userRoutes = express.Router();
const userController = require('../Controllers/userController');

userRoutes.post("/signup",userController.Registration);
userRoutes.post("/login",userController.Login);

module.exports= userRoutes


