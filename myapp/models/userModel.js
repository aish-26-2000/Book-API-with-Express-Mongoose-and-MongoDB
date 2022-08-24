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

userSchema.methods.correctPassword = async function(
    candidatePassword, 
    userPassword
    ) {
    return await bcrypt.compare(candidatePassword,userPassword);
}

const User = mongoose.model('User',userSchema);

module.exports = User;