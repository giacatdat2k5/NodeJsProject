
const CardService = require('../services/CardService')

class CardController {
    get = async (req, res, next) =>{
        try {
        const {id} = req.params;
        const card = await CardService.get(id);
        res.status(200).json({
            card
        })
        } catch (error) {
            next(error)
        }
    }
    delete = async (req, res, next) =>{
        try {
            const {id} = req.params;
            const result = await CardService.delete(id);
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

module.exports = new CardController();