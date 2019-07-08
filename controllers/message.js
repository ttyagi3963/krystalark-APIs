const Beneficiary = require('../models/beneficiary');
const Message = require('../models/message');


exports.createMessage =(req, res, next)=>{
    
}

exports.uploadMessageFile =(req, res, next) =>{
    if(!req.file){
        const error = new Error("no file provided")
        error.statusCode = 422;
        throw error;

        
    }
    console.log(req.file.path)
    res.status(200).json({message: req.file.path})
}