const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');


process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...'.red);
    console.log(err.name, err.message);
    process.exit(1);
  });

dotenv.config({path : './config.env'});
const app = require('./app');


const DB = process.env.DATABASE

mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB connection successful!'.green);
})
//console.log(process.env);

const port = process.env.PORT;
const server = app.listen(port, ()=>{
    console.log(`App running on port ${port}....`.blue);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! Shutting down...'.red);
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });



