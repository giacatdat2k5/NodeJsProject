const express = require('express');
var bodyParser = require('body-parser')
require('dotenv').config();
const app = express();
const port = 3000;
const multer  = require('multer')
const API_V1 = require('./routes/v1/index');
const errorHandle = require('./middlewares/errorHandler');
const db = require('./configs/mongodb');

db.connect();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/v1',API_V1);
app.use(errorHandle);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});