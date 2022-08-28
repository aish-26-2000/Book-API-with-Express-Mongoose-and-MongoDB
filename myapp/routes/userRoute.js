//loading modules
const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

//creating router
const router = express.Router();

//routes
router.post('/signup',authController.signup);
router.post('/login',authController.login);

router.post('/forgotPassword',authController.forgotPassword);
router.patch('/resetPassword/:token',authController.resetPassword);


router
  .route('/')
  .get(userController.getAllUsers);

//export
module.exports = router