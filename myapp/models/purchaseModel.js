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
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    bookId : {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: true
    }
});

//Creating Model
const Purchase = mongoose.model('Purchase',purchaseSchema);

//export
module.exports = Purchase;
