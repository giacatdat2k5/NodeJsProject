const SigninService = require('../services/SigninService')
class SigninController {
    signin = async (req, res, next) =>{
        try {
            const {username,password} = req.body;
            // Gọi đến tầng service để xử lý
            let dataSignin = {
                username,password
            }
           const signin = await SigninService.signin(res,username,dataSignin)
            res.status(200).json({
                signin
            })

        } catch (error) {
            next(error)
        }
    }
}
    
module.exports = new SigninController();