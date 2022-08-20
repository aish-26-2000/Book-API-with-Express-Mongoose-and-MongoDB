const mongoose = require('mongoose');

//Creating Schema
const bookSchema = new mongoose.Schema({
    name :{
        type : String,
        required : [true, 'A book must have a name.'],
        unique : true,
        trim : true
    },
    name :{
        type : String,
        required : [true, 'A book must have an author.'],
        unique : true,
    },
    rating : {
        type :Number,
        default : 4.5
    },
    price : {
        type :Number,
        required : [true,'A book must have a price.']
    },
    description : {
        type :String,
        trim : true
    }

});

//Creating Model
const Book = mongoose.model('Book',bookSchema);

module.exports = Book;