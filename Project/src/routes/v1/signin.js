const express = require('express');
const router = express.Router();
const SigninController = require('../../controllers/SigininController')
const Joi = require('joi');
const signinValidationSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': `"title" không được bỏ trống !`
  }),
  password: Joi.string().required(),
});

// Middleware kiểm tra và xác thực dữ liệu
const validateSigninData = (req, res, next) => {
    const { error, value } = signinValidationSchema.validate(req.body, {abortEarly: false});
    if (error) {
        console.log(error);
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }  
    // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
    req.body = value;
    next();
};

router.post('/',validateSigninData,SigninController.signin);
module.exports = router;