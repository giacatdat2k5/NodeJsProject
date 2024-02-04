const mongoose = require('mongoose');

const CoverSchema = new mongoose.Schema({
    fieldname: String,
    base64: String,
    mimetype: String,
  });
  
  const Cover = mongoose.model('Cover', CoverSchema);
  module.exports = Cover;