const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 

const MONGODB_URI =
  'mongodb+srv://ttyagi:123wsx@nodepracticemax-hjdhm.mongodb.net/krystalark';

const app = express();

const authRoutes = require('./routes/auth');
const beneficiaryRoutes = require('./routes/beneficiary')


app.use(bodyParser.json())

//Setting up CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

//including routes
app.use('/auth',authRoutes);
app.use(beneficiaryRoutes)


//error handling function
app.use((error, req, res, next) => {
    console.log("ERROR------------->", error)
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data:data})
})


mongoose.connect(MONGODB_URI)
        .then(result => {
            app.listen(8080)
        })
        .catch(err => {
            console.log(err)
        })
