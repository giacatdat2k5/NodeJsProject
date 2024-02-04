const Signin = require('../models/Signin');
const jwt = require('jsonwebtoken');

class LoginService {
    login = async (res,username,password) =>{
        try {     
                const check = await Signin.findOne({username:username,password:password})
                .then(check =>{
                    if(check){
                        const token = jwt.sign({ username,password }, process.env.SECRET_KEY_JWT);
                        res.status(200).json({
                            token: token
                        })
                    }else{
                        res.json('failed')
                    }
                }) 
        } catch (error) {
            throw error;
        }
    }
   
}

module.exports = new LoginService();