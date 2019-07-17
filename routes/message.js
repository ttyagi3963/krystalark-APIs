const express = require('express');

const router = express.Router();

const messageController = require('../controllers/message')
const isAuth = require('../middleware/isAuth');
const multer = require('multer');
const upload = multer();

router.post('/uploadMessageFile',isAuth, messageController.uploadMessageFile);

router.post("/createMessage",isAuth,upload.none(), messageController.createMessage);

router.get("/getMessageList",isAuth, messageController.getMessageList);


module.exports = router;   