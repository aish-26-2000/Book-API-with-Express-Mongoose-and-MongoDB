//loading modules
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const rateLimit = require('express-rate-limit');
const { default: helmet } = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const bookRouter = require('./routes/bookRoute');
const userRouter = require('./routes/userRoute');

const app = express();

console.log(`Running on ${process.env.NODE_ENV} mode.`.rainbow);

//Middlewares
//global middlewares
//set security HTTP headers
app.use(helmet())

//development logging
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'));
}

//limit requests from same API
const limiter = rateLimit({
    max:100,
    windowMs: 60*60*1000,
    message:'Too many requests from this IP,please try again in an hour'
});
app.use('/',limiter);

//parsing incoming requests with json payload
app.use(express.json({limit:'10 kb'}));

//Data sanitization against NOSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//prevent parameter pollution
app.use(
    hpp({
      whitelist: [
        'title',
        'author',
        'price'
      ]
    })
  );

//return requested time
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
}); 

//routes
app.use('/books',bookRouter)
app.use('/users',userRouter)

//AppError 404
app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server.`,404));
    console.log('Oops! Not Found !'.red);
});

//Global error handling middleware
app.use(globalErrorHandler);

//Home Page
app.get('/',(req,res)=>{
    res.send(`<head>
        <title> Book Resource API </title>
    </head>
    <style>
    body {
      background-image: url('https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-learning-reading-knowledge-accumulation-background-template-image_193558.jpg');
      background-repeat: no-repeat;
      background-size: cover;
    }
    </style><h1> Hi! Greetings from Book Resource API!</h1>
    <ul><h2>
    <li> Get all books </li>
    <li> Find a book </li>
    <li> Add a book </li>
    <li> Update a book </li>
    <li> Delete a book </li>
    </h2></ul>`);
    console.log("Home page loaded...".yellow);
});

//export
module.exports= app;
