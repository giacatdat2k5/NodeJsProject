const List = require('../models/list');
const Card = require('../models/card')
const Board = require('../models/Board')
class ListService {
    create = async (dataList) =>{
        try {
            // Xử lý nghiệp vụ và tương tác với tầng model
            const list = new List(dataList);
            await list.save();
            return list;
        } catch (error) {
            throw error;
        }
    }
    checkList = async (res,title) =>{
        try {
            const board = await Board.findOne({title:title})
            if(board){
            const orderBoard = board.orderBoard
            const result = await List.find({orderBoard:orderBoard})
            if(result){
            res.status(200).json({
                result
            })
            }else{
            res.status(500).json({'mgs':"no result"})
             }}else{
                res.status(500).json({'mgs':"title not found"})
             }
            return result;
        } catch (error) {
            throw error;
        }
    }
    update = async (id, dataList)=>{
        try {
            const result = await List.updateOne({_id:id},{title:dataList.title});
            return result;    
        }catch (error){
            throw error;
        }
    }

    delete = async (id) =>{
        try {
            const list = await List.findById(id);
            const orderList = list.orderList;
            await Card.deleteMany({orderList:orderList})
            await list.deleteOne();
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ListService();