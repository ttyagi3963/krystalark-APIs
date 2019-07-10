const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
       name:{
           type: String,
           required: true
       },
       email:{
           type: String,
           required: true
       },
       password:{
           type: String,
           required: true
       },
       gender:{
           type: String,
           required: false
       },
       dateOfBirth:{
           type: String,
           required: false
       },
       picture:{
        type:String,
        required:false
        },
       ssn:{
           type: String,
           required: false
       },
       logins:{
            type: Number,
            required: false
       },
       profileType:{
        type: String,
        required: false,
        default:'slave'
       },
       subscriptionStatus:{
        type: Number,
        required: true,
        default: 0
        //0 : unpaid , 1: paid
       },
       beneficiarys:[{  
                  type:Schema.Types.ObjectId,
                  ref: 'Beneficiary'
           }]
      
},
{timestamps: true}
);


module.exports = mongoose.model('User', userSchema);