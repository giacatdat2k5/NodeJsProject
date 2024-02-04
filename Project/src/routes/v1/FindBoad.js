const express = require('express');
const FindBoardController = require('../../controllers/FindBoardController')
const router = express.Router();
const verifyToken = require('../../middlewares/VerifyToken')

router.get('/',verifyToken, FindBoardController.checkBoard);


module.exports = router;