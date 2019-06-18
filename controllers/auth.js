const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../models/user');




exports.login = (req, res, next) =>{

    let loadedUser;

    const email = req.body.email;
    const password = req.body.password;  

    User.findOne({email: email})
        .then(user => {
            if(!user){
                const error = new Error("This email does not exist")
                error.statusCode = 401;
                throw error;

            }
            loadedUser = user;
            
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {           
            if(!isEqual){
                const error = new Error("Wrong Password.")
                error.statusCode = 401;
                throw error;
            }

            //create jwt
            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
                'secretkeytosendjwttokengbngffgfghbfgnnasvgrerg',
                {expiresIn: '1h'}
            );

            res.status(200).json({token: token, userId: loadedUser._id.toString()})

        })
        .catch(err =>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });

};

exports.signUp = (req, res, next) => {
    const errors = validationResult(req);
  
    if(!errors.isEmpty()){
        const errMsg = ((errors.array())[0].msg)
        const error = new Error(errMsg);
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const name = req.body.name || '';
    const email = req.body.email || '';
    const password = req.body.password || '';
    const gender = req.body.gender || '';
    const ssn = req.body.ssn || '';
    const dateOfBirth = req.body.dateOfBirth || ''
    const beneficiary = ''

    bcrypt.hash(password, 12)
    .then(hashedPwd => {
        const user = new User({
           name : name,
           email : email,
           password : hashedPwd,
           gender : gender,
           ssn : ssn,
           dateOfBirth : dateOfBirth,
           beneficiary: beneficiary
        });
       
        return user.save();
    })
    .then(result => {
        const token = jwt.sign({
            email: result.email,
            userId: result._id.toString()
        },
            'secretkeytosendjwttokengbngffgfghbfgnnasvgrerg',
            {expiresIn: '1h'}
        );
        res.status(201).json({token:token, message: 'User Created',userId: result._id})
    })
    .catch( err =>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};