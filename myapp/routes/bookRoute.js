//loading modules
const express = require('express');
const bookController = require('./../controllers/bookController');
const authController = require('./../controllers/authController');

//creating router
const router = express.Router();

//routes
router
  .route('/')
  .get(authController.protect,bookController.getAllBooks)
  .post(bookController.createBook);


router
  .route('/:id')
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);


//export
module.exports = router;