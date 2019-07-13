const express = require('express');

const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/getUserInfo',isAuth, userController.getUserInfo)

module.exports = router;