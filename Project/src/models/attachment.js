const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
    fieldname: String,
    base64: String,
    mimetype: String,
  });
  
  const Attachment = mongoose.model('Attachment', attachmentSchema);
  module.exports = Attachment;