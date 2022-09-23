//loading modules
const express = require('express');
const authController = require('./../controllers/authController');
const purchaseController = require('./../controllers/purchaseController');


//creating router
const router = express.Router();

//routes
router
  .route('/:id')
  .get(authController.protect,purchaseController.checkAvailability)
  .post(authController.protect,purchaseController.purchaseBook)

router.get('/',purchaseController.purchaseReport)
   


//export
module.exports = router;