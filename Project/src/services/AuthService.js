const Login = require('../models/login');

class LoginService {
    
    check = async (id,dataBoard) =>{
        try {
            // Xử lý nghiệp vụ và tương tác với tầng model
            const result = await Board.updateOne({_id:id},{title:dataBoard.title});
            return true;
        } catch (error) {
            throw error;
        }
    }

    // getAll = async () =>{
    //     try {
    //       const board = await Board.find();
    //       return board;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}

module.exports = new LoginService();