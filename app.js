const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const multer = require('multer');

const MONGODB_URI =
  'mongodb+srv://ttyagi:123wsx@nodepracticemax-hjdhm.mongodb.net/krystalark';

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files');
    },
    filename: (req,file,cb) =>{
        cb(null, new Date().toISOString().replace(/:/g, '-') +'-'+file.originalname)
    }

})
const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'video/webm'){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
}

const authRoutes = require('./routes/auth');
const beneficiaryRoutes = require('./routes/beneficiary')
const messageRoutes = require('./routes/message')


app.use(bodyParser.json())
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('fileObject'))

app.use('/images',express.static(path.join(__dirname,'images')))
app.use('/files',express.static(path.join(__dirname,'files')))

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
app.use('/message', messageRoutes)


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
