
const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  title: { type: String, required: false },
  orderBoard: { type: Number, required: false },
  cover: { type: Object, required: false },
  createdAt: {type: Date,default: Date.now},

});

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;