const Product = require('./models/Product.js');
const Question = require('./models/Question.js');
const Answer = require('./models/Answer.js');
const Answer_Photo = require('./models/Answer_Photo.js');

const listQuestions = (product_id, page, count) => {
  // off will be used for the offset, which lets postgres know how many questions to ignore from the beginning
  let off = page * count - count;
  return Question.findAll({
    attributes: [
      'question_id',
      'question_body',
      'question_date',
      'asker_name',
      'question_helpfulness',
      'reported'
    ],
    where: { product_id: product_id },
    offset: off,
    limit : count
  }).then((questions) => {
    //console.log(results);
    // results is an array of Question objects
    // Question {
    //   dataValues: {
    //     question_id: 2,
    //     question_body: 'HEY THIS IS A WEIRD QUESTION!!!!?',
    //     question_date: '1613888219613',
    //     asker_name: 'jbilas',
    //     question_helpfulness: 4,
    //     reported: true
    //   
    var answerQueries = [];
    for (var i = 0; i < questions.length; i++) {
      answerQueries.push(Answer.findAll({
        attributes: [
          ['answer_id', 'id'],
          ['answer_body', 'body'],
          ['answer_date', 'date'],
          'answerer_name',
          ['answer_helpfulness', 'helpfulness']
        ],
        where: { question_id: questions[i].dataValues.question_id }
      }));
    }
    return Promise.all(answerQueries).then((answers) => {
      for (var p = 0; p < questions.length; p++) {
        var tempArray = answers[p];
        var tempObj = {};
        for (var a = 0; a < tempArray.length; a++) {
          tempObj[tempArray[a].dataValues.id] = tempArray[a];
        }
        questions[p].dataValues.answers = tempObj;
      }
      return questions;
    }).then((questions) => {
      var photoQueries = [];
      for (var i = 0; i < questions.length; i++) {
        for (var answer in questions[i].dataValues.answers) {
          photoQueries.push(Answer_Photo.findAll({
            attributes: [
              'photo_url'
            ],
            where: { answer_id: answer }
          }));
        }
      }
      return Promise.all(photoQueries).then((photos) => {
        for (var i = 0; i < questions.length; i++) {
          for (var answer in questions[i].dataValues.answers) {
            var tempPhotos = [];
            for (const photo in photos[i]) {
              tempPhotos.push(photos[i][photo].photo_url);
            }
            questions[i].dataValues.answers[answer].dataValues.photos = tempPhotos;
          }
        }
        let productObj = { product_id: product_id.toString(), results: questions };
        return productObj;
      });
    });

  })
};

const listAnswers = (question_id, page, count) => {
  let off = page * count - count;
  return Answer.findAll({
    attributes: [
      'answer_id',
      ['answer_body', 'body'],
      ['answer_date', 'date'],
      'answerer_name',
      ['answer_helpfulness', 'helpfulness']
    ],
    where: { question_id: question_id},
    offset: off,
    limit : count
  }).then((answers) => {
    photoQueries = [];
    for (var i = 0; i < answers.length; i++) {
      photoQueries.push(Answer_Photo.findAll({
        attributes: [
          ['photo_id', 'id'],
          ['photo_url', 'url']
        ],
        where: { answer_id: answers[i].dataValues.answer_id}
      }));
    }
    return Promise.all(photoQueries).then((photos) => {
      for (var i = 0; i < answers.length; i++) {
        answers[i].dataValues.photos = photos[i];
      }
      tempObj = {question: question_id.toString(), results: answers}
      return tempObj;
    });
  });
};

const addQuestion = (req_body) => {
  let question = {};
  // question.question_id = null;
  question.product_id = req_body.product_id;
  question.question_body = req_body.body;
  question.question_date = Date.now();
  question.asker_name = req_body.name;
  question.asker_email = req_body.email;
  // question.reported = false;
  // question.question_helpfulness = 0;

  return Question.create(question);
};

const markQuestionHelpful = (question_id) => {
  return Question.increment('question_helpfulness', {
    where: { question_id: question_id }
  });
};

const reportQuestion = (question_id) => {
  return Question.update({ reported: true }, {
    where: { question_id: question_id }
  });
};

const markAnswerHelpful = (answer_id) => {
  return Answer.increment('answer_helpfulness', {
    where: { answer_id: answer_id }
  });
};

const reportAnswer = (answer_id) => {
  return Answer.update({ reported: true }, {
    where: { answer_id: answer_id }
  });
};

module.exports.listQuestions = listQuestions;
module.exports.listAnswers = listAnswers;
module.exports.addQuestion = addQuestion;
module.exports.markQuestionHelpful = markQuestionHelpful;
module.exports.reportQuestion = reportQuestion;
module.exports.markAnswerHelpful = markAnswerHelpful;
module.exports.reportAnswer = reportAnswer;