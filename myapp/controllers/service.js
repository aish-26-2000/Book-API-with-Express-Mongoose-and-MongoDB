//loading modules
const Book = require('./../models/bookModel');
const User = require('./../models/userModel');
const Purchase = require('./../models/purchaseModel');
const mongoose = require('mongoose');
const APIFeatures = require('./../utils/apiFeatures');


const conn = mongoose.connection;


//queries
//get book details
exports.fetchBookDetails = async(_id)=> {
    //begin transaction
    const session = await conn.startSession();
    session.startTransaction();
    try{
        const find = Book.findById(_id);
        // Commit the changes
        await session.commitTransaction(); 
        return find;     
    } catch(error) {
        console.log(error);
        await session.abortTransaction();
    }
}

//create purchase item
exports.createItem = async(item) => {
    //begin transaction
    const session = await conn.startSession();
    session.startTransaction();
    try{
        const create = Purchase.create(item)
        // Commit the changes
        await session.commitTransaction(); 
        return create;     
    } catch(error) {
        console.log(error);
        await session.abortTransaction();
    }
}

//update quantity
exports.update = async(_id,by) => {
    //begin transaction
    const session = await conn.startSession();
    session.startTransaction();
    try{
        const update = Book.findByIdAndUpdate(_id, {
            $inc : {'quantity' : -by }
        })        
        // Commit the changes
        await session.commitTransaction(); 
        return update;     
    } catch(error) {
        console.log(error);
        await session.abortTransaction();
    }
}

//purchase report

exports.getPurchaseReport = async() => {
    //begin transaction
    const session = await conn.startSession();
    session.startTransaction();
    try{
        const join = await Purchase.aggregate([{
            //join books
            $lookup: {
                from : 'books', //name of collection
                localField : "bookId", //local join field
                foreignField : "_id", //target join field
                as: "book_details" //name of result
            }
        },{
            //join users
            $lookup: {
                from : 'users',
                localField : "userId",
                foreignField : "_id",
                as: "user_details"
            }
        }]);

        // Commit the changes
        await session.commitTransaction(); 
        return join;
    } catch(error) {
        console.log(error);
        await session.abortTransaction();
    }
}
