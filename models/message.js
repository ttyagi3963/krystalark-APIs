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
    
    messageWrittenContent:{},
    messageFiles:{},

   




},{timestamps: true});

module.exports = mongoose.model('Messages', messageSchema);