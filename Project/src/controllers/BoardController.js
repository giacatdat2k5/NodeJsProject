const BoardService = require('../services/BoardService');
const multer = require('multer')
class BoardController {
    
    // create = async (req, res, next) =>{
    //     try {
    //         const {title} = req.body;
    //         const {orderBoard} = req.query
    //         let dataBoard = {
    //             title,orderBoard
    //         }
    //         const board = await BoardService.create(dataBoard);        
    //         res.status(200).json({
    //             board
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    getAll = async (req, res, next) =>{
        try {
        const board = await BoardService.getAll();
        res.status(200).json({
            board
        })
        } catch (error) {
            next(error)
        }
    }
    update = async (req, res, next) =>{
        try {
            const {title} = req.body;
            const {id} = req.params;
            // Gọi đến tầng service để xử lý
            let dataBoard = {
                title
            }
            const result = await BoardService.update(id, dataBoard);
            if (result){
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
            const result = await BoardService.delete(id);
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

module.exports = new BoardController();