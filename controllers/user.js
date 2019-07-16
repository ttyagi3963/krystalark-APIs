const User = require('../models/user')




exports.getUserInfo = (req, res, next) => {

    User.findById(req.userId)
        .populate('beneficiarys')
        .then(user =>{
            console.log(user)
           
                res.status(200).json({status:'200',userInfo: user})
            
        })
        .catch(err =>{
            console.log(err)
            if(!err.statusCode){
                err.statusCode = 500;
            }
            err.message="Some problem with connectivity"
            next(err);
        }) 

}

exports.uploadProfilePic =(req, res, next) =>{
    const fileSize = req.body.fileSize
    console.log(fileSize)
  
  User.updateOne(
      {_id: req.userId},
      {
          $set: {picture: req.file.path},
          $inc:{usedDiskSpace: fileSize}
        }) 
        .then(result =>{
         
                res.status(200).json({status:'200', picPath:req.file.path, usedDiskSpace: fileSize})
            
        })
        .catch(err =>{
           console.log(err)
            if(!err.statusCode){
                err.statusCode = 500;
            }
            err.message="Some problem with connectivity"
            next(err);
        })
}

exports.updateUserProfile =(req, res, next) =>{
    const userId=  req.query.id
    console.log(userId)
}