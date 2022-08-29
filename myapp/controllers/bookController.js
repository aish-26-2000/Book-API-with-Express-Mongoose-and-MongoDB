//loading modules
const Book = require('./../models/bookModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const colors = require('colors');

//Get all books
exports.getAllBooks = catchAsync(async (req,res,next) => {
    const features = new APIFeatures(Book.find(),req.query)
        .paginate();
    
    const book = await features.query;

        //Response
        res.status(200).json({
            status:'success',
            requestedAt : req.requestTime,
            results : book.length,
            data : {
                book
            }
        });
        console.log("All books are listed.".yellow)
});

//Get one book
exports.getBook = catchAsync(async (req,res,next) => {
        const book = await Book.findById(req.params.id);
        
        if(!book) {
            return next(new AppError('No book found with that ID',404));
            console.log("ID not exists".red);
        }

        res.status(200).json({
            status : 'success',
            data: {
                book
            }
        });
        console.log("Yaaay! Book found.".yellow)
});

//Create a new book
exports.createBook = catchAsync(async (req,res,next) => {
        //restricting access
        if (req.user.role !== 'admin') {
            return next(
            new AppError('You do not have permission to perform this action', 403)
            );
        }
        const newBook = await Book.create(req.body);

        res.status(201).json({
            status : 'success',
            data : {
                book :newBook
            }
        });
        console.log("Book added Successfully.".yellow)
});

//Update a book
exports.updateBook = catchAsync(async (req,res,next) => {
         //restricting access
         if (req.user.role !== 'admin') {
            return next(
            new AppError('You do not have permission to perform this action', 403)
            );
        }
        const book = await Book.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators : true
        });

        if(!book) {
            return next(new AppError('No book found with that ID',404));
            console.log("ID not exists".red);

        }

        res.status(200).json({
            status : 'success',
            data : {
                book 
            }
        });
        console.log("Book updated.".yellow)
});

//Delete a book
exports.deleteBook = catchAsync(async (req,res,next) => {
         //restricting access
         if (req.user.role !== 'admin') {
            return next(
            new AppError('You do not have permission to perform this action', 403)
            );
        }
        const book = await Book.findByIdAndDelete(req.params.id);

        if(!book) {
            return next(new AppError('No book found with that ID',404));
            console.log("ID not exists".red);

        }

        res.status(204).json({
            status : 'success',
            data : null
    });
    console.log("Book Deleted Successfully".yellow)
});
