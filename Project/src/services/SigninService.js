const Signin = require('../models/Signin');
class SigninService {
    signin = async (res,username,dataSignin) =>{
        try {     
                const check = await Signin.findOne({username:username})
                .then(check =>{
                    if(check){
                        res.json('existed')
                    }else{
                     const signin = new Signin(dataSignin);
                     signin.save();
                     return signin;
                    }
                })
                .then(dataSignin=>{
                    res.json("successfully")
                })
                .catch(error=>{
                    throw error
                })
                return check;
        } catch (error) {
            throw error;
        }
    }
   
}

module.exports = new SigninService();