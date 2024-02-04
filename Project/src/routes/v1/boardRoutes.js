const express = require('express');
const router = express.Router();
const BoardController = require('../../controllers/BoardController');
const verifyToken = require('../../middlewares/VerifyToken')
const multer = require('multer')
const Joi = require('joi');
const Board = require('../../models/Board');
const BoardService = require('../../services/BoardService');
const Cover = require('../../models/cover');
const boardValidationSchema = Joi.object({
  title: Joi.string(),
  orderBoard: Joi.number(),
  cover:Joi.object(),
  createdAt:Joi.date(),
});
const fileValidationSchema = Joi.object({
  filename: Joi.string(),
  base64: Joi.string(),
  mimetype: Joi.string(),
});
// Middleware kiểm tra và xác thực dữ liệu
const validateBoardData = (req, res, next) => {
    const { error, value } = boardValidationSchema.validate(req.body, {abortEarly: false}); 
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }  
    // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
    req.body = value;
    next();
};
const validateFileData = (req, res, next) => {
  const { error, value } = fileValidationSchema.validate(req.body, {abortEarly: false}); 
  if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
  }  
  // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
  req.body = value;
  next();
};
const storage = multer.memoryStorage();
var upload = multer({ storage: storage })
router.post('/',validateFileData,validateBoardData,verifyToken,upload.single('cover'), async (req, res, next) => {
  try {
    const cover = new Cover({
     fieldname: req.file.originalname,
     base64:req.file.buffer.toString('base64'),
     mimetype: req.file.mimetype
    })
    let boards = await Board.find();
    let orderBoard = boards.length;
     const {title} = req.body;
     const createdAt = Date.now();
     const checkBoard = await Board.find({orderBoard:orderBoard}) 
     if(checkBoard.length>0){
      for (let i=0; i<=Board.length+1;i++){
        orderBoard= orderBoard+1;
        break
      }}else{
        next
      }
     let dataBoard = {
         title,cover,createdAt,orderBoard
    }
    const board = new Board(dataBoard);
    await board.save();
    res.status(200).json({
      board
   })
  } catch (error) {
    throw error
  }
    
})

// router.post('/',validateBoardData,validateFileData,verifyToken,BoardController.create);
router.get('/',validateBoardData,verifyToken, BoardController.getAll );
router.put('/:id',validateFileData,validateBoardData,verifyToken, upload.single('cover'), async (req, res, next) => { 
try {
  const cover = new Cover({
    fieldname: req.file.originalname,
    base64:req.file.buffer.toString('base64'),
    mimetype: req.file.mimetype
   })
  const {title} = req.body;
  const {id} = req.params;
  // Gọi đến tầng service để xử lý
  let dataBoard = {
      title,cover
  }
  const result = await BoardService.update(res,id, dataBoard);
  if (result){
      res.status(200).json({'mgs':'Updated'})
  }else{
      throw new Error('Update fail')
  }
} catch (error) {
  next(error)
}
})
router.delete('/:id',validateBoardData,verifyToken, BoardController.delete)
module.exports = router;