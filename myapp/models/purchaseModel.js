//loading modules
const mongoose =  require('mongoose');
const User = require('./userModel');
const Book = require('./bookModel');

//creating item schema
const purchaseSchema = new mongoose.Schema({
    quantity :{
        type : Number,
        required : [true, 'An item must have quantity.']
    },
    totalPrice :{
        type : Number
    },
    userId : {
        type: String,
        ref: 'User',
        required: true
    },
    bookId : {
        type: String,
        ref: 'Book',
        required: true
    },
    user : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    book :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Book"
        }
    ]
});

//Creating Model
const Purchase = mongoose.model('Purchase',purchaseSchema);

//export
module.exports = Purchase;
