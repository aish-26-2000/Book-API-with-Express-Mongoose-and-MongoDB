//loading modules
const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

//creating router
const router = express.Router();

//routes
//authentication routes
router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.post('/forgotPassword',authController.forgotPassword);
router.patch('/resetPassword/:token',authController.resetPassword);
router.patch('/updatePassword',authController.protect,authController.updatePassword);

router.patch('/updateMe',authController.protect,userController.updateMe);

router
  .route('/')
  .get(userController.getAllUsers);

//export
module.exports = router