const LoginService = require("../services/LoginService");

class AuthController {
    login = async (req, res, next) =>{
        try {
            const { username, password } = req.body;
            const token = await LoginService.login(res,username,password)

        } catch (error) {
            next(error)
        }
    }
    
}
module.exports = new AuthController();