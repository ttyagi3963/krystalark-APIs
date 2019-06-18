const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controllers/auth')
const User = require('../models/user');

const router = express.Router();





router.post(
    '/login',   
    authController.login);


router.post(
    '/signup',
    [
        body('name')
            .trim()
            .not().isEmpty()
            .isString()
            .withMessage("Please enter a valid name."),
        
        body('email')
            .isEmail()
            .withMessage("Please enter a valid email.")
            .custom((value, { req }) => {
                  return User.findOne({email: value})
                             .then(userDoc => {
                                 if(userDoc){
                                     return Promise.reject("Email address already exists");
                                 }
                             })
            }),
            

        body('password')
            .trim()
            .not().isEmpty()
            .isLength({min:8})

    ],
    authController.signUp)


module.exports = router;