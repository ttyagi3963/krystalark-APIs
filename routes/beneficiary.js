const express = require('express');

const router = express.Router();

const beneficiaryController = require("../controllers/beneficiary");
const isAuth = require('../middleware/isAuth');

router.post('/addBeneficiary', isAuth, beneficiaryController.addBeneficiary);

router.get('/getBeneficiaryList',isAuth, beneficiaryController.getBeneficiaryList)

router.get('/getBeneficiaryInfo/:bId', beneficiaryController.getBInfo)

module.exports = router;   