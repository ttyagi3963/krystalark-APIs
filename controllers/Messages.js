const Beneficiary = require('../models/beneficiary');
const Message = require('../models/message');
const User = require('../models/user');

exports.createMessage =(req, res, next)=>{
    
          const fullName = req.body.bName
          const messageType = req.body.messageType;
          const relationship = req.body.relationship;
          const messageDeliveryWhen = req.body.messageDeliveryWhen;
          const frequency = req.body.frequency;
          const oneTimeOnlyDate = req.body.oneTimeOnlyDate;
          const recurringDate = req.body.recurring;
          console.log("you are scheduling a "+ messageType +" delivery for your "+relationship+", "+fullName+".")
          console.log("it will be delivered "+frequency+", "+ messageDeliveryWhen+ " on "+oneTimeOnlyDate);
          res.status(200).json({'status':200,'message':'message'});

            // const beneficiary = new Beneficiary({
            //         name: fullName,
            //         relationship: relationship
            // })
            // return beneficiary.save()
            //              .then(b =>{
            //                         const message = new Message({
            //                             messageType: messageType,
            //                             messageOwner: req.userId,
            //                             messageReciever: b._id,
            //                             messageDeliveryWhen: messageDeliveryWhen,
            //                             frequency: frequency,
            //                             oneTimeOnlyDate: oneTimeOnlyDate,
            //                             recurringDate: recurringDate
            //                         })
            //                         return message.save()
            //                                       .then(messageData =>{

            //                                                 User.updateOne
            //                                                 (
            //                                                     {_id: req.userId},
            //                                                     { 
            //                                                         $addToSet:{beneficiarys:  bId, messages: messageData._id }
            //                                                     }
            //                                                 )
            //                                                 .then(result => {
                                                                
            //                                                 })
            //                                                 .catch(err =>{
            //                                                         if(!err.statusCode){
            //                                                             err.statusCode = 500;
            //                                                         }
            //                                                         error.message ="was not able to update to user"
            //                                                         next(err);
            //                                                 })
            //                                 })
            //                                 .catch(err =>{
            //                                         if(!err.statusCode){
            //                                             err.statusCode = 500;
            //                                             }
            //                                         error.message ="Was not able to add message"
            //                                         next(err);
            //                                 })
                                    
            //              })
            //              .catch(err =>{
            //                     if(!err.statusCode){
            //                         err.statusCode = 500;
            //                     }
            //                     error.message ="Was not able to add benefeciary"
            //                     next(err);
            //             })

          
}