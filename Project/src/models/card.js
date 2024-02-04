
const mongoose = require('mongoose');

const cardTrelloSchema = new mongoose.Schema({
  title: { type: String, required: false },
  orderBoard: { type: Number, required: false },
  orderList: { type: Number, required: false },
  orderCard: { type: Number, required: false },
  decription: { type: String, required: false },
  member:{ type:Array, required:false},
  dueDate:{ type:Date, required:false},
  cover:{ type:Object, required:false},
  attachment:{ type:Object, required:false},

});

const Card = mongoose.model('Card',cardTrelloSchema);

module.exports = Card;
