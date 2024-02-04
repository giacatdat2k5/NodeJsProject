
const mongoose = require('mongoose');

const SigninSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true},
});

const Signin = mongoose.model('Signin', SigninSchema);

module.exports = Signin;