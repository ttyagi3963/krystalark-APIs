const express = require('express');

const router = express.Router();

const messageController = require('../controllers/Messages');
const isAuth = require('../middleware/isAuth');


router.post("/createMessage",isAuth, messageController.createMessage)

module.exports = router;
