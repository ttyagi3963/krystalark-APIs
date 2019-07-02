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
       beneficiarys:[{  
                  type:Schema.Types.ObjectId,
                  ref: 'Beneficiary'
           }],
       messages:[{
            type:Schema.Types.ObjectId,
            ref:'Messages'
        }]
},
{timestamps: true}
);


module.exports = mongoose.model('User', userSchema);