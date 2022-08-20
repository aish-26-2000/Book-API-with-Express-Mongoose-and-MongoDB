const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path : './config.env'});

const DB = process.env.DATABASE

mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true
}).then(con => {
    console.log('DB connection successful!');
})
//console.log(process.env);

const port =3000;
app.listen(port, ()=>{
    console.log('App running on port 3000....');
});



