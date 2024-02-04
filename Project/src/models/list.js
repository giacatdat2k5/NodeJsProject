
const { number, string, date } = require('joi');
const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title:{type:String, require:true},
  orderBoard:{type:Number, require:false},
  orderList:{type:Number, require:false},
  createAt:{type:Date, require:false}

});

const list = mongoose.model('list', listSchema);

module.exports = list;