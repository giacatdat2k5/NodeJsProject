const CardService = require('../services/CardService')


class FindListController {
    checkCard = async (req, res, next) =>{
        try {
            let {title} = req.body;
            // Gọi đến tầng service để xử lý
            const result = await CardService.checkCard(res,title);
            res.status(200).json({
                result
            })
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = new FindListController();