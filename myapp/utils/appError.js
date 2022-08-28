//creating class
//class Error inherits from AppError
class AppError extends Error {
    constructor(message,statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4')? 'fail':'error';
        this.isOperational = true;

        //return the loc of error
        Error.captureStackTrace(this, this.constructor);
    }
}

//export
module.exports = AppError;