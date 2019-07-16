const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const makeDir = require('make-dir'); 
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

            let conditions = {email: email};
            let update = { $inc: { loginCount : 1},lastLogin: Date.now()}

            User.updateOne(conditions, update)
                .then(result=>{
                    res.status(200).json({token: token, userId: loadedUser._id.toString()})
                })
                .catch(err =>{
                    console.log("Unable to update")
                    if(!err.statusCode){
                        err.statusCode = 500;
                    }
                    next(err);
                });
           

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
    console.log(email)
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
        //create file folder
        (async () => {
            const path = await makeDir('files/'+result._id);
         
            console.log(path);
            //=> '/Users/sindresorhus/fun/unicorn/rainbow/cake'
        })();

        res.status(201).json({token:token, message: 'User Created',userId: result._id, user: result})
    })
    .catch( err =>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};