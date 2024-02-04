
const Board = require('../models/Board');
const List = require('../models/list')
const Card = require('../models/card')
class BoardService {
    // create = async (dataBoard) =>{
    //     try {
    //         // Xử lý nghiệp vụ và tương tác với tầng model
    //         const board = new Board(dataBoard);
    //         await board.save();
    //         return board;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    update = async (res,id,dataBoard) =>{
        try {
            // Xử lý nghiệp vụ và tương tác với tầng model
            const board = await Board.findById(id);
            if(board){
                const result = await Board.updateOne({_id:id},{cover:dataBoard.cover,title:dataBoard.title});
                return result;
            }else{
                res.status(200).json({'mgs':'id not found'})
            }
        } catch (error) {
            throw error;
        }
    }

    delete = async (id) =>{
        try {
            const board = await Board.findById(id);
            const orderBoard = board.orderBoard
            await List.deleteMany({orderBoard:orderBoard}) 
            await Card.deleteMany({orderBoard:orderBoard});
            await board.deleteOne();
            return true;
        } catch (error) {
            throw error;
        }
    }
    getAll = async () =>{
        try {
          const board = await Board.find();
          return board;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new BoardService();