const Book = require('./../models/bookModel');

exports.getAllBooks = async (req,res) => {
    try{
        const books = await Book.find()

        res.status(200).json({
            status:'success',
            requestedAt : req.requestTime,
            results : books.length,
            data : {
                books
            }
        });
    } catch (err) {
        res.status(404).json({
            status:'fail',
            message : err
        });
    }
};

exports.getBook = async (req,res) => {
    try{
        const books = await Book.findById(req.params.id)
        
        res.status(200).json({
            status : 'success',
            data: {
                books
            }
        });
        console.log("Yaaay! Book found.")
    } catch (err) {
        res.status(404).json({
            status :'fail',
            message : err
        })
        console.log("Oops! Book not found.")
        }
};

exports.createBook = async (req,res) => {
    
    try{
        const newBook = await Book.create(req.body);

        res.status(201).json({
            status : 'success',
            data : {
                book :newBook
            }
        });
        console.log("Book added Successfully.")

    } catch (err) {
        res.status(400).json({
            status:'fail',
            message : 'Invalid data sent!'
        });
        console.log("Something Wrong!")
    }
};

exports.updateBook = async (req,res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id,req.body, {
            new : true,
            runValidators : true
        })
        res.status(200).json({
            status : 'success',
            data : {
                book 
            }
        });
        console.log("Book updated.")
    } catch (err) {
        res.status(400).json({
            status:'fail',
            message : 'Invalid data sent!'
        });
        console.log("Something Wrong!")
    }
};
