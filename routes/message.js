const express = require('express');

const router = express.Router();

const messageController = require('../controllers/message')
const isAuth = require('../middleware/isAuth');

router.post('/uploadMessageFile',isAuth, messageController.uploadMessageFile);

router.post("/createMessage",isAuth, messageController.createMessage);

router.get("/getMessageList",isAuth, messageController.getMessageList);


module.exports = router;   