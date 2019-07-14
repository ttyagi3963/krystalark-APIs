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

        diskSpace:{
            type: Number,
            default:5
        },
        profileCompleteStatus:{
            type: Boolean,
            default:false
        },
        lastLogin:{
            type: Date,
            default: Date.now
        },
       ssn:{
           type: String,
           required: false
       },
       loginCount:{
            type: Number,
            required: false,
            default: 1
       },
       accountType:{
        type: String,
        required: false,
        default:'Unprivileged'
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