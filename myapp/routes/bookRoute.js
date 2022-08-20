const express = require('express');
const bookController = require('./../controllers/bookController');

const router = express.Router();

router
  .route('/')
  .get(bookController.getAllBooks);

router
  .route('/:id')
  .get(bookController.getBook);

  module.exports = router;