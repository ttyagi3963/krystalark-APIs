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
  console.log(req.file.name);
  User.findById(req.userId)
        
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


  res.status(200).json({file: req.file.name })
}