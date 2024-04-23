const express = require('express');
const userRoutes = express.Router();
const userController = require('../Controllers/userController');

userRoutes.post("/signup",userController.Registration);
userRoutes.post("/login",userController.Login);
userRoutes.get("/userfind/:_id?",userController.findUser);
userRoutes.put("/updateuser/:_id",userController.userUpdate);

module.exports= userRoutes


