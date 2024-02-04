const express = require('express');
const FindListController = require('../../controllers/FindLitsContronller');
const router = express.Router();
const verifyToken = require('../../middlewares/VerifyToken')

router.get('/',verifyToken, FindListController.checkCard);


module.exports = router;