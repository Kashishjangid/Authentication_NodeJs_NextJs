const express = require('express');
const userData = express.Router();
const dataController = require('../Controllers/dataController');
const Auth = require('../Middlewares/auth')

userData.get("/data", Auth, dataController)

module.exports = userData