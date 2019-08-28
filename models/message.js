const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({

    messageType: {
        type: String,
        required:false
    },
    messageOwner:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    messageReciever:{
        type: Schema.Types.ObjectId,
        ref: 'Beneficiary'
    },
    messageStatus:{
        type: String,
        default:'Incomplete'
    },
    messageDeliveryWhen:{
        type: String,
        required:false
    },
    frequency:{
        type: String,
        required:false
    },
    oneTimeOnlyDate:{},
    recurringDate:{},
    
    messageBody:{
        type: String,
        required:false
    },
    messageSubject:{
        type: String,
        required:false
    },
    messageFiles:[{  
         name:{
            type: String,
            required:false
         },
         size:{
             type:Number,
             required:false
         }
 }]


},{timestamps: true});

module.exports = mongoose.model('Messages', messageSchema);