const express = require('express');
const router = express.Router();
const boardRoutes = require('./boardRoutes')
const authRouter = require('./authRoute');
const list = require('./list')
const card = require('./card')
const signin = require('./signin')
const FindList = require('./FindList')
const FindBoard = require('./FindBoad')

router.use('/findBoard',FindBoard)
router.use('/findList',FindList)
router.use('/signin',signin);
router.use('/card',card);
router.use('/list',list);
router.use('/boards',boardRoutes);
router.use('/auth',authRouter);
module.exports = router;