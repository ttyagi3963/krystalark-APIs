const express = require('express');

const router = express.Router();

const beneficiaryController = require("../controllers/beneficiary");
const isAuth = require('../middleware/isAuth');

router.post('/addBeneficiary', isAuth, beneficiaryController.addBeneficiary);

router.get('/getBeneficiaryList',isAuth, beneficiaryController.getBeneficiaryList)

router.get('/beneficiary/:bId',isAuth, beneficiaryController.getBInfo);

router.post('/beneficiary/uploadAvatar',isAuth, beneficiaryController.uploadAvatar)

module.exports = router;   