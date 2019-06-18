const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    const authHeader =  req.get('authorization');
    if(!authHeader){
        const error = new Error('Not Authorized. Please login or create a new account');
        error.statusCode = 401;
        throw error;
    }
    
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,'secretkeytosendjwttokengbngffgfghbfgnnasvgrerg')

    }catch(err){
        err.statusCode = 500
        throw err
    }
    if(!decodedToken){
        const error  = new Error('Not Authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    console.log("req = "+req.userId)
    next();
}