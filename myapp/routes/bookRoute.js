//loading modules
const express = require('express');
const bookController = require('./../controllers/bookController');
const authController = require('./../controllers/authController');

//creating router
const router = express.Router();

//routes
router
  .route('/')
  .get(bookController.getAllBooks)
  .post(authController.protect,bookController.createBook);


router
  .route('/:id')
  .get(authController.protect,bookController.getBook) 
  .patch(authController.protect,bookController.updateBook)
  .delete(authController.protect,bookController.deleteBook);


//export
module.exports = router;