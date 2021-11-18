const express = require('express');
const seq = require('../db/db.js');
const Product = require('../db/models/Product.js');
const Question = require('../db/models/Question.js');
const Answer = require('../db/models/Answer.js');
const Answer_Photo = require('../db/models/Answer_Photo.js');
const QA_API = require('../db/QA_API.js');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// PUT request to mark a question as helpful
// Should increment necessary field by 1
// Parameter - question_id
// Type - Integer
// request.params if after semicolon
// if after question mark its req.query
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let question_id = parseInt(req.params.question_id);
  QA_API.markQuestionHelpful(question_id).then(res.sendStatus(204)).catch((error) => {
    console.log('error marking helpful');
    res.sendStatus(500);
  });
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  let question_id = parseInt(req.params.question_id);
  QA_API.reportQuestion(question_id).then(res.sendStatus(204)).catch((error) => {
    console.log('error reporting question');
    res.sendStatus(500);
  })
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let answer_id = parseInt(req.params.answer_id);
  QA_API.markAnswerHelpful(answer_id).then(res.sendStatus(204)).catch((error) => {
    console.log('error marking answer helpful');
    res.sendStatus(500);
  })
});

app.listen(port, () => {
  console.log('Server listening on ' + port)
});