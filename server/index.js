const express = require('express');
const seq = require('../db/db.js');
const Product = require('../db/models/Product.js');
const Question = require('../db/models/Question.js');
const Answer = require('../db/models/Answer.js');
const Answer_Photo = require('../db/models/Answer_Photo.js');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hellow World!')
});

app.listen(port, () => {
  console.log('Server listening on ' + port)
});