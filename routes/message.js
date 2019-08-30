const express = require('express');

const router = express.Router();

const messageController = require('../controllers/message')
const isAuth = require('../middleware/isAuth');
const multer = require('multer');



const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, "PublicUserFiles/")
        cb(null, "files/"+req.userId);
    },
    filename: (req,file,cb) =>{
        cb(null, new Date().toISOString().replace(/:/g, '-') +'-'+file.originalname)
    }

})
// const fileFilter = (req, file, cb) =>{
//     if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
//         cb(null, true)
//     }
//     else{
//         cb(null, false)
//     }
// }

var upload = multer({storage: fileStorage})

router.post('/uploadMessageFile',isAuth, messageController.uploadMessageFile);

router.post("/createMessage",isAuth,upload.none(), messageController.createMessage);

router.get("/getMessageList",isAuth, messageController.getMessageList);

router.get("/getMessageById/:mId",isAuth,messageController.getMessageById);

router.post("/createWrittenMessage",isAuth, upload.array('filesUploaded',50),messageController.postWrittenMessage)

module.exports = router;   