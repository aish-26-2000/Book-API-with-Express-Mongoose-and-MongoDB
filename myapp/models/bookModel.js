const mongoose = require('mongoose');

//Creating Schema
const bookSchema = new mongoose.Schema({
    title :{
        type : String,
        required : [true, 'A book must have a title.'],
        unique : true,
    },
    author :{
        type : String,
        required : [true, 'A book must have an author.'],
        unique : true,
    },
    imageUrl : {
        type :String,
        //required : true,
        //unique : true,
    },
    pages : {
        type :Number,
    },
    price : {
        type :Number,
        required : [true,'A book must have a price.']
    }
});

//Creating Model
const Book = mongoose.model('Book',bookSchema);

module.exports = Book;