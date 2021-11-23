const express = require('express');
const seq = require('../db/db.js');
const Product = require('../db/models/Product.js');
const Question = require('../db/models/Question.js');
const Answer = require('../db/models/Answer.js');
const Answer_Photo = require('../db/models/Answer_Photo.js');
const QA_API = require('../db/QA_API.js');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

//Get Questions
app.get('/qa/questions', (req, res) => {
  let product_id = parseInt(req.query.product_id);
  let page = req.query.page ? parseInt(req.query.page) : 1;
  let count = req.query.count ? parseInt(req.query.count) : 5;
  QA_API.listQuestions(product_id, page, count).then((results) => {
    res.status(200).json(results);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

//Get Answers
app.get('/qa/questions/:question_id/answers', (req, res) => {
  let question_id = parseInt(req.params.question_id);
  let page = parseInt(req.query.page) || 1;
  let count = parseInt(req.query.count) || 5;
  QA_API.listAnswers(question_id, page, count).then((results) => {
    res.status(200).json(results);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
});

//Add Question
app.post('/qa/questions', (req, res) => {
  QA_API.addQuestion(req.body).then((results) => {
    res.sendStatus(201);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
});

//Add Answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  let question_id = parseInt(req.params.question_id);
  QA_API.addAnswer(question_id, req.body).then((results) => {
    res.status(201).json(results);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
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
    console.log(error);
    res.sendStatus(500);
  });
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  let question_id = parseInt(req.params.question_id);
  QA_API.reportQuestion(question_id).then(res.sendStatus(204)).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let answer_id = parseInt(req.params.answer_id);
  QA_API.markAnswerHelpful(answer_id).then(res.sendStatus(204)).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  let answer_id = parseInt(req.params.answer_id);
  QA_API.reportAnswer(answer_id).then(res.sendStatus(204)).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

app.listen(port, () => {
  console.log('Server listening on ' + port)
});