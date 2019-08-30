const Beneficiary = require('../models/beneficiary');
const Message = require('../models/message');
const User  = require('../models/user')


exports.getMessageById =(req, res, next)=>{
   
    Message.findById(req.params.mId)
            .populate('messageReciever')            
            .then(message =>{
                if(!message){
                    res.status(204).json({status:'204', message:''})
                }
                else{
                    res.status(200).json({status:'200', message: message})
                     
                }
                    
            })
            .catch(err =>{
                console.log("message retrival error = "+err)
                   if(!err.statusCode){
                       err.statusCode = 500;
                   }
                   err.message ="Was not able to retrieve message"
                   next(err);
           })
}

exports.createMessage = (req, res, next)=>{
    
  
    const messageType = req.body.messageType;
    const relationship = req.body.relationship;
    const messageDeliveryWhen = req.body.messageDeliveryWhen;
    const frequency = req.body.frequency;
    const oneTimeOnlyDate = req.body.oneTimeOnlyDate;
    const recurringDate = req.body.recurring;
    const bName = req.body.bName;
   
    console.log("you are scheduling a "+ messageType +" delivery for your "+relationship+", "+bName+".")
    console.log("it will be delivered "+frequency+", "+ messageDeliveryWhen+ " on "+oneTimeOnlyDate);
    // res.status(200).json({'status':200,'message':'message'});

      const beneficiary = new Beneficiary({
              name: bName,
              relationship: relationship
      })

      return beneficiary.save()
                   .then(b =>{
                              const message = new Message({
                                  messageType: messageType,
                                  messageOwner: req.userId,
                                  messageReciever: b._id,
                                  messageDeliveryWhen: messageDeliveryWhen,
                                  frequency: frequency,
                                  oneTimeOnlyDate: oneTimeOnlyDate,
                                  recurringDate: recurringDate
                              })
                              return message.save()
                                            .then(messageData =>{
                                                
                                                     User.updateOne
                                                            (
                                                                {_id: req.userId},
                                                                { 
                                                                    $addToSet:{beneficiarys:  b._id, messages: messageData._id }
                                                                }
                                                            )
                                                            .then(result => {
                                                                res.status(200).json({status:200, messageData: messageData})
 
                                                            })
                                                            .catch(err =>{
                                                                console.log(err)
                                                                    if(!err.statusCode){
                                                                        err.statusCode = 500;
                                                                    }
                                                                    err.message ="was not able to update to user"
                                                                    next(err);
                                                            })
                                                        

                                           
                                      })
                                      .catch(err =>{
                                          console.log("message error = ", err)
                                              if(!err.statusCode){
                                                  err.statusCode = 500;
                                                  }
                                              err.message ="Was not able to add message"
                                              next(err);
                                      })
                              
                   })
                   .catch(err =>{
                       console.log("beneficiary error = "+err)
                          if(!err.statusCode){
                              err.statusCode = 500;
                          }
                          err.message ="Was not able to add benefeciary"
                          next(err);
                  })

    
}

exports.uploadMessageFile =(req, res, next) =>{
    if(!req.file){
        const error = new Error("no file provided")
        error.statusCode = 422;
        throw error;

        
    }
    console.log(req.file)
    res.status(200).json({message: req.file.path})
}


exports.getMessageList = (req, res, next) =>{

    Message.find(
                    {messageOwner: req.userId}
                )
                .populate('messageReciever')
                .then(messages => {
                     if(messages.length){
                        res.status(200).json({status:'200', messageList: messages})
                     }
                     else{
                        res.status(204).json({status:'204', messageList:''})
                     }
                })
                .catch( err =>{
                    console.log(" Message list Error = "+ err)
                    if(!err.statusCode){
                        err.statusCode = 500;
                    }
                    err.message ="Something wriong with message retrieval"                    
                    throw error;
                })
        

}

exports.postWrittenMessage = (req, res, next) =>{
    const messageType = "Written";
    const relationship = req.body.relationship;
    const bName = req.body.bName;
    const messageBody = req.body.messageBody;
    const  messageSubject = req.body.messageSubject;
    const uploadedFiles= req.files
    let totalFileSize=0
   console.log("usedSpave = "+ req.usedDiskSpace)
    console.log("messageType = ",messageType)
    console.log("relationship = ",relationship)
    console.log("bName = ",bName)
    console.log("messageBody = ",messageBody)
    console.log("messageSubject = ",messageSubject)
    const fileNames = uploadedFiles.map(file => {
        totalFileSize = totalFileSize+file.size
       return ({name:file.filename,size:file.size})
    })

    
 
    const beneficiary = new Beneficiary({
        name: bName,
        relationship: relationship
    })
     return beneficiary.save()
                       .then(b =>{
                        const message = new Message({
                            messageType: messageType,
                            messageOwner: req.userId,
                            messageReciever: b._id,
                            messageType: messageType,
                            messageBody: messageBody,
                            messageSubject:  messageSubject,
                            messageFiles: fileNames
                                
                        })
                        return message.save()
                                            .then(messageData =>{
                                                
                                                     User.updateOne
                                                            (
                                                                {_id: req.userId},
                                                                { 
                                                                    $addToSet:{beneficiarys:  b._id, messages: messageData._id },
                                                                    $inc: { usedDiskSpace : totalFileSize}
                                                                }
                                                            )
                                                            .then(result => {
                                                                res.status(200).json({status:200, messageData: messageData})
 
                                                            })
                                                            .catch(err =>{
                                                                console.log(err)
                                                                    if(!err.statusCode){
                                                                        err.statusCode = 500;
                                                                    }
                                                                    err.message ="was not able to update to user"
                                                                    next(err);
                                                            })
                                                        

                                           
                                      })
                                      .catch(err =>{
                                          console.log("message error = ", err)
                                              if(!err.statusCode){
                                                  err.statusCode = 500;
                                                  }
                                              err.message ="Was not able to add message"
                                              next(err);
                                      })
                    })
     .catch(err =>{
        console.log("beneficiary error = "+err)
           if(!err.statusCode){
               err.statusCode = 500;
           }
           err.message ="Was not able to add benefeciary"
           next(err);
   })
    

}