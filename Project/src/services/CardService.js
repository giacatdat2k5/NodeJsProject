const Card = require('../models/card');
const List = require('../models/list')
class CardService {
    checkCard = async (res,title) =>{
        try {
            const list = await List.findOne({title:title});
            if(list){
            const orderList = list.orderList
            const result = await Card.find({orderList:orderList})
            res.status(200).json({
                result
            })
            return result;
        }else{
            res.status(200).json({'mgs':'title not found'})
        }
        } catch (error) {
            throw error;
        }
    }
    get = async (id) =>{
        try {
          const card = await Card.findById(id);
          return card;
        } catch (error) {
            throw error;
        }
    }
    update = async (id, dataCard)=>{
        try {
            const result = await Card.updateOne({_id:id},{title:dataCard.title,decription:dataCard.decription,member:dataCard.member,dueDate:dataCard.dueDate,cover:dataCard.cover,attachment:dataCard.attachment});
            return result;    
        }catch (error){
            throw error;
        }
    }
    delete = async (id) =>{
        try {
            const result =  await Card.findByIdAndDelete(id);     
            return result
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CardService();