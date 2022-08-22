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

/*app.use((req,res,next)=>{
    console.log('Hello from the middleware!!!');
    next();
});*/

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
});


app.use('/books',bookRouter)

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
    console.log("Home page loaded...");
});

module.exports= app;
