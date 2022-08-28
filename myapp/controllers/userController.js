//loading modules
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

//Get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
  
    // send response
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  });