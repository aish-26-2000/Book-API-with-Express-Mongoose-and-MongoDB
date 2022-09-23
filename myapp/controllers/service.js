//loading modules
const Book = require('./../models/bookModel');
const Purchase = require('./../models/purchaseModel');
const mongoose = require('mongoose');


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
        const report = await Purchase.find()
        // Commit the changes
        await session.commitTransaction(); 
        return report;     
    } catch(error) {
        console.log(error);
        await session.abortTransaction();
    }
}

//aggregate 
const result = Purchase.aggregate([
    {$lookup: {
        from : Book,
        localField : 'bookId',
        foreignField : '_id',
        as:'result'
    }}
])
if(result) {
    console.log(result);
}