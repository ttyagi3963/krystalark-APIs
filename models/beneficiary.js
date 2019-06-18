const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const beneficiarySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    relationship:{
        type:String,
        required:false
    },
    picture:{
        type:String,
        required:false
    },
    ssn:{
        type:Number,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    address:{
        streetAddress1:{
             type:String,
            required:false
        },
        streetAddress2:{
            type:String,
            required:false
        },
        city:{
            type:String,
            required:false
        },
        state:{
            type:String,
            required:false
        },
        country:{
            type:String,
            required:false
        },
        zip:{
            type:String,
            required:false
        }
    },
    phoneNumber:{
        type:String,
        required:false
    },
    careOf:{
        name:{},
        relationship:{},
        ssn:{},
        email:{},
        address:{},
        phoneNumber:{},
    }


});



module.exports = mongoose.model('Beneficiary', beneficiarySchema)