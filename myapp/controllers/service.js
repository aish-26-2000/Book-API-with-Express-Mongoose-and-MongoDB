//loading modules
const Book = require('./../models/bookModel');
const User = require('./../models/userModel');
const Purchase = require('./../models/purchaseModel');
const APIFeatures = require('./../utils/apiFeatures');


//queries
//get book details
exports.fetchBookDetails = async(_id)=> {
    try{
        const find = Book.findById(_id);
        return find;     
    } catch(error) {
        console.log(error);
    }
}

//create purchase item
exports.createItem = async(item,t) => {
    const create =  Purchase.create(item);
    //console.log(t);
    return create;
}

//update quantity
exports.update = async(_id,by,t) => {
    const update = Book.findByIdAndUpdate(_id, {
        $inc : {'quantity' : -by }
    })  
    //console.log(t);
    return update;
}

//purchase report

exports.getPurchaseReport = async() => {
    try{
        const join = await Purchase.aggregate([{
            //join books
            $lookup: {
                from : 'books', //name of collection
                localField : "bookId", //local join field
                foreignField : "_id", //target join field
                as: "book_details", //name of result
            }
        },{
            //join users
            $lookup: {
                from : 'users',
                localField : "userId",
                foreignField : "_id",
                as: "user_details"
            }
        },{
            $project : {
                __v : 0,
                book_details : {
                    _id : 0,
                    quantity : 0
                },
                user_details : {
                    _id : 0,
                    __v : 0,
                    password : 0
                }
            }
        }]);
        return join;
    } catch(error) {
        console.log(error);
    }
}
