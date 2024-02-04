const express = require('express');
const router = express.Router();
const CardController = require('../../controllers/CardController');
const verifyToken = require('../../middlewares/VerifyToken')
const Cover = require('../../models/cover')
const Attachment = require('../../models/attachment')
const multer = require('multer')
const Joi = require('joi');
const Card = require('../../models/card');
const List = require('../../models/list');
const Board = require('../../models/Board');
const CardService = require('../../services/CardService')
const cardValidationSchema = Joi.object({
  title: Joi.string(),
  orderBoard: Joi.number(),
  orderList: Joi.number(),
  orderCard: Joi.string(),
  decription: Joi.string(),
  member: Joi.array(),
  dueDate: Joi.date(),
  cover:Joi.object(),
  attachment:Joi.object(),
});
const CoverValidationSchema = Joi.object({
  filename: Joi.string(),
  base64: Joi.binary(),
  mimetype: Joi.string(),
});
const AttachmentValidationSchema = Joi.object({
  filename: Joi.string(),
  base64: Joi.binary(),
  mimetype: Joi.string(),
});
// Middleware kiểm tra và xác thực dữ liệu
const validateCardData = (req, res, next) => {
    const { error, value } = cardValidationSchema.validate(req.body, {abortEarly: false});
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
    req.body = value;
    next();
};
const validateCoverData = (req, res, next) => {
  const { error, value } = CoverValidationSchema.validate(req.body, {abortEarly: false}); 
  if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
  }  
  // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
  req.body = value;
  next();
};
const validateAttachmentData = (req, res, next) => {
  const { error, value } = AttachmentValidationSchema.validate(req.body, {abortEarly: false}); 
  if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
  }  
  // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
  req.body = value;
  next();
};
// router.post('/',validateCardData,verifyToken, CardController.create );
const storage = multer.memoryStorage();
var upload = multer({ storage: storage })
router.post('/',validateCoverData,validateCardData,verifyToken,upload.fields([
  { name: 'cover' },
  { name: 'attachment'},
]), async (req, res,next) => {
   try{
    const imageFile = req.files['cover'][0];
    const documentFile = req.files['attachment'][0];
    
    const cover = new Cover({
     fieldname:imageFile.originalname ,
     base64:imageFile.buffer.toString('base64'),
     mimetype:  imageFile.mimetype
    })
    const attachment = new Attachment({
      fieldname:documentFile.originalname ,
      base64:documentFile.toString('base64'),
      mimetype:documentFile.mimetype,
     })
   const {title,decription,member, dueDate,} = req.body;
   const {orderBoard,orderList} = req.query;
   let orderCard = await (await Card.find({orderBoard:orderBoard},{orderList:orderList})).length
   const checkBoard = await Board.find({orderBoard:orderBoard}) 
   const checkList = await List.find({orderBoard:orderBoard,orderList:orderList}) 
   const checkCard = await Card.find({orderBoard:orderBoard,orderList:orderList,orderCard:orderCard})
   if(checkBoard.length>0 && checkList.length>0){
    for(let i=0;i<Card.length;i++){
      if(checkCard.length>0){
      orderCard= orderCard+1
      break;
      }else{
      next
      } 
     }
  }else{
    res.json({
        mgs:"board or list is not existed"
    });
    return true;
}

   let dataCard = {
    title, orderBoard,orderList,orderCard,decription,member, dueDate, cover,attachment
   }
    const card = new Card(dataCard) ; 
   await card.save();
   res.status(200).json({
      card
   })
   } catch (error) {
    throw error
   }
})

router.get('/:id',validateAttachmentData,validateCoverData,validateCardData,verifyToken,CardController.get);
router.put('/:id',validateAttachmentData,validateCoverData,validateCardData,verifyToken,upload.fields([
  { name: 'cover' },
  { name: 'attachment'},
]), async (req, res,next) => {
   try{
    const {id} = req.params;
    const imageFile = req.files['cover'][0];
    const documentFile = req.files['attachment'][0];
    const cover = new Cover({
     fieldname:imageFile.originalname ,
     base64:imageFile.buffer.toString('base64'),
     mimetype:  imageFile.mimetype
    })
    const attachment = new Attachment({
      fieldname:documentFile.originalname ,
      base64:documentFile.toString('base64'),
      mimetype:documentFile.mimetype
     })
   const {title,decription,member, duaDate,} = req.body;
   
   let dataCard = {
    title,decription,member, duaDate, cover,attachment
   }
   const result = await CardService.update(id, dataCard);
           if (result){
               res.status(200).json({'mgs':'Updated'})
           }else{
               throw new Error('Update fail')
           }
   } catch (error) {
    throw error
   }
  })
router.delete('/:id',validateCardData,verifyToken,CardController.delete)

module.exports = router;