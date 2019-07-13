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
    beneficiaryStatus:{
        type: String,
        default:'Incomplete'
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
        coName:{
            type: String,
            required: false
        },
        
        coPicture:{
            type:String,
            required:false
        },
        
        coEmail:{
            type:String,
            required:false
        },
        coAdddress:{
            coStreetAddress1:{
                 type:String,
                required:false
            },
            coStreetAddress2:{
                type:String,
                required:false
            },
            coCity:{
                type:String,
                required:false
            },
            coState:{
                type:String,
                required:false
            },
            coCountry:{
                type:String,
                required:false
            },
            coZip:{
                type:String,
                required:false
            }
        },
        coPhoneNumber:{
            type:String,
            required:false
        },
    }


});



module.exports = mongoose.model('Beneficiary', beneficiarySchema)