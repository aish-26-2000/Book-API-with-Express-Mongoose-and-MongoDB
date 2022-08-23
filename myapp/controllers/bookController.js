const Book = require('./../models/bookModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');


exports.getAllBooks = catchAsync(async (req,res,next) => {
        const book = await Book.find()

        res.status(200).json({
            status:'success',
            requestedAt : req.requestTime,
            results : book.length,
            data : {
                book
            }
        });
});

exports.getBook = catchAsync(async (req,res,next) => {
        const book = await Book.findById(req.params.id)
        
        if(!book) {
            return next(new AppError('No book found with that ID',404))
        }

        res.status(200).json({
            status : 'success',
            data: {
                book
            }
        });
        console.log("Yaaay! Book found.")
});

exports.createBook = catchAsync(async (req,res,next) => {
        const newBook = await Book.create(req.body);

        res.status(201).json({
            status : 'success',
            data : {
                book :newBook
            }
        });
        console.log("Book added Successfully.")
});

exports.updateBook = catchAsync(async (req,res,next) => {
        const book = await Book.findByIdAndUpdate(req.params.id,req.body);

        if(!book) {
            return next(new AppError('No book found with that ID',404))
        }

        res.status(200).json({
            status : 'success',
            data : {
                book 
            }
        });
        console.log("Book updated.")
});

exports.deleteBook = catchAsync(async (req,res,next) => {
        const book = await Book.findByIdAndDelete(req.params.id,req.body);

        if(!book) {
            return next(new AppError('No book found with that ID',404))
        }

        res.status(204).json({
            status : 'success',
            data : null
    });
    console.log("Book Deleted Successfully")
});
