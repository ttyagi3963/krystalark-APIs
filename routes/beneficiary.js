const express = require('express');

const router = express.Router();

const beneficiaryController = require("../controllers/beneficiary");
const isAuth = require('../middleware/isAuth');
const multer = require('multer');

const upload = multer()

router.post('/addBeneficiary', isAuth, beneficiaryController.addBeneficiary);

router.get('/getBeneficiaryList',isAuth, beneficiaryController.getBeneficiaryList)

router.get('/beneficiary/:bId',isAuth, beneficiaryController.getBInfo);

router.post('/beneficiary/uploadAvatar',isAuth, beneficiaryController.uploadAvatar);

router.post('/beneficiary/updateBeneficiary',isAuth,upload.none(), beneficiaryController.updateBeneficiaryInfo)


module.exports = router;   