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

