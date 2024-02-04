const express = require('express');
const router = express.Router();
const ListController = require('../../controllers/ListController');
const verifyToken = require('../../middlewares/VerifyToken')

const Joi = require('joi');

const listValidationSchema = Joi.object({
    title: Joi.string(),
    orderBoard: Joi.number(),
    orderList: Joi.number(),
    createAt:Joi.date(),
});

// Middleware kiểm tra và xác thực dữ liệu
const validateListData = (req, res, next) => {
    const { error, value } = listValidationSchema.validate(req.body, {abortEarly: false});
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
  
    // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
    req.body = value;
    next();
};
router.post('/', validateListData,verifyToken, ListController.create );
router.get('/',validateListData,verifyToken,ListController.getAll);
router.put('/:id',validateListData,verifyToken,ListController.update);
router.delete('/:id',validateListData,verifyToken,ListController.delete);

module.exports = router;