//loading modules
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
    quantity : {
        type : Number,
        required : true
    },
    price : {
        type :Number,
        required : true
    }
});

//Creating Model
const Book = mongoose.model('Book',bookSchema);

//export
module.exports = Book;