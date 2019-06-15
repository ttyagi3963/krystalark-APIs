const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({

    messageType: {
        type: String,
        required:true
    },
    messageOwner:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    messageReciever:{
        type: Schema.Types.ObjectId,
        ref: 'Beneficiary'
    },

    deliveryDate:{},

    deliveryFrequency:{}



},{timestamps: true});

module.exports = mongoose.model('Messages', messageSchema);