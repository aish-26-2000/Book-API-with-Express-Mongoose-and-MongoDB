//loading modules
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

//filter fields
const filterObj = (obj,...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach(ele => {
    if(allowedFields.includes(ele)) newObj[ele]= obj[ele];
  });
  return newObj;
};

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

//Update restricted user details
exports.updateMe = catchAsync(async (req, res, next) => {
  //Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updatePassword.',
        400
      )
    );
  }

  //Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  //Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});