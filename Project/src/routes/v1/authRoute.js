const express = require('express');
const AuthController = require('../../controllers/AuthController');
const router = express.Router();
const BoardController = require('../../controllers/BoardController');
const verifyToken = require('../../middlewares/VerifyToken')

const Joi = require('joi');
const loginValidationSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': `"title" không được bỏ trống !`
  }),
  password: Joi.string().required(),
});

// Middleware kiểm tra và xác thực dữ liệu
const validateLoginData = (req, res, next) => {
    const { error, value } = loginValidationSchema.validate(req.body, {abortEarly: false});
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }  
    // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
    req.body = value;
    next();
};
router.post('/login',validateLoginData, AuthController.login);


module.exports = router;