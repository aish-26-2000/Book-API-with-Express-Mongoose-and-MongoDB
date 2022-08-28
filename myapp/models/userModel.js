//loading modules
const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//Creating Schema
const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : [true, 'User must have a name.'],
    },
    email :{
        type : String,
        required : [true, 'User must have an email.'],
        unique : true,
        lowercase : true,
        validate : [validator.isEmail, 'Provide a valid email.']
    },
    password :{
        type : String,
        required : [true, 'User must have a password.'],
        minlength : 8,
        select:false
    },
    passwordConfirm :{
        type : String,
        required : [true, 'Confirm the password'],
        validate : {
            //works on save
            validator : function(el) {
                return el === this.password; //abc === abc
            },
        message : "Passwords are not the same"   
        } 
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default : 'user'
      },
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
      active: {
          type: Boolean,
          default: true,
          select: false
      }
});

userSchema.pre('save',async function(next){
    //run function if password is modified
    if (!this.isModified('password')) return next();

    //hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save',function(next){
    if(!this.isModified('password')|| this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});


//check if password correct or not
userSchema.methods.correctPassword = async function(
    candidatePassword, 
    userPassword
    ) {
    return await bcrypt.compare(candidatePassword,userPassword);
}

//return password changed time
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };
 
//creating password reset token
userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
};

const User = mongoose.model('User',userSchema);

//export
module.exports = User;