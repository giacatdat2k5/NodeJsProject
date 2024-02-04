const ListService = require('../services/ListService')


class FindBoardController {
    checkBoard = async (req, res, next) =>{
        try {
            const {title} = req.body
            // Gọi đến tầng service để xử lý
            const result = await ListService.checkList(res,title);
            res.status(200).json({
                result
            })
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = new FindBoardController();