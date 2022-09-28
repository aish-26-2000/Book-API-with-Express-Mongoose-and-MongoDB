//loading modules
const Purchase = require('./../models/purchaseModel');
const Book = require('./../models/bookModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const service = require('./service');
const { response } = require('express');

//check book availability
exports.checkAvailability = catchAsync(async(req,res) => {
    const details = await service.fetchBookDetails(req.params.id)
    if(!details){res.status(404).send({status : 'fail',message : 'Book not found'})}
    else {
      if(details.quantity === 0) {
        res.status(404).send({message:'Book is out of stock'})
      }
      else {
        res.send({
          message : 'Book is available. Please proceed to Purchase',
                  details : {
                      bookId : details._id, 
                      title : details.title, 
                      quantity : details.quantity, 
                      price : details.price
                  }
        })
      }
    }
})

//purchase book
exports.purchaseBook = catchAsync(async(req,res)=> {  
    //get book
    const book_details = await service.fetchBookDetails(req.params.id)
    if(!book_details){res.status(404).send({message:'Check the id again'})}
    else {
        const price = book_details.price;
        const purchaseItem = {
            userId : req.body.userId,
            bookId : req.body.bookId,
            quantity : req.body.quantity,
            totalPrice : req.body.quantity * price
        };
        //create purchase
        const purchaseDetails = await service.createItem(purchaseItem)
        const bookQty = book_details.quantity;
        const itemQty = purchaseDetails.quantity;
        if(bookQty-itemQty < 0) {
            res.status(404).send({status:'fail',message : 'Required number of books unavailable'})    
          } else {
            //update book quantity
            await service.update(req.params.id,itemQty)
            res.send({
              message : 'success',
              details : {
                purchaseId : purchaseDetails.id,
                userId: purchaseDetails.userId,
                bookId: purchaseDetails.bookId,
                quantity : purchaseDetails.quantity,
                totalPrice : purchaseDetails.totalPrice
              }
              });       
          }  
    }
})

//get purchase details
exports.purchaseReport = async(req,res) => {
  //restricting access
  if (req.user.role !== 'admin') {
    res.status(403).send({
      status : "fail",
      message : "You do not have permission to perform this action"
    })
  }
  //generate purchase report
  const report = await service.getPurchaseReport()
  res.send({
    status:'success',
    requestedAt : req.requestTime,
    results : report.length,
    report : report
  })
}

 