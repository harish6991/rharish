const express = require("express");
const userController = require('../controller/user.controller');
const userRoutes = express.Router();
userRoutes.post('/signup',userController.singup)
userRoutes.get("/confirm/:confirmationCode",userController.verifyUser);
module.exports = userRoutes;
