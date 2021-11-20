const Product = require('./models/Product.js');
const Question = require('./models/Question.js');
const Answer = require('./models/Answer.js');
const Answer_Photo = require('./models/Answer_Photo.js');

const listQuestions = (product_id) => {
  let questionsArray = [];
  let answerArray = [];
  return Question.findAll({
    attributes: [
      'question_id',
      'question_body',
      'question_date',
      'asker_name',
      'question_helpfulness',
      'reported'
    ],
    where: {product_id: product_id}
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
    //   }
    var answerQueries = [];
    for (var i = 0; i < questions.length; i++) {
      answerQueries.push(Answer.findAll({
        attributes: [
          'answer_id',
          'answer_body',
          'answer_date',
          'answerer_name',
          'answer_helpfulness'
        ],
        where: {question_id: questions[i].dataValues.question_id}
      }));
    }
    // what if a question doesnt have any answers?
    Promise.all(answerQueries).then((answers) => {
      for (var p = 0; p < questions.length; p++) {
        questions[p]['answers'] = answers[p];
      }
    });
    return questions;
  });
};

const markQuestionHelpful = (question_id) => {
  // do stuff
  return Question.increment('question_helpfulness', {
    where: {question_id: question_id}
  });
};

const reportQuestion = (question_id) => {
  return Question.update({reported: true}, {
    where: {question_id: question_id}
  });
};

const markAnswerHelpful = (answer_id) => {
  return Answer.increment('answer_helpfulness', {
    where: {answer_id: answer_id}
  });
};

const reportAnswer = (answer_id) => {
  return Answer.update({reported: true}, {
    where: {answer_id: answer_id}
  });
};

module.exports.listQuestions = listQuestions;
module.exports.markQuestionHelpful = markQuestionHelpful;
module.exports.reportQuestion = reportQuestion;
module.exports.markAnswerHelpful = markAnswerHelpful;
module.exports.reportAnswer = reportAnswer;