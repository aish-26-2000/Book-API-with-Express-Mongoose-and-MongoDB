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
        console.log("Book found...")
    } catch (err) {
        res.status(404).json({
            status :'fail',
            message : err
        })
        console.log("Book not found...")
        }
};
    

