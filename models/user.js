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
       ssn:{
           type: String,
           required: false
       },
       beneficiarys:{
           beneficiary:{
            type: Schema.Types.ObjectId,
            ref: 'Beneficiary',
            required: false
           }
          
       }

},
{timestamps: true}
);


module.exports = mongoose.model('User', userSchema);