const express = require('express');
const morgan = require('morgan');

const bookRouter = require('./routes/bookRoute');
const userRouter = require('./routes/userRoute');

const app = express();

//1 MIDDLEWARES
console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
app.use(express.json());

app.use((req,res,next)=>{
    console.log('Hello from the middleware!!!');
    next();
});

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
});


app.use('/books',bookRouter)

module.exports= app;
