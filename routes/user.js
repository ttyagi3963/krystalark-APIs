const express = require('express');

const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuth');
const multer = require('multer');



const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "PublicUserFiles/")
        //cb(null, "files/"+req.userId);
    },
    filename: (req,file,cb) =>{
        cb(null, new Date().toISOString().replace(/:/g, '-') +'-'+file.originalname)
    }

})
const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
}

var upload = multer({storage: fileStorage, fileFilter: fileFilter})

const router = express.Router();

router.get('/getUserInfo', isAuth, userController.getUserInfo)

router.post('/uploadProfilePic', isAuth, upload.single('avatar'), userController.uploadProfilePic)

router.get('/updateUserProfile',isAuth,userController.updateUserProfile)

module.exports = router;