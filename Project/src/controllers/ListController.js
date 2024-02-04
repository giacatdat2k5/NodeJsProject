const ListService = require('../services/ListService')
const List = require('../models/list')
const Board = require('../models/Board')
class ListController {

    create = async (req, res, next) =>{
        try {
            const {title} = req.body;
            const createAt = Date.now();
            const {orderBoard} = req.query;
            let orderList =await (await List.find({orderBoard:orderBoard})).length
            const checkBoard = await Board.find({orderBoard:orderBoard}) 
            const checkList = await List.find({orderBoard:orderBoard,orderList:orderList}) 
            if(checkBoard.length>0){
                for(let i=0;i<List.length;i++){
                    if(checkList.length>0){
                    orderList= orderList+1
                    break;
                    }else{
                    next
                    } 
                   }
            }else{
                res.json({
                    mgs:"board is not existed"
                });
                return true;
            }
            let dataList= {
                title,orderBoard,orderList,createAt
            }
            const list = await ListService.create(dataList);       
                res.status(200).json({
                list
            })
        } catch (error) {
            next(error)
        }
    }
    getAll = async (req, res, next) =>{
        try{
            const list = await ListService.getAll();
            res.status(200).json({
                list
            })
        } catch(error){
            next(error)
        }
    }
    update = async (req,res,next)=>{
        try{
            const {title,dateCreated} = req.body;
            const {id} = req.params;
            // Gọi đến tầng service để xử lý
            let dataList = {
                title
            }
            const result = await ListService.update(id,dataList);
            if(result){
                res.status(200).json({'mgs':'Updated'})
            }else{
                throw new Error('Update fail')
            }
    } catch (error) {
        next(error)
         }
    }
    delete = async (req, res, next) =>{
        try {
            const {id} = req.params;
            const result = await ListService.delete(id);
            if (result){
                res.status(200).json({'mgs':'Deleted'})
            }else{
                throw new Error('Deleted fail')
            }
        } catch (error) {
            next(error)
        }
    }
}
    

module.exports = new ListController();